use sqlx::{Pool, Sqlite};

use crate::entities::spell::persist::PersistSpell;

use crate::prelude::*;

pub async fn create(db: &Pool<Sqlite>, spell: PersistSpell) -> Result<()> {
    let sql = "INSERT INTO Spells (
        name,
        icon_url,
        description,
        at_higher_level,
        level,
        school,
        range,
        area_size,
        area_shape,
        is_verbal,
        is_somatic,
        materials,
        cast_time,
        duration_type,
        duration,
        effect,
        has_multiple_effects,
        attack_save,
        spell_dice)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    ";
    sqlx::query(sql)
        .bind(spell.name)
        .bind(spell.icon_url)
        .bind(spell.description)
        .bind(spell.at_higher_level)
        .bind(spell.level)
        .bind(spell.school)
        .bind(spell.range)
        .bind(spell.area_size)
        .bind(spell.area_shape)
        .bind(spell.is_verbal)
        .bind(spell.is_somatic)
        .bind(spell.materials)
        .bind(spell.cast_time)
        .bind(spell.duration_type)
        .bind(spell.duration)
        .bind(spell.effect)
        .bind(spell.has_multiple_effects)
        .bind(spell.attack_save)
        .bind(spell.spell_dice)
        .execute(db)
        .await?;
    Ok(())
}
