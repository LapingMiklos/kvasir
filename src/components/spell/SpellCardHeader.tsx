import { Component } from "solid-js";
import { Spell } from "../../types/ts-rs/Spell";
import "../../css/spell/SpellCardHeader.css";

type SpellCardHeaderProps = {
  spell: Spell;
};

const SpellCardHeader: Component<SpellCardHeaderProps> = ({ spell }) => {
  return (
    <div class="spell-header">
      <div class="title">{spell.name}</div>
      <div class="subtitle">{`${spell.school} lvl ${spell.levelReq}`}</div>
    </div>
  );
};

export default SpellCardHeader;
