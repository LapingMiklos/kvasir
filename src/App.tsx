// import logo from "./assets/logo.svg"
import { For, createSignal, onMount } from "solid-js";
import "./App.css";
import { TitleBar } from "./components/TitleBar";
import SpellCard from "./components/spell/SpellCard";
import { SpellView } from "./types/ts-rs/SpellView";
import invokeCommand from "./commands/invokeCommand";
import { GetSpells } from "./commands/spellCommands";

function App() {
  const [spells, setSpells] = createSignal<SpellView[]>([]);

  onMount(async () => {
    const res = await invokeCommand<GetSpells>("get_spells", {});
    if (res.error == null) {
      setSpells(res.result.data);
    }
  });

  return (
    <>
      <TitleBar />
      <div class="spells-container">
        <For each={spells()}>{(spell) => <SpellCard spell={spell} />}</For>
      </div>
    </>
  );
}

export default App;
