from cpf.core.domain.aggregates.aggregate_root import AggregateRoot
from cpf.core.domain.aggregates.domain_event import DomainEvent
from cpf.core.domain.aggregates.users.events import (
    UserCreated,
    UserPersonalInformationSet,
)


class User(AggregateRoot):

    def __init__(self, id: str):
        super().__init__(id)
        self.email: str | None = None
        self.first_name: str | None = None
        self.last_name: str | None = None

    @classmethod
    def create_user(cls, user_id: str) -> "User":
        instance = cls(id=user_id)
        instance.produce_event(UserCreated())
        return instance

    @AggregateRoot.produces_events
    def set_personal_information(self, email: str, first_name: str, last_name: str) -> UserPersonalInformationSet:
        return UserPersonalInformationSet(
            email=email,
            first_name=first_name,
            last_name=last_name,
        )

    # Handlers

    @AggregateRoot.handles_events(UserCreated)
    def _handle_user_created(self, event: UserCreated) -> None:
        print(f"User created {self.aggregate_id}")

    @AggregateRoot.handles_events(UserPersonalInformationSet)
    def _handle_personal_information_set(self, event: UserPersonalInformationSet):
        self.email = event.email
        self.first_name = event.first_name
        self.last_name = event.last_name

    def handle_event(self, event: DomainEvent) -> None:
        raise NotImplementedError("Event not handled")
