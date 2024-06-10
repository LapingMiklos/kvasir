// import logo from "./assets/logo.svg"
import { For, createSignal } from "solid-js";
import "./App.css";
import { TitleBar } from "./components/TitleBar";
import SpellCard from "./components/spell/SpellCard";

function App() {
  const [spells] = createSignal([
    {
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/magic_missile_spell_baldursgate3_wiki_guide_150px_2.png",
      description: "A spell that conjures darts of magical force.",
      levelReq: 1,
      name: "Magic Missile",
      range: "120 feet",
      school: "evocation",
    },
    {
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/misty_step_spell_baldursgate3_wiki_guide_150px_2.png",
      description:
        "A spell that teleports the caster to an unoccupied space they can see.",
      levelReq: 2,
      name: "Misty Step",
      range: "Self",
      school: "conjuration",
    },
    {
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/haste_spells_bg3_wiki_guide150px.png",
      description:
        "A spell that doubles the target's speed and gives an extra action.",
      levelReq: 3,
      name: "Haste",
      range: "30 feet",
      school: "transmutation",
    },
    {
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/shield-spell-bg3-wiki-guide-150px.png",
      description: "A spell that grants a temporary magical shield.",
      levelReq: 1,
      name: "Shield",
      range: "Self",
      school: "abjuration",
    },
    {
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/invisivility_spell_baldursgate3_wiki_guide_150px_2.png",
      description: "A spell that makes the target invisible.",
      levelReq: 2,
      name: "Invisibility",
      range: "Touch",
      school: "illusion",
    },
    {
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/lightningbolt-spell-bg3-wiki-guide-150px.png",
      description: "A spell that releases a bolt of lightning.",
      levelReq: 3,
      name: "Lightning Bolt",
      range: "100 feet",
      school: "evocation",
    },
    {
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/conjureelemental-spell-bg3-wiki-guide-150px.png",
      description: "A spell that summons an elemental to fight for the caster.",
      levelReq: 5,
      name: "Summon Elemental",
      range: "90 feet",
      school: "conjuration",
    },
    {
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/counterspell_spells_bg3_wiki_guide150px.png",
      description: "A spell that interrupts another spell being cast.",
      levelReq: 3,
      name: "Counterspell",
      range: "60 feet",
      school: "abjuration",
    },
    {
      iconUrl:
        "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/coneofcold-spell-bg3-wiki-guide-150px.png",
      description: "A spell that releases a blast of cold air.",
      levelReq: 5,
      name: "Cone of Cold",
      range: "Self (60-foot cone)",
      school: "evocation",
    },
  ]);

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
