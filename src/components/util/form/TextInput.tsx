import { Component, Show } from "solid-js";
import { FormFieldProps } from "../../../types/field";

type TextInputProps = FormFieldProps & {
  value: string;
  handleChange?: (value: string) => void;
};

const TextInput: Component<TextInputProps> = (props) => {
  return (
    <>
      <Show when={props.label !== undefined}>
        <label for={props.field().name}>{props.label}</label>
      </Show>
      <input
        id={props.field().name}
        name={props.field().name}
        value={props.value}
        onBlur={() => {
          props.field().handleBlur();
        }}
        onInput={(e) => {
          if (e.target.value === undefined) {
            return;
          }
          if (props.handleChange === undefined) {
            props.field().handleChange(e.target.value);
          } else {
            props.handleChange(e.target.value);
          }
        }}
      />
    </>
  );
};

export default TextInput;
