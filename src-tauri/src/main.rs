// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs, sync::Arc};

use crate::prelude::*;
use commands::spells::{delete_spell, get_spell_by_id, get_spells, post_spell};
use dotenv_codegen::dotenv;
use entities::spell::{create::CreateSpell, view::SpellView};

use sqlx::{migrate::MigrateDatabase, Sqlite, SqlitePool};
use ts_rs::TS;

mod commands;
mod ctx;
mod entities;
mod error;
mod prelude;
mod repo;
mod service;

const EXPORT_DIR: &'static str = "../src/types/ts-rs";
const DB_URL: &'static str = dotenv!("DATABASE_URL");

#[tokio::main]
async fn main() -> Result<()> {
    let _ = dotenv::dotenv();
    let _ = SpellView::export_all_to(EXPORT_DIR);
    let _ = CreateSpell::export_all_to(EXPORT_DIR);

    let _ = fs::create_dir("runtime_res");

    if !Sqlite::database_exists(DB_URL).await? {
        println!("Creating database {}", DB_URL);
        match Sqlite::create_database(DB_URL).await {
            Ok(_) => println!("Create db success"),
            Err(err) => println!("Error: {err}",),
        }
    } else {
        println!("Database already exists");
    }

    let db = SqlitePool::connect(DB_URL).await?;

    match sqlx::migrate!("./migrations").run(&db).await {
        Ok(()) => {
            println!("Migration success")
        }
        Err(err) => {
            println!("Migration error: {}", err)
        }
    };

    tauri::Builder::default()
        .manage(Arc::new(db))
        .invoke_handler(tauri::generate_handler![
            get_spells,
            get_spell_by_id,
            post_spell,
            delete_spell,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
