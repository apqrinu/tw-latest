import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

interface ComponentConfig {
  notmrb?: boolean;
  has_container?: boolean;

  img_overlay?: boolean;
  img_overlay_color?: string;
  img_overlay_opacity?: number;

  banner_image?: string;
  banner_title?: string;
  banner_description?: string;

  url?: string;

  banner_btn_text?: string;
  banner_btn_text_color?: string;
  banner_btn_bg_color?: string;

  [key: string]: any;
}

export class AboutUs extends LitElement {
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
      gap: 2.5rem;
      padding: 3.5rem 1rem;
      align-items: center;
    }

    @media (min-width: 1024px) {
      .wrapper {
        flex-direction: row;
      }
    }

    .imageBox {
      flex: 1;
      width: 100%;
      overflow: hidden;
      border-radius: 16px;
      position: relative;
    }

    .overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    .image {
      width: 100%;
      height: 420px;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .imageBox:hover .image {
      transform: scale(1.1);
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      text-align: center;
    }

    @media (min-width: 1024px) {
      .content {
        text-align: right;
      }
    }

    .title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
    }

    @media (min-width: 768px) {
      .title {
        font-size: 2.5rem;
      }
    }

    .desc {
      font-size: 1rem;
      line-height: 1.8;
      opacity: 0.7;
      margin: 0;
    }

    .btn {
      display: inline-block;
      padding: 0.75rem 2rem;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.875rem;
      transition: 0.3s ease;
      text-decoration: none;
      width: fit-content;
    }

    .btn:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
  `;

  render() {
    const c = this.config;

    return html`
      <section class="section">
        <div class="${c?.has_container ? "container" : ""}">
          <div class="wrapper">

            <!-- Image -->
            <div class="imageBox">
              ${c?.img_overlay
                ? html`
                    <div
                      class="overlay"
                      style="
                        background-color:${c?.img_overlay_color ?? "#000"};
                        opacity:${(c?.img_overlay_opacity ?? 50) / 100};
                      "
                    ></div>
                  `
                : ""}

              ${c?.banner_image
                ? html`
                    <img
                      class="image"
                      src="${c.banner_image}"
                      alt="${c.banner_title ?? ""}"
                      loading="lazy"
                    />
                  `
                : ""}
            </div>

            <!-- Content -->
            <div class="content">
              ${c?.banner_title
                ? html`<h2 class="title">${c.banner_title}</h2>`
                : ""}

              ${c?.banner_description
                ? html`<p class="desc">${c.banner_description}</p>`
                : ""}

              ${c?.banner_btn_text
                ? html`
                    <a
                      class="btn"
                      href="${c?.url ?? "#"}"
                      style="
                        background:${c.banner_btn_bg_color ?? "#000"};
                        color:${c.banner_btn_text_color ?? "#fff"};
                        border:1.5px solid ${c.banner_btn_text_color ?? "#fff"};
                      "
                    >
                      ${c.banner_btn_text}
                    </a>
                  `
                : ""}
            </div>

          </div>
        </div>
      </section>
    `;
  }
}