import { css, html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { localizedString, LocalizedString, isRtl } from "../../utils/i18n.js";

// ============================================
// TYPES
// ============================================

type HorizontalPosition = "left" | "right" | "middle";
type VerticalPosition = "top" | "bottom" | "middle";

interface ComponentConfig {
  notmrb?: boolean;
  has_container?: boolean;

  content_position_h?: HorizontalPosition;
  content_position_v?: VerticalPosition;

  banner_title?: LocalizedString;
  banner_subtitle?: LocalizedString;

  banner_text_color?: string;
  banner_image?: string;

  banner_btn_text?: LocalizedString;
  banner_btn_text_color?: string;
  banner_btn_bg_color?: string;

  banner_time_s?: boolean;
  banner_time?: string;

  [key: string]: any;
}

// ============================================
// COMPONENT
// ============================================

export class DiscountBanner extends LitElement {
  @property({
    type: Object,
    converter: {
      fromAttribute: (value: string | null) => {
        if (!value) return undefined;

        if (typeof value === "object") return value;

        try {
          return JSON.parse(value);
        } catch {
          return undefined;
        }
      },
    },
  })
  config?: ComponentConfig;

  @property({ type: String })
  position: string = "0";

  // Optional explicit override from Twilight. When unset, direction is derived
  // from the centralized i18n source of truth (see `_isRtl`).
  @property({ type: Boolean })
  isRtl?: boolean;

  /** Effective text direction: explicit prop wins, else the active language. */
  private get _isRtl(): boolean {
    return this.isRtl ?? isRtl();
  }

  // ─────────────────────────────────────────────
  // LIFECYCLE
  // ─────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();

    if (typeof this.config === "string") {
      try {
        this.config = JSON.parse(this.config as any);
      } catch (e) {
        console.error("[discount-banner] Failed to parse config:", e);
      }
    }
  }

  // ─────────────────────────────────────────────
  // STYLES
  // ─────────────────────────────────────────────

  static styles = css`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    :host {
      display: block;
    }

    a {
      text-decoration: none;
    }

    .S_discount_banner {
      width: 100%;
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }

    .db-container {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding-inline: 1rem;
    }

    /* ───────────────────────────── */

    .db-banner {
      position: relative;
      overflow: hidden;
      min-height: 300px;
      border-radius: 1.5rem;
    }

    .db-banner:hover .db-bg {
      transform: scale(1.05);
    }

    /* ───────────────────────────── */

    .db-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    /* ───────────────────────────── */

    .db-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25));
    }

    /* ───────────────────────────── */
    .db-content {
      position: relative;
      z-index: 2;

      height: 100%;
      min-height: 300px;

      display: flex;
      flex-direction: column;
      gap: 1rem;

      padding: 1.5rem;
    }

    /* Vertical Position */

    .db-content--top {
      justify-content: flex-start;
    }

    .db-content--middle {
      justify-content: center;
    }

    .db-content--bottom {
      justify-content: flex-end;
    }

    /* Horizontal Position */

    .db-content--left {
      align-items: flex-start;
      text-align: left;
    }

    .db-content--middle-x {
      align-items: center;
      text-align: center;
    }

    .db-content--right {
      align-items: flex-end;
      text-align: right;
    }

    /* ───────────────────────────── */

    .db-title {
      margin: 0;

      font-size: 1.75rem;
      font-weight: 800;
      line-height: 1.2;
    }

    @media (min-width: 768px) {
      .db-title {
        font-size: 2.5rem;
      }
    }

    /* ───────────────────────────── */

    .db-subtitle {
      margin: 0;

      max-width: 32rem;

      font-size: 0.95rem;
      line-height: 1.7;

      opacity: 0.9;
    }

    @media (min-width: 768px) {
      .db-subtitle {
        font-size: 1.125rem;
      }
    }

    /* ───────────────────────────── */

    .db-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;

      width: fit-content;

      padding: 0.875rem 1.5rem;

      border-radius: 1rem;

      font-size: 0.95rem;
      font-weight: 700;

      transition:
        transform 0.3s ease,
        opacity 0.3s ease;
    }

    .db-btn:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    .db-btn-icon {
      transition: transform 0.3s ease;
    }

    .db-btn:hover .db-btn-icon {
      transform: translateX(-4px);
    }

    /* ───────────────────────────── */

    @media (max-width: 767px) {
      .db-banner {
        min-height: 300px;
      }

      .db-content {
        padding: 1.25rem;
      }

      .db-title {
        font-size: 1.5rem;
      }

      .db-subtitle {
        font-size: 0.9rem;
      }
    }
  `;

  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────

  private _horizontalClass(pos?: HorizontalPosition): string {
    switch (pos) {
      case "left":
        return "db-content--left";

      case "middle":
        return "db-content--middle-x";

      case "right":
      default:
        return "db-content--right";
    }
  }

  private _verticalClass(pos?: VerticalPosition): string {
    switch (pos) {
      case "top":
        return "db-content--top";

      case "bottom":
        return "db-content--bottom";

      case "middle":
      default:
        return "db-content--middle";
    }
  }

  // ─────────────────────────────────────────────
  // RENDER HELPERS
  // ─────────────────────────────────────────────
  private _getSelectValue(val?: any): string | undefined {
    if (!val) return undefined;

    if (Array.isArray(val)) {
      return val[0]?.value ?? val[0]?.key ?? val[0];
    }

    if (typeof val === "object") {
      return val?.value ?? val?.key;
    }

    return val;
  }

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────

  render() {
    const cfg = this.config;

    // Safety re-parse
    if (typeof cfg === "string") {
      try {
        this.config = JSON.parse(cfg as any);
      } catch {
        /* ignore */
      }

      return html``;
    }

    const sectionId = `S_discount_banner-${this.position}`;

    const hPos = this._getSelectValue(
      cfg?.content_position_h,
    ) as HorizontalPosition;
    const vPos = this._getSelectValue(
      cfg?.content_position_v,
    ) as VerticalPosition;

    // Resolve multilanguage fields
    const title = localizedString(cfg?.banner_title);
    const subtitle = localizedString(cfg?.banner_subtitle);
    const btnText = localizedString(cfg?.banner_btn_text);

    const contentClasses = [
      "db-content",
      this._horizontalClass(hPos),
      this._verticalClass(vPos),
    ].join(" ");

    const content = html`
      <div class="db-banner">
        <!-- Background Image -->
        ${cfg?.banner_image
          ? html`
              <img
                src="${cfg.banner_image}"
                alt="${title ?? "banner"}"
                class="db-bg"
              />
            `
          : ""}

        <!-- Overlay -->
        <div class="db-overlay"></div>

        <!-- Content -->
        <div class="${contentClasses}">
          <!-- Title -->
          ${title
            ? html`
                <h2
                  class="db-title"
                  style="color: ${cfg?.banner_text_color ?? "#fff"}"
                >
                  ${title}
                </h2>
              `
            : ""}

          <!-- Subtitle -->
          ${subtitle
            ? html`
                <p
                  class="db-subtitle"
                  style="color: ${cfg?.banner_text_color ?? "#fff"}"
                >
                  ${subtitle}
                </p>
              `
            : ""}

          <!-- Button -->
          ${btnText
            ? html`
                <a
                  href="#"
                  class="db-btn"
                  style="
                    background-color: ${cfg?.banner_btn_bg_color ?? "#000"};
                    color: ${cfg?.banner_btn_text_color ?? "#fff"};
                  "
                >
                  <span>${btnText}</span>

                  <span class="db-btn-icon"> ${this._isRtl ? "←" : "→"} </span>
                </a>
              `
            : ""}
        </div>
      </div>
    `;

    return html`
      <section
        class="S_discount_banner"
        id="${sectionId}"
        aria-label="Section ${sectionId}"
        dir="${this._isRtl ? "rtl" : "ltr"}"
        data-notmrb="${cfg?.notmrb ? "true" : "false"}"
      >
        ${cfg?.has_container
          ? html` <div class="db-container">${content}</div> `
          : content}
      </section>
    `;
  }
}
