use serde::Serialize;
use ts_rs::TS;

#[derive(Serialize, TS, Debug)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct Spell {
    pub id: i64,
    pub name: String,
    pub icon_url: Option<String>,
    pub description: String,
    pub level: SpellLevel,
    pub school: String,
    pub range: Option<u32>,
    pub area: Option<u32>,
    pub is_verbal: bool,
    pub is_somatic: bool,
    pub materials: Option<String>,
    pub cast_time: CastTime,
}

#[derive(Serialize, TS, Debug)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum SpellLevel {
    Cantrip,
    Leveled(u8),
}

#[derive(Serialize, TS, Debug)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum CastTime {
    Action,
    BonusAction,
    Reaction,
    Custom(String),
}
