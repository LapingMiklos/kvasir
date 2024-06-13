use sqlx::{FromRow, Pool, Sqlite};

use crate::entities::spell::persist::PersistSpell;

use crate::prelude::*;

pub async fn create(db: &Pool<Sqlite>, spell: PersistSpell) -> Result<()> {
    sqlx::query!(
        "INSERT INTO
    Spells (
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
        spell_dice
    )
VALUES
    (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15,
        $16,
        $17,
        $18,
        $19
    )
    ",
        spell.name,
        spell.icon_url,
        spell.description,
        spell.at_higher_level,
        spell.level,
        spell.school,
        spell.range,
        spell.area_size,
        spell.area_shape,
        spell.is_verbal,
        spell.is_somatic,
        spell.materials,
        spell.cast_time,
        spell.duration_type,
        spell.duration,
        spell.effect,
        spell.has_multiple_effects,
        spell.attack_save,
        spell.spell_dice
    )
    .execute(db)
    .await?;
    Ok(())
}

pub async fn find_all(db: &Pool<Sqlite>) -> Result<Vec<PersistSpell>> {
    let res = sqlx::query_as!(
        PersistSpell,
        "SELECT
        *
        FROM Spells"
    )
    .fetch_all(db)
    .await?;

    Ok(res)
}
