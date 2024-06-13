use std::sync::Arc;

use sqlx::{Pool, Sqlite};
use tauri::{AppHandle, Manager, Wry};

pub struct Context {
    db: Arc<Pool<Sqlite>>,
}

impl Context {
    pub fn from_app(app: &AppHandle<Wry>) -> Self {
        Context {
            db: (*app.state::<Arc<Pool<Sqlite>>>()).clone(),
        }
    }

    pub fn db(&self) -> &Pool<Sqlite> {
        &self.db
    }
}
