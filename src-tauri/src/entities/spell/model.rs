use crate::{entities::damage_type::DamageType, prelude::*};
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

// region: ---SpellLevel

#[derive(Debug, Clone, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum SpellLevel {
    Cantrip,
    Leveled(u8),
}

impl Into<u8> for SpellLevel {
    fn into(self) -> u8 {
        match self {
            Self::Cantrip => 0,
            Self::Leveled(l) => l,
        }
    }
}

impl From<u8> for SpellLevel {
    fn from(value: u8) -> Self {
        match value {
            0 => Self::Cantrip,
            _ => Self::Leveled(value),
        }
    }
}

// endregion: --SpellLevel

// region: ---SpellSchool

#[derive(Debug, Clone, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
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

impl Into<String> for SpellSchool {
    fn into(self) -> String {
        match self {
            SpellSchool::Abjuration => "Abjuration".into(),
            SpellSchool::Conjuration => "Conjuration".into(),
            SpellSchool::Divination => "Divination".into(),
            SpellSchool::Enchantment => "Enchantment".into(),
            SpellSchool::Evocation => "Evocation".into(),
            SpellSchool::Illusion => "Illusion".into(),
            SpellSchool::Necromancy => "Necromancy".into(),
            SpellSchool::Transmutation => "Transmutation".into(),
            SpellSchool::Custom(s) => s,
        }
    }
}

impl From<String> for SpellSchool {
    fn from(s: String) -> SpellSchool {
        match s.as_str() {
            "Abjuration" => SpellSchool::Abjuration,
            "Conjuration" => SpellSchool::Conjuration,
            "Divination" => SpellSchool::Divination,
            "Enchantment" => SpellSchool::Enchantment,
            "Evocation" => SpellSchool::Evocation,
            "Illusion" => SpellSchool::Illusion,
            "Necromancy" => SpellSchool::Necromancy,
            "Transmutation" => SpellSchool::Transmutation,
            _ => SpellSchool::Custom(s),
        }
    }
}

// endregion: ---SpellSchool

// region: ---Range

#[derive(Debug, Clone, Copy, Deserialize, Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum Range {
    User,
    Touch,
    Sight,
    Unlimited,
    Ranged(u32),
}

impl Range {
    const SELF: &'static str = "self";
    const TOUCH: &'static str = "touch";
    const SIGHT: &'static str = "sight";
    const UNLIMITED: &'static str = "unlimited";
}

impl From<Range> for String {
    fn from(value: Range) -> String {
        match value {
            Range::User => Range::SELF.into(),
            Range::Touch => Range::TOUCH.into(),
            Range::Sight => Range::SIGHT.into(),
            Range::Unlimited => Range::UNLIMITED.into(),
            Range::Ranged(d) => format!("{} ft", d),
        }
    }
}

// endregion: ---Range

// region: ---AreaEffect

#[derive(Debug, Clone, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct AreaEffect {
    pub size: u32,
    pub shape: Shape,
}

#[derive(Debug, Clone, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum Shape {
    Cone,
    Cube,
    Cylinder,
    Line,
    Sphere,
    Square,
    Custom(String),
}

impl Into<String> for Shape {
    fn into(self) -> String {
        match self {
            Shape::Cone => "cone".to_string(),
            Shape::Cube => "cube".to_string(),
            Shape::Cylinder => "cylinder".to_string(),
            Shape::Line => "line".to_string(),
            Shape::Sphere => "sphere".to_string(),
            Shape::Square => "square".to_string(),
            Shape::Custom(s) => s,
        }
    }
}

impl From<String> for Shape {
    fn from(s: String) -> Shape {
        match s.as_str() {
            "cone" => Shape::Cone,
            "cube" => Shape::Cube,
            "cylinder" => Shape::Cylinder,
            "line" => Shape::Line,
            "sphere" => Shape::Sphere,
            "square" => Shape::Square,
            _ => Shape::Custom(s),
        }
    }
}

// endregion: ---AreaEffect

// region: ---CastTime

#[derive(Debug, Clone, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum CastTime {
    Action,
    BonusAction,
    Reaction,
    Custom(String),
}

impl Into<String> for CastTime {
    fn into(self) -> String {
        match self {
            CastTime::Action => "Action".to_string(),
            CastTime::BonusAction => "Bonus Action".to_string(),
            CastTime::Reaction => "Reaction".to_string(),
            CastTime::Custom(s) => s,
        }
    }
}

impl From<String> for CastTime {
    fn from(s: String) -> CastTime {
        match s.as_str() {
            "Action" => CastTime::Action,
            "Bonus Action" => CastTime::BonusAction,
            "Reaction" => CastTime::Reaction,
            _ => CastTime::Custom(s),
        }
    }
}

// endregion: ---CastTime

// region: ---Duration

#[derive(Debug, Clone, Deserialize, Serialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum Duration {
    Instantaneous,
    Min(u8),
    Hour(u8),
    Day(u8),
    Custom(String),
}

impl Into<String> for Duration {
    fn into(self) -> String {
        match self {
            Self::Instantaneous => "instantaneous".into(),
            Self::Min(m) => format!("{} min", m),
            Self::Hour(h) => format!("{} hour", h),
            Self::Day(d) => format!("{} day", d),
            Self::Custom(s) => s,
        }
    }
}

// endregion: ---Duration

// region: ---SpellDice

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct SpellDice {
    pub dice: Dice,
    pub base: u8,
    pub scaling: u8,
    pub damage_type: Option<DamageType>,
}

// endregion: ---SpellDice

// region: ---AttackSave

#[derive(Debug, Clone, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum AttackSave {
    None,
    Ranged,
    Melee,
    Save(Stats),
}

impl Into<String> for AttackSave {
    fn into(self) -> String {
        match self {
            AttackSave::None => "None".to_string(),
            AttackSave::Ranged => "Ranged".to_string(),
            AttackSave::Melee => "Melee".to_string(),
            AttackSave::Save(s) => s.into(),
        }
    }
}

impl TryFrom<String> for AttackSave {
    type Error = Error;

    fn try_from(value: String) -> Result<Self> {
        match value.as_str() {
            "None" => Ok(AttackSave::None),
            "Ranged" => Ok(AttackSave::Ranged),
            "Melee" => Ok(AttackSave::Melee),
            _ => Ok(AttackSave::Save(value.try_into()?)),
        }
    }
}

// endregion: ---AttackSave
