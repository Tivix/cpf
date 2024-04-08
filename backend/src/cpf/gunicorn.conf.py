import multiprocessing
import os

# Server and Worker configuration
bind = "0.0.0.0:8000"
workers = os.getenv("GUNICORN_WORKERS", multiprocessing.cpu_count() * 2 + 1)
worker_class = "uvicorn.workers.UvicornWorker"
worker_connections = 1000
max_requests = 1200
max_requests_jitter = 50
timeout = 120
keepalive = 5
backlog = 2048

# Logging
loglevel = "info"
accesslog = "-"  # stdout
errorlog = "-"  # stderr
capture_output = True


# Application hooks
def post_fork(server, worker):
    server.log.info("Worker spawned (pid: %s)", worker.pid)


def when_ready(server):
    server.log.info("Server is ready. Spawning workers")


def worker_int(worker):
    worker.log.info("Worker received INT or QUIT signal")


def worker_abort(worker):
    worker.log.info("Worker received SIGABRT signal")


def pre_exec(server):
    server.log.info("Forked child, re-executing.")
