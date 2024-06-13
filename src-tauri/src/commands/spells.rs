use tauri::{AppHandle, Wry};

use crate::{
    ctx::Context,
    entities::spell::{create::CreateSpell, view::SpellView},
};

use super::CommandResponse;

#[tauri::command]
pub async fn get_spells(app: AppHandle<Wry>) -> CommandResponse<Vec<SpellView>> {
    let ctx = Context::from_app(&app);

    ctx.spell_service()
        .find_all()
        .await
        .map(|spells| spells.into_iter().map(SpellView::from).collect())
        .into()
}

#[tauri::command]
pub async fn get_spell_by_id(app: AppHandle<Wry>, id: i64) -> CommandResponse<Option<SpellView>> {
    let ctx = Context::from_app(&app);

    ctx.spell_service()
        .find_by_id(id)
        .await
        .map(|so| so.map(SpellView::from))
        .into()
}

#[tauri::command]
pub async fn post_spell(app: AppHandle<Wry>, spell: CreateSpell) -> CommandResponse<()> {
    let ctx = Context::from_app(&app);

    ctx.spell_service().create(spell.into()).await.into()
}
