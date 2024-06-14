/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import App from "./App";
import Spells from "./routes/Spells";
import Spell from "./routes/Spell";
import SpellForm from "./routes/SpellForm";

render(
  () => (
    <Router root={App}>
      <Route path="/" component={() => <h1>Home</h1>} />
      <Route path="/spells" component={Spells} />
      <Route path="/spells/form" component={SpellForm} />
      <Route path="/spells/:id" component={Spell} />
    </Router>
  ),
  document.getElementById("root") as HTMLElement,
);
