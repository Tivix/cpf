from tests.factories import mock_client_factory

client = mock_client_factory()


def test_get_ladders():
    response = client.get(url="/cpf/api/library/ladders")
    assert response.status_code == 200
    assert response.json() == [
        {
            "ladder_slug": "backend",
            "ladder_name": "Backend",
            "ladder_detail": {"href": "/cpf/api/library/ladders/backend"},
        },
        {
            "ladder_slug": "frontend",
            "ladder_name": "Frontend",
            "ladder_detail": {"href": "/cpf/api/library/ladders/frontend"},
        },
    ]


def test_get_ladder_details():
    response = client.get(url="/cpf/api/library/ladders/backend")
    assert response.status_code == 200
    assert response.json() == {
        "ladder_name": "Backend",
        "bands": {
            "1": {
                "threshold": 2,
                "salary_range": "100-1000",
                "hard_skill_buckets": [
                    {
                        "bucket_slug": "frameworks",
                        "bucket_name": "Frameworks",
                        "description": "Lorem ipsum",
                        "bucket_detail": {"href": "/cpf/api/library/buckets/frameworks"},
                    }
                ],
                "soft_skill_buckets": [],
            }
        },
    }


def test_get_bucket_details():
    response = client.get("/cpf/api/library/buckets/framework")
    assert response.status_code == 200
    assert response.json() == {
        "bucket_slug": "frameworks",
        "bucket_name": "Frameworks",
        "description": "Lorem ipsum",
        "advancement_levels": [
            {
                "advancement_level": 1,
                "description": "Lorem ipsum",
                "projects": [],
                "categories": {"Common": [{"name": "Atomic skill 1"}]},
            },
            {"advancement_level": 2, "description": "Lorem ipsum", "projects": [], "categories": {}},
            {"advancement_level": 3, "description": "Lorem ipsum", "projects": [], "categories": {}},
        ],
    }
