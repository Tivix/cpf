from __future__ import annotations
from typing import Any, Union
from dataclasses import dataclass


PrimitiveDict = dict[str, "PrimitiveType"]
PrimitiveList = list["PrimitiveType"]
PrimitiveType = Union[str, int, float, bool, None, PrimitiveDict, PrimitiveList]


class DomainEventMeta(type):
    _registry: dict[str, type] = {}

    def __new__(
        cls, name: str, bases: tuple, namespace: dict[str, Any]
    ) -> "DomainEventMeta":
        new_class = super().__new__(cls, name, bases, namespace)
        event_type = getattr(new_class, "event_type", None)
        key = name if event_type is None else event_type()
        cls._registry[key] = new_class
        return new_class

    @classmethod
    def get_event_type(cls, event_type: str) -> type["DomainEvent"]:
        return cls._registry[event_type]


@dataclass(frozen=True)
class DomainEvent(metaclass=DomainEventMeta):
    @classmethod
    def event_type(cls) -> str:
        """Ensure domain event classes are uniquely named as the registry is shared across all subclasses."""
        return cls.__name__

    @classmethod
    def from_primitive_dict(cls, data: PrimitiveDict) -> DomainEvent:
        return cls(**data)

    def to_primitive_dict(self) -> PrimitiveDict:
        return self.__dict__
