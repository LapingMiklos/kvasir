import { Component, For, createSignal, onMount } from "solid-js";
import SpellCard from "../components/spell/SpellCard";
import { GetSpells, PostSpell } from "../commands/spellCommands";
import invokeCommand from "../commands/invokeCommand";
import { SpellView } from "../types/ts-rs/SpellView";
import { A } from "@solidjs/router";
import "../App.css";

const Spells: Component<{}> = () => {
  const [spells, setSpells] = createSignal<SpellView[]>([]);

  onMount(async () => {
    const postRes = await invokeCommand<PostSpell>("post_spell", {
      spell: {
        name: "Ice Knife bg3",
        iconUrl:
          "https://bg3.wiki/w/images/thumb/0/08/Ice_Knife.webp/300px-Ice_Knife.webp.png",
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
    <div class="spells-container">
      <For each={spells()}>
        {(spell) => (
          <A class="a-disable" href={`/spells/${spell.id}`}>
            <SpellCard spell={spell} />
          </A>
        )}
      </For>
    </div>
  );
};

export default Spells;
