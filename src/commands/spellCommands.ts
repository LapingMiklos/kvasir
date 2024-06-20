import { CreateSpell } from "../types/ts-rs/CreateSpell.ts";
import { SpellView } from "../types/ts-rs/SpellView.ts";
import { BaseCommand } from "./invokeCommand.ts";

export type GetSpells = BaseCommand<
  "get_spells",
  Record<string, null>,
  SpellView[]
>;

export type GetSpellById = BaseCommand<
  "get_spell_by_id",
  { id: number },
  SpellView | null
>;

export type PostSpell = BaseCommand<"post_spell", { spell: CreateSpell }, void>;

export type DeleteSpellById = BaseCommand<"delete_spell", { id: number }, void>;
