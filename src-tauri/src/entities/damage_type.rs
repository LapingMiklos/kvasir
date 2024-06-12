use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum DamageType {
    Piercing,
    Bludgeoning,
    Slashing,
    Cold,
    Fire,
    Lightning,
    Thunder,
    Poison,
    Acid,
    Necrotic,
    Radiant,
    Force,
    Psychic,
}
