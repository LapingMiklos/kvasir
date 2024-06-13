import { useParams } from "@solidjs/router";
import { Component } from "solid-js";

const Spell: Component<{}> = () => {
  const params = useParams();
  return <div>{params.id}</div>;
};

export default Spell;
