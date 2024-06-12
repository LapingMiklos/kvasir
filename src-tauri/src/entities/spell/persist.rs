use sqlx::prelude::FromRow;

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
    pub are_shape: Option<String>,
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
