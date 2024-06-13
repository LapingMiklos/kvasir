use serde::Deserialize;
use ts_rs::TS;

use super::model::{
    AreaEffect, AttackSave, CastTime, Duration, Range, SpellDice, SpellLevel, SpellSchool,
};

#[derive(Debug, Clone, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct CreateSpell {
    pub name: String,
    pub icon_url: Option<String>,
    pub description: String,
    pub at_higher_level: Option<String>,
    pub level: SpellLevel,
    pub school: SpellSchool,
    pub range: Range,
    pub area: Option<AreaEffect>,
    pub is_verbal: bool,
    pub is_somatic: bool,
    pub materials: Option<String>,
    pub cast_time: CastTime,
    pub duration: Duration,
    pub effect: String,
    pub has_multiple_effects: bool,
    pub attack_save: AttackSave,
    pub spell_dice: Vec<SpellDice>,
}
