import { Component } from "solid-js";
import "../css/SideBar.css";
import { A } from "@solidjs/router";
import { VsHome } from "solid-icons/vs";
import { BsMagic } from "solid-icons/bs";

const SideBar: Component<{}> = () => {
  return (
    <div class="sidebar">
      <A href="/" class="icon" activeClass="icon-active" end>
        <VsHome size={40} />
      </A>
      <A href="/spells" class="icon" activeClass="icon-active">
        <BsMagic size={40} />
      </A>
    </div>
  );
};

export default SideBar;
