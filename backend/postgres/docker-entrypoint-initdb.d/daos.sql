CREATE TABLE ladders
(
    ladder_slug varchar(255) PRIMARY KEY,
    ladder_data jsonb,
    updated_at timestamp NOT NULL DEFAULT now()
);

CREATE  FUNCTION update_edit_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_task_updated_on
    BEFORE UPDATE
    ON
        ladders
    FOR EACH ROW
EXECUTE PROCEDURE update_edit_date();

-- Create read model for buckets

CREATE TABLE buckets
(
    bucket_slug varchar(255) PRIMARY KEY,
    bucket_data jsonb,
    updated_at timestamp NOT NULL DEFAULT now()
);

-- TODO Create trigger
CREATE TRIGGER update_user_task_updated_on
    BEFORE UPDATE
    ON
        buckets
    FOR EACH ROW
EXECUTE PROCEDURE update_edit_date();

--- Create read model for user scorecard
CREATE TABLE users
(
    username varchar(255) PRIMARY KEY,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    manager_identifier varchar(255),
    activity integer DEFAULT 0
);