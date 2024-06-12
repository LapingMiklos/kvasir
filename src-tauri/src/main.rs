// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused)] // COMMENT OUT LATER

use std::fs;

use crate::commands::get_spells;
use crate::prelude::*;
use entities::spell::view::SpellView;
use sqlx::{
    migrate::{MigrateDatabase, Migrator},
    Sqlite, SqlitePool,
};
use ts_rs::TS;

mod commands;
mod entities;
mod error;
mod prelude;

const EXPORT_DIR: &'static str = "../src/types/ts-rs";
const DB_URL: &'static str = "sqlite://runtime_res/sqlite.db";

#[tokio::main]
async fn main() -> Result<()> {
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

    let crate_dir = "";
    let migrations = std::path::Path::new(&crate_dir).join("./migrations");
    let migration_results = sqlx::migrate::Migrator::new(migrations)
        .await
        .unwrap()
        .run(&db)
        .await;
    match migration_results {
        Ok(_) => println!("Migration success"),
        Err(error) => {
            panic!("error: {}", error);
        }
    }
    println!("migration: {:?}", migration_results);

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_spells])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
