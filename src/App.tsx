// import logo from "./assets/logo.svg"
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Component, JSX } from "solid-js";

import "./App.css";
import SideBar from "./components/SideBar";
import TitleBar from "./components/TitleBar";

const queryClient = new QueryClient();

const App: Component<{ children?: JSX.Element }> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{ height: "100%", display: "flex", "flex-direction": "column" }}
      >
        <TitleBar />
        <div style={{ display: "flex", flex: 1 }}>
          <SideBar />
          <div style={{ flex: 1 }}>{props.children}</div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
