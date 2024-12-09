import { r as n, j as e } from "./jsx-runtime-56DGgGmo.js";
import { L as g, G as u } from "./Github-Daz2RFU2.js";
import {
  l as b,
  n as f,
  o as w,
  p as y,
  _ as k,
  O as N,
  M as v,
  L as S,
  S as L,
} from "./components-DCLLcppY.js";
/**
 * @remix-run/react v2.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ let p = "positions";
function _({ getKey: t, ...r }) {
  let { isSpaMode: a } = b(),
    s = f(),
    c = w();
  y({ getKey: t, storageKey: p });
  let i = n.useMemo(() => {
    if (!t) return null;
    let l = t(s, c);
    return l !== s.key ? l : null;
  }, []);
  if (a) return null;
  let m = ((l, h) => {
    if (!window.history.state || !window.history.state.key) {
      let o = Math.random().toString(32).slice(2);
      window.history.replaceState({ key: o }, "");
    }
    try {
      let d = JSON.parse(sessionStorage.getItem(l) || "{}")[
        h || window.history.state.key
      ];
      typeof d == "number" && window.scrollTo(0, d);
    } catch (o) {
      console.error(o), sessionStorage.removeItem(l);
    }
  }).toString();
  return n.createElement(
    "script",
    k({}, r, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: {
        __html: `(${m})(${JSON.stringify(p)}, ${JSON.stringify(i)})`,
      },
    })
  );
}
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const z = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  j = (...t) =>
    t
      .filter((r, a, s) => !!r && r.trim() !== "" && s.indexOf(r) === a)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var M = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const C = n.forwardRef(
  (
    {
      color: t = "currentColor",
      size: r = 24,
      strokeWidth: a = 2,
      absoluteStrokeWidth: s,
      className: c = "",
      children: i,
      iconNode: m,
      ...l
    },
    h
  ) =>
    n.createElement(
      "svg",
      {
        ref: h,
        ...M,
        width: r,
        height: r,
        stroke: t,
        strokeWidth: s ? (Number(a) * 24) / Number(r) : a,
        className: j("lucide", c),
        ...l,
      },
      [
        ...m.map(([o, d]) => n.createElement(o, d)),
        ...(Array.isArray(i) ? i : [i]),
      ]
    )
);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const E = (t, r) => {
  const a = n.forwardRef(({ className: s, ...c }, i) =>
    n.createElement(C, {
      ref: i,
      iconNode: r,
      className: j(`lucide-${z(t)}`, s),
      ...c,
    })
  );
  return (a.displayName = `${t}`), a;
};
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const x = E("Mail", [
    [
      "rect",
      { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" },
    ],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ]),
  I = () => {
    const t = (r) => {
      const a = document.getElementById("menu-toggle");
      a && (a.checked = !1);
      const s = document.getElementById(r);
      s && s.scrollIntoView({ behavior: "smooth" });
    };
    return e.jsxs("aside", {
      className:
        "fixed bg-black z-10 h-screen w-screen top-0 drawer transition-opacity duration-300 px-6 pt-44 space-y-10",

      children: [
        e.jsxs("nav", {
          className: "flex flex-col items-start space-y-6 text-2xl text-center",
          children: [
            e.jsx("button", {
              onClick: () => t("experience"),
              className: "hover:text-gray-400",
              children: "Experience",
            }),
            e.jsx("button", {
              onClick: () => t("about"),
              className: "hover:text-gray-400",
              children: "About Me",
            }),
            e.jsx("button", {
              onClick: () => t("projects"),
              className: "hover:text-gray-400",
              children: "Projects",
            }),
          ],
        }),
        e.jsxs("div", {
          className: "text-2xl space-y-3",
          children: [
            e.jsxs("p", {
              className: "text-gray-300 opacity-50",
              children: [
                "S A Y ",
                e.jsx("span", { className: "ml-2", children: "H E L L O" }),
              ],
            }),
            e.jsx("p", {
              className: "text-lg",
              children: "patelsahil44@gmail.com",
            }),
            e.jsxs("ul", {
              className: "flex items-center gap-3",
              children: [
                e.jsx("li", {
                  children: e.jsx("a", {
                    href: "https://linkedin.com/in/mjawadzaiter",
                    target: "_blank",
                    "aria-label": "linkedin",
                    className:
                      "bg-[#222222] rounded-full h-10 w-10 grid place-items-center hover:bg-[#0077B5] transition-colors duration-300",
                    children: e.jsx(g, {}),
                  }),
                }),
                e.jsx("li", {
                  children: e.jsx("a", {
                    href: "https://github.com/Jawad762",
                    target: "_blank",
                    "aria-label": "github",
                    className:
                      "bg-[#222222] rounded-full h-10 w-10 grid place-items-center hover:bg-white transition-colors duration-300 group",
                    children: e.jsx(u, { className: "group-hover:fill-black" }),
                  }),
                }),
                e.jsx("li", {
                  children: e.jsx("a", {
                    href: "mailto:patelsahil44@gmail.com",
                    target: "_blank",
                    "aria-label": "mail",
                    className:
                      "bg-[#222222] rounded-full h-10 w-10 grid place-items-center hover:bg-red-500 transition-colors duration-300",
                    children: e.jsx(x, {}),
                  }),
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  O = () =>
    e.jsxs(e.Fragment, {
      children: [
        e.jsx("header", {
          className:
            "transition-all duration-300 absolute top-0 inset-x-0 px-4 z-20",
          children: e.jsxs("div", {
            className: "section-container flex items-center justify-between",
            children: [
              e.jsx("img", {
                src: "sahil.png",
                height: 100,
                width: 100,
                alt: "logo",
                style: { paddingTop: "24px" },
              }),
              e.jsxs("ul", {
                className: "hidden md:flex items-center gap-3",
                style: { paddingTop: "28px" },
                children: [
                  e.jsx("li", {
                    children: e.jsx("a", {
                      href: "https://linkedin.com/in/mjawadzaiter",
                      target: "_blank",
                      "aria-label": "linkedin",
                      className:
                        "bg-[#222222] rounded-full h-8 w-8 grid place-items-center hover:bg-[#0077B5] transition-colors duration-300",
                      children: e.jsx(g, {}),
                    }),
                  }),
                  e.jsx("li", {
                    children: e.jsx("a", {
                      href: "https://github.com/Jawad762",
                      target: "_blank",
                      "aria-label": "github",
                      className:
                        "bg-[#222222] rounded-full h-8 w-8 grid place-items-center hover:bg-white transition-colors duration-300 group",
                      children: e.jsx(u, {
                        className: "group-hover:fill-black",
                      }),
                    }),
                  }),
                  e.jsx("li", {
                    children: e.jsx("a", {
                      href: "mailto:patelsahil44@gmail.com",
                      target: "_blank",
                      "aria-label": "mail",
                      className:
                        "bg-[#222222] rounded-full h-8 w-8 grid place-items-center hover:bg-red-500 transition-colors duration-300",
                      children: e.jsx(x, { size: 20 }),
                    }),
                  }),
                ],
              }),
              e.jsx("label", {
                htmlFor: "menu-toggle",
                className: "md:hidden w-7 h-5 relative z-10 menu-btn",
                style: { marginTop: "40px" },
              }),
              e.jsx("input", {
                type: "checkbox",
                name: "menu-toggle",
                id: "menu-toggle",
                className: "hidden menu-toggle",
              }),
            ],
          }),
        }),
        e.jsx(I, {}),
      ],
    }),
  A = () =>
    e.jsx("footer", {
      className: "text-white bg-darkSecondary pb-4",
      children: e.jsxs("div", {
        className:
          "section-container mx-auto px-4 flex flex-col justify-center items-center",
        children: [
          e.jsx("img", {
            src: "sahil.png",
            alt: "Logo",
            height: 150,
            width: 150,
            style: { paddingBottom: "24px" },
          }),
          e.jsxs("ul", {
            className: "flex items-center gap-3",
            children: [
              e.jsx("li", {
                children: e.jsx("a", {
                  href: "https://linkedin.com/in/mjawadzaiter",
                  target: "_blank",
                  "aria-label": "linkedin",
                  className:
                    "bg-[#222222] rounded-full h-10 w-10 grid place-items-center hover:bg-[#0077B5] transition-colors duration-300",
                  children: e.jsx(g, {}),
                }),
              }),
              e.jsx("li", {
                children: e.jsx("a", {
                  href: "https://github.com/Jawad762",
                  target: "_blank",
                  "aria-label": "github",
                  className:
                    "bg-[#222222] rounded-full h-10 w-10 grid place-items-center hover:bg-white transition-colors duration-300 group",
                  children: e.jsx(u, { className: "group-hover:fill-black" }),
                }),
              }),
              e.jsx("li", {
                children: e.jsx("a", {
                  href: "mailto:patelsahil44@gmail.com",
                  target: "_blank",
                  "aria-label": "mail",
                  className:
                    "bg-[#222222] rounded-full h-10 w-10 grid place-items-center hover:bg-red-500 transition-colors duration-300",
                  children: e.jsx(x, { size: 20 }),
                }),
              }),
            ],
          }),
          e.jsx("p", { className: "mt-6", children: "patelsahil44@gmail.com" }),
          e.jsxs("p", {
            className: "text-center mt-6 text-sm text-gray-500",
            children: ["Made by Me © ", new Date().getFullYear()],
          }),
        ],
      }),
    }),
  J = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap",
    },
  ];
function F({ children: t }) {
  return e.jsxs("html", {
    lang: "en",
    children: [
      e.jsxs("head", {
        children: [
          e.jsx("meta", { charSet: "utf-8" }),
          e.jsx("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          }),
          e.jsx(v, {}),
          e.jsx(S, {}),
        ],
      }),
      e.jsxs("body", {
        className: "overflow-x-hidden",
        children: [
          e.jsx(O, {}),
          e.jsx("main", { children: t }),
          e.jsx(A, {}),
          e.jsx(_, {}),
          e.jsx(L, {}),
        ],
      }),
    ],
  });
}
function H() {
  return e.jsx(N, {});
}
export { F as Layout, H as default, J as links };
