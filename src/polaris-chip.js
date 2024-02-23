// we import JS code into this JS code. Modular javascript is a big deal
// more modern (relatively speaking) and allows the web to feel like
// a full blown development environment
import { LitElement, html, css } from 'lit';

// export means that other JS files can reference this JS file and
// pull in this class

// class means it's a full object to work with with methods and properties
// extends means this class is built off another
// LitElement is a small helper from lit.dev which makes it easy
// to understand how to build web components. Think of it like jQuery
// as far as built juuuuust on top of vanillaJS to make it easier to build
// things. However, unlike jQuery, ALL things built on Web components are
// compatible with all things built on other web component systems!
// We will only stick with Lit for this class and look at Vanilla examples
// but compatibility across sites / libraries is unique to web components
// and not a thing in React, Vue, Angular, etc
export class PolarisChip extends LitElement {
  // this is not a requirement, but it's a convention I personally enjoy
  // because it helps when looking at multiple elements. I open this file
  // I glance and go "oh the HTML tag for this code is called polaris-chip"
  // see the very bottom of the file for where this is actually implemented
  static get tag() {
    return 'polaris-chip';
  }
  // constructor establishes defaults for the class
  constructor() {
    super();
    // a variable on this object called title
    this.title = 'My boilerplate';
    this.link = "#";
  }

  // CSS styles are scoped JUST to this element. This uses a technology called
  // "Shadow DOM" which is ver controversial to some, but to new people and new
  // things, it's incredible. It automatically ensures that the things in your render()
  // method below it look exactly the same always no matter where they are loaded!
  static get styles() {
    // "css" called here is actually a function exported from Lit at the top
    // so that it scopes the CSS nicely and also applies sanitization
    return css`
    /*
      :host is a special selector meaning "the tag itself"
      Think of if we were looking at how a <strong> tag is made. It would have
      :host { font-weight: bold; display: inline; }
    */
      :host {
        /* Always make sure that your element has a default way of being displayed */
        display: inline-flex;
        text-decoration: none;
      }

      span {
        margin-right: 6px;
        margin-top: 6px;
        margin-left: 12px;
        background: #f5c100;
        border-radius: 100px;
        padding: 6px 12px;
        font-weight: bold;
        border: solid 2px black;
        box-sizing: border-box;
        box-shadow: 4px 4px black;
        transition: all .3s;
        color: #000;
        text-decoration: none;
      }

      span:hover {
        cursor: pointer;
        background-color: black;
        color: white;
      }

      a {
        text-decoration: none;
      }
    `;
  }

  render() {
    return html`<a href="${this.link}" rel="noopener noreferrer"><span>${this.title}</span></a>`;
  }

  // LitElement uses the properties call to do the following:
  // - When a value changes it reacts to the change
  // - When it reacts to the change and it's listed in the render() method, it rerenders
  // - this is what users would expect, but is not the way the web usually works
  // - Lit + Web component spec + properties == HTML with data variables
  static get properties() {
    return {
      // this is a String. Array, Object, Number, Boolean are other valid values here
      title: { type: String },
      link: { type: String },
    };
  }
}

globalThis.customElements.define(PolarisChip.tag, PolarisChip);
