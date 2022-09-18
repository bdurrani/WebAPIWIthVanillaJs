import {css, html, LitElement, PropertyValues} from "lit";
import { customElement, property } from "lit/decorators.js";
import {query} from 'lit/decorators/query.js';
import { v4 as uuidv4 } from 'uuid';

const imageIdPrefix = `statement-image-`;
@customElement("page-viewer-v2")
export class PageViewerV2 extends LitElement {
  @property({ attribute: false })
  imageData: string;

  @property()
  src: string;

  @query('#statement-image')
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
      ? html` <img src=${this.src} id="statement-image" alt="statement page" /> `
      : ``;

    return html` <div class="statement-page">${imageTmpl}</div> `;
  }

  // https://stackoverflow.com/a/67499234/293611
  async getUpdateComplete(): Promise<boolean>{
    await super.getUpdateComplete()
    const children = this.renderRoot.querySelectorAll('*');
    // await Promise.all(Array.from(children).map((c) => c.updateComplete));
    const marginElements = this._first; // Array.from(this.shadowRoot.querySelectorAll('margin-element'))
    // await Promise.all(marginElements.map(el => el.updateComplete))
    return true
  }

  updated(changedProperties: PropertyValues) {

    const children = this.renderRoot.querySelectorAll('*');
    const test = this._first;
    const bounds = this._first.getBoundingClientRect();
    console.log(JSON.stringify(bounds));
  }
}
