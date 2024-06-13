import { Component } from "solid-js";
import "../css/SideBar.css";
import { A } from "@solidjs/router";
import { VsHome } from "solid-icons/vs";
import { BsMagic } from "solid-icons/bs";

const SideBar: Component<{}> = () => {
  return (
    <div class="sidebar">
      <A href="/">
        <VsHome size={40} />
      </A>
      <A href="/spells" end>
        <BsMagic size={40} />
      </A>
    </div>
  );
};

export default SideBar;
