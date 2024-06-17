import { FieldApi } from "@tanstack/solid-form";

export type FormFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: () => FieldApi<any, any, any, any>;
  label?: string;
  disabled?: boolean;
};
