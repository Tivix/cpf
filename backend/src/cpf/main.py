import sys

import cpf.adapters.inbound.data_loader.loader as loader
import cpf.adapters.inbound.rest_api.rest_api as rest_api
from cpf.adapters.outbound.postgres.daos import bucket_dao_factory, ladder_dao_factory
from cpf.adapters.outbound.postgres.repositories import (
    bucket_repository_factory,
    ladder_repository_factory,
)
from cpf.core.domain.services import LadderManageService, LibraryQueryService


def rest_api_app():
    ladder_dao = ladder_dao_factory()
    bucket_dao = bucket_dao_factory()

    library_manage_service = LadderManageService(
        ladder_repository=ladder_repository_factory(),
        bucket_repository=bucket_repository_factory(),
        ladder_dao=ladder_dao,
        bucket_dao=bucket_dao,
    )
    query_service = LibraryQueryService(ladder_dao=ladder_dao, bucket_dao=bucket_dao)

    rest_api.set_library_manage_service(library_manage_service)
    rest_api.set_library_query_service(query_service)
    return rest_api.app


def data_loader():
    ladder_dao = ladder_dao_factory()
    bucket_dao = bucket_dao_factory()

    library_manage_service = LadderManageService(
        ladder_repository=ladder_repository_factory(),
        bucket_repository=bucket_repository_factory(),
        ladder_dao=ladder_dao,
        bucket_dao=bucket_dao,
    )

    loader.set_manage_service(service=library_manage_service)
    loader.start_data_upload()


if __name__ == "__main__":
    print("Starting app...")
    if len(sys.argv) > 1 and sys.argv[1] == "data-loader":
        data_loader()
