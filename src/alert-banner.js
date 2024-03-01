import { LitElement, html, css } from 'lit';


export class AlertBanner extends LitElement {

  static get tag() {
    return 'alert-banner';
  }

  //notice (blue), warning (yellow), alert (red)

  constructor() {
    super();
    this.sticky = false;
    this.opened = true;
    this.urgency = "notice";
    this.message = "SOMETHING IS GOING ON READ THIS FIRST WHILE YOU ARE HERE";
    this.date = "";
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        width: 100%;
        --min-banner-height: 20vh;
        min-height: var(--min-banner-height);
        --color-one: #4102fd;
        --color-two: #8e32da;
        --zindex-priority: 900;
        --display-mode: unset;
        --display-mode-opposite: none;
        overflow: hidden;
      }
      :host([sticky]) {
        position: sticky;
        top: 0;
        z-index: 999;
      }
      :host([urgency="notice"]) {
        --color-one: #CFECEB;
        --color-two: #FFFFFF;
        --zindex-priority: 901;
      }
      :host([urgency="warning"]) {
        --color-one: #e9af11;
        --color-two: #FAC230;
        --zindex-priority: 902;
      }
      :host([urgency="alert"]) {
        --color-one: #c0250d;
        --color-two: #ff4740;
        color: white;
        --z-index-priority: 903;
      }
      :host([urgency="alert"]) svg {
        fill: white;
      }

      .alertContainer {
        background-color: var(--color-one);
        z-index: var(--z-index-priority);
      } 
      
      .centerDiv {
        background-color: var(--color-two);
        width: 50%;
        height: 100%;
        transform: skew(20deg);
        display: var(--display-mode)
      }

      :host .centerDiv:before {
        border-bottom: 25px solid var(--color-two);
      } 
      
      .alertContainer {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .centerDiv:before {
        content: " ";
        width: 0;
        height: 0;
        position: absolute;
        bottom: 2rem;
        left: -2rem;
        border-left: 35px solid transparent;
        border-right: 0px solid transparent;
      }

      .centerDivNormal {
        transform: skew(-20deg);
        font-weight: bold;
        display: flex;
        position: relative;
        height: 100%;
      }
      .centerDivText {
        padding: 32px 72px;
        font-size: 1.1rem;
        line-height: 1.2rem;
        font-style: italic;
        width: 100%;
      }
      .centerDivText a {
        color: initial;
      }

      .exclamation {
        z-index: 1000;
        position: absolute;
        top: 24px;
        left: 8px;
      }

      .alertSideText {
        font-weight: bold;
        color: white;
        width: 150px;
        text-transform: uppercase;
        font-size: 1.1rem;
        margin: 0 32px;
        display: var(--display-mode);
      }
      :host([urgency="notice"]) .alertSideText, :host([urgency="notice"]) .openText {
        color: black;
      } 

      .closeSideText:focus, .openText:focus {
        color: red;
      }

      .closeSideText:hover, .openText:hover {
        cursor: pointer;
        text-decoration: underline;
      }

      .openTextContainer {
        font-weight: bold;
        font-style: italic;
        font-size: 1.1rem;
        display: var(--display-mode-opposite);
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        color: white;
      }

      .openTextContainer button {
        display: var(--display-mode-opposite);
      }

      .openTextContainer button, #closeClassText button {
        background: none;
        font-weight: bold;
        font-style: italic;
        font-size: 1.1rem;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        color: white;
        border: none;
        cursor: pointer;
      }

      @media all and (orientation: portrait) {
        .alertContainer {
          max-height: 200px;
        }
      }
    `;
  }

firstUpdated() {
    var stickyAttributeElemnts = document.querySelectorAll('alert-banner[sticky]');
    
    // move alerts in the body after the fact so it is more expandable and all tags can be consolidated without having
    // to worry ab position:sticky starting at current spot instead of the top 
    stickyAttributeElemnts.forEach(function(element) {
        // remove any div/element that has sticky attribute
      element.parentNode.removeChild(element);
      
      // insert that on body, putting it at top as position:sticky and not needing to be fixed 
      // removing firstborn child - rumpelstiltskin :O
      document.body.insertBefore(element, document.body.firstChild);
    });

    const slotElement = this.shadowRoot.querySelector('#messageSlot');

    slotElement.innerHTML = this.message;

    if (localStorage.getItem("alertOpen") == "false") {
      console.log("local storage : false");
      this.closeBanner();
    }
}


render() {
    return html`
    <div class="alertContainer">
        
        <div class="openTextContainer">
            <span class="openText"><button id="openClassText" @click="${this.openBanner}">OPEN CAMPUS ALERT!</button></span>
        </div>

        <div class="alertSideText">
            ${this.date}
        </div>
        <div class="centerDiv">
            <div class="centerDivNormal">
                <div class="exclamation">
                <svg fill="#000000" height="38px" width="38px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.963 27.963" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="c129_exclamation"> <path d="M13.983,0C6.261,0,0.001,6.259,0.001,13.979c0,7.724,6.26,13.984,13.982,13.984s13.98-6.261,13.98-13.984 C27.963,6.259,21.705,0,13.983,0z M13.983,26.531c-6.933,0-12.55-5.62-12.55-12.553c0-6.93,5.617-12.548,12.55-12.548 c6.931,0,12.549,5.618,12.549,12.548C26.531,20.911,20.913,26.531,13.983,26.531z"></path> <polygon points="15.579,17.158 16.191,4.579 11.804,4.579 12.414,17.158 "></polygon> <path d="M13.998,18.546c-1.471,0-2.5,1.029-2.5,2.526c0,1.443,0.999,2.528,2.444,2.528h0.056c1.499,0,2.469-1.085,2.469-2.528 C16.441,19.575,15.468,18.546,13.998,18.546z"></path> </g> <g id="Capa_1_207_"> </g> </g> </g></svg>
                </div>
                <div class="centerDivText" id="messageSlot">
                    <slot>
                        ${this.message}
                    </slot>
                </div>
            </div>
        </div>
        <span id="closeClassText" class="alertSideText closeSideText">
            <button id="closeBannerButton" @click="${this.closeBanner}">✕ Close</button>
        </span>
    </div>`;
}

closeBanner() {
    this.opened = false;
    console.log("closed");
    this.style.setProperty('--display-mode', 'none');
    this.style.setProperty('--min-banner-height', '6vh');
    this.style.setProperty('--display-mode-opposite', 'flex');

    console.log("local storage set to false");
    localStorage.setItem("alertOpen", "false");

    // get openClassText element.focus()
    this.shadowRoot.querySelector('#openClassText').focus();
}

openBanner() {
    this.opened = true;
    console.log("opened");
    this.style.setProperty('--display-mode', 'unset');
    this.style.setProperty('--min-banner-height', '20vh');
    this.style.setProperty('--display-mode-opposite', 'none');

    console.log("local storage set to true");
    localStorage.setItem("alertOpen", "true");

    // get closeClassText element.focus()
    this.shadowRoot.querySelector('#closeBannerButton').focus();
}

  static get properties() {
    return {
      sticky: { type: Boolean, reflect: true },
      opened: { type: Boolean, reflect: true },
      urgency: { type: String, reflect: true },
      message: { type: String },
      date: { type: String },
    };
  }
  

}



globalThis.customElements.define(AlertBanner.tag, AlertBanner);