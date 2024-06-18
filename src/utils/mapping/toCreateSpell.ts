import { SpellFormData } from "../../routes/SpellForm";
import { AreaEffect } from "../../types/ts-rs/AreaEffect";
import { AttackSave } from "../../types/ts-rs/AttackSave";
import { CastTime } from "../../types/ts-rs/CastTime";
import { CreateSpell } from "../../types/ts-rs/CreateSpell";
import { Duration } from "../../types/ts-rs/Duration";
import { Range } from "../../types/ts-rs/Range";
import { Shape } from "../../types/ts-rs/Shape";

const toCreateSpell = (spell: SpellFormData): CreateSpell => {
  const atHigherLevel = spell.isScaling ? spell.atHigherLevel ?? "" : null;

  const school =
    spell.schoolName === "custom"
      ? spell.customSchoolName ?? ""
      : spell.schoolName;

  const range: Range =
    spell.rangeType === "ranged"
      ? { ranged: spell.rangeDistance ?? 0 }
      : spell.rangeType;

  const areaShape: Shape | undefined =
    spell.areaShape === "custom"
      ? { custom: spell.customAreaShape ?? "" }
      : spell.areaShape;
  const area: AreaEffect | null = spell.area
    ? { shape: areaShape ?? "cone", size: spell.areaSize ?? 0 }
    : null;
  const materials: string | null = spell.isMaterial
    ? spell.materials ?? ""
    : null;

  const castTime: CastTime =
    spell.castTime === "custom"
      ? { custom: spell.customCastTime ?? "" }
      : spell.castTime === "bonus action"
        ? "bonusAction"
        : spell.castTime;

  const duration = (): Duration => {
    if (spell.durationType === "custom") {
      return { custom: spell.customDuration ?? "" };
    }
    if (spell.durationType === "min") {
      return { min: spell.duration ?? 0 };
    }
    if (spell.durationType === "hour") {
      return { hour: spell.duration ?? 0 };
    }
    if (spell.durationType === "day") {
      return { day: spell.duration ?? 0 };
    }

    return "instantaneous";
  };

  const attackSave: AttackSave =
    spell.attackSaveType === "save"
      ? { save: spell.saveStat ?? "STR" }
      : spell.attackSaveType;

  return {
    name: spell.name,
    description: spell.description,
    atHigherLevel,
    level: spell.level,
    school,
    range,
    area,
    isVerbal: spell.isVerbal,
    isSomatic: spell.isSomatic,
    materials,
    castTime,
    duration: duration(),
    effect: spell.effect,
    attackSave,
    hasMultipleEffects: false,
  };
};

export default toCreateSpell;
