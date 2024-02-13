import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

/**
 * Title
 * Image
 * Body text
 * Button text
 * Button link
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "Player Name";
    this.img = "https://1000logos.net/wp-content/uploads/2018/06/Vegas-Golden-Knights-Logo.png";
    this.bodyText = "Overview text of player, including some heighlights and age and other info.";
    this.btnText = "UR TEAM SUCKS";
    this.btnLink = "https://yourteamjustsucks.com/";
    this.altText = "No Alt Text";
    this.memeTop = "Top text";
    this.memeBottom = "Bottom text";
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }

      div {
        width: 400px;
        min-height: 600px;
        background-color: var(--background-color);
        color: var(--font-color);
        box-sizing: border-box;
        padding: 16px;
        margin: 32px 16px;
        border-radius: 6px;
        box-shadow: 8px 8px black;
        border: solid 2px black;
        position: relative;
      }

      :host([fancy]) {
        color: purple;
      }
      :host([fancy]) div {
        color: purple;
      }

      :host([fancy]) div {
        filter: grayscale(1);
        background-color: #494949;
        color: #fff;
      }

      .change-color {
        background-color: #ffffff;
        color: #000;
      }

      meme-maker {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 3px;
        border: solid 2px black;
        box-sizing: border-box;
        background-color: black;
      }

      h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 0;
        margin-bottom: 6px;
      }

      h3 {
        margin: 12px 0;
        font-weight: 400;
      }

      button {
        background: #fff;
        border-radius: 100px;
        padding: 6px 12px;
        font-weight: bold;
        border: solid 2px black;
        box-sizing: border-box;
        box-shadow: 4px 4px black;
        transition: all .3s;
        color: #000;
        position: absolute;
        bottom: 12px;
      }
      button:hover {
        cursor: pointer;
        background: #000;
        color: #fff;
        transition: all .3s;
      }

      :host([fancy]) button {
        background: gray;
      }

      details {
        user-select: none;
      }

      details[open] summary {
        font-weight: bold;
      }

      details > summary {
          list-style-type: "[ + ]";
      }

      details[open] > summary {
        list-style-type: "[ - ]";
      }

      details summary {
        font-weight: bold;
        cursor: pointer;
      }
    `;
  }

openChanged(e) {
  console.log(e.newState);
  if (e.newState === "open") {
    this.fancy = true;
  }
  else {
    this.fancy = false;
  }
}

  render() {
    return html`
    <div>
      <h1>${this.title}</h1>
      <meme-maker alt="${this.altText}" image-url="${this.img}" top-text="${this.memeTop}" bottom-text="${this.memeBottom}"></meme-maker>
      <details ?open="${this.fancy}" @toggle="${this.openChanged}">
        <summary> ${this.fancy ? "READ LESS" : "READ MORE"} </summary>
        <slot>
          ${this.bodyText}
        </slot>
      </details>
      <a href=${this.btnLink} target="_blank"><button>${this.btnText}</button></a>
    </div>`;
  }

  static get properties() {
    return {
      title: { type: String },
      img: { type: String },
      bodyText: { type: String },
      btnText: { type: String },
      btnLink: { type: String },
      fancy: { type: Boolean, reflect: true},
      altText: { type: String },
      memeTop: { type: String },
      memeBottom: { type: String },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
