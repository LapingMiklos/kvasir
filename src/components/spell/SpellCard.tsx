import { Component, For, Show } from "solid-js";
import "../../css/spell/SpellCard.css";
import "../../css/DamageEffectTheme.css";
import { FaSolidDiceD20 } from "solid-icons/fa";
import { useNavigate } from "@solidjs/router";
import { SpellView } from "../../types/ts-rs/SpellView.ts";
import cssVar from "../../utils/css.ts";

type SpellCardProps = {
  spell: SpellView;
};

const SpellCardHeader: Component<SpellCardProps> = (props) => {
  return (
    <div class="spell-header">
      <div class="title-subtitle">
        <div class="title" style={{ color: cssVar(props.spell.damageEffect) }}>
          {props.spell.name}
        </div>
        <div class="subtitle">{`${props.spell.level} ${props.spell.school}`}</div>
      </div>
      <div class="dice-container">
        <For each={props.spell.dice}>
          {({ base, dice, damageType }, i) => (
            <>
              <div
                style={{
                  "margin-inline": "2px",
                  color: damageType
                    ? cssVar(damageType)
                    : cssVar(props.spell.damageEffect),
                }}
              >{`${base}${dice}`}</div>
              <Show when={i() !== props.spell.dice.length - 1}>
                <div style={{ "margin-inline": "3px" }}>+</div>
              </Show>
            </>
          )}
        </For>
        <FaSolidDiceD20
          size={20}
          style={{ color: cssVar(props.spell.damageEffect) }}
          class="dice-icon"
        />
      </div>
    </div>
  );
};

const SpellCardDetails: Component<SpellCardProps> = (props) => {
  return (
    <div class="spell-details">
      <div
        class="row"
        style={{ "border-color": cssVar(props.spell.damageEffect) }}
      >
        <div class="item">
          <div class="item-title">casting time</div>
          <div class="item-content">{props.spell.castTime}</div>
        </div>
        <div class="item">
          <div class="item-title">range/area</div>
          <div class="item-content">{props.spell.rangeArea}</div>
        </div>
        <div class="item">
          <div class="item-title">components</div>
          <div class="item-content">{props.spell.components}</div>
        </div>
      </div>
      <div
        class="row"
        style={{ "border-color": cssVar(props.spell.damageEffect) }}
      >
        <div class="item">
          <div class="item-title">duration</div>
          <div class="item-content">{props.spell.duration}</div>
        </div>
        <div class="item">
          <div class="item-title">attack/save</div>
          <div class="item-content">{props.spell.attackSave}</div>
        </div>
        <div class="item">
          <div class="item-title">damage/effect</div>
          <div
            class="item-content"
            style={{
              "text-transform": "capitalize",
            }}
          >
            {props.spell.damageEffect}
            <Show when={props.spell.hasMultipleEffects}>*</Show>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpellCard: Component<SpellCardProps> = (props) => {
  const nav = useNavigate();

  return (
    <div
      class="spell-container"
      onClick={() => nav(`/spells/${props.spell.id}`)}
    >
      <div class="image-container">
        <img src={props.spell.iconUrl} class="image" alt="Spell icon" />
      </div>
      <div class="spell-info">
        <SpellCardHeader spell={props.spell} />
        <SpellCardDetails spell={props.spell} />
      </div>
    </div>
  );
};

export default SpellCard;
