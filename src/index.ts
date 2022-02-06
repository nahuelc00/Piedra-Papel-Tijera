import {} from "./components/button";
import {} from "./components/hands";
import { state } from "./state";
import { initRouter } from "./router";

(function main() {
  //Sin el IF, se realiza un setState de "null"
  if (localStorage.getItem("data")) {
    state.setState(JSON.parse(localStorage.getItem("data")));
  }

  const rootEl = document.querySelector("#root");
  initRouter(rootEl);
})();
