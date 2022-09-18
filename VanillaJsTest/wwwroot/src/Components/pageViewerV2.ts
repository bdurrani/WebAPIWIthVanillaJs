import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { query } from "lit/decorators/query.js";
import { v4 as uuidv4 } from "uuid";

const imageIdPrefix = `statement-image-`;
@customElement("page-viewer-v2")
export class PageViewerV2 extends LitElement {
  @property({ attribute: false })
  imageData: string;

  @property()
  src: string;

  @query("#statement-image")
  private _first!: HTMLImageElement;

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
    const imageId = `${imageIdPrefix}${uuidv4()}`;
    const imageTmpl = this.src
      ? html`
          <img src=${this.src} id="statement-image" alt="statement page" />
        `
      : ``;

    return html` <div class="statement-page">${imageTmpl}</div> `;
  }

  // https://stackoverflow.com/a/67499234/293611
  override async getUpdateComplete(): Promise<boolean> {
    const result = await super.getUpdateComplete();
    const imageLoaded = new Promise((res) => {
      this._first.onload = function () {
        res(null);
      };
    });
    await imageLoaded;
    return result;
  }

  async updated(changedProperties: PropertyValues) {
    await this.updateComplete;
    const bounds = this._first.getBoundingClientRect();
    console.log(JSON.stringify(bounds));
    // test.onload = () => {
    //   const onloadbounds = this._first.getBoundingClientRect();
    //   console.log(JSON.stringify(onloadbounds));
    // };
  }
}
