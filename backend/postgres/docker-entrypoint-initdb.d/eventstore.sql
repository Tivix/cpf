-- Event log table, persists domain events with reference to the aggregate on which they originated
CREATE TABLE events
(
    event_id bigserial PRIMARY KEY,
    aggregate_type varchar(255) NOT NULL,
    aggregate_id varchar(255) NOT NULL,
    event_type varchar(255) NOT NULL,
    event_data jsonb,
    created_at timestamp NOT NULL DEFAULT now()
);

-- ALTER TABLE events REPLICA IDENTITY FULL; -- Allow delete operations to include all columns in the WAL

-- -- events is append-only, so we can use a replication identity of nothing to avoid bloating the WAL
ALTER TABLE events REPLICA IDENTITY NOTHING;


-- Enforce append-only by revoking update & delete permissions
REVOKE UPDATE, DELETE ON events FROM PUBLIC;

-- Also enforce append-only with a trigger that raises an exception on update or delete
CREATE FUNCTION raise_append_only_exception()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'This table is append-only. UPDATE and DELETE operations are not allowed.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_update_delete
BEFORE UPDATE OR DELETE ON events
FOR EACH ROW EXECUTE FUNCTION raise_append_only_exception();


-- Multi-column index where the leading column is aggregate_type
-- This allows for optimized queries by type AND id, or just by type, but not just by id.
-- Therefore, queries for specific aggregate_ids should also include aggregate_type clauses.
-- This also allows aggregates of different types to share the same aggregate_id, if desired.
CREATE INDEX aggregate_event_index ON events (aggregate_type, aggregate_id);

-- Single-column index on event_type
CREATE INDEX event_type_index ON events (event_type);

-- Snapshots table, can be used to persist a left-fold of an aggregate's events to speed up aggregation.
CREATE TABLE snapshots
(
    aggregate_type varchar(255) NOT NULL,
    aggregate_id varchar(255) NOT NULL,
    last_event_id bigint NOT NULL,
    serialized_aggregate bytea NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (aggregate_type, aggregate_id),
    FOREIGN KEY (last_event_id)
        REFERENCES events (event_id)
        ON DELETE CASCADE
);


-- Helper function for recording events and performing optimistic locking.
-- Returns the new event count for the aggregate to be used as the expected event count for the next event
CREATE FUNCTION record_event(
    _aggregate_type varchar(255),
    _aggregate_id varchar(255),
    _event_type varchar(255),
    _event_data json DEFAULT NULL,
    _expected_event_count bigint DEFAULT NULL
)
RETURNS TABLE(event_id bigint, created_at timestamp, aggregate_event_count bigint)
LANGUAGE plpgsql
AS $$
DECLARE
    actual_event_count bigint;
    new_event_id bigint;
    new_event_time timestamp;
BEGIN
    -- Count the current number of events for the aggregate
    SELECT COUNT(*) INTO actual_event_count 
    FROM events 
    WHERE aggregate_type = _aggregate_type AND aggregate_id = _aggregate_id;

    -- Perform optimistic locking check only if expected_event_count is not null
    IF _expected_event_count IS NOT NULL AND actual_event_count != _expected_event_count THEN
        RAISE EXCEPTION 'OptimisticLockException';
    END IF;

    -- Insert the new event and get the new event_id and timestamp
    INSERT INTO events(aggregate_type, aggregate_id, event_type, event_data)
    VALUES (_aggregate_type, _aggregate_id, _event_type, _event_data)
    RETURNING events.event_id, events.created_at INTO new_event_id, new_event_time;

    -- Return the new event_id, timestamp, and the incremented event count
    RETURN QUERY SELECT new_event_id, new_event_time, actual_event_count + 1;
END;
$$;


CREATE FUNCTION save_snapshot(
    _aggregate_type varchar(255),
    _aggregate_id varchar(255),
    _last_event_id bigint,
    _serialized_aggregate bytea
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- Insert new snapshot or update existing one
    INSERT INTO snapshots (aggregate_type, aggregate_id, last_event_id, serialized_aggregate)
    VALUES (_aggregate_type, _aggregate_id, _last_event_id, _serialized_aggregate)
    ON CONFLICT (aggregate_type, aggregate_id)
    DO UPDATE SET 
        last_event_id = EXCLUDED.last_event_id,
        serialized_aggregate = EXCLUDED.serialized_aggregate,
        created_at = now();
END;
$$;
