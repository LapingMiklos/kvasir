import { Component, For, Show } from "solid-js";
import { FormFieldProps } from "../../../types/field";

type SelectorPropT<T> = FormFieldProps<T> & {
  options: string[];
  handleSelect: (i: number) => void;
};

type SelectorProps = SelectorPropT<string> | SelectorPropT<number>;

const Selector: Component<SelectorProps> = (props) => {
  return (
    <>
      <Show when={props.label !== undefined}>
        <label for={props.field().name}>{props.label}</label>
      </Show>
      <select
        id={props.field().name}
        name={props.field().name}
        onBlur={() => props.field().handleBlur}
        onInput={(e) => props.handleSelect(Number(e.target.value))}
      >
        <For each={props.options}>
          {(option, i) => <option value={i()}>{option}</option>}
        </For>
      </select>
    </>
  );
};

export default Selector;
