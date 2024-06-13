// import logo from "./assets/logo.svg"
import { Component, JSX } from "solid-js";
import "./App.css";
import { TitleBar } from "./components/TitleBar";
import SideBar from "./components/SideBar";

const App: Component<{ children?: JSX.Element }> = ({ children }) => {
  return (
    <>
      <TitleBar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </>
  );
};

export default App;
