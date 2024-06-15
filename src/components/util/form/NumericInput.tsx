import { Component, Show } from "solid-js";
import { FormFieldProps } from "../../../types/field";

type NumericInputProps = (
  | FormFieldProps<number>
  | FormFieldProps<number | undefined>
) & { maxVal?: number; minVal?: number };

const toNum = (value: string, minVal?: number, maxVal?: number): number => {
  if (value === undefined) {
    return 0;
  }
  const num = parseInt(value);
  if (Number.isNaN(num)) {
    return 0;
  }
  if (maxVal !== undefined && num > maxVal) {
    return maxVal;
  }
  if (minVal !== undefined && num < minVal) {
    return minVal;
  }
  return num;
};

const NumericInput: Component<NumericInputProps> = ({
  label,
  field,
  handleChange,
  maxVal,
  minVal,
}) => {
  return (
    <>
      <Show when={label !== undefined}>
        <label for={field().name}>{label}</label>
      </Show>
      <input
        id={field().name}
        name={field().name}
        value={field().state.value ?? 0}
        onBlur={field().handleBlur}
        onInput={
          handleChange === undefined
            ? (e) => field().handleChange(toNum(e.target.value, minVal, maxVal))
            : (e) => handleChange(toNum(e.target.value, minVal, maxVal))
        }
      />
    </>
  );
};

export default NumericInput;
