import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

type ProductPoint = {
  product: number[];
  x: number;
  y: number;
};

export class ProductSet extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    @media (max-width: 991px) {
      .wrapper {
        grid-template-columns: 1fr;
      }
    }

    .image-container {
      position: sticky;
      top: 90px;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      border-radius: 20px;
      background: #f5f5f5;
    }

    @media (max-width: 991px) {
      .image-container {
        position: relative;
        top: auto;
      }
    }

    .main-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .point-wrapper {
      position: absolute;
      transform: translate(-50%, 50%);
      z-index: 3;
      cursor: pointer;
    }

    .point {
      width: 32px;
      height: 32px;
      border-radius: 999px;
      background: #fff;
      color: #111;
      border: 2px solid rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      transition: 0.3s ease;
    }

    .point:hover,
    .point.active {
      transform: scale(1.1);
      background: #111;
      color: #fff;
    }

    .right-side {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .header {
      text-align: center;
    }

    .title {
      margin: 0;
      font-size: 32px;
      line-height: 1.3;
      font-weight: 700;
    }

    .sub-text {
      margin-top: 10px;
      opacity: 0.7;
      line-height: 1.7;
      font-size: 15px;
    }

    .products-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-height: 400px;
    }

    .product-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px;
      border: 1px solid #eee;
      border-radius: 16px;
      transition: 0.3s ease;
      background: #fff;
    }

    .product-card.active {
      border-color: #111;
      box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08);
    }

    .product-image {
      width: 90px;
      height: 90px;
      object-fit: cover;
      border-radius: 12px;
      background: #f5f5f5;
    }

    .product-info {
      flex: 1;
    }

    .product-title {
      margin: 0 0 8px;
      font-size: 16px;
      font-weight: 600;
    }

    .product-price {
      font-size: 14px;
      opacity: 0.75;
    }

    .add-all-btn {
      width: 100%;
      border: none;
      padding: 14px 20px;
      border-radius: 14px;
      background: #111;
      color: #fff;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: 0.3s ease;
    }

    .add-all-btn:hover {
      opacity: 0.9;
    }

    .skeleton {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .skeleton-item {
      height: 100px;
      border-radius: 16px;
      background: #eee;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0% {
        opacity: 0.5;
      }

      50% {
        opacity: 1;
      }

      100% {
        opacity: 0.5;
      }
    }
  `;

  @property({ type: String })
  mainImage = "";

  @property({ type: String })
  mainTitle = "";

  @property({ type: String })
  subText = "";

  @property({ type: Array })
  productsList: ProductPoint[] = [];

  @property({ type: Array })
  products: any[] = [];

  @state()
  private activeIndex = 0;

  private handlePointClick(index: number, productId: number) {
    this.activeIndex = index;

    if (window?.productDrawer) {
      window.productDrawer.openProduct(productId);
    }
  }

  private renderPoints() {
    return this.productsList.map((item, index) => {
      const safeY = Math.min(97, Math.max(0.5, item.y));

      const safeX = Math.min(99.5, Math.max(3, item.x));

      return html`
        <div
          class="point-wrapper"
          style="
            bottom:${safeY}%;
            left:${safeX}%;
          "
          @click=${() =>
            this.handlePointClick(
              index,
              item.product[0]
            )}
        >
          <div
            class="point ${this.activeIndex === index
              ? "active"
              : ""}"
          >
            ${index + 1}
          </div>
        </div>
      `;
    });
  }

  private renderProducts() {
    if (!this.products?.length) {
      return html`
        <div class="skeleton">
          <div class="skeleton-item"></div>
          <div class="skeleton-item"></div>
          <div class="skeleton-item"></div>
        </div>
      `;
    }

    return this.products.map((product, index) => {
      return html`
        <div
          class="product-card ${this.activeIndex === index
            ? "active"
            : ""}"
        >
          <img
            class="product-image"
            src=${product.image}
            alt=${product.name}
          />

          <div class="product-info">
            <h3 class="product-title">
              ${product.name}
            </h3>

            <div class="product-price">
              ${product.price}
            </div>
          </div>
        </div>
      `;
    });
  }

  render() {
    return html`
      <section>
        <div class="wrapper">
          <div class="image-container">
            ${this.renderPoints()}

            <img
              class="main-image"
              src=${this.mainImage}
              alt=${this.mainTitle}
            />
          </div>

          <div class="right-side">
            <div class="header">
              ${this.mainTitle
                ? html`
                    <h2 class="title">
                      ${this.mainTitle}
                    </h2>
                  `
                : null}

              ${this.subText
                ? html`
                    <p class="sub-text">
                      ${this.subText}
                    </p>
                  `
                : null}
            </div>

            <div class="products-container">
              ${this.renderProducts()}
            </div>

            <button class="add-all-btn">
              إضافة الكل للسلة
            </button>
          </div>
        </div>
      </section>
    `;
  }
}

/*
لا تعمل customElements.define
لأن Salla بتسجل الـ component تلقائيًا
*/