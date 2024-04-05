FROM postgres:14-alpine

COPY postgresql.conf.sample /usr/local/share/postgresql/postgresql.conf.sample
COPY docker-entrypoint-initdb.d /docker-entrypoint-initdb.d
RUN chmod -R +x /docker-entrypoint-initdb.d
