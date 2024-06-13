import { CreateSpell } from "../types/ts-rs/CreateSpell";
import { SpellView } from "../types/ts-rs/SpellView";
import { BaseCommand } from "./invokeCommand";

export type GetSpells = BaseCommand<"get_spells", {}, SpellView[]>;

export type GetSpellById = BaseCommand<
  "get_spell_by_id",
  { id: number },
  SpellView | null
>;

export type PostSpell = BaseCommand<"post_spell", { spell: CreateSpell }, void>;
