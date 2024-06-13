// import logo from "./assets/logo.svg"
import { For, createSignal, onMount } from "solid-js";
import "./App.css";
import { TitleBar } from "./components/TitleBar";
import SpellCard from "./components/spell/SpellCard";
import { SpellView } from "./types/ts-rs/SpellView";
import invokeCommand from "./commands/invokeCommand";
import { GetSpells, PostSpell } from "./commands/spellCommands";

function App() {
  const [spells, setSpells] = createSignal<SpellView[]>([]);

  onMount(async () => {
    const postRes = await invokeCommand<PostSpell>("post_spell", {
      spell: {
        name: "Ice Knife",
        iconUrl: "https://www.dndbeyond.com/attachments/2/708/conjuration.png",
        area: { size: 5, shape: "sphere" },
        atHigherLevel:
          "When you cast this spell using a spell slot of 2nd level or higher, the cold damage increases by 1d6 for each slot level above 1st.",
        attackSave: { save: "DEX" },
        castTime: "action",
        description:
          "You create a shard of ice and fling it at one creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 piercing damage. Hit or miss, the shard then explodes. The target and each creature within 5 feet of it must succeed on a Dexterity saving throw or take 2d6 cold damage.",
        duration: "instantaneous",
        effect: "piercing",
        hasMultipleEffects: true,
        isSomatic: true,
        isVerbal: false,
        materials: "a drop of water or a piece of ice",
        level: { leveled: 1 },
        range: { distance: 60 },
        school: "conjuration",
        spellDice: [
          { base: 1, damageType: "piercing", dice: "d10", scaling: 0 },
          { base: 2, damageType: "cold", dice: "d6", scaling: 1 },
        ],
      },
    });

    if (postRes.error != null) {
      console.log(postRes.error.message);
    }

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
