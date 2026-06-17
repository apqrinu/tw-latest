import { LitElement as u, css as g, html as i } from "lit";
import { property as b } from "lit/decorators.js";
import { i as _, l } from "./i18n-CQL1wib0.js";
var x = Object.defineProperty, c = (r, t, e, a) => {
  for (var n = void 0, o = r.length - 1, d; o >= 0; o--)
    (d = r[o]) && (n = d(t, e, n) || n);
  return n && x(t, e, n), n;
};
const m = class m extends u {
  constructor() {
    super(...arguments), this.position = "0";
  }
  /** Effective text direction: explicit prop wins, else the active language. */
  get _isRtl() {
    return this.isRtl ?? _();
  }
  // ─────────────────────────────────────────────
  // LIFECYCLE
  // ─────────────────────────────────────────────
  connectedCallback() {
    if (super.connectedCallback(), typeof this.config == "string")
      try {
        this.config = JSON.parse(this.config);
      } catch (t) {
        console.error("[discount-banner] Failed to parse config:", t);
      }
  }
  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────
  _horizontalClass(t) {
    switch (t) {
      case "left":
        return "db-content--left";
      case "middle":
        return "db-content--middle-x";
      case "right":
      default:
        return "db-content--right";
    }
  }
  _verticalClass(t) {
    switch (t) {
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
  _getSelectValue(t) {
    var e, a;
    if (t)
      return Array.isArray(t) ? ((e = t[0]) == null ? void 0 : e.value) ?? ((a = t[0]) == null ? void 0 : a.key) ?? t[0] : typeof t == "object" ? (t == null ? void 0 : t.value) ?? (t == null ? void 0 : t.key) : t;
  }
  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  render() {
    const t = this.config;
    if (typeof t == "string") {
      try {
        this.config = JSON.parse(t);
      } catch {
      }
      return i``;
    }
    const e = `S_discount_banner-${this.position}`, a = this._getSelectValue(
      t == null ? void 0 : t.content_position_h
    ), n = this._getSelectValue(
      t == null ? void 0 : t.content_position_v
    ), o = l(t == null ? void 0 : t.banner_title), d = l(t == null ? void 0 : t.banner_subtitle), p = l(t == null ? void 0 : t.banner_btn_text), f = [
      "db-content",
      this._horizontalClass(a),
      this._verticalClass(n)
    ].join(" "), h = i`
      <div class="db-banner">
        <!-- Background Image -->
        ${t != null && t.banner_image ? i`
              <img
                src="${t.banner_image}"
                alt="${o ?? "banner"}"
                class="db-bg"
              />
            ` : ""}

        <!-- Overlay -->
        <div class="db-overlay"></div>

        <!-- Content -->
        <div class="${f}">
          <!-- Title -->
          ${o ? i`
                <h2
                  class="db-title"
                  style="color: ${(t == null ? void 0 : t.banner_text_color) ?? "#fff"}"
                >
                  ${o}
                </h2>
              ` : ""}

          <!-- Subtitle -->
          ${d ? i`
                <p
                  class="db-subtitle"
                  style="color: ${(t == null ? void 0 : t.banner_text_color) ?? "#fff"}"
                >
                  ${d}
                </p>
              ` : ""}

          <!-- Button -->
          ${p ? i`
                <a
                  href="#"
                  class="db-btn"
                  style="
                    background-color: ${(t == null ? void 0 : t.banner_btn_bg_color) ?? "#000"};
                    color: ${(t == null ? void 0 : t.banner_btn_text_color) ?? "#fff"};
                  "
                >
                  <span>${p}</span>

                  <span class="db-btn-icon"> ${this._isRtl ? "←" : "→"} </span>
                </a>
              ` : ""}
        </div>
      </div>
    `;
    return i`
      <section
        class="S_discount_banner"
        id="${e}"
        aria-label="Section ${e}"
        dir="${this._isRtl ? "rtl" : "ltr"}"
        data-notmrb="${t != null && t.notmrb ? "true" : "false"}"
      >
        ${t != null && t.has_container ? i` <div class="db-container">${h}</div> ` : h}
      </section>
    `;
  }
};
m.styles = g`
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
let s = m;
c([
  b({
    type: Object,
    converter: {
      fromAttribute: (r) => {
        if (r) {
          if (typeof r == "object") return r;
          try {
            return JSON.parse(r);
          } catch {
            return;
          }
        }
      }
    }
  })
], s.prototype, "config");
c([
  b({ type: String })
], s.prototype, "position");
c([
  b({ type: Boolean })
], s.prototype, "isRtl");
typeof s < "u" && s.registerSallaComponent("salla-discount-banner");
export {
  s as DiscountBanner
};
