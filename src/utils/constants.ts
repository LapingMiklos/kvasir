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

export const AREA_SHAPES = [
  "cone",
  "cube",
  "cylinder",
  "line",
  "sphere",
  "square",
  "custom",
] as const;
