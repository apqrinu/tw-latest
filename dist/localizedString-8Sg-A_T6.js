function f(e, i) {
  var t, r;
  if (e == null) return;
  if (typeof e == "string") return e;
  const n = typeof document < "u" && ((t = document.documentElement) == null ? void 0 : t.lang) || typeof navigator < "u" && ((r = navigator.language) == null ? void 0 : r.split("-")[0]) || Object.keys(e)[0];
  if (n && typeof e[n] == "string") return e[n];
  for (const o of Object.keys(e))
    if (e[o]) return e[o];
}
export {
  f as l
};
