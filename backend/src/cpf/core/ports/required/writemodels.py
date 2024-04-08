from abc import ABC, abstractmethod
from typing import Generic, TypeVar

from ...domain.aggregates.aggregate_root import AggregateRoot

AR = TypeVar("AR", bound=AggregateRoot)


class Repository(ABC, Generic[AR]):

    @abstractmethod
    def save(self, aggregate: AR) -> None:
        pass

    @abstractmethod
    def load(self, id: str) -> AR | None:
        pass

    @abstractmethod
    def remove(self, aggregate: AR) -> None:
        pass
