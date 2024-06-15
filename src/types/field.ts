import { FieldApi } from "@tanstack/solid-form";

export type FormFieldProps<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: () => FieldApi<any, any, any, any, T>;
  label?: string;
  handleChange?: (value: T) => void;
};
