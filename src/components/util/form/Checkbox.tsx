import { Component, Show } from "solid-js";
import { FormFieldProps } from "../../../types/field";

type CheckboxProps = FormFieldProps & {
  value: boolean;
  onCheck?: () => void;
};

const Checkbox: Component<CheckboxProps> = (props) => {
  return (
    <>
      <Show when={props.label !== undefined}>
        <label for={props.field().name}>{props.label}</label>
      </Show>
      <input
        checked={props.value}
        id={props.field().name}
        type="checkbox"
        name={props.field().name}
        onBlur={() => {
          props.field().handleBlur();
        }}
        onChange={() => {
          if (props.onCheck === undefined) {
            props.field().handleChange(!props.field().state.value);
          } else {
            props.onCheck();
          }
        }}
      />
    </>
  );
};

export default Checkbox;
