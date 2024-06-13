/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Route, Router } from "@solidjs/router";
import Spells from "./routes/Spells";

render(
  () => (
    <Router root={App}>
      <Route path="/" component={() => <h1>Home</h1>} />
      <Route path="/spells" component={Spells} />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
