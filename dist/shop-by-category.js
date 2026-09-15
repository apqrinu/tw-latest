import { LitElement as $, css as k, html as d } from "lit";
import { property as C } from "lit/decorators.js";
const m = "ar";
function f(n) {
  return !n || typeof n != "string" ? void 0 : n.trim().toLowerCase().split(/[-_]/)[0] || void 0;
}
function O() {
  var n, e, t, s, o, i, a, b, c, p, g, y, v;
  try {
    const r = globalThis.Salla ?? globalThis.salla, x = f(
      ((e = (n = r == null ? void 0 : r.lang) == null ? void 0 : n.getLocale) == null ? void 0 : e.call(n)) || ((s = (t = r == null ? void 0 : r.config) == null ? void 0 : t.get) == null ? void 0 : s.call(t, "user.language_code")) || ((i = (o = r == null ? void 0 : r.config) == null ? void 0 : o.get) == null ? void 0 : i.call(o, "user.language.code")) || ((b = (a = r == null ? void 0 : r.config) == null ? void 0 : a.get) == null ? void 0 : b.call(a, "user.language")) || ((p = (c = r == null ? void 0 : r.config) == null ? void 0 : c.get) == null ? void 0 : p.call(c, "store.language")) || ((g = r == null ? void 0 : r.lang) == null ? void 0 : g.locale) || ((y = r == null ? void 0 : r.config) == null ? void 0 : y.language)
    );
    if (x) return x;
  } catch {
  }
  if (typeof document < "u") {
    const r = f((v = document.documentElement) == null ? void 0 : v.lang);
    if (r) return r;
  }
  if (typeof navigator < "u") {
    const r = f(navigator.language);
    if (r) return r;
  }
  return m;
}
function u(n, e) {
  const t = n[e];
  return typeof t == "string" && t !== "" ? t : void 0;
}
function h(n, e) {
  if (n == null) return;
  if (typeof n == "string") return n !== "" ? n : void 0;
  if (typeof n == "number" || typeof n == "boolean") return String(n);
  if (typeof n != "object") return;
  const t = f(e) ?? O(), s = u(n, t);
  if (s !== void 0) return s;
  if (t !== m) {
    const o = u(n, m);
    if (o !== void 0) return o;
  }
  for (const o of Object.keys(n)) {
    const i = u(n, o);
    if (i !== void 0) return i;
  }
}
var B = Object.defineProperty, w = (n, e, t, s) => {
  for (var o = void 0, i = n.length - 1, a; i >= 0; i--)
    (a = n[i]) && (o = a(e, t, o) || o);
  return o && B(e, t, o), o;
};
const _ = class _ extends $ {
  constructor() {
    super(...arguments), this.position = "0";
  }
  // ─────────────────────────────────────────────
  // LIFECYCLE
  // ─────────────────────────────────────────────
  connectedCallback() {
    if (super.connectedCallback(), typeof this.config == "string")
      try {
        this.config = JSON.parse(this.config);
      } catch (e) {
        console.error("[shop-by-category] Failed to parse config:", e);
      }
  }
  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────
  _resolveLink(e) {
    return e ? typeof e == "string" ? e : typeof e == "object" ? e.url ?? e.href ?? e.value ?? "#" : "#" : "#";
  }
  // ─────────────────────────────────────────────
  // BUTTON
  // ─────────────────────────────────────────────
  _renderButton(e) {
    const t = h(e.banner_btn_txt);
    return t ? d`
      <a
        href="${this._resolveLink(e.banner_item_link)}"
        class="banner-btn"
        style="
          background-color: ${e.banner_btn_color};
          color: ${e.banner_btn_txt_color};
        "
      >
        ${t}
      </a>
    ` : "";
  }
  // ─────────────────────────────────────────────
  // PROMOTION
  // ─────────────────────────────────────────────
  _renderPromotion(e) {
    const t = h(e.banner_promotion_txt);
    return t ? d`
      <div class="promotion-wrap">
        <svg
          class="promotion-svg"
          viewBox="0 0 124 105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g style="mix-blend-mode:overlay">
            <path
              d="M7.70056 53.8731C21.7871 62.3595 20.5064 67.2875 5.8062 73.8935C23.5701 70.5075 29.7386 76.0398 22.1753 88.6641C37.953 79.761 43.7746 86.1731 44.045 101.676C49.5125 86.4939 64.9914 77.3623 80.6815 92.0834C82.0368 69.5489 96.7281 69.9582 110.663 75.5694C97.0499 63.747 99.7375 57.4955 116.495 54.2547C102.581 49.6458 107.073 41.6167 118.412 34.6042C103.684 38.8874 100.073 32.0725 106.629 20.3459C92.0429 26.4558 86.9817 19.8523 91.7157 7.41783C83.8109 19.6556 76.129 19.6966 71.7113 4.69822C63.7736 19.7394 55.8307 18.1462 49.967 5.23454C50.537 19.3191 44.8393 26.4958 30.5242 17.5657C34.8971 33.1762 28.1872 37.8119 13.4467 33.002C29.0986 43.8433 25.6204 50.7544 7.69983 53.8732L7.70056 53.8731Z"
              fill="#075F14"
            ></path>
          </g>

          <path
            d="M7.65628 50.2142C21.1386 59.634 19.5282 64.464 4.41476 70.0606C22.3668 67.884 28.148 73.8213 19.7506 85.9045C36.0927 78.0894 41.4688 84.8806 40.6922 100.366C47.1721 85.5885 63.2316 77.5254 77.8933 93.274C80.7662 70.883 95.396 72.285 108.921 78.826C96.1368 66.1105 99.2394 60.0543 116.178 57.9545C102.606 52.4148 107.63 44.7082 119.416 38.4791C104.433 41.7563 101.29 34.7122 108.622 23.4562C93.6574 28.566 89.0528 21.6345 94.6159 9.5489C85.9033 21.2239 78.2362 20.7451 74.8408 5.48235C65.9059 19.9515 58.0887 17.8255 53.1098 4.5465C52.7282 18.6368 46.5591 25.4121 32.8786 15.5339C36.1886 31.4043 29.1806 35.5756 14.7984 29.7796C29.6835 41.6546 25.746 48.3149 7.65628 50.2142Z"
            fill="white"
          ></path>
        </svg>

        <div class="promotion-content">
          <div class="promotion-text">
            <span
              style="
                color: ${e.banner_promotion_color};
              "
            >
              ${t}
            </span>
          </div>
        </div>
      </div>
    ` : "";
  }
  // ─────────────────────────────────────────────
  // CARD
  // ─────────────────────────────────────────────
  _renderCard(e, t, s) {
    var p, g;
    const o = h(e.banner_main_title), i = (p = e.B_banner_align_h) == null ? void 0 : p[0].value, a = (g = e.B_banner_align_v) == null ? void 0 : g[0].value, b = e.banner_image_switcher === !0, c = Number(this.position) < 3 && s === 0;
    return d`
      <div
        class="
          banner-card
          ${t.B_banner_overlay_sw ? "rounded" : ""}
        "
        style="
          --banner-align-h: ${i};
          --banner-align-v: ${a};
        "
      >
        <!-- Media -->
        ${b && e.banner_video ? d`
              <div class="shine" style="grid-area: 1/1;">
                <video
                  src="${e.banner_video}"
                  autoplay
                  muted
                  loop
                  playsinline
                  class="banner-video"
                ></video>
              </div>
            ` : e.banner_image ? d`
                <a
                  href="${this._resolveLink(e.banner_item_link)}"
                  class="shine"
                  rel="noopener noreferrer"
                  style="grid-area: 1/1;"
                >
                  <img
                    class="banner-image"
                    src="${e.banner_image}"
                    alt="${o ?? ""}"
                    loading="${c ? "eager" : "lazy"}"
                    fetchpriority="${c ? "high" : "auto"}"
                    decoding="async"
                  />
                </a>
              ` : ""}

        <!-- Overlay -->
        ${t.B_banner_overlay_sw ? d`
              <div
                class="
                  banner-overlay
                  ${t.B_banner_overlay_sw ? "rounded" : ""}
                "
                style="
                  background-color:
                  ${t.B_banner_overlay_color};

                  opacity:
                  ${(t.B_banner_color_opacity ?? 0) / 100};
                "
              ></div>
            ` : ""}

        <!-- Content -->
        <div
          class="banner-content"
          style="
            align-items: ${i};
            justify-content: ${a};
          "
        >
          ${o ? d`
                <h2
                  class="banner-title "
                  style="
                  text-align: ${i === "center" ? "center" : "left"};
                    color:
                    ${e.banner_main_title_color};
                  "
                >
                  ${o}
                </h2>
              ` : ""}
          ${this._renderButton(e)}
        </div>
      </div>
    `;
  }
  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  render() {
    const e = this.config;
    if (typeof e == "string") {
      try {
        this.config = JSON.parse(e);
      } catch {
      }
      return d``;
    }
    const t = (e == null ? void 0 : e.B_banner_sec_collection) ?? [], s = `B_shop_by_category-${this.position}`, o = t.length ? d`
          <div class="sbc-grid">
            ${t.map(
      (i, a) => this._renderCard(i, e ?? {}, a)
    )}
          </div>
        ` : "";
    return d`
      <section
        class="B_shop_by_category"
        id="${s}"
        aria-label="Section ${s}"
        data-notmrb="${e != null && e.notmrb ? "true" : "false"}"
      >
        ${e != null && e.has_container ? d` <div class="sbc-container">${o}</div> ` : o}
      </section>
    `;
  }
};
_.styles = k`
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

    /* ─────────────────────────────
       SECTION
    ───────────────────────────── */

    .B_shop_by_category {
      width: 100%;
    }

    .sbc-container {
      width: 100%;
      max-width: 1280px;

      margin: 0 auto;
      padding: 0 1rem;
    }

    /* ─────────────────────────────
       GRID
    ───────────────────────────── */

    .sbc-grid {
      display: grid;
      grid-template-columns: 1fr;

      gap: 1rem;
    }

    @media (min-width: 768px) {
      .sbc-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ─────────────────────────────
       CARD
    ───────────────────────────── */

    .banner-card {
      position: relative;

      display: grid;

      overflow: hidden;

      width: 100%;
    }

    .banner-card.rounded {
      border-radius: var(--border-radius-card, 1rem);
    }

    /* ─────────────────────────────
       SHINE
    ───────────────────────────── */

    .shine {
      position: relative;

      overflow: hidden;
    }

    .shine::before {
      content: "";

      position: absolute;

      top: -50%;
      left: -150%;

      width: 80%;
      height: 200%;

      background: linear-gradient(
        120deg,
        transparent 0%,
        transparent 30%,
        rgba(255, 255, 255, 0.08) 40%,
        rgba(255, 255, 255, 0.25) 50%,
        rgba(255, 255, 255, 0.08) 60%,
        transparent 70%,
        transparent 100%
      );

      transform: skewX(-25deg);

      pointer-events: none;

      z-index: 10;
    }

    .shine:hover::before {
      animation: shine-banner 1s ease;
    }

    @keyframes shine-banner {
      0% {
        left: -150%;
      }

      100% {
        left: 160%;
      }
    }

    /* ─────────────────────────────
       MEDIA
    ───────────────────────────── */

    .banner-image,
    .banner-video {
      width: 100%;
      height: 100%;

      display: block;

      object-fit: cover;
    }

    /* ─────────────────────────────
       OVERLAY
    ───────────────────────────── */

    .banner-overlay {
      grid-area: 1 / 1;

      pointer-events: none;
    }

    /* ─────────────────────────────
       CONTENT
    ───────────────────────────── */

    .banner-content {
      grid-area: 1 / 1;

      position: relative;
      z-index: 20;

      display: flex;
      flex-direction: column;

      gap: 1rem;

      padding: 1.5rem 1rem;

      pointer-events: none;
    }

    @media (min-width: 768px) {
      .banner-content {
        padding: 3rem 2rem;
      }
    }

    @media (min-width: 1024px) {
      .banner-content {
        padding: 5rem 4rem;
      }
    }

    /* ─────────────────────────────
       TITLE
    ───────────────────────────── */

    .banner-title {
      max-width: 24rem;

      margin: 0;

      font-size: 1.5rem;
      font-weight: 700;

      line-height: 1.3;

      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;

      overflow: hidden;
    }

    @media (min-width: 768px) {
      .banner-title {
        font-size: 1.875rem;
      }
    }

    /* ─────────────────────────────
       BUTTON
    ───────────────────────────── */

    .banner-btn {
      width: fit-content;

      display: inline-flex;
      align-items: center;
      justify-content: center;

      padding: 0.85rem 1.5rem;

      border-radius: var(--border-radius-btn, 9999px);

      font-size: 0.95rem;
      font-weight: 600;

      transition:
        transform 0.3s ease,
        opacity 0.3s ease;

      pointer-events: auto;
    }

    .banner-btn:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    /* ─────────────────────────────
       PROMOTION
    ───────────────────────────── */

    .promotion-wrap {
      position: relative;

      width: 124px;
      height: 105px;

      flex-shrink: 0;
    }

    .promotion-svg {
      position: absolute;
      inset: 0;

      width: 100%;
      height: 100%;
    }

    .promotion-content {
      position: absolute;
      inset: 0;
      z-index: 10;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .promotion-text {
      transform: rotate(-20deg);
    }

    .promotion-text span {
      display: block;

      text-align: center;
      white-space: nowrap;

      font-size: 0.75rem;
      font-weight: 700;

      line-height: 1.2;
    }
  `;
let l = _;
w([
  C({
    type: Object,
    converter: {
      fromAttribute: (n) => {
        if (n) {
          if (typeof n == "object") return n;
          try {
            return JSON.parse(n);
          } catch {
            return;
          }
        }
      }
    }
  })
], l.prototype, "config");
w([
  C({ type: String })
], l.prototype, "position");
typeof l < "u" && l.registerSallaComponent("salla-shop-by-category");
export {
  l as ShopByCategory
};
