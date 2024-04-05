ARG BASE_IMAGE=python:3.12.1-alpine3.19

###########################################################
# Tools stage
###########################################################
FROM --platform=linux/amd64 ${BASE_IMAGE} AS tools

# Install curl
RUN apk add --no-cache curl

# Download waitforit
RUN curl -o /usr/local/bin/waitforit -sSL https://github.com/maxcnunes/waitforit/releases/download/v2.4.1/waitforit-linux_amd64 && \
    chmod +x /usr/local/bin/waitforit

# Download poetry
ENV POETRY_HOME=/opt/poetry \
    POETRY_VERSION=1.7.1
RUN curl -sSL https://install.python-poetry.org | python


###########################################################
# Base stage
###########################################################
FROM --platform=linux/amd64 ${BASE_IMAGE} AS base

# Install runtime dependencies
RUN apk add --no-cache bash libpq

# Enable unbuffered logging and prevent Python from writing pyc files
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Copy waitforit from tools stage
COPY --from=tools /usr/local/bin/waitforit /usr/local/bin/waitforit

WORKDIR /src

# Copy and set entrypoint script
COPY --chmod=755 docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]


###########################################################
# Build stage
###########################################################
FROM base AS build

# Install build dependencies
RUN apk update && apk add gcc musl-dev postgresql-dev python3-dev

# Copy poetry from tools stage
COPY --from=tools /opt/poetry /opt/poetry

# Add poetry to PATH
ENV PATH=/opt/poetry/bin:${PATH}

# Configure poetry
RUN poetry config virtualenvs.create false && \
    poetry config cache-dir /var/cache/poetry

# Copy project requirements from host
COPY src/pyproject.toml src/README.md src/poetry.lock* ./

# Install dependencies (without dev dependencies)
RUN poetry install --without dev


###########################################################
# Development environment stage:
###########################################################
FROM build AS dev

# Install (with dev dependencies)
RUN poetry install --with dev

# Copy the application source code and tests from the host
COPY --chown=root:root ./src/cpf/ ./cpf/
COPY --chown=root:root ./src/tests/ ./tests/

# Run the application as root for local development
USER root


###########################################################
# Distribution environment stage:
###########################################################
FROM base AS dist

# Copy the runtime dependencies from the build stage
COPY --chown=root:root --from=build /usr/local/lib/python3.12/site-packages/ /usr/local/lib/python3.12/site-packages/
# Copy the application source code from the host
COPY --chown=root:root ./src/cpf/ ./cpf/

# Create and run as non-root user
RUN adduser -S -u 82 -D -h /var/www -s /sbin/nologin -G www-data www-data
USER www-data
