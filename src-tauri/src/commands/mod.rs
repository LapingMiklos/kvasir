use crate::prelude::*;
use serde::Serialize;
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

#[derive(Serialize)]
pub struct CommandResult<T: Serialize> {
    pub data: T,
}

#[derive(Serialize)]
pub struct CommandError {
    message: String,
}

#[derive(Serialize)]
pub struct CommandResponse<T: Serialize> {
    result: Option<CommandResult<T>>,
    error: Option<CommandError>,
}

impl<T: Serialize> From<Result<T>> for CommandResponse<T> {
    fn from(res: Result<T>) -> Self {
        match res {
            Ok(data) => CommandResponse {
                error: None,
                result: Some(CommandResult { data }),
            },
            Err(err) => CommandResponse {
                error: Some(CommandError {
                    message: format!("{err}"),
                }),
                result: None,
            },
        }
    }
}

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
