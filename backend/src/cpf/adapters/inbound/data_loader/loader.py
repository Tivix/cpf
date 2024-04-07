import json
from cpf.core.ports.provided.services import ManageService

manage_service: ManageService | None = None


def set_manage_service(service: ManageService):
    global manage_service
    manage_service = service


def get_manage_service() -> ManageService:
    if not manage_service:
        raise RuntimeError("Manage service not set")
    return manage_service


def start_data_upload() -> None:
    manage_service = get_manage_service()
    # TODO Rebuild to load all buckets
    import os
    with open(os.path.join(os.path.dirname(__file__), "data/buckets/programming_language.json")) as file:
        bucket_data = json.loads(file.read())
        manage_service.create_bucket(bucket_data=bucket_data)

    with open(os.path.join(os.path.dirname(__file__), "data/ladders/backend.json")) as file:
        ladder_data = json.loads(file.read())
        manage_service.create_ladder(ladder_data=ladder_data)

