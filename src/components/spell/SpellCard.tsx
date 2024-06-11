import { Component } from "solid-js";
import { Spell } from "../../types/ts-rs/Spell";
import "../../css/spell/SpellCard.css";
import SpellCardHeader from "./SpellCardHeader";
import { SpellLevel } from "../../types/ts-rs/SpellLevel";

type SpellCardProps = {
  spell: Spell;
  level: SpellLevel;
};

const SpellCard: Component<SpellCardProps> = ({ spell, level }) => {
  return (
    <div class="spell-container">
      <div class="image-container">
        <img src={spell.iconUrl} class="image" alt="Spell icon" />
      </div>
      <div class="spell-info">
        <SpellCardHeader spell={spell} />
        <div class="spell-details">{spell.description}</div>
      </div>
    </div>
  );
};

export default SpellCard;
