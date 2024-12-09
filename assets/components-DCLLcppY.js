var Yh = Object.defineProperty;
var Xh = (e, t, n) =>
  t in e
    ? Yh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var Nl = (e, t, n) => Xh(e, typeof t != "symbol" ? t + "" : t, n);
import { r as g, g as Jh, R as Gh } from "./jsx-runtime-56DGgGmo.js";
function Zh(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const i = Object.getOwnPropertyDescriptor(r, l);
          i &&
            Object.defineProperty(
              e,
              l,
              i.get ? i : { enumerable: !0, get: () => r[l] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
var Wc = { exports: {} },
  qe = {},
  Kc = { exports: {} },
  Qc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(M, H) {
    var $ = M.length;
    M.push(H);
    e: for (; 0 < $; ) {
      var Z = ($ - 1) >>> 1,
        re = M[Z];
      if (0 < l(re, H)) (M[Z] = H), (M[$] = re), ($ = Z);
      else break e;
    }
  }
  function n(M) {
    return M.length === 0 ? null : M[0];
  }
  function r(M) {
    if (M.length === 0) return null;
    var H = M[0],
      $ = M.pop();
    if ($ !== H) {
      M[0] = $;
      e: for (var Z = 0, re = M.length, wt = re >>> 1; Z < wt; ) {
        var Le = 2 * (Z + 1) - 1,
          st = M[Le],
          je = Le + 1,
          Lt = M[je];
        if (0 > l(st, $))
          je < re && 0 > l(Lt, st)
            ? ((M[Z] = Lt), (M[je] = $), (Z = je))
            : ((M[Z] = st), (M[Le] = $), (Z = Le));
        else if (je < re && 0 > l(Lt, $)) (M[Z] = Lt), (M[je] = $), (Z = je);
        else break e;
      }
    }
    return H;
  }
  function l(M, H) {
    var $ = M.sortIndex - H.sortIndex;
    return $ !== 0 ? $ : M.id - H.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var o = Date,
      a = o.now();
    e.unstable_now = function () {
      return o.now() - a;
    };
  }
  var u = [],
    s = [],
    d = 1,
    c = null,
    f = 3,
    w = !1,
    m = !1,
    x = !1,
    L = typeof setTimeout == "function" ? setTimeout : null,
    p = typeof clearTimeout == "function" ? clearTimeout : null,
    h = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function v(M) {
    for (var H = n(s); H !== null; ) {
      if (H.callback === null) r(s);
      else if (H.startTime <= M)
        r(s), (H.sortIndex = H.expirationTime), t(u, H);
      else break;
      H = n(s);
    }
  }
  function E(M) {
    if (((x = !1), v(M), !m))
      if (n(u) !== null) (m = !0), et(R);
      else {
        var H = n(s);
        H !== null && ve(E, H.startTime - M);
      }
  }
  function R(M, H) {
    (m = !1), x && ((x = !1), p(P), (P = -1)), (w = !0);
    var $ = f;
    try {
      for (
        v(H), c = n(u);
        c !== null && (!(c.expirationTime > H) || (M && !K()));

      ) {
        var Z = c.callback;
        if (typeof Z == "function") {
          (c.callback = null), (f = c.priorityLevel);
          var re = Z(c.expirationTime <= H);
          (H = e.unstable_now()),
            typeof re == "function" ? (c.callback = re) : c === n(u) && r(u),
            v(H);
        } else r(u);
        c = n(u);
      }
      if (c !== null) var wt = !0;
      else {
        var Le = n(s);
        Le !== null && ve(E, Le.startTime - H), (wt = !1);
      }
      return wt;
    } finally {
      (c = null), (f = $), (w = !1);
    }
  }
  var y = !1,
    _ = null,
    P = -1,
    D = 5,
    O = -1;
  function K() {
    return !(e.unstable_now() - O < D);
  }
  function J() {
    if (_ !== null) {
      var M = e.unstable_now();
      O = M;
      var H = !0;
      try {
        H = _(!0, M);
      } finally {
        H ? de() : ((y = !1), (_ = null));
      }
    } else y = !1;
  }
  var de;
  if (typeof h == "function")
    de = function () {
      h(J);
    };
  else if (typeof MessageChannel < "u") {
    var fe = new MessageChannel(),
      Re = fe.port2;
    (fe.port1.onmessage = J),
      (de = function () {
        Re.postMessage(null);
      });
  } else
    de = function () {
      L(J, 0);
    };
  function et(M) {
    (_ = M), y || ((y = !0), de());
  }
  function ve(M, H) {
    P = L(function () {
      M(e.unstable_now());
    }, H);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (M) {
      M.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      m || w || ((m = !0), et(R));
    }),
    (e.unstable_forceFrameRate = function (M) {
      0 > M || 125 < M
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (D = 0 < M ? Math.floor(1e3 / M) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (M) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = f;
      }
      var $ = f;
      f = H;
      try {
        return M();
      } finally {
        f = $;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (M, H) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          M = 3;
      }
      var $ = f;
      f = M;
      try {
        return H();
      } finally {
        f = $;
      }
    }),
    (e.unstable_scheduleCallback = function (M, H, $) {
      var Z = e.unstable_now();
      switch (
        (typeof $ == "object" && $ !== null
          ? (($ = $.delay), ($ = typeof $ == "number" && 0 < $ ? Z + $ : Z))
          : ($ = Z),
        M)
      ) {
        case 1:
          var re = -1;
          break;
        case 2:
          re = 250;
          break;
        case 5:
          re = 1073741823;
          break;
        case 4:
          re = 1e4;
          break;
        default:
          re = 5e3;
      }
      return (
        (re = $ + re),
        (M = {
          id: d++,
          callback: H,
          priorityLevel: M,
          startTime: $,
          expirationTime: re,
          sortIndex: -1,
        }),
        $ > Z
          ? ((M.sortIndex = $),
            t(s, M),
            n(u) === null &&
              M === n(s) &&
              (x ? (p(P), (P = -1)) : (x = !0), ve(E, $ - Z)))
          : ((M.sortIndex = re), t(u, M), m || w || ((m = !0), et(R))),
        M
      );
    }),
    (e.unstable_shouldYield = K),
    (e.unstable_wrapCallback = function (M) {
      var H = f;
      return function () {
        var $ = f;
        f = H;
        try {
          return M.apply(this, arguments);
        } finally {
          f = $;
        }
      };
    });
})(Qc);
Kc.exports = Qc;
var qh = Kc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bh = g,
  Ze = qh;
function N(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Yc = new Set(),
  qr = {};
function In(e, t) {
  sr(e, t), sr(e + "Capture", t);
}
function sr(e, t) {
  for (qr[e] = t, e = 0; e < t.length; e++) Yc.add(t[e]);
}
var jt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Ko = Object.prototype.hasOwnProperty,
  ep =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  hs = {},
  ps = {};
function tp(e) {
  return Ko.call(ps, e)
    ? !0
    : Ko.call(hs, e)
    ? !1
    : ep.test(e)
    ? (ps[e] = !0)
    : ((hs[e] = !0), !1);
}
function np(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function rp(e, t, n, r) {
  if (t === null || typeof t > "u" || np(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Be(e, t, n, r, l, i, o) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = o);
}
var De = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    De[e] = new Be(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  De[t] = new Be(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  De[e] = new Be(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  De[e] = new Be(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    De[e] = new Be(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  De[e] = new Be(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  De[e] = new Be(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  De[e] = new Be(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  De[e] = new Be(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Wa = /[\-:]([a-z])/g;
function Ka(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Wa, Ka);
    De[t] = new Be(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Wa, Ka);
    De[t] = new Be(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Wa, Ka);
  De[t] = new Be(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  De[e] = new Be(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
De.xlinkHref = new Be(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  De[e] = new Be(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Qa(e, t, n, r) {
  var l = De.hasOwnProperty(t) ? De[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (rp(t, n, l, r) && (n = null),
    r || l === null
      ? tp(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
      ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
      : ((t = l.attributeName),
        (r = l.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((l = l.type),
            (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ht = bh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Dl = Symbol.for("react.element"),
  Kn = Symbol.for("react.portal"),
  Qn = Symbol.for("react.fragment"),
  Ya = Symbol.for("react.strict_mode"),
  Qo = Symbol.for("react.profiler"),
  Xc = Symbol.for("react.provider"),
  Jc = Symbol.for("react.context"),
  Xa = Symbol.for("react.forward_ref"),
  Yo = Symbol.for("react.suspense"),
  Xo = Symbol.for("react.suspense_list"),
  Ja = Symbol.for("react.memo"),
  Jt = Symbol.for("react.lazy"),
  Gc = Symbol.for("react.offscreen"),
  ms = Symbol.iterator;
function Rr(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ms && e[ms]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ce = Object.assign,
  ho;
function Ur(e) {
  if (ho === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ho = (t && t[1]) || "";
    }
  return (
    `
` +
    ho +
    e
  );
}
var po = !1;
function mo(e, t) {
  if (!e || po) return "";
  po = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (s) {
          var r = s;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (s) {
          r = s;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (s) {
        r = s;
      }
      e();
    }
  } catch (s) {
    if (s && r && typeof s.stack == "string") {
      for (
        var l = s.stack.split(`
`),
          i = r.stack.split(`
`),
          o = l.length - 1,
          a = i.length - 1;
        1 <= o && 0 <= a && l[o] !== i[a];

      )
        a--;
      for (; 1 <= o && 0 <= a; o--, a--)
        if (l[o] !== i[a]) {
          if (o !== 1 || a !== 1)
            do
              if ((o--, a--, 0 > a || l[o] !== i[a])) {
                var u =
                  `
` + l[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    u.includes("<anonymous>") &&
                    (u = u.replace("<anonymous>", e.displayName)),
                  u
                );
              }
            while (1 <= o && 0 <= a);
          break;
        }
    }
  } finally {
    (po = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Ur(e) : "";
}
function lp(e) {
  switch (e.tag) {
    case 5:
      return Ur(e.type);
    case 16:
      return Ur("Lazy");
    case 13:
      return Ur("Suspense");
    case 19:
      return Ur("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = mo(e.type, !1)), e;
    case 11:
      return (e = mo(e.type.render, !1)), e;
    case 1:
      return (e = mo(e.type, !0)), e;
    default:
      return "";
  }
}
function Jo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Qn:
      return "Fragment";
    case Kn:
      return "Portal";
    case Qo:
      return "Profiler";
    case Ya:
      return "StrictMode";
    case Yo:
      return "Suspense";
    case Xo:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Jc:
        return (e.displayName || "Context") + ".Consumer";
      case Xc:
        return (e._context.displayName || "Context") + ".Provider";
      case Xa:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Ja:
        return (
          (t = e.displayName || null), t !== null ? t : Jo(e.type) || "Memo"
        );
      case Jt:
        (t = e._payload), (e = e._init);
        try {
          return Jo(e(t));
        } catch {}
    }
  return null;
}
function ip(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Jo(t);
    case 8:
      return t === Ya ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function dn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Zc(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function op(e) {
  var t = Zc(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (o) {
          (r = "" + o), i.call(this, o);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Ol(e) {
  e._valueTracker || (e._valueTracker = op(e));
}
function qc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Zc(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function hi(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Go(e, t) {
  var n = t.checked;
  return ce({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function vs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = dn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function bc(e, t) {
  (t = t.checked), t != null && Qa(e, "checked", t, !1);
}
function Zo(e, t) {
  bc(e, t);
  var n = dn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? qo(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && qo(e, t.type, dn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function ys(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function qo(e, t, n) {
  (t !== "number" || hi(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ar = Array.isArray;
function rr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + dn(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function bo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return ce({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function gs(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(N(92));
      if (Ar(n)) {
        if (1 < n.length) throw Error(N(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: dn(n) };
}
function ed(e, t) {
  var n = dn(t.value),
    r = dn(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function ws(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function td(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ea(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? td(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var Ml,
  nd = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Ml = Ml || document.createElement("div"),
          Ml.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Ml.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function br(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Vr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  ap = ["Webkit", "ms", "Moz", "O"];
Object.keys(Vr).forEach(function (e) {
  ap.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Vr[t] = Vr[e]);
  });
});
function rd(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Vr.hasOwnProperty(e) && Vr[e])
    ? ("" + t).trim()
    : t + "px";
}
function ld(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = rd(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var up = ce(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function ta(e, t) {
  if (t) {
    if (up[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(N(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(N(62));
  }
}
function na(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ra = null;
function Ga(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var la = null,
  lr = null,
  ir = null;
function Ss(e) {
  if ((e = wl(e))) {
    if (typeof la != "function") throw Error(N(280));
    var t = e.stateNode;
    t && ((t = Yi(t)), la(e.stateNode, e.type, t));
  }
}
function id(e) {
  lr ? (ir ? ir.push(e) : (ir = [e])) : (lr = e);
}
function od() {
  if (lr) {
    var e = lr,
      t = ir;
    if (((ir = lr = null), Ss(e), t)) for (e = 0; e < t.length; e++) Ss(t[e]);
  }
}
function ad(e, t) {
  return e(t);
}
function ud() {}
var vo = !1;
function sd(e, t, n) {
  if (vo) return e(t, n);
  vo = !0;
  try {
    return ad(e, t, n);
  } finally {
    (vo = !1), (lr !== null || ir !== null) && (ud(), od());
  }
}
function el(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Yi(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(N(231, t, typeof n));
  return n;
}
var ia = !1;
if (jt)
  try {
    var Lr = {};
    Object.defineProperty(Lr, "passive", {
      get: function () {
        ia = !0;
      },
    }),
      window.addEventListener("test", Lr, Lr),
      window.removeEventListener("test", Lr, Lr);
  } catch {
    ia = !1;
  }
function sp(e, t, n, r, l, i, o, a, u) {
  var s = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, s);
  } catch (d) {
    this.onError(d);
  }
}
var Wr = !1,
  pi = null,
  mi = !1,
  oa = null,
  cp = {
    onError: function (e) {
      (Wr = !0), (pi = e);
    },
  };
function dp(e, t, n, r, l, i, o, a, u) {
  (Wr = !1), (pi = null), sp.apply(cp, arguments);
}
function fp(e, t, n, r, l, i, o, a, u) {
  if ((dp.apply(this, arguments), Wr)) {
    if (Wr) {
      var s = pi;
      (Wr = !1), (pi = null);
    } else throw Error(N(198));
    mi || ((mi = !0), (oa = s));
  }
}
function Un(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function cd(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Es(e) {
  if (Un(e) !== e) throw Error(N(188));
}
function hp(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Un(e)), t === null)) throw Error(N(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return Es(l), e;
        if (i === r) return Es(l), t;
        i = i.sibling;
      }
      throw Error(N(188));
    }
    if (n.return !== r.return) (n = l), (r = i);
    else {
      for (var o = !1, a = l.child; a; ) {
        if (a === n) {
          (o = !0), (n = l), (r = i);
          break;
        }
        if (a === r) {
          (o = !0), (r = l), (n = i);
          break;
        }
        a = a.sibling;
      }
      if (!o) {
        for (a = i.child; a; ) {
          if (a === n) {
            (o = !0), (n = i), (r = l);
            break;
          }
          if (a === r) {
            (o = !0), (r = i), (n = l);
            break;
          }
          a = a.sibling;
        }
        if (!o) throw Error(N(189));
      }
    }
    if (n.alternate !== r) throw Error(N(190));
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function dd(e) {
  return (e = hp(e)), e !== null ? fd(e) : null;
}
function fd(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = fd(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var hd = Ze.unstable_scheduleCallback,
  xs = Ze.unstable_cancelCallback,
  pp = Ze.unstable_shouldYield,
  mp = Ze.unstable_requestPaint,
  ye = Ze.unstable_now,
  vp = Ze.unstable_getCurrentPriorityLevel,
  Za = Ze.unstable_ImmediatePriority,
  pd = Ze.unstable_UserBlockingPriority,
  vi = Ze.unstable_NormalPriority,
  yp = Ze.unstable_LowPriority,
  md = Ze.unstable_IdlePriority,
  Vi = null,
  Ct = null;
function gp(e) {
  if (Ct && typeof Ct.onCommitFiberRoot == "function")
    try {
      Ct.onCommitFiberRoot(Vi, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var mt = Math.clz32 ? Math.clz32 : Ep,
  wp = Math.log,
  Sp = Math.LN2;
function Ep(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((wp(e) / Sp) | 0)) | 0;
}
var zl = 64,
  Fl = 4194304;
function Br(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function yi(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    i = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var a = o & ~l;
    a !== 0 ? (r = Br(a)) : ((i &= o), i !== 0 && (r = Br(i)));
  } else (o = n & ~l), o !== 0 ? (r = Br(o)) : i !== 0 && (r = Br(i));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (i = t & -t), l >= i || (l === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - mt(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function xp(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function kp(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var o = 31 - mt(i),
      a = 1 << o,
      u = l[o];
    u === -1
      ? (!(a & n) || a & r) && (l[o] = xp(a, t))
      : u <= t && (e.expiredLanes |= a),
      (i &= ~a);
  }
}
function aa(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function vd() {
  var e = zl;
  return (zl <<= 1), !(zl & 4194240) && (zl = 64), e;
}
function yo(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function yl(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - mt(t)),
    (e[t] = n);
}
function Cp(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - mt(n),
      i = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~i);
  }
}
function qa(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - mt(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var b = 0;
function yd(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var gd,
  ba,
  wd,
  Sd,
  Ed,
  ua = !1,
  jl = [],
  nn = null,
  rn = null,
  ln = null,
  tl = new Map(),
  nl = new Map(),
  Zt = [],
  Pp =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function ks(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      nn = null;
      break;
    case "dragenter":
    case "dragleave":
      rn = null;
      break;
    case "mouseover":
    case "mouseout":
      ln = null;
      break;
    case "pointerover":
    case "pointerout":
      tl.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      nl.delete(t.pointerId);
  }
}
function _r(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l],
      }),
      t !== null && ((t = wl(t)), t !== null && ba(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function Rp(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (nn = _r(nn, e, t, n, r, l)), !0;
    case "dragenter":
      return (rn = _r(rn, e, t, n, r, l)), !0;
    case "mouseover":
      return (ln = _r(ln, e, t, n, r, l)), !0;
    case "pointerover":
      var i = l.pointerId;
      return tl.set(i, _r(tl.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (i = l.pointerId), nl.set(i, _r(nl.get(i) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function xd(e) {
  var t = kn(e.target);
  if (t !== null) {
    var n = Un(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = cd(n)), t !== null)) {
          (e.blockedOn = t),
            Ed(e.priority, function () {
              wd(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function bl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = sa(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (ra = r), n.target.dispatchEvent(r), (ra = null);
    } else return (t = wl(n)), t !== null && ba(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Cs(e, t, n) {
  bl(e) && n.delete(t);
}
function Lp() {
  (ua = !1),
    nn !== null && bl(nn) && (nn = null),
    rn !== null && bl(rn) && (rn = null),
    ln !== null && bl(ln) && (ln = null),
    tl.forEach(Cs),
    nl.forEach(Cs);
}
function Tr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    ua ||
      ((ua = !0),
      Ze.unstable_scheduleCallback(Ze.unstable_NormalPriority, Lp)));
}
function rl(e) {
  function t(l) {
    return Tr(l, e);
  }
  if (0 < jl.length) {
    Tr(jl[0], e);
    for (var n = 1; n < jl.length; n++) {
      var r = jl[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    nn !== null && Tr(nn, e),
      rn !== null && Tr(rn, e),
      ln !== null && Tr(ln, e),
      tl.forEach(t),
      nl.forEach(t),
      n = 0;
    n < Zt.length;
    n++
  )
    (r = Zt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Zt.length && ((n = Zt[0]), n.blockedOn === null); )
    xd(n), n.blockedOn === null && Zt.shift();
}
var or = Ht.ReactCurrentBatchConfig,
  gi = !0;
function _p(e, t, n, r) {
  var l = b,
    i = or.transition;
  or.transition = null;
  try {
    (b = 1), eu(e, t, n, r);
  } finally {
    (b = l), (or.transition = i);
  }
}
function Tp(e, t, n, r) {
  var l = b,
    i = or.transition;
  or.transition = null;
  try {
    (b = 4), eu(e, t, n, r);
  } finally {
    (b = l), (or.transition = i);
  }
}
function eu(e, t, n, r) {
  if (gi) {
    var l = sa(e, t, n, r);
    if (l === null) Lo(e, t, r, wi, n), ks(e, r);
    else if (Rp(l, e, t, n, r)) r.stopPropagation();
    else if ((ks(e, r), t & 4 && -1 < Pp.indexOf(e))) {
      for (; l !== null; ) {
        var i = wl(l);
        if (
          (i !== null && gd(i),
          (i = sa(e, t, n, r)),
          i === null && Lo(e, t, r, wi, n),
          i === l)
        )
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Lo(e, t, r, null, n);
  }
}
var wi = null;
function sa(e, t, n, r) {
  if (((wi = null), (e = Ga(r)), (e = kn(e)), e !== null))
    if (((t = Un(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = cd(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (wi = e), null;
}
function kd(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (vp()) {
        case Za:
          return 1;
        case pd:
          return 4;
        case vi:
        case yp:
          return 16;
        case md:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var bt = null,
  tu = null,
  ei = null;
function Cd() {
  if (ei) return ei;
  var e,
    t = tu,
    n = t.length,
    r,
    l = "value" in bt ? bt.value : bt.textContent,
    i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++);
  return (ei = l.slice(e, 1 < r ? 1 - r : void 0));
}
function ti(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Il() {
  return !0;
}
function Ps() {
  return !1;
}
function be(e) {
  function t(n, r, l, i, o) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = o),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(i) : i[a]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Il
        : Ps),
      (this.isPropagationStopped = Ps),
      this
    );
  }
  return (
    ce(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Il));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Il));
      },
      persist: function () {},
      isPersistent: Il,
    }),
    t
  );
}
var yr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  nu = be(yr),
  gl = ce({}, yr, { view: 0, detail: 0 }),
  Np = be(gl),
  go,
  wo,
  Nr,
  Wi = ce({}, gl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ru,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Nr &&
            (Nr && e.type === "mousemove"
              ? ((go = e.screenX - Nr.screenX), (wo = e.screenY - Nr.screenY))
              : (wo = go = 0),
            (Nr = e)),
          go);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : wo;
    },
  }),
  Rs = be(Wi),
  Dp = ce({}, Wi, { dataTransfer: 0 }),
  Op = be(Dp),
  Mp = ce({}, gl, { relatedTarget: 0 }),
  So = be(Mp),
  zp = ce({}, yr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Fp = be(zp),
  jp = ce({}, yr, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Ip = be(jp),
  Up = ce({}, yr, { data: 0 }),
  Ls = be(Up),
  Ap = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Bp = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Hp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function $p(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Hp[e]) ? !!t[e] : !1;
}
function ru() {
  return $p;
}
var Vp = ce({}, gl, {
    key: function (e) {
      if (e.key) {
        var t = Ap[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = ti(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? Bp[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ru,
    charCode: function (e) {
      return e.type === "keypress" ? ti(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? ti(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  Wp = be(Vp),
  Kp = ce({}, Wi, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  _s = be(Kp),
  Qp = ce({}, gl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ru,
  }),
  Yp = be(Qp),
  Xp = ce({}, yr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Jp = be(Xp),
  Gp = ce({}, Wi, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Zp = be(Gp),
  qp = [9, 13, 27, 32],
  lu = jt && "CompositionEvent" in window,
  Kr = null;
jt && "documentMode" in document && (Kr = document.documentMode);
var bp = jt && "TextEvent" in window && !Kr,
  Pd = jt && (!lu || (Kr && 8 < Kr && 11 >= Kr)),
  Ts = " ",
  Ns = !1;
function Rd(e, t) {
  switch (e) {
    case "keyup":
      return qp.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Ld(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Yn = !1;
function em(e, t) {
  switch (e) {
    case "compositionend":
      return Ld(t);
    case "keypress":
      return t.which !== 32 ? null : ((Ns = !0), Ts);
    case "textInput":
      return (e = t.data), e === Ts && Ns ? null : e;
    default:
      return null;
  }
}
function tm(e, t) {
  if (Yn)
    return e === "compositionend" || (!lu && Rd(e, t))
      ? ((e = Cd()), (ei = tu = bt = null), (Yn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Pd && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var nm = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Ds(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!nm[e.type] : t === "textarea";
}
function _d(e, t, n, r) {
  id(r),
    (t = Si(t, "onChange")),
    0 < t.length &&
      ((n = new nu("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Qr = null,
  ll = null;
function rm(e) {
  Ad(e, 0);
}
function Ki(e) {
  var t = Gn(e);
  if (qc(t)) return e;
}
function lm(e, t) {
  if (e === "change") return t;
}
var Td = !1;
if (jt) {
  var Eo;
  if (jt) {
    var xo = "oninput" in document;
    if (!xo) {
      var Os = document.createElement("div");
      Os.setAttribute("oninput", "return;"),
        (xo = typeof Os.oninput == "function");
    }
    Eo = xo;
  } else Eo = !1;
  Td = Eo && (!document.documentMode || 9 < document.documentMode);
}
function Ms() {
  Qr && (Qr.detachEvent("onpropertychange", Nd), (ll = Qr = null));
}
function Nd(e) {
  if (e.propertyName === "value" && Ki(ll)) {
    var t = [];
    _d(t, ll, e, Ga(e)), sd(rm, t);
  }
}
function im(e, t, n) {
  e === "focusin"
    ? (Ms(), (Qr = t), (ll = n), Qr.attachEvent("onpropertychange", Nd))
    : e === "focusout" && Ms();
}
function om(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Ki(ll);
}
function am(e, t) {
  if (e === "click") return Ki(t);
}
function um(e, t) {
  if (e === "input" || e === "change") return Ki(t);
}
function sm(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var yt = typeof Object.is == "function" ? Object.is : sm;
function il(e, t) {
  if (yt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Ko.call(t, l) || !yt(e[l], t[l])) return !1;
  }
  return !0;
}
function zs(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Fs(e, t) {
  var n = zs(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = zs(n);
  }
}
function Dd(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Dd(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Od() {
  for (var e = window, t = hi(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = hi(e.document);
  }
  return t;
}
function iu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function cm(e) {
  var t = Od(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Dd(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && iu(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          i = Math.min(r.start, l);
        (r = r.end === void 0 ? i : Math.min(r.end, l)),
          !e.extend && i > r && ((l = r), (r = i), (i = l)),
          (l = Fs(n, i));
        var o = Fs(n, r);
        l &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var dm = jt && "documentMode" in document && 11 >= document.documentMode,
  Xn = null,
  ca = null,
  Yr = null,
  da = !1;
function js(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  da ||
    Xn == null ||
    Xn !== hi(r) ||
    ((r = Xn),
    "selectionStart" in r && iu(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Yr && il(Yr, r)) ||
      ((Yr = r),
      (r = Si(ca, "onSelect")),
      0 < r.length &&
        ((t = new nu("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Xn))));
}
function Ul(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Jn = {
    animationend: Ul("Animation", "AnimationEnd"),
    animationiteration: Ul("Animation", "AnimationIteration"),
    animationstart: Ul("Animation", "AnimationStart"),
    transitionend: Ul("Transition", "TransitionEnd"),
  },
  ko = {},
  Md = {};
jt &&
  ((Md = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Jn.animationend.animation,
    delete Jn.animationiteration.animation,
    delete Jn.animationstart.animation),
  "TransitionEvent" in window || delete Jn.transitionend.transition);
function Qi(e) {
  if (ko[e]) return ko[e];
  if (!Jn[e]) return e;
  var t = Jn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Md) return (ko[e] = t[n]);
  return e;
}
var zd = Qi("animationend"),
  Fd = Qi("animationiteration"),
  jd = Qi("animationstart"),
  Id = Qi("transitionend"),
  Ud = new Map(),
  Is =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function pn(e, t) {
  Ud.set(e, t), In(t, [e]);
}
for (var Co = 0; Co < Is.length; Co++) {
  var Po = Is[Co],
    fm = Po.toLowerCase(),
    hm = Po[0].toUpperCase() + Po.slice(1);
  pn(fm, "on" + hm);
}
pn(zd, "onAnimationEnd");
pn(Fd, "onAnimationIteration");
pn(jd, "onAnimationStart");
pn("dblclick", "onDoubleClick");
pn("focusin", "onFocus");
pn("focusout", "onBlur");
pn(Id, "onTransitionEnd");
sr("onMouseEnter", ["mouseout", "mouseover"]);
sr("onMouseLeave", ["mouseout", "mouseover"]);
sr("onPointerEnter", ["pointerout", "pointerover"]);
sr("onPointerLeave", ["pointerout", "pointerover"]);
In(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
In(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
In("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
In(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
In(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
In(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Hr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  pm = new Set("cancel close invalid load scroll toggle".split(" ").concat(Hr));
function Us(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), fp(r, t, void 0, e), (e.currentTarget = null);
}
function Ad(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var a = r[o],
            u = a.instance,
            s = a.currentTarget;
          if (((a = a.listener), u !== i && l.isPropagationStopped())) break e;
          Us(l, a, s), (i = u);
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((a = r[o]),
            (u = a.instance),
            (s = a.currentTarget),
            (a = a.listener),
            u !== i && l.isPropagationStopped())
          )
            break e;
          Us(l, a, s), (i = u);
        }
    }
  }
  if (mi) throw ((e = oa), (mi = !1), (oa = null), e);
}
function le(e, t) {
  var n = t[va];
  n === void 0 && (n = t[va] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Bd(t, e, 2, !1), n.add(r));
}
function Ro(e, t, n) {
  var r = 0;
  t && (r |= 4), Bd(n, e, r, t);
}
var Al = "_reactListening" + Math.random().toString(36).slice(2);
function ol(e) {
  if (!e[Al]) {
    (e[Al] = !0),
      Yc.forEach(function (n) {
        n !== "selectionchange" && (pm.has(n) || Ro(n, !1, e), Ro(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Al] || ((t[Al] = !0), Ro("selectionchange", !1, t));
  }
}
function Bd(e, t, n, r) {
  switch (kd(t)) {
    case 1:
      var l = _p;
      break;
    case 4:
      l = Tp;
      break;
    default:
      l = eu;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !ia ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
      ? e.addEventListener(t, n, { passive: l })
      : e.addEventListener(t, n, !1);
}
function Lo(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var a = r.stateNode.containerInfo;
        if (a === l || (a.nodeType === 8 && a.parentNode === l)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var u = o.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = o.stateNode.containerInfo),
              u === l || (u.nodeType === 8 && u.parentNode === l))
            )
              return;
            o = o.return;
          }
        for (; a !== null; ) {
          if (((o = kn(a)), o === null)) return;
          if (((u = o.tag), u === 5 || u === 6)) {
            r = i = o;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  sd(function () {
    var s = i,
      d = Ga(n),
      c = [];
    e: {
      var f = Ud.get(e);
      if (f !== void 0) {
        var w = nu,
          m = e;
        switch (e) {
          case "keypress":
            if (ti(n) === 0) break e;
          case "keydown":
          case "keyup":
            w = Wp;
            break;
          case "focusin":
            (m = "focus"), (w = So);
            break;
          case "focusout":
            (m = "blur"), (w = So);
            break;
          case "beforeblur":
          case "afterblur":
            w = So;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            w = Rs;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = Op;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = Yp;
            break;
          case zd:
          case Fd:
          case jd:
            w = Fp;
            break;
          case Id:
            w = Jp;
            break;
          case "scroll":
            w = Np;
            break;
          case "wheel":
            w = Zp;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = Ip;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = _s;
        }
        var x = (t & 4) !== 0,
          L = !x && e === "scroll",
          p = x ? (f !== null ? f + "Capture" : null) : f;
        x = [];
        for (var h = s, v; h !== null; ) {
          v = h;
          var E = v.stateNode;
          if (
            (v.tag === 5 &&
              E !== null &&
              ((v = E),
              p !== null && ((E = el(h, p)), E != null && x.push(al(h, E, v)))),
            L)
          )
            break;
          h = h.return;
        }
        0 < x.length &&
          ((f = new w(f, m, null, n, d)), c.push({ event: f, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((f = e === "mouseover" || e === "pointerover"),
          (w = e === "mouseout" || e === "pointerout"),
          f &&
            n !== ra &&
            (m = n.relatedTarget || n.fromElement) &&
            (kn(m) || m[It]))
        )
          break e;
        if (
          (w || f) &&
          ((f =
            d.window === d
              ? d
              : (f = d.ownerDocument)
              ? f.defaultView || f.parentWindow
              : window),
          w
            ? ((m = n.relatedTarget || n.toElement),
              (w = s),
              (m = m ? kn(m) : null),
              m !== null &&
                ((L = Un(m)), m !== L || (m.tag !== 5 && m.tag !== 6)) &&
                (m = null))
            : ((w = null), (m = s)),
          w !== m)
        ) {
          if (
            ((x = Rs),
            (E = "onMouseLeave"),
            (p = "onMouseEnter"),
            (h = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((x = _s),
              (E = "onPointerLeave"),
              (p = "onPointerEnter"),
              (h = "pointer")),
            (L = w == null ? f : Gn(w)),
            (v = m == null ? f : Gn(m)),
            (f = new x(E, h + "leave", w, n, d)),
            (f.target = L),
            (f.relatedTarget = v),
            (E = null),
            kn(d) === s &&
              ((x = new x(p, h + "enter", m, n, d)),
              (x.target = v),
              (x.relatedTarget = L),
              (E = x)),
            (L = E),
            w && m)
          )
            t: {
              for (x = w, p = m, h = 0, v = x; v; v = Vn(v)) h++;
              for (v = 0, E = p; E; E = Vn(E)) v++;
              for (; 0 < h - v; ) (x = Vn(x)), h--;
              for (; 0 < v - h; ) (p = Vn(p)), v--;
              for (; h--; ) {
                if (x === p || (p !== null && x === p.alternate)) break t;
                (x = Vn(x)), (p = Vn(p));
              }
              x = null;
            }
          else x = null;
          w !== null && As(c, f, w, x, !1),
            m !== null && L !== null && As(c, L, m, x, !0);
        }
      }
      e: {
        if (
          ((f = s ? Gn(s) : window),
          (w = f.nodeName && f.nodeName.toLowerCase()),
          w === "select" || (w === "input" && f.type === "file"))
        )
          var R = lm;
        else if (Ds(f))
          if (Td) R = um;
          else {
            R = om;
            var y = im;
          }
        else
          (w = f.nodeName) &&
            w.toLowerCase() === "input" &&
            (f.type === "checkbox" || f.type === "radio") &&
            (R = am);
        if (R && (R = R(e, s))) {
          _d(c, R, n, d);
          break e;
        }
        y && y(e, f, s),
          e === "focusout" &&
            (y = f._wrapperState) &&
            y.controlled &&
            f.type === "number" &&
            qo(f, "number", f.value);
      }
      switch (((y = s ? Gn(s) : window), e)) {
        case "focusin":
          (Ds(y) || y.contentEditable === "true") &&
            ((Xn = y), (ca = s), (Yr = null));
          break;
        case "focusout":
          Yr = ca = Xn = null;
          break;
        case "mousedown":
          da = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (da = !1), js(c, n, d);
          break;
        case "selectionchange":
          if (dm) break;
        case "keydown":
        case "keyup":
          js(c, n, d);
      }
      var _;
      if (lu)
        e: {
          switch (e) {
            case "compositionstart":
              var P = "onCompositionStart";
              break e;
            case "compositionend":
              P = "onCompositionEnd";
              break e;
            case "compositionupdate":
              P = "onCompositionUpdate";
              break e;
          }
          P = void 0;
        }
      else
        Yn
          ? Rd(e, n) && (P = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P &&
        (Pd &&
          n.locale !== "ko" &&
          (Yn || P !== "onCompositionStart"
            ? P === "onCompositionEnd" && Yn && (_ = Cd())
            : ((bt = d),
              (tu = "value" in bt ? bt.value : bt.textContent),
              (Yn = !0))),
        (y = Si(s, P)),
        0 < y.length &&
          ((P = new Ls(P, e, null, n, d)),
          c.push({ event: P, listeners: y }),
          _ ? (P.data = _) : ((_ = Ld(n)), _ !== null && (P.data = _)))),
        (_ = bp ? em(e, n) : tm(e, n)) &&
          ((s = Si(s, "onBeforeInput")),
          0 < s.length &&
            ((d = new Ls("onBeforeInput", "beforeinput", null, n, d)),
            c.push({ event: d, listeners: s }),
            (d.data = _)));
    }
    Ad(c, t);
  });
}
function al(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Si(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      i = l.stateNode;
    l.tag === 5 &&
      i !== null &&
      ((l = i),
      (i = el(e, n)),
      i != null && r.unshift(al(e, i, l)),
      (i = el(e, t)),
      i != null && r.push(al(e, i, l))),
      (e = e.return);
  }
  return r;
}
function Vn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function As(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var a = n,
      u = a.alternate,
      s = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 &&
      s !== null &&
      ((a = s),
      l
        ? ((u = el(n, i)), u != null && o.unshift(al(n, u, a)))
        : l || ((u = el(n, i)), u != null && o.push(al(n, u, a)))),
      (n = n.return);
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var mm = /\r\n?/g,
  vm = /\u0000|\uFFFD/g;
function Bs(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      mm,
      `
`
    )
    .replace(vm, "");
}
function Bl(e, t, n) {
  if (((t = Bs(t)), Bs(e) !== t && n)) throw Error(N(425));
}
function Ei() {}
var fa = null,
  ha = null;
function pa(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var ma = typeof setTimeout == "function" ? setTimeout : void 0,
  ym = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Hs = typeof Promise == "function" ? Promise : void 0,
  gm =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Hs < "u"
      ? function (e) {
          return Hs.resolve(null).then(e).catch(wm);
        }
      : ma;
function wm(e) {
  setTimeout(function () {
    throw e;
  });
}
function _o(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), rl(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  rl(t);
}
function on(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function $s(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var gr = Math.random().toString(36).slice(2),
  kt = "__reactFiber$" + gr,
  ul = "__reactProps$" + gr,
  It = "__reactContainer$" + gr,
  va = "__reactEvents$" + gr,
  Sm = "__reactListeners$" + gr,
  Em = "__reactHandles$" + gr;
function kn(e) {
  var t = e[kt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[It] || n[kt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = $s(e); e !== null; ) {
          if ((n = e[kt])) return n;
          e = $s(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function wl(e) {
  return (
    (e = e[kt] || e[It]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Gn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function Yi(e) {
  return e[ul] || null;
}
var ya = [],
  Zn = -1;
function mn(e) {
  return { current: e };
}
function oe(e) {
  0 > Zn || ((e.current = ya[Zn]), (ya[Zn] = null), Zn--);
}
function ne(e, t) {
  Zn++, (ya[Zn] = e.current), (e.current = t);
}
var fn = {},
  Fe = mn(fn),
  We = mn(!1),
  Tn = fn;
function cr(e, t) {
  var n = e.type.contextTypes;
  if (!n) return fn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    i;
  for (i in n) l[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function Ke(e) {
  return (e = e.childContextTypes), e != null;
}
function xi() {
  oe(We), oe(Fe);
}
function Vs(e, t, n) {
  if (Fe.current !== fn) throw Error(N(168));
  ne(Fe, t), ne(We, n);
}
function Hd(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(N(108, ip(e) || "Unknown", l));
  return ce({}, n, r);
}
function ki(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || fn),
    (Tn = Fe.current),
    ne(Fe, e),
    ne(We, We.current),
    !0
  );
}
function Ws(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  n
    ? ((e = Hd(e, t, Tn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      oe(We),
      oe(Fe),
      ne(Fe, e))
    : oe(We),
    ne(We, n);
}
var Dt = null,
  Xi = !1,
  To = !1;
function $d(e) {
  Dt === null ? (Dt = [e]) : Dt.push(e);
}
function xm(e) {
  (Xi = !0), $d(e);
}
function vn() {
  if (!To && Dt !== null) {
    To = !0;
    var e = 0,
      t = b;
    try {
      var n = Dt;
      for (b = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Dt = null), (Xi = !1);
    } catch (l) {
      throw (Dt !== null && (Dt = Dt.slice(e + 1)), hd(Za, vn), l);
    } finally {
      (b = t), (To = !1);
    }
  }
  return null;
}
var qn = [],
  bn = 0,
  Ci = null,
  Pi = 0,
  nt = [],
  rt = 0,
  Nn = null,
  Mt = 1,
  zt = "";
function Sn(e, t) {
  (qn[bn++] = Pi), (qn[bn++] = Ci), (Ci = e), (Pi = t);
}
function Vd(e, t, n) {
  (nt[rt++] = Mt), (nt[rt++] = zt), (nt[rt++] = Nn), (Nn = e);
  var r = Mt;
  e = zt;
  var l = 32 - mt(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var i = 32 - mt(t) + l;
  if (30 < i) {
    var o = l - (l % 5);
    (i = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (l -= o),
      (Mt = (1 << (32 - mt(t) + l)) | (n << l) | r),
      (zt = i + e);
  } else (Mt = (1 << i) | (n << l) | r), (zt = e);
}
function ou(e) {
  e.return !== null && (Sn(e, 1), Vd(e, 1, 0));
}
function au(e) {
  for (; e === Ci; )
    (Ci = qn[--bn]), (qn[bn] = null), (Pi = qn[--bn]), (qn[bn] = null);
  for (; e === Nn; )
    (Nn = nt[--rt]),
      (nt[rt] = null),
      (zt = nt[--rt]),
      (nt[rt] = null),
      (Mt = nt[--rt]),
      (nt[rt] = null);
}
var Ge = null,
  Je = null,
  ae = !1,
  pt = null;
function Wd(e, t) {
  var n = lt(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Ks(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ge = e), (Je = on(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ge = e), (Je = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Nn !== null ? { id: Mt, overflow: zt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = lt(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ge = e),
            (Je = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function ga(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function wa(e) {
  if (ae) {
    var t = Je;
    if (t) {
      var n = t;
      if (!Ks(e, t)) {
        if (ga(e)) throw Error(N(418));
        t = on(n.nextSibling);
        var r = Ge;
        t && Ks(e, t)
          ? Wd(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (ae = !1), (Ge = e));
      }
    } else {
      if (ga(e)) throw Error(N(418));
      (e.flags = (e.flags & -4097) | 2), (ae = !1), (Ge = e);
    }
  }
}
function Qs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ge = e;
}
function Hl(e) {
  if (e !== Ge) return !1;
  if (!ae) return Qs(e), (ae = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !pa(e.type, e.memoizedProps))),
    t && (t = Je))
  ) {
    if (ga(e)) throw (Kd(), Error(N(418)));
    for (; t; ) Wd(e, t), (t = on(t.nextSibling));
  }
  if ((Qs(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Je = on(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Je = null;
    }
  } else Je = Ge ? on(e.stateNode.nextSibling) : null;
  return !0;
}
function Kd() {
  for (var e = Je; e; ) e = on(e.nextSibling);
}
function dr() {
  (Je = Ge = null), (ae = !1);
}
function uu(e) {
  pt === null ? (pt = [e]) : pt.push(e);
}
var km = Ht.ReactCurrentBatchConfig;
function Dr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(N(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(N(147, e));
      var l = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (o) {
            var a = l.refs;
            o === null ? delete a[i] : (a[i] = o);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(N(284));
    if (!n._owner) throw Error(N(290, e));
  }
  return e;
}
function $l(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      N(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Ys(e) {
  var t = e._init;
  return t(e._payload);
}
function Qd(e) {
  function t(p, h) {
    if (e) {
      var v = p.deletions;
      v === null ? ((p.deletions = [h]), (p.flags |= 16)) : v.push(h);
    }
  }
  function n(p, h) {
    if (!e) return null;
    for (; h !== null; ) t(p, h), (h = h.sibling);
    return null;
  }
  function r(p, h) {
    for (p = new Map(); h !== null; )
      h.key !== null ? p.set(h.key, h) : p.set(h.index, h), (h = h.sibling);
    return p;
  }
  function l(p, h) {
    return (p = cn(p, h)), (p.index = 0), (p.sibling = null), p;
  }
  function i(p, h, v) {
    return (
      (p.index = v),
      e
        ? ((v = p.alternate),
          v !== null
            ? ((v = v.index), v < h ? ((p.flags |= 2), h) : v)
            : ((p.flags |= 2), h))
        : ((p.flags |= 1048576), h)
    );
  }
  function o(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function a(p, h, v, E) {
    return h === null || h.tag !== 6
      ? ((h = jo(v, p.mode, E)), (h.return = p), h)
      : ((h = l(h, v)), (h.return = p), h);
  }
  function u(p, h, v, E) {
    var R = v.type;
    return R === Qn
      ? d(p, h, v.props.children, E, v.key)
      : h !== null &&
        (h.elementType === R ||
          (typeof R == "object" &&
            R !== null &&
            R.$$typeof === Jt &&
            Ys(R) === h.type))
      ? ((E = l(h, v.props)), (E.ref = Dr(p, h, v)), (E.return = p), E)
      : ((E = ui(v.type, v.key, v.props, null, p.mode, E)),
        (E.ref = Dr(p, h, v)),
        (E.return = p),
        E);
  }
  function s(p, h, v, E) {
    return h === null ||
      h.tag !== 4 ||
      h.stateNode.containerInfo !== v.containerInfo ||
      h.stateNode.implementation !== v.implementation
      ? ((h = Io(v, p.mode, E)), (h.return = p), h)
      : ((h = l(h, v.children || [])), (h.return = p), h);
  }
  function d(p, h, v, E, R) {
    return h === null || h.tag !== 7
      ? ((h = _n(v, p.mode, E, R)), (h.return = p), h)
      : ((h = l(h, v)), (h.return = p), h);
  }
  function c(p, h, v) {
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return (h = jo("" + h, p.mode, v)), (h.return = p), h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case Dl:
          return (
            (v = ui(h.type, h.key, h.props, null, p.mode, v)),
            (v.ref = Dr(p, null, h)),
            (v.return = p),
            v
          );
        case Kn:
          return (h = Io(h, p.mode, v)), (h.return = p), h;
        case Jt:
          var E = h._init;
          return c(p, E(h._payload), v);
      }
      if (Ar(h) || Rr(h))
        return (h = _n(h, p.mode, v, null)), (h.return = p), h;
      $l(p, h);
    }
    return null;
  }
  function f(p, h, v, E) {
    var R = h !== null ? h.key : null;
    if ((typeof v == "string" && v !== "") || typeof v == "number")
      return R !== null ? null : a(p, h, "" + v, E);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Dl:
          return v.key === R ? u(p, h, v, E) : null;
        case Kn:
          return v.key === R ? s(p, h, v, E) : null;
        case Jt:
          return (R = v._init), f(p, h, R(v._payload), E);
      }
      if (Ar(v) || Rr(v)) return R !== null ? null : d(p, h, v, E, null);
      $l(p, v);
    }
    return null;
  }
  function w(p, h, v, E, R) {
    if ((typeof E == "string" && E !== "") || typeof E == "number")
      return (p = p.get(v) || null), a(h, p, "" + E, R);
    if (typeof E == "object" && E !== null) {
      switch (E.$$typeof) {
        case Dl:
          return (p = p.get(E.key === null ? v : E.key) || null), u(h, p, E, R);
        case Kn:
          return (p = p.get(E.key === null ? v : E.key) || null), s(h, p, E, R);
        case Jt:
          var y = E._init;
          return w(p, h, v, y(E._payload), R);
      }
      if (Ar(E) || Rr(E)) return (p = p.get(v) || null), d(h, p, E, R, null);
      $l(h, E);
    }
    return null;
  }
  function m(p, h, v, E) {
    for (
      var R = null, y = null, _ = h, P = (h = 0), D = null;
      _ !== null && P < v.length;
      P++
    ) {
      _.index > P ? ((D = _), (_ = null)) : (D = _.sibling);
      var O = f(p, _, v[P], E);
      if (O === null) {
        _ === null && (_ = D);
        break;
      }
      e && _ && O.alternate === null && t(p, _),
        (h = i(O, h, P)),
        y === null ? (R = O) : (y.sibling = O),
        (y = O),
        (_ = D);
    }
    if (P === v.length) return n(p, _), ae && Sn(p, P), R;
    if (_ === null) {
      for (; P < v.length; P++)
        (_ = c(p, v[P], E)),
          _ !== null &&
            ((h = i(_, h, P)), y === null ? (R = _) : (y.sibling = _), (y = _));
      return ae && Sn(p, P), R;
    }
    for (_ = r(p, _); P < v.length; P++)
      (D = w(_, p, P, v[P], E)),
        D !== null &&
          (e && D.alternate !== null && _.delete(D.key === null ? P : D.key),
          (h = i(D, h, P)),
          y === null ? (R = D) : (y.sibling = D),
          (y = D));
    return (
      e &&
        _.forEach(function (K) {
          return t(p, K);
        }),
      ae && Sn(p, P),
      R
    );
  }
  function x(p, h, v, E) {
    var R = Rr(v);
    if (typeof R != "function") throw Error(N(150));
    if (((v = R.call(v)), v == null)) throw Error(N(151));
    for (
      var y = (R = null), _ = h, P = (h = 0), D = null, O = v.next();
      _ !== null && !O.done;
      P++, O = v.next()
    ) {
      _.index > P ? ((D = _), (_ = null)) : (D = _.sibling);
      var K = f(p, _, O.value, E);
      if (K === null) {
        _ === null && (_ = D);
        break;
      }
      e && _ && K.alternate === null && t(p, _),
        (h = i(K, h, P)),
        y === null ? (R = K) : (y.sibling = K),
        (y = K),
        (_ = D);
    }
    if (O.done) return n(p, _), ae && Sn(p, P), R;
    if (_ === null) {
      for (; !O.done; P++, O = v.next())
        (O = c(p, O.value, E)),
          O !== null &&
            ((h = i(O, h, P)), y === null ? (R = O) : (y.sibling = O), (y = O));
      return ae && Sn(p, P), R;
    }
    for (_ = r(p, _); !O.done; P++, O = v.next())
      (O = w(_, p, P, O.value, E)),
        O !== null &&
          (e && O.alternate !== null && _.delete(O.key === null ? P : O.key),
          (h = i(O, h, P)),
          y === null ? (R = O) : (y.sibling = O),
          (y = O));
    return (
      e &&
        _.forEach(function (J) {
          return t(p, J);
        }),
      ae && Sn(p, P),
      R
    );
  }
  function L(p, h, v, E) {
    if (
      (typeof v == "object" &&
        v !== null &&
        v.type === Qn &&
        v.key === null &&
        (v = v.props.children),
      typeof v == "object" && v !== null)
    ) {
      switch (v.$$typeof) {
        case Dl:
          e: {
            for (var R = v.key, y = h; y !== null; ) {
              if (y.key === R) {
                if (((R = v.type), R === Qn)) {
                  if (y.tag === 7) {
                    n(p, y.sibling),
                      (h = l(y, v.props.children)),
                      (h.return = p),
                      (p = h);
                    break e;
                  }
                } else if (
                  y.elementType === R ||
                  (typeof R == "object" &&
                    R !== null &&
                    R.$$typeof === Jt &&
                    Ys(R) === y.type)
                ) {
                  n(p, y.sibling),
                    (h = l(y, v.props)),
                    (h.ref = Dr(p, y, v)),
                    (h.return = p),
                    (p = h);
                  break e;
                }
                n(p, y);
                break;
              } else t(p, y);
              y = y.sibling;
            }
            v.type === Qn
              ? ((h = _n(v.props.children, p.mode, E, v.key)),
                (h.return = p),
                (p = h))
              : ((E = ui(v.type, v.key, v.props, null, p.mode, E)),
                (E.ref = Dr(p, h, v)),
                (E.return = p),
                (p = E));
          }
          return o(p);
        case Kn:
          e: {
            for (y = v.key; h !== null; ) {
              if (h.key === y)
                if (
                  h.tag === 4 &&
                  h.stateNode.containerInfo === v.containerInfo &&
                  h.stateNode.implementation === v.implementation
                ) {
                  n(p, h.sibling),
                    (h = l(h, v.children || [])),
                    (h.return = p),
                    (p = h);
                  break e;
                } else {
                  n(p, h);
                  break;
                }
              else t(p, h);
              h = h.sibling;
            }
            (h = Io(v, p.mode, E)), (h.return = p), (p = h);
          }
          return o(p);
        case Jt:
          return (y = v._init), L(p, h, y(v._payload), E);
      }
      if (Ar(v)) return m(p, h, v, E);
      if (Rr(v)) return x(p, h, v, E);
      $l(p, v);
    }
    return (typeof v == "string" && v !== "") || typeof v == "number"
      ? ((v = "" + v),
        h !== null && h.tag === 6
          ? (n(p, h.sibling), (h = l(h, v)), (h.return = p), (p = h))
          : (n(p, h), (h = jo(v, p.mode, E)), (h.return = p), (p = h)),
        o(p))
      : n(p, h);
  }
  return L;
}
var fr = Qd(!0),
  Yd = Qd(!1),
  Ri = mn(null),
  Li = null,
  er = null,
  su = null;
function cu() {
  su = er = Li = null;
}
function du(e) {
  var t = Ri.current;
  oe(Ri), (e._currentValue = t);
}
function Sa(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function ar(e, t) {
  (Li = e),
    (su = er = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ve = !0), (e.firstContext = null));
}
function ot(e) {
  var t = e._currentValue;
  if (su !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), er === null)) {
      if (Li === null) throw Error(N(308));
      (er = e), (Li.dependencies = { lanes: 0, firstContext: e });
    } else er = er.next = e;
  return t;
}
var Cn = null;
function fu(e) {
  Cn === null ? (Cn = [e]) : Cn.push(e);
}
function Xd(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), fu(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    Ut(e, r)
  );
}
function Ut(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Gt = !1;
function hu(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Jd(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Ft(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function an(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), X & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      Ut(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), fu(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    Ut(e, n)
  );
}
function ni(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), qa(e, n);
  }
}
function Xs(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        i === null ? (l = i = o) : (i = i.next = o), (n = n.next);
      } while (n !== null);
      i === null ? (l = i = t) : (i = i.next = t);
    } else l = i = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function _i(e, t, n, r) {
  var l = e.updateQueue;
  Gt = !1;
  var i = l.firstBaseUpdate,
    o = l.lastBaseUpdate,
    a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a,
      s = u.next;
    (u.next = null), o === null ? (i = s) : (o.next = s), (o = u);
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (a = d.lastBaseUpdate),
      a !== o &&
        (a === null ? (d.firstBaseUpdate = s) : (a.next = s),
        (d.lastBaseUpdate = u)));
  }
  if (i !== null) {
    var c = l.baseState;
    (o = 0), (d = s = u = null), (a = i);
    do {
      var f = a.lane,
        w = a.eventTime;
      if ((r & f) === f) {
        d !== null &&
          (d = d.next =
            {
              eventTime: w,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var m = e,
            x = a;
          switch (((f = t), (w = n), x.tag)) {
            case 1:
              if (((m = x.payload), typeof m == "function")) {
                c = m.call(w, c, f);
                break e;
              }
              c = m;
              break e;
            case 3:
              m.flags = (m.flags & -65537) | 128;
            case 0:
              if (
                ((m = x.payload),
                (f = typeof m == "function" ? m.call(w, c, f) : m),
                f == null)
              )
                break e;
              c = ce({}, c, f);
              break e;
            case 2:
              Gt = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (f = l.effects),
          f === null ? (l.effects = [a]) : f.push(a));
      } else
        (w = {
          eventTime: w,
          lane: f,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          d === null ? ((s = d = w), (u = c)) : (d = d.next = w),
          (o |= f);
      if (((a = a.next), a === null)) {
        if (((a = l.shared.pending), a === null)) break;
        (f = a),
          (a = f.next),
          (f.next = null),
          (l.lastBaseUpdate = f),
          (l.shared.pending = null);
      }
    } while (!0);
    if (
      (d === null && (u = c),
      (l.baseState = u),
      (l.firstBaseUpdate = s),
      (l.lastBaseUpdate = d),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (o |= l.lane), (l = l.next);
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    (On |= o), (e.lanes = o), (e.memoizedState = c);
  }
}
function Js(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(N(191, l));
        l.call(r);
      }
    }
}
var Sl = {},
  Pt = mn(Sl),
  sl = mn(Sl),
  cl = mn(Sl);
function Pn(e) {
  if (e === Sl) throw Error(N(174));
  return e;
}
function pu(e, t) {
  switch ((ne(cl, t), ne(sl, e), ne(Pt, Sl), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ea(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = ea(t, e));
  }
  oe(Pt), ne(Pt, t);
}
function hr() {
  oe(Pt), oe(sl), oe(cl);
}
function Gd(e) {
  Pn(cl.current);
  var t = Pn(Pt.current),
    n = ea(t, e.type);
  t !== n && (ne(sl, e), ne(Pt, n));
}
function mu(e) {
  sl.current === e && (oe(Pt), oe(sl));
}
var ue = mn(0);
function Ti(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var No = [];
function vu() {
  for (var e = 0; e < No.length; e++)
    No[e]._workInProgressVersionPrimary = null;
  No.length = 0;
}
var ri = Ht.ReactCurrentDispatcher,
  Do = Ht.ReactCurrentBatchConfig,
  Dn = 0,
  se = null,
  Ee = null,
  Ce = null,
  Ni = !1,
  Xr = !1,
  dl = 0,
  Cm = 0;
function Oe() {
  throw Error(N(321));
}
function yu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!yt(e[n], t[n])) return !1;
  return !0;
}
function gu(e, t, n, r, l, i) {
  if (
    ((Dn = i),
    (se = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (ri.current = e === null || e.memoizedState === null ? _m : Tm),
    (e = n(r, l)),
    Xr)
  ) {
    i = 0;
    do {
      if (((Xr = !1), (dl = 0), 25 <= i)) throw Error(N(301));
      (i += 1),
        (Ce = Ee = null),
        (t.updateQueue = null),
        (ri.current = Nm),
        (e = n(r, l));
    } while (Xr);
  }
  if (
    ((ri.current = Di),
    (t = Ee !== null && Ee.next !== null),
    (Dn = 0),
    (Ce = Ee = se = null),
    (Ni = !1),
    t)
  )
    throw Error(N(300));
  return e;
}
function wu() {
  var e = dl !== 0;
  return (dl = 0), e;
}
function xt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return Ce === null ? (se.memoizedState = Ce = e) : (Ce = Ce.next = e), Ce;
}
function at() {
  if (Ee === null) {
    var e = se.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Ee.next;
  var t = Ce === null ? se.memoizedState : Ce.next;
  if (t !== null) (Ce = t), (Ee = e);
  else {
    if (e === null) throw Error(N(310));
    (Ee = e),
      (e = {
        memoizedState: Ee.memoizedState,
        baseState: Ee.baseState,
        baseQueue: Ee.baseQueue,
        queue: Ee.queue,
        next: null,
      }),
      Ce === null ? (se.memoizedState = Ce = e) : (Ce = Ce.next = e);
  }
  return Ce;
}
function fl(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Oo(e) {
  var t = at(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = Ee,
    l = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      (l.next = i.next), (i.next = o);
    }
    (r.baseQueue = l = i), (n.pending = null);
  }
  if (l !== null) {
    (i = l.next), (r = r.baseState);
    var a = (o = null),
      u = null,
      s = i;
    do {
      var d = s.lane;
      if ((Dn & d) === d)
        u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: s.action,
              hasEagerState: s.hasEagerState,
              eagerState: s.eagerState,
              next: null,
            }),
          (r = s.hasEagerState ? s.eagerState : e(r, s.action));
      else {
        var c = {
          lane: d,
          action: s.action,
          hasEagerState: s.hasEagerState,
          eagerState: s.eagerState,
          next: null,
        };
        u === null ? ((a = u = c), (o = r)) : (u = u.next = c),
          (se.lanes |= d),
          (On |= d);
      }
      s = s.next;
    } while (s !== null && s !== i);
    u === null ? (o = r) : (u.next = a),
      yt(r, t.memoizedState) || (Ve = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = u),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (i = l.lane), (se.lanes |= i), (On |= i), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Mo(e) {
  var t = at(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = (l = l.next);
    do (i = e(i, o.action)), (o = o.next);
    while (o !== l);
    yt(i, t.memoizedState) || (Ve = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i);
  }
  return [i, r];
}
function Zd() {}
function qd(e, t) {
  var n = se,
    r = at(),
    l = t(),
    i = !yt(r.memoizedState, l);
  if (
    (i && ((r.memoizedState = l), (Ve = !0)),
    (r = r.queue),
    Su(tf.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (Ce !== null && Ce.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      hl(9, ef.bind(null, n, r, l, t), void 0, null),
      Pe === null)
    )
      throw Error(N(349));
    Dn & 30 || bd(n, t, l);
  }
  return l;
}
function bd(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = se.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (se.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function ef(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), nf(t) && rf(e);
}
function tf(e, t, n) {
  return n(function () {
    nf(t) && rf(e);
  });
}
function nf(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !yt(e, n);
  } catch {
    return !0;
  }
}
function rf(e) {
  var t = Ut(e, 1);
  t !== null && vt(t, e, 1, -1);
}
function Gs(e) {
  var t = xt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: fl,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Lm.bind(null, se, e)),
    [t.memoizedState, e]
  );
}
function hl(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = se.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (se.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function lf() {
  return at().memoizedState;
}
function li(e, t, n, r) {
  var l = xt();
  (se.flags |= e),
    (l.memoizedState = hl(1 | t, n, void 0, r === void 0 ? null : r));
}
function Ji(e, t, n, r) {
  var l = at();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (Ee !== null) {
    var o = Ee.memoizedState;
    if (((i = o.destroy), r !== null && yu(r, o.deps))) {
      l.memoizedState = hl(t, n, i, r);
      return;
    }
  }
  (se.flags |= e), (l.memoizedState = hl(1 | t, n, i, r));
}
function Zs(e, t) {
  return li(8390656, 8, e, t);
}
function Su(e, t) {
  return Ji(2048, 8, e, t);
}
function of(e, t) {
  return Ji(4, 2, e, t);
}
function af(e, t) {
  return Ji(4, 4, e, t);
}
function uf(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function sf(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Ji(4, 4, uf.bind(null, t, e), n)
  );
}
function Eu() {}
function cf(e, t) {
  var n = at();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && yu(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function df(e, t) {
  var n = at();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && yu(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function ff(e, t, n) {
  return Dn & 21
    ? (yt(n, t) || ((n = vd()), (se.lanes |= n), (On |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ve = !0)), (e.memoizedState = n));
}
function Pm(e, t) {
  var n = b;
  (b = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Do.transition;
  Do.transition = {};
  try {
    e(!1), t();
  } finally {
    (b = n), (Do.transition = r);
  }
}
function hf() {
  return at().memoizedState;
}
function Rm(e, t, n) {
  var r = sn(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    pf(e))
  )
    mf(t, n);
  else if (((n = Xd(e, t, n, r)), n !== null)) {
    var l = Ae();
    vt(n, e, r, l), vf(n, t, r);
  }
}
function Lm(e, t, n) {
  var r = sn(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (pf(e)) mf(t, l);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var o = t.lastRenderedState,
          a = i(o, n);
        if (((l.hasEagerState = !0), (l.eagerState = a), yt(a, o))) {
          var u = t.interleaved;
          u === null
            ? ((l.next = l), fu(t))
            : ((l.next = u.next), (u.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = Xd(e, t, l, r)),
      n !== null && ((l = Ae()), vt(n, e, r, l), vf(n, t, r));
  }
}
function pf(e) {
  var t = e.alternate;
  return e === se || (t !== null && t === se);
}
function mf(e, t) {
  Xr = Ni = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function vf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), qa(e, n);
  }
}
var Di = {
    readContext: ot,
    useCallback: Oe,
    useContext: Oe,
    useEffect: Oe,
    useImperativeHandle: Oe,
    useInsertionEffect: Oe,
    useLayoutEffect: Oe,
    useMemo: Oe,
    useReducer: Oe,
    useRef: Oe,
    useState: Oe,
    useDebugValue: Oe,
    useDeferredValue: Oe,
    useTransition: Oe,
    useMutableSource: Oe,
    useSyncExternalStore: Oe,
    useId: Oe,
    unstable_isNewReconciler: !1,
  },
  _m = {
    readContext: ot,
    useCallback: function (e, t) {
      return (xt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: ot,
    useEffect: Zs,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        li(4194308, 4, uf.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return li(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return li(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = xt();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = xt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Rm.bind(null, se, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = xt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Gs,
    useDebugValue: Eu,
    useDeferredValue: function (e) {
      return (xt().memoizedState = e);
    },
    useTransition: function () {
      var e = Gs(!1),
        t = e[0];
      return (e = Pm.bind(null, e[1])), (xt().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = se,
        l = xt();
      if (ae) {
        if (n === void 0) throw Error(N(407));
        n = n();
      } else {
        if (((n = t()), Pe === null)) throw Error(N(349));
        Dn & 30 || bd(r, t, n);
      }
      l.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (l.queue = i),
        Zs(tf.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        hl(9, ef.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = xt(),
        t = Pe.identifierPrefix;
      if (ae) {
        var n = zt,
          r = Mt;
        (n = (r & ~(1 << (32 - mt(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = dl++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Cm++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Tm = {
    readContext: ot,
    useCallback: cf,
    useContext: ot,
    useEffect: Su,
    useImperativeHandle: sf,
    useInsertionEffect: of,
    useLayoutEffect: af,
    useMemo: df,
    useReducer: Oo,
    useRef: lf,
    useState: function () {
      return Oo(fl);
    },
    useDebugValue: Eu,
    useDeferredValue: function (e) {
      var t = at();
      return ff(t, Ee.memoizedState, e);
    },
    useTransition: function () {
      var e = Oo(fl)[0],
        t = at().memoizedState;
      return [e, t];
    },
    useMutableSource: Zd,
    useSyncExternalStore: qd,
    useId: hf,
    unstable_isNewReconciler: !1,
  },
  Nm = {
    readContext: ot,
    useCallback: cf,
    useContext: ot,
    useEffect: Su,
    useImperativeHandle: sf,
    useInsertionEffect: of,
    useLayoutEffect: af,
    useMemo: df,
    useReducer: Mo,
    useRef: lf,
    useState: function () {
      return Mo(fl);
    },
    useDebugValue: Eu,
    useDeferredValue: function (e) {
      var t = at();
      return Ee === null ? (t.memoizedState = e) : ff(t, Ee.memoizedState, e);
    },
    useTransition: function () {
      var e = Mo(fl)[0],
        t = at().memoizedState;
      return [e, t];
    },
    useMutableSource: Zd,
    useSyncExternalStore: qd,
    useId: hf,
    unstable_isNewReconciler: !1,
  };
function dt(e, t) {
  if (e && e.defaultProps) {
    (t = ce({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ea(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : ce({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Gi = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Un(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ae(),
      l = sn(e),
      i = Ft(r, l);
    (i.payload = t),
      n != null && (i.callback = n),
      (t = an(e, i, l)),
      t !== null && (vt(t, e, l, r), ni(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ae(),
      l = sn(e),
      i = Ft(r, l);
    (i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = an(e, i, l)),
      t !== null && (vt(t, e, l, r), ni(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Ae(),
      r = sn(e),
      l = Ft(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = an(e, l, r)),
      t !== null && (vt(t, e, r, n), ni(t, e, r));
  },
};
function qs(e, t, n, r, l, i, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, o)
      : t.prototype && t.prototype.isPureReactComponent
      ? !il(n, r) || !il(l, i)
      : !0
  );
}
function yf(e, t, n) {
  var r = !1,
    l = fn,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = ot(i))
      : ((l = Ke(t) ? Tn : Fe.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? cr(e, l) : fn)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Gi),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function bs(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Gi.enqueueReplaceState(t, t.state, null);
}
function xa(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = {}), hu(e);
  var i = t.contextType;
  typeof i == "object" && i !== null
    ? (l.context = ot(i))
    : ((i = Ke(t) ? Tn : Fe.current), (l.context = cr(e, i))),
    (l.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (Ea(e, t, i, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && Gi.enqueueReplaceState(l, l.state, null),
      _i(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function pr(e, t) {
  try {
    var n = "",
      r = t;
    do (n += lp(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (i) {
    l =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function zo(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ka(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Dm = typeof WeakMap == "function" ? WeakMap : Map;
function gf(e, t, n) {
  (n = Ft(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      Mi || ((Mi = !0), (Ma = r)), ka(e, t);
    }),
    n
  );
}
function wf(e, t, n) {
  (n = Ft(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        ka(e, t);
      });
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        ka(e, t),
          typeof r != "function" &&
            (un === null ? (un = new Set([this])) : un.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function ec(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Dm();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = Km.bind(null, e, t, n)), t.then(e, e));
}
function tc(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function nc(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Ft(-1, 1)), (t.tag = 2), an(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Om = Ht.ReactCurrentOwner,
  Ve = !1;
function Ue(e, t, n, r) {
  t.child = e === null ? Yd(t, null, n, r) : fr(t, e.child, n, r);
}
function rc(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return (
    ar(t, l),
    (r = gu(e, t, n, r, i, l)),
    (n = wu()),
    e !== null && !Ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        At(e, t, l))
      : (ae && n && ou(t), (t.flags |= 1), Ue(e, t, r, l), t.child)
  );
}
function lc(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !Tu(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), Sf(e, t, i, r, l))
      : ((e = ui(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & l))) {
    var o = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : il), n(o, r) && e.ref === t.ref)
    )
      return At(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = cn(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Sf(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (il(i, r) && e.ref === t.ref)
      if (((Ve = !1), (t.pendingProps = r = i), (e.lanes & l) !== 0))
        e.flags & 131072 && (Ve = !0);
      else return (t.lanes = e.lanes), At(e, t, l);
  }
  return Ca(e, t, n, r, l);
}
function Ef(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        ne(nr, Ye),
        (Ye |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          ne(nr, Ye),
          (Ye |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        ne(nr, Ye),
        (Ye |= r);
    }
  else
    i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      ne(nr, Ye),
      (Ye |= r);
  return Ue(e, t, l, n), t.child;
}
function xf(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Ca(e, t, n, r, l) {
  var i = Ke(n) ? Tn : Fe.current;
  return (
    (i = cr(t, i)),
    ar(t, l),
    (n = gu(e, t, n, r, i, l)),
    (r = wu()),
    e !== null && !Ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        At(e, t, l))
      : (ae && r && ou(t), (t.flags |= 1), Ue(e, t, n, l), t.child)
  );
}
function ic(e, t, n, r, l) {
  if (Ke(n)) {
    var i = !0;
    ki(t);
  } else i = !1;
  if ((ar(t, l), t.stateNode === null))
    ii(e, t), yf(t, n, r), xa(t, n, r, l), (r = !0);
  else if (e === null) {
    var o = t.stateNode,
      a = t.memoizedProps;
    o.props = a;
    var u = o.context,
      s = n.contextType;
    typeof s == "object" && s !== null
      ? (s = ot(s))
      : ((s = Ke(n) ? Tn : Fe.current), (s = cr(t, s)));
    var d = n.getDerivedStateFromProps,
      c =
        typeof d == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    c ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((a !== r || u !== s) && bs(t, o, r, s)),
      (Gt = !1);
    var f = t.memoizedState;
    (o.state = f),
      _i(t, r, o, l),
      (u = t.memoizedState),
      a !== r || f !== u || We.current || Gt
        ? (typeof d == "function" && (Ea(t, n, d, r), (u = t.memoizedState)),
          (a = Gt || qs(t, n, a, r, f, u, s))
            ? (c ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (o.props = r),
          (o.state = u),
          (o.context = s),
          (r = a))
        : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (o = t.stateNode),
      Jd(e, t),
      (a = t.memoizedProps),
      (s = t.type === t.elementType ? a : dt(t.type, a)),
      (o.props = s),
      (c = t.pendingProps),
      (f = o.context),
      (u = n.contextType),
      typeof u == "object" && u !== null
        ? (u = ot(u))
        : ((u = Ke(n) ? Tn : Fe.current), (u = cr(t, u)));
    var w = n.getDerivedStateFromProps;
    (d =
      typeof w == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((a !== c || f !== u) && bs(t, o, r, u)),
      (Gt = !1),
      (f = t.memoizedState),
      (o.state = f),
      _i(t, r, o, l);
    var m = t.memoizedState;
    a !== c || f !== m || We.current || Gt
      ? (typeof w == "function" && (Ea(t, n, w, r), (m = t.memoizedState)),
        (s = Gt || qs(t, n, s, r, f, m, u) || !1)
          ? (d ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, m, u),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, m, u)),
            typeof o.componentDidUpdate == "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (a === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = m)),
        (o.props = r),
        (o.state = m),
        (o.context = u),
        (r = s))
      : (typeof o.componentDidUpdate != "function" ||
          (a === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Pa(e, t, n, r, i, l);
}
function Pa(e, t, n, r, l, i) {
  xf(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && Ws(t, n, !1), At(e, t, i);
  (r = t.stateNode), (Om.current = t);
  var a =
    o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = fr(t, e.child, null, i)), (t.child = fr(t, null, a, i)))
      : Ue(e, t, a, i),
    (t.memoizedState = r.state),
    l && Ws(t, n, !0),
    t.child
  );
}
function kf(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Vs(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Vs(e, t.context, !1),
    pu(e, t.containerInfo);
}
function oc(e, t, n, r, l) {
  return dr(), uu(l), (t.flags |= 256), Ue(e, t, n, r), t.child;
}
var Ra = { dehydrated: null, treeContext: null, retryLane: 0 };
function La(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Cf(e, t, n) {
  var r = t.pendingProps,
    l = ue.current,
    i = !1,
    o = (t.flags & 128) !== 0,
    a;
  if (
    ((a = o) ||
      (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    a
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    ne(ue, l & 1),
    e === null)
  )
    return (
      wa(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((o = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (o = { mode: "hidden", children: o }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = o))
                : (i = bi(o, r, 0, null)),
              (e = _n(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = La(n)),
              (t.memoizedState = Ra),
              e)
            : xu(t, o))
    );
  if (((l = e.memoizedState), l !== null && ((a = l.dehydrated), a !== null)))
    return Mm(e, t, o, r, a, l, n);
  if (i) {
    (i = r.fallback), (o = t.mode), (l = e.child), (a = l.sibling);
    var u = { mode: "hidden", children: r.children };
    return (
      !(o & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = cn(l, u)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      a !== null ? (i = cn(a, i)) : ((i = _n(i, o, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? La(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (i.memoizedState = o),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = Ra),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = cn(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function xu(e, t) {
  return (
    (t = bi({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Vl(e, t, n, r) {
  return (
    r !== null && uu(r),
    fr(t, e.child, null, n),
    (e = xu(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Mm(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = zo(Error(N(422)))), Vl(e, t, o, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((i = r.fallback),
        (l = t.mode),
        (r = bi({ mode: "visible", children: r.children }, l, 0, null)),
        (i = _n(i, l, o, null)),
        (i.flags |= 2),
        (r.return = t),
        (i.return = t),
        (r.sibling = i),
        (t.child = r),
        t.mode & 1 && fr(t, e.child, null, o),
        (t.child.memoizedState = La(o)),
        (t.memoizedState = Ra),
        i);
  if (!(t.mode & 1)) return Vl(e, t, o, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var a = r.dgst;
    return (r = a), (i = Error(N(419))), (r = zo(i, r, void 0)), Vl(e, t, o, r);
  }
  if (((a = (o & e.childLanes) !== 0), Ve || a)) {
    if (((r = Pe), r !== null)) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | o) ? 0 : l),
        l !== 0 &&
          l !== i.retryLane &&
          ((i.retryLane = l), Ut(e, l), vt(r, e, l, -1));
    }
    return _u(), (r = zo(Error(N(421)))), Vl(e, t, o, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Qm.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (Je = on(l.nextSibling)),
      (Ge = t),
      (ae = !0),
      (pt = null),
      e !== null &&
        ((nt[rt++] = Mt),
        (nt[rt++] = zt),
        (nt[rt++] = Nn),
        (Mt = e.id),
        (zt = e.overflow),
        (Nn = t)),
      (t = xu(t, r.children)),
      (t.flags |= 4096),
      t);
}
function ac(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Sa(e.return, t, n);
}
function Fo(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = l));
}
function Pf(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    i = r.tail;
  if ((Ue(e, t, r.children, n), (r = ue.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ac(e, n, t);
        else if (e.tag === 19) ac(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((ne(ue, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && Ti(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          Fo(t, !1, l, n, i);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Ti(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        Fo(t, !0, n, null, i);
        break;
      case "together":
        Fo(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function ii(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function At(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (On |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (
      e = t.child, n = cn(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = cn(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function zm(e, t, n) {
  switch (t.tag) {
    case 3:
      kf(t), dr();
      break;
    case 5:
      Gd(t);
      break;
    case 1:
      Ke(t.type) && ki(t);
      break;
    case 4:
      pu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      ne(Ri, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (ne(ue, ue.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? Cf(e, t, n)
          : (ne(ue, ue.current & 1),
            (e = At(e, t, n)),
            e !== null ? e.sibling : null);
      ne(ue, ue.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Pf(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        ne(ue, ue.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Ef(e, t, n);
  }
  return At(e, t, n);
}
var Rf, _a, Lf, _f;
Rf = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
_a = function () {};
Lf = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), Pn(Pt.current);
    var i = null;
    switch (n) {
      case "input":
        (l = Go(e, l)), (r = Go(e, r)), (i = []);
        break;
      case "select":
        (l = ce({}, l, { value: void 0 })),
          (r = ce({}, r, { value: void 0 })),
          (i = []);
        break;
      case "textarea":
        (l = bo(e, l)), (r = bo(e, r)), (i = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Ei);
    }
    ta(n, r);
    var o;
    n = null;
    for (s in l)
      if (!r.hasOwnProperty(s) && l.hasOwnProperty(s) && l[s] != null)
        if (s === "style") {
          var a = l[s];
          for (o in a) a.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          s !== "dangerouslySetInnerHTML" &&
            s !== "children" &&
            s !== "suppressContentEditableWarning" &&
            s !== "suppressHydrationWarning" &&
            s !== "autoFocus" &&
            (qr.hasOwnProperty(s)
              ? i || (i = [])
              : (i = i || []).push(s, null));
    for (s in r) {
      var u = r[s];
      if (
        ((a = l != null ? l[s] : void 0),
        r.hasOwnProperty(s) && u !== a && (u != null || a != null))
      )
        if (s === "style")
          if (a) {
            for (o in a)
              !a.hasOwnProperty(o) ||
                (u && u.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in u)
              u.hasOwnProperty(o) &&
                a[o] !== u[o] &&
                (n || (n = {}), (n[o] = u[o]));
          } else n || (i || (i = []), i.push(s, n)), (n = u);
        else
          s === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0),
              (a = a ? a.__html : void 0),
              u != null && a !== u && (i = i || []).push(s, u))
            : s === "children"
            ? (typeof u != "string" && typeof u != "number") ||
              (i = i || []).push(s, "" + u)
            : s !== "suppressContentEditableWarning" &&
              s !== "suppressHydrationWarning" &&
              (qr.hasOwnProperty(s)
                ? (u != null && s === "onScroll" && le("scroll", e),
                  i || a === u || (i = []))
                : (i = i || []).push(s, u));
    }
    n && (i = i || []).push("style", n);
    var s = i;
    (t.updateQueue = s) && (t.flags |= 4);
  }
};
_f = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Or(e, t) {
  if (!ae)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Me(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Fm(e, t, n) {
  var r = t.pendingProps;
  switch ((au(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Me(t), null;
    case 1:
      return Ke(t.type) && xi(), Me(t), null;
    case 3:
      return (
        (r = t.stateNode),
        hr(),
        oe(We),
        oe(Fe),
        vu(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Hl(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), pt !== null && (ja(pt), (pt = null)))),
        _a(e, t),
        Me(t),
        null
      );
    case 5:
      mu(t);
      var l = Pn(cl.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Lf(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return Me(t), null;
        }
        if (((e = Pn(Pt.current)), Hl(t))) {
          (r = t.stateNode), (n = t.type);
          var i = t.memoizedProps;
          switch (((r[kt] = t), (r[ul] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              le("cancel", r), le("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              le("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Hr.length; l++) le(Hr[l], r);
              break;
            case "source":
              le("error", r);
              break;
            case "img":
            case "image":
            case "link":
              le("error", r), le("load", r);
              break;
            case "details":
              le("toggle", r);
              break;
            case "input":
              vs(r, i), le("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!i.multiple }),
                le("invalid", r);
              break;
            case "textarea":
              gs(r, i), le("invalid", r);
          }
          ta(n, i), (l = null);
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var a = i[o];
              o === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (i.suppressHydrationWarning !== !0 &&
                      Bl(r.textContent, a, e),
                    (l = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (i.suppressHydrationWarning !== !0 &&
                      Bl(r.textContent, a, e),
                    (l = ["children", "" + a]))
                : qr.hasOwnProperty(o) &&
                  a != null &&
                  o === "onScroll" &&
                  le("scroll", r);
            }
          switch (n) {
            case "input":
              Ol(r), ys(r, i, !0);
              break;
            case "textarea":
              Ol(r), ws(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Ei);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (o = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = td(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = o.createElement(n, { is: r.is }))
                : ((e = o.createElement(n)),
                  n === "select" &&
                    ((o = e),
                    r.multiple
                      ? (o.multiple = !0)
                      : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[kt] = t),
            (e[ul] = r),
            Rf(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((o = na(n, r)), n)) {
              case "dialog":
                le("cancel", e), le("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                le("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Hr.length; l++) le(Hr[l], e);
                l = r;
                break;
              case "source":
                le("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                le("error", e), le("load", e), (l = r);
                break;
              case "details":
                le("toggle", e), (l = r);
                break;
              case "input":
                vs(e, r), (l = Go(e, r)), le("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = ce({}, r, { value: void 0 })),
                  le("invalid", e);
                break;
              case "textarea":
                gs(e, r), (l = bo(e, r)), le("invalid", e);
                break;
              default:
                l = r;
            }
            ta(n, l), (a = l);
            for (i in a)
              if (a.hasOwnProperty(i)) {
                var u = a[i];
                i === "style"
                  ? ld(e, u)
                  : i === "dangerouslySetInnerHTML"
                  ? ((u = u ? u.__html : void 0), u != null && nd(e, u))
                  : i === "children"
                  ? typeof u == "string"
                    ? (n !== "textarea" || u !== "") && br(e, u)
                    : typeof u == "number" && br(e, "" + u)
                  : i !== "suppressContentEditableWarning" &&
                    i !== "suppressHydrationWarning" &&
                    i !== "autoFocus" &&
                    (qr.hasOwnProperty(i)
                      ? u != null && i === "onScroll" && le("scroll", e)
                      : u != null && Qa(e, i, u, o));
              }
            switch (n) {
              case "input":
                Ol(e), ys(e, r, !1);
                break;
              case "textarea":
                Ol(e), ws(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + dn(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? rr(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      rr(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Ei);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Me(t), null;
    case 6:
      if (e && t.stateNode != null) _f(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (((n = Pn(cl.current)), Pn(Pt.current), Hl(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[kt] = t),
            (i = r.nodeValue !== n) && ((e = Ge), e !== null))
          )
            switch (e.tag) {
              case 3:
                Bl(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Bl(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[kt] = t),
            (t.stateNode = r);
      }
      return Me(t), null;
    case 13:
      if (
        (oe(ue),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (ae && Je !== null && t.mode & 1 && !(t.flags & 128))
          Kd(), dr(), (t.flags |= 98560), (i = !1);
        else if (((i = Hl(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(N(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(N(317));
            i[kt] = t;
          } else
            dr(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Me(t), (i = !1);
        } else pt !== null && (ja(pt), (pt = null)), (i = !0);
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || ue.current & 1 ? xe === 0 && (xe = 3) : _u())),
          t.updateQueue !== null && (t.flags |= 4),
          Me(t),
          null);
    case 4:
      return (
        hr(), _a(e, t), e === null && ol(t.stateNode.containerInfo), Me(t), null
      );
    case 10:
      return du(t.type._context), Me(t), null;
    case 17:
      return Ke(t.type) && xi(), Me(t), null;
    case 19:
      if ((oe(ue), (i = t.memoizedState), i === null)) return Me(t), null;
      if (((r = (t.flags & 128) !== 0), (o = i.rendering), o === null))
        if (r) Or(i, !1);
        else {
          if (xe !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((o = Ti(e)), o !== null)) {
                for (
                  t.flags |= 128,
                    Or(i, !1),
                    r = o.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (o = i.alternate),
                    o === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = o.childLanes),
                        (i.lanes = o.lanes),
                        (i.child = o.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = o.memoizedProps),
                        (i.memoizedState = o.memoizedState),
                        (i.updateQueue = o.updateQueue),
                        (i.type = o.type),
                        (e = o.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return ne(ue, (ue.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null &&
            ye() > mr &&
            ((t.flags |= 128), (r = !0), Or(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Ti(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Or(i, !0),
              i.tail === null && i.tailMode === "hidden" && !o.alternate && !ae)
            )
              return Me(t), null;
          } else
            2 * ye() - i.renderingStartTime > mr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Or(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = i.last),
            n !== null ? (n.sibling = o) : (t.child = o),
            (i.last = o));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = ye()),
          (t.sibling = null),
          (n = ue.current),
          ne(ue, r ? (n & 1) | 2 : n & 1),
          t)
        : (Me(t), null);
    case 22:
    case 23:
      return (
        Lu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ye & 1073741824 && (Me(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Me(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function jm(e, t) {
  switch ((au(t), t.tag)) {
    case 1:
      return (
        Ke(t.type) && xi(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        hr(),
        oe(We),
        oe(Fe),
        vu(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return mu(t), null;
    case 13:
      if (
        (oe(ue), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(N(340));
        dr();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return oe(ue), null;
    case 4:
      return hr(), null;
    case 10:
      return du(t.type._context), null;
    case 22:
    case 23:
      return Lu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Wl = !1,
  ze = !1,
  Im = typeof WeakSet == "function" ? WeakSet : Set,
  z = null;
function tr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        me(e, t, r);
      }
    else n.current = null;
}
function Ta(e, t, n) {
  try {
    n();
  } catch (r) {
    me(e, t, r);
  }
}
var uc = !1;
function Um(e, t) {
  if (((fa = gi), (e = Od()), iu(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            a = -1,
            u = -1,
            s = 0,
            d = 0,
            c = e,
            f = null;
          t: for (;;) {
            for (
              var w;
              c !== n || (l !== 0 && c.nodeType !== 3) || (a = o + l),
                c !== i || (r !== 0 && c.nodeType !== 3) || (u = o + r),
                c.nodeType === 3 && (o += c.nodeValue.length),
                (w = c.firstChild) !== null;

            )
              (f = c), (c = w);
            for (;;) {
              if (c === e) break t;
              if (
                (f === n && ++s === l && (a = o),
                f === i && ++d === r && (u = o),
                (w = c.nextSibling) !== null)
              )
                break;
              (c = f), (f = c.parentNode);
            }
            c = w;
          }
          n = a === -1 || u === -1 ? null : { start: a, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (ha = { focusedElem: e, selectionRange: n }, gi = !1, z = t; z !== null; )
    if (((t = z), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (z = e);
    else
      for (; z !== null; ) {
        t = z;
        try {
          var m = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (m !== null) {
                  var x = m.memoizedProps,
                    L = m.memoizedState,
                    p = t.stateNode,
                    h = p.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? x : dt(t.type, x),
                      L
                    );
                  p.__reactInternalSnapshotBeforeUpdate = h;
                }
                break;
              case 3:
                var v = t.stateNode.containerInfo;
                v.nodeType === 1
                  ? (v.textContent = "")
                  : v.nodeType === 9 &&
                    v.documentElement &&
                    v.removeChild(v.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(N(163));
            }
        } catch (E) {
          me(t, t.return, E);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (z = e);
          break;
        }
        z = t.return;
      }
  return (m = uc), (uc = !1), m;
}
function Jr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        (l.destroy = void 0), i !== void 0 && Ta(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Zi(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Na(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Tf(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Tf(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[kt], delete t[ul], delete t[va], delete t[Sm], delete t[Em])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Nf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function sc(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Nf(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Da(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Ei));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Da(e, t, n), e = e.sibling; e !== null; ) Da(e, t, n), (e = e.sibling);
}
function Oa(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Oa(e, t, n), e = e.sibling; e !== null; ) Oa(e, t, n), (e = e.sibling);
}
var Te = null,
  ft = !1;
function Yt(e, t, n) {
  for (n = n.child; n !== null; ) Df(e, t, n), (n = n.sibling);
}
function Df(e, t, n) {
  if (Ct && typeof Ct.onCommitFiberUnmount == "function")
    try {
      Ct.onCommitFiberUnmount(Vi, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ze || tr(n, t);
    case 6:
      var r = Te,
        l = ft;
      (Te = null),
        Yt(e, t, n),
        (Te = r),
        (ft = l),
        Te !== null &&
          (ft
            ? ((e = Te),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Te.removeChild(n.stateNode));
      break;
    case 18:
      Te !== null &&
        (ft
          ? ((e = Te),
            (n = n.stateNode),
            e.nodeType === 8
              ? _o(e.parentNode, n)
              : e.nodeType === 1 && _o(e, n),
            rl(e))
          : _o(Te, n.stateNode));
      break;
    case 4:
      (r = Te),
        (l = ft),
        (Te = n.stateNode.containerInfo),
        (ft = !0),
        Yt(e, t, n),
        (Te = r),
        (ft = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ze &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var i = l,
            o = i.destroy;
          (i = i.tag),
            o !== void 0 && (i & 2 || i & 4) && Ta(n, t, o),
            (l = l.next);
        } while (l !== r);
      }
      Yt(e, t, n);
      break;
    case 1:
      if (
        !ze &&
        (tr(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (a) {
          me(n, t, a);
        }
      Yt(e, t, n);
      break;
    case 21:
      Yt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ze = (r = ze) || n.memoizedState !== null), Yt(e, t, n), (ze = r))
        : Yt(e, t, n);
      break;
    default:
      Yt(e, t, n);
  }
}
function cc(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Im()),
      t.forEach(function (r) {
        var l = Ym.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function ct(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e,
          o = t,
          a = o;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (Te = a.stateNode), (ft = !1);
              break e;
            case 3:
              (Te = a.stateNode.containerInfo), (ft = !0);
              break e;
            case 4:
              (Te = a.stateNode.containerInfo), (ft = !0);
              break e;
          }
          a = a.return;
        }
        if (Te === null) throw Error(N(160));
        Df(i, o, l), (Te = null), (ft = !1);
        var u = l.alternate;
        u !== null && (u.return = null), (l.return = null);
      } catch (s) {
        me(l, t, s);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Of(t, e), (t = t.sibling);
}
function Of(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((ct(t, e), Et(e), r & 4)) {
        try {
          Jr(3, e, e.return), Zi(3, e);
        } catch (x) {
          me(e, e.return, x);
        }
        try {
          Jr(5, e, e.return);
        } catch (x) {
          me(e, e.return, x);
        }
      }
      break;
    case 1:
      ct(t, e), Et(e), r & 512 && n !== null && tr(n, n.return);
      break;
    case 5:
      if (
        (ct(t, e),
        Et(e),
        r & 512 && n !== null && tr(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          br(l, "");
        } catch (x) {
          me(e, e.return, x);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var i = e.memoizedProps,
          o = n !== null ? n.memoizedProps : i,
          a = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            a === "input" && i.type === "radio" && i.name != null && bc(l, i),
              na(a, o);
            var s = na(a, i);
            for (o = 0; o < u.length; o += 2) {
              var d = u[o],
                c = u[o + 1];
              d === "style"
                ? ld(l, c)
                : d === "dangerouslySetInnerHTML"
                ? nd(l, c)
                : d === "children"
                ? br(l, c)
                : Qa(l, d, c, s);
            }
            switch (a) {
              case "input":
                Zo(l, i);
                break;
              case "textarea":
                ed(l, i);
                break;
              case "select":
                var f = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var w = i.value;
                w != null
                  ? rr(l, !!i.multiple, w, !1)
                  : f !== !!i.multiple &&
                    (i.defaultValue != null
                      ? rr(l, !!i.multiple, i.defaultValue, !0)
                      : rr(l, !!i.multiple, i.multiple ? [] : "", !1));
            }
            l[ul] = i;
          } catch (x) {
            me(e, e.return, x);
          }
      }
      break;
    case 6:
      if ((ct(t, e), Et(e), r & 4)) {
        if (e.stateNode === null) throw Error(N(162));
        (l = e.stateNode), (i = e.memoizedProps);
        try {
          l.nodeValue = i;
        } catch (x) {
          me(e, e.return, x);
        }
      }
      break;
    case 3:
      if (
        (ct(t, e), Et(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          rl(t.containerInfo);
        } catch (x) {
          me(e, e.return, x);
        }
      break;
    case 4:
      ct(t, e), Et(e);
      break;
    case 13:
      ct(t, e),
        Et(e),
        (l = e.child),
        l.flags & 8192 &&
          ((i = l.memoizedState !== null),
          (l.stateNode.isHidden = i),
          !i ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Pu = ye())),
        r & 4 && cc(e);
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ze = (s = ze) || d), ct(t, e), (ze = s)) : ct(t, e),
        Et(e),
        r & 8192)
      ) {
        if (
          ((s = e.memoizedState !== null),
          (e.stateNode.isHidden = s) && !d && e.mode & 1)
        )
          for (z = e, d = e.child; d !== null; ) {
            for (c = z = d; z !== null; ) {
              switch (((f = z), (w = f.child), f.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Jr(4, f, f.return);
                  break;
                case 1:
                  tr(f, f.return);
                  var m = f.stateNode;
                  if (typeof m.componentWillUnmount == "function") {
                    (r = f), (n = f.return);
                    try {
                      (t = r),
                        (m.props = t.memoizedProps),
                        (m.state = t.memoizedState),
                        m.componentWillUnmount();
                    } catch (x) {
                      me(r, n, x);
                    }
                  }
                  break;
                case 5:
                  tr(f, f.return);
                  break;
                case 22:
                  if (f.memoizedState !== null) {
                    fc(c);
                    continue;
                  }
              }
              w !== null ? ((w.return = f), (z = w)) : fc(c);
            }
            d = d.sibling;
          }
        e: for (d = null, c = e; ; ) {
          if (c.tag === 5) {
            if (d === null) {
              d = c;
              try {
                (l = c.stateNode),
                  s
                    ? ((i = l.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((a = c.stateNode),
                      (u = c.memoizedProps.style),
                      (o =
                        u != null && u.hasOwnProperty("display")
                          ? u.display
                          : null),
                      (a.style.display = rd("display", o)));
              } catch (x) {
                me(e, e.return, x);
              }
            }
          } else if (c.tag === 6) {
            if (d === null)
              try {
                c.stateNode.nodeValue = s ? "" : c.memoizedProps;
              } catch (x) {
                me(e, e.return, x);
              }
          } else if (
            ((c.tag !== 22 && c.tag !== 23) ||
              c.memoizedState === null ||
              c === e) &&
            c.child !== null
          ) {
            (c.child.return = c), (c = c.child);
            continue;
          }
          if (c === e) break e;
          for (; c.sibling === null; ) {
            if (c.return === null || c.return === e) break e;
            d === c && (d = null), (c = c.return);
          }
          d === c && (d = null), (c.sibling.return = c.return), (c = c.sibling);
        }
      }
      break;
    case 19:
      ct(t, e), Et(e), r & 4 && cc(e);
      break;
    case 21:
      break;
    default:
      ct(t, e), Et(e);
  }
}
function Et(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Nf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(N(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (br(l, ""), (r.flags &= -33));
          var i = sc(e);
          Oa(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            a = sc(e);
          Da(e, a, o);
          break;
        default:
          throw Error(N(161));
      }
    } catch (u) {
      me(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Am(e, t, n) {
  (z = e), Mf(e);
}
function Mf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; z !== null; ) {
    var l = z,
      i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || Wl;
      if (!o) {
        var a = l.alternate,
          u = (a !== null && a.memoizedState !== null) || ze;
        a = Wl;
        var s = ze;
        if (((Wl = o), (ze = u) && !s))
          for (z = l; z !== null; )
            (o = z),
              (u = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? hc(l)
                : u !== null
                ? ((u.return = o), (z = u))
                : hc(l);
        for (; i !== null; ) (z = i), Mf(i), (i = i.sibling);
        (z = l), (Wl = a), (ze = s);
      }
      dc(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? ((i.return = l), (z = i)) : dc(e);
  }
}
function dc(e) {
  for (; z !== null; ) {
    var t = z;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ze || Zi(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ze)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : dt(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var i = t.updateQueue;
              i !== null && Js(t, i, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Js(t, o, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var s = t.alternate;
                if (s !== null) {
                  var d = s.memoizedState;
                  if (d !== null) {
                    var c = d.dehydrated;
                    c !== null && rl(c);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(N(163));
          }
        ze || (t.flags & 512 && Na(t));
      } catch (f) {
        me(t, t.return, f);
      }
    }
    if (t === e) {
      z = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (z = n);
      break;
    }
    z = t.return;
  }
}
function fc(e) {
  for (; z !== null; ) {
    var t = z;
    if (t === e) {
      z = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (z = n);
      break;
    }
    z = t.return;
  }
}
function hc(e) {
  for (; z !== null; ) {
    var t = z;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Zi(4, t);
          } catch (u) {
            me(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              me(t, l, u);
            }
          }
          var i = t.return;
          try {
            Na(t);
          } catch (u) {
            me(t, i, u);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Na(t);
          } catch (u) {
            me(t, o, u);
          }
      }
    } catch (u) {
      me(t, t.return, u);
    }
    if (t === e) {
      z = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (z = a);
      break;
    }
    z = t.return;
  }
}
var Bm = Math.ceil,
  Oi = Ht.ReactCurrentDispatcher,
  ku = Ht.ReactCurrentOwner,
  it = Ht.ReactCurrentBatchConfig,
  X = 0,
  Pe = null,
  Se = null,
  Ne = 0,
  Ye = 0,
  nr = mn(0),
  xe = 0,
  pl = null,
  On = 0,
  qi = 0,
  Cu = 0,
  Gr = null,
  $e = null,
  Pu = 0,
  mr = 1 / 0,
  Nt = null,
  Mi = !1,
  Ma = null,
  un = null,
  Kl = !1,
  en = null,
  zi = 0,
  Zr = 0,
  za = null,
  oi = -1,
  ai = 0;
function Ae() {
  return X & 6 ? ye() : oi !== -1 ? oi : (oi = ye());
}
function sn(e) {
  return e.mode & 1
    ? X & 2 && Ne !== 0
      ? Ne & -Ne
      : km.transition !== null
      ? (ai === 0 && (ai = vd()), ai)
      : ((e = b),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : kd(e.type))),
        e)
    : 1;
}
function vt(e, t, n, r) {
  if (50 < Zr) throw ((Zr = 0), (za = null), Error(N(185)));
  yl(e, n, r),
    (!(X & 2) || e !== Pe) &&
      (e === Pe && (!(X & 2) && (qi |= n), xe === 4 && qt(e, Ne)),
      Qe(e, r),
      n === 1 && X === 0 && !(t.mode & 1) && ((mr = ye() + 500), Xi && vn()));
}
function Qe(e, t) {
  var n = e.callbackNode;
  kp(e, t);
  var r = yi(e, e === Pe ? Ne : 0);
  if (r === 0)
    n !== null && xs(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && xs(n), t === 1))
      e.tag === 0 ? xm(pc.bind(null, e)) : $d(pc.bind(null, e)),
        gm(function () {
          !(X & 6) && vn();
        }),
        (n = null);
    else {
      switch (yd(r)) {
        case 1:
          n = Za;
          break;
        case 4:
          n = pd;
          break;
        case 16:
          n = vi;
          break;
        case 536870912:
          n = md;
          break;
        default:
          n = vi;
      }
      n = Hf(n, zf.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function zf(e, t) {
  if (((oi = -1), (ai = 0), X & 6)) throw Error(N(327));
  var n = e.callbackNode;
  if (ur() && e.callbackNode !== n) return null;
  var r = yi(e, e === Pe ? Ne : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Fi(e, r);
  else {
    t = r;
    var l = X;
    X |= 2;
    var i = jf();
    (Pe !== e || Ne !== t) && ((Nt = null), (mr = ye() + 500), Ln(e, t));
    do
      try {
        Vm();
        break;
      } catch (a) {
        Ff(e, a);
      }
    while (!0);
    cu(),
      (Oi.current = i),
      (X = l),
      Se !== null ? (t = 0) : ((Pe = null), (Ne = 0), (t = xe));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = aa(e)), l !== 0 && ((r = l), (t = Fa(e, l)))), t === 1)
    )
      throw ((n = pl), Ln(e, 0), qt(e, r), Qe(e, ye()), n);
    if (t === 6) qt(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Hm(l) &&
          ((t = Fi(e, r)),
          t === 2 && ((i = aa(e)), i !== 0 && ((r = i), (t = Fa(e, i)))),
          t === 1))
      )
        throw ((n = pl), Ln(e, 0), qt(e, r), Qe(e, ye()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          En(e, $e, Nt);
          break;
        case 3:
          if (
            (qt(e, r), (r & 130023424) === r && ((t = Pu + 500 - ye()), 10 < t))
          ) {
            if (yi(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              Ae(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = ma(En.bind(null, e, $e, Nt), t);
            break;
          }
          En(e, $e, Nt);
          break;
        case 4:
          if ((qt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - mt(r);
            (i = 1 << o), (o = t[o]), o > l && (l = o), (r &= ~i);
          }
          if (
            ((r = l),
            (r = ye() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * Bm(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = ma(En.bind(null, e, $e, Nt), r);
            break;
          }
          En(e, $e, Nt);
          break;
        case 5:
          En(e, $e, Nt);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return Qe(e, ye()), e.callbackNode === n ? zf.bind(null, e) : null;
}
function Fa(e, t) {
  var n = Gr;
  return (
    e.current.memoizedState.isDehydrated && (Ln(e, t).flags |= 256),
    (e = Fi(e, t)),
    e !== 2 && ((t = $e), ($e = n), t !== null && ja(t)),
    e
  );
}
function ja(e) {
  $e === null ? ($e = e) : $e.push.apply($e, e);
}
function Hm(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            i = l.getSnapshot;
          l = l.value;
          try {
            if (!yt(i(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function qt(e, t) {
  for (
    t &= ~Cu,
      t &= ~qi,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - mt(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function pc(e) {
  if (X & 6) throw Error(N(327));
  ur();
  var t = yi(e, 0);
  if (!(t & 1)) return Qe(e, ye()), null;
  var n = Fi(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = aa(e);
    r !== 0 && ((t = r), (n = Fa(e, r)));
  }
  if (n === 1) throw ((n = pl), Ln(e, 0), qt(e, t), Qe(e, ye()), n);
  if (n === 6) throw Error(N(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    En(e, $e, Nt),
    Qe(e, ye()),
    null
  );
}
function Ru(e, t) {
  var n = X;
  X |= 1;
  try {
    return e(t);
  } finally {
    (X = n), X === 0 && ((mr = ye() + 500), Xi && vn());
  }
}
function Mn(e) {
  en !== null && en.tag === 0 && !(X & 6) && ur();
  var t = X;
  X |= 1;
  var n = it.transition,
    r = b;
  try {
    if (((it.transition = null), (b = 1), e)) return e();
  } finally {
    (b = r), (it.transition = n), (X = t), !(X & 6) && vn();
  }
}
function Lu() {
  (Ye = nr.current), oe(nr);
}
function Ln(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), ym(n)), Se !== null))
    for (n = Se.return; n !== null; ) {
      var r = n;
      switch ((au(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && xi();
          break;
        case 3:
          hr(), oe(We), oe(Fe), vu();
          break;
        case 5:
          mu(r);
          break;
        case 4:
          hr();
          break;
        case 13:
          oe(ue);
          break;
        case 19:
          oe(ue);
          break;
        case 10:
          du(r.type._context);
          break;
        case 22:
        case 23:
          Lu();
      }
      n = n.return;
    }
  if (
    ((Pe = e),
    (Se = e = cn(e.current, null)),
    (Ne = Ye = t),
    (xe = 0),
    (pl = null),
    (Cu = qi = On = 0),
    ($e = Gr = null),
    Cn !== null)
  ) {
    for (t = 0; t < Cn.length; t++)
      if (((n = Cn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          i = n.pending;
        if (i !== null) {
          var o = i.next;
          (i.next = l), (r.next = o);
        }
        n.pending = r;
      }
    Cn = null;
  }
  return e;
}
function Ff(e, t) {
  do {
    var n = Se;
    try {
      if ((cu(), (ri.current = Di), Ni)) {
        for (var r = se.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        Ni = !1;
      }
      if (
        ((Dn = 0),
        (Ce = Ee = se = null),
        (Xr = !1),
        (dl = 0),
        (ku.current = null),
        n === null || n.return === null)
      ) {
        (xe = 1), (pl = t), (Se = null);
        break;
      }
      e: {
        var i = e,
          o = n.return,
          a = n,
          u = t;
        if (
          ((t = Ne),
          (a.flags |= 32768),
          u !== null && typeof u == "object" && typeof u.then == "function")
        ) {
          var s = u,
            d = a,
            c = d.tag;
          if (!(d.mode & 1) && (c === 0 || c === 11 || c === 15)) {
            var f = d.alternate;
            f
              ? ((d.updateQueue = f.updateQueue),
                (d.memoizedState = f.memoizedState),
                (d.lanes = f.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var w = tc(o);
          if (w !== null) {
            (w.flags &= -257),
              nc(w, o, a, i, t),
              w.mode & 1 && ec(i, s, t),
              (t = w),
              (u = s);
            var m = t.updateQueue;
            if (m === null) {
              var x = new Set();
              x.add(u), (t.updateQueue = x);
            } else m.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              ec(i, s, t), _u();
              break e;
            }
            u = Error(N(426));
          }
        } else if (ae && a.mode & 1) {
          var L = tc(o);
          if (L !== null) {
            !(L.flags & 65536) && (L.flags |= 256),
              nc(L, o, a, i, t),
              uu(pr(u, a));
            break e;
          }
        }
        (i = u = pr(u, a)),
          xe !== 4 && (xe = 2),
          Gr === null ? (Gr = [i]) : Gr.push(i),
          (i = o);
        do {
          switch (i.tag) {
            case 3:
              (i.flags |= 65536), (t &= -t), (i.lanes |= t);
              var p = gf(i, u, t);
              Xs(i, p);
              break e;
            case 1:
              a = u;
              var h = i.type,
                v = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof h.getDerivedStateFromError == "function" ||
                  (v !== null &&
                    typeof v.componentDidCatch == "function" &&
                    (un === null || !un.has(v))))
              ) {
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var E = wf(i, a, t);
                Xs(i, E);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Uf(n);
    } catch (R) {
      (t = R), Se === n && n !== null && (Se = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function jf() {
  var e = Oi.current;
  return (Oi.current = Di), e === null ? Di : e;
}
function _u() {
  (xe === 0 || xe === 3 || xe === 2) && (xe = 4),
    Pe === null || (!(On & 268435455) && !(qi & 268435455)) || qt(Pe, Ne);
}
function Fi(e, t) {
  var n = X;
  X |= 2;
  var r = jf();
  (Pe !== e || Ne !== t) && ((Nt = null), Ln(e, t));
  do
    try {
      $m();
      break;
    } catch (l) {
      Ff(e, l);
    }
  while (!0);
  if ((cu(), (X = n), (Oi.current = r), Se !== null)) throw Error(N(261));
  return (Pe = null), (Ne = 0), xe;
}
function $m() {
  for (; Se !== null; ) If(Se);
}
function Vm() {
  for (; Se !== null && !pp(); ) If(Se);
}
function If(e) {
  var t = Bf(e.alternate, e, Ye);
  (e.memoizedProps = e.pendingProps),
    t === null ? Uf(e) : (Se = t),
    (ku.current = null);
}
function Uf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = jm(n, t)), n !== null)) {
        (n.flags &= 32767), (Se = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (xe = 6), (Se = null);
        return;
      }
    } else if (((n = Fm(n, t, Ye)), n !== null)) {
      Se = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Se = t;
      return;
    }
    Se = t = e;
  } while (t !== null);
  xe === 0 && (xe = 5);
}
function En(e, t, n) {
  var r = b,
    l = it.transition;
  try {
    (it.transition = null), (b = 1), Wm(e, t, n, r);
  } finally {
    (it.transition = l), (b = r);
  }
  return null;
}
function Wm(e, t, n, r) {
  do ur();
  while (en !== null);
  if (X & 6) throw Error(N(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(N(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var i = n.lanes | n.childLanes;
  if (
    (Cp(e, i),
    e === Pe && ((Se = Pe = null), (Ne = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Kl ||
      ((Kl = !0),
      Hf(vi, function () {
        return ur(), null;
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    (i = it.transition), (it.transition = null);
    var o = b;
    b = 1;
    var a = X;
    (X |= 4),
      (ku.current = null),
      Um(e, n),
      Of(n, e),
      cm(ha),
      (gi = !!fa),
      (ha = fa = null),
      (e.current = n),
      Am(n),
      mp(),
      (X = a),
      (b = o),
      (it.transition = i);
  } else e.current = n;
  if (
    (Kl && ((Kl = !1), (en = e), (zi = l)),
    (i = e.pendingLanes),
    i === 0 && (un = null),
    gp(n.stateNode),
    Qe(e, ye()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Mi) throw ((Mi = !1), (e = Ma), (Ma = null), e);
  return (
    zi & 1 && e.tag !== 0 && ur(),
    (i = e.pendingLanes),
    i & 1 ? (e === za ? Zr++ : ((Zr = 0), (za = e))) : (Zr = 0),
    vn(),
    null
  );
}
function ur() {
  if (en !== null) {
    var e = yd(zi),
      t = it.transition,
      n = b;
    try {
      if (((it.transition = null), (b = 16 > e ? 16 : e), en === null))
        var r = !1;
      else {
        if (((e = en), (en = null), (zi = 0), X & 6)) throw Error(N(331));
        var l = X;
        for (X |= 4, z = e.current; z !== null; ) {
          var i = z,
            o = i.child;
          if (z.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var s = a[u];
                for (z = s; z !== null; ) {
                  var d = z;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Jr(8, d, i);
                  }
                  var c = d.child;
                  if (c !== null) (c.return = d), (z = c);
                  else
                    for (; z !== null; ) {
                      d = z;
                      var f = d.sibling,
                        w = d.return;
                      if ((Tf(d), d === s)) {
                        z = null;
                        break;
                      }
                      if (f !== null) {
                        (f.return = w), (z = f);
                        break;
                      }
                      z = w;
                    }
                }
              }
              var m = i.alternate;
              if (m !== null) {
                var x = m.child;
                if (x !== null) {
                  m.child = null;
                  do {
                    var L = x.sibling;
                    (x.sibling = null), (x = L);
                  } while (x !== null);
                }
              }
              z = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) (o.return = i), (z = o);
          else
            e: for (; z !== null; ) {
              if (((i = z), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Jr(9, i, i.return);
                }
              var p = i.sibling;
              if (p !== null) {
                (p.return = i.return), (z = p);
                break e;
              }
              z = i.return;
            }
        }
        var h = e.current;
        for (z = h; z !== null; ) {
          o = z;
          var v = o.child;
          if (o.subtreeFlags & 2064 && v !== null) (v.return = o), (z = v);
          else
            e: for (o = h; z !== null; ) {
              if (((a = z), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Zi(9, a);
                  }
                } catch (R) {
                  me(a, a.return, R);
                }
              if (a === o) {
                z = null;
                break e;
              }
              var E = a.sibling;
              if (E !== null) {
                (E.return = a.return), (z = E);
                break e;
              }
              z = a.return;
            }
        }
        if (
          ((X = l), vn(), Ct && typeof Ct.onPostCommitFiberRoot == "function")
        )
          try {
            Ct.onPostCommitFiberRoot(Vi, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (b = n), (it.transition = t);
    }
  }
  return !1;
}
function mc(e, t, n) {
  (t = pr(n, t)),
    (t = gf(e, t, 1)),
    (e = an(e, t, 1)),
    (t = Ae()),
    e !== null && (yl(e, 1, t), Qe(e, t));
}
function me(e, t, n) {
  if (e.tag === 3) mc(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        mc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (un === null || !un.has(r)))
        ) {
          (e = pr(n, e)),
            (e = wf(t, e, 1)),
            (t = an(t, e, 1)),
            (e = Ae()),
            t !== null && (yl(t, 1, e), Qe(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Km(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Ae()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Pe === e &&
      (Ne & n) === n &&
      (xe === 4 || (xe === 3 && (Ne & 130023424) === Ne && 500 > ye() - Pu)
        ? Ln(e, 0)
        : (Cu |= n)),
    Qe(e, t);
}
function Af(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Fl), (Fl <<= 1), !(Fl & 130023424) && (Fl = 4194304))
      : (t = 1));
  var n = Ae();
  (e = Ut(e, t)), e !== null && (yl(e, t, n), Qe(e, n));
}
function Qm(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Af(e, n);
}
function Ym(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(N(314));
  }
  r !== null && r.delete(t), Af(e, n);
}
var Bf;
Bf = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || We.current) Ve = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Ve = !1), zm(e, t, n);
      Ve = !!(e.flags & 131072);
    }
  else (Ve = !1), ae && t.flags & 1048576 && Vd(t, Pi, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      ii(e, t), (e = t.pendingProps);
      var l = cr(t, Fe.current);
      ar(t, n), (l = gu(null, t, r, e, l, n));
      var i = wu();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Ke(r) ? ((i = !0), ki(t)) : (i = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            hu(t),
            (l.updater = Gi),
            (t.stateNode = l),
            (l._reactInternals = t),
            xa(t, r, e, n),
            (t = Pa(null, t, r, !0, i, n)))
          : ((t.tag = 0), ae && i && ou(t), Ue(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (ii(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = Jm(r)),
          (e = dt(r, e)),
          l)
        ) {
          case 0:
            t = Ca(null, t, r, e, n);
            break e;
          case 1:
            t = ic(null, t, r, e, n);
            break e;
          case 11:
            t = rc(null, t, r, e, n);
            break e;
          case 14:
            t = lc(null, t, r, dt(r.type, e), n);
            break e;
        }
        throw Error(N(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : dt(r, l)),
        Ca(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : dt(r, l)),
        ic(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((kf(t), e === null)) throw Error(N(387));
        (r = t.pendingProps),
          (i = t.memoizedState),
          (l = i.element),
          Jd(e, t),
          _i(t, r, null, n);
        var o = t.memoizedState;
        if (((r = o.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            (l = pr(Error(N(423)), t)), (t = oc(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = pr(Error(N(424)), t)), (t = oc(e, t, r, n, l));
            break e;
          } else
            for (
              Je = on(t.stateNode.containerInfo.firstChild),
                Ge = t,
                ae = !0,
                pt = null,
                n = Yd(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((dr(), r === l)) {
            t = At(e, t, n);
            break e;
          }
          Ue(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Gd(t),
        e === null && wa(t),
        (r = t.type),
        (l = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (o = l.children),
        pa(r, l) ? (o = null) : i !== null && pa(r, i) && (t.flags |= 32),
        xf(e, t),
        Ue(e, t, o, n),
        t.child
      );
    case 6:
      return e === null && wa(t), null;
    case 13:
      return Cf(e, t, n);
    case 4:
      return (
        pu(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = fr(t, null, r, n)) : Ue(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : dt(r, l)),
        rc(e, t, r, l, n)
      );
    case 7:
      return Ue(e, t, t.pendingProps, n), t.child;
    case 8:
      return Ue(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Ue(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (i = t.memoizedProps),
          (o = l.value),
          ne(Ri, r._currentValue),
          (r._currentValue = o),
          i !== null)
        )
          if (yt(i.value, o)) {
            if (i.children === l.children && !We.current) {
              t = At(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var a = i.dependencies;
              if (a !== null) {
                o = i.child;
                for (var u = a.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (i.tag === 1) {
                      (u = Ft(-1, n & -n)), (u.tag = 2);
                      var s = i.updateQueue;
                      if (s !== null) {
                        s = s.shared;
                        var d = s.pending;
                        d === null
                          ? (u.next = u)
                          : ((u.next = d.next), (d.next = u)),
                          (s.pending = u);
                      }
                    }
                    (i.lanes |= n),
                      (u = i.alternate),
                      u !== null && (u.lanes |= n),
                      Sa(i.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  u = u.next;
                }
              } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((o = i.return), o === null)) throw Error(N(341));
                (o.lanes |= n),
                  (a = o.alternate),
                  a !== null && (a.lanes |= n),
                  Sa(o, n, t),
                  (o = i.sibling);
              } else o = i.child;
              if (o !== null) o.return = i;
              else
                for (o = i; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (((i = o.sibling), i !== null)) {
                    (i.return = o.return), (o = i);
                    break;
                  }
                  o = o.return;
                }
              i = o;
            }
        Ue(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        ar(t, n),
        (l = ot(l)),
        (r = r(l)),
        (t.flags |= 1),
        Ue(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = dt(r, t.pendingProps)),
        (l = dt(r.type, l)),
        lc(e, t, r, l, n)
      );
    case 15:
      return Sf(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : dt(r, l)),
        ii(e, t),
        (t.tag = 1),
        Ke(r) ? ((e = !0), ki(t)) : (e = !1),
        ar(t, n),
        yf(t, r, l),
        xa(t, r, l, n),
        Pa(null, t, r, !0, e, n)
      );
    case 19:
      return Pf(e, t, n);
    case 22:
      return Ef(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function Hf(e, t) {
  return hd(e, t);
}
function Xm(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function lt(e, t, n, r) {
  return new Xm(e, t, n, r);
}
function Tu(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Jm(e) {
  if (typeof e == "function") return Tu(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Xa)) return 11;
    if (e === Ja) return 14;
  }
  return 2;
}
function cn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = lt(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function ui(e, t, n, r, l, i) {
  var o = 2;
  if (((r = e), typeof e == "function")) Tu(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else
    e: switch (e) {
      case Qn:
        return _n(n.children, l, i, t);
      case Ya:
        (o = 8), (l |= 8);
        break;
      case Qo:
        return (
          (e = lt(12, n, t, l | 2)), (e.elementType = Qo), (e.lanes = i), e
        );
      case Yo:
        return (e = lt(13, n, t, l)), (e.elementType = Yo), (e.lanes = i), e;
      case Xo:
        return (e = lt(19, n, t, l)), (e.elementType = Xo), (e.lanes = i), e;
      case Gc:
        return bi(n, l, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Xc:
              o = 10;
              break e;
            case Jc:
              o = 9;
              break e;
            case Xa:
              o = 11;
              break e;
            case Ja:
              o = 14;
              break e;
            case Jt:
              (o = 16), (r = null);
              break e;
          }
        throw Error(N(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = lt(o, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = i), t
  );
}
function _n(e, t, n, r) {
  return (e = lt(7, e, r, t)), (e.lanes = n), e;
}
function bi(e, t, n, r) {
  return (
    (e = lt(22, e, r, t)),
    (e.elementType = Gc),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function jo(e, t, n) {
  return (e = lt(6, e, null, t)), (e.lanes = n), e;
}
function Io(e, t, n) {
  return (
    (t = lt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Gm(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = yo(0)),
    (this.expirationTimes = yo(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = yo(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function Nu(e, t, n, r, l, i, o, a, u) {
  return (
    (e = new Gm(e, t, n, a, u)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = lt(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    hu(i),
    e
  );
}
function Zm(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Kn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function $f(e) {
  if (!e) return fn;
  e = e._reactInternals;
  e: {
    if (Un(e) !== e || e.tag !== 1) throw Error(N(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ke(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(N(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ke(n)) return Hd(e, n, t);
  }
  return t;
}
function Vf(e, t, n, r, l, i, o, a, u) {
  return (
    (e = Nu(n, r, !0, e, l, i, o, a, u)),
    (e.context = $f(null)),
    (n = e.current),
    (r = Ae()),
    (l = sn(n)),
    (i = Ft(r, l)),
    (i.callback = t ?? null),
    an(n, i, l),
    (e.current.lanes = l),
    yl(e, l, r),
    Qe(e, r),
    e
  );
}
function eo(e, t, n, r) {
  var l = t.current,
    i = Ae(),
    o = sn(l);
  return (
    (n = $f(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Ft(i, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = an(l, t, o)),
    e !== null && (vt(e, l, o, i), ni(e, l, o)),
    o
  );
}
function ji(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function vc(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Du(e, t) {
  vc(e, t), (e = e.alternate) && vc(e, t);
}
function qm() {
  return null;
}
var Wf =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Ou(e) {
  this._internalRoot = e;
}
to.prototype.render = Ou.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  eo(e, t, null, null);
};
to.prototype.unmount = Ou.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Mn(function () {
      eo(null, e, null, null);
    }),
      (t[It] = null);
  }
};
function to(e) {
  this._internalRoot = e;
}
to.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Sd();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Zt.length && t !== 0 && t < Zt[n].priority; n++);
    Zt.splice(n, 0, e), n === 0 && xd(e);
  }
};
function Mu(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function no(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function yc() {}
function bm(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var s = ji(o);
        i.call(s);
      };
    }
    var o = Vf(t, r, e, 0, null, !1, !1, "", yc);
    return (
      (e._reactRootContainer = o),
      (e[It] = o.current),
      ol(e.nodeType === 8 ? e.parentNode : e),
      Mn(),
      o
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var s = ji(u);
      a.call(s);
    };
  }
  var u = Nu(e, 0, !1, null, null, !1, !1, "", yc);
  return (
    (e._reactRootContainer = u),
    (e[It] = u.current),
    ol(e.nodeType === 8 ? e.parentNode : e),
    Mn(function () {
      eo(t, u, n, r);
    }),
    u
  );
}
function ro(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var a = l;
      l = function () {
        var u = ji(o);
        a.call(u);
      };
    }
    eo(t, o, e, l);
  } else o = bm(n, t, e, l, r);
  return ji(o);
}
gd = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Br(t.pendingLanes);
        n !== 0 &&
          (qa(t, n | 1), Qe(t, ye()), !(X & 6) && ((mr = ye() + 500), vn()));
      }
      break;
    case 13:
      Mn(function () {
        var r = Ut(e, 1);
        if (r !== null) {
          var l = Ae();
          vt(r, e, 1, l);
        }
      }),
        Du(e, 1);
  }
};
ba = function (e) {
  if (e.tag === 13) {
    var t = Ut(e, 134217728);
    if (t !== null) {
      var n = Ae();
      vt(t, e, 134217728, n);
    }
    Du(e, 134217728);
  }
};
wd = function (e) {
  if (e.tag === 13) {
    var t = sn(e),
      n = Ut(e, t);
    if (n !== null) {
      var r = Ae();
      vt(n, e, t, r);
    }
    Du(e, t);
  }
};
Sd = function () {
  return b;
};
Ed = function (e, t) {
  var n = b;
  try {
    return (b = e), t();
  } finally {
    b = n;
  }
};
la = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Zo(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Yi(r);
            if (!l) throw Error(N(90));
            qc(r), Zo(r, l);
          }
        }
      }
      break;
    case "textarea":
      ed(e, n);
      break;
    case "select":
      (t = n.value), t != null && rr(e, !!n.multiple, t, !1);
  }
};
ad = Ru;
ud = Mn;
var ev = { usingClientEntryPoint: !1, Events: [wl, Gn, Yi, id, od, Ru] },
  Mr = {
    findFiberByHostInstance: kn,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  tv = {
    bundleType: Mr.bundleType,
    version: Mr.version,
    rendererPackageName: Mr.rendererPackageName,
    rendererConfig: Mr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Ht.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = dd(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Mr.findFiberByHostInstance || qm,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ql = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ql.isDisabled && Ql.supportsFiber)
    try {
      (Vi = Ql.inject(tv)), (Ct = Ql);
    } catch {}
}
qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ev;
qe.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Mu(t)) throw Error(N(200));
  return Zm(e, t, null, n);
};
qe.createRoot = function (e, t) {
  if (!Mu(e)) throw Error(N(299));
  var n = !1,
    r = "",
    l = Wf;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = Nu(e, 1, !1, null, null, n, !1, r, l)),
    (e[It] = t.current),
    ol(e.nodeType === 8 ? e.parentNode : e),
    new Ou(t)
  );
};
qe.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(N(188))
      : ((e = Object.keys(e).join(",")), Error(N(268, e)));
  return (e = dd(t)), (e = e === null ? null : e.stateNode), e;
};
qe.flushSync = function (e) {
  return Mn(e);
};
qe.hydrate = function (e, t, n) {
  if (!no(t)) throw Error(N(200));
  return ro(null, e, t, !0, n);
};
qe.hydrateRoot = function (e, t, n) {
  if (!Mu(e)) throw Error(N(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    i = "",
    o = Wf;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (t = Vf(t, null, e, 1, n ?? null, l, !1, i, o)),
    (e[It] = t.current),
    ol(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new to(t);
};
qe.render = function (e, t, n) {
  if (!no(t)) throw Error(N(200));
  return ro(null, e, t, !1, n);
};
qe.unmountComponentAtNode = function (e) {
  if (!no(e)) throw Error(N(40));
  return e._reactRootContainer
    ? (Mn(function () {
        ro(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[It] = null);
        });
      }),
      !0)
    : !1;
};
qe.unstable_batchedUpdates = Ru;
qe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!no(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return ro(e, t, n, !1, r);
};
qe.version = "18.3.1-next-f1338f8080-20240426";
function Kf() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Kf);
    } catch (e) {
      console.error(e);
    }
}
Kf(), (Wc.exports = qe);
var Qf = Wc.exports;
const nv = Jh(Qf),
  rv = Zh({ __proto__: null, default: nv }, [Qf]);
/**
 * @remix-run/router v1.20.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ie() {
  return (
    (ie = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ie.apply(this, arguments)
  );
}
var we;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(we || (we = {}));
const gc = "popstate";
function y0(e) {
  e === void 0 && (e = {});
  function t(r, l) {
    let { pathname: i, search: o, hash: a } = r.location;
    return ml(
      "",
      { pathname: i, search: o, hash: a },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default"
    );
  }
  function n(r, l) {
    return typeof l == "string" ? l : hn(l);
  }
  return iv(t, n, null, e);
}
function W(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function vr(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function lv() {
  return Math.random().toString(36).substr(2, 8);
}
function wc(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function ml(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    ie(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? $t(t) : t,
      { state: n, key: (t && t.key) || r || lv() }
    )
  );
}
function hn(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function $t(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function iv(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: l = document.defaultView, v5Compat: i = !1 } = r,
    o = l.history,
    a = we.Pop,
    u = null,
    s = d();
  s == null && ((s = 0), o.replaceState(ie({}, o.state, { idx: s }), ""));
  function d() {
    return (o.state || { idx: null }).idx;
  }
  function c() {
    a = we.Pop;
    let L = d(),
      p = L == null ? null : L - s;
    (s = L), u && u({ action: a, location: x.location, delta: p });
  }
  function f(L, p) {
    a = we.Push;
    let h = ml(x.location, L, p);
    s = d() + 1;
    let v = wc(h, s),
      E = x.createHref(h);
    try {
      o.pushState(v, "", E);
    } catch (R) {
      if (R instanceof DOMException && R.name === "DataCloneError") throw R;
      l.location.assign(E);
    }
    i && u && u({ action: a, location: x.location, delta: 1 });
  }
  function w(L, p) {
    a = we.Replace;
    let h = ml(x.location, L, p);
    s = d();
    let v = wc(h, s),
      E = x.createHref(h);
    o.replaceState(v, "", E),
      i && u && u({ action: a, location: x.location, delta: 0 });
  }
  function m(L) {
    let p = l.location.origin !== "null" ? l.location.origin : l.location.href,
      h = typeof L == "string" ? L : hn(L);
    return (
      (h = h.replace(/ $/, "%20")),
      W(
        p,
        "No window.location.(origin|href) available to create URL for href: " +
          h
      ),
      new URL(h, p)
    );
  }
  let x = {
    get action() {
      return a;
    },
    get location() {
      return e(l, o);
    },
    listen(L) {
      if (u) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(gc, c),
        (u = L),
        () => {
          l.removeEventListener(gc, c), (u = null);
        }
      );
    },
    createHref(L) {
      return t(l, L);
    },
    createURL: m,
    encodeLocation(L) {
      let p = m(L);
      return { pathname: p.pathname, search: p.search, hash: p.hash };
    },
    push: f,
    replace: w,
    go(L) {
      return o.go(L);
    },
  };
  return x;
}
var ee;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(ee || (ee = {}));
const ov = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children",
]);
function av(e) {
  return e.index === !0;
}
function Ii(e, t, n, r) {
  return (
    n === void 0 && (n = []),
    r === void 0 && (r = {}),
    e.map((l, i) => {
      let o = [...n, String(i)],
        a = typeof l.id == "string" ? l.id : o.join("-");
      if (
        (W(
          l.index !== !0 || !l.children,
          "Cannot specify children on an index route"
        ),
        W(
          !r[a],
          'Found a route id collision on id "' +
            a +
            `".  Route id's must be globally unique within Data Router usages`
        ),
        av(l))
      ) {
        let u = ie({}, l, t(l), { id: a });
        return (r[a] = u), u;
      } else {
        let u = ie({}, l, t(l), { id: a, children: void 0 });
        return (
          (r[a] = u), l.children && (u.children = Ii(l.children, t, o, r)), u
        );
      }
    })
  );
}
function Ot(e, t, n) {
  return n === void 0 && (n = "/"), si(e, t, n, !1);
}
function si(e, t, n, r) {
  let l = typeof t == "string" ? $t(t) : t,
    i = ut(l.pathname || "/", n);
  if (i == null) return null;
  let o = Xf(e);
  uv(o);
  let a = null;
  for (let u = 0; a == null && u < o.length; ++u) {
    let s = wv(i);
    a = yv(o[u], s, r);
  }
  return a;
}
function Yf(e, t) {
  let { route: n, pathname: r, params: l } = e;
  return { id: n.id, pathname: r, params: l, data: t[n.id], handle: n.handle };
}
function Xf(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let l = (i, o, a) => {
    let u = {
      relativePath: a === void 0 ? i.path || "" : a,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: o,
      route: i,
    };
    u.relativePath.startsWith("/") &&
      (W(
        u.relativePath.startsWith(r),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (u.relativePath = u.relativePath.slice(r.length)));
    let s = Rt([r, u.relativePath]),
      d = n.concat(u);
    i.children &&
      i.children.length > 0 &&
      (W(
        i.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + s + '".')
      ),
      Xf(i.children, t, d, s)),
      !(i.path == null && !i.index) &&
        t.push({ path: s, score: mv(s, i.index), routesMeta: d });
  };
  return (
    e.forEach((i, o) => {
      var a;
      if (i.path === "" || !((a = i.path) != null && a.includes("?"))) l(i, o);
      else for (let u of Jf(i.path)) l(i, o, u);
    }),
    t
  );
}
function Jf(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith("?"),
    i = n.replace(/\?$/, "");
  if (r.length === 0) return l ? [i, ""] : [i];
  let o = Jf(r.join("/")),
    a = [];
  return (
    a.push(...o.map((u) => (u === "" ? i : [i, u].join("/")))),
    l && a.push(...o),
    a.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
  );
}
function uv(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : vv(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const sv = /^:[\w-]+$/,
  cv = 3,
  dv = 2,
  fv = 1,
  hv = 10,
  pv = -2,
  Sc = (e) => e === "*";
function mv(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(Sc) && (r += pv),
    t && (r += dv),
    n
      .filter((l) => !Sc(l))
      .reduce((l, i) => l + (sv.test(i) ? cv : i === "" ? fv : hv), r)
  );
}
function vv(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function yv(e, t, n) {
  n === void 0 && (n = !1);
  let { routesMeta: r } = e,
    l = {},
    i = "/",
    o = [];
  for (let a = 0; a < r.length; ++a) {
    let u = r[a],
      s = a === r.length - 1,
      d = i === "/" ? t : t.slice(i.length) || "/",
      c = Ui(
        { path: u.relativePath, caseSensitive: u.caseSensitive, end: s },
        d
      ),
      f = u.route;
    if (
      (!c &&
        s &&
        n &&
        !r[r.length - 1].route.index &&
        (c = Ui(
          { path: u.relativePath, caseSensitive: u.caseSensitive, end: !1 },
          d
        )),
      !c)
    )
      return null;
    Object.assign(l, c.params),
      o.push({
        params: l,
        pathname: Rt([i, c.pathname]),
        pathnameBase: xv(Rt([i, c.pathnameBase])),
        route: f,
      }),
      c.pathnameBase !== "/" && (i = Rt([i, c.pathnameBase]));
  }
  return o;
}
function Ui(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = gv(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let i = l[0],
    o = i.replace(/(.)\/+$/, "$1"),
    a = l.slice(1);
  return {
    params: r.reduce((s, d, c) => {
      let { paramName: f, isOptional: w } = d;
      if (f === "*") {
        let x = a[c] || "";
        o = i.slice(0, i.length - x.length).replace(/(.)\/+$/, "$1");
      }
      const m = a[c];
      return (
        w && !m ? (s[f] = void 0) : (s[f] = (m || "").replace(/%2F/g, "/")), s
      );
    }, {}),
    pathname: i,
    pathnameBase: o,
    pattern: e,
  };
}
function gv(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    vr(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (o, a, u) => (
            r.push({ paramName: a, isOptional: u != null }),
            u ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (l += "\\/*$")
      : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), r]
  );
}
function wv(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      vr(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function ut(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function Sv(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: l = "",
  } = typeof e == "string" ? $t(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : Ev(n, t)) : t,
    search: kv(r),
    hash: Cv(l),
  };
}
function Ev(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function Uo(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function Gf(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function zu(e, t) {
  let n = Gf(e);
  return t
    ? n.map((r, l) => (l === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function Fu(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == "string"
    ? (l = $t(e))
    : ((l = ie({}, e)),
      W(
        !l.pathname || !l.pathname.includes("?"),
        Uo("?", "pathname", "search", l)
      ),
      W(
        !l.pathname || !l.pathname.includes("#"),
        Uo("#", "pathname", "hash", l)
      ),
      W(!l.search || !l.search.includes("#"), Uo("#", "search", "hash", l)));
  let i = e === "" || l.pathname === "",
    o = i ? "/" : l.pathname,
    a;
  if (o == null) a = n;
  else {
    let c = t.length - 1;
    if (!r && o.startsWith("..")) {
      let f = o.split("/");
      for (; f[0] === ".."; ) f.shift(), (c -= 1);
      l.pathname = f.join("/");
    }
    a = c >= 0 ? t[c] : "/";
  }
  let u = Sv(l, a),
    s = o && o !== "/" && o.endsWith("/"),
    d = (i || o === ".") && n.endsWith("/");
  return !u.pathname.endsWith("/") && (s || d) && (u.pathname += "/"), u;
}
const Rt = (e) => e.join("/").replace(/\/\/+/g, "/"),
  xv = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  kv = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Cv = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
class Pv {
  constructor(t, n) {
    (this.type = "DataWithResponseInit"),
      (this.data = t),
      (this.init = n || null);
  }
}
function Rv(e, t) {
  return new Pv(e, typeof t == "number" ? { status: t } : t);
}
class Ai extends Error {}
class Lv {
  constructor(t, n) {
    (this.pendingKeysSet = new Set()),
      (this.subscribers = new Set()),
      (this.deferredKeys = []),
      W(
        t && typeof t == "object" && !Array.isArray(t),
        "defer() only accepts plain objects"
      );
    let r;
    (this.abortPromise = new Promise((i, o) => (r = o))),
      (this.controller = new AbortController());
    let l = () => r(new Ai("Deferred data aborted"));
    (this.unlistenAbortSignal = () =>
      this.controller.signal.removeEventListener("abort", l)),
      this.controller.signal.addEventListener("abort", l),
      (this.data = Object.entries(t).reduce((i, o) => {
        let [a, u] = o;
        return Object.assign(i, { [a]: this.trackPromise(a, u) });
      }, {})),
      this.done && this.unlistenAbortSignal(),
      (this.init = n);
  }
  trackPromise(t, n) {
    if (!(n instanceof Promise)) return n;
    this.deferredKeys.push(t), this.pendingKeysSet.add(t);
    let r = Promise.race([n, this.abortPromise]).then(
      (l) => this.onSettle(r, t, void 0, l),
      (l) => this.onSettle(r, t, l)
    );
    return (
      r.catch(() => {}),
      Object.defineProperty(r, "_tracked", { get: () => !0 }),
      r
    );
  }
  onSettle(t, n, r, l) {
    if (this.controller.signal.aborted && r instanceof Ai)
      return (
        this.unlistenAbortSignal(),
        Object.defineProperty(t, "_error", { get: () => r }),
        Promise.reject(r)
      );
    if (
      (this.pendingKeysSet.delete(n),
      this.done && this.unlistenAbortSignal(),
      r === void 0 && l === void 0)
    ) {
      let i = new Error(
        'Deferred data for key "' +
          n +
          '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.'
      );
      return (
        Object.defineProperty(t, "_error", { get: () => i }),
        this.emit(!1, n),
        Promise.reject(i)
      );
    }
    return l === void 0
      ? (Object.defineProperty(t, "_error", { get: () => r }),
        this.emit(!1, n),
        Promise.reject(r))
      : (Object.defineProperty(t, "_data", { get: () => l }),
        this.emit(!1, n),
        l);
  }
  emit(t, n) {
    this.subscribers.forEach((r) => r(t, n));
  }
  subscribe(t) {
    return this.subscribers.add(t), () => this.subscribers.delete(t);
  }
  cancel() {
    this.controller.abort(),
      this.pendingKeysSet.forEach((t, n) => this.pendingKeysSet.delete(n)),
      this.emit(!0);
  }
  async resolveData(t) {
    let n = !1;
    if (!this.done) {
      let r = () => this.cancel();
      t.addEventListener("abort", r),
        (n = await new Promise((l) => {
          this.subscribe((i) => {
            t.removeEventListener("abort", r), (i || this.done) && l(i);
          });
        }));
    }
    return n;
  }
  get done() {
    return this.pendingKeysSet.size === 0;
  }
  get unwrappedData() {
    return (
      W(
        this.data !== null && this.done,
        "Can only unwrap data on initialized and settled deferreds"
      ),
      Object.entries(this.data).reduce((t, n) => {
        let [r, l] = n;
        return Object.assign(t, { [r]: Tv(l) });
      }, {})
    );
  }
  get pendingKeys() {
    return Array.from(this.pendingKeysSet);
  }
}
function _v(e) {
  return e instanceof Promise && e._tracked === !0;
}
function Tv(e) {
  if (!_v(e)) return e;
  if (e._error) throw e._error;
  return e._data;
}
const Zf = function (t, n) {
  n === void 0 && (n = 302);
  let r = n;
  typeof r == "number"
    ? (r = { status: r })
    : typeof r.status > "u" && (r.status = 302);
  let l = new Headers(r.headers);
  return l.set("Location", t), new Response(null, ie({}, r, { headers: l }));
};
class zn {
  constructor(t, n, r, l) {
    l === void 0 && (l = !1),
      (this.status = t),
      (this.statusText = n || ""),
      (this.internal = l),
      r instanceof Error
        ? ((this.data = r.toString()), (this.error = r))
        : (this.data = r);
  }
}
function wr(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const qf = ["post", "put", "patch", "delete"],
  Nv = new Set(qf),
  Dv = ["get", ...qf],
  Ov = new Set(Dv),
  Mv = new Set([301, 302, 303, 307, 308]),
  zv = new Set([307, 308]),
  Ao = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Fv = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  zr = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  ju = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  jv = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  bf = "remix-router-transitions";
function g0(e) {
  const t = e.window ? e.window : typeof window < "u" ? window : void 0,
    n =
      typeof t < "u" &&
      typeof t.document < "u" &&
      typeof t.document.createElement < "u",
    r = !n;
  W(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l;
  if (e.mapRouteProperties) l = e.mapRouteProperties;
  else if (e.detectErrorBoundary) {
    let S = e.detectErrorBoundary;
    l = (k) => ({ hasErrorBoundary: S(k) });
  } else l = jv;
  let i = {},
    o = Ii(e.routes, l, void 0, i),
    a,
    u = e.basename || "/",
    s = e.dataStrategy || Bv,
    d = e.patchRoutesOnNavigation,
    c = ie(
      {
        v7_fetcherPersist: !1,
        v7_normalizeFormMethod: !1,
        v7_partialHydration: !1,
        v7_prependBasename: !1,
        v7_relativeSplatPath: !1,
        v7_skipActionErrorRevalidation: !1,
      },
      e.future
    ),
    f = null,
    w = new Set(),
    m = null,
    x = null,
    L = null,
    p = e.hydrationData != null,
    h = Ot(o, e.history.location, u),
    v = null;
  if (h == null && !d) {
    let S = He(404, { pathname: e.history.location.pathname }),
      { matches: k, route: C } = Dc(o);
    (h = k), (v = { [C.id]: S });
  }
  h &&
    !e.hydrationData &&
    Rl(h, o, e.history.location.pathname).active &&
    (h = null);
  let E;
  if (h)
    if (h.some((S) => S.route.lazy)) E = !1;
    else if (!h.some((S) => S.route.loader)) E = !0;
    else if (c.v7_partialHydration) {
      let S = e.hydrationData ? e.hydrationData.loaderData : null,
        k = e.hydrationData ? e.hydrationData.errors : null;
      if (k) {
        let C = h.findIndex((T) => k[T.route.id] !== void 0);
        E = h.slice(0, C + 1).every((T) => !Ua(T.route, S, k));
      } else E = h.every((C) => !Ua(C.route, S, k));
    } else E = e.hydrationData != null;
  else if (((E = !1), (h = []), c.v7_partialHydration)) {
    let S = Rl(null, o, e.history.location.pathname);
    S.active && S.matches && (h = S.matches);
  }
  let R,
    y = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: h,
      initialized: E,
      navigation: Ao,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || v,
      fetchers: new Map(),
      blockers: new Map(),
    },
    _ = we.Pop,
    P = !1,
    D,
    O = !1,
    K = new Map(),
    J = null,
    de = !1,
    fe = !1,
    Re = [],
    et = new Set(),
    ve = new Map(),
    M = 0,
    H = -1,
    $ = new Map(),
    Z = new Set(),
    re = new Map(),
    wt = new Map(),
    Le = new Set(),
    st = new Map(),
    je = new Map(),
    Lt;
  function Nh() {
    if (
      ((f = e.history.listen((S) => {
        let { action: k, location: C, delta: T } = S;
        if (Lt) {
          Lt(), (Lt = void 0);
          return;
        }
        vr(
          je.size === 0 || T != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let F = ss({
          currentLocation: y.location,
          nextLocation: C,
          historyAction: k,
        });
        if (F && T != null) {
          let A = new Promise((V) => {
            Lt = V;
          });
          e.history.go(T * -1),
            Pl(F, {
              state: "blocked",
              location: C,
              proceed() {
                Pl(F, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: C,
                }),
                  A.then(() => e.history.go(T));
              },
              reset() {
                let V = new Map(y.blockers);
                V.set(F, zr), Ie({ blockers: V });
              },
            });
          return;
        }
        return yn(k, C);
      })),
      n)
    ) {
      ey(t, K);
      let S = () => ty(t, K);
      t.addEventListener("pagehide", S),
        (J = () => t.removeEventListener("pagehide", S));
    }
    return y.initialized || yn(we.Pop, y.location, { initialHydration: !0 }), R;
  }
  function Dh() {
    f && f(),
      J && J(),
      w.clear(),
      D && D.abort(),
      y.fetchers.forEach((S, k) => Cl(k)),
      y.blockers.forEach((S, k) => us(k));
  }
  function Oh(S) {
    return w.add(S), () => w.delete(S);
  }
  function Ie(S, k) {
    k === void 0 && (k = {}), (y = ie({}, y, S));
    let C = [],
      T = [];
    c.v7_fetcherPersist &&
      y.fetchers.forEach((F, A) => {
        F.state === "idle" && (Le.has(A) ? T.push(A) : C.push(A));
      }),
      [...w].forEach((F) =>
        F(y, {
          deletedFetchers: T,
          viewTransitionOpts: k.viewTransitionOpts,
          flushSync: k.flushSync === !0,
        })
      ),
      c.v7_fetcherPersist &&
        (C.forEach((F) => y.fetchers.delete(F)), T.forEach((F) => Cl(F)));
  }
  function An(S, k, C) {
    var T, F;
    let { flushSync: A } = C === void 0 ? {} : C,
      V =
        y.actionData != null &&
        y.navigation.formMethod != null &&
        ht(y.navigation.formMethod) &&
        y.navigation.state === "loading" &&
        ((T = S.state) == null ? void 0 : T._isRedirect) !== !0,
      I;
    k.actionData
      ? Object.keys(k.actionData).length > 0
        ? (I = k.actionData)
        : (I = null)
      : V
      ? (I = y.actionData)
      : (I = null);
    let U = k.loaderData
        ? Tc(y.loaderData, k.loaderData, k.matches || [], k.errors)
        : y.loaderData,
      j = y.blockers;
    j.size > 0 && ((j = new Map(j)), j.forEach((Y, _e) => j.set(_e, zr)));
    let B =
      P === !0 ||
      (y.navigation.formMethod != null &&
        ht(y.navigation.formMethod) &&
        ((F = S.state) == null ? void 0 : F._isRedirect) !== !0);
    a && ((o = a), (a = void 0)),
      de ||
        _ === we.Pop ||
        (_ === we.Push
          ? e.history.push(S, S.state)
          : _ === we.Replace && e.history.replace(S, S.state));
    let Q;
    if (_ === we.Pop) {
      let Y = K.get(y.location.pathname);
      Y && Y.has(S.pathname)
        ? (Q = { currentLocation: y.location, nextLocation: S })
        : K.has(S.pathname) &&
          (Q = { currentLocation: S, nextLocation: y.location });
    } else if (O) {
      let Y = K.get(y.location.pathname);
      Y
        ? Y.add(S.pathname)
        : ((Y = new Set([S.pathname])), K.set(y.location.pathname, Y)),
        (Q = { currentLocation: y.location, nextLocation: S });
    }
    Ie(
      ie({}, k, {
        actionData: I,
        loaderData: U,
        historyAction: _,
        location: S,
        initialized: !0,
        navigation: Ao,
        revalidation: "idle",
        restoreScrollPosition: ds(S, k.matches || y.matches),
        preventScrollReset: B,
        blockers: j,
      }),
      { viewTransitionOpts: Q, flushSync: A === !0 }
    ),
      (_ = we.Pop),
      (P = !1),
      (O = !1),
      (de = !1),
      (fe = !1),
      (Re = []);
  }
  async function ts(S, k) {
    if (typeof S == "number") {
      e.history.go(S);
      return;
    }
    let C = Ia(
        y.location,
        y.matches,
        u,
        c.v7_prependBasename,
        S,
        c.v7_relativeSplatPath,
        k == null ? void 0 : k.fromRouteId,
        k == null ? void 0 : k.relative
      ),
      {
        path: T,
        submission: F,
        error: A,
      } = Ec(c.v7_normalizeFormMethod, !1, C, k),
      V = y.location,
      I = ml(y.location, T, k && k.state);
    I = ie({}, I, e.history.encodeLocation(I));
    let U = k && k.replace != null ? k.replace : void 0,
      j = we.Push;
    U === !0
      ? (j = we.Replace)
      : U === !1 ||
        (F != null &&
          ht(F.formMethod) &&
          F.formAction === y.location.pathname + y.location.search &&
          (j = we.Replace));
    let B =
        k && "preventScrollReset" in k ? k.preventScrollReset === !0 : void 0,
      Q = (k && k.flushSync) === !0,
      Y = ss({ currentLocation: V, nextLocation: I, historyAction: j });
    if (Y) {
      Pl(Y, {
        state: "blocked",
        location: I,
        proceed() {
          Pl(Y, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: I,
          }),
            ts(S, k);
        },
        reset() {
          let _e = new Map(y.blockers);
          _e.set(Y, zr), Ie({ blockers: _e });
        },
      });
      return;
    }
    return await yn(j, I, {
      submission: F,
      pendingError: A,
      preventScrollReset: B,
      replace: k && k.replace,
      enableViewTransition: k && k.viewTransition,
      flushSync: Q,
    });
  }
  function Mh() {
    if (
      (uo(),
      Ie({ revalidation: "loading" }),
      y.navigation.state !== "submitting")
    ) {
      if (y.navigation.state === "idle") {
        yn(y.historyAction, y.location, { startUninterruptedRevalidation: !0 });
        return;
      }
      yn(_ || y.historyAction, y.navigation.location, {
        overrideNavigation: y.navigation,
        enableViewTransition: O === !0,
      });
    }
  }
  async function yn(S, k, C) {
    D && D.abort(),
      (D = null),
      (_ = S),
      (de = (C && C.startUninterruptedRevalidation) === !0),
      Vh(y.location, y.matches),
      (P = (C && C.preventScrollReset) === !0),
      (O = (C && C.enableViewTransition) === !0);
    let T = a || o,
      F = C && C.overrideNavigation,
      A = Ot(T, k, u),
      V = (C && C.flushSync) === !0,
      I = Rl(A, T, k.pathname);
    if ((I.active && I.matches && (A = I.matches), !A)) {
      let { error: te, notFoundMatches: q, route: he } = so(k.pathname);
      An(
        k,
        { matches: q, loaderData: {}, errors: { [he.id]: te } },
        { flushSync: V }
      );
      return;
    }
    if (
      y.initialized &&
      !fe &&
      Qv(y.location, k) &&
      !(C && C.submission && ht(C.submission.formMethod))
    ) {
      An(k, { matches: A }, { flushSync: V });
      return;
    }
    D = new AbortController();
    let U = Wn(e.history, k, D.signal, C && C.submission),
      j;
    if (C && C.pendingError)
      j = [xn(A).route.id, { type: ee.error, error: C.pendingError }];
    else if (C && C.submission && ht(C.submission.formMethod)) {
      let te = await zh(U, k, C.submission, A, I.active, {
        replace: C.replace,
        flushSync: V,
      });
      if (te.shortCircuited) return;
      if (te.pendingActionResult) {
        let [q, he] = te.pendingActionResult;
        if (Xe(he) && wr(he.error) && he.error.status === 404) {
          (D = null),
            An(k, {
              matches: te.matches,
              loaderData: {},
              errors: { [q]: he.error },
            });
          return;
        }
      }
      (A = te.matches || A),
        (j = te.pendingActionResult),
        (F = Bo(k, C.submission)),
        (V = !1),
        (I.active = !1),
        (U = Wn(e.history, U.url, U.signal));
    }
    let {
      shortCircuited: B,
      matches: Q,
      loaderData: Y,
      errors: _e,
    } = await Fh(
      U,
      k,
      A,
      I.active,
      F,
      C && C.submission,
      C && C.fetcherSubmission,
      C && C.replace,
      C && C.initialHydration === !0,
      V,
      j
    );
    B ||
      ((D = null),
      An(k, ie({ matches: Q || A }, Nc(j), { loaderData: Y, errors: _e })));
  }
  async function zh(S, k, C, T, F, A) {
    A === void 0 && (A = {}), uo();
    let V = qv(k, C);
    if ((Ie({ navigation: V }, { flushSync: A.flushSync === !0 }), F)) {
      let j = await Ll(T, k.pathname, S.signal);
      if (j.type === "aborted") return { shortCircuited: !0 };
      if (j.type === "error") {
        let B = xn(j.partialMatches).route.id;
        return {
          matches: j.partialMatches,
          pendingActionResult: [B, { type: ee.error, error: j.error }],
        };
      } else if (j.matches) T = j.matches;
      else {
        let { notFoundMatches: B, error: Q, route: Y } = so(k.pathname);
        return {
          matches: B,
          pendingActionResult: [Y.id, { type: ee.error, error: Q }],
        };
      }
    }
    let I,
      U = $r(T, k);
    if (!U.route.action && !U.route.lazy)
      I = {
        type: ee.error,
        error: He(405, {
          method: S.method,
          pathname: k.pathname,
          routeId: U.route.id,
        }),
      };
    else if (
      ((I = (await xr("action", y, S, [U], T, null))[U.route.id]),
      S.signal.aborted)
    )
      return { shortCircuited: !0 };
    if (Rn(I)) {
      let j;
      return (
        A && A.replace != null
          ? (j = A.replace)
          : (j =
              Rc(I.response.headers.get("Location"), new URL(S.url), u) ===
              y.location.pathname + y.location.search),
        await gn(S, I, !0, { submission: C, replace: j }),
        { shortCircuited: !0 }
      );
    }
    if (tn(I)) throw He(400, { type: "defer-action" });
    if (Xe(I)) {
      let j = xn(T, U.route.id);
      return (
        (A && A.replace) !== !0 && (_ = we.Push),
        { matches: T, pendingActionResult: [j.route.id, I] }
      );
    }
    return { matches: T, pendingActionResult: [U.route.id, I] };
  }
  async function Fh(S, k, C, T, F, A, V, I, U, j, B) {
    let Q = F || Bo(k, A),
      Y = A || V || Mc(Q),
      _e = !de && (!c.v7_partialHydration || !U);
    if (T) {
      if (_e) {
        let pe = ns(B);
        Ie(ie({ navigation: Q }, pe !== void 0 ? { actionData: pe } : {}), {
          flushSync: j,
        });
      }
      let G = await Ll(C, k.pathname, S.signal);
      if (G.type === "aborted") return { shortCircuited: !0 };
      if (G.type === "error") {
        let pe = xn(G.partialMatches).route.id;
        return {
          matches: G.partialMatches,
          loaderData: {},
          errors: { [pe]: G.error },
        };
      } else if (G.matches) C = G.matches;
      else {
        let { error: pe, notFoundMatches: Hn, route: Pr } = so(k.pathname);
        return { matches: Hn, loaderData: {}, errors: { [Pr.id]: pe } };
      }
    }
    let te = a || o,
      [q, he] = kc(
        e.history,
        y,
        C,
        Y,
        k,
        c.v7_partialHydration && U === !0,
        c.v7_skipActionErrorRevalidation,
        fe,
        Re,
        et,
        Le,
        re,
        Z,
        te,
        u,
        B
      );
    if (
      (co(
        (G) =>
          !(C && C.some((pe) => pe.route.id === G)) ||
          (q && q.some((pe) => pe.route.id === G))
      ),
      (H = ++M),
      q.length === 0 && he.length === 0)
    ) {
      let G = os();
      return (
        An(
          k,
          ie(
            {
              matches: C,
              loaderData: {},
              errors: B && Xe(B[1]) ? { [B[0]]: B[1].error } : null,
            },
            Nc(B),
            G ? { fetchers: new Map(y.fetchers) } : {}
          ),
          { flushSync: j }
        ),
        { shortCircuited: !0 }
      );
    }
    if (_e) {
      let G = {};
      if (!T) {
        G.navigation = Q;
        let pe = ns(B);
        pe !== void 0 && (G.actionData = pe);
      }
      he.length > 0 && (G.fetchers = jh(he)), Ie(G, { flushSync: j });
    }
    he.forEach((G) => {
      Qt(G.key), G.controller && ve.set(G.key, G.controller);
    });
    let Bn = () => he.forEach((G) => Qt(G.key));
    D && D.signal.addEventListener("abort", Bn);
    let { loaderResults: kr, fetcherResults: Tt } = await rs(y, C, q, he, S);
    if (S.signal.aborted) return { shortCircuited: !0 };
    D && D.signal.removeEventListener("abort", Bn),
      he.forEach((G) => ve.delete(G.key));
    let St = Yl(kr);
    if (St)
      return await gn(S, St.result, !0, { replace: I }), { shortCircuited: !0 };
    if (((St = Yl(Tt)), St))
      return (
        Z.add(St.key),
        await gn(S, St.result, !0, { replace: I }),
        { shortCircuited: !0 }
      );
    let { loaderData: fo, errors: Cr } = _c(y, C, kr, B, he, Tt, st);
    st.forEach((G, pe) => {
      G.subscribe((Hn) => {
        (Hn || G.done) && st.delete(pe);
      });
    }),
      c.v7_partialHydration && U && y.errors && (Cr = ie({}, y.errors, Cr));
    let wn = os(),
      _l = as(H),
      Tl = wn || _l || he.length > 0;
    return ie(
      { matches: C, loaderData: fo, errors: Cr },
      Tl ? { fetchers: new Map(y.fetchers) } : {}
    );
  }
  function ns(S) {
    if (S && !Xe(S[1])) return { [S[0]]: S[1].data };
    if (y.actionData)
      return Object.keys(y.actionData).length === 0 ? null : y.actionData;
  }
  function jh(S) {
    return (
      S.forEach((k) => {
        let C = y.fetchers.get(k.key),
          T = Fr(void 0, C ? C.data : void 0);
        y.fetchers.set(k.key, T);
      }),
      new Map(y.fetchers)
    );
  }
  function Ih(S, k, C, T) {
    if (r)
      throw new Error(
        "router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback."
      );
    Qt(S);
    let F = (T && T.flushSync) === !0,
      A = a || o,
      V = Ia(
        y.location,
        y.matches,
        u,
        c.v7_prependBasename,
        C,
        c.v7_relativeSplatPath,
        k,
        T == null ? void 0 : T.relative
      ),
      I = Ot(A, V, u),
      U = Rl(I, A, V);
    if ((U.active && U.matches && (I = U.matches), !I)) {
      _t(S, k, He(404, { pathname: V }), { flushSync: F });
      return;
    }
    let {
      path: j,
      submission: B,
      error: Q,
    } = Ec(c.v7_normalizeFormMethod, !0, V, T);
    if (Q) {
      _t(S, k, Q, { flushSync: F });
      return;
    }
    let Y = $r(I, j),
      _e = (T && T.preventScrollReset) === !0;
    if (B && ht(B.formMethod)) {
      Uh(S, k, j, Y, I, U.active, F, _e, B);
      return;
    }
    re.set(S, { routeId: k, path: j }), Ah(S, k, j, Y, I, U.active, F, _e, B);
  }
  async function Uh(S, k, C, T, F, A, V, I, U) {
    uo(), re.delete(S);
    function j(ge) {
      if (!ge.route.action && !ge.route.lazy) {
        let $n = He(405, { method: U.formMethod, pathname: C, routeId: k });
        return _t(S, k, $n, { flushSync: V }), !0;
      }
      return !1;
    }
    if (!A && j(T)) return;
    let B = y.fetchers.get(S);
    Kt(S, bv(U, B), { flushSync: V });
    let Q = new AbortController(),
      Y = Wn(e.history, C, Q.signal, U);
    if (A) {
      let ge = await Ll(F, C, Y.signal);
      if (ge.type === "aborted") return;
      if (ge.type === "error") {
        _t(S, k, ge.error, { flushSync: V });
        return;
      } else if (ge.matches) {
        if (((F = ge.matches), (T = $r(F, C)), j(T))) return;
      } else {
        _t(S, k, He(404, { pathname: C }), { flushSync: V });
        return;
      }
    }
    ve.set(S, Q);
    let _e = M,
      q = (await xr("action", y, Y, [T], F, S))[T.route.id];
    if (Y.signal.aborted) {
      ve.get(S) === Q && ve.delete(S);
      return;
    }
    if (c.v7_fetcherPersist && Le.has(S)) {
      if (Rn(q) || Xe(q)) {
        Kt(S, Xt(void 0));
        return;
      }
    } else {
      if (Rn(q))
        if ((ve.delete(S), H > _e)) {
          Kt(S, Xt(void 0));
          return;
        } else
          return (
            Z.add(S),
            Kt(S, Fr(U)),
            gn(Y, q, !1, { fetcherSubmission: U, preventScrollReset: I })
          );
      if (Xe(q)) {
        _t(S, k, q.error);
        return;
      }
    }
    if (tn(q)) throw He(400, { type: "defer-action" });
    let he = y.navigation.location || y.location,
      Bn = Wn(e.history, he, Q.signal),
      kr = a || o,
      Tt =
        y.navigation.state !== "idle"
          ? Ot(kr, y.navigation.location, u)
          : y.matches;
    W(Tt, "Didn't find any matches after fetcher action");
    let St = ++M;
    $.set(S, St);
    let fo = Fr(U, q.data);
    y.fetchers.set(S, fo);
    let [Cr, wn] = kc(
      e.history,
      y,
      Tt,
      U,
      he,
      !1,
      c.v7_skipActionErrorRevalidation,
      fe,
      Re,
      et,
      Le,
      re,
      Z,
      kr,
      u,
      [T.route.id, q]
    );
    wn
      .filter((ge) => ge.key !== S)
      .forEach((ge) => {
        let $n = ge.key,
          fs = y.fetchers.get($n),
          Qh = Fr(void 0, fs ? fs.data : void 0);
        y.fetchers.set($n, Qh),
          Qt($n),
          ge.controller && ve.set($n, ge.controller);
      }),
      Ie({ fetchers: new Map(y.fetchers) });
    let _l = () => wn.forEach((ge) => Qt(ge.key));
    Q.signal.addEventListener("abort", _l);
    let { loaderResults: Tl, fetcherResults: G } = await rs(y, Tt, Cr, wn, Bn);
    if (Q.signal.aborted) return;
    Q.signal.removeEventListener("abort", _l),
      $.delete(S),
      ve.delete(S),
      wn.forEach((ge) => ve.delete(ge.key));
    let pe = Yl(Tl);
    if (pe) return gn(Bn, pe.result, !1, { preventScrollReset: I });
    if (((pe = Yl(G)), pe))
      return Z.add(pe.key), gn(Bn, pe.result, !1, { preventScrollReset: I });
    let { loaderData: Hn, errors: Pr } = _c(y, Tt, Tl, void 0, wn, G, st);
    if (y.fetchers.has(S)) {
      let ge = Xt(q.data);
      y.fetchers.set(S, ge);
    }
    as(St),
      y.navigation.state === "loading" && St > H
        ? (W(_, "Expected pending action"),
          D && D.abort(),
          An(y.navigation.location, {
            matches: Tt,
            loaderData: Hn,
            errors: Pr,
            fetchers: new Map(y.fetchers),
          }))
        : (Ie({
            errors: Pr,
            loaderData: Tc(y.loaderData, Hn, Tt, Pr),
            fetchers: new Map(y.fetchers),
          }),
          (fe = !1));
  }
  async function Ah(S, k, C, T, F, A, V, I, U) {
    let j = y.fetchers.get(S);
    Kt(S, Fr(U, j ? j.data : void 0), { flushSync: V });
    let B = new AbortController(),
      Q = Wn(e.history, C, B.signal);
    if (A) {
      let q = await Ll(F, C, Q.signal);
      if (q.type === "aborted") return;
      if (q.type === "error") {
        _t(S, k, q.error, { flushSync: V });
        return;
      } else if (q.matches) (F = q.matches), (T = $r(F, C));
      else {
        _t(S, k, He(404, { pathname: C }), { flushSync: V });
        return;
      }
    }
    ve.set(S, B);
    let Y = M,
      te = (await xr("loader", y, Q, [T], F, S))[T.route.id];
    if (
      (tn(te) && (te = (await Iu(te, Q.signal, !0)) || te),
      ve.get(S) === B && ve.delete(S),
      !Q.signal.aborted)
    ) {
      if (Le.has(S)) {
        Kt(S, Xt(void 0));
        return;
      }
      if (Rn(te))
        if (H > Y) {
          Kt(S, Xt(void 0));
          return;
        } else {
          Z.add(S), await gn(Q, te, !1, { preventScrollReset: I });
          return;
        }
      if (Xe(te)) {
        _t(S, k, te.error);
        return;
      }
      W(!tn(te), "Unhandled fetcher deferred data"), Kt(S, Xt(te.data));
    }
  }
  async function gn(S, k, C, T) {
    let {
      submission: F,
      fetcherSubmission: A,
      preventScrollReset: V,
      replace: I,
    } = T === void 0 ? {} : T;
    k.response.headers.has("X-Remix-Revalidate") && (fe = !0);
    let U = k.response.headers.get("Location");
    W(U, "Expected a Location header on the redirect Response"),
      (U = Rc(U, new URL(S.url), u));
    let j = ml(y.location, U, { _isRedirect: !0 });
    if (n) {
      let q = !1;
      if (k.response.headers.has("X-Remix-Reload-Document")) q = !0;
      else if (ju.test(U)) {
        const he = e.history.createURL(U);
        q = he.origin !== t.location.origin || ut(he.pathname, u) == null;
      }
      if (q) {
        I ? t.location.replace(U) : t.location.assign(U);
        return;
      }
    }
    D = null;
    let B =
        I === !0 || k.response.headers.has("X-Remix-Replace")
          ? we.Replace
          : we.Push,
      { formMethod: Q, formAction: Y, formEncType: _e } = y.navigation;
    !F && !A && Q && Y && _e && (F = Mc(y.navigation));
    let te = F || A;
    if (zv.has(k.response.status) && te && ht(te.formMethod))
      await yn(B, j, {
        submission: ie({}, te, { formAction: U }),
        preventScrollReset: V || P,
        enableViewTransition: C ? O : void 0,
      });
    else {
      let q = Bo(j, F);
      await yn(B, j, {
        overrideNavigation: q,
        fetcherSubmission: A,
        preventScrollReset: V || P,
        enableViewTransition: C ? O : void 0,
      });
    }
  }
  async function xr(S, k, C, T, F, A) {
    let V,
      I = {};
    try {
      V = await Hv(s, S, k, C, T, F, A, i, l);
    } catch (U) {
      return (
        T.forEach((j) => {
          I[j.route.id] = { type: ee.error, error: U };
        }),
        I
      );
    }
    for (let [U, j] of Object.entries(V))
      if (Yv(j)) {
        let B = j.result;
        I[U] = {
          type: ee.redirect,
          response: Wv(B, C, U, F, u, c.v7_relativeSplatPath),
        };
      } else I[U] = await Vv(j);
    return I;
  }
  async function rs(S, k, C, T, F) {
    let A = S.matches,
      V = xr("loader", S, F, C, k, null),
      I = Promise.all(
        T.map(async (B) => {
          if (B.matches && B.match && B.controller) {
            let Y = (
              await xr(
                "loader",
                S,
                Wn(e.history, B.path, B.controller.signal),
                [B.match],
                B.matches,
                B.key
              )
            )[B.match.route.id];
            return { [B.key]: Y };
          } else
            return Promise.resolve({
              [B.key]: { type: ee.error, error: He(404, { pathname: B.path }) },
            });
        })
      ),
      U = await V,
      j = (await I).reduce((B, Q) => Object.assign(B, Q), {});
    return (
      await Promise.all([Gv(k, U, F.signal, A, S.loaderData), Zv(k, j, T)]),
      { loaderResults: U, fetcherResults: j }
    );
  }
  function uo() {
    (fe = !0),
      Re.push(...co()),
      re.forEach((S, k) => {
        ve.has(k) && et.add(k), Qt(k);
      });
  }
  function Kt(S, k, C) {
    C === void 0 && (C = {}),
      y.fetchers.set(S, k),
      Ie(
        { fetchers: new Map(y.fetchers) },
        { flushSync: (C && C.flushSync) === !0 }
      );
  }
  function _t(S, k, C, T) {
    T === void 0 && (T = {});
    let F = xn(y.matches, k);
    Cl(S),
      Ie(
        { errors: { [F.route.id]: C }, fetchers: new Map(y.fetchers) },
        { flushSync: (T && T.flushSync) === !0 }
      );
  }
  function ls(S) {
    return (
      c.v7_fetcherPersist &&
        (wt.set(S, (wt.get(S) || 0) + 1), Le.has(S) && Le.delete(S)),
      y.fetchers.get(S) || Fv
    );
  }
  function Cl(S) {
    let k = y.fetchers.get(S);
    ve.has(S) && !(k && k.state === "loading" && $.has(S)) && Qt(S),
      re.delete(S),
      $.delete(S),
      Z.delete(S),
      Le.delete(S),
      et.delete(S),
      y.fetchers.delete(S);
  }
  function Bh(S) {
    if (c.v7_fetcherPersist) {
      let k = (wt.get(S) || 0) - 1;
      k <= 0 ? (wt.delete(S), Le.add(S)) : wt.set(S, k);
    } else Cl(S);
    Ie({ fetchers: new Map(y.fetchers) });
  }
  function Qt(S) {
    let k = ve.get(S);
    k && (k.abort(), ve.delete(S));
  }
  function is(S) {
    for (let k of S) {
      let C = ls(k),
        T = Xt(C.data);
      y.fetchers.set(k, T);
    }
  }
  function os() {
    let S = [],
      k = !1;
    for (let C of Z) {
      let T = y.fetchers.get(C);
      W(T, "Expected fetcher: " + C),
        T.state === "loading" && (Z.delete(C), S.push(C), (k = !0));
    }
    return is(S), k;
  }
  function as(S) {
    let k = [];
    for (let [C, T] of $)
      if (T < S) {
        let F = y.fetchers.get(C);
        W(F, "Expected fetcher: " + C),
          F.state === "loading" && (Qt(C), $.delete(C), k.push(C));
      }
    return is(k), k.length > 0;
  }
  function Hh(S, k) {
    let C = y.blockers.get(S) || zr;
    return je.get(S) !== k && je.set(S, k), C;
  }
  function us(S) {
    y.blockers.delete(S), je.delete(S);
  }
  function Pl(S, k) {
    let C = y.blockers.get(S) || zr;
    W(
      (C.state === "unblocked" && k.state === "blocked") ||
        (C.state === "blocked" && k.state === "blocked") ||
        (C.state === "blocked" && k.state === "proceeding") ||
        (C.state === "blocked" && k.state === "unblocked") ||
        (C.state === "proceeding" && k.state === "unblocked"),
      "Invalid blocker state transition: " + C.state + " -> " + k.state
    );
    let T = new Map(y.blockers);
    T.set(S, k), Ie({ blockers: T });
  }
  function ss(S) {
    let { currentLocation: k, nextLocation: C, historyAction: T } = S;
    if (je.size === 0) return;
    je.size > 1 && vr(!1, "A router only supports one blocker at a time");
    let F = Array.from(je.entries()),
      [A, V] = F[F.length - 1],
      I = y.blockers.get(A);
    if (
      !(I && I.state === "proceeding") &&
      V({ currentLocation: k, nextLocation: C, historyAction: T })
    )
      return A;
  }
  function so(S) {
    let k = He(404, { pathname: S }),
      C = a || o,
      { matches: T, route: F } = Dc(C);
    return co(), { notFoundMatches: T, route: F, error: k };
  }
  function co(S) {
    let k = [];
    return (
      st.forEach((C, T) => {
        (!S || S(T)) && (C.cancel(), k.push(T), st.delete(T));
      }),
      k
    );
  }
  function $h(S, k, C) {
    if (((m = S), (L = k), (x = C || null), !p && y.navigation === Ao)) {
      p = !0;
      let T = ds(y.location, y.matches);
      T != null && Ie({ restoreScrollPosition: T });
    }
    return () => {
      (m = null), (L = null), (x = null);
    };
  }
  function cs(S, k) {
    return (
      (x &&
        x(
          S,
          k.map((T) => Yf(T, y.loaderData))
        )) ||
      S.key
    );
  }
  function Vh(S, k) {
    if (m && L) {
      let C = cs(S, k);
      m[C] = L();
    }
  }
  function ds(S, k) {
    if (m) {
      let C = cs(S, k),
        T = m[C];
      if (typeof T == "number") return T;
    }
    return null;
  }
  function Rl(S, k, C) {
    if (d)
      if (S) {
        if (Object.keys(S[0].params).length > 0)
          return { active: !0, matches: si(k, C, u, !0) };
      } else return { active: !0, matches: si(k, C, u, !0) || [] };
    return { active: !1, matches: null };
  }
  async function Ll(S, k, C) {
    if (!d) return { type: "success", matches: S };
    let T = S;
    for (;;) {
      let F = a == null,
        A = a || o,
        V = i;
      try {
        await d({
          path: k,
          matches: T,
          patch: (j, B) => {
            C.aborted || Pc(j, B, A, V, l);
          },
        });
      } catch (j) {
        return { type: "error", error: j, partialMatches: T };
      } finally {
        F && !C.aborted && (o = [...o]);
      }
      if (C.aborted) return { type: "aborted" };
      let I = Ot(A, k, u);
      if (I) return { type: "success", matches: I };
      let U = si(A, k, u, !0);
      if (
        !U ||
        (T.length === U.length &&
          T.every((j, B) => j.route.id === U[B].route.id))
      )
        return { type: "success", matches: null };
      T = U;
    }
  }
  function Wh(S) {
    (i = {}), (a = Ii(S, l, void 0, i));
  }
  function Kh(S, k) {
    let C = a == null;
    Pc(S, k, a || o, i, l), C && ((o = [...o]), Ie({}));
  }
  return (
    (R = {
      get basename() {
        return u;
      },
      get future() {
        return c;
      },
      get state() {
        return y;
      },
      get routes() {
        return o;
      },
      get window() {
        return t;
      },
      initialize: Nh,
      subscribe: Oh,
      enableScrollRestoration: $h,
      navigate: ts,
      fetch: Ih,
      revalidate: Mh,
      createHref: (S) => e.history.createHref(S),
      encodeLocation: (S) => e.history.encodeLocation(S),
      getFetcher: ls,
      deleteFetcher: Bh,
      dispose: Dh,
      getBlocker: Hh,
      deleteBlocker: us,
      patchRoutes: Kh,
      _internalFetchControllers: ve,
      _internalActiveDeferreds: st,
      _internalSetRoutes: Wh,
    }),
    R
  );
}
function Iv(e) {
  return (
    e != null &&
    (("formData" in e && e.formData != null) ||
      ("body" in e && e.body !== void 0))
  );
}
function Ia(e, t, n, r, l, i, o, a) {
  let u, s;
  if (o) {
    u = [];
    for (let c of t)
      if ((u.push(c), c.route.id === o)) {
        s = c;
        break;
      }
  } else (u = t), (s = t[t.length - 1]);
  let d = Fu(l || ".", zu(u, i), ut(e.pathname, n) || e.pathname, a === "path");
  if (
    (l == null && ((d.search = e.search), (d.hash = e.hash)),
    (l == null || l === "" || l === ".") && s)
  ) {
    let c = Uu(d.search);
    if (s.route.index && !c)
      d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index";
    else if (!s.route.index && c) {
      let f = new URLSearchParams(d.search),
        w = f.getAll("index");
      f.delete("index"),
        w.filter((x) => x).forEach((x) => f.append("index", x));
      let m = f.toString();
      d.search = m ? "?" + m : "";
    }
  }
  return (
    r &&
      n !== "/" &&
      (d.pathname = d.pathname === "/" ? n : Rt([n, d.pathname])),
    hn(d)
  );
}
function Ec(e, t, n, r) {
  if (!r || !Iv(r)) return { path: n };
  if (r.formMethod && !Jv(r.formMethod))
    return { path: n, error: He(405, { method: r.formMethod }) };
  let l = () => ({ path: n, error: He(400, { type: "invalid-body" }) }),
    i = r.formMethod || "get",
    o = e ? i.toUpperCase() : i.toLowerCase(),
    a = nh(n);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!ht(o)) return l();
      let f =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
          ? Array.from(r.body.entries()).reduce((w, m) => {
              let [x, L] = m;
              return (
                "" +
                w +
                x +
                "=" +
                L +
                `
`
              );
            }, "")
          : String(r.body);
      return {
        path: n,
        submission: {
          formMethod: o,
          formAction: a,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: f,
        },
      };
    } else if (r.formEncType === "application/json") {
      if (!ht(o)) return l();
      try {
        let f = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: n,
          submission: {
            formMethod: o,
            formAction: a,
            formEncType: r.formEncType,
            formData: void 0,
            json: f,
            text: void 0,
          },
        };
      } catch {
        return l();
      }
    }
  }
  W(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let u, s;
  if (r.formData) (u = Aa(r.formData)), (s = r.formData);
  else if (r.body instanceof FormData) (u = Aa(r.body)), (s = r.body);
  else if (r.body instanceof URLSearchParams) (u = r.body), (s = Lc(u));
  else if (r.body == null) (u = new URLSearchParams()), (s = new FormData());
  else
    try {
      (u = new URLSearchParams(r.body)), (s = Lc(u));
    } catch {
      return l();
    }
  let d = {
    formMethod: o,
    formAction: a,
    formEncType: (r && r.formEncType) || "application/x-www-form-urlencoded",
    formData: s,
    json: void 0,
    text: void 0,
  };
  if (ht(d.formMethod)) return { path: n, submission: d };
  let c = $t(n);
  return (
    t && c.search && Uu(c.search) && u.append("index", ""),
    (c.search = "?" + u),
    { path: hn(c), submission: d }
  );
}
function xc(e, t, n) {
  n === void 0 && (n = !1);
  let r = e.findIndex((l) => l.route.id === t);
  return r >= 0 ? e.slice(0, n ? r + 1 : r) : e;
}
function kc(e, t, n, r, l, i, o, a, u, s, d, c, f, w, m, x) {
  let L = x ? (Xe(x[1]) ? x[1].error : x[1].data) : void 0,
    p = e.createURL(t.location),
    h = e.createURL(l),
    v = n;
  i && t.errors
    ? (v = xc(n, Object.keys(t.errors)[0], !0))
    : x && Xe(x[1]) && (v = xc(n, x[0]));
  let E = x ? x[1].statusCode : void 0,
    R = o && E && E >= 400,
    y = v.filter((P, D) => {
      let { route: O } = P;
      if (O.lazy) return !0;
      if (O.loader == null) return !1;
      if (i) return Ua(O, t.loaderData, t.errors);
      if (
        Uv(t.loaderData, t.matches[D], P) ||
        u.some((de) => de === P.route.id)
      )
        return !0;
      let K = t.matches[D],
        J = P;
      return Cc(
        P,
        ie(
          {
            currentUrl: p,
            currentParams: K.params,
            nextUrl: h,
            nextParams: J.params,
          },
          r,
          {
            actionResult: L,
            actionStatus: E,
            defaultShouldRevalidate: R
              ? !1
              : a ||
                p.pathname + p.search === h.pathname + h.search ||
                p.search !== h.search ||
                eh(K, J),
          }
        )
      );
    }),
    _ = [];
  return (
    c.forEach((P, D) => {
      if (i || !n.some((fe) => fe.route.id === P.routeId) || d.has(D)) return;
      let O = Ot(w, P.path, m);
      if (!O) {
        _.push({
          key: D,
          routeId: P.routeId,
          path: P.path,
          matches: null,
          match: null,
          controller: null,
        });
        return;
      }
      let K = t.fetchers.get(D),
        J = $r(O, P.path),
        de = !1;
      f.has(D)
        ? (de = !1)
        : s.has(D)
        ? (s.delete(D), (de = !0))
        : K && K.state !== "idle" && K.data === void 0
        ? (de = a)
        : (de = Cc(
            J,
            ie(
              {
                currentUrl: p,
                currentParams: t.matches[t.matches.length - 1].params,
                nextUrl: h,
                nextParams: n[n.length - 1].params,
              },
              r,
              {
                actionResult: L,
                actionStatus: E,
                defaultShouldRevalidate: R ? !1 : a,
              }
            )
          )),
        de &&
          _.push({
            key: D,
            routeId: P.routeId,
            path: P.path,
            matches: O,
            match: J,
            controller: new AbortController(),
          });
    }),
    [y, _]
  );
}
function Ua(e, t, n) {
  if (e.lazy) return !0;
  if (!e.loader) return !1;
  let r = t != null && t[e.id] !== void 0,
    l = n != null && n[e.id] !== void 0;
  return !r && l
    ? !1
    : typeof e.loader == "function" && e.loader.hydrate === !0
    ? !0
    : !r && !l;
}
function Uv(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    l = e[n.route.id] === void 0;
  return r || l;
}
function eh(e, t) {
  let n = e.route.path;
  return (
    e.pathname !== t.pathname ||
    (n != null && n.endsWith("*") && e.params["*"] !== t.params["*"])
  );
}
function Cc(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == "boolean") return n;
  }
  return t.defaultShouldRevalidate;
}
function Pc(e, t, n, r, l) {
  var i;
  let o;
  if (e) {
    let s = r[e];
    W(s, "No route found to patch children into: routeId = " + e),
      s.children || (s.children = []),
      (o = s.children);
  } else o = n;
  let a = t.filter((s) => !o.some((d) => th(s, d))),
    u = Ii(
      a,
      l,
      [e || "_", "patch", String(((i = o) == null ? void 0 : i.length) || "0")],
      r
    );
  o.push(...u);
}
function th(e, t) {
  return "id" in e && "id" in t && e.id === t.id
    ? !0
    : e.index === t.index &&
      e.path === t.path &&
      e.caseSensitive === t.caseSensitive
    ? (!e.children || e.children.length === 0) &&
      (!t.children || t.children.length === 0)
      ? !0
      : e.children.every((n, r) => {
          var l;
          return (l = t.children) == null ? void 0 : l.some((i) => th(n, i));
        })
    : !1;
}
async function Av(e, t, n) {
  if (!e.lazy) return;
  let r = await e.lazy();
  if (!e.lazy) return;
  let l = n[e.id];
  W(l, "No route found in manifest");
  let i = {};
  for (let o in r) {
    let u = l[o] !== void 0 && o !== "hasErrorBoundary";
    vr(
      !u,
      'Route "' +
        l.id +
        '" has a static property "' +
        o +
        '" defined but its lazy function is also returning a value for this property. ' +
        ('The lazy route property "' + o + '" will be ignored.')
    ),
      !u && !ov.has(o) && (i[o] = r[o]);
  }
  Object.assign(l, i), Object.assign(l, ie({}, t(l), { lazy: void 0 }));
}
async function Bv(e) {
  let { matches: t } = e,
    n = t.filter((l) => l.shouldLoad);
  return (await Promise.all(n.map((l) => l.resolve()))).reduce(
    (l, i, o) => Object.assign(l, { [n[o].route.id]: i }),
    {}
  );
}
async function Hv(e, t, n, r, l, i, o, a, u, s) {
  let d = i.map((w) => (w.route.lazy ? Av(w.route, u, a) : void 0)),
    c = i.map((w, m) => {
      let x = d[m],
        L = l.some((h) => h.route.id === w.route.id);
      return ie({}, w, {
        shouldLoad: L,
        resolve: async (h) => (
          h &&
            r.method === "GET" &&
            (w.route.lazy || w.route.loader) &&
            (L = !0),
          L
            ? $v(t, r, w, x, h, s)
            : Promise.resolve({ type: ee.data, result: void 0 })
        ),
      });
    }),
    f = await e({
      matches: c,
      request: r,
      params: i[0].params,
      fetcherKey: o,
      context: s,
    });
  try {
    await Promise.all(d);
  } catch {}
  return f;
}
async function $v(e, t, n, r, l, i) {
  let o,
    a,
    u = (s) => {
      let d,
        c = new Promise((m, x) => (d = x));
      (a = () => d()), t.signal.addEventListener("abort", a);
      let f = (m) =>
          typeof s != "function"
            ? Promise.reject(
                new Error(
                  "You cannot call the handler for a route which defines a boolean " +
                    ('"' + e + '" [routeId: ' + n.route.id + "]")
                )
              )
            : s(
                { request: t, params: n.params, context: i },
                ...(m !== void 0 ? [m] : [])
              ),
        w = (async () => {
          try {
            return { type: "data", result: await (l ? l((x) => f(x)) : f()) };
          } catch (m) {
            return { type: "error", result: m };
          }
        })();
      return Promise.race([w, c]);
    };
  try {
    let s = n.route[e];
    if (r)
      if (s) {
        let d,
          [c] = await Promise.all([
            u(s).catch((f) => {
              d = f;
            }),
            r,
          ]);
        if (d !== void 0) throw d;
        o = c;
      } else if ((await r, (s = n.route[e]), s)) o = await u(s);
      else if (e === "action") {
        let d = new URL(t.url),
          c = d.pathname + d.search;
        throw He(405, { method: t.method, pathname: c, routeId: n.route.id });
      } else return { type: ee.data, result: void 0 };
    else if (s) o = await u(s);
    else {
      let d = new URL(t.url),
        c = d.pathname + d.search;
      throw He(404, { pathname: c });
    }
    W(
      o.result !== void 0,
      "You defined " +
        (e === "action" ? "an action" : "a loader") +
        " for route " +
        ('"' +
          n.route.id +
          "\" but didn't return anything from your `" +
          e +
          "` ") +
        "function. Please return a value or `null`."
    );
  } catch (s) {
    return { type: ee.error, result: s };
  } finally {
    a && t.signal.removeEventListener("abort", a);
  }
  return o;
}
async function Vv(e) {
  let { result: t, type: n } = e;
  if (rh(t)) {
    let s;
    try {
      let d = t.headers.get("Content-Type");
      d && /\bapplication\/json\b/.test(d)
        ? t.body == null
          ? (s = null)
          : (s = await t.json())
        : (s = await t.text());
    } catch (d) {
      return { type: ee.error, error: d };
    }
    return n === ee.error
      ? {
          type: ee.error,
          error: new zn(t.status, t.statusText, s),
          statusCode: t.status,
          headers: t.headers,
        }
      : { type: ee.data, data: s, statusCode: t.status, headers: t.headers };
  }
  if (n === ee.error) {
    if (Oc(t)) {
      var r;
      if (t.data instanceof Error) {
        var l;
        return {
          type: ee.error,
          error: t.data,
          statusCode: (l = t.init) == null ? void 0 : l.status,
        };
      }
      t = new zn(
        ((r = t.init) == null ? void 0 : r.status) || 500,
        void 0,
        t.data
      );
    }
    return { type: ee.error, error: t, statusCode: wr(t) ? t.status : void 0 };
  }
  if (Xv(t)) {
    var i, o;
    return {
      type: ee.deferred,
      deferredData: t,
      statusCode: (i = t.init) == null ? void 0 : i.status,
      headers:
        ((o = t.init) == null ? void 0 : o.headers) &&
        new Headers(t.init.headers),
    };
  }
  if (Oc(t)) {
    var a, u;
    return {
      type: ee.data,
      data: t.data,
      statusCode: (a = t.init) == null ? void 0 : a.status,
      headers:
        (u = t.init) != null && u.headers
          ? new Headers(t.init.headers)
          : void 0,
    };
  }
  return { type: ee.data, data: t };
}
function Wv(e, t, n, r, l, i) {
  let o = e.headers.get("Location");
  if (
    (W(
      o,
      "Redirects returned/thrown from loaders/actions must have a Location header"
    ),
    !ju.test(o))
  ) {
    let a = r.slice(0, r.findIndex((u) => u.route.id === n) + 1);
    (o = Ia(new URL(t.url), a, l, !0, o, i)), e.headers.set("Location", o);
  }
  return e;
}
function Rc(e, t, n) {
  if (ju.test(e)) {
    let r = e,
      l = r.startsWith("//") ? new URL(t.protocol + r) : new URL(r),
      i = ut(l.pathname, n) != null;
    if (l.origin === t.origin && i) return l.pathname + l.search + l.hash;
  }
  return e;
}
function Wn(e, t, n, r) {
  let l = e.createURL(nh(t)).toString(),
    i = { signal: n };
  if (r && ht(r.formMethod)) {
    let { formMethod: o, formEncType: a } = r;
    (i.method = o.toUpperCase()),
      a === "application/json"
        ? ((i.headers = new Headers({ "Content-Type": a })),
          (i.body = JSON.stringify(r.json)))
        : a === "text/plain"
        ? (i.body = r.text)
        : a === "application/x-www-form-urlencoded" && r.formData
        ? (i.body = Aa(r.formData))
        : (i.body = r.formData);
  }
  return new Request(l, i);
}
function Aa(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries())
    t.append(n, typeof r == "string" ? r : r.name);
  return t;
}
function Lc(e) {
  let t = new FormData();
  for (let [n, r] of e.entries()) t.append(n, r);
  return t;
}
function Kv(e, t, n, r, l) {
  let i = {},
    o = null,
    a,
    u = !1,
    s = {},
    d = n && Xe(n[1]) ? n[1].error : void 0;
  return (
    e.forEach((c) => {
      if (!(c.route.id in t)) return;
      let f = c.route.id,
        w = t[f];
      if (
        (W(!Rn(w), "Cannot handle redirect results in processLoaderData"),
        Xe(w))
      ) {
        let m = w.error;
        d !== void 0 && ((m = d), (d = void 0)), (o = o || {});
        {
          let x = xn(e, f);
          o[x.route.id] == null && (o[x.route.id] = m);
        }
        (i[f] = void 0),
          u || ((u = !0), (a = wr(w.error) ? w.error.status : 500)),
          w.headers && (s[f] = w.headers);
      } else
        tn(w)
          ? (r.set(f, w.deferredData),
            (i[f] = w.deferredData.data),
            w.statusCode != null &&
              w.statusCode !== 200 &&
              !u &&
              (a = w.statusCode),
            w.headers && (s[f] = w.headers))
          : ((i[f] = w.data),
            w.statusCode && w.statusCode !== 200 && !u && (a = w.statusCode),
            w.headers && (s[f] = w.headers));
    }),
    d !== void 0 && n && ((o = { [n[0]]: d }), (i[n[0]] = void 0)),
    { loaderData: i, errors: o, statusCode: a || 200, loaderHeaders: s }
  );
}
function _c(e, t, n, r, l, i, o) {
  let { loaderData: a, errors: u } = Kv(t, n, r, o);
  return (
    l.forEach((s) => {
      let { key: d, match: c, controller: f } = s,
        w = i[d];
      if (
        (W(w, "Did not find corresponding fetcher result"),
        !(f && f.signal.aborted))
      )
        if (Xe(w)) {
          let m = xn(e.matches, c == null ? void 0 : c.route.id);
          (u && u[m.route.id]) || (u = ie({}, u, { [m.route.id]: w.error })),
            e.fetchers.delete(d);
        } else if (Rn(w)) W(!1, "Unhandled fetcher revalidation redirect");
        else if (tn(w)) W(!1, "Unhandled fetcher deferred data");
        else {
          let m = Xt(w.data);
          e.fetchers.set(d, m);
        }
    }),
    { loaderData: a, errors: u }
  );
}
function Tc(e, t, n, r) {
  let l = ie({}, t);
  for (let i of n) {
    let o = i.route.id;
    if (
      (t.hasOwnProperty(o)
        ? t[o] !== void 0 && (l[o] = t[o])
        : e[o] !== void 0 && i.route.loader && (l[o] = e[o]),
      r && r.hasOwnProperty(o))
    )
      break;
  }
  return l;
}
function Nc(e) {
  return e
    ? Xe(e[1])
      ? { actionData: {} }
      : { actionData: { [e[0]]: e[1].data } }
    : {};
}
function xn(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((r) => r.route.id === t) + 1) : [...e])
      .reverse()
      .find((r) => r.route.hasErrorBoundary === !0) || e[0]
  );
}
function Dc(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((n) => n.index || !n.path || n.path === "/") || {
          id: "__shim-error-route__",
        };
  return {
    matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }],
    route: t,
  };
}
function He(e, t) {
  let {
      pathname: n,
      routeId: r,
      method: l,
      type: i,
      message: o,
    } = t === void 0 ? {} : t,
    a = "Unknown Server Error",
    u = "Unknown @remix-run/router error";
  return (
    e === 400
      ? ((a = "Bad Request"),
        l && n && r
          ? (u =
              "You made a " +
              l +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide a `loader` for route "' + r + '", ') +
              "so there is no way to handle the request.")
          : i === "defer-action"
          ? (u = "defer() is not supported in actions")
          : i === "invalid-body" && (u = "Unable to encode submission body"))
      : e === 403
      ? ((a = "Forbidden"),
        (u = 'Route "' + r + '" does not match URL "' + n + '"'))
      : e === 404
      ? ((a = "Not Found"), (u = 'No route matches URL "' + n + '"'))
      : e === 405 &&
        ((a = "Method Not Allowed"),
        l && n && r
          ? (u =
              "You made a " +
              l.toUpperCase() +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide an `action` for route "' + r + '", ') +
              "so there is no way to handle the request.")
          : l && (u = 'Invalid request method "' + l.toUpperCase() + '"')),
    new zn(e || 500, a, new Error(u), !0)
  );
}
function Yl(e) {
  let t = Object.entries(e);
  for (let n = t.length - 1; n >= 0; n--) {
    let [r, l] = t[n];
    if (Rn(l)) return { key: r, result: l };
  }
}
function nh(e) {
  let t = typeof e == "string" ? $t(e) : e;
  return hn(ie({}, t, { hash: "" }));
}
function Qv(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search
    ? !1
    : e.hash === ""
    ? t.hash !== ""
    : e.hash === t.hash
    ? !0
    : t.hash !== "";
}
function Yv(e) {
  return rh(e.result) && Mv.has(e.result.status);
}
function tn(e) {
  return e.type === ee.deferred;
}
function Xe(e) {
  return e.type === ee.error;
}
function Rn(e) {
  return (e && e.type) === ee.redirect;
}
function Oc(e) {
  return (
    typeof e == "object" &&
    e != null &&
    "type" in e &&
    "data" in e &&
    "init" in e &&
    e.type === "DataWithResponseInit"
  );
}
function Xv(e) {
  let t = e;
  return (
    t &&
    typeof t == "object" &&
    typeof t.data == "object" &&
    typeof t.subscribe == "function" &&
    typeof t.cancel == "function" &&
    typeof t.resolveData == "function"
  );
}
function rh(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function Jv(e) {
  return Ov.has(e.toLowerCase());
}
function ht(e) {
  return Nv.has(e.toLowerCase());
}
async function Gv(e, t, n, r, l) {
  let i = Object.entries(t);
  for (let o = 0; o < i.length; o++) {
    let [a, u] = i[o],
      s = e.find((f) => (f == null ? void 0 : f.route.id) === a);
    if (!s) continue;
    let d = r.find((f) => f.route.id === s.route.id),
      c = d != null && !eh(d, s) && (l && l[s.route.id]) !== void 0;
    tn(u) &&
      c &&
      (await Iu(u, n, !1).then((f) => {
        f && (t[a] = f);
      }));
  }
}
async function Zv(e, t, n) {
  for (let r = 0; r < n.length; r++) {
    let { key: l, routeId: i, controller: o } = n[r],
      a = t[l];
    e.find((s) => (s == null ? void 0 : s.route.id) === i) &&
      tn(a) &&
      (W(
        o,
        "Expected an AbortController for revalidating fetcher deferred result"
      ),
      await Iu(a, o.signal, !0).then((s) => {
        s && (t[l] = s);
      }));
  }
}
async function Iu(e, t, n) {
  if ((n === void 0 && (n = !1), !(await e.deferredData.resolveData(t)))) {
    if (n)
      try {
        return { type: ee.data, data: e.deferredData.unwrappedData };
      } catch (l) {
        return { type: ee.error, error: l };
      }
    return { type: ee.data, data: e.deferredData.data };
  }
}
function Uu(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function $r(e, t) {
  let n = typeof t == "string" ? $t(t).search : t.search;
  if (e[e.length - 1].route.index && Uu(n || "")) return e[e.length - 1];
  let r = Gf(e);
  return r[r.length - 1];
}
function Mc(e) {
  let {
    formMethod: t,
    formAction: n,
    formEncType: r,
    text: l,
    formData: i,
    json: o,
  } = e;
  if (!(!t || !n || !r)) {
    if (l != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: void 0,
        text: l,
      };
    if (i != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: i,
        json: void 0,
        text: void 0,
      };
    if (o !== void 0)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: o,
        text: void 0,
      };
  }
}
function Bo(e, t) {
  return t
    ? {
        state: "loading",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: "loading",
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function qv(e, t) {
  return {
    state: "submitting",
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  };
}
function Fr(e, t) {
  return e
    ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      };
}
function bv(e, t) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  };
}
function Xt(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function ey(e, t) {
  try {
    let n = e.sessionStorage.getItem(bf);
    if (n) {
      let r = JSON.parse(n);
      for (let [l, i] of Object.entries(r || {}))
        i && Array.isArray(i) && t.set(l, new Set(i || []));
    }
  } catch {}
}
function ty(e, t) {
  if (t.size > 0) {
    let n = {};
    for (let [r, l] of t) n[r] = [...l];
    try {
      e.sessionStorage.setItem(bf, JSON.stringify(n));
    } catch (r) {
      vr(
        !1,
        "Failed to save applied view transitions in sessionStorage (" + r + ")."
      );
    }
  }
}
/**
 * React Router v6.27.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Bi() {
  return (
    (Bi = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Bi.apply(this, arguments)
  );
}
const Sr = g.createContext(null),
  El = g.createContext(null),
  Hi = g.createContext(null),
  gt = g.createContext(null),
  Au = g.createContext(null),
  Vt = g.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  lh = g.createContext(null);
function Bu(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  xl() || W(!1);
  let { basename: r, navigator: l } = g.useContext(gt),
    { hash: i, pathname: o, search: a } = kl(e, { relative: n }),
    u = o;
  return (
    r !== "/" && (u = o === "/" ? r : Rt([r, o])),
    l.createHref({ pathname: u, search: a, hash: i })
  );
}
function xl() {
  return g.useContext(Au) != null;
}
function Wt() {
  return xl() || W(!1), g.useContext(Au).location;
}
function ih(e) {
  g.useContext(gt).static || g.useLayoutEffect(e);
}
function ny() {
  let { isDataRoute: e } = g.useContext(Vt);
  return e ? wy() : ry();
}
function ry() {
  xl() || W(!1);
  let e = g.useContext(Sr),
    { basename: t, future: n, navigator: r } = g.useContext(gt),
    { matches: l } = g.useContext(Vt),
    { pathname: i } = Wt(),
    o = JSON.stringify(zu(l, n.v7_relativeSplatPath)),
    a = g.useRef(!1);
  return (
    ih(() => {
      a.current = !0;
    }),
    g.useCallback(
      function (s, d) {
        if ((d === void 0 && (d = {}), !a.current)) return;
        if (typeof s == "number") {
          r.go(s);
          return;
        }
        let c = Fu(s, JSON.parse(o), i, d.relative === "path");
        e == null &&
          t !== "/" &&
          (c.pathname = c.pathname === "/" ? t : Rt([t, c.pathname])),
          (d.replace ? r.replace : r.push)(c, d.state, d);
      },
      [t, r, o, i, e]
    )
  );
}
const ly = g.createContext(null);
function iy(e) {
  let t = g.useContext(Vt).outlet;
  return t && g.createElement(ly.Provider, { value: e }, t);
}
function kl(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = g.useContext(gt),
    { matches: l } = g.useContext(Vt),
    { pathname: i } = Wt(),
    o = JSON.stringify(zu(l, r.v7_relativeSplatPath));
  return g.useMemo(() => Fu(e, JSON.parse(o), i, n === "path"), [e, o, i, n]);
}
function oy(e, t, n, r) {
  xl() || W(!1);
  let { navigator: l } = g.useContext(gt),
    { matches: i } = g.useContext(Vt),
    o = i[i.length - 1],
    a = o ? o.params : {};
  o && o.pathname;
  let u = o ? o.pathnameBase : "/";
  o && o.route;
  let s = Wt(),
    d;
  d = s;
  let c = d.pathname || "/",
    f = c;
  if (u !== "/") {
    let x = u.replace(/^\//, "").split("/");
    f = "/" + c.replace(/^\//, "").split("/").slice(x.length).join("/");
  }
  let w = Ot(e, { pathname: f });
  return dy(
    w &&
      w.map((x) =>
        Object.assign({}, x, {
          params: Object.assign({}, a, x.params),
          pathname: Rt([
            u,
            l.encodeLocation
              ? l.encodeLocation(x.pathname).pathname
              : x.pathname,
          ]),
          pathnameBase:
            x.pathnameBase === "/"
              ? u
              : Rt([
                  u,
                  l.encodeLocation
                    ? l.encodeLocation(x.pathnameBase).pathname
                    : x.pathnameBase,
                ]),
        })
      ),
    i,
    n,
    r
  );
}
function ay() {
  let e = ah(),
    t = wr(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return g.createElement(
    g.Fragment,
    null,
    g.createElement("h2", null, "Unexpected Application Error!"),
    g.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? g.createElement("pre", { style: l }, n) : null,
    null
  );
}
const uy = g.createElement(ay, null);
class sy extends g.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error !== void 0
      ? g.createElement(
          Vt.Provider,
          { value: this.props.routeContext },
          g.createElement(lh.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function cy(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = g.useContext(Sr);
  return (
    l &&
      l.static &&
      l.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    g.createElement(Vt.Provider, { value: t }, r)
  );
}
function dy(e, t, n, r) {
  var l;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var i;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (i = r) != null &&
      i.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let o = e,
    a = (l = n) == null ? void 0 : l.errors;
  if (a != null) {
    let d = o.findIndex(
      (c) => c.route.id && (a == null ? void 0 : a[c.route.id]) !== void 0
    );
    d >= 0 || W(!1), (o = o.slice(0, Math.min(o.length, d + 1)));
  }
  let u = !1,
    s = -1;
  if (n && r && r.v7_partialHydration)
    for (let d = 0; d < o.length; d++) {
      let c = o[d];
      if (
        ((c.route.HydrateFallback || c.route.hydrateFallbackElement) && (s = d),
        c.route.id)
      ) {
        let { loaderData: f, errors: w } = n,
          m =
            c.route.loader &&
            f[c.route.id] === void 0 &&
            (!w || w[c.route.id] === void 0);
        if (c.route.lazy || m) {
          (u = !0), s >= 0 ? (o = o.slice(0, s + 1)) : (o = [o[0]]);
          break;
        }
      }
    }
  return o.reduceRight((d, c, f) => {
    let w,
      m = !1,
      x = null,
      L = null;
    n &&
      ((w = a && c.route.id ? a[c.route.id] : void 0),
      (x = c.route.errorElement || uy),
      u &&
        (s < 0 && f === 0
          ? ((m = !0), (L = null))
          : s === f &&
            ((m = !0), (L = c.route.hydrateFallbackElement || null))));
    let p = t.concat(o.slice(0, f + 1)),
      h = () => {
        let v;
        return (
          w
            ? (v = x)
            : m
            ? (v = L)
            : c.route.Component
            ? (v = g.createElement(c.route.Component, null))
            : c.route.element
            ? (v = c.route.element)
            : (v = d),
          g.createElement(cy, {
            match: c,
            routeContext: { outlet: d, matches: p, isDataRoute: n != null },
            children: v,
          })
        );
      };
    return n && (c.route.ErrorBoundary || c.route.errorElement || f === 0)
      ? g.createElement(sy, {
          location: n.location,
          revalidation: n.revalidation,
          component: x,
          error: w,
          children: h(),
          routeContext: { outlet: null, matches: p, isDataRoute: !0 },
        })
      : h();
  }, null);
}
var oh = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(oh || {}),
  Fn = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(Fn || {});
function fy(e) {
  let t = g.useContext(Sr);
  return t || W(!1), t;
}
function Hu(e) {
  let t = g.useContext(El);
  return t || W(!1), t;
}
function hy(e) {
  let t = g.useContext(Vt);
  return t || W(!1), t;
}
function $u(e) {
  let t = hy(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || W(!1), n.route.id;
}
function py() {
  return $u(Fn.UseRouteId);
}
function my() {
  return Hu(Fn.UseNavigation).navigation;
}
function vy() {
  let { matches: e, loaderData: t } = Hu(Fn.UseMatches);
  return g.useMemo(() => e.map((n) => Yf(n, t)), [e, t]);
}
function ah() {
  var e;
  let t = g.useContext(lh),
    n = Hu(Fn.UseRouteError),
    r = $u(Fn.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function yy() {
  let e = g.useContext(Hi);
  return e == null ? void 0 : e._data;
}
function gy() {
  let e = g.useContext(Hi);
  return e == null ? void 0 : e._error;
}
function wy() {
  let { router: e } = fy(oh.UseNavigateStable),
    t = $u(Fn.UseNavigateStable),
    n = g.useRef(!1);
  return (
    ih(() => {
      n.current = !0;
    }),
    g.useCallback(
      function (l, i) {
        i === void 0 && (i = {}),
          n.current &&
            (typeof l == "number"
              ? e.navigate(l)
              : e.navigate(l, Bi({ fromRouteId: t }, i)));
      },
      [e, t]
    )
  );
}
function w0(e) {
  return iy(e.context);
}
function Sy(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: l = we.Pop,
    navigator: i,
    static: o = !1,
    future: a,
  } = e;
  xl() && W(!1);
  let u = t.replace(/^\/*/, "/"),
    s = g.useMemo(
      () => ({
        basename: u,
        navigator: i,
        static: o,
        future: Bi({ v7_relativeSplatPath: !1 }, a),
      }),
      [u, a, i, o]
    );
  typeof r == "string" && (r = $t(r));
  let {
      pathname: d = "/",
      search: c = "",
      hash: f = "",
      state: w = null,
      key: m = "default",
    } = r,
    x = g.useMemo(() => {
      let L = ut(d, u);
      return L == null
        ? null
        : {
            location: { pathname: L, search: c, hash: f, state: w, key: m },
            navigationType: l,
          };
    }, [u, d, c, f, w, m, l]);
  return x == null
    ? null
    : g.createElement(
        gt.Provider,
        { value: s },
        g.createElement(Au.Provider, { children: n, value: x })
      );
}
function Ey(e) {
  let { children: t, errorElement: n, resolve: r } = e;
  return g.createElement(
    ky,
    { resolve: r, errorElement: n },
    g.createElement(Cy, null, t)
  );
}
var tt = (function (e) {
  return (
    (e[(e.pending = 0)] = "pending"),
    (e[(e.success = 1)] = "success"),
    (e[(e.error = 2)] = "error"),
    e
  );
})(tt || {});
const xy = new Promise(() => {});
class ky extends g.Component {
  constructor(t) {
    super(t), (this.state = { error: null });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  componentDidCatch(t, n) {
    console.error("<Await> caught the following error during render", t, n);
  }
  render() {
    let { children: t, errorElement: n, resolve: r } = this.props,
      l = null,
      i = tt.pending;
    if (!(r instanceof Promise))
      (i = tt.success),
        (l = Promise.resolve()),
        Object.defineProperty(l, "_tracked", { get: () => !0 }),
        Object.defineProperty(l, "_data", { get: () => r });
    else if (this.state.error) {
      i = tt.error;
      let o = this.state.error;
      (l = Promise.reject().catch(() => {})),
        Object.defineProperty(l, "_tracked", { get: () => !0 }),
        Object.defineProperty(l, "_error", { get: () => o });
    } else
      r._tracked
        ? ((l = r),
          (i =
            "_error" in l ? tt.error : "_data" in l ? tt.success : tt.pending))
        : ((i = tt.pending),
          Object.defineProperty(r, "_tracked", { get: () => !0 }),
          (l = r.then(
            (o) => Object.defineProperty(r, "_data", { get: () => o }),
            (o) => Object.defineProperty(r, "_error", { get: () => o })
          )));
    if (i === tt.error && l._error instanceof Ai) throw xy;
    if (i === tt.error && !n) throw l._error;
    if (i === tt.error)
      return g.createElement(Hi.Provider, { value: l, children: n });
    if (i === tt.success)
      return g.createElement(Hi.Provider, { value: l, children: t });
    throw l;
  }
}
function Cy(e) {
  let { children: t } = e,
    n = yy(),
    r = typeof t == "function" ? t(n) : t;
  return g.createElement(g.Fragment, null, r);
}
function S0(e) {
  let t = {
    hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      Object.assign(t, {
        element: g.createElement(e.Component),
        Component: void 0,
      }),
    e.HydrateFallback &&
      Object.assign(t, {
        hydrateFallbackElement: g.createElement(e.HydrateFallback),
        HydrateFallback: void 0,
      }),
    e.ErrorBoundary &&
      Object.assign(t, {
        errorElement: g.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0,
      }),
    t
  );
}
/**
 * React Router DOM v6.27.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function jn() {
  return (
    (jn = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    jn.apply(this, arguments)
  );
}
function Vu(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    i;
  for (i = 0; i < r.length; i++)
    (l = r[i]), !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
const ci = "get",
  Ho = "application/x-www-form-urlencoded";
function lo(e) {
  return e != null && typeof e.tagName == "string";
}
function Py(e) {
  return lo(e) && e.tagName.toLowerCase() === "button";
}
function Ry(e) {
  return lo(e) && e.tagName.toLowerCase() === "form";
}
function Ly(e) {
  return lo(e) && e.tagName.toLowerCase() === "input";
}
function _y(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Ty(e, t) {
  return e.button === 0 && (!t || t === "_self") && !_y(e);
}
let Xl = null;
function Ny() {
  if (Xl === null)
    try {
      new FormData(document.createElement("form"), 0), (Xl = !1);
    } catch {
      Xl = !0;
    }
  return Xl;
}
const Dy = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function $o(e) {
  return e != null && !Dy.has(e) ? null : e;
}
function Oy(e, t) {
  let n, r, l, i, o;
  if (Ry(e)) {
    let a = e.getAttribute("action");
    (r = a ? ut(a, t) : null),
      (n = e.getAttribute("method") || ci),
      (l = $o(e.getAttribute("enctype")) || Ho),
      (i = new FormData(e));
  } else if (Py(e) || (Ly(e) && (e.type === "submit" || e.type === "image"))) {
    let a = e.form;
    if (a == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let u = e.getAttribute("formaction") || a.getAttribute("action");
    if (
      ((r = u ? ut(u, t) : null),
      (n = e.getAttribute("formmethod") || a.getAttribute("method") || ci),
      (l =
        $o(e.getAttribute("formenctype")) ||
        $o(a.getAttribute("enctype")) ||
        Ho),
      (i = new FormData(a, e)),
      !Ny())
    ) {
      let { name: s, type: d, value: c } = e;
      if (d === "image") {
        let f = s ? s + "." : "";
        i.append(f + "x", "0"), i.append(f + "y", "0");
      } else s && i.append(s, c);
    }
  } else {
    if (lo(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (n = ci), (r = null), (l = Ho), (o = e);
  }
  return (
    i && l === "text/plain" && ((o = i), (i = void 0)),
    { action: r, method: n.toLowerCase(), encType: l, formData: i, body: o }
  );
}
const My = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  zy = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "viewTransition",
    "children",
  ],
  Fy = [
    "fetcherKey",
    "navigate",
    "reloadDocument",
    "replace",
    "state",
    "method",
    "action",
    "onSubmit",
    "relative",
    "preventScrollReset",
    "viewTransition",
  ],
  jy = "6";
try {
  window.__reactRouterVersion = jy;
} catch {}
const uh = g.createContext({ isTransitioning: !1 }),
  Iy = g.createContext(new Map()),
  Uy = "startTransition",
  zc = Gh[Uy],
  Ay = "flushSync",
  Fc = rv[Ay];
function By(e) {
  zc ? zc(e) : e();
}
function jr(e) {
  Fc ? Fc(e) : e();
}
let Hy = class {
  constructor() {
    (this.status = "pending"),
      (this.promise = new Promise((t, n) => {
        (this.resolve = (r) => {
          this.status === "pending" && ((this.status = "resolved"), t(r));
        }),
          (this.reject = (r) => {
            this.status === "pending" && ((this.status = "rejected"), n(r));
          });
      }));
  }
};
function x0(e) {
  let { fallbackElement: t, router: n, future: r } = e,
    [l, i] = g.useState(n.state),
    [o, a] = g.useState(),
    [u, s] = g.useState({ isTransitioning: !1 }),
    [d, c] = g.useState(),
    [f, w] = g.useState(),
    [m, x] = g.useState(),
    L = g.useRef(new Map()),
    { v7_startTransition: p } = r || {},
    h = g.useCallback(
      (P) => {
        p ? By(P) : P();
      },
      [p]
    ),
    v = g.useCallback(
      (P, D) => {
        let { deletedFetchers: O, flushSync: K, viewTransitionOpts: J } = D;
        O.forEach((fe) => L.current.delete(fe)),
          P.fetchers.forEach((fe, Re) => {
            fe.data !== void 0 && L.current.set(Re, fe.data);
          });
        let de =
          n.window == null ||
          n.window.document == null ||
          typeof n.window.document.startViewTransition != "function";
        if (!J || de) {
          K ? jr(() => i(P)) : h(() => i(P));
          return;
        }
        if (K) {
          jr(() => {
            f && (d && d.resolve(), f.skipTransition()),
              s({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: J.currentLocation,
                nextLocation: J.nextLocation,
              });
          });
          let fe = n.window.document.startViewTransition(() => {
            jr(() => i(P));
          });
          fe.finished.finally(() => {
            jr(() => {
              c(void 0), w(void 0), a(void 0), s({ isTransitioning: !1 });
            });
          }),
            jr(() => w(fe));
          return;
        }
        f
          ? (d && d.resolve(),
            f.skipTransition(),
            x({
              state: P,
              currentLocation: J.currentLocation,
              nextLocation: J.nextLocation,
            }))
          : (a(P),
            s({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: J.currentLocation,
              nextLocation: J.nextLocation,
            }));
      },
      [n.window, f, d, L, h]
    );
  g.useLayoutEffect(() => n.subscribe(v), [n, v]),
    g.useEffect(() => {
      u.isTransitioning && !u.flushSync && c(new Hy());
    }, [u]),
    g.useEffect(() => {
      if (d && o && n.window) {
        let P = o,
          D = d.promise,
          O = n.window.document.startViewTransition(async () => {
            h(() => i(P)), await D;
          });
        O.finished.finally(() => {
          c(void 0), w(void 0), a(void 0), s({ isTransitioning: !1 });
        }),
          w(O);
      }
    }, [h, o, d, n.window]),
    g.useEffect(() => {
      d && o && l.location.key === o.location.key && d.resolve();
    }, [d, f, l.location, o]),
    g.useEffect(() => {
      !u.isTransitioning &&
        m &&
        (a(m.state),
        s({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: m.currentLocation,
          nextLocation: m.nextLocation,
        }),
        x(void 0));
    }, [u.isTransitioning, m]),
    g.useEffect(() => {}, []);
  let E = g.useMemo(
      () => ({
        createHref: n.createHref,
        encodeLocation: n.encodeLocation,
        go: (P) => n.navigate(P),
        push: (P, D, O) =>
          n.navigate(P, {
            state: D,
            preventScrollReset: O == null ? void 0 : O.preventScrollReset,
          }),
        replace: (P, D, O) =>
          n.navigate(P, {
            replace: !0,
            state: D,
            preventScrollReset: O == null ? void 0 : O.preventScrollReset,
          }),
      }),
      [n]
    ),
    R = n.basename || "/",
    y = g.useMemo(
      () => ({ router: n, navigator: E, static: !1, basename: R }),
      [n, E, R]
    ),
    _ = g.useMemo(
      () => ({ v7_relativeSplatPath: n.future.v7_relativeSplatPath }),
      [n.future.v7_relativeSplatPath]
    );
  return g.createElement(
    g.Fragment,
    null,
    g.createElement(
      Sr.Provider,
      { value: y },
      g.createElement(
        El.Provider,
        { value: l },
        g.createElement(
          Iy.Provider,
          { value: L.current },
          g.createElement(
            uh.Provider,
            { value: u },
            g.createElement(
              Sy,
              {
                basename: R,
                location: l.location,
                navigationType: l.historyAction,
                navigator: E,
                future: _,
              },
              l.initialized || n.future.v7_partialHydration
                ? g.createElement($y, {
                    routes: n.routes,
                    future: n.future,
                    state: l,
                  })
                : t
            )
          )
        )
      )
    ),
    null
  );
}
const $y = g.memo(Vy);
function Vy(e) {
  let { routes: t, future: n, state: r } = e;
  return oy(t, void 0, r, n);
}
const Wy =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  Ky = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  sh = g.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: l,
        reloadDocument: i,
        replace: o,
        state: a,
        target: u,
        to: s,
        preventScrollReset: d,
        viewTransition: c,
      } = t,
      f = Vu(t, My),
      { basename: w } = g.useContext(gt),
      m,
      x = !1;
    if (typeof s == "string" && Ky.test(s) && ((m = s), Wy))
      try {
        let v = new URL(window.location.href),
          E = s.startsWith("//") ? new URL(v.protocol + s) : new URL(s),
          R = ut(E.pathname, w);
        E.origin === v.origin && R != null
          ? (s = R + E.search + E.hash)
          : (x = !0);
      } catch {}
    let L = Bu(s, { relative: l }),
      p = Jy(s, {
        replace: o,
        state: a,
        target: u,
        preventScrollReset: d,
        relative: l,
        viewTransition: c,
      });
    function h(v) {
      r && r(v), v.defaultPrevented || p(v);
    }
    return g.createElement(
      "a",
      jn({}, f, { href: m || L, onClick: x || i ? r : h, ref: n, target: u })
    );
  }),
  Qy = g.forwardRef(function (t, n) {
    let {
        "aria-current": r = "page",
        caseSensitive: l = !1,
        className: i = "",
        end: o = !1,
        style: a,
        to: u,
        viewTransition: s,
        children: d,
      } = t,
      c = Vu(t, zy),
      f = kl(u, { relative: c.relative }),
      w = Wt(),
      m = g.useContext(El),
      { navigator: x, basename: L } = g.useContext(gt),
      p = m != null && ng(f) && s === !0,
      h = x.encodeLocation ? x.encodeLocation(f).pathname : f.pathname,
      v = w.pathname,
      E =
        m && m.navigation && m.navigation.location
          ? m.navigation.location.pathname
          : null;
    l ||
      ((v = v.toLowerCase()),
      (E = E ? E.toLowerCase() : null),
      (h = h.toLowerCase())),
      E && L && (E = ut(E, L) || E);
    const R = h !== "/" && h.endsWith("/") ? h.length - 1 : h.length;
    let y = v === h || (!o && v.startsWith(h) && v.charAt(R) === "/"),
      _ =
        E != null &&
        (E === h || (!o && E.startsWith(h) && E.charAt(h.length) === "/")),
      P = { isActive: y, isPending: _, isTransitioning: p },
      D = y ? r : void 0,
      O;
    typeof i == "function"
      ? (O = i(P))
      : (O = [
          i,
          y ? "active" : null,
          _ ? "pending" : null,
          p ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let K = typeof a == "function" ? a(P) : a;
    return g.createElement(
      sh,
      jn({}, c, {
        "aria-current": D,
        className: O,
        ref: n,
        style: K,
        to: u,
        viewTransition: s,
      }),
      typeof d == "function" ? d(P) : d
    );
  }),
  Yy = g.forwardRef((e, t) => {
    let {
        fetcherKey: n,
        navigate: r,
        reloadDocument: l,
        replace: i,
        state: o,
        method: a = ci,
        action: u,
        onSubmit: s,
        relative: d,
        preventScrollReset: c,
        viewTransition: f,
      } = e,
      w = Vu(e, Fy),
      m = by(),
      x = eg(u, { relative: d }),
      L = a.toLowerCase() === "get" ? "get" : "post",
      p = (h) => {
        if ((s && s(h), h.defaultPrevented)) return;
        h.preventDefault();
        let v = h.nativeEvent.submitter,
          E = (v == null ? void 0 : v.getAttribute("formmethod")) || a;
        m(v || h.currentTarget, {
          fetcherKey: n,
          method: E,
          navigate: r,
          replace: i,
          state: o,
          relative: d,
          preventScrollReset: c,
          viewTransition: f,
        });
      };
    return g.createElement(
      "form",
      jn({ ref: t, method: L, action: x, onSubmit: l ? s : p }, w)
    );
  });
var vl;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(vl || (vl = {}));
var Ba;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(Ba || (Ba = {}));
function Wu(e) {
  let t = g.useContext(Sr);
  return t || W(!1), t;
}
function Xy(e) {
  let t = g.useContext(El);
  return t || W(!1), t;
}
function Jy(e, t) {
  let {
      target: n,
      replace: r,
      state: l,
      preventScrollReset: i,
      relative: o,
      viewTransition: a,
    } = t === void 0 ? {} : t,
    u = ny(),
    s = Wt(),
    d = kl(e, { relative: o });
  return g.useCallback(
    (c) => {
      if (Ty(c, n)) {
        c.preventDefault();
        let f = r !== void 0 ? r : hn(s) === hn(d);
        u(e, {
          replace: f,
          state: l,
          preventScrollReset: i,
          relative: o,
          viewTransition: a,
        });
      }
    },
    [s, u, d, r, l, n, e, i, o, a]
  );
}
function Gy() {
  if (typeof document > "u")
    throw new Error(
      "You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead."
    );
}
let Zy = 0,
  qy = () => "__" + String(++Zy) + "__";
function by() {
  let { router: e } = Wu(vl.UseSubmit),
    { basename: t } = g.useContext(gt),
    n = py();
  return g.useCallback(
    function (r, l) {
      l === void 0 && (l = {}), Gy();
      let { action: i, method: o, encType: a, formData: u, body: s } = Oy(r, t);
      if (l.navigate === !1) {
        let d = l.fetcherKey || qy();
        e.fetch(d, n, l.action || i, {
          preventScrollReset: l.preventScrollReset,
          formData: u,
          body: s,
          formMethod: l.method || o,
          formEncType: l.encType || a,
          flushSync: l.flushSync,
        });
      } else
        e.navigate(l.action || i, {
          preventScrollReset: l.preventScrollReset,
          formData: u,
          body: s,
          formMethod: l.method || o,
          formEncType: l.encType || a,
          replace: l.replace,
          state: l.state,
          fromRouteId: n,
          flushSync: l.flushSync,
          viewTransition: l.viewTransition,
        });
    },
    [e, t, n]
  );
}
function eg(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { basename: r } = g.useContext(gt),
    l = g.useContext(Vt);
  l || W(!1);
  let [i] = l.matches.slice(-1),
    o = jn({}, kl(e || ".", { relative: n })),
    a = Wt();
  if (e == null) {
    o.search = a.search;
    let u = new URLSearchParams(o.search),
      s = u.getAll("index");
    if (s.some((c) => c === "")) {
      u.delete("index"),
        s.filter((f) => f).forEach((f) => u.append("index", f));
      let c = u.toString();
      o.search = c ? "?" + c : "";
    }
  }
  return (
    (!e || e === ".") &&
      i.route.index &&
      (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"),
    r !== "/" && (o.pathname = o.pathname === "/" ? r : Rt([r, o.pathname])),
    hn(o)
  );
}
const jc = "react-router-scroll-positions";
let Jl = {};
function k0(e) {
  let { getKey: t, storageKey: n } = e === void 0 ? {} : e,
    { router: r } = Wu(vl.UseScrollRestoration),
    { restoreScrollPosition: l, preventScrollReset: i } = Xy(
      Ba.UseScrollRestoration
    ),
    { basename: o } = g.useContext(gt),
    a = Wt(),
    u = vy(),
    s = my();
  g.useEffect(
    () => (
      (window.history.scrollRestoration = "manual"),
      () => {
        window.history.scrollRestoration = "auto";
      }
    ),
    []
  ),
    tg(
      g.useCallback(() => {
        if (s.state === "idle") {
          let d = (t ? t(a, u) : null) || a.key;
          Jl[d] = window.scrollY;
        }
        try {
          sessionStorage.setItem(n || jc, JSON.stringify(Jl));
        } catch {}
        window.history.scrollRestoration = "auto";
      }, [n, t, s.state, a, u])
    ),
    typeof document < "u" &&
      (g.useLayoutEffect(() => {
        try {
          let d = sessionStorage.getItem(n || jc);
          d && (Jl = JSON.parse(d));
        } catch {}
      }, [n]),
      g.useLayoutEffect(() => {
        let d =
            t && o !== "/"
              ? (f, w) =>
                  t(jn({}, f, { pathname: ut(f.pathname, o) || f.pathname }), w)
              : t,
          c =
            r == null
              ? void 0
              : r.enableScrollRestoration(Jl, () => window.scrollY, d);
        return () => c && c();
      }, [r, o, t]),
      g.useLayoutEffect(() => {
        if (l !== !1) {
          if (typeof l == "number") {
            window.scrollTo(0, l);
            return;
          }
          if (a.hash) {
            let d = document.getElementById(
              decodeURIComponent(a.hash.slice(1))
            );
            if (d) {
              d.scrollIntoView();
              return;
            }
          }
          i !== !0 && window.scrollTo(0, 0);
        }
      }, [a, l, i]));
}
function tg(e, t) {
  let { capture: n } = {};
  g.useEffect(() => {
    let r = n != null ? { capture: n } : void 0;
    return (
      window.addEventListener("pagehide", e, r),
      () => {
        window.removeEventListener("pagehide", e, r);
      }
    );
  }, [e, n]);
}
function ng(e, t) {
  t === void 0 && (t = {});
  let n = g.useContext(uh);
  n == null && W(!1);
  let { basename: r } = Wu(vl.useViewTransitionState),
    l = kl(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let i = ut(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    o = ut(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return Ui(l.pathname, o) != null || Ui(l.pathname, i) != null;
}
var rg = -1,
  lg = -2,
  ig = -3,
  og = -4,
  ag = -5,
  ug = -6,
  sg = -7,
  cg = "B",
  dg = "D",
  ch = "E",
  fg = "M",
  hg = "N",
  dh = "P",
  pg = "R",
  mg = "S",
  vg = "Y",
  yg = "U",
  gg = "Z",
  fh = class {
    constructor() {
      Nl(this, "promise");
      Nl(this, "resolve");
      Nl(this, "reject");
      this.promise = new Promise((e, t) => {
        (this.resolve = e), (this.reject = t);
      });
    }
  };
function wg() {
  const e = new TextDecoder();
  let t = "";
  return new TransformStream({
    transform(n, r) {
      const l = e.decode(n, { stream: !0 }),
        i = (t + l).split(`
`);
      t = i.pop() || "";
      for (const o of i) r.enqueue(o);
    },
    flush(n) {
      t && n.enqueue(t);
    },
  });
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Vo =
  typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : void 0;
function Ha(e) {
  const { hydrated: t, values: n } = this;
  if (typeof e == "number") return Ic.call(this, e);
  if (!Array.isArray(e) || !e.length) throw new SyntaxError();
  const r = n.length;
  for (const l of e) n.push(l);
  return (t.length = n.length), Ic.call(this, r);
}
function Ic(e) {
  const { hydrated: t, values: n, deferred: r, plugins: l } = this;
  let i;
  const o = [
    [
      e,
      (u) => {
        i = u;
      },
    ],
  ];
  let a = [];
  for (; o.length > 0; ) {
    const [u, s] = o.pop();
    switch (u) {
      case sg:
        s(void 0);
        continue;
      case ag:
        s(null);
        continue;
      case lg:
        s(NaN);
        continue;
      case ug:
        s(1 / 0);
        continue;
      case ig:
        s(-1 / 0);
        continue;
      case og:
        s(-0);
        continue;
    }
    if (t[u]) {
      s(t[u]);
      continue;
    }
    const d = n[u];
    if (!d || typeof d != "object") {
      (t[u] = d), s(d);
      continue;
    }
    if (Array.isArray(d))
      if (typeof d[0] == "string") {
        const [c, f, w] = d;
        switch (c) {
          case dg:
            s((t[u] = new Date(f)));
            continue;
          case yg:
            s((t[u] = new URL(f)));
            continue;
          case cg:
            s((t[u] = BigInt(f)));
            continue;
          case pg:
            s((t[u] = new RegExp(f, w)));
            continue;
          case vg:
            s((t[u] = Symbol.for(f)));
            continue;
          case mg:
            const m = new Set();
            t[u] = m;
            for (let E = 1; E < d.length; E++)
              o.push([
                d[E],
                (R) => {
                  m.add(R);
                },
              ]);
            s(m);
            continue;
          case fg:
            const x = new Map();
            t[u] = x;
            for (let E = 1; E < d.length; E += 2) {
              const R = [];
              o.push([
                d[E + 1],
                (y) => {
                  R[1] = y;
                },
              ]),
                o.push([
                  d[E],
                  (y) => {
                    R[0] = y;
                  },
                ]),
                a.push(() => {
                  x.set(R[0], R[1]);
                });
            }
            s(x);
            continue;
          case hg:
            const L = Object.create(null);
            t[u] = L;
            for (const E of Object.keys(f).reverse()) {
              const R = [];
              o.push([
                f[E],
                (y) => {
                  R[1] = y;
                },
              ]),
                o.push([
                  Number(E.slice(1)),
                  (y) => {
                    R[0] = y;
                  },
                ]),
                a.push(() => {
                  L[R[0]] = R[1];
                });
            }
            s(L);
            continue;
          case dh:
            if (t[f]) s((t[u] = t[f]));
            else {
              const E = new fh();
              (r[f] = E), s((t[u] = E.promise));
            }
            continue;
          case ch:
            const [, p, h] = d;
            let v = h && Vo && Vo[h] ? new Vo[h](p) : new Error(p);
            (t[u] = v), s(v);
            continue;
          case gg:
            s((t[u] = t[f]));
            continue;
          default:
            if (Array.isArray(l)) {
              const E = [],
                R = d.slice(1);
              for (let y = 0; y < R.length; y++) {
                const _ = R[y];
                o.push([
                  _,
                  (P) => {
                    E[y] = P;
                  },
                ]);
              }
              a.push(() => {
                for (const y of l) {
                  const _ = y(d[0], ...E);
                  if (_) {
                    s((t[u] = _.value));
                    return;
                  }
                }
                throw new SyntaxError();
              });
              continue;
            }
            throw new SyntaxError();
        }
      } else {
        const c = [];
        t[u] = c;
        for (let f = 0; f < d.length; f++) {
          const w = d[f];
          w !== rg &&
            o.push([
              w,
              (m) => {
                c[f] = m;
              },
            ]);
        }
        s(c);
        continue;
      }
    else {
      const c = {};
      t[u] = c;
      for (const f of Object.keys(d).reverse()) {
        const w = [];
        o.push([
          d[f],
          (m) => {
            w[1] = m;
          },
        ]),
          o.push([
            Number(f.slice(1)),
            (m) => {
              w[0] = m;
            },
          ]),
          a.push(() => {
            c[w[0]] = w[1];
          });
      }
      s(c);
      continue;
    }
  }
  for (; a.length > 0; ) a.pop()();
  return i;
}
async function Sg(e, t) {
  const { plugins: n } = t ?? {},
    r = new fh(),
    l = e.pipeThrough(wg()).getReader(),
    i = { values: [], hydrated: [], deferred: {}, plugins: n },
    o = await Eg.call(i, l);
  let a = r.promise;
  return (
    o.done
      ? r.resolve()
      : (a = xg
          .call(i, l)
          .then(r.resolve)
          .catch((u) => {
            for (const s of Object.values(i.deferred)) s.reject(u);
            r.reject(u);
          })),
    { done: a.then(() => l.closed), value: o.value }
  );
}
async function Eg(e) {
  const t = await e.read();
  if (!t.value) throw new SyntaxError();
  let n;
  try {
    n = JSON.parse(t.value);
  } catch {
    throw new SyntaxError();
  }
  return { done: t.done, value: Ha.call(this, n) };
}
async function xg(e) {
  let t = await e.read();
  for (; !t.done; ) {
    if (!t.value) continue;
    const n = t.value;
    switch (n[0]) {
      case dh: {
        const r = n.indexOf(":"),
          l = Number(n.slice(1, r)),
          i = this.deferred[l];
        if (!i) throw new Error(`Deferred ID ${l} not found in stream`);
        const o = n.slice(r + 1);
        let a;
        try {
          a = JSON.parse(o);
        } catch {
          throw new SyntaxError();
        }
        const u = Ha.call(this, a);
        i.resolve(u);
        break;
      }
      case ch: {
        const r = n.indexOf(":"),
          l = Number(n.slice(1, r)),
          i = this.deferred[l];
        if (!i) throw new Error(`Deferred ID ${l} not found in stream`);
        const o = n.slice(r + 1);
        let a;
        try {
          a = JSON.parse(o);
        } catch {
          throw new SyntaxError();
        }
        const u = Ha.call(this, a);
        i.reject(u);
        break;
      }
      default:
        throw new SyntaxError();
    }
    t = await e.read();
  }
}
/**
 * @remix-run/server-runtime v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const hh = Symbol("SingleFetchRedirect");
/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function ke() {
  return (
    (ke = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ke.apply(this, arguments)
  );
}
/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Bt(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ async function ph(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let n = await import(e.module);
    return (t[e.id] = n), n;
  } catch (n) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`
      ),
      console.error(n),
      window.__remixContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function kg(e, t, n) {
  let r = e
      .map((i) => {
        var o;
        let a = t[i.route.id],
          u = n.routes[i.route.id];
        return [
          u.css ? u.css.map((s) => ({ rel: "stylesheet", href: s })) : [],
          (a == null || (o = a.links) === null || o === void 0
            ? void 0
            : o.call(a)) || [],
        ];
      })
      .flat(2),
    l = Tg(e, n);
  return vh(r, l);
}
async function mh(e, t) {
  var n, r;
  if ((!e.css && !t.links) || !Dg()) return;
  let l = [
    ((n = e.css) === null || n === void 0
      ? void 0
      : n.map((a) => ({ rel: "stylesheet", href: a }))) ?? [],
    ((r = t.links) === null || r === void 0 ? void 0 : r.call(t)) ?? [],
  ].flat(1);
  if (l.length === 0) return;
  let i = [];
  for (let a of l)
    !Ku(a) &&
      a.rel === "stylesheet" &&
      i.push({ ...a, rel: "preload", as: "style" });
  let o = i.filter(
    (a) =>
      (!a.media || window.matchMedia(a.media).matches) &&
      !document.querySelector(`link[rel="stylesheet"][href="${a.href}"]`)
  );
  await Promise.all(o.map(Cg));
}
async function Cg(e) {
  return new Promise((t) => {
    let n = document.createElement("link");
    Object.assign(n, e);
    function r() {
      document.head.contains(n) && document.head.removeChild(n);
    }
    (n.onload = () => {
      r(), t();
    }),
      (n.onerror = () => {
        r(), t();
      }),
      document.head.appendChild(n);
  });
}
function Ku(e) {
  return e != null && typeof e.page == "string";
}
function Pg(e) {
  return e == null
    ? !1
    : e.href == null
    ? e.rel === "preload" &&
      typeof e.imageSrcSet == "string" &&
      typeof e.imageSizes == "string"
    : typeof e.rel == "string" && typeof e.href == "string";
}
async function Rg(e, t, n) {
  let r = await Promise.all(
    e.map(async (l) => {
      let i = await ph(t.routes[l.route.id], n);
      return i.links ? i.links() : [];
    })
  );
  return vh(
    r
      .flat(1)
      .filter(Pg)
      .filter((l) => l.rel === "stylesheet" || l.rel === "preload")
      .map((l) =>
        l.rel === "stylesheet"
          ? { ...l, rel: "prefetch", as: "style" }
          : { ...l, rel: "prefetch" }
      )
  );
}
function Uc(e, t, n, r, l, i) {
  let o = yh(e),
    a = (d, c) => (n[c] ? d.route.id !== n[c].route.id : !0),
    u = (d, c) => {
      var f;
      return (
        n[c].pathname !== d.pathname ||
        (((f = n[c].route.path) === null || f === void 0
          ? void 0
          : f.endsWith("*")) &&
          n[c].params["*"] !== d.params["*"])
      );
    };
  return i === "data" && l.search !== o.search
    ? t.filter((d, c) => {
        if (!r.routes[d.route.id].hasLoader) return !1;
        if (a(d, c) || u(d, c)) return !0;
        if (d.route.shouldRevalidate) {
          var w;
          let m = d.route.shouldRevalidate({
            currentUrl: new URL(l.pathname + l.search + l.hash, window.origin),
            currentParams:
              ((w = n[0]) === null || w === void 0 ? void 0 : w.params) || {},
            nextUrl: new URL(e, window.origin),
            nextParams: d.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof m == "boolean") return m;
        }
        return !0;
      })
    : t.filter((d, c) => {
        let f = r.routes[d.route.id];
        return (i === "assets" || f.hasLoader) && (a(d, c) || u(d, c));
      });
}
function Lg(e, t, n) {
  let r = yh(e);
  return Qu(
    t
      .filter(
        (l) =>
          n.routes[l.route.id].hasLoader &&
          !n.routes[l.route.id].hasClientLoader
      )
      .map((l) => {
        let { pathname: i, search: o } = r,
          a = new URLSearchParams(o);
        return a.set("_data", l.route.id), `${i}?${a}`;
      })
  );
}
function _g(e, t) {
  return Qu(
    e
      .map((n) => {
        let r = t.routes[n.route.id],
          l = [r.module];
        return r.imports && (l = l.concat(r.imports)), l;
      })
      .flat(1)
  );
}
function Tg(e, t) {
  return Qu(
    e
      .map((n) => {
        let r = t.routes[n.route.id],
          l = [r.module];
        return r.imports && (l = l.concat(r.imports)), l;
      })
      .flat(1)
  );
}
function Qu(e) {
  return [...new Set(e)];
}
function Ng(e) {
  let t = {},
    n = Object.keys(e).sort();
  for (let r of n) t[r] = e[r];
  return t;
}
function vh(e, t) {
  let n = new Set(),
    r = new Set(t);
  return e.reduce((l, i) => {
    if (t && !Ku(i) && i.as === "script" && i.href && r.has(i.href)) return l;
    let a = JSON.stringify(Ng(i));
    return n.has(a) || (n.add(a), l.push({ key: a, link: i })), l;
  }, []);
}
function yh(e) {
  let t = $t(e);
  return t.search === void 0 && (t.search = ""), t;
}
let Gl;
function Dg() {
  if (Gl !== void 0) return Gl;
  let e = document.createElement("link");
  return (Gl = e.relList.supports("preload")), (e = null), Gl;
}
/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const Og = {
    "&": "\\u0026",
    ">": "\\u003e",
    "<": "\\u003c",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
  },
  Mg = /[&><\u2028\u2029]/g;
function Zl(e) {
  return e.replace(Mg, (t) => Og[t]);
}
function Ac(e) {
  return { __html: e };
}
/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function zg(e) {
  return e.headers.get("X-Remix-Catch") != null;
}
function Fg(e) {
  return e.headers.get("X-Remix-Error") != null;
}
function jg(e) {
  return (
    Yu(e) &&
    e.status >= 400 &&
    e.headers.get("X-Remix-Error") == null &&
    e.headers.get("X-Remix-Catch") == null &&
    e.headers.get("X-Remix-Response") == null
  );
}
function Ig(e) {
  return e.headers.get("X-Remix-Redirect") != null;
}
function Ug(e) {
  var t;
  return !!(
    (t = e.headers.get("Content-Type")) !== null &&
    t !== void 0 &&
    t.match(/text\/remix-deferred/)
  );
}
function Yu(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function Ag(e) {
  let t = e;
  return (
    t &&
    typeof t == "object" &&
    typeof t.data == "object" &&
    typeof t.subscribe == "function" &&
    typeof t.cancel == "function" &&
    typeof t.resolveData == "function"
  );
}
async function gh(e, t, n = 0) {
  let r = new URL(e.url);
  r.searchParams.set("_data", t),
    n > 0 && (await new Promise((a) => setTimeout(a, 5 ** n * 10)));
  let l = await io(e),
    i = window.__remixRevalidation,
    o = await fetch(r.href, l).catch((a) => {
      if (
        typeof i == "number" &&
        i === window.__remixRevalidation &&
        (a == null ? void 0 : a.name) === "TypeError" &&
        n < 3
      )
        return gh(e, t, n + 1);
      throw a;
    });
  if (Fg(o)) {
    let a = await o.json(),
      u = new Error(a.message);
    return (u.stack = a.stack), u;
  }
  if (jg(o)) {
    let a = await o.text(),
      u = new Error(a);
    return (u.stack = void 0), u;
  }
  return o;
}
async function io(e) {
  let t = { signal: e.signal };
  if (e.method !== "GET") {
    t.method = e.method;
    let n = e.headers.get("Content-Type");
    n && /\bapplication\/json\b/.test(n)
      ? ((t.headers = { "Content-Type": n }),
        (t.body = JSON.stringify(await e.json())))
      : n && /\btext\/plain\b/.test(n)
      ? ((t.headers = { "Content-Type": n }), (t.body = await e.text()))
      : n && /\bapplication\/x-www-form-urlencoded\b/.test(n)
      ? (t.body = new URLSearchParams(await e.text()))
      : (t.body = await e.formData());
  }
  return t;
}
const Bg = "__deferred_promise:";
async function Hg(e) {
  if (!e)
    throw new Error("parseDeferredReadableStream requires stream argument");
  let t,
    n = {};
  try {
    let r = $g(e),
      i = (await r.next()).value;
    if (!i) throw new Error("no critical data");
    let o = JSON.parse(i);
    if (typeof o == "object" && o !== null)
      for (let [a, u] of Object.entries(o))
        typeof u != "string" ||
          !u.startsWith(Bg) ||
          ((t = t || {}),
          (t[a] = new Promise((s, d) => {
            n[a] = {
              resolve: (c) => {
                s(c), delete n[a];
              },
              reject: (c) => {
                d(c), delete n[a];
              },
            };
          })));
    return (
      (async () => {
        try {
          for await (let a of r) {
            let [u, ...s] = a.split(":"),
              d = s.join(":"),
              c = JSON.parse(d);
            if (u === "data")
              for (let [f, w] of Object.entries(c)) n[f] && n[f].resolve(w);
            else if (u === "error")
              for (let [f, w] of Object.entries(c)) {
                let m = new Error(w.message);
                (m.stack = w.stack), n[f] && n[f].reject(m);
              }
          }
          for (let [a, u] of Object.entries(n))
            u.reject(new Ai(`Deferred ${a} will never be resolved`));
        } catch (a) {
          for (let u of Object.values(n)) u.reject(a);
        }
      })(),
      new Lv({ ...o, ...t })
    );
  } catch (r) {
    for (let l of Object.values(n)) l.reject(r);
    throw r;
  }
}
async function* $g(e) {
  let t = e.getReader(),
    n = [],
    r = [],
    l = !1,
    i = new TextEncoder(),
    o = new TextDecoder(),
    a = async () => {
      if (r.length > 0) return r.shift();
      for (; !l && r.length === 0; ) {
        let s = await t.read();
        if (s.done) {
          l = !0;
          break;
        }
        n.push(s.value);
        try {
          let c = o.decode(Bc(...n)).split(`

`);
          if (
            (c.length >= 2 &&
              (r.push(...c.slice(0, -1)),
              (n = [
                i.encode(
                  c.slice(-1).join(`

`)
                ),
              ])),
            r.length > 0)
          )
            break;
        } catch {
          continue;
        }
      }
      return (
        r.length > 0 ||
          (n.length > 0 &&
            ((r = o
              .decode(Bc(...n))
              .split(
                `

`
              )
              .filter((d) => d)),
            (n = []))),
        r.shift()
      );
    },
    u = await a();
  for (; u; ) yield u, (u = await a());
}
function Bc(...e) {
  let t = new Uint8Array(e.reduce((r, l) => r + l.length, 0)),
    n = 0;
  for (let r of e) t.set(r, n), (n += r.length);
  return t;
}
/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function C0(e, t, n) {
  return async ({ request: r, matches: l, fetcherKey: i }) =>
    r.method !== "GET" ? Vg(r, l) : i ? Kg(r, l) : Wg(e, t, n(), r, l);
}
async function Vg(e, t) {
  let n = t.find((i) => i.shouldLoad);
  Bt(n, "No action match found");
  let r,
    l = await n.resolve(
      async (i) =>
        await i(async () => {
          let a = oo(e.url),
            u = await io(e),
            { data: s, status: d } = await Xu(a, u);
          return (r = d), $a(s, n.route.id);
        })
    );
  return Yu(l.result) || wr(l.result)
    ? { [n.route.id]: l }
    : { [n.route.id]: { type: l.type, result: Rv(l.result, r) } };
}
async function Wg(e, t, n, r, l) {
  let i = new Set(),
    o = !1,
    a = l.map(() => Hc()),
    u = Promise.all(a.map((m) => m.promise)),
    s = Hc(),
    d = Sh(oo(r.url)),
    c = await io(r),
    f = {},
    w = Promise.all(
      l.map(async (m, x) =>
        m.resolve(async (L) => {
          if ((a[x].resolve(), !m.shouldLoad)) {
            var p;
            if (!n.state.initialized) return;
            if (
              m.route.id in n.state.loaderData &&
              e.routes[m.route.id].hasLoader &&
              (p = t[m.route.id]) !== null &&
              p !== void 0 &&
              p.shouldRevalidate
            ) {
              o = !0;
              return;
            }
          }
          if (e.routes[m.route.id].hasClientLoader) {
            e.routes[m.route.id].hasLoader && (o = !0);
            try {
              let h = await wh(L, d, c, m.route.id);
              f[m.route.id] = { type: "data", result: h };
            } catch (h) {
              f[m.route.id] = { type: "error", result: h };
            }
            return;
          }
          e.routes[m.route.id].hasLoader && i.add(m.route.id);
          try {
            let h = await L(async () => {
              let v = await s.promise;
              return Eh(v, m.route.id);
            });
            f[m.route.id] = { type: "data", result: h };
          } catch (h) {
            f[m.route.id] = { type: "error", result: h };
          }
        })
      )
    );
  if (
    (await u,
    (!n.state.initialized || i.size === 0) && !window.__remixHdrActive)
  )
    s.resolve({});
  else
    try {
      o &&
        i.size > 0 &&
        d.searchParams.set(
          "_routes",
          l
            .filter((x) => i.has(x.route.id))
            .map((x) => x.route.id)
            .join(",")
        );
      let m = await Xu(d, c);
      s.resolve(m.data);
    } catch (m) {
      s.reject(m);
    }
  return await w, f;
}
async function Kg(e, t) {
  let n = t.find((l) => l.shouldLoad);
  Bt(n, "No fetcher match found");
  let r = await n.resolve(async (l) => {
    let i = Sh(oo(e.url)),
      o = await io(e);
    return wh(l, i, o, n.route.id);
  });
  return { [n.route.id]: r };
}
function wh(e, t, n, r) {
  return e(async () => {
    let l = new URL(t);
    l.searchParams.set("_routes", r);
    let { data: i } = await Xu(l, n);
    return Eh(i, r);
  });
}
function Sh(e) {
  let t = e.searchParams.getAll("index");
  e.searchParams.delete("index");
  let n = [];
  for (let r of t) r && n.push(r);
  for (let r of n) e.searchParams.append("index", r);
  return e;
}
function oo(e) {
  let t = typeof e == "string" ? new URL(e, window.location.origin) : e;
  return (
    t.pathname === "/"
      ? (t.pathname = "_root.data")
      : (t.pathname = `${t.pathname.replace(/\/$/, "")}.data`),
    t
  );
}
async function Xu(e, t) {
  let n = await fetch(e, t);
  Bt(n.body, "No response body to decode");
  try {
    let r = await Qg(n.body, window);
    return { status: n.status, data: r.value };
  } catch (r) {
    throw (
      (console.error(r),
      new Error(
        `Unable to decode turbo-stream response from URL: ${e.toString()}`
      ))
    );
  }
}
function Qg(e, t) {
  return Sg(e, {
    plugins: [
      (n, ...r) => {
        if (n === "SanitizedError") {
          let [l, i, o] = r,
            a = Error;
          l && l in t && typeof t[l] == "function" && (a = t[l]);
          let u = new a(i);
          return (u.stack = o), { value: u };
        }
        if (n === "ErrorResponse") {
          let [l, i, o] = r;
          return { value: new zn(i, o, l) };
        }
        if (n === "SingleFetchRedirect") return { value: { [hh]: r[0] } };
      },
      (n, r) => {
        if (n === "SingleFetchFallback") return { value: void 0 };
        if (n === "SingleFetchClassInstance") return { value: r };
      },
    ],
  });
}
function Eh(e, t) {
  let n = e[hh];
  return n ? $a(n, t) : e[t] !== void 0 ? $a(e[t], t) : null;
}
function $a(e, t) {
  if ("error" in e) throw e.error;
  if ("redirect" in e) {
    let n = {};
    return (
      e.revalidate && (n["X-Remix-Revalidate"] = "yes"),
      e.reload && (n["X-Remix-Reload-Document"] = "yes"),
      e.replace && (n["X-Remix-Replace"] = "yes"),
      Zf(e.redirect, { status: e.status, headers: n })
    );
  } else {
    if ("data" in e) return e.data;
    throw new Error(`No response found for routeId "${t}"`);
  }
}
function Hc() {
  let e,
    t,
    n = new Promise((r, l) => {
      (e = async (i) => {
        r(i);
        try {
          await n;
        } catch {}
      }),
        (t = async (i) => {
          l(i);
          try {
            await n;
          } catch {}
        });
    });
  return { promise: n, resolve: e, reject: t };
}
/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ class P0 extends g.Component {
  constructor(t) {
    super(t), (this.state = { error: t.error || null, location: t.location });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location
      ? { error: t.error || null, location: t.location }
      : { error: t.error || n.error, location: n.location };
  }
  render() {
    return this.state.error
      ? g.createElement(xh, { error: this.state.error, isOutsideRemixApp: !0 })
      : this.props.children;
  }
}
function xh({ error: e, isOutsideRemixApp: t }) {
  console.error(e);
  let n = g.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
        console.log(
          "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
        );
      `,
    },
  });
  if (wr(e))
    return g.createElement(
      Va,
      { title: "Unhandled Thrown Response!" },
      g.createElement(
        "h1",
        { style: { fontSize: "24px" } },
        e.status,
        " ",
        e.statusText
      ),
      n
    );
  let r;
  if (e instanceof Error) r = e;
  else {
    let l =
      e == null
        ? "Unknown Error"
        : typeof e == "object" && "toString" in e
        ? e.toString()
        : JSON.stringify(e);
    r = new Error(l);
  }
  return g.createElement(
    Va,
    { title: "Application Error!", isOutsideRemixApp: t },
    g.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"),
    g.createElement(
      "pre",
      {
        style: {
          padding: "2rem",
          background: "hsla(10, 50%, 50%, 0.1)",
          color: "red",
          overflow: "auto",
        },
      },
      r.stack
    ),
    n
  );
}
function Va({ title: e, renderScripts: t, isOutsideRemixApp: n, children: r }) {
  var l;
  let { routeModules: i } = Er();
  return (l = i.root) !== null && l !== void 0 && l.Layout && !n
    ? r
    : g.createElement(
        "html",
        { lang: "en" },
        g.createElement(
          "head",
          null,
          g.createElement("meta", { charSet: "utf-8" }),
          g.createElement("meta", {
            name: "viewport",
            content: "width=device-width,initial-scale=1,viewport-fit=cover",
          }),
          g.createElement("title", null, e)
        ),
        g.createElement(
          "body",
          null,
          g.createElement(
            "main",
            { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } },
            r,
            t ? g.createElement(f0, null) : null
          )
        )
      );
}
/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Yg() {
  return g.createElement(
    Va,
    { title: "Loading...", renderScripts: !0 },
    g.createElement("script", {
      dangerouslySetInnerHTML: {
        __html: `
              console.log(
                "💿 Hey developer 👋. You can provide a way better UX than this " +
                "when your app is loading JS modules and/or running \`clientLoader\` " +
                "functions. Check out https://remix.run/route/hydrate-fallback " +
                "for more information."
              );
            `,
      },
    })
  );
}
/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function kh(e) {
  let t = {};
  return (
    Object.values(e).forEach((n) => {
      let r = n.parentId || "";
      t[r] || (t[r] = []), t[r].push(n);
    }),
    t
  );
}
function Xg(e, t, n) {
  let r = Ch(t),
    l =
      t.HydrateFallback && (!n || e.id === "root")
        ? t.HydrateFallback
        : e.id === "root"
        ? Yg
        : void 0,
    i = t.ErrorBoundary
      ? t.ErrorBoundary
      : e.id === "root"
      ? () => g.createElement(xh, { error: ah() })
      : void 0;
  return e.id === "root" && t.Layout
    ? {
        ...(r
          ? {
              element: g.createElement(
                t.Layout,
                null,
                g.createElement(r, null)
              ),
            }
          : { Component: r }),
        ...(i
          ? {
              errorElement: g.createElement(
                t.Layout,
                null,
                g.createElement(i, null)
              ),
            }
          : { ErrorBoundary: i }),
        ...(l
          ? {
              hydrateFallbackElement: g.createElement(
                t.Layout,
                null,
                g.createElement(l, null)
              ),
            }
          : { HydrateFallback: l }),
      }
    : { Component: r, ErrorBoundary: i, HydrateFallback: l };
}
function R0(e, t, n, r, l, i) {
  return Ju(t, n, r, l, i, "", kh(t), e);
}
function ql(e, t, n) {
  if (n) {
    let o = `You cannot call ${
      e === "action" ? "serverAction()" : "serverLoader()"
    } in SPA Mode (routeId: "${t.id}")`;
    throw (console.error(o), new zn(400, "Bad Request", new Error(o), !0));
  }
  let l = `You are trying to call ${
    e === "action" ? "serverAction()" : "serverLoader()"
  } on a route that does not have a server ${e} (routeId: "${t.id}")`;
  if ((e === "loader" && !t.hasLoader) || (e === "action" && !t.hasAction))
    throw (console.error(l), new zn(400, "Bad Request", new Error(l), !0));
}
function Wo(e, t) {
  let n = e === "clientAction" ? "a" : "an",
    r = `Route "${t}" does not have ${n} ${e}, but you are trying to submit to it. To fix this, please add ${n} \`${e}\` function to the route`;
  throw (console.error(r), new zn(405, "Method Not Allowed", new Error(r), !0));
}
function Ju(e, t, n, r, l, i = "", o = kh(e), a) {
  return (o[i] || []).map((u) => {
    let s = t[u.id];
    async function d(v, E, R) {
      if (typeof R == "function") return await R();
      let y = await Gg(v, u);
      return E ? Zg(y) : y;
    }
    function c(v, E, R) {
      return u.hasLoader ? d(v, E, R) : Promise.resolve(null);
    }
    function f(v, E, R) {
      if (!u.hasAction) throw Wo("action", u.id);
      return d(v, E, R);
    }
    async function w(v) {
      let E = t[u.id],
        R = E ? mh(u, E) : Promise.resolve();
      try {
        return v();
      } finally {
        await R;
      }
    }
    let m = { id: u.id, index: u.index, path: u.path };
    if (s) {
      var x, L, p;
      Object.assign(m, {
        ...m,
        ...Xg(u, s, l),
        handle: s.handle,
        shouldRevalidate: a
          ? $c(u.id, s.shouldRevalidate, a)
          : s.shouldRevalidate,
      });
      let v =
          n == null || (x = n.loaderData) === null || x === void 0
            ? void 0
            : x[u.id],
        E =
          n == null || (L = n.errors) === null || L === void 0
            ? void 0
            : L[u.id],
        R =
          a == null &&
          (((p = s.clientLoader) === null || p === void 0
            ? void 0
            : p.hydrate) === !0 ||
            !u.hasLoader);
      (m.loader = async ({ request: y, params: _ }, P) => {
        try {
          return await w(
            async () => (
              Bt(s, "No `routeModule` available for critical-route loader"),
              s.clientLoader
                ? s.clientLoader({
                    request: y,
                    params: _,
                    async serverLoader() {
                      if ((ql("loader", u, l), R)) {
                        if (v !== void 0) return v;
                        if (E !== void 0) throw E;
                        return null;
                      }
                      return c(y, !0, P);
                    },
                  })
                : l
                ? null
                : c(y, !1, P)
            )
          );
        } finally {
          R = !1;
        }
      }),
        (m.loader.hydrate = bg(u, s, l)),
        (m.action = ({ request: y, params: _ }, P) =>
          w(async () => {
            if (
              (Bt(s, "No `routeModule` available for critical-route action"),
              !s.clientAction)
            ) {
              if (l) throw Wo("clientAction", u.id);
              return f(y, !1, P);
            }
            return s.clientAction({
              request: y,
              params: _,
              async serverAction() {
                return ql("action", u, l), f(y, !0, P);
              },
            });
          }));
    } else
      u.hasClientLoader ||
        (m.loader = ({ request: v }, E) =>
          w(() => (l ? Promise.resolve(null) : c(v, !1, E)))),
        u.hasClientAction ||
          (m.action = ({ request: v }, E) =>
            w(() => {
              if (l) throw Wo("clientAction", u.id);
              return f(v, !1, E);
            })),
        (m.lazy = async () => {
          let v = await Jg(u, t),
            E = { ...v };
          if (v.clientLoader) {
            let R = v.clientLoader;
            E.loader = (y, _) =>
              R({
                ...y,
                async serverLoader() {
                  return ql("loader", u, l), c(y.request, !0, _);
                },
              });
          }
          if (v.clientAction) {
            let R = v.clientAction;
            E.action = (y, _) =>
              R({
                ...y,
                async serverAction() {
                  return ql("action", u, l), f(y.request, !0, _);
                },
              });
          }
          return (
            a && (E.shouldRevalidate = $c(u.id, v.shouldRevalidate, a)),
            {
              ...(E.loader ? { loader: E.loader } : {}),
              ...(E.action ? { action: E.action } : {}),
              hasErrorBoundary: E.hasErrorBoundary,
              shouldRevalidate: E.shouldRevalidate,
              handle: E.handle,
              Component: E.Component,
              ErrorBoundary: E.ErrorBoundary,
            }
          );
        });
    let h = Ju(e, t, n, r, l, u.id, o, a);
    return h.length > 0 && (m.children = h), m;
  });
}
function $c(e, t, n) {
  let r = !1;
  return (l) =>
    r ? (t ? t(l) : l.defaultShouldRevalidate) : ((r = !0), n.has(e));
}
async function Jg(e, t) {
  let n = await ph(e, t);
  return (
    await mh(e, n),
    {
      Component: Ch(n),
      ErrorBoundary: n.ErrorBoundary,
      clientAction: n.clientAction,
      clientLoader: n.clientLoader,
      handle: n.handle,
      links: n.links,
      meta: n.meta,
      shouldRevalidate: n.shouldRevalidate,
    }
  );
}
async function Gg(e, t) {
  let n = await gh(e, t.id);
  if (n instanceof Error) throw n;
  if (Ig(n)) throw qg(n);
  if (zg(n)) throw n;
  return Ug(n) && n.body ? await Hg(n.body) : n;
}
function Zg(e) {
  if (Ag(e)) return e.data;
  if (Yu(e)) {
    let t = e.headers.get("Content-Type");
    return t && /\bapplication\/json\b/.test(t) ? e.json() : e.text();
  }
  return e;
}
function qg(e) {
  let t = parseInt(e.headers.get("X-Remix-Status"), 10) || 302,
    n = e.headers.get("X-Remix-Redirect"),
    r = {},
    l = e.headers.get("X-Remix-Revalidate");
  l && (r["X-Remix-Revalidate"] = l);
  let i = e.headers.get("X-Remix-Reload-Document");
  i && (r["X-Remix-Reload-Document"] = i);
  let o = e.headers.get("X-Remix-Replace");
  return o && (r["X-Remix-Replace"] = o), Zf(n, { status: t, headers: r });
}
function Ch(e) {
  if (e.default == null) return;
  if (!(typeof e.default == "object" && Object.keys(e.default).length === 0))
    return e.default;
}
function bg(e, t, n) {
  return (
    (n && e.id !== "root") ||
    (t.clientLoader != null &&
      (t.clientLoader.hydrate === !0 || e.hasLoader !== !0))
  );
}
/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const di = new Set(),
  e0 = 1e3,
  $i = new Set(),
  t0 = 7680;
function Gu(e, t) {
  return e.v3_lazyRouteDiscovery === !0 && !t;
}
function n0(e, t) {
  let n = new Set(t.state.matches.map((o) => o.route.id)),
    r = t.state.location.pathname.split("/").filter(Boolean),
    l = ["/"];
  for (r.pop(); r.length > 0; ) l.push(`/${r.join("/")}`), r.pop();
  l.forEach((o) => {
    let a = Ot(t.routes, o, t.basename);
    a && a.forEach((u) => n.add(u.route.id));
  });
  let i = [...n].reduce((o, a) => Object.assign(o, { [a]: e.routes[a] }), {});
  return { ...e, routes: i };
}
function L0(e, t, n, r, l) {
  if (Gu(n, r))
    return async ({ path: i, patch: o }) => {
      $i.has(i) || (await Ph([i], e, t, n, r, l, o));
    };
}
function _0(e, t, n, r, l) {
  g.useEffect(() => {
    var i;
    if (
      !Gu(r, l) ||
      ((i = navigator.connection) === null || i === void 0
        ? void 0
        : i.saveData) === !0
    )
      return;
    function o(c) {
      let f =
        c.tagName === "FORM"
          ? c.getAttribute("action")
          : c.getAttribute("href");
      if (!f) return;
      let w = new URL(f, window.location.origin);
      $i.has(w.pathname) || di.add(w.pathname);
    }
    async function a() {
      let c = Array.from(di.keys()).filter((f) =>
        $i.has(f) ? (di.delete(f), !1) : !0
      );
      if (c.length !== 0)
        try {
          await Ph(c, t, n, r, l, e.basename, e.patchRoutes);
        } catch (f) {
          console.error("Failed to fetch manifest patches", f);
        }
    }
    document.body
      .querySelectorAll("a[data-discover], form[data-discover]")
      .forEach((c) => o(c)),
      a();
    let u = l0(a, 100);
    function s(c) {
      return c.nodeType === Node.ELEMENT_NODE;
    }
    let d = new MutationObserver((c) => {
      let f = new Set();
      c.forEach((w) => {
        [w.target, ...w.addedNodes].forEach((m) => {
          s(m) &&
            (((m.tagName === "A" && m.getAttribute("data-discover")) ||
              (m.tagName === "FORM" && m.getAttribute("data-discover"))) &&
              f.add(m),
            m.tagName !== "A" &&
              m
                .querySelectorAll("a[data-discover], form[data-discover]")
                .forEach((x) => f.add(x)));
        });
      }),
        f.forEach((w) => o(w)),
        u();
    });
    return (
      d.observe(document.documentElement, {
        subtree: !0,
        childList: !0,
        attributes: !0,
        attributeFilter: ["data-discover", "href", "action"],
      }),
      () => d.disconnect()
    );
  }, [r, l, t, n, e]);
}
async function Ph(e, t, n, r, l, i, o) {
  let a = `${i ?? "/"}/__manifest`.replace(/\/+/g, "/"),
    u = new URL(a, window.location.origin);
  if (
    (e.sort().forEach((m) => u.searchParams.append("p", m)),
    u.searchParams.set("version", t.version),
    u.toString().length > t0)
  ) {
    di.clear();
    return;
  }
  let s = await fetch(u);
  if (s.ok) {
    if (s.status >= 400) throw new Error(await s.text());
  } else throw new Error(`${s.status} ${s.statusText}`);
  let d = await s.json(),
    c = new Set(Object.keys(t.routes)),
    f = Object.values(d).reduce(
      (m, x) => (c.has(x.id) ? m : Object.assign(m, { [x.id]: x })),
      {}
    );
  Object.assign(t.routes, f), e.forEach((m) => r0(m, $i));
  let w = new Set();
  Object.values(f).forEach((m) => {
    (!m.parentId || !f[m.parentId]) && w.add(m.parentId);
  }),
    w.forEach((m) => o(m || null, Ju(f, n, null, r, l, m)));
}
function r0(e, t) {
  if (t.size >= e0) {
    let n = t.values().next().value;
    t.delete(n);
  }
  t.add(e);
}
function l0(e, t) {
  let n;
  return (...r) => {
    window.clearTimeout(n), (n = window.setTimeout(() => e(...r), t));
  };
}
function Rh() {
  let e = g.useContext(Sr);
  return (
    Bt(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    e
  );
}
function ao() {
  let e = g.useContext(El);
  return (
    Bt(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    e
  );
}
const Lh = g.createContext(void 0);
Lh.displayName = "Remix";
function Er() {
  let e = g.useContext(Lh);
  return Bt(e, "You must render this element inside a <Remix> element"), e;
}
function _h(e, t) {
  let [n, r] = g.useState(!1),
    [l, i] = g.useState(!1),
    {
      onFocus: o,
      onBlur: a,
      onMouseEnter: u,
      onMouseLeave: s,
      onTouchStart: d,
    } = t,
    c = g.useRef(null);
  g.useEffect(() => {
    if ((e === "render" && i(!0), e === "viewport")) {
      let m = (L) => {
          L.forEach((p) => {
            i(p.isIntersecting);
          });
        },
        x = new IntersectionObserver(m, { threshold: 0.5 });
      return (
        c.current && x.observe(c.current),
        () => {
          x.disconnect();
        }
      );
    }
  }, [e]);
  let f = () => {
      e === "intent" && r(!0);
    },
    w = () => {
      e === "intent" && (r(!1), i(!1));
    };
  return (
    g.useEffect(() => {
      if (n) {
        let m = setTimeout(() => {
          i(!0);
        }, 100);
        return () => {
          clearTimeout(m);
        };
      }
    }, [n]),
    [
      l,
      c,
      {
        onFocus: Ir(o, f),
        onBlur: Ir(a, w),
        onMouseEnter: Ir(u, f),
        onMouseLeave: Ir(s, w),
        onTouchStart: Ir(d, f),
      },
    ]
  );
}
const Zu = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function qu(e, t, n) {
  return e === "render" && !t && !n ? "true" : void 0;
}
let i0 = g.forwardRef(
  ({ to: e, prefetch: t = "none", discover: n = "render", ...r }, l) => {
    let i = typeof e == "string" && Zu.test(e),
      o = Bu(e),
      [a, u, s] = _h(t, r);
    return g.createElement(
      g.Fragment,
      null,
      g.createElement(
        Qy,
        ke({}, r, s, {
          ref: Th(l, u),
          to: e,
          "data-discover": qu(n, i, r.reloadDocument),
        })
      ),
      a && !i ? g.createElement(es, { page: o }) : null
    );
  }
);
i0.displayName = "NavLink";
let o0 = g.forwardRef(
  ({ to: e, prefetch: t = "none", discover: n = "render", ...r }, l) => {
    let i = typeof e == "string" && Zu.test(e),
      o = Bu(e),
      [a, u, s] = _h(t, r);
    return g.createElement(
      g.Fragment,
      null,
      g.createElement(
        sh,
        ke({}, r, s, {
          ref: Th(l, u),
          to: e,
          "data-discover": qu(n, i, r.reloadDocument),
        })
      ),
      a && !i ? g.createElement(es, { page: o }) : null
    );
  }
);
o0.displayName = "Link";
let a0 = g.forwardRef(({ discover: e = "render", ...t }, n) => {
  let r = typeof t.action == "string" && Zu.test(t.action);
  return g.createElement(
    Yy,
    ke({}, t, { ref: n, "data-discover": qu(e, r, t.reloadDocument) })
  );
});
a0.displayName = "Form";
function Ir(e, t) {
  return (n) => {
    e && e(n), n.defaultPrevented || t(n);
  };
}
function bu(e, t, n) {
  if (n && !fi) return [e[0]];
  if (t) {
    let r = e.findIndex((l) => t[l.route.id] !== void 0);
    return e.slice(0, r + 1);
  }
  return e;
}
function T0() {
  let { isSpaMode: e, manifest: t, routeModules: n, criticalCss: r } = Er(),
    { errors: l, matches: i } = ao(),
    o = bu(i, l, e),
    a = g.useMemo(() => kg(o, n, t), [o, n, t]);
  return g.createElement(
    g.Fragment,
    null,
    r
      ? g.createElement("style", { dangerouslySetInnerHTML: { __html: r } })
      : null,
    a.map(({ key: u, link: s }) =>
      Ku(s)
        ? g.createElement(es, ke({ key: u }, s))
        : g.createElement("link", ke({ key: u }, s))
    )
  );
}
function es({ page: e, ...t }) {
  let { router: n } = Rh(),
    r = g.useMemo(() => Ot(n.routes, e, n.basename), [n.routes, e, n.basename]);
  return r
    ? g.createElement(s0, ke({ page: e, matches: r }, t))
    : (console.warn(`Tried to prefetch ${e} but no routes matched.`), null);
}
function u0(e) {
  let { manifest: t, routeModules: n } = Er(),
    [r, l] = g.useState([]);
  return (
    g.useEffect(() => {
      let i = !1;
      return (
        Rg(e, t, n).then((o) => {
          i || l(o);
        }),
        () => {
          i = !0;
        }
      );
    }, [e, t, n]),
    r
  );
}
function s0({ page: e, matches: t, ...n }) {
  let r = Wt(),
    { future: l, manifest: i, routeModules: o } = Er(),
    { loaderData: a, matches: u } = ao(),
    s = g.useMemo(() => Uc(e, t, u, i, r, "data"), [e, t, u, i, r]),
    d = g.useMemo(() => {
      if (!l.v3_singleFetch) return Lg(e, s, i);
      if (e === r.pathname + r.search + r.hash) return [];
      let m = new Set(),
        x = !1;
      if (
        (t.forEach((p) => {
          var h;
          i.routes[p.route.id].hasLoader &&
            ((!s.some((v) => v.route.id === p.route.id) &&
              p.route.id in a &&
              (h = o[p.route.id]) !== null &&
              h !== void 0 &&
              h.shouldRevalidate) ||
            i.routes[p.route.id].hasClientLoader
              ? (x = !0)
              : m.add(p.route.id));
        }),
        m.size === 0)
      )
        return [];
      let L = oo(e);
      return (
        x &&
          m.size > 0 &&
          L.searchParams.set(
            "_routes",
            t
              .filter((p) => m.has(p.route.id))
              .map((p) => p.route.id)
              .join(",")
          ),
        [L.pathname + L.search]
      );
    }, [l.v3_singleFetch, a, r, i, s, t, e, o]),
    c = g.useMemo(() => Uc(e, t, u, i, r, "assets"), [e, t, u, i, r]),
    f = g.useMemo(() => _g(c, i), [c, i]),
    w = u0(c);
  return g.createElement(
    g.Fragment,
    null,
    d.map((m) =>
      g.createElement(
        "link",
        ke({ key: m, rel: "prefetch", as: "fetch", href: m }, n)
      )
    ),
    f.map((m) =>
      g.createElement("link", ke({ key: m, rel: "modulepreload", href: m }, n))
    ),
    w.map(({ key: m, link: x }) => g.createElement("link", ke({ key: m }, x)))
  );
}
function N0() {
  let { isSpaMode: e, routeModules: t } = Er(),
    { errors: n, matches: r, loaderData: l } = ao(),
    i = Wt(),
    o = bu(r, n, e),
    a = null;
  n && (a = n[o[o.length - 1].route.id]);
  let u = [],
    s = null,
    d = [];
  for (let c = 0; c < o.length; c++) {
    let f = o[c],
      w = f.route.id,
      m = l[w],
      x = f.params,
      L = t[w],
      p = [],
      h = {
        id: w,
        data: m,
        meta: [],
        params: f.params,
        pathname: f.pathname,
        handle: f.route.handle,
        error: a,
      };
    if (
      ((d[c] = h),
      L != null && L.meta
        ? (p =
            typeof L.meta == "function"
              ? L.meta({
                  data: m,
                  params: x,
                  location: i,
                  matches: d,
                  error: a,
                })
              : Array.isArray(L.meta)
              ? [...L.meta]
              : L.meta)
        : s && (p = [...s]),
      (p = p || []),
      !Array.isArray(p))
    )
      throw new Error(
        "The route at " +
          f.route.path +
          ` returns an invalid value. All route meta functions must return an array of meta objects.

To reference the meta function API, see https://remix.run/route/meta`
      );
    (h.meta = p), (d[c] = h), (u = [...p]), (s = u);
  }
  return g.createElement(
    g.Fragment,
    null,
    u.flat().map((c) => {
      if (!c) return null;
      if ("tagName" in c) {
        let { tagName: f, ...w } = c;
        if (!c0(f))
          return (
            console.warn(
              `A meta object uses an invalid tagName: ${f}. Expected either 'link' or 'meta'`
            ),
            null
          );
        let m = f;
        return g.createElement(m, ke({ key: JSON.stringify(w) }, w));
      }
      if ("title" in c)
        return g.createElement("title", { key: "title" }, String(c.title));
      if (
        ("charset" in c &&
          (c.charSet ?? (c.charSet = c.charset), delete c.charset),
        "charSet" in c && c.charSet != null)
      )
        return typeof c.charSet == "string"
          ? g.createElement("meta", { key: "charSet", charSet: c.charSet })
          : null;
      if ("script:ld+json" in c)
        try {
          let f = JSON.stringify(c["script:ld+json"]);
          return g.createElement("script", {
            key: `script:ld+json:${f}`,
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: f },
          });
        } catch {
          return null;
        }
      return g.createElement("meta", ke({ key: JSON.stringify(c) }, c));
    })
  );
}
function c0(e) {
  return typeof e == "string" && /^(meta|link)$/.test(e);
}
function d0(e) {
  return g.createElement(Ey, e);
}
let fi = !1;
function f0(e) {
  let {
      manifest: t,
      serverHandoffString: n,
      abortDelay: r,
      serializeError: l,
      isSpaMode: i,
      future: o,
      renderMeta: a,
    } = Er(),
    { router: u, static: s, staticContext: d } = Rh(),
    { matches: c } = ao(),
    f = Gu(o, i);
  a && (a.didRenderScripts = !0);
  let w = bu(c, null, i);
  g.useEffect(() => {
    fi = !0;
  }, []);
  let m = (y, _) => {
      let P;
      return (
        l && _ instanceof Error ? (P = l(_)) : (P = _),
        `${JSON.stringify(y)}:__remixContext.p(!1, ${Zl(JSON.stringify(P))})`
      );
    },
    x = (y, _, P) => {
      let D;
      try {
        D = JSON.stringify(P);
      } catch (O) {
        return m(_, O);
      }
      return `${JSON.stringify(_)}:__remixContext.p(${Zl(D)})`;
    },
    L = (y, _, P) => {
      let D;
      return (
        l && P instanceof Error ? (D = l(P)) : (D = P),
        `__remixContext.r(${JSON.stringify(y)}, ${JSON.stringify(_)}, !1, ${Zl(
          JSON.stringify(D)
        )})`
      );
    },
    p = (y, _, P) => {
      let D;
      try {
        D = JSON.stringify(P);
      } catch (O) {
        return L(y, _, O);
      }
      return `__remixContext.r(${JSON.stringify(y)}, ${JSON.stringify(_)}, ${Zl(
        D
      )})`;
    },
    h = [],
    v = g.useMemo(() => {
      var y;
      let _ = o.v3_singleFetch
          ? "window.__remixContext.stream = new ReadableStream({start(controller){window.__remixContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());"
          : "",
        P = d ? `window.__remixContext = ${n};${_}` : " ",
        D = o.v3_singleFetch || d == null ? void 0 : d.activeDeferreds;
      P += D
        ? [
            "__remixContext.p = function(v,e,p,x) {",
            "  if (typeof e !== 'undefined') {",
            `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`,
            "    p=Promise.reject(x);",
            "  } else {",
            "    p=Promise.resolve(v);",
            "  }",
            "  return p;",
            "};",
            "__remixContext.n = function(i,k) {",
            "  __remixContext.t = __remixContext.t || {};",
            "  __remixContext.t[i] = __remixContext.t[i] || {};",
            "  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});",
            typeof r == "number"
              ? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${r});`
              : "",
            "  return p;",
            "};",
            "__remixContext.r = function(i,k,v,e,p,x) {",
            "  p = __remixContext.t[i][k];",
            "  if (typeof e !== 'undefined') {",
            `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`,
            "    p.e(x);",
            "  } else {",
            "    p.r(v);",
            "  }",
            "};",
          ].join(`
`) +
          Object.entries(D).map(([K, J]) => {
            let de = new Set(J.pendingKeys),
              fe = J.deferredKeys.map((Re) => {
                if (de.has(Re))
                  return (
                    h.push(
                      g.createElement(Vc, {
                        key: `${K} | ${Re}`,
                        deferredData: J,
                        routeId: K,
                        dataKey: Re,
                        scriptProps: e,
                        serializeData: p,
                        serializeError: L,
                      })
                    ),
                    `${JSON.stringify(Re)}:__remixContext.n(${JSON.stringify(
                      K
                    )}, ${JSON.stringify(Re)})`
                  );
                {
                  let et = J.data[Re];
                  return typeof et._error < "u"
                    ? m(Re, et._error)
                    : x(K, Re, et._data);
                }
              }).join(`,
`);
            return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(
              K
            )}], {${fe}});`;
          }).join(`
`) +
          (h.length > 0 ? `__remixContext.a=${h.length};` : "")
        : "";
      let O = s
        ? `${
            (y = t.hmr) !== null && y !== void 0 && y.runtime
              ? `import ${JSON.stringify(t.hmr.runtime)};`
              : ""
          }${f ? "" : `import ${JSON.stringify(t.url)}`};
${w.map(
  (K, J) =>
    `import * as route${J} from ${JSON.stringify(t.routes[K.route.id].module)};`
).join(`
`)}
${f ? `window.__remixManifest = ${JSON.stringify(n0(t, u), null, 2)};` : ""}
window.__remixRouteModules = {${w
            .map((K, J) => `${JSON.stringify(K.route.id)}:route${J}`)
            .join(",")}};

import(${JSON.stringify(t.entry.module)});`
        : " ";
      return g.createElement(
        g.Fragment,
        null,
        g.createElement(
          "script",
          ke({}, e, {
            suppressHydrationWarning: !0,
            dangerouslySetInnerHTML: Ac(P),
            type: void 0,
          })
        ),
        g.createElement(
          "script",
          ke({}, e, {
            suppressHydrationWarning: !0,
            dangerouslySetInnerHTML: Ac(O),
            type: "module",
            async: !0,
          })
        )
      );
    }, []);
  if (!s && typeof __remixContext == "object" && __remixContext.a)
    for (let y = 0; y < __remixContext.a; y++)
      h.push(
        g.createElement(Vc, {
          key: y,
          scriptProps: e,
          serializeData: p,
          serializeError: L,
        })
      );
  let E = w
      .map((y) => {
        let _ = t.routes[y.route.id];
        return (_.imports || []).concat([_.module]);
      })
      .flat(1),
    R = fi ? [] : t.entry.imports.concat(E);
  return fi
    ? null
    : g.createElement(
        g.Fragment,
        null,
        f
          ? null
          : g.createElement("link", {
              rel: "modulepreload",
              href: t.url,
              crossOrigin: e.crossOrigin,
            }),
        g.createElement("link", {
          rel: "modulepreload",
          href: t.entry.module,
          crossOrigin: e.crossOrigin,
        }),
        p0(R).map((y) =>
          g.createElement("link", {
            key: y,
            rel: "modulepreload",
            href: y,
            crossOrigin: e.crossOrigin,
          })
        ),
        v,
        h
      );
}
function Vc({
  dataKey: e,
  deferredData: t,
  routeId: n,
  scriptProps: r,
  serializeData: l,
  serializeError: i,
}) {
  return (
    typeof document > "u" &&
      t &&
      e &&
      n &&
      Bt(
        t.pendingKeys.includes(e),
        `Deferred data for route ${n} with key ${e} was not pending but tried to render a script for it.`
      ),
    g.createElement(
      g.Suspense,
      {
        fallback:
          typeof document > "u" && t && e && n
            ? null
            : g.createElement(
                "script",
                ke({}, r, {
                  async: !0,
                  suppressHydrationWarning: !0,
                  dangerouslySetInnerHTML: { __html: " " },
                })
              ),
      },
      typeof document > "u" && t && e && n
        ? g.createElement(d0, {
            resolve: t.data[e],
            errorElement: g.createElement(h0, {
              dataKey: e,
              routeId: n,
              scriptProps: r,
              serializeError: i,
            }),
            children: (o) =>
              g.createElement(
                "script",
                ke({}, r, {
                  async: !0,
                  suppressHydrationWarning: !0,
                  dangerouslySetInnerHTML: { __html: l(n, e, o) },
                })
              ),
          })
        : g.createElement(
            "script",
            ke({}, r, {
              async: !0,
              suppressHydrationWarning: !0,
              dangerouslySetInnerHTML: { __html: " " },
            })
          )
    )
  );
}
function h0({ dataKey: e, routeId: t, scriptProps: n, serializeError: r }) {
  let l = gy();
  return g.createElement(
    "script",
    ke({}, n, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: { __html: r(t, e, l) },
    })
  );
}
function p0(e) {
  return [...new Set(e)];
}
function Th(...e) {
  return (t) => {
    e.forEach((n) => {
      typeof n == "function" ? n(t) : n != null && (n.current = t);
    });
  };
}
export {
  zn as E,
  T0 as L,
  N0 as M,
  w0 as O,
  Lh as R,
  f0 as S,
  ke as _,
  Ju as a,
  g0 as b,
  R0 as c,
  Qg as d,
  y0 as e,
  S0 as f,
  C0 as g,
  L0 as h,
  Bt as i,
  P0 as j,
  x0 as k,
  Er as l,
  Ot as m,
  Wt as n,
  vy as o,
  k0 as p,
  Qf as r,
  bg as s,
  _0 as u,
};
