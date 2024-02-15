import { LitElement, html, css } from 'lit';

/**
 * current Number
 * min number
 * max number
 * suit
 */

export class Counter extends LitElement {

  static get tag() {
    return 'counter-app';
  }

  constructor() {
    super();
    this.counter = 5;
    this.min = 1;
    this.max = 10;
    this.prevSuit = null;
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
        margin: 40px 40px;
      }
      :host([counter="18"]) .counterNum {
        color: #e7a23b !important;
      }
      :host([counter="21"]) .counterNum {
        color: #1a6b91 !important;
      }

      .counterWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .buttonContainer {
        display: flex;
        padding-top: 30px;
        justify-content: space-around;
        width: 50%;
      }

      .card {
        background-color: white;
        width: 400px;
        min-height: 600px;
        margin: 0 20px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 200px;
        border-radius: 20px;
        box-shadow: 10px 10px 20px rgba(0,0,0,0.5);
        z-index: 2;
        overflow: hidden;
      }

      button {
        border: solid 3px white;
        border-radius: 10px;
        background: none;
        color: white;
        height: 48px;
        width: 48px;
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 70%;
        transition: opacity .3s;
      }
      button:hover {
        cursor: pointer;
        opacity: 100%;
        transition: opacity .2s;
      }
      button[disabled] {
        opacity: 10%;
      }
      button:active {
        background: black;
      }

      .counterNum {
        font-size: 64px;
        font-weight: bold;
        position: absolute;

        bottom: 20px;
        right: 40px;
      }
      .counterNum:first-child {
        top: 20px;
        left: 40px;
      }
    `;
  }

// ♠ ♥ ♦ ♣

render() {
    const currentSuit = this.suitSymbol();
    const suitColor = (currentSuit === '♠' || currentSuit === '♣') ? 'black' : 'red';
    const counterNumColor = (this.counter === this.min || this.counter === this.max) ? 'gray' : suitColor;

    return html`
    <div class="counterWrapper">
        <confetti-container id="confetti">
            <div class="card" style="color: ${suitColor}">
                <div class="counterNum" style="color: ${counterNumColor}">${this.counter}</div>
                ${currentSuit}
                <div class="counterNum" style="color: ${counterNumColor}">${this.counter}</div>
            </div>
        </confetti-container>
        <div class="buttonContainer">
            <button title="Counter DOWN" @click="${this.counterNumDown}" ?disabled="${this.counter === this.min}">◄</button>
            <button title="Counter UP" @click="${this.counterNumUp}" ?disabled="${this.counter === this.max}">►</button>
        </div>
    </div>`;
}


  static get properties() {
    return {
      counter: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true },
    };
  }


  suitSymbol() {
    return this.randomSuit();
  }

  randomSuit() {
    const suits = ['♠', '♥', '♦', '♣'];
    let currentSuit = this.prevSuit;
    while (currentSuit === this.prevSuit) {
        currentSuit = suits[Math.floor(Math.random() * suits.length)];
    }
    this.prevSuit = currentSuit;
    return currentSuit;
  }

  cardColor() {
    const suit = this.randomSuit();
    return (suit === '♠' || suit === '♣') ? 'black' : 'red';
  }

  cardChanged() {
    if (this.counter === 21) {
        this.makeItRain();
      }
    //todo - mayeb add card flip
  }

  counterNumUp() {
    if (this.counter < this.max) {
      this.counter++;
      this.requestUpdate('counter');
      //console.log("numberUp");

      this.cardChanged();
    }
  }

  counterNumDown() {
    if (this.counter > this.min) {
      this.counter--;
      this.requestUpdate('counter');
      //console.log("numberDown");

      this.cardChanged();
    }
  }
  
  makeItRain() {
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }


}



globalThis.customElements.define(Counter.tag, Counter);
