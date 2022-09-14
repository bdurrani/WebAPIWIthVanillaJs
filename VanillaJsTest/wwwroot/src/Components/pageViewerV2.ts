import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";

@customElement("page-viewer-v2")
export class PageViewerV2 extends LitElement {
    @property()
    version = "STARTING";

    @property({attribute: false})
    imageData: string;

    constructor() {
        super();
        this.imageData = "";
    }

    static styles = css`
    .statement-page {
      color: green;
    }
  `;

    render() {
        const imageTmpl = this.imageData ?
            html`
          <img src=${this.imageData} alt="Visit the MDN site"> ` : ``;

        return html`
      <div class="statement-page">
        ${imageTmpl}
      </div>
    `;
    }
}
