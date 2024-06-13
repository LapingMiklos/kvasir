use serde::Deserialize;
use ts_rs::TS;

use super::model::{
    AreaEffect, AttackSave, CastTime, Duration, Range, Spell, SpellDice, SpellLevel, SpellSchool,
};

#[derive(Debug, Clone, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct CreateSpell {
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

impl Into<Spell> for CreateSpell {
    fn into(self) -> Spell {
        Spell {
            id: -1,
            name: self.name,
            icon_url: self.icon_url,
            description: self.description,
            at_higher_level: self.at_higher_level,
            level: self.level,
            school: self.school,
            range: self.range,
            area: self.area,
            is_verbal: self.is_verbal,
            is_somatic: self.is_somatic,
            materials: self.materials,
            cast_time: self.cast_time,
            duration: self.duration,
            effect: self.effect,
            has_multiple_effects: self.has_multiple_effects,
            attack_save: self.attack_save,
            spell_dice: self.spell_dice,
        }
    }
}
