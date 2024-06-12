use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum Dice {
    D2,
    D3,
    D4,
    D6,
    D8,
    D10,
    D12,
    D20,
    D100,
}
