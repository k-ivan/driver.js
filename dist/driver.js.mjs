let z = {};
function F(e = {}) {
  z = {
    animate: !0,
    allowClose: !0,
    overlayOpacity: 0.7,
    smoothScroll: !1,
    disableActiveInteraction: !1,
    showProgress: !1,
    stagePadding: 10,
    stageRadius: 5,
    popoverOffset: 10,
    showButtons: ["next", "previous", "close"],
    disableButtons: [],
    overlayColor: "#000",
    ...e
  };
}
function a(e) {
  return e ? z[e] : z;
}
function W(e, o, t, i) {
  return (e /= i / 2) < 1 ? t / 2 * e * e + o : -t / 2 * (--e * (e - 2) - 1) + o;
}
function J(e) {
  const o = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
  return e.flatMap((t) => {
    const i = t.matches(o), c = Array.from(t.querySelectorAll(o));
    return [...i ? [t] : [], ...c];
  }).filter((t) => getComputedStyle(t).pointerEvents !== "none" && pe(t));
}
function U(e) {
  if (!e || le(e))
    return;
  const o = a("smoothScroll");
  e.scrollIntoView({
    // Removing the smooth scrolling for elements which exist inside the scrollable parent
    // This was causing the highlight to not properly render
    behavior: !o || de(e) ? "auto" : "smooth",
    inline: "center",
    block: "center"
  });
}
function de(e) {
  if (!e || !e.parentElement)
    return;
  const o = e.parentElement;
  return o.scrollHeight > o.clientHeight;
}
function le(e) {
  const o = e.getBoundingClientRect();
  return o.top >= 0 && o.left >= 0 && o.bottom <= (window.innerHeight || document.documentElement.clientHeight) && o.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function pe(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
let O = {};
function b(e, o) {
  O[e] = o;
}
function l(e) {
  return e ? O[e] : O;
}
function X() {
  O = {};
}
let R = {};
function N(e, o) {
  R[e] = o;
}
function S(e) {
  var o;
  (o = R[e]) == null || o.call(R);
}
function ue() {
  R = {};
}
function ve(e, o, t, i) {
  let c = l("__activeStagePosition");
  const r = c || t.getBoundingClientRect(), h = i.getBoundingClientRect(), w = W(e, r.x, h.x - r.x, o), n = W(e, r.y, h.y - r.y, o), v = W(e, r.width, h.width - r.width, o), s = W(e, r.height, h.height - r.height, o);
  c = {
    x: w,
    y: n,
    width: v,
    height: s
  }, te(c), b("__activeStagePosition", c);
}
function ee(e) {
  if (!e)
    return;
  const o = e.getBoundingClientRect(), t = {
    x: o.x,
    y: o.y,
    width: o.width,
    height: o.height
  };
  b("__activeStagePosition", t), te(t);
}
function fe() {
  const e = l("__activeStagePosition"), o = l("__overlaySvg");
  if (!e)
    return;
  if (!o) {
    console.warn("No stage svg found.");
    return;
  }
  const t = window.innerWidth, i = window.innerHeight;
  o.setAttribute("viewBox", `0 0 ${t} ${i}`);
}
function he(e) {
  const o = ge(e);
  document.body.appendChild(o), re(o, (t) => {
    t.target.tagName === "path" && S("overlayClick");
  }), b("__overlaySvg", o);
}
function te(e) {
  const o = l("__overlaySvg");
  if (!o) {
    he(e);
    return;
  }
  const t = o.firstElementChild;
  if ((t == null ? void 0 : t.tagName) !== "path")
    throw new Error("no path element found in stage svg");
  t.setAttribute("d", oe(e));
}
function ge(e) {
  const o = window.innerWidth, t = window.innerHeight, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.id = "driver-overlay", i.classList.add("driver-overlay", "driver-overlay-animated"), i.setAttribute("viewBox", `0 0 ${o} ${t}`), i.setAttribute("xmlSpace", "preserve"), i.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), i.setAttribute("version", "1.1"), i.setAttribute("preserveAspectRatio", "xMinYMin slice"), i.style.fillRule = "evenodd", i.style.clipRule = "evenodd", i.style.strokeLinejoin = "round", i.style.strokeMiterlimit = "2", i.style.zIndex = "10000", i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%";
  const c = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return c.setAttribute("d", oe(e)), c.style.fill = a("overlayColor") || "rgb(0,0,0)", c.style.opacity = `${a("overlayOpacity")}`, c.style.pointerEvents = "auto", c.style.cursor = "auto", i.appendChild(c), i;
}
function oe(e) {
  const o = window.innerWidth, t = window.innerHeight, i = a("stagePadding") || 0, c = a("stageRadius") || 0, r = e.width + i * 2, h = e.height + i * 2, w = Math.min(c, r / 2, h / 2), n = Math.floor(Math.max(w, 0)), v = e.x - i + n, s = e.y - i, d = r - n * 2, p = h - n * 2;
  return `M${o},0L0,0L0,${t}L${o},${t}L${o},0Z
    M${v},${s} h${d} a${n},${n} 0 0 1 ${n},${n} v${p} a${n},${n} 0 0 1 -${n},${n} h-${d} a${n},${n} 0 0 1 -${n},-${n} v-${p} a${n},${n} 0 0 1 ${n},-${n} z`;
}
function we() {
  const e = l("__overlaySvg");
  e && (q(e), e.remove());
}
function me() {
  const e = document.getElementById("driver-dummy-element");
  if (e)
    return e;
  let o = document.createElement("div");
  return o.id = "driver-dummy-element", o.style.width = "0", o.style.height = "0", o.style.pointerEvents = "none", o.style.opacity = "0", o.style.position = "fixed", o.style.top = "50%", o.style.left = "50%", document.body.appendChild(o), o;
}
function Y(e) {
  const { element: o } = e;
  let t = typeof o == "string" ? document.querySelector(o) : o;
  t || (t = me()), be(t, e);
}
function ye() {
  const e = l("__activeElement"), o = l("__activeStep");
  e && (ee(e), fe(), ae(e, o));
}
function be(e, o) {
  const i = Date.now(), c = l("__activeStep"), r = l("__activeElement") || e, h = !r || r === e, w = e.id === "driver-dummy-element", n = r.id === "driver-dummy-element", v = a("animate"), s = o.onHighlightStarted || a("onHighlightStarted"), d = (o == null ? void 0 : o.onHighlighted) || a("onHighlighted"), p = (c == null ? void 0 : c.onDeselected) || a("onDeselected"), m = a(), g = l();
  !h && p && p(n ? void 0 : r, c, {
    config: m,
    state: g
  }), s && s(w ? void 0 : e, o, {
    config: m,
    state: g
  });
  const u = !h && v;
  let f = !1;
  ke(), b("previousStep", c), b("previousElement", r), b("activeStep", o), b("activeElement", e);
  const L = () => {
    if (l("__transitionCallback") !== L)
      return;
    const x = Date.now() - i, y = 400 - x <= 400 / 2;
    o.popover && y && !f && u && (Q(e, o), f = !0), a("animate") && x < 400 ? ve(x, 400, r, e) : (ee(e), d && d(w ? void 0 : e, o, {
      config: a(),
      state: l()
    }), b("__transitionCallback", void 0), b("__previousStep", c), b("__previousElement", r), b("__activeStep", o), b("__activeElement", e)), window.requestAnimationFrame(L);
  };
  b("__transitionCallback", L), window.requestAnimationFrame(L), U(e), !u && o.popover && Q(e, o), r.classList.remove("driver-active-element", "driver-no-interaction"), r.removeAttribute("aria-haspopup"), r.removeAttribute("aria-expanded"), r.removeAttribute("aria-controls"), a("disableActiveInteraction") && e.classList.add("driver-no-interaction"), e.classList.add("driver-active-element"), e.setAttribute("aria-haspopup", "dialog"), e.setAttribute("aria-expanded", "true"), e.setAttribute("aria-controls", "driver-popover-content");
}
function xe() {
  var e;
  (e = document.getElementById("driver-dummy-element")) == null || e.remove(), document.querySelectorAll(".driver-active-element").forEach((o) => {
    o.classList.remove("driver-active-element", "driver-no-interaction"), o.removeAttribute("aria-haspopup"), o.removeAttribute("aria-expanded"), o.removeAttribute("aria-controls");
  });
}
function I() {
  const e = l("__resizeTimeout");
  e && window.cancelAnimationFrame(e), b("__resizeTimeout", window.requestAnimationFrame(ye));
}
function ie(e) {
  var n;
  if (!l("isInitialized") || !(e.key === "Tab" || e.keyCode === 9))
    return;
  const i = l("__activeElement"), c = (n = l("popover")) == null ? void 0 : n.wrapper, r = J([
    ...c ? [c] : [],
    ...i ? [i] : []
  ]), h = r[0], w = r[r.length - 1];
  if (e.preventDefault(), e.shiftKey) {
    const v = r[r.indexOf(document.activeElement) - 1] || w;
    v == null || v.focus();
  } else {
    const v = r[r.indexOf(document.activeElement) + 1] || h;
    v == null || v.focus();
  }
}
function ne(e) {
  var t;
  ((t = a("allowKeyboardControl")) == null || t) && (e.key === "Escape" ? S("escapePress") : e.key === "ArrowRight" ? S("arrowRightPress") : e.key === "ArrowLeft" && S("arrowLeftPress"));
}
const D = {}, j = (e, o, t) => function(i) {
  const c = i.target;
  e != null && e.contains(c) && ((!t || t(c)) && (i.preventDefault(), i.stopPropagation(), i.stopImmediatePropagation()), o == null || o(i));
};
function re(e, o, t) {
  const i = j(e, o, t), c = j();
  D[e.id] = { clickedListener: i }, e.classList.contains("driver-popover") && (D[e.id].disabledlistener = c, document.addEventListener("pointerdown", c, !0), document.addEventListener("mousedown", c, !0), document.addEventListener("pointerup", c, !0), document.addEventListener("mouseup", c, !0)), document.addEventListener("click", i, !0);
}
function q(e) {
  const { clickedListener: o, disabledlistener: t } = D[e.id];
  o && document.removeEventListener("click", o, !0), t && (document.removeEventListener("pointerdown", t, !0), document.removeEventListener("mousedown", t, !0), document.removeEventListener("pointerup", t, !0), document.removeEventListener("mouseup", t, !0)), delete D[e.id];
}
function Ce() {
  window.addEventListener("keyup", ne, !1), window.addEventListener("keydown", ie, !1), window.addEventListener("resize", I), window.addEventListener("scroll", I);
}
function Le() {
  window.removeEventListener("keyup", ne), window.removeEventListener("keydown", ie), window.removeEventListener("resize", I), window.removeEventListener("scroll", I);
}
function ke() {
  const e = l("popover");
  e && (q(e.wrapper), e.wrapper.style.display = "none");
}
function Q(e, o) {
  var C, y;
  let t = l("popover");
  t && document.body.removeChild(t.wrapper), t = Ee(), document.body.appendChild(t.wrapper);
  const {
    title: i,
    description: c,
    showButtons: r,
    disableButtons: h,
    showProgress: w,
    nextBtnText: n = a("nextBtnText") || "Next &rarr;",
    prevBtnText: v = a("prevBtnText") || "&larr; Previous",
    progressText: s = a("progressText") || "{current} of {total}"
  } = o.popover || {};
  t.nextButton.innerHTML = n, t.previousButton.innerHTML = v, t.progress.innerHTML = s, i ? (t.title.innerHTML = i, t.title.style.display = "block") : t.title.style.display = "none", c ? (t.description.innerHTML = c, t.description.style.display = "block") : t.description.style.display = "none";
  const d = r || a("showButtons"), p = w || a("showProgress") || !1, m = (d == null ? void 0 : d.includes("next")) || (d == null ? void 0 : d.includes("previous")) || p;
  t.closeButton.style.display = d.includes("close") ? "block" : "none", m ? (t.footer.style.display = "flex", t.progress.style.display = p ? "block" : "none", t.nextButton.style.display = d.includes("next") ? "block" : "none", t.previousButton.style.display = d.includes("previous") ? "block" : "none") : t.footer.style.display = "none";
  const g = h || a("disableButtons") || [];
  g != null && g.includes("next") && (t.nextButton.disabled = !0, t.nextButton.classList.add("driver-popover-btn-disabled")), g != null && g.includes("previous") && (t.previousButton.disabled = !0, t.previousButton.classList.add("driver-popover-btn-disabled")), g != null && g.includes("close") && (t.closeButton.disabled = !0, t.closeButton.classList.add("driver-popover-btn-disabled"));
  const u = t.wrapper;
  u.style.display = "block", u.style.left = "", u.style.top = "", u.style.bottom = "", u.style.right = "", u.id = "driver-popover-content", u.setAttribute("role", "dialog"), u.setAttribute("aria-labelledby", "driver-popover-title"), u.setAttribute("aria-describedby", "driver-popover-description");
  const f = t.arrow;
  f.className = "driver-popover-arrow";
  const L = ((C = o.popover) == null ? void 0 : C.popoverClass) || a("popoverClass") || "";
  u.className = `driver-popover ${L}`.trim(), re(
    t.wrapper,
    (P) => {
      var $, B, M;
      const _ = P.target, T = (($ = o.popover) == null ? void 0 : $.onNextClick) || a("onNextClick"), A = ((B = o.popover) == null ? void 0 : B.onPrevClick) || a("onPrevClick"), H = ((M = o.popover) == null ? void 0 : M.onCloseClick) || a("onCloseClick");
      if (_.classList.contains("driver-popover-next-btn"))
        return T ? T(e, o, {
          config: a(),
          state: l()
        }) : S("nextClick");
      if (_.classList.contains("driver-popover-prev-btn"))
        return A ? A(e, o, {
          config: a(),
          state: l()
        }) : S("prevClick");
      if (_.classList.contains("driver-popover-close-btn"))
        return H ? H(e, o, {
          config: a(),
          state: l()
        }) : S("closeClick");
    },
    (P) => !(t != null && t.description.contains(P)) && !(t != null && t.title.contains(P)) && typeof P.className == "string" && P.className.includes("driver-popover")
  ), b("popover", t);
  const k = ((y = o.popover) == null ? void 0 : y.onPopoverRender) || a("onPopoverRender");
  k && k(t, {
    config: a(),
    state: l()
  }), ae(e, o), U(u);
  const E = e.classList.contains("driver-dummy-element"), x = J([u, ...E ? [] : [e]]);
  x.length > 0 && x[0].focus();
}
function se() {
  const e = l("popover");
  if (!(e != null && e.wrapper))
    return;
  const o = e.wrapper.getBoundingClientRect(), t = a("stagePadding") || 0, i = a("popoverOffset") || 0;
  return {
    width: o.width + t + i,
    height: o.height + t + i,
    realWidth: o.width,
    realHeight: o.height
  };
}
function Z(e, o) {
  const { elementDimensions: t, popoverDimensions: i, popoverPadding: c, popoverArrowDimensions: r } = o;
  return e === "start" ? Math.max(
    Math.min(
      t.top - c,
      window.innerHeight - i.realHeight - r.width
    ),
    r.width
  ) : e === "end" ? Math.max(
    Math.min(
      t.top - (i == null ? void 0 : i.realHeight) + t.height + c,
      window.innerHeight - (i == null ? void 0 : i.realHeight) - r.width
    ),
    r.width
  ) : e === "center" ? Math.max(
    Math.min(
      t.top + t.height / 2 - (i == null ? void 0 : i.realHeight) / 2,
      window.innerHeight - (i == null ? void 0 : i.realHeight) - r.width
    ),
    r.width
  ) : 0;
}
function G(e, o) {
  const { elementDimensions: t, popoverDimensions: i, popoverPadding: c, popoverArrowDimensions: r } = o;
  return e === "start" ? Math.max(
    Math.min(
      t.left - c,
      window.innerWidth - i.realWidth - r.width
    ),
    r.width
  ) : e === "end" ? Math.max(
    Math.min(
      t.left - (i == null ? void 0 : i.realWidth) + t.width + c,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - r.width
    ),
    r.width
  ) : e === "center" ? Math.max(
    Math.min(
      t.left + t.width / 2 - (i == null ? void 0 : i.realWidth) / 2,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - r.width
    ),
    r.width
  ) : 0;
}
function ae(e, o) {
  const t = l("popover");
  if (!t)
    return;
  const { align: i = "start", side: c = "left" } = (o == null ? void 0 : o.popover) || {}, r = i, h = e.id === "driver-dummy-element" ? "over" : c, w = a("stagePadding") || 0, n = se(), v = t.arrow.getBoundingClientRect(), s = e.getBoundingClientRect(), d = s.top - n.height;
  let p = d >= 0;
  const m = window.innerHeight - (s.bottom + n.height);
  let g = m >= 0;
  const u = s.left - n.width;
  let f = u >= 0;
  const L = window.innerWidth - (s.right + n.width);
  let k = L >= 0;
  const E = !p && !g && !f && !k;
  let x = h;
  if (h === "top" && p ? k = f = g = !1 : h === "bottom" && g ? k = f = p = !1 : h === "left" && f ? k = p = g = !1 : h === "right" && k && (f = p = g = !1), h === "over") {
    const C = window.innerWidth / 2 - n.realWidth / 2, y = window.innerHeight / 2 - n.realHeight / 2;
    t.wrapper.style.left = `${C}px`, t.wrapper.style.right = "auto", t.wrapper.style.top = `${y}px`, t.wrapper.style.bottom = "auto";
  } else if (E) {
    const C = window.innerWidth / 2 - (n == null ? void 0 : n.realWidth) / 2, y = 10;
    t.wrapper.style.left = `${C}px`, t.wrapper.style.right = "auto", t.wrapper.style.bottom = `${y}px`, t.wrapper.style.top = "auto";
  } else if (f) {
    const C = Math.min(
      u,
      window.innerWidth - (n == null ? void 0 : n.realWidth) - v.width
    ), y = Z(r, {
      elementDimensions: s,
      popoverDimensions: n,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.left = `${C}px`, t.wrapper.style.top = `${y}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", x = "left";
  } else if (k) {
    const C = Math.min(
      L,
      window.innerWidth - (n == null ? void 0 : n.realWidth) - v.width
    ), y = Z(r, {
      elementDimensions: s,
      popoverDimensions: n,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.right = `${C}px`, t.wrapper.style.top = `${y}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.left = "auto", x = "right";
  } else if (p) {
    const C = Math.min(
      d,
      window.innerHeight - n.realHeight - v.width
    );
    let y = G(r, {
      elementDimensions: s,
      popoverDimensions: n,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.top = `${C}px`, t.wrapper.style.left = `${y}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", x = "top";
  } else if (g) {
    const C = Math.min(
      m,
      window.innerHeight - (n == null ? void 0 : n.realHeight) - v.width
    );
    let y = G(r, {
      elementDimensions: s,
      popoverDimensions: n,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.left = `${y}px`, t.wrapper.style.bottom = `${C}px`, t.wrapper.style.top = "auto", t.wrapper.style.right = "auto", x = "bottom";
  }
  E ? t.arrow.classList.add("driver-popover-arrow-none") : Pe(r, x, e);
}
function Pe(e, o, t) {
  const i = l("popover");
  if (!i)
    return;
  const c = t.getBoundingClientRect(), r = se(), h = i.arrow, w = r.width, n = window.innerWidth, v = c.width, s = c.left, d = r.height, p = window.innerHeight, m = c.top, g = c.height;
  h.className = "driver-popover-arrow";
  let u = o, f = e;
  o === "top" ? (s + v <= 0 ? (u = "right", f = "end") : s + v - w <= 0 && (u = "top", f = "start"), s >= n ? (u = "left", f = "end") : s + w >= n && (u = "top", f = "end")) : o === "bottom" ? (s + v <= 0 ? (u = "right", f = "start") : s + v - w <= 0 && (u = "bottom", f = "start"), s >= n ? (u = "left", f = "start") : s + w >= n && (u = "bottom", f = "end")) : o === "left" ? (m + g <= 0 ? (u = "bottom", f = "end") : m + g - d <= 0 && (u = "left", f = "start"), m >= p ? (u = "top", f = "end") : m + d >= p && (u = "left", f = "end")) : o === "right" && (m + g <= 0 ? (u = "bottom", f = "start") : m + g - d <= 0 && (u = "right", f = "start"), m >= p ? (u = "top", f = "start") : m + d >= p && (u = "right", f = "end")), u ? (h.classList.add(`driver-popover-arrow-side-${u}`), h.classList.add(`driver-popover-arrow-align-${f}`)) : h.classList.add("driver-popover-arrow-none");
}
function Ee() {
  const e = document.createElement("div");
  e.classList.add("driver-popover");
  const o = document.createElement("div");
  o.classList.add("driver-popover-arrow");
  const t = document.createElement("header");
  t.id = "driver-popover-title", t.classList.add("driver-popover-title"), t.style.display = "none", t.innerText = "Popover Title";
  const i = document.createElement("div");
  i.id = "driver-popover-description", i.classList.add("driver-popover-description"), i.style.display = "none", i.innerText = "Popover description is here";
  const c = document.createElement("button");
  c.type = "button", c.classList.add("driver-popover-close-btn"), c.setAttribute("aria-label", "Close"), c.innerHTML = "&times;";
  const r = document.createElement("footer");
  r.classList.add("driver-popover-footer");
  const h = document.createElement("span");
  h.classList.add("driver-popover-progress-text"), h.innerText = "";
  const w = document.createElement("span");
  w.classList.add("driver-popover-navigation-btns");
  const n = document.createElement("button");
  n.type = "button", n.classList.add("driver-popover-prev-btn"), n.innerHTML = "&larr; Previous";
  const v = document.createElement("button");
  return v.type = "button", v.classList.add("driver-popover-next-btn"), v.innerHTML = "Next &rarr;", w.appendChild(n), w.appendChild(v), r.appendChild(h), r.appendChild(w), e.appendChild(c), e.appendChild(o), e.appendChild(t), e.appendChild(i), e.appendChild(r), {
    wrapper: e,
    arrow: o,
    title: t,
    description: i,
    footer: r,
    previousButton: n,
    nextButton: v,
    closeButton: c,
    footerButtons: w,
    progress: h
  };
}
function Se() {
  var o;
  const e = l("popover");
  e && (q(e.wrapper), (o = e.wrapper.parentElement) == null || o.removeChild(e.wrapper));
}
function _e(e = {}) {
  F(e);
  function o() {
    a("allowClose") && v();
  }
  function t() {
    const s = l("activeIndex"), d = a("steps") || [];
    if (typeof s == "undefined")
      return;
    const p = s + 1;
    d[p] ? n(p) : v();
  }
  function i() {
    const s = l("activeIndex"), d = a("steps") || [];
    if (typeof s == "undefined")
      return;
    const p = s - 1;
    d[p] ? n(p) : v();
  }
  function c(s) {
    (a("steps") || [])[s] ? n(s) : v();
  }
  function r() {
    var f;
    if (l("__transitionCallback"))
      return;
    const d = l("activeIndex"), p = l("__activeStep"), m = l("__activeElement");
    if (typeof d == "undefined" || typeof p == "undefined" || typeof l("activeIndex") == "undefined")
      return;
    const u = ((f = p.popover) == null ? void 0 : f.onPrevClick) || a("onPrevClick");
    if (u)
      return u(m, p, {
        config: a(),
        state: l()
      });
    i();
  }
  function h() {
    var u;
    if (l("__transitionCallback"))
      return;
    const d = l("activeIndex"), p = l("__activeStep"), m = l("__activeElement");
    if (typeof d == "undefined" || typeof p == "undefined")
      return;
    const g = ((u = p.popover) == null ? void 0 : u.onNextClick) || a("onNextClick");
    if (g)
      return g(m, p, {
        config: a(),
        state: l()
      });
    t();
  }
  function w() {
    l("isInitialized") || (b("isInitialized", !0), document.body.classList.add("driver-active", a("animate") ? "driver-fade" : "driver-simple"), Ce(), N("overlayClick", o), N("escapePress", o), N("arrowLeftPress", r), N("arrowRightPress", h));
  }
  function n(s = 0) {
    var T, A, H, $, B, M, V, K;
    const d = a("steps");
    if (!d) {
      console.error("No steps to drive through"), v();
      return;
    }
    if (!d[s]) {
      v();
      return;
    }
    b("__activeOnDestroyed", document.activeElement), b("activeIndex", s);
    const p = d[s], m = d[s + 1], g = d[s - 1], u = ((T = p.popover) == null ? void 0 : T.doneBtnText) || a("doneBtnText") || "Done", f = a("allowClose"), L = typeof ((A = p.popover) == null ? void 0 : A.showProgress) != "undefined" ? (H = p.popover) == null ? void 0 : H.showProgress : a("showProgress"), E = ((($ = p.popover) == null ? void 0 : $.progressText) || a("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${s + 1}`).replace("{{total}}", `${d.length}`), x = ((B = p.popover) == null ? void 0 : B.showButtons) || a("showButtons"), C = [
      "next",
      "previous",
      ...f ? ["close"] : []
    ].filter((ce) => !(x != null && x.length) || x.includes(ce)), y = ((M = p.popover) == null ? void 0 : M.onNextClick) || a("onNextClick"), P = ((V = p.popover) == null ? void 0 : V.onPrevClick) || a("onPrevClick"), _ = ((K = p.popover) == null ? void 0 : K.onCloseClick) || a("onCloseClick");
    Y({
      ...p,
      popover: {
        showButtons: C,
        nextBtnText: m ? void 0 : u,
        disableButtons: [...g ? [] : ["previous"]],
        showProgress: L,
        progressText: E,
        onNextClick: y || (() => {
          m ? n(s + 1) : v();
        }),
        onPrevClick: P || (() => {
          n(s - 1);
        }),
        onCloseClick: _ || (() => {
          v();
        }),
        ...(p == null ? void 0 : p.popover) || {}
      }
    });
  }
  function v(s = !0) {
    const d = l("__activeElement"), p = l("__activeStep"), m = l("__activeOnDestroyed"), g = a("onDestroyStarted");
    if (s && g) {
      const L = !d || (d == null ? void 0 : d.id) === "driver-dummy-element";
      g(L ? void 0 : d, p, {
        config: a(),
        state: l()
      });
      return;
    }
    const u = (p == null ? void 0 : p.onDeselected) || a("onDeselected"), f = a("onDestroyed");
    if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), Le(), Se(), xe(), we(), ue(), X(), d && p) {
      const L = d.id === "driver-dummy-element";
      u && u(L ? void 0 : d, p, {
        config: a(),
        state: l()
      }), f && f(L ? void 0 : d, p, {
        config: a(),
        state: l()
      });
    }
    m && m.focus();
  }
  return {
    isActive: () => l("isInitialized") || !1,
    refresh: I,
    drive: (s = 0) => {
      w(), n(s);
    },
    setConfig: F,
    setSteps: (s) => {
      X(), F({
        ...a(),
        steps: s
      });
    },
    getConfig: a,
    getState: l,
    getActiveIndex: () => l("activeIndex"),
    isFirstStep: () => l("activeIndex") === 0,
    isLastStep: () => {
      const s = a("steps") || [], d = l("activeIndex");
      return d !== void 0 && d === s.length - 1;
    },
    getActiveStep: () => l("activeStep"),
    getActiveElement: () => l("activeElement"),
    getPreviousElement: () => l("previousElement"),
    getPreviousStep: () => l("previousStep"),
    moveNext: t,
    movePrevious: i,
    moveTo: c,
    hasNextStep: () => {
      const s = a("steps") || [], d = l("activeIndex");
      return d !== void 0 && s[d + 1];
    },
    hasPreviousStep: () => {
      const s = a("steps") || [], d = l("activeIndex");
      return d !== void 0 && s[d - 1];
    },
    highlight: (s) => {
      w(), Y({
        ...s,
        popover: s.popover ? {
          showButtons: [],
          showProgress: !1,
          progressText: "",
          ...s.popover
        } : void 0
      });
    },
    destroy: () => {
      v(!1);
    }
  };
}
export {
  _e as driver
};