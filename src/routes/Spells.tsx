import { Component, For, Show, createSignal } from "solid-js";
import { FaSolidFilter } from "solid-icons/fa";
import SpellCard from "../components/spell/SpellCard";
import { SpellView } from "../types/ts-rs/SpellView.ts";
import "../css/spell/Spells.css";

const Spells: Component = () => {
  const [spells] = createSignal<SpellView[]>([]);
  const [visible, setVisible] = createSignal(false);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Show when={visible()}>
        <div>Filters go here</div>
      </Show>
      <div>
        <FaSolidFilter size={30} onClick={() => setVisible(!visible())} />
      </div>
      <div class="spells-container">
        <For each={spells()}>{(spell) => <SpellCard spell={spell} />}</For>
      </div>
    </div>
  );
};

export default Spells;
