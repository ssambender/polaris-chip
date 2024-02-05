import { LitElement, html, css } from 'lit';

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
    this.btnText = "Player Stats";
    this.btnLink = "https://yourteamjustsucks.com/";
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
        font-weight: bold;
        position: relative;
      }

      .change-color {
        background-color: #ffffff;
        color: #000;
      }

      img {
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
    `;
  }

  render() {
    return html`
    <div>
      <h1>${this.title}</h1>
      <img src=${this.img}>
      <h3>${this.bodyText}</h3>
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
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);





document.querySelector('#duplicate').addEventListener('click', function(event) {
  const cardList = document.querySelector('.cardContainer');
  const myCardElements = cardList.querySelectorAll('my-card');

  if (myCardElements.length < 10) {
    const lastCard = myCardElements[myCardElements.length - 1];
    const newCard = document.createElement('my-card');
    
    // Copy properties from the last card to the new card
    newCard.title = lastCard.title;
    newCard.img = lastCard.img;
    newCard.bodyText = lastCard.bodyText;
    newCard.btnText = lastCard.btnText;
    newCard.btnLink = lastCard.btnLink;

    cardList.appendChild(newCard);
  }
});

document.querySelector('#changetitle').addEventListener('click', function(e) {
  const firstCard = document.querySelector('.cardContainer my-card');
  if (firstCard) {
    firstCard.title = "Lets Go Knights";
  }
});

document.querySelector('#changeimage').addEventListener('click', function(e) {
  const firstCard = document.querySelector('.cardContainer my-card');
  if (firstCard) {
    firstCard.img = "https://pbs.twimg.com/media/EN9qMNEU8AAkht3.jpg";
  }
});

document.querySelector('#changebg').addEventListener('click', function(e) {
  var cards = document.querySelectorAll('.cardContainer my-card');
  cards.forEach(function(card) {
    card.shadowRoot.querySelector('div').classList.toggle('change-color');
  });
});


document.querySelector('#delete').addEventListener('click', function(e) {
  const cardList = document.querySelector('.cardContainer');
  const myCardElements = cardList.querySelectorAll('my-card');
  if (myCardElements.length > 1) {
    const lastCard = myCardElements[myCardElements.length - 1];
    lastCard.remove();
  }
});
