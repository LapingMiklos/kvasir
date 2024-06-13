import { useParams } from "@solidjs/router";
import { Component, createEffect } from "solid-js";
import invokeCommand from "../commands/invokeCommand";
import { GetSpellById } from "../commands/spellCommands";

const Spell: Component<{}> = () => {
  const params = useParams();

  createEffect(async () => {
    let res = await invokeCommand<GetSpellById>("get_spell_by_id", {
      id: Number(params.id),
    });

    console.log(res);
  });

  return <div>{params.id}</div>;
};

export default Spell;
