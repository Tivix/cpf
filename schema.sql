SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: _analytics; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA _analytics;


--
-- Name: _realtime; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA _realtime;


--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA auth;


--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA extensions;


--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA graphql;


--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA graphql_public;


--
-- Name: pg_net; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_net; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_net IS 'Async HTTP';


--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA pgbouncer;


--
-- Name: pgsodium; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA pgsodium;


--
-- Name: pgsodium; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgsodium WITH SCHEMA pgsodium;


--
-- Name: EXTENSION pgsodium; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgsodium IS 'Pgsodium is a modern cryptography library for Postgres.';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA realtime;


--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA storage;


--
-- Name: supabase_functions; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA supabase_functions;


--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA vault;


--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;


--
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn'
);


--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'manager',
    'employee'
);


--
-- Name: action; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    IF EXISTS (
      SELECT 1
      FROM pg_event_trigger_ddl_commands() AS ev
      JOIN pg_extension AS ext
      ON ev.objid = ext.oid
      WHERE ext.extname = 'pg_net'
    )
    THEN
      GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END;
  $$;


--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: -
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    RAISE WARNING 'PgBouncer auth request: %', p_usename;

    RETURN QUERY
    SELECT usename::TEXT, passwd::TEXT FROM pg_catalog.pg_shadow
    WHERE usename = p_usename;
END;
$$;


--
-- Name: get_user_profile_with_ladder(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_user_profile_with_ladder(p_user_id uuid) RETURNS TABLE(email text, role public.app_role, first_name text, last_name text, ladder_slug character varying, current_band integer, technologies text[])
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.email,
        p.role,
        p.first_name,
        p.last_name,
        ul.ladder_slug,
        ul.current_band,
        ul.technologies
    FROM profiles p
    INNER JOIN
        user_ladder ul on p.id = ul.user_id
    WHERE
        p.id = p_user_id and ul.is_main_ladder = TRUE;
END;
$$;


--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or action = 'DELETE'
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
    select string_to_array(name, '/') into _parts;
    select _parts[array_length(_parts,1)] into _filename;
    -- @todo return the last part instead of 2
    return split_part(_filename, '.', 2);
END
$$;


--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[array_length(_parts,1)];
END
$$;


--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[1:array_length(_parts,1)-1];
END
$$;


--
-- Name: search(text, text, integer, integer, integer); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql
    AS $$
DECLARE
_bucketId text;
BEGIN
    -- will be replaced by migrations when server starts
    -- saving space for cloud-init
END
$$;


--
-- Name: http_request(); Type: FUNCTION; Schema: supabase_functions; Owner: -
--

CREATE FUNCTION supabase_functions.http_request() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'supabase_functions'
    AS $$
    DECLARE
      request_id bigint;
      payload jsonb;
      url text := TG_ARGV[0]::text;
      method text := TG_ARGV[1]::text;
      headers jsonb DEFAULT '{}'::jsonb;
      params jsonb DEFAULT '{}'::jsonb;
      timeout_ms integer DEFAULT 1000;
    BEGIN
      IF url IS NULL OR url = 'null' THEN
        RAISE EXCEPTION 'url argument is missing';
      END IF;

      IF method IS NULL OR method = 'null' THEN
        RAISE EXCEPTION 'method argument is missing';
      END IF;

      IF TG_ARGV[2] IS NULL OR TG_ARGV[2] = 'null' THEN
        headers = '{"Content-Type": "application/json"}'::jsonb;
      ELSE
        headers = TG_ARGV[2]::jsonb;
      END IF;

      IF TG_ARGV[3] IS NULL OR TG_ARGV[3] = 'null' THEN
        params = '{}'::jsonb;
      ELSE
        params = TG_ARGV[3]::jsonb;
      END IF;

      IF TG_ARGV[4] IS NULL OR TG_ARGV[4] = 'null' THEN
        timeout_ms = 1000;
      ELSE
        timeout_ms = TG_ARGV[4]::integer;
      END IF;

      CASE
        WHEN method = 'GET' THEN
          SELECT http_get INTO request_id FROM net.http_get(
            url,
            params,
            headers,
            timeout_ms
          );
        WHEN method = 'POST' THEN
          payload = jsonb_build_object(
            'old_record', OLD,
            'record', NEW,
            'type', TG_OP,
            'table', TG_TABLE_NAME,
            'schema', TG_TABLE_SCHEMA
          );

          SELECT http_post INTO request_id FROM net.http_post(
            url,
            payload,
            params,
            headers,
            timeout_ms
          );
        ELSE
          RAISE EXCEPTION 'method argument % is invalid', method;
      END CASE;

      INSERT INTO supabase_functions.hooks
        (hook_table_id, hook_name, request_id)
      VALUES
        (TG_RELID, TG_NAME, request_id);

      RETURN NEW;
    END
  $$;


--
-- Name: secrets_encrypt_secret_secret(); Type: FUNCTION; Schema: vault; Owner: -
--

CREATE FUNCTION vault.secrets_encrypt_secret_secret() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
		        new.secret = CASE WHEN new.secret IS NULL THEN NULL ELSE
			CASE WHEN new.key_id IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.secret, 'utf8'),
				pg_catalog.convert_to((new.id::text || new.description::text || new.created_at::text || new.updated_at::text)::text, 'utf8'),
				new.key_id::uuid,
				new.nonce
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: billing_accounts; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.billing_accounts (
    id bigint NOT NULL,
    latest_successful_stripe_session jsonb,
    stripe_customer character varying(255),
    user_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    stripe_subscriptions jsonb,
    stripe_invoices jsonb,
    "lifetime_plan?" boolean DEFAULT false,
    lifetime_plan_invoice character varying(255),
    default_payment_method character varying(255),
    custom_invoice_fields jsonb[] DEFAULT ARRAY[]::jsonb[],
    lifetime_plan boolean DEFAULT false NOT NULL
);


--
-- Name: billing_accounts_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.billing_accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: billing_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.billing_accounts_id_seq OWNED BY _analytics.billing_accounts.id;


--
-- Name: billing_counts; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.billing_counts (
    id bigint NOT NULL,
    node character varying(255),
    count integer,
    user_id bigint,
    source_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


--
-- Name: billing_counts_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.billing_counts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: billing_counts_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.billing_counts_id_seq OWNED BY _analytics.billing_counts.id;


--
-- Name: endpoint_queries; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.endpoint_queries (
    id bigint NOT NULL,
    name character varying(255),
    token uuid,
    query text,
    user_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    source_mapping jsonb DEFAULT '{}'::jsonb NOT NULL,
    sandboxable boolean DEFAULT false,
    cache_duration_seconds integer DEFAULT 3600,
    proactive_requerying_seconds integer DEFAULT 1800,
    max_limit integer DEFAULT 1000,
    enable_auth boolean DEFAULT false,
    sandbox_query_id bigint,
    language character varying(255) NOT NULL
);


--
-- Name: endpoint_queries_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.endpoint_queries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: endpoint_queries_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.endpoint_queries_id_seq OWNED BY _analytics.endpoint_queries.id;


--
-- Name: log_events_27ff8855_5ef6_43a6_af3a_2e59b30ad843; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.log_events_27ff8855_5ef6_43a6_af3a_2e59b30ad843 (
    id character varying(255) NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


--
-- Name: log_events_32d33bbf_fe73_42e8_8d75_1fa1e4edf8f1; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.log_events_32d33bbf_fe73_42e8_8d75_1fa1e4edf8f1 (
    id character varying(255) NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


--
-- Name: log_events_3c60bc6b_af55_4f04_a5c2_57eb908f55e6; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.log_events_3c60bc6b_af55_4f04_a5c2_57eb908f55e6 (
    id character varying(255) NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


--
-- Name: log_events_46560d7c_01eb_4952_b7a0_2a1922a66545; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.log_events_46560d7c_01eb_4952_b7a0_2a1922a66545 (
    id character varying(255) NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


--
-- Name: log_events_6552744b_e539_46e9_b09f_ede78abaf896; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.log_events_6552744b_e539_46e9_b09f_ede78abaf896 (
    id character varying(255) NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


--
-- Name: log_events_6f0f7b96_bf51_49cc_8618_afbef7a612f9; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.log_events_6f0f7b96_bf51_49cc_8618_afbef7a612f9 (
    id character varying(255) NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


--
-- Name: log_events_9654203e_ea2b_40e9_b5b0_dd7aa1dc0a2c; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.log_events_9654203e_ea2b_40e9_b5b0_dd7aa1dc0a2c (
    id character varying(255) NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


--
-- Name: log_events_d87f1904_c1c0_4447_ad38_ed0217bf8ce3; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.log_events_d87f1904_c1c0_4447_ad38_ed0217bf8ce3 (
    id character varying(255) NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


--
-- Name: log_events_eb3721f2_d8fd_4b0e_aa6b_c4bc23dee3fe; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.log_events_eb3721f2_d8fd_4b0e_aa6b_c4bc23dee3fe (
    id character varying(255) NOT NULL,
    body jsonb,
    event_message text,
    "timestamp" timestamp without time zone
);


--
-- Name: oauth_access_grants; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.oauth_access_grants (
    id bigint NOT NULL,
    resource_owner_id integer NOT NULL,
    application_id bigint,
    token character varying(255) NOT NULL,
    expires_in integer NOT NULL,
    redirect_uri text NOT NULL,
    revoked_at timestamp(0) without time zone,
    scopes character varying(255),
    inserted_at timestamp(0) without time zone NOT NULL
);


--
-- Name: oauth_access_grants_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.oauth_access_grants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: oauth_access_grants_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.oauth_access_grants_id_seq OWNED BY _analytics.oauth_access_grants.id;


--
-- Name: oauth_access_tokens; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.oauth_access_tokens (
    id bigint NOT NULL,
    application_id bigint,
    resource_owner_id integer,
    token character varying(255) NOT NULL,
    refresh_token character varying(255),
    expires_in integer,
    revoked_at timestamp(0) without time zone,
    scopes character varying(255),
    previous_refresh_token character varying(255) DEFAULT ''::character varying NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    description text
);


--
-- Name: oauth_access_tokens_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.oauth_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: oauth_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.oauth_access_tokens_id_seq OWNED BY _analytics.oauth_access_tokens.id;


--
-- Name: oauth_applications; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.oauth_applications (
    id bigint NOT NULL,
    owner_id integer NOT NULL,
    name character varying(255) NOT NULL,
    uid character varying(255) NOT NULL,
    secret character varying(255) DEFAULT ''::character varying NOT NULL,
    redirect_uri character varying(255) NOT NULL,
    scopes character varying(255) DEFAULT ''::character varying NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


--
-- Name: oauth_applications_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.oauth_applications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: oauth_applications_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.oauth_applications_id_seq OWNED BY _analytics.oauth_applications.id;


--
-- Name: partner_users; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.partner_users (
    id bigint NOT NULL,
    partner_id bigint,
    user_id bigint
);


--
-- Name: partner_users_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.partner_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: partner_users_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.partner_users_id_seq OWNED BY _analytics.partner_users.id;


--
-- Name: partners; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.partners (
    id bigint NOT NULL,
    name bytea,
    token bytea
);


--
-- Name: partners_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.partners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: partners_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.partners_id_seq OWNED BY _analytics.partners.id;


--
-- Name: payment_methods; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.payment_methods (
    id bigint NOT NULL,
    stripe_id character varying(255),
    price_id character varying(255),
    last_four character varying(255),
    brand character varying(255),
    exp_year integer,
    exp_month integer,
    customer_id character varying(255),
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


--
-- Name: payment_methods_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.payment_methods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment_methods_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.payment_methods_id_seq OWNED BY _analytics.payment_methods.id;


--
-- Name: plans; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.plans (
    id bigint NOT NULL,
    name character varying(255),
    stripe_id character varying(255),
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    period character varying(255),
    price integer,
    limit_sources integer,
    limit_rate_limit integer,
    limit_alert_freq integer,
    limit_source_rate_limit integer,
    limit_saved_search_limit integer,
    limit_team_users_limit integer,
    limit_source_fields_limit integer,
    limit_source_ttl bigint DEFAULT 259200000,
    type character varying(255) DEFAULT 'standard'::character varying
);


--
-- Name: plans_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.plans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: plans_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.plans_id_seq OWNED BY _analytics.plans.id;


--
-- Name: rules; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.rules (
    id bigint NOT NULL,
    regex character varying(255),
    sink uuid NOT NULL,
    source_id bigint NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    regex_struct bytea,
    lql_string text DEFAULT ''::text NOT NULL,
    lql_filters bytea DEFAULT '\x836a'::bytea NOT NULL
);

ALTER TABLE ONLY _analytics.rules REPLICA IDENTITY FULL;


--
-- Name: rules_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.rules_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: rules_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.rules_id_seq OWNED BY _analytics.rules.id;


--
-- Name: saved_search_counters; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.saved_search_counters (
    id bigint NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    saved_search_id bigint NOT NULL,
    granularity text DEFAULT 'day'::text NOT NULL,
    non_tailing_count integer,
    tailing_count integer
);


--
-- Name: saved_search_counters_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.saved_search_counters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: saved_search_counters_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.saved_search_counters_id_seq OWNED BY _analytics.saved_search_counters.id;


--
-- Name: saved_searches; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.saved_searches (
    id bigint NOT NULL,
    querystring text,
    source_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    saved_by_user boolean,
    lql_filters jsonb,
    lql_charts jsonb,
    "tailing?" boolean DEFAULT true NOT NULL,
    tailing boolean DEFAULT true NOT NULL
);


--
-- Name: saved_searches_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.saved_searches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: saved_searches_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.saved_searches_id_seq OWNED BY _analytics.saved_searches.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: schema_migrations_27ff8855_5ef6_43a6_af3a_2e59b30ad843; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.schema_migrations_27ff8855_5ef6_43a6_af3a_2e59b30ad843 (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: schema_migrations_32d33bbf_fe73_42e8_8d75_1fa1e4edf8f1; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.schema_migrations_32d33bbf_fe73_42e8_8d75_1fa1e4edf8f1 (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: schema_migrations_3c60bc6b_af55_4f04_a5c2_57eb908f55e6; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.schema_migrations_3c60bc6b_af55_4f04_a5c2_57eb908f55e6 (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: schema_migrations_46560d7c_01eb_4952_b7a0_2a1922a66545; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.schema_migrations_46560d7c_01eb_4952_b7a0_2a1922a66545 (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: schema_migrations_6552744b_e539_46e9_b09f_ede78abaf896; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.schema_migrations_6552744b_e539_46e9_b09f_ede78abaf896 (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: schema_migrations_6f0f7b96_bf51_49cc_8618_afbef7a612f9; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.schema_migrations_6f0f7b96_bf51_49cc_8618_afbef7a612f9 (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: schema_migrations_9654203e_ea2b_40e9_b5b0_dd7aa1dc0a2c; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.schema_migrations_9654203e_ea2b_40e9_b5b0_dd7aa1dc0a2c (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: schema_migrations_d87f1904_c1c0_4447_ad38_ed0217bf8ce3; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.schema_migrations_d87f1904_c1c0_4447_ad38_ed0217bf8ce3 (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: schema_migrations_eb3721f2_d8fd_4b0e_aa6b_c4bc23dee3fe; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.schema_migrations_eb3721f2_d8fd_4b0e_aa6b_c4bc23dee3fe (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: source_backends; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.source_backends (
    id bigint NOT NULL,
    source_id bigint,
    type character varying(255),
    config jsonb,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


--
-- Name: source_backends_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.source_backends_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: source_backends_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.source_backends_id_seq OWNED BY _analytics.source_backends.id;


--
-- Name: source_schemas; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.source_schemas (
    id bigint NOT NULL,
    bigquery_schema bytea,
    source_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    schema_flat_map bytea
);


--
-- Name: source_schemas_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.source_schemas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: source_schemas_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.source_schemas_id_seq OWNED BY _analytics.source_schemas.id;


--
-- Name: sources; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.sources (
    id bigint NOT NULL,
    name character varying(255),
    token uuid NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    user_id integer NOT NULL,
    public_token character varying(255),
    favorite boolean DEFAULT false NOT NULL,
    bigquery_table_ttl integer,
    api_quota integer DEFAULT 5 NOT NULL,
    webhook_notification_url character varying(255),
    slack_hook_url character varying(255),
    notifications jsonb DEFAULT '{"team_user_ids_for_sms": [], "team_user_ids_for_email": [], "user_text_notifications": false, "user_email_notifications": false, "other_email_notifications": null, "team_user_ids_for_schema_updates": [], "user_schema_update_notifications": true}'::jsonb NOT NULL,
    custom_event_message_keys character varying(255),
    log_events_updated_at timestamp(0) without time zone,
    bigquery_schema bytea,
    notifications_every integer DEFAULT 14400000,
    bq_table_partition_type text,
    lock_schema boolean DEFAULT false,
    validate_schema boolean DEFAULT true,
    drop_lql_filters bytea DEFAULT '\x836a'::bytea NOT NULL,
    drop_lql_string character varying(255),
    v2_pipeline boolean DEFAULT false,
    suggested_keys character varying(255) DEFAULT ''::character varying
);

ALTER TABLE ONLY _analytics.sources REPLICA IDENTITY FULL;


--
-- Name: sources_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.sources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sources_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.sources_id_seq OWNED BY _analytics.sources.id;


--
-- Name: system_metrics; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.system_metrics (
    id bigint NOT NULL,
    all_logs_logged bigint,
    node character varying(255),
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


--
-- Name: system_metrics_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.system_metrics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: system_metrics_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.system_metrics_id_seq OWNED BY _analytics.system_metrics.id;


--
-- Name: team_users; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.team_users (
    id bigint NOT NULL,
    email character varying(255),
    token character varying(255),
    provider character varying(255),
    email_preferred character varying(255),
    name character varying(255),
    image character varying(255),
    email_me_product boolean DEFAULT false NOT NULL,
    phone character varying(255),
    valid_google_account boolean DEFAULT false NOT NULL,
    provider_uid character varying(255),
    team_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    preferences jsonb
);


--
-- Name: team_users_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.team_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: team_users_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.team_users_id_seq OWNED BY _analytics.team_users.id;


--
-- Name: teams; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.teams (
    id bigint NOT NULL,
    name character varying(255),
    user_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    token character varying(255) DEFAULT gen_random_uuid()
);


--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.teams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.teams_id_seq OWNED BY _analytics.teams.id;


--
-- Name: users; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.users (
    id bigint NOT NULL,
    email character varying(255) NOT NULL,
    provider character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    api_key character varying(255) NOT NULL,
    old_api_key character varying(255),
    email_preferred character varying(255),
    name character varying(255),
    image character varying(255),
    email_me_product boolean DEFAULT true NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    phone character varying(255),
    bigquery_project_id character varying(255),
    api_quota integer DEFAULT 125 NOT NULL,
    bigquery_dataset_location character varying(255),
    bigquery_dataset_id character varying(255),
    valid_google_account boolean,
    provider_uid character varying(255),
    company character varying(255),
    bigquery_udfs_hash character varying(255) DEFAULT ''::character varying NOT NULL,
    bigquery_processed_bytes_limit bigint DEFAULT '10000000000'::bigint NOT NULL,
    "billing_enabled?" boolean DEFAULT false NOT NULL,
    preferences jsonb,
    billing_enabled boolean DEFAULT false NOT NULL,
    endpoints_beta boolean DEFAULT false
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.users_id_seq OWNED BY _analytics.users.id;


--
-- Name: vercel_auths; Type: TABLE; Schema: _analytics; Owner: -
--

CREATE TABLE _analytics.vercel_auths (
    id bigint NOT NULL,
    access_token character varying(255),
    installation_id character varying(255),
    team_id character varying(255),
    token_type character varying(255),
    vercel_user_id character varying(255),
    user_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


--
-- Name: vercel_auths_id_seq; Type: SEQUENCE; Schema: _analytics; Owner: -
--

CREATE SEQUENCE _analytics.vercel_auths_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vercel_auths_id_seq; Type: SEQUENCE OWNED BY; Schema: _analytics; Owner: -
--

ALTER SEQUENCE _analytics.vercel_auths_id_seq OWNED BY _analytics.vercel_auths.id;


--
-- Name: extensions; Type: TABLE; Schema: _realtime; Owner: -
--

CREATE TABLE _realtime.extensions (
    id uuid NOT NULL,
    type text,
    settings jsonb,
    tenant_external_id text,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: _realtime; Owner: -
--

CREATE TABLE _realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: tenants; Type: TABLE; Schema: _realtime; Owner: -
--

CREATE TABLE _realtime.tenants (
    id uuid NOT NULL,
    name text,
    external_id text,
    jwt_secret text,
    max_concurrent_users integer DEFAULT 200 NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    max_events_per_second integer DEFAULT 100 NOT NULL,
    postgres_cdc_default text DEFAULT 'postgres_cdc_rls'::text,
    max_bytes_per_second integer DEFAULT 100000 NOT NULL,
    max_channels_per_client integer DEFAULT 100 NOT NULL,
    max_joins_per_second integer DEFAULT 500 NOT NULL,
    suspend boolean DEFAULT false,
    jwt_jwks jsonb
);


--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL
);


--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text
);


--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: -
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: -
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: advancement_level; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.advancement_level (
    level_id integer NOT NULL,
    bucket_slug character varying(50),
    advancement_level integer NOT NULL,
    description text NOT NULL
);


--
-- Name: advancement_level_level_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.advancement_level_level_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: advancement_level_level_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.advancement_level_level_id_seq OWNED BY public.advancement_level.level_id;


--
-- Name: atomic_skill; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.atomic_skill (
    skill_id integer NOT NULL,
    level_id integer,
    name character varying(100) NOT NULL,
    category character varying(50) NOT NULL,
    description text
);


--
-- Name: atomic_skill_skill_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.atomic_skill_skill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: atomic_skill_skill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.atomic_skill_skill_id_seq OWNED BY public.atomic_skill.skill_id;


--
-- Name: band; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.band (
    band_id integer NOT NULL,
    ladder_slug character varying(50),
    threshold integer NOT NULL,
    salary_range character varying(50) NOT NULL,
    band_number integer NOT NULL
);


--
-- Name: band_band_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.band_band_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: band_band_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.band_band_id_seq OWNED BY public.band.band_id;


--
-- Name: band_bucket; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.band_bucket (
    band_id integer NOT NULL,
    bucket_slug character varying(50) NOT NULL
);


--
-- Name: bucket; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bucket (
    bucket_slug character varying(50) NOT NULL,
    bucket_name character varying(100) NOT NULL,
    description text NOT NULL,
    bucket_type character varying(50) NOT NULL
);


--
-- Name: example_project; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.example_project (
    project_id integer NOT NULL,
    level_id integer,
    title character varying(200) NOT NULL,
    overview text NOT NULL
);


--
-- Name: example_project_project_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.example_project_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: example_project_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.example_project_project_id_seq OWNED BY public.example_project.project_id;


--
-- Name: ladder; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ladder (
    ladder_slug character varying(50) NOT NULL,
    ladder_name character varying(50) NOT NULL,
    ladder_tech text[]
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text NOT NULL,
    role public.app_role NOT NULL,
    first_name text,
    last_name text
);


--
-- Name: TABLE profiles; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.profiles IS 'Profile data for each user.';


--
-- Name: COLUMN profiles.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.profiles.id IS 'References the internal Supabase Auth user.';


--
-- Name: scores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scores (
    id integer NOT NULL,
    user_ladder_id integer,
    level_id integer,
    point boolean
);


--
-- Name: scores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.scores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.scores_id_seq OWNED BY public.scores.id;


--
-- Name: user_ladder; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_ladder (
    id integer NOT NULL,
    user_id uuid,
    ladder_slug character varying(50),
    current_band integer,
    technologies text[],
    is_main_ladder boolean
);


--
-- Name: user_ladder_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_ladder_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_ladder_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_ladder_id_seq OWNED BY public.user_ladder.id;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL
);


--
-- Name: TABLE user_roles; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.user_roles IS 'Application roles for each user.';


--
-- Name: user_roles2; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles2 (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL
);


--
-- Name: user_roles2_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.user_roles2 ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.user_roles2_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.user_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user_skills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_skills (
    skill_id integer,
    user_id uuid
);


--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE realtime.messages (
    id bigint NOT NULL,
    topic text NOT NULL,
    extension text NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: realtime; Owner: -
--

CREATE SEQUENCE realtime.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: realtime; Owner: -
--

ALTER SEQUENCE realtime.messages_id_seq OWNED BY realtime.messages.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: -
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: objects; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.objects (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb
);


--
-- Name: hooks; Type: TABLE; Schema: supabase_functions; Owner: -
--

CREATE TABLE supabase_functions.hooks (
    id bigint NOT NULL,
    hook_table_id integer NOT NULL,
    hook_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    request_id bigint
);


--
-- Name: TABLE hooks; Type: COMMENT; Schema: supabase_functions; Owner: -
--

COMMENT ON TABLE supabase_functions.hooks IS 'Supabase Functions Hooks: Audit trail for triggered hooks.';


--
-- Name: hooks_id_seq; Type: SEQUENCE; Schema: supabase_functions; Owner: -
--

CREATE SEQUENCE supabase_functions.hooks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hooks_id_seq; Type: SEQUENCE OWNED BY; Schema: supabase_functions; Owner: -
--

ALTER SEQUENCE supabase_functions.hooks_id_seq OWNED BY supabase_functions.hooks.id;


--
-- Name: migrations; Type: TABLE; Schema: supabase_functions; Owner: -
--

CREATE TABLE supabase_functions.migrations (
    version text NOT NULL,
    inserted_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: decrypted_secrets; Type: VIEW; Schema: vault; Owner: -
--

CREATE VIEW vault.decrypted_secrets AS
 SELECT secrets.id,
    secrets.name,
    secrets.description,
    secrets.secret,
        CASE
            WHEN (secrets.secret IS NULL) THEN NULL::text
            ELSE
            CASE
                WHEN (secrets.key_id IS NULL) THEN NULL::text
                ELSE convert_from(pgsodium.crypto_aead_det_decrypt(decode(secrets.secret, 'base64'::text), convert_to(((((secrets.id)::text || secrets.description) || (secrets.created_at)::text) || (secrets.updated_at)::text), 'utf8'::name), secrets.key_id, secrets.nonce), 'utf8'::name)
            END
        END AS decrypted_secret,
    secrets.key_id,
    secrets.nonce,
    secrets.created_at,
    secrets.updated_at
   FROM vault.secrets;


--
-- Name: billing_accounts id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.billing_accounts ALTER COLUMN id SET DEFAULT nextval('_analytics.billing_accounts_id_seq'::regclass);


--
-- Name: billing_counts id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.billing_counts ALTER COLUMN id SET DEFAULT nextval('_analytics.billing_counts_id_seq'::regclass);


--
-- Name: endpoint_queries id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.endpoint_queries ALTER COLUMN id SET DEFAULT nextval('_analytics.endpoint_queries_id_seq'::regclass);


--
-- Name: oauth_access_grants id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.oauth_access_grants ALTER COLUMN id SET DEFAULT nextval('_analytics.oauth_access_grants_id_seq'::regclass);


--
-- Name: oauth_access_tokens id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.oauth_access_tokens ALTER COLUMN id SET DEFAULT nextval('_analytics.oauth_access_tokens_id_seq'::regclass);


--
-- Name: oauth_applications id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.oauth_applications ALTER COLUMN id SET DEFAULT nextval('_analytics.oauth_applications_id_seq'::regclass);


--
-- Name: partner_users id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.partner_users ALTER COLUMN id SET DEFAULT nextval('_analytics.partner_users_id_seq'::regclass);


--
-- Name: partners id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.partners ALTER COLUMN id SET DEFAULT nextval('_analytics.partners_id_seq'::regclass);


--
-- Name: payment_methods id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.payment_methods ALTER COLUMN id SET DEFAULT nextval('_analytics.payment_methods_id_seq'::regclass);


--
-- Name: plans id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.plans ALTER COLUMN id SET DEFAULT nextval('_analytics.plans_id_seq'::regclass);


--
-- Name: rules id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.rules ALTER COLUMN id SET DEFAULT nextval('_analytics.rules_id_seq'::regclass);


--
-- Name: saved_search_counters id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.saved_search_counters ALTER COLUMN id SET DEFAULT nextval('_analytics.saved_search_counters_id_seq'::regclass);


--
-- Name: saved_searches id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.saved_searches ALTER COLUMN id SET DEFAULT nextval('_analytics.saved_searches_id_seq'::regclass);


--
-- Name: source_backends id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.source_backends ALTER COLUMN id SET DEFAULT nextval('_analytics.source_backends_id_seq'::regclass);


--
-- Name: source_schemas id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.source_schemas ALTER COLUMN id SET DEFAULT nextval('_analytics.source_schemas_id_seq'::regclass);


--
-- Name: sources id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.sources ALTER COLUMN id SET DEFAULT nextval('_analytics.sources_id_seq'::regclass);


--
-- Name: system_metrics id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.system_metrics ALTER COLUMN id SET DEFAULT nextval('_analytics.system_metrics_id_seq'::regclass);


--
-- Name: team_users id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.team_users ALTER COLUMN id SET DEFAULT nextval('_analytics.team_users_id_seq'::regclass);


--
-- Name: teams id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.teams ALTER COLUMN id SET DEFAULT nextval('_analytics.teams_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.users ALTER COLUMN id SET DEFAULT nextval('_analytics.users_id_seq'::regclass);


--
-- Name: vercel_auths id; Type: DEFAULT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.vercel_auths ALTER COLUMN id SET DEFAULT nextval('_analytics.vercel_auths_id_seq'::regclass);


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: advancement_level level_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.advancement_level ALTER COLUMN level_id SET DEFAULT nextval('public.advancement_level_level_id_seq'::regclass);


--
-- Name: atomic_skill skill_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atomic_skill ALTER COLUMN skill_id SET DEFAULT nextval('public.atomic_skill_skill_id_seq'::regclass);


--
-- Name: band band_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.band ALTER COLUMN band_id SET DEFAULT nextval('public.band_band_id_seq'::regclass);


--
-- Name: example_project project_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.example_project ALTER COLUMN project_id SET DEFAULT nextval('public.example_project_project_id_seq'::regclass);


--
-- Name: scores id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scores ALTER COLUMN id SET DEFAULT nextval('public.scores_id_seq'::regclass);


--
-- Name: user_ladder id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_ladder ALTER COLUMN id SET DEFAULT nextval('public.user_ladder_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY realtime.messages ALTER COLUMN id SET DEFAULT nextval('realtime.messages_id_seq'::regclass);


--
-- Name: hooks id; Type: DEFAULT; Schema: supabase_functions; Owner: -
--

ALTER TABLE ONLY supabase_functions.hooks ALTER COLUMN id SET DEFAULT nextval('supabase_functions.hooks_id_seq'::regclass);


--
-- Name: billing_accounts billing_accounts_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.billing_accounts
    ADD CONSTRAINT billing_accounts_pkey PRIMARY KEY (id);


--
-- Name: billing_counts billing_counts_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.billing_counts
    ADD CONSTRAINT billing_counts_pkey PRIMARY KEY (id);


--
-- Name: endpoint_queries endpoint_queries_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.endpoint_queries
    ADD CONSTRAINT endpoint_queries_pkey PRIMARY KEY (id);


--
-- Name: log_events_27ff8855_5ef6_43a6_af3a_2e59b30ad843 log_events_27ff8855_5ef6_43a6_af3a_2e59b30ad843_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.log_events_27ff8855_5ef6_43a6_af3a_2e59b30ad843
    ADD CONSTRAINT log_events_27ff8855_5ef6_43a6_af3a_2e59b30ad843_pkey PRIMARY KEY (id);


--
-- Name: log_events_32d33bbf_fe73_42e8_8d75_1fa1e4edf8f1 log_events_32d33bbf_fe73_42e8_8d75_1fa1e4edf8f1_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.log_events_32d33bbf_fe73_42e8_8d75_1fa1e4edf8f1
    ADD CONSTRAINT log_events_32d33bbf_fe73_42e8_8d75_1fa1e4edf8f1_pkey PRIMARY KEY (id);


--
-- Name: log_events_3c60bc6b_af55_4f04_a5c2_57eb908f55e6 log_events_3c60bc6b_af55_4f04_a5c2_57eb908f55e6_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.log_events_3c60bc6b_af55_4f04_a5c2_57eb908f55e6
    ADD CONSTRAINT log_events_3c60bc6b_af55_4f04_a5c2_57eb908f55e6_pkey PRIMARY KEY (id);


--
-- Name: log_events_46560d7c_01eb_4952_b7a0_2a1922a66545 log_events_46560d7c_01eb_4952_b7a0_2a1922a66545_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.log_events_46560d7c_01eb_4952_b7a0_2a1922a66545
    ADD CONSTRAINT log_events_46560d7c_01eb_4952_b7a0_2a1922a66545_pkey PRIMARY KEY (id);


--
-- Name: log_events_6552744b_e539_46e9_b09f_ede78abaf896 log_events_6552744b_e539_46e9_b09f_ede78abaf896_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.log_events_6552744b_e539_46e9_b09f_ede78abaf896
    ADD CONSTRAINT log_events_6552744b_e539_46e9_b09f_ede78abaf896_pkey PRIMARY KEY (id);


--
-- Name: log_events_6f0f7b96_bf51_49cc_8618_afbef7a612f9 log_events_6f0f7b96_bf51_49cc_8618_afbef7a612f9_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.log_events_6f0f7b96_bf51_49cc_8618_afbef7a612f9
    ADD CONSTRAINT log_events_6f0f7b96_bf51_49cc_8618_afbef7a612f9_pkey PRIMARY KEY (id);


--
-- Name: log_events_9654203e_ea2b_40e9_b5b0_dd7aa1dc0a2c log_events_9654203e_ea2b_40e9_b5b0_dd7aa1dc0a2c_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.log_events_9654203e_ea2b_40e9_b5b0_dd7aa1dc0a2c
    ADD CONSTRAINT log_events_9654203e_ea2b_40e9_b5b0_dd7aa1dc0a2c_pkey PRIMARY KEY (id);


--
-- Name: log_events_d87f1904_c1c0_4447_ad38_ed0217bf8ce3 log_events_d87f1904_c1c0_4447_ad38_ed0217bf8ce3_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.log_events_d87f1904_c1c0_4447_ad38_ed0217bf8ce3
    ADD CONSTRAINT log_events_d87f1904_c1c0_4447_ad38_ed0217bf8ce3_pkey PRIMARY KEY (id);


--
-- Name: log_events_eb3721f2_d8fd_4b0e_aa6b_c4bc23dee3fe log_events_eb3721f2_d8fd_4b0e_aa6b_c4bc23dee3fe_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.log_events_eb3721f2_d8fd_4b0e_aa6b_c4bc23dee3fe
    ADD CONSTRAINT log_events_eb3721f2_d8fd_4b0e_aa6b_c4bc23dee3fe_pkey PRIMARY KEY (id);


--
-- Name: oauth_access_grants oauth_access_grants_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.oauth_access_grants
    ADD CONSTRAINT oauth_access_grants_pkey PRIMARY KEY (id);


--
-- Name: oauth_access_tokens oauth_access_tokens_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.oauth_access_tokens
    ADD CONSTRAINT oauth_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: oauth_applications oauth_applications_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.oauth_applications
    ADD CONSTRAINT oauth_applications_pkey PRIMARY KEY (id);


--
-- Name: partner_users partner_users_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.partner_users
    ADD CONSTRAINT partner_users_pkey PRIMARY KEY (id);


--
-- Name: partners partners_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.partners
    ADD CONSTRAINT partners_pkey PRIMARY KEY (id);


--
-- Name: payment_methods payment_methods_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.payment_methods
    ADD CONSTRAINT payment_methods_pkey PRIMARY KEY (id);


--
-- Name: plans plans_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.plans
    ADD CONSTRAINT plans_pkey PRIMARY KEY (id);


--
-- Name: rules rules_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.rules
    ADD CONSTRAINT rules_pkey PRIMARY KEY (id);


--
-- Name: saved_search_counters saved_search_counters_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.saved_search_counters
    ADD CONSTRAINT saved_search_counters_pkey PRIMARY KEY (id);


--
-- Name: saved_searches saved_searches_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.saved_searches
    ADD CONSTRAINT saved_searches_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations_27ff8855_5ef6_43a6_af3a_2e59b30ad843 schema_migrations_27ff8855_5ef6_43a6_af3a_2e59b30ad843_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.schema_migrations_27ff8855_5ef6_43a6_af3a_2e59b30ad843
    ADD CONSTRAINT schema_migrations_27ff8855_5ef6_43a6_af3a_2e59b30ad843_pkey PRIMARY KEY (version);


--
-- Name: schema_migrations_32d33bbf_fe73_42e8_8d75_1fa1e4edf8f1 schema_migrations_32d33bbf_fe73_42e8_8d75_1fa1e4edf8f1_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.schema_migrations_32d33bbf_fe73_42e8_8d75_1fa1e4edf8f1
    ADD CONSTRAINT schema_migrations_32d33bbf_fe73_42e8_8d75_1fa1e4edf8f1_pkey PRIMARY KEY (version);


--
-- Name: schema_migrations_3c60bc6b_af55_4f04_a5c2_57eb908f55e6 schema_migrations_3c60bc6b_af55_4f04_a5c2_57eb908f55e6_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.schema_migrations_3c60bc6b_af55_4f04_a5c2_57eb908f55e6
    ADD CONSTRAINT schema_migrations_3c60bc6b_af55_4f04_a5c2_57eb908f55e6_pkey PRIMARY KEY (version);


--
-- Name: schema_migrations_46560d7c_01eb_4952_b7a0_2a1922a66545 schema_migrations_46560d7c_01eb_4952_b7a0_2a1922a66545_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.schema_migrations_46560d7c_01eb_4952_b7a0_2a1922a66545
    ADD CONSTRAINT schema_migrations_46560d7c_01eb_4952_b7a0_2a1922a66545_pkey PRIMARY KEY (version);


--
-- Name: schema_migrations_6552744b_e539_46e9_b09f_ede78abaf896 schema_migrations_6552744b_e539_46e9_b09f_ede78abaf896_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.schema_migrations_6552744b_e539_46e9_b09f_ede78abaf896
    ADD CONSTRAINT schema_migrations_6552744b_e539_46e9_b09f_ede78abaf896_pkey PRIMARY KEY (version);


--
-- Name: schema_migrations_6f0f7b96_bf51_49cc_8618_afbef7a612f9 schema_migrations_6f0f7b96_bf51_49cc_8618_afbef7a612f9_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.schema_migrations_6f0f7b96_bf51_49cc_8618_afbef7a612f9
    ADD CONSTRAINT schema_migrations_6f0f7b96_bf51_49cc_8618_afbef7a612f9_pkey PRIMARY KEY (version);


--
-- Name: schema_migrations_9654203e_ea2b_40e9_b5b0_dd7aa1dc0a2c schema_migrations_9654203e_ea2b_40e9_b5b0_dd7aa1dc0a2c_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.schema_migrations_9654203e_ea2b_40e9_b5b0_dd7aa1dc0a2c
    ADD CONSTRAINT schema_migrations_9654203e_ea2b_40e9_b5b0_dd7aa1dc0a2c_pkey PRIMARY KEY (version);


--
-- Name: schema_migrations_d87f1904_c1c0_4447_ad38_ed0217bf8ce3 schema_migrations_d87f1904_c1c0_4447_ad38_ed0217bf8ce3_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.schema_migrations_d87f1904_c1c0_4447_ad38_ed0217bf8ce3
    ADD CONSTRAINT schema_migrations_d87f1904_c1c0_4447_ad38_ed0217bf8ce3_pkey PRIMARY KEY (version);


--
-- Name: schema_migrations_eb3721f2_d8fd_4b0e_aa6b_c4bc23dee3fe schema_migrations_eb3721f2_d8fd_4b0e_aa6b_c4bc23dee3fe_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.schema_migrations_eb3721f2_d8fd_4b0e_aa6b_c4bc23dee3fe
    ADD CONSTRAINT schema_migrations_eb3721f2_d8fd_4b0e_aa6b_c4bc23dee3fe_pkey PRIMARY KEY (version);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: source_backends source_backends_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.source_backends
    ADD CONSTRAINT source_backends_pkey PRIMARY KEY (id);


--
-- Name: source_schemas source_schemas_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.source_schemas
    ADD CONSTRAINT source_schemas_pkey PRIMARY KEY (id);


--
-- Name: sources sources_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.sources
    ADD CONSTRAINT sources_pkey PRIMARY KEY (id);


--
-- Name: system_metrics system_metrics_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.system_metrics
    ADD CONSTRAINT system_metrics_pkey PRIMARY KEY (id);


--
-- Name: team_users team_users_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.team_users
    ADD CONSTRAINT team_users_pkey PRIMARY KEY (id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vercel_auths vercel_auths_pkey; Type: CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.vercel_auths
    ADD CONSTRAINT vercel_auths_pkey PRIMARY KEY (id);


--
-- Name: extensions extensions_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: -
--

ALTER TABLE ONLY _realtime.extensions
    ADD CONSTRAINT extensions_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: -
--

ALTER TABLE ONLY _realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: -
--

ALTER TABLE ONLY _realtime.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: advancement_level advancement_level_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.advancement_level
    ADD CONSTRAINT advancement_level_pkey PRIMARY KEY (level_id);


--
-- Name: atomic_skill atomic_skill_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atomic_skill
    ADD CONSTRAINT atomic_skill_pkey PRIMARY KEY (skill_id);


--
-- Name: band_bucket band_bucket_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.band_bucket
    ADD CONSTRAINT band_bucket_pkey PRIMARY KEY (band_id, bucket_slug);


--
-- Name: band band_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.band
    ADD CONSTRAINT band_pkey PRIMARY KEY (band_id);


--
-- Name: bucket bucket_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bucket
    ADD CONSTRAINT bucket_pkey PRIMARY KEY (bucket_slug);


--
-- Name: example_project example_project_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.example_project
    ADD CONSTRAINT example_project_pkey PRIMARY KEY (project_id);


--
-- Name: ladder ladder_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ladder
    ADD CONSTRAINT ladder_pkey PRIMARY KEY (ladder_slug);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: scores scores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_pkey PRIMARY KEY (id);


--
-- Name: user_ladder user_ladder_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_ladder
    ADD CONSTRAINT user_ladder_pkey PRIMARY KEY (id);


--
-- Name: user_roles2 user_roles2_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles2
    ADD CONSTRAINT user_roles2_pkey PRIMARY KEY (id);


--
-- Name: user_roles2 user_roles2_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles2
    ADD CONSTRAINT user_roles2_user_id_role_key UNIQUE (user_id, role);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: user_skills user_skills_skill_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_skill_id_user_id_key UNIQUE (skill_id, user_id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: hooks hooks_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: -
--

ALTER TABLE ONLY supabase_functions.hooks
    ADD CONSTRAINT hooks_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: -
--

ALTER TABLE ONLY supabase_functions.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (version);


--
-- Name: billing_accounts_stripe_customer_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX billing_accounts_stripe_customer_index ON _analytics.billing_accounts USING btree (stripe_customer);


--
-- Name: billing_accounts_user_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX billing_accounts_user_id_index ON _analytics.billing_accounts USING btree (user_id);


--
-- Name: billing_counts_inserted_at_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE INDEX billing_counts_inserted_at_index ON _analytics.billing_counts USING btree (inserted_at);


--
-- Name: billing_counts_source_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE INDEX billing_counts_source_id_index ON _analytics.billing_counts USING btree (source_id);


--
-- Name: billing_counts_user_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE INDEX billing_counts_user_id_index ON _analytics.billing_counts USING btree (user_id);


--
-- Name: endpoint_queries_token_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX endpoint_queries_token_index ON _analytics.endpoint_queries USING btree (token);


--
-- Name: endpoint_queries_user_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE INDEX endpoint_queries_user_id_index ON _analytics.endpoint_queries USING btree (user_id);


--
-- Name: oauth_access_grants_token_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX oauth_access_grants_token_index ON _analytics.oauth_access_grants USING btree (token);


--
-- Name: oauth_access_tokens_refresh_token_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX oauth_access_tokens_refresh_token_index ON _analytics.oauth_access_tokens USING btree (refresh_token);


--
-- Name: oauth_access_tokens_resource_owner_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE INDEX oauth_access_tokens_resource_owner_id_index ON _analytics.oauth_access_tokens USING btree (resource_owner_id);


--
-- Name: oauth_access_tokens_token_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX oauth_access_tokens_token_index ON _analytics.oauth_access_tokens USING btree (token);


--
-- Name: oauth_applications_owner_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE INDEX oauth_applications_owner_id_index ON _analytics.oauth_applications USING btree (owner_id);


--
-- Name: oauth_applications_uid_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX oauth_applications_uid_index ON _analytics.oauth_applications USING btree (uid);


--
-- Name: partner_users_partner_id_user_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX partner_users_partner_id_user_id_index ON _analytics.partner_users USING btree (partner_id, user_id);


--
-- Name: payment_methods_customer_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE INDEX payment_methods_customer_id_index ON _analytics.payment_methods USING btree (customer_id);


--
-- Name: payment_methods_stripe_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX payment_methods_stripe_id_index ON _analytics.payment_methods USING btree (stripe_id);


--
-- Name: rules_source_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE INDEX rules_source_id_index ON _analytics.rules USING btree (source_id);


--
-- Name: saved_search_counters_timestamp_saved_search_id_granularity_ind; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX saved_search_counters_timestamp_saved_search_id_granularity_ind ON _analytics.saved_search_counters USING btree ("timestamp", saved_search_id, granularity);


--
-- Name: saved_searches_querystring_source_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX saved_searches_querystring_source_id_index ON _analytics.saved_searches USING btree (querystring, source_id);


--
-- Name: source_schemas_source_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX source_schemas_source_id_index ON _analytics.source_schemas USING btree (source_id);


--
-- Name: sources_name_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX sources_name_index ON _analytics.sources USING btree (id, name);


--
-- Name: sources_public_token_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX sources_public_token_index ON _analytics.sources USING btree (public_token);


--
-- Name: sources_token_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX sources_token_index ON _analytics.sources USING btree (token);


--
-- Name: sources_user_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE INDEX sources_user_id_index ON _analytics.sources USING btree (user_id);


--
-- Name: system_metrics_node_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE INDEX system_metrics_node_index ON _analytics.system_metrics USING btree (node);


--
-- Name: team_users_provider_uid_team_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX team_users_provider_uid_team_id_index ON _analytics.team_users USING btree (provider_uid, team_id);


--
-- Name: team_users_team_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE INDEX team_users_team_id_index ON _analytics.team_users USING btree (team_id);


--
-- Name: teams_token_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX teams_token_index ON _analytics.teams USING btree (token);


--
-- Name: teams_user_id_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX teams_user_id_index ON _analytics.teams USING btree (user_id);


--
-- Name: users_api_key_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE INDEX users_api_key_index ON _analytics.users USING btree (api_key);


--
-- Name: users_lower_email_index; Type: INDEX; Schema: _analytics; Owner: -
--

CREATE UNIQUE INDEX users_lower_email_index ON _analytics.users USING btree (lower((email)::text));


--
-- Name: extensions_tenant_external_id_type_index; Type: INDEX; Schema: _realtime; Owner: -
--

CREATE UNIQUE INDEX extensions_tenant_external_id_type_index ON _realtime.extensions USING btree (tenant_external_id, type);


--
-- Name: tenants_external_id_index; Type: INDEX; Schema: _realtime; Owner: -
--

CREATE UNIQUE INDEX tenants_external_id_index ON _realtime.tenants USING btree (external_id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: -
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING hash (entity);


--
-- Name: messages_topic_index; Type: INDEX; Schema: realtime; Owner: -
--

CREATE INDEX messages_topic_index ON realtime.messages USING btree (topic);


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: -
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: supabase_functions_hooks_h_table_id_h_name_idx; Type: INDEX; Schema: supabase_functions; Owner: -
--

CREATE INDEX supabase_functions_hooks_h_table_id_h_name_idx ON supabase_functions.hooks USING btree (hook_table_id, hook_name);


--
-- Name: supabase_functions_hooks_request_id_idx; Type: INDEX; Schema: supabase_functions; Owner: -
--

CREATE INDEX supabase_functions_hooks_request_id_idx ON supabase_functions.hooks USING btree (request_id);


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: -
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: billing_accounts billing_accounts_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.billing_accounts
    ADD CONSTRAINT billing_accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id) ON DELETE CASCADE;


--
-- Name: billing_counts billing_counts_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.billing_counts
    ADD CONSTRAINT billing_counts_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id) ON DELETE CASCADE;


--
-- Name: endpoint_queries endpoint_queries_sandbox_query_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.endpoint_queries
    ADD CONSTRAINT endpoint_queries_sandbox_query_id_fkey FOREIGN KEY (sandbox_query_id) REFERENCES _analytics.endpoint_queries(id);


--
-- Name: endpoint_queries endpoint_queries_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.endpoint_queries
    ADD CONSTRAINT endpoint_queries_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id);


--
-- Name: oauth_access_grants oauth_access_grants_application_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.oauth_access_grants
    ADD CONSTRAINT oauth_access_grants_application_id_fkey FOREIGN KEY (application_id) REFERENCES _analytics.oauth_applications(id);


--
-- Name: oauth_access_tokens oauth_access_tokens_application_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.oauth_access_tokens
    ADD CONSTRAINT oauth_access_tokens_application_id_fkey FOREIGN KEY (application_id) REFERENCES _analytics.oauth_applications(id);


--
-- Name: partner_users partner_users_partner_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.partner_users
    ADD CONSTRAINT partner_users_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES _analytics.partners(id);


--
-- Name: partner_users partner_users_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.partner_users
    ADD CONSTRAINT partner_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id);


--
-- Name: payment_methods payment_methods_customer_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.payment_methods
    ADD CONSTRAINT payment_methods_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES _analytics.billing_accounts(stripe_customer) ON DELETE CASCADE;


--
-- Name: rules rules_sink_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.rules
    ADD CONSTRAINT rules_sink_fkey FOREIGN KEY (sink) REFERENCES _analytics.sources(token) ON DELETE CASCADE;


--
-- Name: rules rules_source_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.rules
    ADD CONSTRAINT rules_source_id_fkey FOREIGN KEY (source_id) REFERENCES _analytics.sources(id) ON DELETE CASCADE;


--
-- Name: saved_search_counters saved_search_counters_saved_search_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.saved_search_counters
    ADD CONSTRAINT saved_search_counters_saved_search_id_fkey FOREIGN KEY (saved_search_id) REFERENCES _analytics.saved_searches(id) ON DELETE CASCADE;


--
-- Name: saved_searches saved_searches_source_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.saved_searches
    ADD CONSTRAINT saved_searches_source_id_fkey FOREIGN KEY (source_id) REFERENCES _analytics.sources(id) ON DELETE CASCADE;


--
-- Name: source_backends source_backends_source_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.source_backends
    ADD CONSTRAINT source_backends_source_id_fkey FOREIGN KEY (source_id) REFERENCES _analytics.sources(id);


--
-- Name: source_schemas source_schemas_source_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.source_schemas
    ADD CONSTRAINT source_schemas_source_id_fkey FOREIGN KEY (source_id) REFERENCES _analytics.sources(id) ON DELETE CASCADE;


--
-- Name: sources sources_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.sources
    ADD CONSTRAINT sources_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id) ON DELETE CASCADE;


--
-- Name: team_users team_users_team_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.team_users
    ADD CONSTRAINT team_users_team_id_fkey FOREIGN KEY (team_id) REFERENCES _analytics.teams(id) ON DELETE CASCADE;


--
-- Name: teams teams_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.teams
    ADD CONSTRAINT teams_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id) ON DELETE CASCADE;


--
-- Name: vercel_auths vercel_auths_user_id_fkey; Type: FK CONSTRAINT; Schema: _analytics; Owner: -
--

ALTER TABLE ONLY _analytics.vercel_auths
    ADD CONSTRAINT vercel_auths_user_id_fkey FOREIGN KEY (user_id) REFERENCES _analytics.users(id) ON DELETE CASCADE;


--
-- Name: extensions extensions_tenant_external_id_fkey; Type: FK CONSTRAINT; Schema: _realtime; Owner: -
--

ALTER TABLE ONLY _realtime.extensions
    ADD CONSTRAINT extensions_tenant_external_id_fkey FOREIGN KEY (tenant_external_id) REFERENCES _realtime.tenants(external_id) ON DELETE CASCADE;


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: advancement_level advancement_level_bucket_slug_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.advancement_level
    ADD CONSTRAINT advancement_level_bucket_slug_fkey FOREIGN KEY (bucket_slug) REFERENCES public.bucket(bucket_slug);


--
-- Name: atomic_skill atomic_skill_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atomic_skill
    ADD CONSTRAINT atomic_skill_level_id_fkey FOREIGN KEY (level_id) REFERENCES public.advancement_level(level_id);


--
-- Name: band_bucket band_bucket_band_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.band_bucket
    ADD CONSTRAINT band_bucket_band_id_fkey FOREIGN KEY (band_id) REFERENCES public.band(band_id);


--
-- Name: band_bucket band_bucket_bucket_slug_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.band_bucket
    ADD CONSTRAINT band_bucket_bucket_slug_fkey FOREIGN KEY (bucket_slug) REFERENCES public.bucket(bucket_slug);


--
-- Name: band band_ladder_slug_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.band
    ADD CONSTRAINT band_ladder_slug_fkey FOREIGN KEY (ladder_slug) REFERENCES public.ladder(ladder_slug);


--
-- Name: example_project example_project_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.example_project
    ADD CONSTRAINT example_project_level_id_fkey FOREIGN KEY (level_id) REFERENCES public.advancement_level(level_id);


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);


--
-- Name: scores scores_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_level_id_fkey FOREIGN KEY (level_id) REFERENCES public.advancement_level(level_id);


--
-- Name: scores scores_user_ladder_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_user_ladder_id_fkey FOREIGN KEY (user_ladder_id) REFERENCES public.user_ladder(id);


--
-- Name: user_ladder user_ladder_current_band_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_ladder
    ADD CONSTRAINT user_ladder_current_band_fkey FOREIGN KEY (current_band) REFERENCES public.band(band_id);


--
-- Name: user_ladder user_ladder_ladder_slug_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_ladder
    ADD CONSTRAINT user_ladder_ladder_slug_fkey FOREIGN KEY (ladder_slug) REFERENCES public.ladder(ladder_slug);


--
-- Name: user_ladder user_ladder_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_ladder
    ADD CONSTRAINT user_ladder_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: user_roles2 user_roles2_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles2
    ADD CONSTRAINT user_roles2_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_skills user_skills_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.atomic_skill(skill_id);


--
-- Name: user_skills user_skills_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: buckets buckets_owner_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_owner_fkey FOREIGN KEY (owner) REFERENCES auth.users(id);


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: objects objects_owner_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_owner_fkey FOREIGN KEY (owner) REFERENCES auth.users(id);


--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: -
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: logflare_pub; Type: PUBLICATION; Schema: -; Owner: -
--

CREATE PUBLICATION logflare_pub WITH (publish = 'insert, update, delete, truncate');


--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: -
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


--
-- Name: logflare_pub billing_accounts; Type: PUBLICATION TABLE; Schema: _analytics; Owner: -
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.billing_accounts;


--
-- Name: logflare_pub plans; Type: PUBLICATION TABLE; Schema: _analytics; Owner: -
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.plans;


--
-- Name: logflare_pub rules; Type: PUBLICATION TABLE; Schema: _analytics; Owner: -
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.rules;


--
-- Name: logflare_pub source_schemas; Type: PUBLICATION TABLE; Schema: _analytics; Owner: -
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.source_schemas;


--
-- Name: logflare_pub sources; Type: PUBLICATION TABLE; Schema: _analytics; Owner: -
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.sources;


--
-- Name: logflare_pub users; Type: PUBLICATION TABLE; Schema: _analytics; Owner: -
--

ALTER PUBLICATION logflare_pub ADD TABLE ONLY _analytics.users;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO _analytics.schema_migrations (version) VALUES
    ('20181212161742'),
    ('20181212220417'),
    ('20181212220843'),
    ('20181219123536'),
    ('20181220234951'),
    ('20190111193432'),
    ('20190111222747'),
    ('20190111223908'),
    ('20190128145905'),
    ('20190211145604'),
    ('20190211215002'),
    ('20190212190412'),
    ('20190218171231'),
    ('20190220020658'),
    ('20190220150309'),
    ('20190226224323'),
    ('20190226225345'),
    ('20190313222100'),
    ('20190314210542'),
    ('20190314234158'),
    ('20190321135403'),
    ('20190322184724'),
    ('20190322194928'),
    ('20190326182605'),
    ('20190507163835'),
    ('20190509154645'),
    ('20190522200854'),
    ('20190528132518'),
    ('20190603134249'),
    ('20190604130811'),
    ('20190814185734'),
    ('20190815222912'),
    ('20190820170701'),
    ('20190823211533'),
    ('20190912214717'),
    ('20191007163747'),
    ('20191014233159'),
    ('20191108163345'),
    ('20191111221000'),
    ('20191114120409'),
    ('20191226181646'),
    ('20191230164304'),
    ('20200106161131'),
    ('20200109165508'),
    ('20200113132611'),
    ('20200114231904'),
    ('20200116122225'),
    ('20200116143027'),
    ('20200130185455'),
    ('20200205180641'),
    ('20200311175358'),
    ('20200317130710'),
    ('20200319164038'),
    ('20200320161900'),
    ('20200401102642'),
    ('20200401132720'),
    ('20200401182732'),
    ('20200402180315'),
    ('20200403130311'),
    ('20200409120508'),
    ('20200409150827'),
    ('20200413161605'),
    ('20200422211654'),
    ('20200507184618'),
    ('20200512205718'),
    ('20200513154911'),
    ('20200519181117'),
    ('20200603150413'),
    ('20200605164057'),
    ('20200605185446'),
    ('20200606140153'),
    ('20200803211251'),
    ('20200806201742'),
    ('20200824155733'),
    ('20200826141015'),
    ('20201130170051'),
    ('20201211125013'),
    ('20201229174131'),
    ('20210104192144'),
    ('20210106205729'),
    ('20210118220058'),
    ('20210121220159'),
    ('20210204203050'),
    ('20210215163446'),
    ('20210215165548'),
    ('20210322193905'),
    ('20210521142331'),
    ('20210526120333'),
    ('20210707201854'),
    ('20210712201152'),
    ('20210715022534'),
    ('20210728172720'),
    ('20210729161959'),
    ('20210802194723'),
    ('20210803020354'),
    ('20210804210634'),
    ('20210810182003'),
    ('20210830181842'),
    ('20211027175016'),
    ('20211122181200'),
    ('20211123192744'),
    ('20211130190948'),
    ('20211130201505'),
    ('20220310172806'),
    ('20220523135557'),
    ('20220524125216'),
    ('20220707030041'),
    ('20220714033012'),
    ('20220803211705'),
    ('20221210010955'),
    ('20221210011115'),
    ('20230110121321'),
    ('20230206155428'),
    ('20230223162441'),
    ('20230227183828'),
    ('20230622160150'),
    ('20230622160250'),
    ('20230714041101'),
    ('20230727111150'),
    ('20240902104730'),
    ('20240902111057'),
    ('20240903024911');
