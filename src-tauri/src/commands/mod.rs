use crate::model::out::spell::SpellView;

#[tauri::command]
pub fn get_spells() -> Vec<SpellView> {
    vec![
        SpellView {
            id: 1,
            icon_url:
              Some("https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/magic_missile_spell_baldursgate3_wiki_guide_150px_2.png".into()),
            level: "Lvl 1".into(),
            name: "Magic Missile".into(),
            school: "evocation".into(),
            attack_save: "None".into(),
            cast_time: "1 Action".into(),
            components: "V, S".into(),
            damage_effect: "force".into(),
            duration: "Instantaneous".into(),
            range_area: "120 ft".into(),
            dice: Some("3d4".into()),
          },
          SpellView {
            id: 1,
            icon_url:
              Some("https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/magic_missile_spell_baldursgate3_wiki_guide_150px_2.png".into()),
            level: "Lvl 1".into(),
            name: "Magic Missile".into(),
            school: "evocation".into(),
            attack_save: "None".into(),
            cast_time: "1 Action".into(),
            components: "V, S".into(),
            damage_effect: "force".into(),
            duration: "Instantaneous".into(),
            range_area: "120 ft".into(),
            dice: Some("3d4".into()),
          },
          SpellView {
            id: 1,
            icon_url:
              Some("https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/magic_missile_spell_baldursgate3_wiki_guide_150px_2.png".into()),
            level: "Lvl 1".into(),
            name: "Magic Missile".into(),
            school: "evocation".into(),
            attack_save: "None".into(),
            cast_time: "1 Action".into(),
            components: "V, S".into(),
            damage_effect: "force".into(),
            duration: "Instantaneous".into(),
            range_area: "120 ft".into(),
            dice: Some("3d4".into()),
          }
    ]
}
