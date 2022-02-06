import { state } from "../../state";
type Move = "piedra" | "papel" | "tijera";

function addStyle() {
  const style = document.createElement("style");
  style.innerHTML = `
  .content {
    display: grid;
    padding: 115px 26px 0 26px; 
    height:100vh;
    gap:30px;
  }
  
  .content__circle {
    font-family: 'Zilla Slab', sans-serif;
    font-weight: 700;
    border: 23px solid;
    border-top-color: black;
    height: 250px;
    width: 250px;
    border-radius: 50%;
    padding:0 0 25px 0;
    font-size: 115px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:0 auto;
  }
  
  .content__button {
    max-width: 336px;
    margin: 0 0 86px 0;
  }
  
  .content__cont-hands {
    display: flex;
    justify-content: space-around;
    align-items:flex-end;
  }
  
  .content__hands {
    display: flex;
  }
  @media (min-width: 330px) {
    .content__hands {
      gap: 30px;
    }
  }
  
  @media (min-width: 769px) {
    .content__hand {
      width: 90px;
    }
    .content__hand--papel {
      width: 110px;
    }
  }
`;
  return style;
}

function appendHands(content: HTMLElement, computerMove: Move, myMove: Move) {
  content.innerHTML = "";
  const myMoveEl = document.createElement("div");
  const computerMoveEl = document.createElement("div");
  const style = document.createElement("style");

  myMoveEl.classList.add("cont-img-myMove");
  computerMoveEl.classList.add("cont-img-computerMove");

  if (myMove == "papel") {
    myMoveEl.classList.add("papel");
  }
  if (computerMove == "papel") {
    computerMoveEl.classList.add("papel");
  }

  myMoveEl.innerHTML = `<hand-custom class="content__hand-custom" image="${myMove}"></hand-custom> `;
  computerMoveEl.innerHTML = `<hand-custom class="content__hand-custom" image="${computerMove}"></hand-custom> `;

  style.innerHTML = `
    .content{
      display:flex;
      justify-content:center;
    }

    .cont-img-myMove{
      width:150px;
      position: fixed;
      bottom: 0;
    }
    .cont-img-computerMove{
      width:150px;
      transform:rotate(-180deg);
    }

    .papel{
      width:180px
    }
  `;

  content.appendChild(computerMoveEl);
  content.appendChild(myMoveEl);
  content.appendChild(style);
}

function redirect(whoWin: number, goTo) {
  if (whoWin == 1) {
    goTo("/result/ganaste");
  } else if (whoWin == 0) {
    goTo("/result/perdiste");
  } else {
    goTo("/result/empate");
  }
}

function setMove(myMove: Move) {
  const numRandom = Math.floor(Math.random() * (4 - 1) + 1);
  let computerMove: Move;

  if (numRandom == 1) {
    computerMove = "piedra";
    state.setMove(myMove, computerMove);
    return {
      myMove: myMove,
      computerMove: computerMove,
    };
  }
  if (numRandom == 2) {
    computerMove = "papel";
    state.setMove(myMove, computerMove);
    return {
      myMove: myMove,
      computerMove: computerMove,
    };
  }
  if (numRandom == 3) {
    computerMove = "tijera";
    state.setMove(myMove, computerMove);
    return {
      myMove: myMove,
      computerMove: computerMove,
    };
  }
}

function removeHandsAndSetCircleOpacity(
  handsCustomEls: NodeList,
  contentEl: HTMLElement,
  myMove: Move
) {
  handsCustomEls.forEach((handEl: any) => {
    const attribute = handEl.getAttribute("image");

    if (attribute != myMove) {
      contentEl.querySelector("." + attribute).remove();
    }

    const circleEl = contentEl.querySelector(".content__circle") as HTMLElement;
    circleEl.style.opacity = "0%";
    circleEl.style.transition = "all 0.5s ease 0s";
  });
}

function listenClickToHand(
  myMove: Move,
  handsCustomEls: NodeList,
  content: HTMLElement,
  goTo
) {
  const moves = setMove(myMove);
  const whoWin = state.whoWin(moves.myMove, moves.computerMove);
  state.pushToHistory(whoWin);

  removeHandsAndSetCircleOpacity(handsCustomEls, content, moves.myMove);

  setTimeout(() => {
    redirect(whoWin, goTo);
  }, 2000);

  setTimeout(() => {
    appendHands(content, moves.computerMove, moves.myMove);
  }, 800);
}

function listenClicks(handsCustomEls: NodeList, contentEl: HTMLElement, goTo) {
  const circleEl = contentEl.querySelector(".content__circle");

  let counter = 3;
  const intervalId = setInterval(() => {
    counter--;
    if (counter == 0) {
      clearInterval(intervalId);
      goTo("/instructions");
    }
    circleEl.textContent = counter.toString();
  }, 1000);

  handsCustomEls.forEach((handEl: any) => {
    handEl.addEventListener("listen-click-hand", (e: any) => {
      clearInterval(intervalId);

      //TIJERA;
      if (handEl.getAttribute("image") == "tijera") {
        listenClickToHand("tijera", handsCustomEls, contentEl, goTo);
      }
      //PIEDRA;
      if (handEl.getAttribute("image") == "piedra") {
        listenClickToHand("piedra", handsCustomEls, contentEl, goTo);
      }
      //PAPEL;
      if (handEl.getAttribute("image") == "papel") {
        listenClickToHand("papel", handsCustomEls, contentEl, goTo);
      }
    });
  });
}

export function initPagePlay(params: any) {
  const contentEl = document.createElement("main");

  contentEl.classList.add("content");

  contentEl.innerHTML = `
          <div class="content__circle">3</div>

          <div class="content__cont-hands">
            <div class="content__hands">
                <div class="content__hand">
                  <hand-custom class="content__hand-custom piedra" image="piedra"></hand-custom>
                </div>
                <div class="content__hand content__hand--papel">
                  <hand-custom class="content__hand-custom papel" image="papel"></hand-custom>
                </div>
                <div class="content__hand">
                  <hand-custom class="content__hand-custom tijera" image="tijera"></hand-custom>
                </div>
            </div>
        </div>`;

  const handsCustomEls = contentEl.querySelectorAll(".content__hand-custom");

  listenClicks(handsCustomEls, contentEl, params.goTo);
  contentEl.appendChild(addStyle());

  return contentEl;
}
