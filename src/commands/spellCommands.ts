import { SpellView } from "../types/ts-rs/SpellView";
import { BaseCommand } from "./invokeCommand";

export type GetSpells = BaseCommand<"get_spells", {}, SpellView[]>;
