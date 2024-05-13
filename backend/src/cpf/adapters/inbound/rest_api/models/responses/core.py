from cpf.adapters.inbound.rest_api.ion import IonBaseModel, IonLink


class UserResponse(IonBaseModel):
    first_name: str
    last_name: str


class UnauthenticatedRootResponse(IonBaseModel):
    login: IonLink


class AuthenticatedRootResponse(IonBaseModel):
    user: UserResponse
    get_ladders: IonLink


class LadderResponse(IonBaseModel):
    ladder_name: str
    ladder_slug: str
