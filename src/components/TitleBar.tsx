import { appWindow } from "@tauri-apps/api/window";
import windowMax from "../assets/window-max.svg";
import windowMin from "../assets/window-min.svg";
import windowClose from "../assets/window-close.svg";
import logo from "../assets/logo.svg";
import "../css/TitleBar.css";

export default function TitleBar() {
  return (
    <div data-tauri-drag-region class="titlebar">
      <div class="titlebar-icon">
        <img src={logo} alt="minimize" />
      </div>
      <div data-tauri-drag-region class="bar" id="bar" />
      <div class="titlebar-buttons">
        <div
          class="titlebar-button"
          id="titlebar-minimize"
          onClick={() => {
            appWindow.minimize().catch(() => {});
          }}
        >
          <img src={windowMin} alt="minimize" />
        </div>

        <div
          class="titlebar-button"
          id="titlebar-maximize"
          onClick={() => {
            appWindow.toggleMaximize().catch(() => {});
          }}
        >
          <img src={windowMax} alt="maximize" />
        </div>

        <div
          class="titlebar-button"
          id="titlebar-close"
          onClick={() => {
            appWindow.close().catch(() => {});
          }}
        >
          <img src={windowClose} alt="close" />
        </div>
      </div>
    </div>
  );
}
