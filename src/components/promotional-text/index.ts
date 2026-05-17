import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

interface ComponentConfig {
  notmrb?: boolean;
  has_container?: boolean;

  section_bg_color?: string;
  section_text_color?: string;
  section_text_color_to?: string;
  section_text?: string;
  section_image_s?: boolean;
  section_image?: string;

  [key: string]: any;
}

export class PromotionalText extends LitElement {
  @property({ type: Object })
  config?: ComponentConfig;

  private sectionEl?: HTMLElement;
  private promoEl?: HTMLElement;
  private fillEl?: HTMLElement;
  private hintEl?: HTMLElement;

  private spans: HTMLElement[] = [];

  connectedCallback() {
    super.connectedCallback();
    requestAnimationFrame(() => this._init());
  }

  private _init() {
    this.sectionEl = this.renderRoot.querySelector(
      ".promo-section"
    ) as HTMLElement;

    if (!this.sectionEl) return;

    this.promoEl = this.sectionEl.querySelector(".promo-text") as HTMLElement;
    this.fillEl = this.sectionEl.querySelector(".progress-fill") as HTMLElement;
    this.hintEl = this.sectionEl.querySelector(".scroll-hint") as HTMLElement;

    this._splitWords();
    this._observe();
    this._onScroll();

    window.addEventListener("scroll", this._onScroll, { passive: true });
  }

  private _splitWords() {
    if (!this.promoEl) return;

    const rawText = this.promoEl.innerText.trim();
    const words = rawText.split(/\s+/);

    this.promoEl.innerHTML = words
      .map((w) => `<span class="word">${w}</span>`)
      .join(" ");

    this.spans = Array.from(
      this.promoEl.querySelectorAll(".word")
    ) as HTMLElement[];
  }

  private _ease(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  private _observe() {
    if (!this.sectionEl) return;

    const io = new IntersectionObserver(([entry]) => {
      if (!this.sectionEl) return;
      this.sectionEl.classList.toggle("in-view", entry.isIntersecting);
    });

    io.observe(this.sectionEl);
  }

  private _onScroll = () => {
    if (!this.sectionEl || !this.fillEl || !this.hintEl) return;

    const rect = this.sectionEl.getBoundingClientRect();

    const raw =
      (window.innerHeight - rect.top) /
      (window.innerHeight + rect.height);

    const clamped = Math.min(Math.max(raw, 0), 1);

    const START = 0.15;
    const END = 0.88;
    const LOOK_AHEAD = 2;

    let mapped =
      clamped < START
        ? 0
        : clamped > END
        ? 1
        : (clamped - START) / (END - START);

    const eased = this._ease(mapped);
    const active = eased * this.spans.length;

    this.spans.forEach((span, i) => {
      const dist = i - active;

      if (dist < 0) {
        span.className = "word done";
      } else if (dist < LOOK_AHEAD) {
        span.className = "word lit";
      } else {
        span.className = "word";
      }
    });

    const pct = Math.round(eased * 100);

    this.fillEl.style.height = `${pct}%`;
    this.hintEl.style.opacity = clamped > 0.06 ? "0" : "1";
  };

  static styles = css`
    :host {
      display: block;
    }

    .section {
      height: 200vh;
    }

    .sticky {
      position: relative;
      height: 100%;
    }

    .box {
      position: sticky;
      top: 0;
      height: 100vh;

      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .promo-text {
      font-size: clamp(28px, 4vw, 52px);
      font-weight: bold;
      text-align: center;
      line-height: 1.7;
      max-width: 820px;
    }

    .word {
      opacity: 0.2;
      transition: 0.4s ease;
      margin-inline: 2px;
    }

    .word.lit {
      opacity: 1;
    }

    .word.done {
      opacity: 1;
    }

    .progress-track {
      position: fixed;
      left: 2rem;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 120px;
      background: rgba(0, 0, 0, 0.12);
      border-radius: 99px;
      overflow: hidden;
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
    }

    .section.in-view .progress-track {
      opacity: 1;
    }

    .progress-fill {
      width: 100%;
      height: 0%;
      transition: height 0.1s linear;
    }

    .scroll-hint {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      transition: opacity 0.3s;
    }
  `;

  render() {
    const c = this.config;

    return html`
      <section class="section promo-section">
        <div
          class="sticky"
          style="
            background-color: ${c?.section_bg_color ?? "#fff"};
            color: ${c?.section_text_color ?? "#000"};
            ${c?.section_image_s
              ? `background-image:url(${c.section_image}); background-size:cover; background-position:center;`
              : ""}
          "
        >
          <div class="box">
            <div class="promo-text">
              ${c?.section_text ?? ""}
            </div>
          </div>

          <div class="progress-track">
            <div
              class="progress-fill"
              style="background:${c?.section_text_color_to ?? "#000"}"
            ></div>
          </div>

          <div class="scroll-hint">
            <span>scroll</span>
            <div class="scroll-arrow"></div>
          </div>
        </div>
      </section>
    `;
  }
}