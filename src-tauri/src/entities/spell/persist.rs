use sqlx::prelude::FromRow;

use super::model::{AreaEffect, Spell};
use crate::prelude::*;

#[derive(Debug, Clone, FromRow)]
pub struct PersistSpell {
    pub id: i64,
    pub name: String,
    pub icon_url: Option<String>,
    pub description: String,
    pub at_higher_level: Option<String>,
    pub level: i64,
    pub school: String,
    pub range: String,
    pub area_size: Option<i64>,
    pub area_shape: Option<String>,
    pub is_verbal: bool,
    pub is_somatic: bool,
    pub materials: Option<String>,
    pub cast_time: String,
    pub duration: String,
    pub effect: String,
    pub has_multiple_effects: bool,
    pub attack_save: String,
    pub spell_dice: String,
}

impl TryFrom<Spell> for PersistSpell {
    type Error = Error;
    fn try_from(spell: Spell) -> Result<PersistSpell> {
        let level: u8 = spell.level.into();

        Ok(PersistSpell {
            id: spell.id,
            name: spell.name,
            icon_url: spell.icon_url,
            description: spell.description,
            at_higher_level: spell.at_higher_level,
            level: level as i64,
            school: spell.school.into(),
            range: serde_json::to_string(&spell.range)?,
            area_size: spell.area.as_ref().map(|a| a.size as i64),
            area_shape: spell.area.map(|a| a.shape.into()),
            is_verbal: spell.is_verbal,
            is_somatic: spell.is_somatic,
            materials: spell.materials,
            cast_time: spell.cast_time.into(),
            duration: serde_json::to_string(&spell.duration)?,
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
            level: (self.level as u8).into(),
            school: self.school.into(),
            range: serde_json::from_str(&self.range)?,
            area: self
                .area_size
                .zip(self.area_shape)
                .map(|(size, shape)| AreaEffect {
                    size: size as u32,
                    shape: shape.into(),
                }),
            is_verbal: self.is_verbal,
            is_somatic: self.is_somatic,
            materials: self.materials,
            cast_time: self.cast_time.into(),
            duration: serde_json::from_str(&self.duration)?,
            effect: self.effect,
            has_multiple_effects: self.has_multiple_effects,
            attack_save: self.attack_save.try_into()?,
            spell_dice: serde_json::from_str(&self.spell_dice)?,
        })
    }
}
