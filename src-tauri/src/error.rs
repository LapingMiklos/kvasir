#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error(transparent)]
    IO(#[from] std::io::Error),

    #[error(transparent)]
    DB(#[from] sqlx::Error),

    #[error("Mapping: {0}")]
    Mapping(String),

    #[error(transparent)]
    SerdeJson(#[from] serde_json::Error),
}
