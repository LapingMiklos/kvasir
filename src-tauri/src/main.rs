// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs, sync::Arc};

use crate::commands::get_spells;
use crate::prelude::*;
use entities::spell::{create::CreateSpell, view::SpellView};

use sqlx::{migrate::MigrateDatabase, Sqlite, SqlitePool};
use ts_rs::TS;

mod commands;
mod ctx;
mod entities;
mod error;
mod prelude;
mod repo;

const EXPORT_DIR: &'static str = "../src/types/ts-rs";
const DB_URL: &'static str = "sqlite://runtime_res/sqlite.db";

#[tokio::main]
async fn main() -> Result<()> {
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

    // let spell: Spell = Spell {
    //     id: -1,
    //     name: "Fireball".into(),
    //     icon_url: Some("https://www.dndbeyond.com/attachments/2/703/evocation.png".into()),
    //     description: "".into(),
    //     at_higher_level: None,
    //     level: SpellLevel::Leveled(3),
    //     school: SpellSchool::Evocation,
    //     range: Range::Distance(150),
    //     area: Some(AreaEffect {
    //         size: 20,
    //         shape: Shape::Sphere,
    //     }),
    //     is_verbal: true,
    //     is_somatic: true,
    //     materials: Some("".into()),
    //     cast_time: CastTime::Action,
    //     duration: Duration::Instantaneous,
    //     effect: "fire".into(),
    //     has_multiple_effects: false,
    //     attack_save: AttackSave::Save(Stats::DEX),
    //     spell_dice: vec![SpellDice {
    //         base: 8,
    //         dice: Dice::D8,
    //         scaling: 1,
    //         damage_type: Some(DamageType::Fire),
    //     }],
    // };

    // println!("{:?}", repo::spell_repository::find_all(&db).await?);

    tauri::Builder::default()
        .manage(Arc::new(db))
        .invoke_handler(tauri::generate_handler![get_spells])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
