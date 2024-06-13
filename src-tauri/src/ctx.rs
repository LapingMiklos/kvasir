use std::sync::Arc;

use sqlx::{Pool, Sqlite};
use tauri::{AppHandle, Manager, Wry};

use crate::service::spell::SpellService;

pub struct Context {
    spell_service: SpellService,
}

impl Context {
    pub fn from_app(app: &AppHandle<Wry>) -> Self {
        let db = (*app.state::<Arc<Pool<Sqlite>>>()).clone();
        Context {
            spell_service: SpellService::new(db),
        }
    }

    pub fn spell_service(&self) -> &SpellService {
        &self.spell_service
    }
}
