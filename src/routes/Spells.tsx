import { Component, For, Match, Show, Switch, createSignal } from "solid-js";
import { FaSolidFilter } from "solid-icons/fa";
import SpellCard from "../components/spell/SpellCard";
import "../css/spell/Spells.css";
import { createQuery } from "@tanstack/solid-query";
import invokeCommand from "../commands/invokeCommand.ts";
import { GetSpells } from "../commands/spellCommands.ts";

const Spells: Component = () => {
  const spellsQuery = createQuery(() => ({
    queryKey: ["spells"],
    queryFn: async () => invokeCommand<GetSpells>("get_spells", {}),
  }));

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
        <Switch>
          <Match when={spellsQuery.isPending}>Loading...</Match>
          <Match when={spellsQuery.isError}>Error</Match>
          <Match when={spellsQuery.data !== undefined}>
            <For each={spellsQuery.data}>
              {(spell) => <SpellCard spell={spell} />}
            </For>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default Spells;
