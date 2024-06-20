import { Component, Show } from "solid-js";

import "../../../css/form/fields.css";
import { FormFieldProps } from "../../../types/field";

type TextInputProps = FormFieldProps & {
  placeholder?: string;
  value: string;
  handleChange?: (value: string) => void;
};

const TextInput: Component<TextInputProps> = (props) => {
  return (
    <div style={{ display: "flex", "flex-direction": "column" }}>
      <Show when={props.label !== undefined}>
        <label class="label" for={props.field().name}>
          {props.label}
        </label>
      </Show>
      <input
        placeholder={props.placeholder ?? props.label ?? ""}
        class="text-input"
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
    </div>
  );
};

export default TextInput;
