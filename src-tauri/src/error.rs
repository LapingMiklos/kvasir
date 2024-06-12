use serde_json::error;

#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error("Generic {0}")]
    Generic(String),

    #[error(transparent)]
    IO(#[from] std::io::Error),

    #[error(transparent)]
    DB(#[from] sqlx::Error),

    #[error("Mapping: {0}")]
    Mapping(String),
}
