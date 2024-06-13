// import logo from "./assets/logo.svg"
import { Component, JSX } from "solid-js";
import "./App.css";
import { TitleBar } from "./components/TitleBar";
import SideBar from "./components/SideBar";

const App: Component<{ children?: JSX.Element }> = ({ children }) => {
  return (
    <div
      style={{ height: "100%", display: "flex", "flex-direction": "column" }}
    >
      <TitleBar />
      <div style={{ display: "flex", flex: 1 }}>
        <SideBar />
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

export default App;
