export class PageViewer extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        // this.attachShadow({mode:"open"});
    }

    connectedCallback() {
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
        console.log('connected cb');
        this.innerHTML = this.html();
    }

    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
        console.log('disconnected cb');
    }
    html() {
        return `
            Welcome Home, logged in.
            <ul id="projectList"></ul>
            `
    }
}

export function registration(){
    customElements.define('page-viewer', PageViewer);
    console.log("registration complete");
}
