import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";

@customElement("page-viewer-v2")
export class PageViewerV2 extends LitElement {
    @property()
    version = "STARTING";

    @property({attribute: false})
    imageData: string;

    @property()
    src: string;

    constructor() {
        super();
        this.imageData = "";
        this.src = "";
    }

    static styles = css`
    .statement-page {
      color: green;
    }
  `;

    render() {
        const imageTmpl = this.src ?
            html`
          <img src=${this.src} alt="Visit the MDN site"> ` : ``;

        return html`
      <div class="statement-page">
        ${imageTmpl}
      </div>
    `;
    }
}
