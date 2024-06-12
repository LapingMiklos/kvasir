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
    try {
      const res: SpellView[] = await invokeCommand<GetSpells>("get_spells", {});
      setSpells(res);
    } catch (err) {
      console.log(err);
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
