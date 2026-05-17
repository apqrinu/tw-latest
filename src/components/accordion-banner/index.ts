import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

type BannerItem = {
  banner_image?: string;
  banner_color?: string;

  banner_title?: string;
  banner_title_color?: string;

  banner_btn_text?: string;
  banner_btn_bg_color?: string;
  banner_btn_text_color?: string;

  img_overlay?: boolean;

  justify_content?: string[];
  align_items?: string[];

  url?: {
    url?: string;
  } | string;
};

export class AccordionBanners extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .acc-wrapper {
      display: flex;
      gap: 12px;
      height: 650px;
      overflow: hidden;
    }

    .acc-slide {
      position: relative;
      flex: 1;
      overflow: hidden;
      transition: flex 0.5s ease;
      border-radius: 24px;
    }

    .acc-slide:hover {
      flex: 3;
    }

    .acc-link {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      overflow: hidden;
    }

    .acc-link img,
    .banner-color {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .acc-slide:hover img {
      transform: scale(1.05);
    }

    .acc-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.65),
        rgba(0, 0, 0, 0.2)
      );
      z-index: 1;
    }

    .acc-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 32px;
      box-sizing: border-box;
      gap: 16px;
    }

    .acc-title {
      margin: 0;
      font-size: 32px;
      line-height: 1.3;
      font-weight: 700;
      max-width: 420px;
    }

    .acc-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      padding: 12px 22px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .acc-btn:hover {
      transform: translateY(-2px);
      opacity: 0.9;
    }

    .no-grayscale img {
      filter: grayscale(0);
    }

    @media (max-width: 991px) {
      .acc-wrapper {
        flex-direction: column;
        height: auto;
      }

      .acc-slide {
        min-height: 350px;
      }

      .acc-slide:hover {
        flex: 1;
      }

      .acc-title {
        font-size: 24px;
      }
    }
  `;

  @property({ type: Array })
  accordionBannersCollection: BannerItem[] = [];

  private renderBanner(banner: BannerItem) {
    const justify = banner.justify_content?.[0] ?? "flex-start";
    const align = banner.align_items?.[0] ?? "center";

    const textAlign =
      justify === "flex-start"
        ? "right"
        : justify === "flex-end"
        ? "left"
        : "center";

    const link =
      typeof banner.url === "object"
        ? banner.url?.url ?? "#"
        : banner.url ?? "#";

    return html`
      <div
        class="acc-slide ${!banner.img_overlay
          ? "no-grayscale"
          : ""}"
      >
        <a href=${link} class="acc-link">
          ${banner.banner_image
            ? html`
                <img
                  src=${banner.banner_image}
                  alt=${banner.banner_title ?? ""}
                  loading="lazy"
                />
              `
            : html`
                <div
                  class="banner-color"
                  style="
                    background:${banner.banner_color ??
                  "#acacac"};
                  "
                ></div>
              `}

          ${banner.img_overlay
            ? html` <div class="acc-overlay"></div> `
            : null}

          <div
            class="acc-content"
            style="
              align-items:${justify};
              justify-content:${align};
              text-align:${textAlign};
            "
          >
            ${banner.banner_title
              ? html`
                  <h2
                    class="acc-title"
                    style="
                      color:${banner.banner_title_color ??
                    "#fff"};
                    "
                  >
                    ${banner.banner_title}
                  </h2>
                `
              : null}

            ${banner.banner_btn_text
              ? html`
                  <a
                    href=${link}
                    class="acc-btn"
                    style="
                      background:${banner.banner_btn_bg_color ??
                    "#fff"};
                      color:${banner.banner_btn_text_color ??
                    "#000"};
                    "
                  >
                    ${banner.banner_btn_text}
                  </a>
                `
              : null}
          </div>
        </a>
      </div>
    `;
  }

  render() {
    if (!this.accordionBannersCollection?.length) {
      return null;
    }

    return html`
      <section>
        <div class="acc-wrapper">
          ${this.accordionBannersCollection.map((banner) =>
            this.renderBanner(banner)
          )}
        </div>
      </section>
    `;
  }
}

customElements.define(
  "accordion-banners",
  AccordionBanners
);