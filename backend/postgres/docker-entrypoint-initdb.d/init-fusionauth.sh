#!/bin/bash
set -e

# Default values if environment variables are not provided
FUSIONAUTH_POSTGRES_DB="${FUSIONAUTH_POSTGRES_DB:-fusionauth}"
FUSIONAUTH_POSTGRES_USER="${FUSIONAUTH_POSTGRES_USER:-fusionauth}"
FUSIONAUTH_POSTGRES_PASSWORD="${FUSIONAUTH_POSTGRES_PASSWORD:-password}"

# Create the Fusionauth database
psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d postgres <<-EOSQL
    CREATE DATABASE "$FUSIONAUTH_POSTGRES_DB";
EOSQL

# Create the Fusionauth user and set the password
psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d postgres <<-EOSQL
    CREATE USER "$FUSIONAUTH_POSTGRES_USER" WITH ENCRYPTED PASSWORD '$FUSIONAUTH_POSTGRES_PASSWORD';
    ALTER DATABASE "$FUSIONAUTH_POSTGRES_DB" OWNER TO "$FUSIONAUTH_POSTGRES_USER";
    GRANT ALL PRIVILEGES ON DATABASE "$FUSIONAUTH_POSTGRES_DB" TO "$FUSIONAUTH_POSTGRES_USER";
EOSQL

echo "Fusionauth database and user created."