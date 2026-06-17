/**
 * Centralized localization (i18n) utility.
 *
 * This is the SINGLE SOURCE OF TRUTH for language handling across the theme.
 * Every component must resolve multilingual values and text direction through
 * the helpers exported here instead of inspecting `document.lang`,
 * `navigator.language`, or hard-coding `locale === 'ar'` style checks.
 */

/**
 * A value that may be a plain string or a map of `{ langCode: translation }`.
 * Twilight stores translatable fields (titles, button labels, …) in this shape.
 */
export type LocalizedString =
  | string
  | Record<string, string>
  | null
  | undefined;

/** Theme default language. Salla storefronts are Arabic-first. */
export const DEFAULT_LANG = "ar";

/** Languages that render right-to-left. */
const RTL_LANGS = new Set(["ar", "he", "fa", "ur"]);

/**
 * Normalize any raw locale value to a base language code.
 * e.g. "en-US" -> "en", "  AR_sa " -> "ar".
 */
export function normalizeLang(raw?: string | null): string | undefined {
  if (!raw || typeof raw !== "string") return undefined;
  const base = raw.trim().toLowerCase().split(/[-_]/)[0];
  return base || undefined;
}

/**
 * Resolve the active language from a single, well-defined priority chain:
 *   1. Salla store config (authoritative inside the Twilight runtime)
 *   2. <html lang="…"> rendered by Twilight
 *   3. Browser preference (navigator.language)
 *   4. Theme default (DEFAULT_LANG)
 */
export function getCurrentLang(): string {
  // 1. Salla global — only present in the live Twilight runtime.
  try {
    const salla = (globalThis as any).salla;
    const fromSalla = normalizeLang(
      salla?.config?.get?.("user.language") ??
        salla?.lang?.locale ??
        salla?.config?.language,
    );
    if (fromSalla) return fromSalla;
  } catch {
    /* Salla unavailable (demo / build context) — fall through. */
  }

  // 2. Document language attribute.
  if (typeof document !== "undefined") {
    const fromDoc = normalizeLang(document.documentElement?.lang);
    if (fromDoc) return fromDoc;
  }

  // 3. Browser preference.
  if (typeof navigator !== "undefined") {
    const fromNav = normalizeLang(navigator.language);
    if (fromNav) return fromNav;
  }

  // 4. Theme default.
  return DEFAULT_LANG;
}

/** Whether the given (or current) language is right-to-left. */
export function isRtl(lang?: string): boolean {
  return RTL_LANGS.has(normalizeLang(lang) ?? getCurrentLang());
}

/** Read a non-empty translation for `lang` from a translation map. */
function pick(map: Record<string, string>, lang: string): string | undefined {
  const value = map[lang];
  return typeof value === "string" && value !== "" ? value : undefined;
}

/**
 * Resolve a (possibly multilingual) value to a single string for the active
 * language, with a consistent and graceful fallback chain:
 *
 *   preferred language → theme default → first non-empty translation.
 *
 * Returns `undefined` when no usable translation exists, so callers can render
 * conditionally instead of printing empty/"[object Object]" markup.
 */
export function localizedString(
  val?: LocalizedString,
  lang?: string,
): string | undefined {
  if (val == null) return undefined;
  if (typeof val === "string") return val !== "" ? val : undefined;
  if (typeof val !== "object") return undefined;

  const preferred = normalizeLang(lang) ?? getCurrentLang();

  // 1. Preferred language.
  const fromPreferred = pick(val, preferred);
  if (fromPreferred !== undefined) return fromPreferred;

  // 2. Theme default language.
  if (preferred !== DEFAULT_LANG) {
    const fromDefault = pick(val, DEFAULT_LANG);
    if (fromDefault !== undefined) return fromDefault;
  }

  // 3. First non-empty translation in any configured language.
  for (const key of Object.keys(val)) {
    const candidate = pick(val, key);
    if (candidate !== undefined) return candidate;
  }

  return undefined;
}
