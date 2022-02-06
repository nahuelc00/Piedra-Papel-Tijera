function addStyle() {
  const style = document.createElement("style");
  style.innerHTML = `
  .content {
    display: grid;
    justify-content: center;
    padding: 60px 26px 0 26px;
    gap:30px;
    height:100vh;
  }
  @media (min-width: 330px) {
    .content {
      padding: 80px 26px 0 26px;
    }
  }
  
  .content__title-button {
    max-width: 336px;
  }
  
  .content__cont-title {
    margin: 0 0 74px 0;
  }
  
  .content__button {
    height: 87px;
  }
  
  .content__title {
    font-family: "Zilla Slab", sanf-serif;
    font-size: 65px;
    width: 100%;
    margin: 0;
    color: #009048;
    line-height: 70px;
  }
  @media (min-width: 330px) {
    .content__title {
      font-size: 80px;
    }
  }
  
  span {
    opacity: 50%;
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
  }`;
  return style;
}

export function initPageWelcome(params: any) {
  const contentEl: HTMLElement = document.createElement("main");

  contentEl.classList.add("content");

  contentEl.innerHTML = `
        <div class="content__title-button">

          <div class="content__cont-title">
          <h1 class="content__title">Piedra Papel <span>ó</span> Tijera</h1>
          </div>
          <div class="content__button">
            <button-custom class="button-custom">Empezar</button-custom>
          </div>

        </div>

        <div class="content__cont-hands">
          <div class="content__hands">

            <div class="content__hand">
                <hand-custom image="piedra"></hand-custom>
            </div>
            <div class="content__hand content__hand--papel">
                <hand-custom image="papel"></hand-custom>
            </div>
            <div class="content__hand">
                <hand-custom image="tijera"></hand-custom> 
            </div>

          </div>
        </div>
      `;

  contentEl.appendChild(addStyle());

  contentEl.querySelector("button-custom").addEventListener("click-btn-custom", (e) => {
    params.goTo("/instructions");
  });
  return contentEl;
}
