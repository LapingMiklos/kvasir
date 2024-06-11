// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use model::out::spell::SpellView;
use ts_rs::TS;

mod error;
mod model;
mod prelude;

const EXPORT_DIR: &'static str = "../src/types/ts-rs";

fn main() {
    // let _ = Spell::export_all_to(EXPORT_DIR);
    // let _ = SpellLevel::export_all_to(EXPORT_DIR);
    let _ = SpellView::export_all_to(EXPORT_DIR);

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
