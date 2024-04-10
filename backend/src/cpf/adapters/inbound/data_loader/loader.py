import json
import os

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
    service = get_manage_service()
    if service.check_if_data_is_exists():
        print("Skipping, data already populated ...")
        return None

    # Upload buckets to database
    buckets_path = os.path.join(os.path.dirname(__file__), "data/buckets/")
    for bucket_data_path in os.listdir(buckets_path):
        with open(os.path.join(buckets_path, bucket_data_path)) as file:
            bucket_data = json.loads(file.read())
            service.create_bucket(bucket_data=bucket_data)
            print(f"Bucket created from file {bucket_data_path}")

    # Upload ladders to database
    ladder_path = os.path.join(os.path.dirname(__file__), "data/ladders")
    for ladder_data_path in os.listdir(ladder_path):
        with open(os.path.join(ladder_path, ladder_data_path)) as file:
            ladder_data = json.loads(file.read())
            service.create_ladder(ladder_data=ladder_data)
            print(f"Ladder created from file {ladder_data_path}")
