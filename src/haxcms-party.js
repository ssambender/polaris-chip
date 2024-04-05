import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

var start2p = document.createElement('link');
start2p.setAttribute('rel', 'stylesheet');
start2p.setAttribute('type', 'text/css');
start2p.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
document.head.appendChild(start2p);

export class haxcmsParty extends LitElement {

  static get tag() {
    return 'haxcms-party';
  }

  constructor() {
    super();
    this.users = "";
    this.usersArray = [];
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
        font-family: "Press Start 2P", sans-serif;

        pointer-events: none;
        color: var(--ddd-theme-default-coalyGray);
      }

      #partyui-modal {
        background-color: var(--ddd-theme-default-skyBlue);
        width: 50vw;
        pointer-events: all;
        box-sizing: border-box;
        padding: 20px;
        border: var(--ddd-border-sm);
        box-shadow: var(--ddd-boxShadow-sm);
      }
      @media all and (orientation: portrait) {
        #partyui-modal {
          width: 90vw;
        }
        #usernameInput {
          width: 70%;
        }
      }

      #partyui-searchSec {
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
        overflow-x: scroll;
        display: flex;
        white-space: nowrap;
      }
      /* https://sambender.net/projects/scrollbar.html */
      #partyui-users-scroll::-webkit-scrollbar {
          width: 16px;
      }
      #partyui-users-scroll::-webkit-scrollbar-track {
          background: #019cde;
      }
      #partyui-users-scroll::-webkit-scrollbar-track:hover {
          background: #019cde;
      }
      #partyui-users-scroll::-webkit-scrollbar-thumb {
          background-color: #1276b5;
          border-radius: 0pxpx;
          border: 0px solid #ffffff;
      }
      #partyui-users-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #0d659b;
          border: 0px solid #222222;
      }

      #usernameInput {
        font-family: inherit;
        padding: 8px;
        text-transform: lowercase;
      }

      .partyui-user-container {
        color: black;
        margin-right: 40px;
        display: flex;
        flex-direction: column;
        padding-bottom: 16px;
      }
      .partyui-user-container rpg-character {
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .partyui-user-container button {
        margin-top: 8px;
      }
      .partyui-user-container span {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .searchBarAndBtn {
        display: flex;
        align-items: center;
        margin: 8px 0;
      }
      .searchBarAndBtn input {
        padding: 4px;
        height: 100%;
        box-sizing: border-box;
        border: none;
        color: inherit
      }

      #addUserButton, #saveUsers {
        background: var(--ddd-theme-default-skyLight);
        border: none;
        padding: 8px;
        margin-left: 8px;
        height: 100%;
        box-sizing: border-box;
        cursor: pointer;
        font-weight: bold;
        color: inherit;
        font-family: inherit;
      }
      #addUserButton:hover, #saveUsers:hover {
        background: var(--ddd-theme-default-skyMaxLight);
        color: var(--ddd-theme-default-skyBlue);
      }

      #saveUsers {
        margin-top: 32px;
      }
      
      .disabledButton {
        opacity: 20%;
        pointer-events: none;
        user-select: none;
      }

      #usernameInputHint {
        color: #e40000;
        font-size: 0.5em;
        visibility: hidden;
      }

      .newestUser {
        animation: fadeIn 1s;
      }
      @keyframes fadeIn {
      0% {
        opacity: 0;
        filter: brightness(5) contrast(50%);
      }
      100% {
        opacity: 1;
        filter: brightness(1) contrast(100%);
      }
    }
    `;
  }


  checkIfUsers() {
    if(this.usersArray.length > 0) {
      // there are users added in party
      this.shadowRoot.querySelector('#currentlyAddedLabel').style.display = 'flex';
      this.shadowRoot.querySelector('#nobodyHere').style.display = 'none';
      this.shadowRoot.querySelector('#saveUsers').classList.remove('disabledButton');

    }
    else {
      this.shadowRoot.querySelector('#currentlyAddedLabel').style.display = 'none';
      this.shadowRoot.querySelector('#nobodyHere').style.display = 'flex';
      this.shadowRoot.querySelector('#saveUsers').classList.add('disabledButton');
    }
  }

  addUser() {
    let nameValue = this.shadowRoot.querySelector('#usernameInput').value;
    nameValue = nameValue.toLowerCase();
  
    if (nameValue !== "") {
      // if nameValue contains any symbols, alert "cant contain symbols"
      let regex = /^[a-zA-Z0-9\s]+$/;
      if (regex.test(nameValue) == false) {
        alert("username can only contain alphanumeric characters");
      }
      else {
        // if user not already added
        nameValue = nameValue.replace(/\s/g, "");
        if(this.usersArray.includes(nameValue)) {
          alert("already in party");
        }
        else {
          console.log('Adding ' + nameValue + ' to the party!!');
          this.usersArray.push(nameValue);
          let newUserHTML = `<haxcms-party-member class="newestUser" username="${nameValue}"></haxcms-party-member>`;
          
          // Remove .newestUser class from any existing elements
          let existingNewestUser = this.shadowRoot.querySelector('#partyui-users-scroll .newestUser');
          if (existingNewestUser) {
            existingNewestUser.classList.remove('newestUser');
          }
          
          // Add the new haxcms-party-member with .newestUser class to the top
          this.shadowRoot.querySelector('#partyui-users-scroll').insertAdjacentHTML('afterbegin', newUserHTML);
          
          this.shadowRoot.querySelector('#usernameInput').value = "";
        }
      }
      this.checkIfUsers();
    }
    else {
        this.shadowRoot.querySelector('#usernameInputHint').style.color = "#e40000";
        this.shadowRoot.querySelector('#usernameInputHint').style.visibility = "visible";
        this.shadowRoot.querySelector('#usernameInputHint').innerHTML = "Username can't be empty";
    }
  }
  
  removeUser(user) {
    // remove user from usersArray 
    console.log(this.usersArray);
    console.log("remove " + user + " from usersArray");

    console.log("before remove: " + this.usersArray);

    const indexToRemove = this.usersArray.indexOf(user.toString());
    if (indexToRemove !== -1) {
      this.usersArray.splice(indexToRemove, 1);
    }
        

    console.log("after remove: " + this.usersArray);

    // Remove <haxcms-party-member> element from the DOM
    const partyMembers = this.shadowRoot.querySelectorAll('haxcms-party-member');
    partyMembers.forEach(member => {
        if (member.getAttribute('username') === user) {
            member.remove();
        }
    });


    this.checkIfUsers()
  }

  firstUpdated() {
    console.log(this.users.toLowerCase());
    this.usersArray = this.users.split(" ");
    this.usersArray = this.usersArray.filter(n => n);

    this.usersArray = this.usersArray.map(item => item.toLowerCase())

    this.checkIfUsers();

    this.usersArray.forEach((element) => 
    this.shadowRoot.querySelector('#partyui-users-scroll').innerHTML += `<haxcms-party-member username="${element}"></haxcms-party-member>`
    );

    this.shadowRoot.querySelector('#usernameInput').addEventListener('keyup', (e) => {

      // if name includes a symbol
      if (this.shadowRoot.querySelector('#usernameInput').value.match(/[^a-zA-Z0-9\s]/)) {
        this.shadowRoot.querySelector('#usernameInputHint').style.color = "#e40000";
        this.shadowRoot.querySelector('#usernameInputHint').style.visibility = "visible";
        this.shadowRoot.querySelector('#usernameInputHint').innerHTML = "Non-alphanumeric characters not allowed!";
      }
      else if(this.shadowRoot.querySelector('#usernameInput').value.includes(" ")) {
        this.shadowRoot.querySelector('#usernameInputHint').style.color = "#f5db16";
        this.shadowRoot.querySelector('#usernameInputHint').style.visibility = "visible";
        this.shadowRoot.querySelector('#usernameInputHint').innerHTML = "All spaces will be removed";
      }
      else {
        this.shadowRoot.querySelector('#usernameInputHint').style.visibility = "hidden";
        this.shadowRoot.querySelector('#usernameInputHint').innerHTML = "hint";
      }
    });   

    this.shadowRoot.querySelector('#usernameInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addUser();
      }
    });    

    this.shadowRoot.querySelector('#addUserButton').addEventListener('click', (event) => {
      this.addUser();
    });

    this.shadowRoot.querySelector('#saveUsers').addEventListener('click', (event) => {
      // ######################################################################
      // #                                                                    #
      // #                       this.usersArray output                       #
      // #                                                                    #
      // ######################################################################
      alert("success! added ", this.usersArray);
      this.makeItRain();
    });

    this.shadowRoot.addEventListener("user-removed", (event) => {
      this.removeUser(event.detail);
    });

  }

  render() {
    return html`
    <div id="partyui-wrapper">
    <confetti-container id="confetti">
      <div id="partyui-modal">
        <div id="partyui-searchSec">
            <div>
              Add User:
            </div>
            <div class="searchBarAndBtn">
              <input id="usernameInput" type='text' placeholder='Enter username' autocomplete="off">
              <button id="addUserButton">ADD!</button>
            </div>
            <div id="usernameInputHint">hint</div>
            <a id="close-partyui">
            ✖
            </a>
        </div>

        <div id="currentlyAddedLabel">
          Currently Added Users:
        </div>
        <div id="partyui-users-scroll"></div>
        <div id="nobodyHere">There's nobody here... Invite some friends!</div>
        <button id="saveUsers">Save users!</button>
      </div>
    </confetti-container>
    </div>`;
  }

  static get properties() {
    return {
      users: { type: String, reflect: true},
      usersArray: { type: Array, reflect: true},
    };
  }

  makeItRain() {
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
    console.log("make it rain");
  }

}












export class partyMember extends LitElement {
  static get tag() {
    return 'haxcms-party-member';
  }

  constructor() {
    super();
    this.username = "";
  }

  static get styles() {
    return css`

      .partyui-user-container {
        color: black;
        margin-right: 40px;
        display: flex;
        flex-direction: column;
        padding-bottom: 16px;
        width: 140px;
        overflow: hidden;
      }

      .partyui-user-container rpg-character {
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .partyui-user-container button {
        margin-top: 8px;
      }
      .partyui-user-container span {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .searchBarAndBtn {
        display: flex;
        align-items: center;
      }
      .searchBarAndBtn input {
        padding: 4px;
        height: 100%;
        box-sizing: border-box;
        border: none;
        color: inherit
      }

      #addUserButton {
        background: var(--ddd-theme-default-skyLight);
        border: none;
        padding: 4px 8px;
        margin-left: 8px;
        height: 100%;
        box-sizing: border-box;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        color: inherit;
      }
      #addUserButton:hover {
        color: var(--ddd-theme-default-skyBlue);
      }

      #changePermsBtn, #removeUserBtn {
        background: var(--ddd-theme-default-skyLight);
        border: none;
        padding: 4px 8px;
        height: 100%;
        margin-left: -4px;
        margin-right: -4px;
        box-sizing: border-box;
        cursor: pointer;
        font-weight: bold;
        color: inherit
      }
      #changePermsBtn:hover, #removeUserBtn:hover {
        color: var(--ddd-theme-default-skyBlue);
      }
    `;
  }


  render() {

    if(this.username == "svb6127") {
      return html`
        <div class="partyui-user-container">
            <rpg-character drip seed="${this.username}"></rpg-character>
            <span>${this.username}</span>
            <button id="changePermsBtn" onclick="alert('[option to change permissions for ${this.username} here]')">Change Permissions</button>
            <button id="removeUserBtn">Remove User</button>
        </div>`;
    }
    else {
      return html`
        <div class="partyui-user-container">
            <rpg-character seed="${this.username}"></rpg-character>
            <span>${this.username}</span>
            <button id="changePermsBtn" onclick="alert('[change permissions for ${this.username}]')">Change Permissions</button>
            <button id="removeUserBtn">Remove User</button>
        </div>`;
    }
  }


  firstUpdated() {
    const removeUserButton = this.shadowRoot.querySelector("#removeUserBtn");
    removeUserButton.addEventListener('click', () => {
      this.removeUser(this.username);
    });
  }
  

  removeUser(user) {
    const event = new CustomEvent('user-removed', {detail: user, bubbles: true});
    this.dispatchEvent(event);
  }

  static get properties() {
    return {
      username: { type: String, reflect: true},
    };
  }
}

globalThis.customElements.define(haxcmsParty.tag, haxcmsParty);
globalThis.customElements.define(partyMember.tag, partyMember);