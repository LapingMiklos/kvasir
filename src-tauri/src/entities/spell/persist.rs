use serde::Serialize;
use sqlx::prelude::FromRow;

use super::model::{AreaEffect, Duration, Spell, SpellLevel};
use crate::prelude::*;

#[derive(Debug, Clone, FromRow)]
pub struct PersistSpell {
    pub id: i64,
    pub name: String,
    pub icon_url: Option<String>,
    pub description: String,
    pub at_higher_level: Option<String>,
    pub level: u8,
    pub school: String,
    pub range: u32,
    pub area_size: Option<u32>,
    pub area_shape: Option<String>,
    pub is_verbal: bool,
    pub is_somatic: bool,
    pub materials: Option<String>,
    pub cast_time: String,
    pub duration_type: String,
    pub duration: u8,
    pub effect: String,
    pub has_multiple_effects: bool,
    pub attack_save: String,
    pub spell_dice: String,
}

impl TryFrom<Spell> for PersistSpell {
    type Error = Error;
    fn try_from(spell: Spell) -> Result<PersistSpell> {
        let (duration_type, duration) = spell.duration.into();

        Ok(PersistSpell {
            id: spell.id,
            name: spell.name,
            icon_url: spell.icon_url,
            description: spell.description,
            at_higher_level: spell.at_higher_level,
            level: spell.level.into(),
            school: spell.school.into(),
            range: spell.range.into(),
            area_size: spell.area.map(|a| a.size),
            area_shape: spell.area.map(|a| a.shape.into()),
            is_verbal: spell.is_verbal,
            is_somatic: spell.is_somatic,
            materials: spell.materials,
            cast_time: spell.cast_time.into(),
            duration_type,
            duration,
            effect: spell.effect,
            has_multiple_effects: spell.has_multiple_effects,
            attack_save: spell.attack_save.into(),
            spell_dice: serde_json::to_string(&spell.spell_dice)?,
        })
    }
}

impl TryInto<Spell> for PersistSpell {
    type Error = Error;
    fn try_into(self) -> Result<Spell> {
        Ok(Spell {
            id: self.id,
            name: self.name,
            icon_url: self.icon_url,
            description: self.description,
            at_higher_level: self.at_higher_level,
            level: self.level.into(),
            school: self.school.into(),
            range: self.range.into(),
            area: self
                .area_size
                .zip(self.area_shape)
                .map(|(size, shape)| AreaEffect {
                    size,
                    shape: shape.into(),
                }),
            is_verbal: self.is_verbal,
            is_somatic: self.is_somatic,
            materials: self.materials,
            cast_time: self.cast_time.into(),
            duration: (self.duration_type, self.duration).try_into()?,
            effect: self.effect,
            has_multiple_effects: self.has_multiple_effects,
            attack_save: self.attack_save.try_into()?,
            spell_dice: serde_json::from_str(&self.spell_dice)?,
        })
    }
}
