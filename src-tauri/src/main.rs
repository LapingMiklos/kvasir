// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused)] // COMMENT OUT LATER

use std::fs;

use crate::prelude::*;
use model::out::spell::SpellView;
use sqlx::{migrate::MigrateDatabase, Sqlite, SqlitePool};
use ts_rs::TS;

mod error;
mod model;
mod prelude;

const EXPORT_DIR: &'static str = "../src/types/ts-rs";
const DB_URL: &'static str = "sqlite://runtime_res/sqlite.db";

#[tokio::main]
async fn main() -> Result<()> {
    // let _ = Spell::export_all_to(EXPORT_DIR);
    // let _ = SpellLevel::export_all_to(EXPORT_DIR);
    let _ = SpellView::export_all_to(EXPORT_DIR);

    fs::create_dir("runtime_res");

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

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
