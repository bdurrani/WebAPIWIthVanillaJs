export class PageViewer extends HTMLElement {
  //   private readonly shadowRoot: ShadowRoot | null;
  constructor() {
    // Always call super first in constructor
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
    console.log("connected cb");
    if (this.shadowRoot) {
      // const txtNode = document.createTextNode("Hello");
      // this.shadowRoot.appendChild(txtNode);
      this.shadowRoot.innerHTML = this.html();
    }
    // this.innerHTML = this.html();
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
    console.log("disconnected cb");
  }
  html() {
    return ` <div class="statement-page"></div> `;
  }
}

export function registration() {
  customElements.define("page-viewer", PageViewer);
  console.log("registration complete");
}
