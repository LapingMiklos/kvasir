// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused)] // COMMENT OUT LATER

use crate::prelude::*;
use model::out::spell::SpellView;
use ts_rs::TS;

mod error;
mod model;
mod prelude;

const EXPORT_DIR: &'static str = "../src/types/ts-rs";
const DB_URL: &'static str = "sqlite://sqlite.db";

#[tokio::main]
async fn main() -> Result<()> {
    // let _ = Spell::export_all_to(EXPORT_DIR);
    // let _ = SpellLevel::export_all_to(EXPORT_DIR);
    let _ = SpellView::export_all_to(EXPORT_DIR);

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
