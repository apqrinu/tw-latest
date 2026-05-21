import { LitElement as c, css as p, html as n } from "lit";
import { property as f } from "lit/decorators.js";
import { l as s } from "./localizedString-8Sg-A_T6.js";
var g = Object.defineProperty, x = (d, e, i, o) => {
  for (var t = void 0, a = d.length - 1, m; a >= 0; a--)
    (m = d[a]) && (t = m(e, i, t) || t);
  return t && g(e, i, t), t;
};
const l = class l extends c {
  render() {
    const e = this.config, i = s(e == null ? void 0 : e.banner_title), o = s(e == null ? void 0 : e.banner_description), t = s(e == null ? void 0 : e.banner_btn_text);
    return n`
      <section class="section">
        <div class="${e != null && e.has_container ? "container" : ""}">
          <div class="wrapper">
            <!-- Image -->
            <div class="imageBox">
              ${e != null && e.img_overlay ? n`
                    <div
                      class="overlay"
                      style="
                        background-color:${(e == null ? void 0 : e.img_overlay_color) ?? "#000"};
                        opacity:${((e == null ? void 0 : e.img_overlay_opacity) ?? 50) / 100};
                      "
                    ></div>
                  ` : ""}
              ${e != null && e.banner_image ? n`
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
              ${i ? n`<h2 class="title">${i}</h2>` : ""}
              ${o ? n`<p class="desc">${o}</p>` : ""}
              ${e != null && e.banner_btn_text ? n`
                    <a
                      class="btn"
                      href="${(e == null ? void 0 : e.url) ?? "#"}"
                      style="
                        background:${e.banner_btn_bg_color ?? "#000"};
                        color:${e.banner_btn_text_color ?? "#fff"};
                        border:1.5px solid ${e.banner_btn_text_color ?? "#fff"};
                      "
                    >
                      ${t}
                    </a>
                  ` : ""}
            </div>
          </div>
        </div>
      </section>
    `;
  }
};
l.styles = p`
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
let r = l;
x([
  f({ type: Object })
], r.prototype, "config");
typeof r < "u" && r.registerSallaComponent("salla-about-us");
export {
  r as AboutUs
};
