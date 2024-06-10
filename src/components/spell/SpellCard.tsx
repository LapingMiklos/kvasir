import { Component } from "solid-js";
import { Spell } from "../../types/ts-rs/Spell";
import "../../css/spell/SpellCard.css";
import SpellCardHeader from "./SpellCardHeader";

type SpellCardProps = {
  spell: Spell;
};

const SpellCard: Component<SpellCardProps> = ({ spell }) => {
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
