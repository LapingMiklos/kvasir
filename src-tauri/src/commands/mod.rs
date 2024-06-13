use crate::prelude::*;
use sqlx::{Pool, Sqlite};
use std::sync::Arc;
use tauri::{AppHandle, Manager, Wry};

use crate::{
    entities::{
        damage_type::DamageType,
        dice::Dice,
        spell::{
            model::{Spell, SpellDice, SpellLevel},
            view::SpellView,
        },
    },
    repo::spell_repository,
};

#[tauri::command]
pub async fn get_spells(app: AppHandle<Wry>) -> Vec<SpellView> {
    let db = (*app.state::<Arc<Pool<Sqlite>>>()).clone();

    let spells = match spell_repository::find_all(db.as_ref()).await {
        Ok(spells) => spells,
        Err(err) => vec![],
    };

    let spells: Vec<Spell> = spells
        .into_iter()
        .filter_map(|s| s.try_into().ok())
        .collect();

    spells.into_iter().map(|s| s.into()).collect()
}
