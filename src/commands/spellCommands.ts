import { SpellView } from "../types/ts-rs/SpellView";

export type GetSpells = {
  name: "get_spells";
  args: {};
  res: SpellView[];
};
