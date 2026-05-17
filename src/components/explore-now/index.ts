import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

type Item = {
  image: string;
  title?: string;
  desc?: string;
  url?: string;
  btn_txt?: string;
  text_color?: string;
  btn_bg_color?: string;
  btn_txt_color?: string;
  img_overlay?: boolean;
  img_overlay_color?: string;
  img_overlay_opacity?: number;
  justify_content?: string[];
  align_items?: string[];
};

export class ExploreNow extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .grid-layout {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr 1fr;
      height: 700px;
      gap: 0;
    }

    @media (max-width: 1024px) {
      .grid-layout {
        grid-template-columns: 1fr;
        height: 400px;
      }
    }

    .card {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    .content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 20px;
      width: 100%;
      height: 100%;
    }

    .btn {
      display: inline-flex;
      padding: 8px 16px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 14px;
    }
  `;

  @property({ type: Array }) leftSide: Item[] = [];
  @property({ type: Array }) rightSide: Item[] = [];
  @property({ type: Boolean }) container = false;

  private renderCard(item: Item) {
    const justify = item.justify_content?.[0] ?? "flex-end";
    const align = item.align_items?.[0] ?? "center";

    return html`
      <div class="card">
        <img class="img" src=${item.image} />

        ${item.img_overlay
          ? html`
              <div
                class="overlay"
                style="
                  background:${item.img_overlay_color ?? "#000"};
                  opacity:${(item.img_overlay_opacity ?? 0) / 100};
                "
              ></div>
            `
          : null}

        <div
          class="content"
          style="
            color:${item.text_color ?? "#fff"};
            justify-content:${align};
            align-items:${justify};
            text-align:${justify};
          "
        >
          <div>
            ${item.title
              ? html`<h2 style="margin:0">${item.title}</h2>`
              : null}

            ${item.desc
              ? html`<p style="opacity:0.8;margin:0">${item.desc}</p>`
              : null}
          </div>

          ${item.btn_txt
            ? html`
                <a
                  class="btn"
                  href=${item.url ?? "#"}
                  style="
                    background:${item.btn_bg_color ?? "#fff"};
                    color:${item.btn_txt_color ?? "#000"};
                  "
                >
                  ${item.btn_txt}
                </a>
              `
            : null}
        </div>
      </div>
    `;
  }

  private renderGrid(items: Item[]) {
    const list = (items ?? []).slice(0, 4);

    return html`
      <div class="grid-layout">
        ${list.map((item, i) =>
          list.length === 3 && i === 2
            ? html`<div style="grid-column:span 2">
                ${this.renderCard(item)}
              </div>`
            : html`<div>${this.renderCard(item)}</div>`
        )}
      </div>
    `;
  }

  render() {
    return html`
      <section>
        <div style="display:grid;grid-template-columns:1fr 1fr;">
          ${this.rightSide?.length
            ? html`<div>${this.renderGrid(this.rightSide)}</div>`
            : null}

          ${this.leftSide?.length
            ? html`<div>${this.renderGrid(this.leftSide)}</div>`
            : null}
        </div>
      </section>
    `;
  }
}

customElements.define("explore-now", ExploreNow);