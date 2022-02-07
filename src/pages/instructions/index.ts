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
  @media (min-height: 550px) {
    .content {
      padding: 130px 26px 0 26px;
    }
  }

  
  .content__title-button {
    max-width: 336px;
  }
  @media (min-width: 420px) {
    .content__title-button {
      max-width: 100%;
    }
  }
  
  .content__cont-title {
    margin: 0 0 45px 0;
  }
  
  .content__title {
    font-size: 30px;
    line-height: 40px;
    text-align: center;
    margin: 0;
    font-family: 'Zilla Slab', sanf-serif;
  }
  @media (min-width: 330px) {
    .content__title {
      font-size: 40px;
    }
  }
  @media (min-width: 420px) {
    .content__title {
      width: 313px;
      margin: 0 auto;
    }
  }
  
  .content__button {
    height: 87px;
  }
  @media (min-width: 420px) {
    .content__button {
      width: 404px;
    }
  }
  
  .content__cont-hands {
    display: flex;
    justify-content: center;
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

  .content__hand{
    width:75px;
  }
  .content__hand--papel {
    width:92px;
  }
  @media (min-width: 480px) {
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

export function initPageInstructions(params: any) {
  const contentEl: HTMLElement = document.createElement("main");
  contentEl.classList.add("content");

  contentEl.innerHTML = `
          <div class="content__title-button">
            <div class="content__cont-title">
              <h1 class="content__title">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</h1>
            </div>
            <div class="content__button">
              <button-custom class="button-custom">¡Jugar!</button-custom>
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
          </div>`;

  contentEl.appendChild(addStyle());

  contentEl
    .querySelector("button-custom")
    .addEventListener("click-btn-custom", (e) => {
      params.goTo("/play");
    });
  return contentEl;
}

//
