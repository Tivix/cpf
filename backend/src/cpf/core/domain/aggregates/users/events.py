from dataclasses import dataclass

from cpf.core.domain.aggregates.domain_event import DomainEvent


class UserCreated(DomainEvent):
    pass


@dataclass(frozen=True)
class UserPersonalInformationSet(DomainEvent):
    email: str
    first_name: str
    last_name: str
