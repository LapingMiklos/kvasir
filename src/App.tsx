// import logo from "./assets/logo.svg"
import { For, createSignal, onMount } from "solid-js";
import "./App.css";
import { TitleBar } from "./components/TitleBar";
import SpellCard from "./components/spell/SpellCard";
import { SpellView } from "./types/ts-rs/SpellView";
import invokeCommand from "./commands/invokeCommand";
import { GetSpells } from "./commands/spellCommands";

function App() {
  const [spells, setSpells] = createSignal<SpellView[]>([
    {
      id: BigInt(1),
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/magic_missile_spell_baldursgate3_wiki_guide_150px_2.png",
      level: "Lvl 1",
      name: "Magic Missile",
      school: "evocation",
      attackSave: "None",
      castTime: "1 Action",
      components: "V, S",
      damageEffect: "force",
      duration: "Instantaneous",
      rangeArea: "120 ft",
      dice: "3d4",
    },
    {
      id: BigInt(2),
      iconUrl: "https://www.dndbeyond.com/attachments/2/720/necromancy.png",
      level: "Lvl 8",
      name: "Abi-Dalzim's Horrid Wilting",
      school: "necromancy",
      attackSave: "CON save",
      castTime: "1 Action",
      components: "V, S, M",
      damageEffect: "necrotic",
      duration: "Instantaneous",
      rangeArea: "150 ft (30 ft)",
      dice: "12d8",
    },
    {
      id: BigInt(3),
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/fireball_spell_bg3_wiki_guide150px.png",
      level: "Lvl 3",
      name: "Fireball",
      school: "evocation",
      attackSave: "DEX save",
      castTime: "1 Action",
      components: "V, S, M",
      damageEffect: "fire",
      duration: "Instantaneous",
      rangeArea: "120 ft (20 ft)",
      dice: "8d6",
    },
    {
      id: BigInt(4),
      iconUrl: "https://www.dndbeyond.com/attachments/2/707/abjuration.png",
      level: "Lvl 1",
      name: "Absorb Elements",
      school: "abjuration",
      attackSave: "None",
      castTime: "1 Reaction",
      components: "S",
      damageEffect: "acid",
      duration: "1 Round",
      rangeArea: "Self",
      dice: "1d6",
    },
    {
      id: BigInt(5),
      iconUrl: "https://www.dndbeyond.com/attachments/2/702/enchantment.png",
      level: "Lvl 1",
      name: "Animal Friendship",
      school: "enchantment",
      attackSave: "WIS save",
      castTime: "1 Action",
      components: "V, S, M",
      damageEffect: "charmed",
      duration: "24 Hours",
      rangeArea: "30 ft",
      dice: null,
    },
    {
      id: BigInt(6),
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/aid_spell_baldursgate3_wiki_guide_150px_2.png",
      level: "Lvl 2",
      name: "Aid",
      school: "abjuration",
      attackSave: "None",
      castTime: "1 Action",
      components: "V, S, M",
      damageEffect: "buff",
      duration: "8 Hours",
      rangeArea: "30 ft",
      dice: "5",
    },
    {
      id: BigInt(7),
      iconUrl: "https://www.dndbeyond.com/attachments/2/722/transmutation.png",
      level: "Lvl 2",
      name: "Alter Self",
      school: "transmutation",
      attackSave: "None",
      castTime: "1 Action",
      components: "V, S",
      damageEffect: "shapechanging",
      duration: "1 Hour",
      rangeArea: "Self",
      dice: null,
    },
    {
      id: BigInt(8),
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/animate_dead_spells_bg3_wiki_guide150px.png",
      level: "Lvl 3",
      name: "Animate Dead",
      school: "necromancy",
      attackSave: "None",
      castTime: "1 Minute",
      components: "V, S, M",
      damageEffect: "creation",
      duration: "Instantaneous",
      rangeArea: "10 ft",
      dice: null,
    },
    {
      id: BigInt(9),
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/viciousmockery_spell_bg3_wiki_guide_150px.png",
      level: "Cantrip",
      name: "Vicious Mockery",
      school: "enchantment",
      attackSave: "WIS save",
      castTime: "1 Action",
      components: "V",
      damageEffect: "psychic",
      duration: "Instantaneous",
      rangeArea: "60 ft",
      dice: "1d4",
    },
  ]);

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
