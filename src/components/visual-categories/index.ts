import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { localizedString, LocalizedString } from "../../utils/i18n.js";

interface CategoryItem {
  url?: string;
  image?: string;
  title?: LocalizedString;
  count?: number;

  text_color?: string;

  img_overlay?: boolean;
  img_overlay_color?: string;
  img_overlay_opacity?: number;

  text_position?: { value: string }[];

  [key: string]: any;
}

interface ComponentConfig {
  notmrb?: boolean;
  has_container?: boolean;

  items?: CategoryItem[];

  [key: string]: any;
}

export class VisualCategories extends LitElement {
  @property({ type: Object })
  config?: ComponentConfig;

  static styles = css`
    :host {
      display: block;
    }

    .section {
      width: 100%;
    }

    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    @media (min-width: 640px) {
      .grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: repeat(5, minmax(0, 1fr));
      }
    }

    .card {
      position: relative;
      display: block;
      overflow: hidden;
      border-radius: 16px;
      aspect-ratio: 3 / 5;
      cursor: pointer;
    }

    .img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s ease;
    }

    .card:hover .img {
      transform: scale(1.1);
    }

    .overlay {
      position: absolute;
      inset: 0;
      transition: opacity 0.5s;
    }

    .content {
      position: absolute;
      bottom: 0;
      inset-inline: 0;
      padding: 1rem;
    }

    .title {
      font-weight: 700;
      font-size: 1.125rem;
      transition: transform 0.7s;
      margin: 0;
    }

    .card:hover .title {
      transform: translateY(-4px);
    }

    .count {
      display: inline-block;
      font-size: 0.875rem;
      opacity: 0;
      transform: translateY(8px);
      transition: 0.5s;
    }

    .card:hover .count {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  private _align(pos?: string) {
    switch (pos) {
      case "start":
        return "flex-start";
      case "center":
        return "center";
      default:
        return "flex-end";
    }
  }

  private _textAlign(pos?: string) {
    switch (pos) {
      case "start":
        return "left";
      case "center":
        return "center";
      default:
        return "right";
    }
  }

  render() {
    const c = this.config;
    const items = c?.items ?? [];

    return html`
      <section class="section">
        <div class="${c?.has_container ? "container" : ""}">
          <div class="grid">
            ${items.map((item) => {
              const position = item?.text_position?.[0]?.value ?? "end";

              const title = localizedString(item?.title);

              const align = this._align(position);
              const textAlign = this._textAlign(position);

              const overlayOpacity = (item?.img_overlay_opacity ?? 50) / 100;

              return html`
                <a class="card" href="${item.url ?? "#"}">
                  ${item.image
                    ? html`<img class="img" src="${item.image}" />`
                    : html`<div class="img"></div>`}
                  ${item.img_overlay
                    ? html`
                        <div
                          class="overlay"
                          style="
                            background:${item.img_overlay_color ?? "#000"};
                            opacity:${overlayOpacity};
                          "
                        ></div>
                      `
                    : ""}

                  <div
                    class="content"
                    style="
                      display:flex;
                      flex-direction:column;
                      align-items:${align};
                      text-align:${textAlign};
                    "
                  >
                    <h2
                      class="title"
                      style="color:${item.text_color ?? "#fff"}"
                    >
                      ${title ?? ""}
                    </h2>

                    ${item.count
                      ? html`
                          <span
                            class="count"
                            style="color:${item.text_color ?? "#fff"}"
                          >
                            ${item.count}
                          </span>
                        `
                      : ""}
                  </div>
                </a>
              `;
            })}
          </div>
        </div>
      </section>
    `;
  }
}
