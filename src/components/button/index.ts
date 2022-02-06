export class ButtonCustomComp extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  text: string;

  constructor() {
    super();
    this.text = this.textContent || "body";
    this.render();
  }

  render() {
    const styleEl = document.createElement("style");
    this.shadow.innerHTML = `<button>${this.text}</button>`;

    styleEl.innerHTML = `
    button{
        font-family: Odibee Sans, sans-serif;
        color: white;
        font-size: 45px;
        width: 100%;
        font-weight: 400;
        /*height: 87px;*/
        height: 100%;
        background-color: #006cfc;
        border-style: none;
        border: 10px solid #001997;
        border-radius: 10px;
    }`;

    this.shadow.querySelector("button").addEventListener("click", () => {
      const customEvent = new CustomEvent("click-btn-custom", {
        detail: {},
      });
      this.dispatchEvent(customEvent);
    });

    this.shadow.appendChild(styleEl);
  }
}

customElements.define("button-custom", ButtonCustomComp);
