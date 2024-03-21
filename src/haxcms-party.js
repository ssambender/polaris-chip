import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";


export class haxcmsParty extends LitElement {

  static get tag() {
    return 'haxcms-party';
  }

  constructor() {
    super();
    this.users = "";
  }

  static get styles() {
    return css`
      :host #partyui-wrapper {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;

        pointer-events: none;
        color: var(--ddd-theme-default-keystoneYellow);
      }

      #partyui-modal {
        background-color: darkblue;
        width: 50vw;
        pointer-events: all;
        box-sizing: border-box;
        padding: 20px;
      }

      #partyui-searchSec {
        background-color: red;
        width: 100%;
        height: 25%;
        position: relative;
        margin-bottom: 30px;
      }

      #close-partyui {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-weight: bold;
      }

      #partyui-users-scroll {
        overflow-y: scroll;
        display: flex;
        overflow: auto;
        white-space: nowrap;
      }

      .partyui-user-container {
        background-color: pink;
        color: black;
        margin-right: 40px;
        display: flex;
        flex-direction: column;
        padding-bottom: 16px;
      }
      .partyui-user-container rpg-character {
        background-color: green;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .partyui-user-container button {
        margin-top: 8px;
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
    <div id="partyui-wrapper">
      <div id="partyui-modal">
        <div id="partyui-searchSec">
            <div>
              Add User:
            </div>
            <div>
              <input type='text' placeholder='Type username here'>
              <button>ADD!</buttoN>
            </div>
            <a id="close-partyui">
            ✖
            </a>
        </div>

        <div>
          Currently Added Users:
        </div>
        <slot>
          ${this.users}
        </slot>
        <div id="partyui-users-scroll">
        
          <div class="partyui-user-container">
            <rpg-character seed="svb6127"></rpg-character>
            <div>USER NAME</div>
            <button>Change Permissions</button>
            <button>Remove User</button>
          </div>
          <div class="partyui-user-container">
            <div class="partyui-user-avatar">:)</div>
            <span>USER NAME</span>
            <button>Change Permissions</button>
            <button>Remove User</button>
          </div>
          <div class="partyui-user-container">
            <div class="partyui-user-avatar">:)</div>
            <span>USER NAME</span>
            <button>Change Permissions</button>
            <button>Remove User</button>
          </div>
          <div class="partyui-user-container">
            <div class="partyui-user-avatar">:)</div>
            <span>USER NAME</span>
            <button>Change Permissions</button>
            <button>Remove User</button>
          </div>
          <div class="partyui-user-container">
            <div class="partyui-user-avatar">:)</div>
            <span>USER NAME</span>
            <button>Change Permissions</button>
            <button>Remove User</button>
          </div>
          <div class="partyui-user-container">
            <div class="partyui-user-avatar">:)</div>
            <span>USER NAME</span>
            <button>Change Permissions</button>
            <button>Remove User</button>
          </div>
          <div class="partyui-user-container">
            <div class="partyui-user-avatar">:)</div>
            <span>USER NAME</span>
            <button>Change Permissions</button>
            <button>Remove User</button>
          </div>

        </div>

      </div>
    </div>`;
  }

  static get properties() {
    return {
      users: { type: String, reflect: true},
    };
  }
}

globalThis.customElements.define(haxcmsParty.tag, haxcmsParty);