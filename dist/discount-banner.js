import { LitElement as p, css as m, html as i } from "lit";
import { property as l } from "lit/decorators.js";
var h = Object.defineProperty, b = (o, t, n, s) => {
  for (var e = void 0, a = o.length - 1, d; a >= 0; a--)
    (d = o[a]) && (e = d(t, n, e) || e);
  return e && h(t, n, e), e;
};
const c = class c extends p {
  constructor() {
    super(...arguments), this.position = "0", this.isRtl = !1;
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
    var n, s;
    if (t)
      return Array.isArray(t) ? ((n = t[0]) == null ? void 0 : n.value) ?? ((s = t[0]) == null ? void 0 : s.key) ?? t[0] : typeof t == "object" ? (t == null ? void 0 : t.value) ?? (t == null ? void 0 : t.key) : t;
  }
  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  render() {
    const t = this.config;
    if (console.log("H:", t == null ? void 0 : t.content_position_h), console.log("V:", t == null ? void 0 : t.content_position_v), typeof t == "string") {
      try {
        this.config = JSON.parse(t);
      } catch {
      }
      return i``;
    }
    const n = `S_discount_banner-${this.position}`, s = this._getSelectValue(
      t == null ? void 0 : t.content_position_h
    ), e = this._getSelectValue(
      t == null ? void 0 : t.content_position_v
    );
    console.log("parsed:", { hPos: s, vPos: e });
    const a = [
      "db-content",
      this._horizontalClass(s),
      this._verticalClass(e)
    ].join(" "), d = i`
      <div class="db-banner">
        <!-- Background Image -->
        ${t != null && t.banner_image ? i`
              <img
                src="${t.banner_image}"
                alt="${t.banner_title ?? "banner"}"
                class="db-bg"
              />
            ` : ""}

        <!-- Overlay -->
        <div class="db-overlay"></div>

        <!-- Content -->
        <div class="${a}">
          <!-- Title -->
          ${t != null && t.banner_title ? i`
                <h2
                  class="db-title"
                  style="color: ${t.banner_text_color ?? "#fff"}"
                >
                  ${t.banner_title}
                </h2>
              ` : ""}

          <!-- Subtitle -->
          ${t != null && t.banner_subtitle ? i`
                <p
                  class="db-subtitle"
                  style="color: ${t.banner_text_color ?? "#fff"}"
                >
                  ${t.banner_subtitle}
                </p>
              ` : ""}

          <!-- Button -->
          ${t != null && t.banner_btn_text ? i`
                <a
                  href="#"
                  class="db-btn"
                  style="
                    background-color: ${t.banner_btn_bg_color ?? "#000"};
                    color: ${t.banner_btn_text_color ?? "#fff"};
                  "
                >
                  <span>${t.banner_btn_text}</span>

                  <span class="db-btn-icon"> ${this.isRtl ? "←" : "→"} </span>
                </a>
              ` : ""}
        </div>
      </div>
    `;
    return i`
      <section
        class="S_discount_banner"
        id="${n}"
        aria-label="Section ${n}"
        dir="${this.isRtl ? "rtl" : "ltr"}"
        data-notmrb="${t != null && t.notmrb ? "true" : "false"}"
      >
        ${t != null && t.has_container ? i` <div class="db-container">${d}</div> ` : d}
      </section>
    `;
  }
};
c.styles = m`
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
let r = c;
b([
  l({
    type: Object,
    converter: {
      fromAttribute: (o) => {
        if (o) {
          if (typeof o == "object") return o;
          try {
            return JSON.parse(o);
          } catch {
            return;
          }
        }
      }
    }
  })
], r.prototype, "config");
b([
  l({ type: String })
], r.prototype, "position");
b([
  l({ type: Boolean })
], r.prototype, "isRtl");
typeof r < "u" && r.registerSallaComponent("salla-discount-banner");
export {
  r as DiscountBanner
};
