import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

interface CategoryItem {
  url?: string;
  image?: string;
  banner_title?: string;
  banner_title_color?: string;

  ar?: {
    banner_title?: string;
  };

  banner_desc?: string;
}

interface ComponentConfig {
  notmrb?: boolean;
  has_container?: boolean;

  banner_image?: string;
  banner_title?: string;
  banner_desc?: string;

  banner_title_color?: string;

  img_overlay?: boolean;
  img_overlay_color?: string;
  img_overlay_opacity?: number;

  url?: string;

  hero_timer?: string;

  banner_btn_title?: string;
  banner_btn_title_color?: string;
  banner_btn_bg_color?: string;

  banner_categories?: CategoryItem[];

  [key: string]: any;
}

export class CategoriesBanner extends LitElement {
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

    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    @media (min-width: 1024px) {
      .wrapper {
        flex-direction: row;
        align-items: flex-start;
      }
    }

    /* LEFT BANNER */
    .banner {
      width: 100%;
    }

    @media (min-width: 1024px) {
      .banner {
        width: 360px;
        flex-shrink: 0;
        position: sticky;
        top: 1.5rem;
        height: fit-content;
      }
    }

    .bannerBox {
      position: relative;
      overflow: hidden;
      border-radius: 16px;
      aspect-ratio: 4 / 5;
    }

    .image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .overlay {
      position: absolute;
      inset: 0;
    }

    .bannerContent {
      position: relative;
      z-index: 2;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      text-align: center;
      gap: 0.75rem;
      padding: 2rem 1.5rem;
    }

    .title {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0;
    }

    .desc {
      font-size: 0.85rem;
      opacity: 0.8;
      margin: 0;
    }

    .btn {
      display: inline-block;
      padding: 0.6rem 1.25rem;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 600;
      transition: 0.3s;
      text-decoration: none;
    }

    .btn:hover {
      transform: scale(1.05);
    }

    /* CATEGORIES GRID */
    .grid {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.5rem;
      width: 100%;
    }

    .card {
      background: #f5f5f5;
      border-radius: 16px;
      border: 1px solid #fff;
      aspect-ratio: 1 / 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-decoration: none;
      transition: 0.3s;
    }

    .card:hover {
      background: #ebebeb;
    }

    .imgBox {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem;
    }

    .catImg {
      max-height: 70px;
      width: 100%;
      object-fit: contain;
      transition: transform 0.3s;
    }

    .card:hover .catImg {
      transform: scale(1.05);
    }

    .catTitle {
      text-align: center;
      font-size: 0.75rem;
      padding-bottom: 0.5rem;
    }
  `;

  render() {
    const c = this.config;

    return html`
      <section class="section">
        <div class="${c?.has_container ? "container" : ""}">
          <div class="wrapper">

            <!-- BANNER -->
            <div class="banner">

              <div class="bannerBox">

                ${c?.banner_image
                  ? html`
                      <img class="image" src="${c.banner_image}" />
                    `
                  : ""}

                ${c?.img_overlay
                  ? html`
                      <div
                        class="overlay"
                        style="
                          background:${c.img_overlay_color};
                          opacity:${(c.img_overlay_opacity ?? 50) / 100};
                        "
                      ></div>
                    `
                  : ""}

                <div class="bannerContent">

                  ${c?.banner_desc
                    ? html`
                        <p class="desc" style="color:${c.banner_title_color}">
                          ${c.banner_desc}
                        </p>
                      `
                    : ""}

                  ${c?.banner_title
                    ? html`
                        <h2 class="title" style="color:${c.banner_title_color}">
                          ${c.banner_title}
                        </h2>
                      `
                    : ""}

                  ${c?.hero_timer
                    ? html`<salla-count-down date="${c.hero_timer}" digits="auto" labeled></salla-count-down>`
                    : ""}

                  ${c?.banner_btn_title
                    ? html`
                        <a
                          class="btn"
                          href="${c.url ?? "#"}"
                          style="
                            background:${c.banner_btn_bg_color};
                            color:${c.banner_btn_title_color};
                          "
                        >
                          ${c.banner_btn_title}
                        </a>
                      `
                    : ""}

                </div>
              </div>
            </div>

            <!-- CATEGORIES -->
            ${c?.banner_categories?.length
              ? html`
                  <div class="grid">
                    ${c.banner_categories.map(
                      (cat) => {
                        const title = cat?.ar?.banner_title ?? cat?.banner_title ?? "";

                        return html`
                          <a class="card" href="${cat.url ?? "#"}">

                            <div class="imgBox">
                              ${cat.image
                                ? html`
                                    <img class="catImg" src="${cat.image}" />
                                  `
                                : ""}
                            </div>

                            <div class="catTitle" style="color:${cat.banner_title_color ?? "#000"}">
                              ${title}
                            </div>

                          </a>
                        `;
                      }
                    )}
                  </div>
                `
              : ""}

          </div>
        </div>
      </section>
    `;
  }
}