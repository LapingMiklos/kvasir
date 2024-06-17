export const SPELL_SCHOOL_NAMES = [
  "abjuration",
  "conjuration",
  "divination",
  "enchantment",
  "evocation",
  "illusion",
  "necromancy",
  "transmutation",
  "custom",
] as const;

export type SpellSchoolName = (typeof SPELL_SCHOOL_NAMES)[number];

export const SPELL_RANGES = [
  "self",
  "touch",
  "ranged",
  "sight",
  "unlimited",
] as const;

export type SpellRange = (typeof SPELL_RANGES)[number];

export const AREA_SHAPES = [
  "cone",
  "cube",
  "cylinder",
  "line",
  "sphere",
  "square",
  "custom",
] as const;

export type AreaShape = (typeof AREA_SHAPES)[number];

export const CAST_TIMES = [
  "action",
  "bonus action",
  "reaction",
  "custom",
] as const;

export type CastTimeName = (typeof CAST_TIMES)[number];

export const DURATIONS = [
  "instantaneous",
  "min",
  "hour",
  "day",
  "custom",
] as const;

export type DurationType = (typeof DURATIONS)[number];

export const ATTACK_SAVE_TYPES = ["none", "melee", "ranged", "save"] as const;

export type AttackSaveType = (typeof ATTACK_SAVE_TYPES)[number];

export const STATS = ["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const;

export type Stat = (typeof STATS)[number];
