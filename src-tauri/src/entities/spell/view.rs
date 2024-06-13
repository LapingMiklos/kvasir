use serde::Serialize;
use ts_rs::TS;

use super::model::{Spell, SpellDice, SpellLevel};

#[derive(Serialize, Debug, Clone, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct SpellView {
    pub id: i64,
    pub name: String,
    pub icon_url: String,
    pub level: String,
    pub school: String,
    pub range_area: String,
    pub attack_save: String,
    pub components: String,
    pub cast_time: String,
    pub duration: String,
    pub damage_effect: String,
    pub dice: Vec<SpellDice>,
    pub has_multiple_effects: bool,
}

impl From<Spell> for SpellView {
    fn from(spell: Spell) -> Self {
        // TODO: implement default_icon
        let default_icon = "https://www.dndbeyond.com/attachments/2/720/necromancy.png".to_string();
        let level = match spell.level {
            SpellLevel::Cantrip => "cantrip".into(),
            SpellLevel::Leveled(l) => format!("lvl {l}"),
        };
        let range_area = format!(
            "{}{}",
            String::from(spell.range),
            spell
                .area
                .map_or_else(|| "".into(), |a| format!("({} ft)", a.size))
        );
        let mut components = [
            ("V", spell.is_verbal),
            ("S", spell.is_somatic),
            ("M", spell.materials.is_some()),
        ]
        .into_iter()
        .filter_map(|(s, b)| if b { Some(s) } else { None })
        .collect::<Vec<_>>()
        .join(", ");

        SpellView {
            id: spell.id,
            name: spell.name,
            icon_url: spell.icon_url.unwrap_or(default_icon),
            level,
            school: spell.school.into(),
            range_area,
            attack_save: spell.attack_save.into(),
            components,
            cast_time: spell.cast_time.into(),
            duration: spell.duration.into(),
            damage_effect: spell.effect,
            dice: spell.spell_dice,
            has_multiple_effects: spell.has_multiple_effects,
        }
    }
}
