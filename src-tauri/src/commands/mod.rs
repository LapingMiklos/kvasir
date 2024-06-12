use crate::entities::{
    damage_type::DamageType, dice::Dice, spell::{
        model::SpellDice,
        view::SpellView,
    }
};

#[tauri::command]
pub fn get_spells() -> Vec<SpellView> {
    vec![
        SpellView {
            id: 1,
            icon_url:
              "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/magic_missile_spell_baldursgate3_wiki_guide_150px_2.png".into(),
            level: "Lvl 1".into(),
            name: "Magic Missile".into(),
            school: "evocation".into(),
            attack_save: "None".into(),
            cast_time: "1 Action".into(),
            components: "V, S".into(),
            damage_effect: "force".into(),
            duration: "Instantaneous".into(),
            range_area: "120 ft".into(),
            dice: vec![SpellDice {dice: Dice::D4, base: 3, scaling: 1, damage_type: Some(DamageType::Force)}],
            has_multiple_effects: false,
          },
          SpellView {
            id: 2,
            icon_url:
              "https://bg3.wiki/w/images/thumb/0/08/Ice_Knife.webp/300px-Ice_Knife.webp.png".into(),
            level: "Lvl 1".into(),
            name: "Ice Knife".into(),
            school: "conjuration".into(),
            attack_save: "DEX save".into(),
            cast_time: "1 Action".into(),
            components: "V, S".into(),
            damage_effect: "piercing".into(),
            duration: "Instantaneous".into(),
            range_area: "60 ft (5 ft)".into(),
            dice: vec![
                SpellDice {dice: Dice::D10, base: 1, scaling: 0, damage_type: Some(DamageType::Piercing)}, 
                SpellDice {dice: Dice::D6, base: 2, scaling: 1, damage_type: Some(DamageType::Cold)}
            ],
            has_multiple_effects: true,
          },
    ]
}
