import os
from unittest import mock

from fastapi.testclient import TestClient

from cpf.adapters.inbound.rest_api import rest_api
from tests.mocks import MockQueryService

_BASE_URL = "/cpf/api"


@mock.patch.dict(os.environ, {"BASE_URL": _BASE_URL})
def mock_client_factory() -> TestClient:
    rest_api.set_library_query_service(MockQueryService())
    return TestClient(app=rest_api.app)
