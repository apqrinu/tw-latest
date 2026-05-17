import { css, html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";

// ============================================
// TYPES
// ============================================

type IconType = "icon_value" | "img_value" | string;

interface FeatureItem {
  "W_selected_product_feature_collection.selected_product_feature_txt_color"?: string;
  "W_selected_product_feature_collection.selected_product_feature_bg_color"?: string;
  "W_selected_product_feature_collection.selected_product_image_icon"?: [IconType] | string;
  "W_selected_product_feature_collection.selected_product_image_icon_btn"?: string;
  "W_selected_product_feature_collection.selected_product_img_btn"?: string;
  "W_selected_product_feature_collection.selected_product_feature_title"?: string;
  [key: string]: any;
}

interface ComponentConfig {
  notmrb?: boolean;
  has_container?: boolean;

  selected_product_title?: string;
  selected_product_description?: string;
  selected_product_img?: string;
  selected_product_item_link?: string;

  selected_product_btn_txt?: string;
  selected_product_btn_color?: string;
  selected_product_btn_txt_color?: string;

  selected_product_feature_collection?: FeatureItem[];

  [key: string]: any;
}

// Role applied to each badge
type BadgeRole = "left" | "right" | "top" | "mobile";

// ============================================
// COMPONENT
// ============================================

export class SelectedProduct extends LitElement {

  @property({
    type: Object,
    converter: {
      fromAttribute: (value: string | null) => {
        if (!value) return undefined;
        if (typeof value === "object") return value;
        try {
          return JSON.parse(value);
        } catch {
          return undefined;
        }
      },
    },
  })
  config?: ComponentConfig;

  @property({ type: String })
  position: string = "0";

  @property({ type: Boolean })
  isRtl: boolean = false;

  // ─────────────────────────────────────────────
  // LIFECYCLE
  // ─────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    if (typeof this.config === "string") {
      try {
        this.config = JSON.parse(this.config as any);
      } catch (e) {
        console.error("[selected-product] Failed to parse config:", e);
      }
    }
  }

  // ─────────────────────────────────────────────
  // STYLES
  // ─────────────────────────────────────────────

  static styles = css`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    a {
      text-decoration: none;
    }

    :host {
      display: block;
    }

    /* ── Section ── */
    .W_selected_product {
      width: 100%;
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }

    /* ── Container ── */
    .sp-container {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    /* ── Header ── */
    .sp-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .sp-title {
      color: var(--color-text-primary, #1a1a1a);
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }

    .sp-description {
      color: var(--color-text-secondary, #555);
      margin: 0.5rem 1.25rem 0;
      font-size: 1rem;
    }

    /* ════════════════════════════════
       DESKTOP LAYOUT
       ════════════════════════════════ */
    .sp-desktop {
      display: none;
    }

    @media (min-width: 768px) {
      .sp-desktop {
        display: block;
      }
    }

    /* Top badge row */
    .sp-top-row {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    /* Three-column row */
    .sp-columns {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .sp-columns--single {
      flex-direction: column;
      justify-content: center;
    }

    .sp-columns--sides {
      justify-content: space-between;
    }

    .sp-columns--center {
      justify-content: center;
    }

    /* Left / Right columns */
    .sp-col-left {
      display: flex;
      flex-direction: column;
      gap: 4rem;
      flex: 1;
      align-items: flex-end;
    }

    .sp-col-right {
      display: flex;
      flex-direction: column;
      gap: 4rem;
      flex: 1;
      align-items: flex-start;
    }

    /* Product image link — desktop */
    .sp-img-link {
      display: block;
      flex-shrink: 0;
      position: relative;
      z-index: 10;
    }

    .sp-img-link--single {
      width: 60%;
      max-width: 24rem;
    }

    .sp-img-link--multi {
      width: 40%;
      max-width: 24rem;
    }

    .sp-img {
      width: 100%;
      height: auto;
      display: block;
    }

    /* ════════════════════════════════
       MOBILE LAYOUT
       ════════════════════════════════ */
    .sp-mobile {
      display: block;
    }

    @media (min-width: 768px) {
      .sp-mobile {
        display: none;
      }
    }

    .sp-mobile-img-wrap {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .sp-mobile-img-link {
      display: block;
      width: 80%;
      max-width: 24rem;
    }

    .sp-mobile-badges {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
      padding: 0 0.5rem;
    }

    /* ════════════════════════════════
       BADGE
       ════════════════════════════════ */
    .W_badge {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: default;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      will-change: transform;
      transition:
        transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.3s ease;
      padding: 0.5rem 0.75rem;
      gap: 0.25rem;
    }

    @media (min-width: 1024px) {
      .W_badge {
        padding: 18px;
        font-size: 0.875rem;
        gap: 0.5rem;
      }
    }

    /* ── Directional hover ── */
    .W_badge[data-role="left"]:hover {
      transform: translateX(-15px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
    }

    .W_badge[data-role="right"]:hover {
      transform: translateX(15px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
    }

    .W_badge[data-role="top"]:hover {
      transform: translateY(-6px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    }

    /* ── Left pseudo-element decorators ── */
    .W_badge[data-role="left"]::before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--bg-feature);
      z-index: -1;
    }

    .W_badge[data-role="left"]::after {
      content: "";
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--bg-feature);
      z-index: -1;
    }

    /* ── Right pseudo-element decorators ── */
    .W_badge[data-role="right"]::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--bg-feature);
      z-index: -1;
    }

    .W_badge[data-role="right"]::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: -10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--bg-feature);
      z-index: -1;
    }

    /* ── Top pseudo-element decorators ── */
    .W_badge[data-role="top"]::before {
      content: "";
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--bg-feature);
      z-index: -1;
    }

    .W_badge[data-role="top"]::after {
      content: "";
      position: absolute;
      bottom: -26px;
      left: 50%;
      transform: translateX(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--bg-feature);
      z-index: -1;
    }

    /* ── Mid margin — block direction ── */
    .W_badge[data-role="left"][data-mid="true"][data-mid-dir="block"],
    .W_badge[data-role="right"][data-mid="true"][data-mid-dir="block"] {
      margin-block: 50px;
    }

    /* ── Mid margin — inline direction ── */
    .W_badge[data-role="left"][data-mid="true"][data-mid-dir="inline"] {
      margin-block: 0;
      margin-inline-end: 60px;
    }

    .W_badge[data-role="right"][data-mid="true"][data-mid-dir="inline"] {
      margin-block: 0;
      margin-inline-start: 60px;
    }

    /* ── Badge icon / image ── */
    .W_badge-icon {
      flex-shrink: 0;
    }

    .W_badge-img {
      object-fit: contain;
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }

    /* ════════════════════════════════
       CTA BUTTON
       ════════════════════════════════ */
    .sp-cta-wrap {
      display: flex;
      justify-content: center;
      margin-top: 2.5rem;
    }

    .W_cta-btn {
      position: relative;
      overflow: hidden;
      display: inline-block;
      padding: 0.75rem 3rem;
      border-radius: var(--border-radius-btn, 9999px);
      font-weight: 600;
      font-size: 1rem;
      text-align: center;
      transition: color 0.8s ease;
      z-index: 1;
    }

    .W_cta-btn::before {
      content: "";
      position: absolute;
      bottom: -100%;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--btn-txt);
      transition: bottom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: -1;
    }

    .W_cta-btn:hover::before {
      bottom: 0;
    }

    .W_cta-btn:hover {
      color: var(--btn-bg) !important;
    }

    /* ════════════════════════════════
       MOBILE OVERRIDES
       ════════════════════════════════ */
    @media (max-width: 767px) {
      .W_badge::before,
      .W_badge::after {
        content: unset;
      }

      .W_badge:hover {
        transform: none;
        box-shadow: none;
      }

      .W_badge[data-mid="true"][data-mid-dir="block"] {
        margin-block: 0;
      }

      .W_badge[data-mid="true"][data-mid-dir="inline"] {
        margin-inline: 0;
      }
    }
  `;

  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────

  /**
   * Read a field from a FeatureItem, trying the prefixed key first then
   * the plain key as a fallback (mirrors the reference component's _get).
   */
  private _get(item: FeatureItem, key: string): any {
    const prefixed = item[`W_selected_product_feature_collection.${key}`];
    if (prefixed !== undefined && prefixed !== null && prefixed !== "") return prefixed;
    const plain = (item as any)[key];
    if (plain !== undefined && plain !== null && plain !== "") return plain;
    return undefined;
  }

  /** Resolve a link value that may be a string or an object. */
  private _resolveLink(val: any): string {
    if (!val) return "#";
    if (typeof val === "string") return val;
    if (typeof val === "object") return val.url ?? val.href ?? val.value ?? "#";
    return "#";
  }

  /**
   * Compute the mid-direction attribute.
   * "inline" when count === 6 (horizontal push), "block" otherwise.
   */
  private _midDir(isMid: boolean, totalCount: number): string {
    return isMid && totalCount === 6 ? "inline" : "block";
  }

  // ─────────────────────────────────────────────
  // BADGE RENDERER  (replaces the Twig macro)
  // ─────────────────────────────────────────────

  private _renderBadge(
    feature: FeatureItem,
    role: BadgeRole,
    index: number,
    isMid: boolean,
    totalCount: number
  ): TemplateResult {
    const txtColor = this._get(feature, "selected_product_feature_txt_color") ?? "#000";
    const bgColor  = this._get(feature, "selected_product_feature_bg_color")  ?? "#fff";
    const title    = this._get(feature, "selected_product_feature_title")      ?? "";
    const midDir   = this._midDir(isMid, totalCount);

    // Icon vs image
    const iconType  = this._get(feature, "selected_product_image_icon");
    const isIcon    = Array.isArray(iconType)
      ? iconType[0] === "icon_value"
      : iconType === "icon_value";

    const iconClass = this._get(feature, "selected_product_image_icon_btn") ?? "";
    const imgSrc    = this._get(feature, "selected_product_img_btn") ?? "";

    return html`
      <div
        class="W_badge"
        data-role="${role}"
        data-index="${index}"
        data-mid="${isMid ? "true" : "false"}"
        data-mid-dir="${midDir}"
        style="
          color: ${txtColor};
          background-color: ${bgColor};
          --bg-feature: ${bgColor};
        "
      >
        ${isIcon
          ? html`<span class="${iconClass} W_badge-icon"></span>`
          : html`<img
              src="${imgSrc}"
              alt="${title}"
              class="W_badge-img"
            />`
        }
        <span>${title}</span>
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // LAYOUT COMPUTATION  (mirrors Twig logic)
  // ─────────────────────────────────────────────

  private _computeLayout(features: FeatureItem[]) {
    const count     = features.length;
    const isSingle  = count === 1;
    const isOdd     = count > 1 && count % 2 !== 0;

    // Top / center badge — only for odd counts > 1
    const topBadge: FeatureItem | null = isOdd ? features[0] : null;

    // Pool entering the left/right split
    const pool: FeatureItem[] = isSingle
      ? []
      : isOdd
        ? features.slice(1)
        : features;

    const half  = Math.floor(pool.length / 2);
    const left  = pool.slice(0, half);
    const right = pool.slice(half);

    const leftMid  = left.length  > 0 ? Math.floor((left.length  - 1) / 2) : -1;
    const rightMid = right.length > 0 ? Math.floor((right.length - 1) / 2) : -1;

    const hasSides = left.length > 0 || right.length > 0;

    return { count, isSingle, topBadge, left, right, leftMid, rightMid, hasSides };
  }

  // ─────────────────────────────────────────────
  // DESKTOP LAYOUT
  // ─────────────────────────────────────────────

  private _renderDesktop(
    features: FeatureItem[],
    productLink: string,
    productImg: string,
    productTitle: string
  ): TemplateResult {
    const { count, isSingle, topBadge, left, right, leftMid, rightMid, hasSides } =
      this._computeLayout(features);

    // Column modifier class
    const columnsClass = isSingle
      ? "sp-columns sp-columns--single"
      : hasSides
        ? "sp-columns sp-columns--sides"
        : "sp-columns sp-columns--center";

    // Image size class
    const imgClass = isSingle ? "sp-img-link sp-img-link--single" : "sp-img-link sp-img-link--multi";

    return html`
      <div class="sp-desktop">

        <!-- Top badge row -->
        ${(topBadge || isSingle) ? html`
          <div class="sp-top-row">
            ${this._renderBadge(
              isSingle ? features[0] : topBadge!,
              "top",
              0,
              true,
              count
            )}
          </div>
        ` : ""}

        <!-- Three-column row -->
        <div class="${columnsClass}">

          <!-- Left column -->
          ${left.length > 0 ? html`
            <div class="sp-col-left">
              ${left.map((f, i) =>
                this._renderBadge(f, "left", i, i === leftMid, count)
              )}
            </div>
          ` : ""}

          <!-- Product image -->
          <a href="${productLink}" class="${imgClass}">
            <img
              src="${productImg}"
              alt="${productTitle}"
              class="sp-img"
            />
          </a>

          <!-- Right column -->
          ${right.length > 0 ? html`
            <div class="sp-col-right">
              ${right.map((f, i) =>
                this._renderBadge(f, "right", i, i === rightMid, count)
              )}
            </div>
          ` : ""}

        </div>
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // MOBILE LAYOUT
  // ─────────────────────────────────────────────

  private _renderMobile(
    features: FeatureItem[],
    productLink: string,
    productImg: string,
    productTitle: string
  ): TemplateResult {
    return html`
      <div class="sp-mobile">

        <!-- Product image -->
        <div class="sp-mobile-img-wrap">
          <a href="${productLink}" class="sp-mobile-img-link">
            <img src="${productImg}" alt="${productTitle}" class="sp-img" />
          </a>
        </div>

        <!-- All badges in a wrapping row -->
        ${features.length > 0 ? html`
          <div class="sp-mobile-badges">
            ${features.map((f, i) =>
              this._renderBadge(f, "mobile", i, false, features.length)
            )}
          </div>
        ` : ""}

      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────

  render() {
    const cfg = this.config;

    // Safety re-parse if still a string at render time
    if (typeof cfg === "string") {
      try {
        this.config = JSON.parse(cfg as any);
      } catch { /* ignore */ }
      return html``;
    }

    const sectionId   = `W_selected_product-${this.position}`;
    const features    = cfg?.selected_product_feature_collection ?? [];
    const productLink = this._resolveLink(cfg?.selected_product_item_link);
    const productImg  = cfg?.selected_product_img ?? "";
    const productTitle = cfg?.selected_product_title ?? "";

    const innerContent = html`

      <!-- Header -->
      ${(cfg?.selected_product_title || cfg?.selected_product_description) ? html`
        <div class="sp-header">
          ${cfg?.selected_product_title
            ? html`<h2 class="sp-title">${cfg.selected_product_title}</h2>`
            : ""}
          ${cfg?.selected_product_description
            ? html`<p class="sp-description">${cfg.selected_product_description}</p>`
            : ""}
        </div>
      ` : ""}

      <!-- Desktop layout -->
      ${this._renderDesktop(features, productLink, productImg, productTitle)}

      <!-- Mobile layout -->
      ${this._renderMobile(features, productLink, productImg, productTitle)}

      <!-- CTA -->
      ${cfg?.selected_product_btn_txt ? html`
        <div class="sp-cta-wrap">
          <a
            href="${productLink}"
            class="W_cta-btn"
            style="
              --btn-bg: ${cfg.selected_product_btn_color ?? "#000"};
              --btn-txt: ${cfg.selected_product_btn_txt_color ?? "#fff"};
              background-color: var(--btn-bg);
              color: var(--btn-txt);
              border: 2px solid var(--btn-bg);
            "
          >
            ${cfg.selected_product_btn_txt}
          </a>
        </div>
      ` : ""}

    `;

    return html`
      <section
        class="W_selected_product"
        id="${sectionId}"
        aria-label="Section ${sectionId}"
        dir="${this.isRtl ? "rtl" : "ltr"}"
        data-notmrb="${cfg?.notmrb ? "true" : "false"}"
      >
        ${cfg?.has_container
          ? html`<div class="sp-container">${innerContent}</div>`
          : innerContent}
      </section>
    `;
  }
}