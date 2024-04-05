from datetime import date, datetime, time
from typing import Annotated, Any, Literal, Optional, Type, Union

from pydantic import BaseModel, Field, HttpUrl, StringConstraints, conint, conlist


class IonBaseModel(BaseModel):
    @property
    def is_value_object(self) -> bool:
        return self.value is not None

    @property
    def is_link(self) -> bool:
        return self.href is not None

    @property
    def is_file(self) -> bool:
        return (
            self.name is not None
            and self.mediatype is not None
            and self.value is not None
            and isinstance(self.value, str)
            and self.type == "file"
        )

    @property
    def is_file_in_collection(self) -> bool:
        return (
            self.name is not None
            and self.mediatype is not None
            and self.value is not None
            and isinstance(self.value, str)
        )

    class Config:
        extra = "allow"
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),  # type: Callable[[datetime], str]
            date: lambda d: d.isoformat(),  # type: Callable[[date], str]
            time: lambda t: t.isoformat(),  # type: Callable[[time], str]
        }


class IonValueObject(IonBaseModel):
    value: Any = Field(..., description="The value of the object")


class IonCollectionObject(IonValueObject):
    value: list[Any] = Field(..., description="The value of the object")


class IonLink(IonBaseModel):
    href: HttpUrl = Field(..., description="The URL of the linked resource")
    name: str | None = Field(default=None, description="The name of the link (Implicit relation)")
    rel: list[str] | None = Field(default=None, description="The explicit relationships of the link to the object")


class IonFile(IonValueObject):
    name: str = Field(..., description="The name of the file")
    mediatype: Annotated[str, StringConstraints(pattern=r"^\w+\/[-.\w+]+$")] = Field(
        ..., description="The media type of the file"
    )
    value: Annotated[
        str,
        StringConstraints(pattern=r"^(?:[A-Za-z0-9\-_]{4})*(?:[A-Za-z0-9\-_]{2}==|[A-Za-z0-9\-_]{3}=)?$"),
    ] = Field(..., description="The base64Url-encoded octet sequence of the file")
    type: Literal["file"] | None = Field(default="file", description="The value object type must be 'file' if set")


class IonFormField(IonBaseModel):
    def __hash__(self) -> int:
        return hash(self.name)

    name: str = Field(..., description="The name of the field")
    desc: str | None = Field(default=None, description="The description of the field")
    enabled: bool | None = Field(default=None, description="Whether the field is enabled")
    form: Optional["IonValueObject"] = Field(default=None, description="A nested form")
    label: str | None = Field(default=None, description="The label of the field")
    max: Union[int, float, str, datetime, date, time] | None = Field(
        default=None, description="The maximum value of the field"
    )
    maxlength: conint(ge=0) | None = Field(default=None, description="The maximum length of a string field")
    maxsize: conint(ge=0) | None = Field(default=None, description="The maximum size of and array or set field")
    min: Union[int, float, str, datetime, date, time] | None = Field(
        default=None, description="The minimum value of the field"
    )
    minlength: conint(ge=0) | None = Field(default=None, description="The minimum length of a string field")
    minsize: conint(ge=0) | None = Field(default=None, description="The minimum size of and array or set field")
    mutable: bool | None = Field(default=None, description="Whether the field is mutable")
    options: Optional["IonCollectionObject"] = Field(default=None, description="The options for the field")
    pattern: str | None = Field(default=None, description="The pattern for the field")
    placeholder: str | None = Field(default=None, description="The placeholder for the field")
    required: bool | None = Field(default=None, description="Whether the field is required")
    secret: bool | None = Field(default=None, description="Whether the field is secret")
    type: (
        Literal[
            "array",
            "binary",
            "boolean",
            "date",
            "datetime",
            "decimal",
            "duration",
            "email",
            "file",
            "integer",
            "iri",
            "link",
            "number",
            "object",
            "pdatetime",
            "ptime",
            "set",
            "string",
            "time",
            "url",
        ]
        | None
    ) = Field(default=None, description="The type of the field")
    value: Any | None = Field(default=None, description="The value of the field")
    visible: bool | None = Field(default=None, description="Whether the field is visible")


class IonForm(IonLink, IonCollectionObject):
    rel: list[Literal["form", "edit-form", "create-form", "query-form"]] = Field(
        default=["form"], description="The relationships of the href to the object"
    )
    value: conlist(IonFormField, min_length=1) = Field(..., description="The form fields")
    method: Literal["GET", "POST", "PUT", "PATCH", "DELETE"] | None = Field(
        default="GET", description="The HTTP method of the form"
    )


def create_ion_form_fields(
    model_instance_or_class: type[BaseModel] | BaseModel,
) -> list["IonFormField"]:
    model_class = (
        model_instance_or_class if isinstance(model_instance_or_class, type) else model_instance_or_class.__class__
    )
    model_instance = model_instance_or_class if isinstance(model_instance_or_class, BaseModel) else None
    schema = model_class.model_json_schema()
    defs: dict[str, object] = schema.get("$defs", {})
    required: list[str] = schema.get("required", [])
    properties: dict[str, object] = schema.get("properties", {})

    form_fields = []

    for prop_name, prop_schema in properties.items():
        if prop_name == "monthly_housing_payment":
            print("monthly_housing_payment")
            print(prop_schema)
        # Flatten anyOf references
        if "anyOf" in prop_schema:
            for any_of_item in prop_schema["anyOf"]:
                # if it's a null type, skip it
                if "type" in any_of_item and any_of_item["type"] == "null":
                    continue
                # if its a $ref, flatten it
                if "$ref" in any_of_item:
                    any_of_item["$ref"] = any_of_item["$ref"].split("/")[-1]
                    # get the ref from the schema $defs
                    if any_of_item["$ref"] in defs:
                        any_of_item = defs[any_of_item["$ref"]]
                prop_schema = {**any_of_item, **prop_schema}
            prop_schema.pop("anyOf")
        # Flatten allOf references
        if "allOf" in prop_schema:
            for all_of_item in prop_schema["allOf"]:
                # if its a $ref, flatten it
                if "$ref" in all_of_item:
                    all_of_item["$ref"] = all_of_item["$ref"].split("/")[-1]
                    # get the ref from the schema $defs
                    if all_of_item["$ref"] in defs:
                        all_of_item = defs[all_of_item["$ref"]]
                prop_schema = {**prop_schema, **all_of_item}
            prop_schema.pop("allOf")

        # name
        field: dict[str, Any] = {
            "name": prop_name,
        }

        # desc
        if "description" in prop_schema:
            field["desc"] = prop_schema["description"]

        # type
        if "type" in prop_schema:
            field["type"] = prop_schema["type"]
        if "format" in prop_schema:
            field["type"] = prop_schema["format"]
        if (
            "type" in field
            and field["type"] == "array"
            and "uniqueItems" in prop_schema
            and prop_schema["uniqueItems"] is True
        ):
            field["type"] = "set"

        # enabled
        if "enabled" in prop_schema and prop_schema["enabled"] is False:
            field["enabled"] = False

        # form
        if (
            "type" in prop_schema
            and prop_schema["type"] == "object"
            and issubclass(model_class.__annotations__[prop_name], BaseModel)
        ):
            field["form"] = IonValueObject(
                value=create_ion_form_fields(model_class.__annotations__[prop_name]),
            )

        # label
        if "label" in prop_schema:
            field["label"] = prop_schema["label"]
        # max
        if "maximum" in prop_schema:
            field["max"] = prop_schema["maximum"]

        # maxlength
        if "maxLength" in prop_schema:
            field["maxlength"] = prop_schema["maxLength"]

        # maxsize
        if "maxItems" in prop_schema:
            field["maxsize"] = prop_schema["maxItems"]

        # min
        if "minimum" in prop_schema:
            field["min"] = prop_schema["minimum"]

        # minlength
        if "minLength" in prop_schema:
            field["minlength"] = prop_schema["minLength"]

        # minsize
        if "minItems" in prop_schema:
            field["minsize"] = prop_schema["minItems"]

        # mutable
        if "mutable" in prop_schema and prop_schema["mutable"] is False:
            field["mutable"] = False

        # options
        if "enum" in prop_schema:
            # iterate over prop_schema["enum"] and prop_schema["labels"] (if set) and convert to IonValueObjects
            options = []
            if "labels" in prop_schema:
                # if labels is a list
                if isinstance(prop_schema["labels"], list):
                    # make sure the labels are the same length as the enum
                    if len(prop_schema["enum"]) != len(prop_schema["labels"]):
                        raise ValueError("The length of the enum and labels must be the same")
                    # iterate over the enum and labels and create IonValueObjects
                    for enum, label in zip(prop_schema["enum"], prop_schema["labels"]):
                        options.append(IonValueObject(value=enum, label=label))
                # if labels is a dict
                elif isinstance(prop_schema["labels"], dict):
                    # if labels has a key for each enum add it to the value object, otherwise don't inclde a label
                    for enum in prop_schema["enum"]:
                        if enum in prop_schema["labels"]:
                            options.append(IonValueObject(value=enum, label=prop_schema["labels"][enum]))
                        else:
                            options.append(IonValueObject(value=enum))

            else:
                for enum in prop_schema["enum"]:
                    options.append(IonValueObject(value=enum))

            field["options"] = IonCollectionObject(value=options, type="set")

        # pattern
        if "pattern" in prop_schema:
            field["pattern"] = prop_schema["pattern"]

        # placeholder
        if "placeholder" in prop_schema:
            field["placeholder"] = prop_schema["placeholder"]

        # required
        if prop_name in required:
            field["required"] = True

        # secret
        if "secret" in prop_schema and prop_schema["secret"] is True:
            field["secret"] = True

        # value
        if model_instance is not None and prop_name in model_instance.__dict__:
            field["value"] = model_instance.__dict__[prop_name]

        # visible
        if "visible" in prop_schema and prop_schema["visible"] is False:
            field["visible"] = False

        form_fields.append(IonFormField(**field))
    return form_fields


def create_ion_form(method: str, href: str, request_model: Type[BaseModel], rel: list[str] = ["form"]) -> IonForm:
    return IonForm(
        method=method,
        href=href,
        value=create_ion_form_fields(request_model),
        rel=rel,
    )
