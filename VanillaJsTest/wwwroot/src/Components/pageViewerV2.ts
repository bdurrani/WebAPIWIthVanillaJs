import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { query } from "lit/decorators/query.js";

const STATEMENT_IMAGE_ID = "statement-image";

@customElement("page-viewer-v2")
export class PageViewerV2 extends LitElement {
  @property({ attribute: false })
  imageData: string;

  @property()
  src: string;

  @query(`#${STATEMENT_IMAGE_ID}`)
  private imageElement!: HTMLImageElement;

  imgBounds: DOMRect | null;

  constructor() {
    super();
    this.imageData = "";
    this.src = "";
    this.imgBounds = null;
  }

  static styles = css`
    .statement-page {
      color: green;
    }
  `;

  render() {
    const imageTmpl = this.src
      ? html`
          <img src=${this.src} id="${STATEMENT_IMAGE_ID}" alt="statement page" />
        `
      : ``;

    return html` <div class="statement-page">${imageTmpl}</div> `;
  }

  // https://stackoverflow.com/a/67499234/293611
  override async getUpdateComplete(): Promise<boolean> {
    const result = await super.getUpdateComplete();
    if(!this.imageElement){
      return result;
    }

    const imageLoaded = new Promise((res) => {
      this.imageElement.onload = function () {
        res(null);
      };
    });
    await imageLoaded;
    return result;
  }

  async updated(changedProperties: PropertyValues) {
    await this.updateComplete;
    this.imgBounds = this.imageElement.getBoundingClientRect();
    console.log(JSON.stringify(this.imgBounds));
  }
}
