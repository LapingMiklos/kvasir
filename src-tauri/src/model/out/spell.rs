use serde::Serialize;
use ts_rs::TS;

#[derive(Serialize, Debug, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct SpellView {
    pub id: i64,
    pub name: String,
    pub icon_url: Option<String>,
    pub level: String,
    pub school: String,
    pub range_area: String,
    pub attack_save: String,
    pub components: String,
    pub cast_time: String,
    pub duration: String,
    pub damage_effect: String,
    pub dice: Option<String>,
}
