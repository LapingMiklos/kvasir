use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::entities::{dice::Dice, stats::Stats};

#[derive(Debug, Clone)]
pub struct Spell {
    pub id: i64,
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

#[derive(Debug, Clone)]
pub enum SpellLevel {
    Cantrip,
    Leveled(u8),
}

#[derive(Debug, Clone)]
pub enum SpellSchool {
    Abjuration,
    Conjuration,
    Divination,
    Enchantment,
    Evocation,
    Illusion,
    Necromancy,
    Transmutation,
    Custom(String),
}

#[derive(Debug, Clone, Copy)]
pub enum Range {
    User,
    Distance(u32),
}

#[derive(Debug, Clone)]
pub struct AreaEffect {
    pub size: u32,
    pub shape: Shape,
}

#[derive(Debug, Clone, Copy)]
pub enum Shape {
    Cube,
    Cylinder,
    Line,
    Sphere,
}

#[derive(Debug, Clone)]
pub enum CastTime {
    Action,
    BonusAction,
    Reaction,
    Custom(String),
}

#[derive(Debug, Clone)]
pub enum Duration {
    Instantaneous,
    Min(u32),
    Hour(u32),
    Day(u32),
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct SpellDice {
    pub dice: Dice,
    pub base: u8,
    pub scaling: u8,
    pub damage_type: Option<DamageType>,
}

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

#[derive(Debug, Clone)]
pub enum AttackSave {
    None,
    Ranged,
    Melee,
    Save(Stats),
}
