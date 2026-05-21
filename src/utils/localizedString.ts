export type LocalizedString = string | Record<string, string>;

export function localizedString(
  val?: LocalizedString | null,
  lang?: string,
): string | undefined {
  if (val == null) return undefined;
  if (typeof val === "string") return val;

  // Determine preferred language: explicit, html lang, navigator, or first key
  const preferred =
    lang ||
    (typeof document !== "undefined" && document.documentElement?.lang) ||
    (typeof navigator !== "undefined" && navigator.language?.split("-")[0]) ||
    Object.keys(val)[0];

  if (preferred && typeof val[preferred] === "string") return val[preferred];

  // Fallback to first available value
  for (const k of Object.keys(val)) {
    if (val[k]) return val[k];
  }

  return undefined;
}
