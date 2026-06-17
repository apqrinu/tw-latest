const c = "ar", g = /* @__PURE__ */ new Set(["ar", "he", "fa", "ur"]);
function f(n) {
  return !n || typeof n != "string" ? void 0 : n.trim().toLowerCase().split(/[-_]/)[0] || void 0;
}
function d() {
  var n, o, e, i, r;
  try {
    const t = globalThis.salla, s = f(
      ((o = (n = t == null ? void 0 : t.config) == null ? void 0 : n.get) == null ? void 0 : o.call(n, "user.language")) ?? ((e = t == null ? void 0 : t.lang) == null ? void 0 : e.locale) ?? ((i = t == null ? void 0 : t.config) == null ? void 0 : i.language)
    );
    if (s) return s;
  } catch {
  }
  if (typeof document < "u") {
    const t = f((r = document.documentElement) == null ? void 0 : r.lang);
    if (t) return t;
  }
  if (typeof navigator < "u") {
    const t = f(navigator.language);
    if (t) return t;
  }
  return c;
}
function a(n) {
  return g.has(f(n) ?? d());
}
function u(n, o) {
  const e = n[o];
  return typeof e == "string" && e !== "" ? e : void 0;
}
function m(n, o) {
  if (n == null) return;
  if (typeof n == "string") return n !== "" ? n : void 0;
  if (typeof n != "object") return;
  const e = f(o) ?? d(), i = u(n, e);
  if (i !== void 0) return i;
  if (e !== c) {
    const r = u(n, c);
    if (r !== void 0) return r;
  }
  for (const r of Object.keys(n)) {
    const t = u(n, r);
    if (t !== void 0) return t;
  }
}
export {
  a as i,
  m as l
};
