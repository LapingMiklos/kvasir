import { Component } from "solid-js";
import { FormFieldProps } from "../../../types/field";

type CheckboxProps = FormFieldProps & {
  value: boolean;
  onCheck?: () => void;
};

const Checkbox: Component<CheckboxProps> = (props) => {
  return (
    <label for={props.field().name} class="container label">
      {props.label}

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
      <span class="checkmark" />
    </label>
  );
};

export default Checkbox;
