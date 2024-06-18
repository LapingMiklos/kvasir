// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { AreaEffect } from "./AreaEffect";
import type { AttackSave } from "./AttackSave";
import type { CastTime } from "./CastTime";
import type { Duration } from "./Duration";
import type { Range } from "./Range";
import type { SpellDice } from "./SpellDice";
import type { SpellLevel } from "./SpellLevel";
import type { SpellSchool } from "./SpellSchool";

export type CreateSpell = { name: string, iconUrl: string | null, description: string, atHigherLevel: string | null, level: SpellLevel, school: SpellSchool, range: Range, area: AreaEffect | null, isVerbal: boolean, isSomatic: boolean, materials: string | null, castTime: CastTime, duration: Duration, effect: string, hasMultipleEffects: boolean, attackSave: AttackSave, spellDice: Array<SpellDice>, };