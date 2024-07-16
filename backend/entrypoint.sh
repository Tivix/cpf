#!/bin/bash -e
echo ${1}
if [[ "${1}" == "init" ]]; then
  # run checks and do migrations
  echo "Running init"
elif [[ "${1}" == "api-server" ]]; then
  echo "Running api-server"
  exec gunicorn -c cpf/gunicorn.conf.py "cpf.main:rest_api_app" --factory
elif [[ "${1}" == "api-server-dev" ]]; then
  if [[ "${ENV}" != "local" ]]; then
    echo "ERROR: ENV variable must be set to local to run api-server-dev"
    exit 1
  fi
  echo "Running api-server-dev"
  exec uvicorn cpf.main:rest_api_app --factory --reload --host 0.0.0.0 --port 8001
elif [[ "${1}" == "data-loader" ]]; then
  export PYTHONPATH=/src:${PYTHONPATH}
  exec python cpf/main.py data-loader
else
  exec "${@}"
fi
