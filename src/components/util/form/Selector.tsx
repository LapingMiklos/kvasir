import { Component, For, Show } from "solid-js";
import { FormFieldProps } from "../../../types/field";

type SelectorPropT<T> = FormFieldProps<T> & {
  options: string[];
  handleSelect: (i: number) => void;
};

type SelectorProps = SelectorPropT<string> | SelectorPropT<number>;

const Selector: Component<SelectorProps> = ({
  field,
  handleSelect,
  label,
  options,
}) => {
  return (
    <>
      <Show when={label !== undefined}>
        <label for={field().name}>{label}</label>
      </Show>
      <select
        id={field().name}
        name={field().name}
        onBlur={field().handleBlur}
        onInput={(e) => handleSelect(Number(e.target.value))}
      >
        <For each={options}>
          {(label, i) => <option value={i()}>{label}</option>}
        </For>
      </select>
    </>
  );
};

export default Selector;
