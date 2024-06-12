pub use crate::error::Error;

// Result type alias using thiserror Error
pub type Result<T> = std::result::Result<T, Error>;

// Generic wrapper to implement external traits on external types
pub struct W<T>(pub T);
