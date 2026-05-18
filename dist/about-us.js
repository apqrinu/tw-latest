import { LitElement as d, css as m, html as i } from "lit";
import { property as p } from "lit/decorators.js";
var c = Object.defineProperty, f = (o, e, s, g) => {
  for (var t = void 0, r = o.length - 1, l; r >= 0; r--)
    (l = o[r]) && (t = l(e, s, t) || t);
  return t && c(e, s, t), t;
};
const a = class a extends d {
  render() {
    const e = this.config;
    return i`
      <section class="section">
        <div class="${e != null && e.has_container ? "container" : ""}">
          <div class="wrapper">

            <!-- Image -->
            <div class="imageBox">
              ${e != null && e.img_overlay ? i`
                    <div
                      class="overlay"
                      style="
                        background-color:${(e == null ? void 0 : e.img_overlay_color) ?? "#000"};
                        opacity:${((e == null ? void 0 : e.img_overlay_opacity) ?? 50) / 100};
                      "
                    ></div>
                  ` : ""}

              ${e != null && e.banner_image ? i`
                    <img
                      class="image"
                      src="${e.banner_image}"
                      alt="${e.banner_title ?? ""}"
                      loading="lazy"
                    />
                  ` : ""}
            </div>

            <!-- Content -->
            <div class="content">
              ${e != null && e.banner_title ? i`<h2 class="title">${e.banner_title}</h2>` : ""}

              ${e != null && e.banner_description ? i`<p class="desc">${e.banner_description}</p>` : ""}

              ${e != null && e.banner_btn_text ? i`
                    <a
                      class="btn"
                      href="${(e == null ? void 0 : e.url) ?? "#"}"
                      style="
                        background:${e.banner_btn_bg_color ?? "#000"};
                        color:${e.banner_btn_text_color ?? "#fff"};
                        border:1.5px solid ${e.banner_btn_text_color ?? "#fff"};
                      "
                    >
                      ${e.banner_btn_text}
                    </a>
                  ` : ""}
            </div>

          </div>
        </div>
      </section>
    `;
  }
};
a.styles = m`
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
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
  `;
let n = a;
f([
  p({ type: Object })
], n.prototype, "config");
typeof n < "u" && n.registerSallaComponent("salla-about-us");
export {
  n as AboutUs
};
