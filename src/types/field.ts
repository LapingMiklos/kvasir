import { FieldApi } from "@tanstack/solid-form";

export type FormFieldProps<T> = {
  field: () => FieldApi<any, any, any, any, T>;
  value?: T;
  label?: string;
  handleChange?: (value: T) => void;
};
