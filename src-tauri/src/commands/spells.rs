use tauri::{AppHandle, Wry};

use crate::{
    ctx::Context,
    entities::spell::{create::CreateSpell, view::SpellView},
};

use super::CommandResponse;

#[tauri::command]
pub async fn get_spells(app: AppHandle<Wry>) -> CommandResponse<Vec<SpellView>> {
    let ctx = Context::from_app(&app);

    match ctx.spell_service().find_all().await {
        Ok(spells) => Ok(spells.into_iter().map(SpellView::from).collect()).into(),
        Err(err) => Err(err).into(),
    }
}

#[tauri::command]
pub async fn post_spell(app: AppHandle<Wry>, spell: CreateSpell) -> CommandResponse<()> {
    let ctx = Context::from_app(&app);

    ctx.spell_service().create(spell.into()).await.into()
}
