from cpf.adapters.inbound.rest_api.ion import IonBaseModel, IonLink


class RootResponse(IonBaseModel):
    get_ladders: IonLink
