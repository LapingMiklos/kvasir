import { Component, For, Show } from "solid-js";

import "../../../css/form/fields.css";
import { FormFieldProps } from "../../../types/field";

type SelectorProps = FormFieldProps & {
  value: number;
  options: readonly string[];
  handleSelect: (i: number) => void;
};

const Selector: Component<SelectorProps> = (props) => {
  return (
    <div style={{ display: "flex", "flex-direction": "column" }}>
      <Show when={props.label !== undefined}>
        <label class="label" for={props.field().name}>
          {props.label}
        </label>
      </Show>
      <select
        class="text-input select"
        value={props.value}
        id={props.field().name}
        name={props.field().name}
        onBlur={() => props.field().handleBlur}
        onInput={(e) => props.handleSelect(Number(e.target.value))}
      >
        <For each={props.options}>
          {(option, i) => <option value={i()}>{option}</option>}
        </For>
      </select>
    </div>
  );
};

export default Selector;
