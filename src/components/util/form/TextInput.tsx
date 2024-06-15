import { Component, Show } from "solid-js";
import { FormFieldProps } from "../../../types/field";

type TextInputProps = (
  | FormFieldProps<string>
  | FormFieldProps<string | undefined>
) & {
  value?: string;
};

const TextInput: Component<TextInputProps> = ({
  label,
  field,
  value,
  handleChange,
}) => {
  return (
    <>
      <Show when={label !== undefined}>
        <label for={field().name}>{label}</label>
      </Show>
      <input
        id={field().name}
        name={field().name}
        value={value === undefined ? field().state.value : value}
        onBlur={field().handleBlur}
        onInput={
          handleChange === undefined
            ? (e) => field().handleChange(e.target.value)
            : (e) => handleChange(e.target.value)
        }
      />
    </>
  );
};

export default TextInput;
