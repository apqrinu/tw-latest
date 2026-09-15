import { LitElement as z, css as C, html as d } from "lit";
import { property as h } from "lit/decorators.js";
const g = "ar", j = /* @__PURE__ */ new Set(["ar", "he", "fa", "ur"]);
function u(e) {
  return !e || typeof e != "string" ? void 0 : e.trim().toLowerCase().split(/[-_]/)[0] || void 0;
}
function w() {
  var e, t, i, s, o, r, a, l, b, f, x, $, S;
  try {
    const n = globalThis.Salla ?? globalThis.salla, v = u(
      ((t = (e = n == null ? void 0 : n.lang) == null ? void 0 : e.getLocale) == null ? void 0 : t.call(e)) || ((s = (i = n == null ? void 0 : n.config) == null ? void 0 : i.get) == null ? void 0 : s.call(i, "user.language_code")) || ((r = (o = n == null ? void 0 : n.config) == null ? void 0 : o.get) == null ? void 0 : r.call(o, "user.language.code")) || ((l = (a = n == null ? void 0 : n.config) == null ? void 0 : a.get) == null ? void 0 : l.call(a, "user.language")) || ((f = (b = n == null ? void 0 : n.config) == null ? void 0 : b.get) == null ? void 0 : f.call(b, "store.language")) || ((x = n == null ? void 0 : n.lang) == null ? void 0 : x.locale) || (($ = n == null ? void 0 : n.config) == null ? void 0 : $.language)
    );
    if (v) return v;
  } catch {
  }
  if (typeof document < "u") {
    const n = u((S = document.documentElement) == null ? void 0 : S.lang);
    if (n) return n;
  }
  if (typeof navigator < "u") {
    const n = u(navigator.language);
    if (n) return n;
  }
  return g;
}
function k(e) {
  return j.has(u(e) ?? w());
}
function m(e, t) {
  const i = e[t];
  return typeof i == "string" && i !== "" ? i : void 0;
}
function p(e, t) {
  if (e == null) return;
  if (typeof e == "string") return e !== "" ? e : void 0;
  if (typeof e == "number" || typeof e == "boolean") return String(e);
  if (typeof e != "object") return;
  const i = u(t) ?? w(), s = m(e, i);
  if (s !== void 0) return s;
  if (i !== g) {
    const o = m(e, g);
    if (o !== void 0) return o;
  }
  for (const o of Object.keys(e)) {
    const r = m(e, o);
    if (r !== void 0) return r;
  }
}
var L = Object.defineProperty, y = (e, t, i, s) => {
  for (var o = void 0, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = a(t, i, o) || o);
  return o && L(t, i, o), o;
};
const _ = class _ extends z {
  constructor() {
    super(...arguments), this.position = "0";
  }
  /** Effective text direction: explicit prop wins, else the active language. */
  get _isRtl() {
    return this.isRtl ?? k();
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
    var i, s;
    if (t)
      return Array.isArray(t) ? ((i = t[0]) == null ? void 0 : i.value) ?? ((s = t[0]) == null ? void 0 : s.key) ?? t[0] : typeof t == "object" ? (t == null ? void 0 : t.value) ?? (t == null ? void 0 : t.key) : t;
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
      return d``;
    }
    const i = `S_discount_banner-${this.position}`, s = this._getSelectValue(
      t == null ? void 0 : t.content_position_h
    ), o = this._getSelectValue(
      t == null ? void 0 : t.content_position_v
    ), r = p(t == null ? void 0 : t.banner_title), a = p(t == null ? void 0 : t.banner_subtitle), l = p(t == null ? void 0 : t.banner_btn_text), b = [
      "db-content",
      this._horizontalClass(s),
      this._verticalClass(o)
    ].join(" "), f = d`
      <div class="db-banner">
        <!-- Background Image -->
        ${t != null && t.banner_image ? d`
              <img
                src="${t.banner_image}"
                alt="${r ?? "banner"}"
                class="db-bg"
              />
            ` : ""}

        <!-- Overlay -->
        <div class="db-overlay"></div>

        <!-- Content -->
        <div class="${b}">
          <!-- Title -->
          ${r ? d`
                <h2
                  class="db-title"
                  style="color: ${(t == null ? void 0 : t.banner_text_color) ?? "#fff"}"
                >
                  ${r}
                </h2>
              ` : ""}

          <!-- Subtitle -->
          ${a ? d`
                <p
                  class="db-subtitle"
                  style="color: ${(t == null ? void 0 : t.banner_text_color) ?? "#fff"}"
                >
                  ${a}
                </p>
              ` : ""}

          <!-- Button -->
          ${l ? d`
                <a
                  href="#"
                  class="db-btn"
                  style="
                    background-color: ${(t == null ? void 0 : t.banner_btn_bg_color) ?? "#000"};
                    color: ${(t == null ? void 0 : t.banner_btn_text_color) ?? "#fff"};
                  "
                >
                  <span>${l}</span>

                  <span class="db-btn-icon"> ${this._isRtl ? "←" : "→"} </span>
                </a>
              ` : ""}
        </div>
      </div>
    `;
    return d`
      <section
        class="S_discount_banner"
        id="${i}"
        aria-label="Section ${i}"
        dir="${this._isRtl ? "rtl" : "ltr"}"
        data-notmrb="${t != null && t.notmrb ? "true" : "false"}"
      >
        ${t != null && t.has_container ? d` <div class="db-container">${f}</div> ` : f}
      </section>
    `;
  }
};
_.styles = C`
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
let c = _;
y([
  h({
    type: Object,
    converter: {
      fromAttribute: (e) => {
        if (e) {
          if (typeof e == "object") return e;
          try {
            return JSON.parse(e);
          } catch {
            return;
          }
        }
      }
    }
  })
], c.prototype, "config");
y([
  h({ type: String })
], c.prototype, "position");
y([
  h({ type: Boolean })
], c.prototype, "isRtl");
typeof c < "u" && c.registerSallaComponent("salla-discount-banner");
export {
  c as DiscountBanner
};
