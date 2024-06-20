import { Component, Show } from "solid-js";
import { SpellView } from "../../types/ts-rs/SpellView";
import "../../css/spell/SpellPanel.css";
import "../../css/DamageEffectTheme.css";
import cssVar from "../../utils/css";

type SpellPanelProps = {
  spell: SpellView;
};

const SpellDetailsTable: Component<SpellPanelProps> = (props) => {
  return (
    <div
      class="spell-details-table"
      style={{ "border-color": cssVar(props.spell.damageEffect) }}
    >
      <div class="spell-table-item gray-bg">
        <div class="spell-table-title">level</div>
        <div class="spell-table-content">{props.spell.level}</div>
      </div>
      <div class="spell-table-item">
        <div class="spell-table-title">casting time</div>
        <div class="spell-table-content">{props.spell.castTime}</div>
      </div>
      <div class="spell-table-item gray-bg">
        <div class="spell-table-title">range/area</div>
        <div class="spell-table-content">{props.spell.rangeArea}</div>
      </div>
      <div class="spell-table-item">
        <div class="spell-table-title">components</div>
        <div class="spell-table-content">{props.spell.components}</div>
      </div>

      <div class="spell-table-item">
        <div class="spell-table-title">duration</div>
        <div class="spell-table-content">{props.spell.duration}</div>
      </div>
      <div class="spell-table-item gray-bg">
        <div class="spell-table-title">school</div>
        <div class="spell-table-content">{props.spell.school}</div>
      </div>
      <div class="spell-table-item">
        <div class="spell-table-title">attack/save</div>
        <div class="spell-table-content">{props.spell.attackSave}</div>
      </div>
      <div class="spell-table-item gray-bg">
        <div class="spell-table-title">damage/effect</div>
        <div
          class="spell-table-content"
          style={{
            "text-transform": "capitalize",
          }}
        >
          {props.spell.damageEffect}
          <Show when={props.spell.hasMultipleEffects}>*</Show>
        </div>
      </div>
    </div>
  );
};

const SpellPanel: Component<SpellPanelProps> = (props) => {
  return (
    <div class="spell-panel-container">
      <div
        class="spell-panel-header"
        style={{ color: cssVar(props.spell.damageEffect) }}
      >
        {props.spell.name}
      </div>
      <div
        class="spell-panel-content"
        style={{ "border-color": cssVar(props.spell.damageEffect) }}
      >
        <div class="spell-panel-details">
          <SpellDetailsTable spell={props.spell} />
          <div style={{ "font-size": "large" }}>
            <div>{props.spell.description}</div>
            <Show when={props.spell.atHigherLevel !== null}>
              <div>
                <b>At higher level:</b> {props.spell.atHigherLevel}
              </div>
            </Show>
            <Show when={props.spell.materials !== null}>
              <div>
                <b>Materials:</b> {props.spell.materials}
              </div>
            </Show>
          </div>
        </div>
        <div>
          <img src={props.spell.iconUrl} class="spell-image" alt="Spell icon" />
        </div>
      </div>
    </div>
  );
};

export default SpellPanel;
