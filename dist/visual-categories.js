import { LitElement as m, css as u, html as i } from "lit";
import { property as v } from "lit/decorators.js";
import { l as h } from "./localizedString-8Sg-A_T6.js";
var y = Object.defineProperty, x = (c, r, s, t) => {
  for (var e = void 0, n = c.length - 1, o; n >= 0; n--)
    (o = c[n]) && (e = o(r, s, e) || e);
  return e && y(r, s, e), e;
};
const l = class l extends m {
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
    const r = this.config, s = (r == null ? void 0 : r.items) ?? [];
    return i`
      <section class="section">
        <div class="${r != null && r.has_container ? "container" : ""}">
          <div class="grid">
            ${s.map((t) => {
      var d, p;
      const e = ((p = (d = t == null ? void 0 : t.text_position) == null ? void 0 : d[0]) == null ? void 0 : p.value) ?? "end", n = h(t == null ? void 0 : t.title), o = this._align(e), f = this._textAlign(e), g = ((t == null ? void 0 : t.img_overlay_opacity) ?? 50) / 100;
      return i`
                <a class="card" href="${t.url ?? "#"}">
                  ${t.image ? i`<img class="img" src="${t.image}" />` : i`<div class="img"></div>`}
                  ${t.img_overlay ? i`
                        <div
                          class="overlay"
                          style="
                            background:${t.img_overlay_color ?? "#000"};
                            opacity:${g};
                          "
                        ></div>
                      ` : ""}

                  <div
                    class="content"
                    style="
                      display:flex;
                      flex-direction:column;
                      align-items:${o};
                      text-align:${f};
                    "
                  >
                    <h2
                      class="title"
                      style="color:${t.text_color ?? "#fff"}"
                    >
                      ${n ?? ""}
                    </h2>

                    ${t.count ? i`
                          <span
                            class="count"
                            style="color:${t.text_color ?? "#fff"}"
                          >
                            ${t.count}
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
l.styles = u`
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
let a = l;
x([
  v({ type: Object })
], a.prototype, "config");
typeof a < "u" && a.registerSallaComponent("salla-visual-categories");
export {
  a as VisualCategories
};
