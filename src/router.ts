import { initPageInstructions } from "./pages/instructions";
import { initPageWelcome } from "./pages/welcome";
import { initPagePlay } from "./pages/play";
import { initPageResult } from "./pages/result";

const BASE_PATH = "/Piedra-Papel-Tijera";
const routes = [
  {
    path: /\/welcome/,
    handler: initPageWelcome,
  },
  {
    path: /\/instructions/,
    handler: initPageInstructions,
  },
  {
    path: /\/play/,
    handler: initPagePlay,
  },
  {
    path: /\/result\/./,
    handler: initPageResult,
  },
];

function isGithubPages() {
  return location.host.includes("github.io");
}

export function initRouter(containerEl: Element) {
  function goTo(route: string) {
    const completePath = isGithubPages() ? BASE_PATH + route : route;

    history.pushState({}, "", completePath);
    handlerRoute(completePath);
  }

  function handlerRoute(route: string) {
    const newRoute = isGithubPages() ? route.replace(BASE_PATH, "") : route;

    routes.forEach((r) => {
      if (r.path.test(newRoute)) {
        const page = r.handler({ goTo: goTo });
        containerEl.firstChild?.remove();
        containerEl.appendChild(page);
      }
    });
  }

  if (window.location.pathname == "/Piedra-Papel-Tijera/") {
    goTo("/welcome");
  } else {
    handlerRoute(window.location.pathname);
  }
}
