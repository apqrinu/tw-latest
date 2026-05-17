import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

// ======================
// TYPES
// ======================

interface ComponentConfig {
  notmrb?: boolean;
  has_container?: boolean;

  banner_image?: string;

  banner_time_s?: boolean;
  banner_time?: string;

  banner_title?: string;
  banner_subtitle?: string;

  banner_text_color?: string;

  banner_btn_text?: string;
  banner_btn_bg_color?: string;
  banner_btn_text_color?: string;

  content_position_v?: "top" | "middle" | "bottom";
  content_position_h?: "left" | "middle" | "right";

  [key: string]: any;
}

// ======================
// COMPONENT
// ======================

export class DiscountBanner extends LitElement {
  @property({ type: Object })
  config?: ComponentConfig;

  @property({ type: String })
  position = "0";

  // ======================
  // STYLES
  // ======================

  static styles = css`
    :host {
      display: block;
    }

    .banner {
      position: relative;
      height: 300px;
      overflow: hidden;
    }

    .bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 500ms ease;
    }

    .banner:hover .bg {
      transform: scale(1.05);
    }

    .content {
      position: relative;
      z-index: 10;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* vertical alignment */
    .top {
      justify-content: flex-start;
      padding-top: 1.5rem;
    }

    .middle {
      justify-content: center;
    }

    .bottom {
      justify-content: flex-end;
      padding-bottom: 1.5rem;
    }

    /* horizontal alignment */
    .left {
      align-items: flex-end;
      text-align: right;
    }

    .center {
      align-items: center;
      text-align: center;
    }

    .right {
      align-items: flex-start;
      text-align: right;
    }

    .title {
      font-size: 1.5rem;
      font-weight: 800;
    }

    @media (min-width: 768px) {
      .title {
        font-size: 2.25rem;
      }
    }

    .subtitle {
      font-size: 0.875rem;
      opacity: 0.8;
      max-width: 28rem;
    }

    @media (min-width: 768px) {
      .subtitle {
        font-size: 1.125rem;
      }
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      font-weight: 600;
      transition: opacity 200ms ease;
    }

    .btn:hover {
      opacity: 0.9;
    }
  `;

  // ======================
  // HELPERS
  // ======================

  private _posV(v?: string) {
    if (v === "top") return "top";
    if (v === "bottom") return "bottom";
    return "middle";
  }

  private _posH(h?: string) {
    if (h === "left") return "left";
    if (h === "right") return "right";
    return "center";
  }

  // ======================
  // RENDER
  // ======================

  render() {
    const c = this.config;

    const sectionId = `S_discount_banner-${this.position}`;

    const v = this._posV(c?.content_position_v);
    const h = this._posH(c?.content_position_h);

    return html`
      <section id=${sectionId} class="banner" aria-label=${sectionId}>
        <div class="relative h-full">
          
          <img
            class="bg"
            src=${c?.banner_image ?? ""}
            alt="banner"
          />

          <div class="content ${v} ${h}">
            
            ${c?.banner_time_s
              ? html`<salla-count-down
                  date=${c?.banner_time ?? ""}
                  digits="ar"
                  boxed="true"
                  labeled="true"
                  size="md"
                ></salla-count-down>`
              : ""}

            ${c?.banner_title
              ? html`
                  <h2
                    class="title"
                    style="color:${c?.banner_text_color}"
                  >
                    ${c?.banner_title}
                  </h2>
                `
              : ""}

            ${c?.banner_subtitle
              ? html`
                  <p
                    class="subtitle"
                    style="color:${c?.banner_text_color}"
                  >
                    ${c?.banner_subtitle}
                  </p>
                `
              : ""}

            ${c?.banner_btn_text
              ? html`
                  <a
                    class="btn"
                    href="#"
                    style="
                      background:${c?.banner_btn_bg_color};
                      color:${c?.banner_btn_text_color};
                    "
                  >
                    ${c?.banner_btn_text}
                    <span>←</span>
                  </a>
                `
              : ""}

          </div>
        </div>
      </section>
    `;
  }
}