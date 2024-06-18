import { Component, Show } from "solid-js";
import { FormFieldProps } from "../../../types/field";

type NumericInputProps = FormFieldProps & {
  maxVal?: number;
  minVal?: number;
  value: number;
  handleChange?: (value: number) => void;
};

const NumericInput: Component<NumericInputProps> = (props) => {
  const toNum = (value: string) => {
    if (value === undefined) {
      return 0;
    }
    const num = parseInt(value, 10);
    if (Number.isNaN(num)) {
      return 0;
    }
    if (props.maxVal !== undefined && num > props.maxVal) {
      return props.maxVal;
    }
    if (props.minVal !== undefined && num < props.minVal) {
      return props.minVal;
    }
    return num;
  };

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
          if (props.handleChange === undefined) {
            props.field().handleChange(toNum(e.target.value));
          } else {
            props.handleChange(toNum(e.target.value));
          }
        }}
      />
    </>
  );
};

export default NumericInput;
