import { LitElement, html, css} from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-element")
export class MyElement extends LitElement {
  @property()
  version = "STARTING";

  render() {
    return html`
      <p>Welcome to the Lit tutorial!</p>
      <p>This is the ${this.version} code.</p>
    `;
  }
}



@customElement("page-viewer-v2")
export class PageViewerV2 extends LitElement {
  @property()
  version = "STARTING";

  static styles = css`
    .statement-page {
      color: green;
    }
  `;
  render() {
    return html`
      <div class="statement-page">
        This is page
      </div>
    `;
  }
}
