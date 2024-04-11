from cpf.adapters.inbound.rest_api.ion import IonBaseModel


class UserResponse(IonBaseModel):
    username: str
    email: str
    first_name: str
    last_name: str
