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

#[derive(Debug, Clone, Copy, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum Range {
    User,
    Distance(u32),
}

impl Range {
    const SELF: &'static str = "self";
}

impl Into<u32> for Range {
    fn into(self) -> u32 {
        match self {
            Self::User => 0,
            Self::Distance(d) => d,
        }
    }
}

impl From<u32> for Range {
    fn from(value: u32) -> Self {
        match value {
            0 => Self::User,
            _ => Self::Distance(value),
        }
    }
}

impl From<Range> for String {
    fn from(value: Range) -> String {
        match value {
            Range::User => Range::SELF.into(),
            Range::Distance(d) => format!("{} ft", d),
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
    Cube,
    Cylinder,
    Line,
    Sphere,
    Custom(String),
}

impl Into<String> for Shape {
    fn into(self) -> String {
        match self {
            Shape::Cube => "cube".to_string(),
            Shape::Cylinder => "cylinder".to_string(),
            Shape::Line => "line".to_string(),
            Shape::Sphere => "sphere".to_string(),
            Shape::Custom(s) => s,
        }
    }
}

impl From<String> for Shape {
    fn from(s: String) -> Shape {
        match s.as_str() {
            "cube" => Shape::Cube,
            "cylinder" => Shape::Cylinder,
            "line" => Shape::Line,
            "sphere" => Shape::Sphere,
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
            CastTime::BonusAction => "BonusAction".to_string(),
            CastTime::Reaction => "Reaction".to_string(),
            CastTime::Custom(s) => s,
        }
    }
}

impl From<String> for CastTime {
    fn from(s: String) -> CastTime {
        match s.as_str() {
            "Action" => CastTime::Action,
            "BonusAction" => CastTime::BonusAction,
            "Reaction" => CastTime::Reaction,
            _ => CastTime::Custom(s),
        }
    }
}

// endregion: ---CastTime

// region: ---Duration

#[derive(Debug, Clone, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum Duration {
    Instantaneous,
    Min(u8),
    Hour(u8),
    Day(u8),
}

impl Into<(String, u8)> for Duration {
    fn into(self) -> (String, u8) {
        match self {
            Self::Instantaneous => ("Instantaneous".into(), 0),
            Self::Min(m) => ("Min".into(), m),
            Self::Hour(h) => ("Hour".into(), h),
            Self::Day(d) => ("Day".into(), d),
        }
    }
}

impl Into<String> for Duration {
    fn into(self) -> String {
        match self {
            Self::Instantaneous => "instantaneous".into(),
            Self::Min(m) => format!("{} min", m),
            Self::Hour(h) => format!("{} hour", h),
            Self::Day(d) => format!("{} day", d),
        }
    }
}

impl TryFrom<(String, u8)> for Duration {
    type Error = Error;
    fn try_from((duration_type, duration): (String, u8)) -> Result<Self> {
        match duration_type.as_str() {
            "Instantaneous" => Ok(Self::Instantaneous),
            "Min" => Ok(Self::Min(duration)),
            "Hour" => Ok(Self::Hour(duration)),
            "Day" => Ok(Self::Day(duration)),
            _ => Err(Error::Mapping(format!(
                "Unable to convert {} {}",
                duration_type, duration
            ))),
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
