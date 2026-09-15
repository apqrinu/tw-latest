import { LitElement as w, css as $, html as f } from "lit";
import { property as z } from "lit/decorators.js";
const p = "ar";
function g(n) {
  return !n || typeof n != "string" ? void 0 : n.trim().toLowerCase().split(/[-_]/)[0] || void 0;
}
function k() {
  var n, e, i, r, o, a, s, b, d, x, h, y, _;
  try {
    const t = globalThis.Salla ?? globalThis.salla, v = g(
      ((e = (n = t == null ? void 0 : t.lang) == null ? void 0 : n.getLocale) == null ? void 0 : e.call(n)) || ((r = (i = t == null ? void 0 : t.config) == null ? void 0 : i.get) == null ? void 0 : r.call(i, "user.language_code")) || ((a = (o = t == null ? void 0 : t.config) == null ? void 0 : o.get) == null ? void 0 : a.call(o, "user.language.code")) || ((b = (s = t == null ? void 0 : t.config) == null ? void 0 : s.get) == null ? void 0 : b.call(s, "user.language")) || ((x = (d = t == null ? void 0 : t.config) == null ? void 0 : d.get) == null ? void 0 : x.call(d, "store.language")) || ((h = t == null ? void 0 : t.lang) == null ? void 0 : h.locale) || ((y = t == null ? void 0 : t.config) == null ? void 0 : y.language)
    );
    if (v) return v;
  } catch {
  }
  if (typeof document < "u") {
    const t = g((_ = document.documentElement) == null ? void 0 : _.lang);
    if (t) return t;
  }
  if (typeof navigator < "u") {
    const t = g(navigator.language);
    if (t) return t;
  }
  return p;
}
function l(n, e) {
  const i = n[e];
  return typeof i == "string" && i !== "" ? i : void 0;
}
function m(n, e) {
  if (n == null) return;
  if (typeof n == "string") return n !== "" ? n : void 0;
  if (typeof n == "number" || typeof n == "boolean") return String(n);
  if (typeof n != "object") return;
  const i = g(e) ?? k(), r = l(n, i);
  if (r !== void 0) return r;
  if (i !== p) {
    const o = l(n, p);
    if (o !== void 0) return o;
  }
  for (const o of Object.keys(n)) {
    const a = l(n, o);
    if (a !== void 0) return a;
  }
}
var L = Object.defineProperty, j = (n, e, i, r) => {
  for (var o = void 0, a = n.length - 1, s; a >= 0; a--)
    (s = n[a]) && (o = s(e, i, o) || o);
  return o && L(e, i, o), o;
};
const u = class u extends w {
  render() {
    const e = this.config, i = m(e == null ? void 0 : e.banner_title), r = m(e == null ? void 0 : e.banner_description), o = m(e == null ? void 0 : e.banner_btn_text);
    return f`
      <section class="section">
        <div class="${e != null && e.has_container ? "container" : ""}">
          <div class="wrapper">
            <!-- Image -->
            <div class="imageBox">
              ${e != null && e.img_overlay ? f`
                    <div
                      class="overlay"
                      style="
                        background-color:${(e == null ? void 0 : e.img_overlay_color) ?? "#000"};
                        opacity:${((e == null ? void 0 : e.img_overlay_opacity) ?? 50) / 100};
                      "
                    ></div>
                  ` : ""}
              ${e != null && e.banner_image ? f`
                    <img
                      class="image"
                      src="${e.banner_image}"
                      alt="${i ?? ""}"
                      loading="lazy"
                    />
                  ` : ""}
            </div>

            <!-- Content -->
            <div class="content">
              ${i ? f`<h2 class="title">${i}</h2>` : ""}
              ${r ? f`<p class="desc">${r}</p>` : ""}
              ${e != null && e.banner_btn_text ? f`
                    <a
                      class="btn"
                      href="${(e == null ? void 0 : e.url) ?? "#"}"
                      style="
                        background:${e.banner_btn_bg_color ?? "#000"};
                        color:${e.banner_btn_text_color ?? "#fff"};
                        border:1.5px solid ${e.banner_btn_text_color ?? "#fff"};
                      "
                    >
                      ${o}
                    </a>
                  ` : ""}
            </div>
          </div>
        </div>
      </section>
    `;
  }
};
u.styles = $`
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
      width: 100%;
      gap: 2.5rem;
      align-items: center;
      justify-content: space-between;
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
      align-items: center;
    }

    @media (min-width: 1024px) {
      .content {
        text-align: right;
        align-items: flex-start;
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
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  `;
let c = u;
j([
  z({ type: Object })
], c.prototype, "config");
typeof c < "u" && c.registerSallaComponent("salla-about-us");
export {
  c as AboutUs
};
