// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use model::spell::Spell;
use ts_rs::TS;

mod error;
mod model;
mod prelude;

fn main() {
    let _ = Spell::export_all_to("../src/types/ts-rs");

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
