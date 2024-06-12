use crate::prelude::*;

#[derive(Debug, Clone, Copy)]
pub enum Stats {
    STR,
    DEX,
    CON,
    INT,
    WIS,
    CHA,
}

impl Into<String> for Stats {
    fn into(self) -> String {
        match self {
            Self::CHA => "CHA".into(),
            Self::CON => "CON".into(),
            Self::DEX => "DEX".into(),
            Self::INT => "INT".into(),
            Self::STR => "STR".into(),
            Self::WIS => "WIS".into(),
        }
    }
}

impl TryFrom<String> for Stats {
    type Error = Error;
    fn try_from(value: String) -> Result<Self> {
        match value.as_str() {
            "CHA" => Ok(Self::CHA),
            "CON" => Ok(Self::CON),
            "DEX" => Ok(Self::DEX),
            "INT" => Ok(Self::INT),
            "STR" => Ok(Self::STR),
            "WIS" => Ok(Self::WIS),
            _ => Err(Error::Mapping(format!(
                "{value} cannot be converted to Stats"
            ))),
        }
    }
}
