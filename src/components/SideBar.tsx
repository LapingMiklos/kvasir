import { A } from "@solidjs/router";
import { VsBook, VsHome } from "solid-icons/vs";
import { Component } from "solid-js";

import "../css/SideBar.css";

const SideBar: Component = () => {
  return (
    <div class="sidebar">
      <A href="/" class="icon" activeClass="icon-active" end>
        <VsHome size={35} />
      </A>
      <A href="/spells" class="icon" activeClass="icon-active">
        <VsBook size={35} />
      </A>
    </div>
  );
};

export default SideBar;
