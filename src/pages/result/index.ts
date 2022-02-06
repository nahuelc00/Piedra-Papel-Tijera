import { state } from "../../state";
const imageStarGreen = require("url:../../images/star-green.png");
const imageStarRed = require("url:../../images/star-red.png");

export function initPageResult(params: any) {
  function addStyle() {
    const styleEl = document.createElement("style");

    styleEl.innerHTML = `
    .cont-whoWin {
      display: grid;
      justify-content: center;
      background-color: rgba(137, 73, 73, 0.6);
      height: 100%;
      padding: 0 20px;
    }
    @media (min-height: 620px) {
      .cont-whoWin {
        height:100vh;
      }
    }
    
    .cont-whoWin--green {
      background-color: rgba(136, 137, 73, 0.6);
    }
    
    .cont-whoWin__star {
      height: 260px;
      position: relative;
      margin: 36px auto 11px auto;
    }
    
    .cont-whoWin__text-star {
      font-family: "Odibee Sans", sans-serif;
      letter-spacing: 0.05em;
      font-size: 50px;
      color: white;
      position: absolute;
      top: 37%;
      left: 22.5%;
      margin: 0;
    }
    .cont-whoWin__text-star--empate{
      left:25%;
    }
    
    .cont-whoWin__score {
      border: 10px solid #000000;
      background-color: white;
      width: 259px;
      border-radius: 10px;
      margin: 0 auto 21px auto;
      font-family: "Odibee Sans", sans-serif;
      height: 217px;
    }
    
    .cont-whoWin__text-score,
    .cont-whoWin__text-score,
    .cont-whoWin__text-computer {
      font-family: "Odibee Sans", sans-serif;
      font-weight: 400;
    }
    
    .cont-whoWin__text-score {
      font-size: 55px;
      margin: 0 0 13px 0;
      text-align: center;
    }
    .cont-whoWin__text-user,
    .cont-whoWin__text-computer {
      margin: 0 20px 0 0;
      font-size: 45px;
      text-align: right;
    }
    
    .cont-whoWin__cont-button {
      height: 87px;
      margin: 0 0 35px 0;
      max-width: 335px;
    }
    @media (min-width: 330px) {
      .cont-whoWin__cont-button {
        max-width: 100%;
        width: 335px;
      }
    }`;

    return styleEl;
  }

  function validateStar(page: HTMLElement) {
    let flagImage: string = "";
    let flagTitle: string = "";

    if (location.pathname.includes("perdiste")) {
      flagImage = imageStarRed;
      flagTitle = "Perdiste";
    } else if (location.pathname.includes("ganaste")) {
      flagImage = imageStarGreen;
      flagTitle = "Ganaste";
      page.classList.add("cont-whoWin--green");
    } else {
      flagImage = imageStarGreen;
      flagTitle = "Empate";
      page.classList.add("cont-whoWin--green");
    }

    return {
      image: flagImage,
      title: flagTitle,
    };
  }

  function render() {
    const history = state.getState().history;
    const page: HTMLElement = document.createElement("main");
    page.classList.add("cont-whoWin");

    const star = validateStar(page);

    page.innerHTML = `   
    <div class="cont-whoWin__star">
        <p class="cont-whoWin__text-star">${star.title}</p>
        <img src="${star.image}" alt="" />
    </div>
    <div class="cont-whoWin__score">
        <p class="cont-whoWin__text-score">Score</p>
        <p class="cont-whoWin__text-user">Vos: ${history.user}</p>
        <p class="cont-whoWin__text-computer">Máquina: ${history.computer}</p>
    </div>
    <div class="cont-whoWin__cont-button">
        <button-custom class="cont-whoWin__button">Volver a jugar</button-custom>
    </div>
`;

    if (star.title == "Empate") {
      page
        .querySelector(".cont-whoWin__text-star")
        .classList.add("cont-whoWin__text-star--empate");
    }

    page
      .querySelector(".cont-whoWin__button")
      .addEventListener("click-btn-custom", () => {
        params.goTo("/instructions");
      });

    page.appendChild(addStyle());

    return page;
  }
  return render();
}
