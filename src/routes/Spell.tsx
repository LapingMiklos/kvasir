import {
  Component,
  Match,
  Switch,
  createComputed,
  createSignal,
} from "solid-js";
import BackButton from "../components/util/BackButton";
import "../App.css";
import { createQuery } from "@tanstack/solid-query";
import { useNavigate, useParams } from "@solidjs/router";
import invokeCommand from "../commands/invokeCommand";
import { GetSpellById } from "../commands/spellCommands";
import SpellPanel from "../components/spell/SpellPanel";
import { SpellView } from "../types/ts-rs/SpellView";

const Spell: Component = () => {
  const params = useParams();
  const nav = useNavigate();
  const [id, setId] = createSignal(Number(params.id));

  createComputed(() => {
    const spellId = Number(params.id);
    if (Number.isNaN(spellId)) {
      nav("/spells");
    } else {
      setId(spellId);
    }
  });

  const spellQuery = createQuery(() => ({
    queryKey: ["spells", id()],
    queryFn: async () => {
      const spell = invokeCommand<GetSpellById>("get_spell_by_id", {
        id: id(),
      });
      return spell;
    },
  }));

  return (
    <div
      style={{ height: "100%", display: "flex", "flex-direction": "column" }}
    >
      <div>
        <BackButton />
      </div>

      <Switch>
        <Match when={spellQuery.isPending}>Loading...</Match>
        <Match when={spellQuery.isError}>Error</Match>
        <Match when={spellQuery.data === null}>
          Spell with id: {id()} does not exist
        </Match>
        <Match when={spellQuery.data !== undefined}>
          <SpellPanel spell={spellQuery.data as SpellView} />
        </Match>
      </Switch>
    </div>
  );
};

export default Spell;
