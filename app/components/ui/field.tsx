import { Field as FieldBase } from "@base-ui-components/react/field";

export function Field(props: React.ComponentProps<typeof FieldBase.Root>) {
  return <FieldBase.Root data-slot="field" {...props}></FieldBase.Root>;
}

export function FieldLabel(
  props: React.ComponentProps<typeof FieldBase.Label>,
) {
  return <FieldBase.Label data-slot="field-label" {...props}></FieldBase.Label>;
}

export function FieldControl(
  props: React.ComponentProps<typeof FieldBase.Control>,
) {
  return (
    <FieldBase.Control data-slot="field-control" {...props}></FieldBase.Control>
  );
}

export function FieldDescription(
  props: React.ComponentProps<typeof FieldBase.Description>,
) {
  return (
    <FieldBase.Description
      data-slot="field-description"
      {...props}
    ></FieldBase.Description>
  );
}

export function FieldError(
  props: React.ComponentProps<typeof FieldBase.Error>,
) {
  return <FieldBase.Error data-slot="field-error" {...props}></FieldBase.Error>;
}

export function FieldValidity(
  props: React.ComponentProps<typeof FieldBase.Validity>,
) {
  return (
    <FieldBase.Validity
      data-slot="field-validity"
      {...props}
    ></FieldBase.Validity>
  );
}
