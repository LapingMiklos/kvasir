use std::sync::Arc;

use sqlx::{Pool, Sqlite};

use crate::{entities::spell::model::Spell, prelude::*, repo};

pub struct SpellService {
    db: Arc<Pool<Sqlite>>,
}

impl SpellService {
    pub fn new(db: Arc<Pool<Sqlite>>) -> Self {
        SpellService { db }
    }

    pub async fn create(&self, spell: Spell) -> Result<()> {
        repo::spell::create(self.db.as_ref(), spell.try_into()?).await?;
        Ok(())
    }

    pub async fn find_all(&self) -> Result<Vec<Spell>> {
        let spells = repo::spell::find_all(self.db.as_ref()).await?;
        Ok(spells
            .into_iter()
            .filter_map(|s| s.try_into().ok())
            .collect())
    }

    pub async fn find_by_id(&self, id: i64) -> Result<Option<Spell>> {
        let spell = repo::spell::find_by_id(self.db.as_ref(), id).await?;
        spell.map(|s| s.try_into()).transpose()
    }

    pub async fn delete_by_id(&self, id: i64) -> Result<()> {
        repo::spell::delete_by_id(&self.db, id).await?;
        Ok(())
    }
}
