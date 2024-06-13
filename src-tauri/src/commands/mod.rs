use crate::prelude::*;
use serde::Serialize;

pub mod spells;

#[derive(Serialize)]
pub struct CommandResult<T: Serialize> {
    pub data: T,
}

#[derive(Serialize)]
pub struct CommandError {
    message: String,
}

#[derive(Serialize)]
pub struct CommandResponse<T: Serialize> {
    result: Option<CommandResult<T>>,
    error: Option<CommandError>,
}

impl<T: Serialize> From<Result<T>> for CommandResponse<T> {
    fn from(res: Result<T>) -> Self {
        match res {
            Ok(data) => CommandResponse {
                error: None,
                result: Some(CommandResult { data }),
            },
            Err(err) => CommandResponse {
                error: Some(CommandError {
                    message: format!("{err}"),
                }),
                result: None,
            },
        }
    }
}
