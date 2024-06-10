use serde::Serialize;
use ts_rs::TS;

#[derive(Serialize, TS, Debug)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct Spell {
    pub name: String,
    pub description: String,
    pub level_req: u8,
    pub school: String,
    pub range: String,
}
