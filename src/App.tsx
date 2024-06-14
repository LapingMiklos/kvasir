// import logo from "./assets/logo.svg"
import { Component, JSX } from "solid-js";
import "./App.css";
import SideBar from "./components/SideBar";
import TitleBar from "./components/TitleBar";

const App: Component<{ children?: JSX.Element }> = (props) => {
  return (
    <div
      style={{ height: "100%", display: "flex", "flex-direction": "column" }}
    >
      <TitleBar />
      <div style={{ display: "flex", flex: 1 }}>
        <SideBar />
        <div style={{ flex: 1 }}>{props.children}</div>
      </div>
    </div>
  );
};

export default App;
