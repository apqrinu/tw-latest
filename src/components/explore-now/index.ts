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

    section {
      width: 100%;
    }

    .wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 1024px) {
      .wrapper {
        grid-template-columns: 1fr;
      }
    }

    .grid-layout {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      height: 700px;
    }

    @media (max-width: 1024px) {
      .grid-layout {
        height: auto;
      }
    }

    @media (max-width: 768px) {
      .grid-layout {
        grid-template-columns: 1fr;
      }
    }

    .grid-item {
      min-height: 350px;
    }

    .full-width {
      grid-column: span 2;
    }

    @media (max-width: 768px) {
      .full-width {
        grid-column: span 1;
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
      gap: 12px;
      width: 100%;
      height: 100%;
      padding: 24px;
      box-sizing: border-box;
    }

    .text-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-width: 400px;
    }

    .title {
      margin: 0;
      font-size: 28px;
      line-height: 1.3;
      font-weight: 700;
    }

    .desc {
      margin: 0;
      opacity: 0.9;
      font-size: 15px;
      line-height: 1.6;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      padding: 10px 18px;
      border-radius: 10px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      transition: 0.3s ease;
    }

    .btn:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
  `;

  @property({ type: Array }) rightSide: Item[] = [];
  @property({ type: Array }) leftSide: Item[] = [];

  private normalizeItems(items: any[]): Item[] {
    return (items ?? []).map((item) => ({
      image: item["right_side.image"] || item["left_side.image"],

      title: item["right_side.title"] || item["left_side.title"],

      desc: item["right_side.desc"] || item["left_side.desc"],

      url: item["right_side.url"] || item["left_side.url"],

      btn_txt:
        item["right_side.btn_txt"] || item["left_side.btn_txt"],

      text_color:
        item["right_side.text_color"] ||
        item["left_side.text_color"],

      btn_bg_color:
        item["right_side.btn_bg_color"] ||
        item["left_side.btn_bg_color"],

      btn_txt_color:
        item["right_side.btn_txt_color"] ||
        item["left_side.btn_txt_color"],

      img_overlay:
        item["right_side.img_overlay"] ||
        item["left_side.img_overlay"],

      img_overlay_color:
        item["right_side.img_overlay_color"] ||
        item["left_side.img_overlay_color"],

      img_overlay_opacity:
        item["right_side.img_overlay_opacity"] ||
        item["left_side.img_overlay_opacity"],

      justify_content:
        item["right_side.justify_content"] ||
        item["left_side.justify_content"],

      align_items:
        item["right_side.align_items"] ||
        item["left_side.align_items"],
    }));
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.rightSide = this.normalizeItems(this.rightSide);
    this.leftSide = this.normalizeItems(this.leftSide);
  }

  private renderCard(item: Item) {
    const justify = item.justify_content?.[0] ?? "flex-start";
    const align = item.align_items?.[0] ?? "center";

    const textAlign =
      justify === "flex-start"
        ? "right"
        : justify === "flex-end"
        ? "left"
        : "center";

    return html`
      <div class="card">
        <img class="img" src=${item.image} alt=${item.title ?? ""} />

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
            text-align:${textAlign};
          "
        >
          <div class="text-wrapper">
            ${item.title
              ? html`<h2 class="title">${item.title}</h2>`
              : null}

            ${item.desc
              ? html`<p class="desc">${item.desc}</p>`
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
        ${list.map((item, index) => {
          const isLastSingle =
            list.length === 3 && index === 2;

          return html`
            <div
              class="
                grid-item
                ${isLastSingle ? "full-width" : ""}
              "
            >
              ${this.renderCard(item)}
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    return html`
      <section>
        <div class="wrapper">
          ${this.rightSide?.length
            ? html`
                <div>
                  ${this.renderGrid(this.rightSide)}
                </div>
              `
            : null}

          ${this.leftSide?.length
            ? html`
                <div>
                  ${this.renderGrid(this.leftSide)}
                </div>
              `
            : null}
        </div>
      </section>
    `;
  }
}

customElements.define("explore-now", ExploreNow);