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
