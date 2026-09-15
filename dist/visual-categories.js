import { LitElement as _, css as $, html as f } from "lit";
import { property as w } from "lit/decorators.js";
const y = "ar";
function p(e) {
  return !e || typeof e != "string" ? void 0 : e.trim().toLowerCase().split(/[-_]/)[0] || void 0;
}
function k() {
  var e, r, i, n, o, s, a, u, c, d, l, h, x;
  try {
    const t = globalThis.Salla ?? globalThis.salla, b = p(
      ((r = (e = t == null ? void 0 : t.lang) == null ? void 0 : e.getLocale) == null ? void 0 : r.call(e)) || ((n = (i = t == null ? void 0 : t.config) == null ? void 0 : i.get) == null ? void 0 : n.call(i, "user.language_code")) || ((s = (o = t == null ? void 0 : t.config) == null ? void 0 : o.get) == null ? void 0 : s.call(o, "user.language.code")) || ((u = (a = t == null ? void 0 : t.config) == null ? void 0 : a.get) == null ? void 0 : u.call(a, "user.language")) || ((d = (c = t == null ? void 0 : t.config) == null ? void 0 : c.get) == null ? void 0 : d.call(c, "store.language")) || ((l = t == null ? void 0 : t.lang) == null ? void 0 : l.locale) || ((h = t == null ? void 0 : t.config) == null ? void 0 : h.language)
    );
    if (b) return b;
  } catch {
  }
  if (typeof document < "u") {
    const t = p((x = document.documentElement) == null ? void 0 : x.lang);
    if (t) return t;
  }
  if (typeof navigator < "u") {
    const t = p(navigator.language);
    if (t) return t;
  }
  return y;
}
function m(e, r) {
  const i = e[r];
  return typeof i == "string" && i !== "" ? i : void 0;
}
function L(e, r) {
  if (e == null) return;
  if (typeof e == "string") return e !== "" ? e : void 0;
  if (typeof e == "number" || typeof e == "boolean") return String(e);
  if (typeof e != "object") return;
  const i = p(r) ?? k(), n = m(e, i);
  if (n !== void 0) return n;
  if (i !== y) {
    const o = m(e, y);
    if (o !== void 0) return o;
  }
  for (const o of Object.keys(e)) {
    const s = m(e, o);
    if (s !== void 0) return s;
  }
}
var j = Object.defineProperty, A = (e, r, i, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(r, i, o) || o);
  return o && j(r, i, o), o;
};
const v = class v extends _ {
  _align(r) {
    switch (r) {
      case "start":
        return "flex-start";
      case "center":
        return "center";
      default:
        return "flex-end";
    }
  }
  _textAlign(r) {
    switch (r) {
      case "start":
        return "left";
      case "center":
        return "center";
      default:
        return "right";
    }
  }
  render() {
    const r = this.config, i = (r == null ? void 0 : r.items) ?? [];
    return f`
      <section class="section">
        <div class="${r != null && r.has_container ? "container" : ""}">
          <div class="grid">
            ${i.map((n) => {
      var d, l;
      const o = ((l = (d = n == null ? void 0 : n.text_position) == null ? void 0 : d[0]) == null ? void 0 : l.value) ?? "end", s = L(n == null ? void 0 : n.title), a = this._align(o), u = this._textAlign(o), c = ((n == null ? void 0 : n.img_overlay_opacity) ?? 50) / 100;
      return f`
                <a class="card" href="${n.url ?? "#"}">
                  ${n.image ? f`<img class="img" src="${n.image}" />` : f`<div class="img"></div>`}
                  ${n.img_overlay ? f`
                        <div
                          class="overlay"
                          style="
                            background:${n.img_overlay_color ?? "#000"};
                            opacity:${c};
                          "
                        ></div>
                      ` : ""}

                  <div
                    class="content"
                    style="
                      display:flex;
                      flex-direction:column;
                      align-items:${a};
                      text-align:${u};
                    "
                  >
                    <h2
                      class="title"
                      style="color:${n.text_color ?? "#fff"}"
                    >
                      ${s ?? ""}
                    </h2>

                    ${n.count ? f`
                          <span
                            class="count"
                            style="color:${n.text_color ?? "#fff"}"
                          >
                            ${n.count}
                          </span>
                        ` : ""}
                  </div>
                </a>
              `;
    })}
          </div>
        </div>
      </section>
    `;
  }
};
v.styles = $`
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

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    @media (min-width: 640px) {
      .grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: repeat(5, minmax(0, 1fr));
      }
    }

    .card {
      position: relative;
      display: block;
      overflow: hidden;
      border-radius: 16px;
      aspect-ratio: 3 / 5;
      cursor: pointer;
    }

    .img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s ease;
    }

    .card:hover .img {
      transform: scale(1.1);
    }

    .overlay {
      position: absolute;
      inset: 0;
      transition: opacity 0.5s;
    }

    .content {
      position: absolute;
      bottom: 0;
      inset-inline: 0;
      padding: 1rem;
    }

    .title {
      font-weight: 700;
      font-size: 1.125rem;
      transition: transform 0.7s;
      margin: 0;
    }

    .card:hover .title {
      transform: translateY(-4px);
    }

    .count {
      display: inline-block;
      font-size: 0.875rem;
      opacity: 0;
      transform: translateY(8px);
      transition: 0.5s;
    }

    .card:hover .count {
      opacity: 1;
      transform: translateY(0);
    }
  `;
let g = v;
A([
  w({ type: Object })
], g.prototype, "config");
typeof g < "u" && g.registerSallaComponent("salla-visual-categories");
export {
  g as VisualCategories
};
