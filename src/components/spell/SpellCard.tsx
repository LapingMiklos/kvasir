import { Component } from "solid-js";
import "../../css/spell/SpellCard.css";
import "../../css/DamageEffectTheme.css";
import { SpellView } from "../../types/ts-rs/SpellView";
import { FaSolidDiceD20 } from "solid-icons/fa";

type SpellCardProps = {
  spell: SpellView;
};

const SpellCard: Component<SpellCardProps> = ({ spell }) => {
  return (
    <div class="spell-container">
      <div class="image-container">
        <img src={spell.iconUrl ?? undefined} class="image" alt="Spell icon" />
      </div>
      <div class="spell-info">
        <SpellCardHeader spell={spell} />
        <SpellCardDetails spell={spell} />
      </div>
    </div>
  );
};

const SpellCardHeader: Component<SpellCardProps> = ({ spell }) => {
  return (
    <div class="spell-header">
      <div class="title-subtitle">
        <div class="title" style={{ color: `var(--${spell.damageEffect})` }}>
          {spell.name}
        </div>
        <div class="subtitle">{`${spell.level} ${spell.school}`}</div>
      </div>
      <div
        class="dice-container"
        style={{ color: `var(--${spell.damageEffect})` }}
      >
        {spell.dice}
        <FaSolidDiceD20 size={20} class="dice-icon" />
      </div>
    </div>
  );
};

const SpellCardDetails: Component<SpellCardProps> = ({ spell }) => {
  return (
    <div class="spell-details">
      <div
        class="row"
        style={{ "border-color": `var(--${spell.damageEffect})` }}
      >
        <div class="item">
          <div class="item-title">casting time</div>
          <div class="item-content">{spell.castTime}</div>
        </div>
        <div class="item">
          <div class="item-title">range/area</div>
          <div class="item-content">{spell.rangeArea}</div>
        </div>
        <div class="item">
          <div class="item-title">components</div>
          <div class="item-content">{spell.components}</div>
        </div>
      </div>
      <div
        class="row"
        style={{ "border-color": `var(--${spell.damageEffect})` }}
      >
        <div class="item">
          <div class="item-title">duration</div>
          <div class="item-content">{spell.duration}</div>
        </div>
        <div class="item">
          <div class="item-title">attack/save</div>
          <div class="item-content">{spell.attackSave}</div>
        </div>
        <div class="item">
          <div class="item-title">damage/effect</div>
          <div
            class="item-content"
            style={{
              "text-transform": "capitalize",
            }}
          >
            {spell.damageEffect}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpellCard;
