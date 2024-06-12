use serde::Serialize;
use ts_rs::TS;

use super::model::SpellDice;

#[derive(Serialize, Debug, Clone, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct SpellView {
    pub id: i64,
    pub name: String,
    pub icon_url: String,
    pub level: String,
    pub school: String,
    pub range_area: String,
    pub attack_save: String,
    pub components: String,
    pub cast_time: String,
    pub duration: String,
    pub damage_effect: String,
    pub dice: Vec<SpellDice>,
    pub has_multiple_effects: bool,
}
