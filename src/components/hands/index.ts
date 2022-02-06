const imageTijera = require("url:../../images/tijera.png");
const imagePapel = require("url:../../images/papel.png");
const imagePiedra = require("url:../../images/piedra.png");

export class HandsCustomComp extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  typeImage: string;

  constructor() {
    super();
    this.typeImage = this.getAttribute("image") || "body";
    this.render();
  }

  render() {
    const imgEl: HTMLImageElement = document.createElement("img");
    const styleEl = document.createElement("style");

    if (this.typeImage == "piedra") {
      imgEl.src = imagePiedra;
      imgEl.setAttribute("alt", "piedra");
    } else if (this.typeImage == "papel") {
      imgEl.src = imagePapel;
      imgEl.setAttribute("alt", "papel");
    } else if (this.typeImage == "tijera") {
      imgEl.src = imageTijera;
      imgEl.setAttribute("alt", "tijera");
    }

    styleEl.innerHTML = `
    img{
        width:100%; 
      } `;

    imgEl.addEventListener("click", () => {
      const customEvent = new CustomEvent("listen-click-hand", {
        detail: {},
      });
      this.dispatchEvent(customEvent);
    });

    this.shadow.appendChild(imgEl);
    this.shadow.appendChild(styleEl);
  }
}

customElements.define("hand-custom", HandsCustomComp);
