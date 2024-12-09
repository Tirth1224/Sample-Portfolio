import { j as e, r as c } from "./jsx-runtime-56DGgGmo.js";
import { L as u, G as h } from "./Github-Daz2RFU2.js";
const b = () =>
    e.jsxs("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "text-bluePrimary",
      children: [
        e.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
        e.jsx("polyline", { points: "7 10 12 15 17 10" }),
        e.jsx("line", { x1: "12", x2: "12", y1: "15", y2: "3" }),
      ],
    }),
  f = () => {
    const o = (d) => {
      const r = document.getElementById(d);
      r && r.scrollIntoView({ behavior: "smooth" });
    };
    return e.jsx("section", {
      className:
        "flex h-screen items-center justify-center pt-14 relative hero-bg",
      children: e.jsxs("div", {
        className: "section-container flex justify-center",
        children: [
          e.jsx("div", { className: "dark-overlay-left" }),
          e.jsx("div", { className: "dark-overlay-right" }),
          e.jsxs("div", {
            className:
              "flex flex-col items-center justify-center gap-3 w-11/12 lg:w-2/3",
            children: [
              e.jsx("h4", {
                className: "text-xs",
                children: "BASED IN AHMEDABAD",
              }),
              e.jsxs("h1", {
                className:
                  "text-3xl sm:text-5xl md:text-6xl text-center leading-[2.25rem] md:leading-[4rem] space-x-2 sm:space-x-3 hero-text",
                children: [
                  e.jsx("span", { children: "Software" }),
                  e.jsx("span", { children: "Engineer" }),
                  e.jsx("span", {
                    className: "text-bluePrimary",
                    children: "Specializing",
                  }),
                  e.jsx("span", {
                    className: "text-bluePrimary",
                    children: "In",
                  }),
                  e.jsx("span", {
                    className: "text-bluePrimary",
                    children: "Web",
                  }),
                  e.jsx("span", {
                    className: "text-bluePrimary",
                    children: "&",
                  }),
                  e.jsx("span", {
                    className: "text-bluePrimary",
                    children: "Mobile",
                  }),
                  e.jsx("span", { children: "Applications" }),
                ],
              }),
              e.jsx("p", {
                className: "text-center text-gray-400",
                children:
                  "Hi, I'm Jawad, I create solutions across all layers of software engineering.",
              }),
              e.jsxs("div", {
                className: "flex items-center gap-4 text-sm",
                children: [
                  e.jsx("button", {
                    onClick: () => o("experience"),
                    className:
                      "bg-[#222222] px-4 py-2 rounded-md border border-slate-500 see-work-btn",
                    children: "See My Work",
                  }),
                  e.jsxs("a", {
                    href: "CV/CV.pdf",
                    download: "Sahil_CV",
                    className: "flex items-center gap-1.5",
                    children: [e.jsx(b, {}), "Download CV"],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
  },
  m = [
    {
      id: "atg",
      companyLogo: "tech-logos/atg-logo.png",
      companyName: "Alpha Technology Group",
      role: "Full-Stack Developer",
      duration: "Sep 2024 - Now",
      details: [
        "Maintained a 100,000+ line .NET Core codebase, focusing on debugging critical issues and managing interactions with the SQL Server database.",
        "Integrated new features into the .NET Core application, including advanced email and push notification capabilities using Firebase.",
        "Created a sample project that utilizes Ffmpeg and Node.js to efficiently process and merge videos.",
      ],
      tech: [
        { name: ".NET Core", path: "tech-logos/dotnet.svg" },
        { name: "C#", path: "tech-logos/csharp.svg" },
        { name: "Ffmpeg", path: "tech-logos/ffmpeg.png" },
        { name: "Node.js", path: "tech-logos/node.svg" },
        { name: "SQL Server", path: "tech-logos/sql-server.png" },
        { name: "Firebase", path: "tech-logos/firebase.svg" },
        { name: "Express.js", path: "tech-logos/express.png" },
        { name: "Next.js", path: "tech-logos/nextjs.png" },
        { name: "Typescript", path: "tech-logos/typescript.png" },
        { name: "Git", path: "tech-logos/git.png" },
      ],
    },
    {
      id: "freelance",
      companyLogo: "tech-logos/upwork-logo.webp",
      companyName: "Freelance",
      role: "Software Engineer",
      duration: "Aug 2023 - Now",
      details: [
        "Developed a full-stack Next.js website with Strapi CMS and PostgreSQL for a car rental company in Canada, enhancing their online presence and booking capabilities.",
        "Built a React Native mobile application with Firebase for a university professor, enabling streamlined sharing of courses and educational content with students, alongside secure authentication.",
        "Engineered a custom backend with Strapi, adding advanced authentication, custom routes, and lifecycle hooks, with Novu and SendGrid for email integration.",
      ],
      tech: [
        { name: "Expo", path: "tech-logos/expo.svg" },
        { name: "React Native", path: "tech-logos/react.svg" },
        { name: "React.js ", path: "tech-logos/react.svg" },
        { name: "Redux", path: "tech-logos/redux.svg" },
        { name: "Redis", path: "tech-logos/redis.svg" },
        { name: "Remix", path: "tech-logos/remix.png" },
        { name: "Strapi", path: "tech-logos/strapi.svg" },
        { name: "Docker", path: "tech-logos/docker.svg" },
        { name: "MongoDB", path: "tech-logos/mongodb.svg" },
        { name: "PostgreSQL", path: "tech-logos/postgres.png" },
      ],
    },
    {
      id: "atg-intern",
      companyLogo: "tech-logos/atg-logo.png",
      companyName: "Alpha Technology Group (Intern)",
      role: "Frontend Developer",
      duration: "Jun 2024 - Aug 2024",
      details: [
        "Rebuilt a major media company’s 50+ page website with Next.js, driving a 10% increase in performance and SEO metrics.",
        "Converted multiple Adobe XD/Figma designs into HTML, CSS, and JavaScript while collaborating closely with designers.",
        "Contributed to the company's frontend framework by fixing bugs, particularly optimizing the search feature for better usability.",
      ],
      tech: [
        { name: "HTML", path: "tech-logos/html.svg" },
        { name: "CSS", path: "tech-logos/css.svg" },
        { name: "Javascript", path: "tech-logos/javascript.svg" },
        { name: "Typescript", path: "tech-logos/typescript.png" },
        { name: "React.js", path: "tech-logos/react.svg" },
        { name: "Next.js", path: "tech-logos/nextjs.png" },
        { name: "Tailwind", path: "tech-logos/tailwind.svg" },
        { name: "Git", path: "tech-logos/git.png" },
        { name: "React Query", path: "tech-logos/react-query.png" },
        { name: "Swiper.js", path: "tech-logos/swiper.svg" },
      ],
    },
  ],
  g = [
    {
      name: "Giro",
      details:
        "Built Giro, a ride-booking platform like Uber, offering user roles as riders or drivers. It supports secure, flexible payments through Stripe for card processing and a cash option. Real-time ride tracking and updates are powered by SignalR and Google API integration, while JWT-based cookies provide secure user authentication. The platform is Dockerized to enhance deployment and scalability.",
      thumbnail: "my-projects/giro/thumbnail.png",
      platform: "Website",
      github: "https://github.com/Jawad762/giro-server",
      tech: [
        { name: "Next.js", path: "tech-logos/nextjs.png" },
        { name: "Typescript", path: "tech-logos/typescript.png" },
        { name: ".NET Core", path: "tech-logos/dotnet.svg" },
        { name: "C#", path: "tech-logos/csharp.svg" },
        { name: "PostgreSQL", path: "tech-logos/postgres.png" },
        { name: "Docker", path: "tech-logos/docker.svg" },
        { name: "Stripe", path: "tech-logos/stripe.svg" },
      ],
    },
    {
      name: "Cup Talk",
      details:
        "Built Cup Talk, a dynamic chat web app enabling real-time messaging with Socket.io for instant communication. Integrated end-to-end encryption and session-based authentication for enhanced security. Used optimistic updates to streamline the user experience and boosted engagement through web push notifications.",
      thumbnail: "my-projects/cuptalk/thumbnail.png",
      platform: "Website",
      github: "https://github.com/Jawad762/cup-talk",
      tech: [
        { name: "React", path: "tech-logos/react.svg" },
        { name: "Javascript", path: "tech-logos/javascript.svg" },
        { name: "Express", path: "tech-logos/express.png" },
        { name: "MySQL", path: "tech-logos/mysql.svg" },
        { name: "Firebase", path: "tech-logos/firebase.svg" },
        { name: "React Query", path: "tech-logos/react-query.png" },
      ],
    },
    {
      name: "Commercius",
      details:
        "Developed Commercius, a mobile marketplace app for item listings with real-time messaging through Socket.io. Enabled email notifications via Nodemailer for improved engagement and used Redux with RTK Query for optimized state management and efficient data handling.",
      thumbnail: "my-projects/commercius/thumbnail.png",
      platform: "Mobile App",
      github: "https://github.com/Jawad762/commercius",
      tech: [
        { name: "Expo", path: "tech-logos/expo.svg" },
        { name: "React Native", path: "tech-logos/react.svg" },
        { name: "Typescript", path: "tech-logos/typescript.png" },
        { name: "Fastify", path: "tech-logos/fastify.svg" },
        { name: "PostgreSQL", path: "tech-logos/postgres.png" },
        { name: "Redux", path: "tech-logos/redux.svg" },
      ],
    },
    {
      name: "Social Sphere",
      details:
        "Developed SocialSphere, a full-stack social media platform with a responsive frontend using React, Redux Toolkit, and React Query. Designed a secure backend with Express, MongoDB, Firebase storage, and JWT authentication.",
      thumbnail: "my-projects/socialsphere/thumbnail.png",
      platform: "Website",
      github: "https://github.com/Jawad762/SocialSphere-server",
      tech: [
        { name: "React", path: "tech-logos/react.svg" },
        { name: "Express", path: "tech-logos/express.png" },
        { name: "MongoDB", path: "tech-logos/mongodb.svg" },
        { name: "Redux Toolkit", path: "tech-logos/redux.svg" },
        { name: "React Query", path: "tech-logos/react-query.png" },
        { name: "Firebase", path: "tech-logos/firebase.svg" },
      ],
    },
  ],
  v = () => {
    var r;
    const [o, d] = c.useState(m[0].id);
    return (
      c.useEffect(() => {
        const a = new IntersectionObserver(
          (l) => {
            l.forEach((s) => {
              document.getElementById(s.target.id) &&
                s.isIntersecting &&
                d(s.target.id);
            });
          },
          { threshold: 0.5, rootMargin: "0px 0px -30% 0px" }
        );
        return (
          m.forEach((l) => {
            const s = document.getElementById(l.id);
            s && a.observe(s);
          }),
          () => {
            m.forEach((l) => {
              const s = document.getElementById(l.id);
              s && a.unobserve(s);
            });
          }
        );
      }, []),
      e.jsxs("section", {
        id: "experience",
        className: "section-container pt-10",
        children: [
          e.jsx("h2", {
            className: "text-3xl sm:text-5xl md:text-6xl",
            children: "Work Experience",
          }),
          e.jsxs("div", {
            className: "py-7 md:py-14 flex gap-20",
            children: [
              e.jsx("div", {
                className: "lg:w-1/2",
                children: m.map((a, l) => {
                  var s;
                  return e.jsx(
                    "div",
                    {
                      id: a.id,
                      className: `flex flex-col gap-10 transition-opacity duration-500 ${
                        o === a.id ? "opacity-100" : "opacity-30"
                      } `,
                      children: e.jsxs("div", {
                        className: "flex",
                        children: [
                          e.jsxs("div", {
                            className: "flex-shrink-0 flex flex-col",
                            children: [
                              e.jsx("img", {
                                src: a.companyLogo,
                                height: 50,
                                width: 50,
                                className: "rounded-full object-cover",
                                alt: `${a.companyName} logo`,
                              }),
                              e.jsx("div", {
                                className: "w-0.5 mx-auto flex-1 bg-white",
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className: "space-y-6 pb-14",
                            children: [
                              e.jsxs("div", {
                                className: "ml-4",
                                children: [
                                  e.jsx("h3", {
                                    className: "text-xl sm:text-2xl",
                                    children: a.companyName,
                                  }),
                                  e.jsxs("p", {
                                    className:
                                      "text-sm sm:text-base text-bluePrimary",
                                    children: [
                                      a.role,
                                      " | ",
                                      e.jsx("span", { children: a.duration }),
                                    ],
                                  }),
                                ],
                              }),
                              e.jsx("ul", {
                                className:
                                  "mt-3 sm:text-lg space-y-4 sm:space-y-8",
                                children: a.details.map((t, n) =>
                                  e.jsxs(
                                    "li",
                                    {
                                      className: "relative",
                                      children: [
                                        e.jsx("p", {
                                          className: "ml-4",
                                          children: t,
                                        }),
                                        e.jsx("span", {
                                          className:
                                            "absolute -left-[33px] top-3.5 border -translate-y-1/2 size-4 bg-white rounded-full",
                                        }),
                                      ],
                                    },
                                    n
                                  )
                                ),
                              }),
                              e.jsxs("div", {
                                className: "flex lg:hidden flex-col gap-3 ml-4",
                                children: [
                                  e.jsx("h3", {
                                    className: "text-xl sm:text-2xl",
                                    children: "Tech Stack",
                                  }),
                                  e.jsx("div", {
                                    className: "flex flex-wrap gap-1 sm:gap-2",
                                    children:
                                      (s = m.find((t) => t.id === a.id)) == null
                                        ? void 0
                                        : s.tech.map((t) =>
                                            e.jsxs(
                                              "div",
                                              {
                                                className:
                                                  "rounded-lg pl-2 pr-4 py-2 bg-[#121212] flex items-center gap-3 tech-icon",
                                                children: [
                                                  e.jsx("img", {
                                                    src: t.path,
                                                    alt: t.name,
                                                    className:
                                                      "h-5 w-5 sm:h-8 sm:w-8 lg:h-14 lg:w-14 object-cover",
                                                  }),
                                                  e.jsx("p", {
                                                    className:
                                                      "text-sm sm:text-lg",
                                                    children: t.name,
                                                  }),
                                                ],
                                              },
                                              t.name
                                            )
                                          ),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    },
                    l
                  );
                }),
              }),
              e.jsxs("div", {
                className:
                  "w-1/2 hidden lg:flex flex-col gap-6 sticky h-full top-12",
                children: [
                  e.jsx("h3", {
                    className: "text-xl sm:text-2xl",
                    children: "Tech Stack",
                  }),
                  e.jsx("div", {
                    className: "grid grid-cols-2 gap-3",
                    children:
                      (r = m.find((a) => a.id === o)) == null
                        ? void 0
                        : r.tech.map((a) =>
                            e.jsxs(
                              "div",
                              {
                                className:
                                  "rounded-lg pl-2 pr-4 py-2 bg-[#121212] flex items-center gap-3 tech-icon",
                                children: [
                                  e.jsx("img", {
                                    src: a.path,
                                    alt: a.name,
                                    className: "h-16 w-16 object-cover",
                                  }),
                                  e.jsx("p", {
                                    className: "text-lg",
                                    children: a.name,
                                  }),
                                ],
                              },
                              a.name
                            )
                          ),
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  },
  j = () =>
    e.jsxs("section", {
      id: "about",
      children: [
        e.jsx("img", {
          src: "devices.png",
          loading: "eager",
          className: "w-full lg:w-2/3 mx-auto px-10 pt-12",
          alt: "devices image",
        }),
        e.jsxs("div", {
          className: "py-10 md:py-24 relative",
          children: [
            e.jsx("img", {
              src: "gradient.png",
              className: "absolute inset-0 object-cover h-full w-full",
              alt: "gradient background",
            }),
            e.jsxs("div", {
              className:
                "section-container max-w-6xl mx-auto pb-8 flex flex-col items-center gap-6 relative",
              children: [
                e.jsx("h2", {
                  className:
                    "text-2xl sm:text-3xl 2xl:text-4xl text-center font-bold",
                  children: "Hi, I'm Jawad. Nice to meet you.",
                }),
                e.jsx("p", {
                  className:
                    "sm:w-[60%] text-center mx-auto sm:text-xl 2xl:text-2xl",
                  children:
                    "Since the beginning of my journey as a software engineer, I’ve freelanced, collaborated with teams, and tackled projects of all sizes—from websites and mobile apps to backend systems. I’m naturally curious, always learning, and love creating things that make an impact.",
                }),
                e.jsxs("a", {
                  href: "https://linkedin.com/in/mjawadzaiter",
                  target: "_blank",
                  className:
                    "border-2 rounded-lg flex justify-center items-center gap-2 group hover:bg-white hover:border-transparent transition-colors w-36 h-12",
                  children: [
                    e.jsx("span", {
                      className: "group-hover:hidden",
                      children: "Let's Connect",
                    }),
                    e.jsx("span", {
                      className: "rounded-full p-1.5 hidden group-hover:block",
                      children: e.jsx(u, { variation: 2 }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  y = () => {
    const [o, d] = c.useState(new Set()),
      [r, a] = c.useState(!1),
      l = c.useRef([]),
      s = c.useRef(null);
    return (
      c.useEffect(() => {
        const t = new IntersectionObserver(
          (n) => {
            n.forEach((i) => {
              const p = i.target.getAttribute("data-index");
              i.isIntersecting &&
                (p
                  ? d((x) => new Set(x).add(p))
                  : i.target === s.current && !r && a(!0));
            });
          },
          { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
        );
        return (
          s.current && t.observe(s.current),
          l.current.forEach((n) => n && t.observe(n)),
          () => {
            s.current && t.unobserve(s.current),
              l.current.forEach((n) => n && t.unobserve(n));
          }
        );
      }, [r]),
      e.jsx("section", {
        id: "projects",
        className: "py-20 md:py-24 px-4 relative bg-darkSecondary",
        children: e.jsxs("div", {
          className: "section-container max-w-6xl mx-auto pb-8 z-10",
          children: [
            e.jsx("h2", {
              ref: s,
              className: `text-3xl sm:text-5xl md:text-6xl mb-8 sm:mb-12 z-10 relative ${
                r ? "animate-opacity" : "opacity-0"
              }`,
              children: "Notable Projects",
            }),
            e.jsxs("div", {
              className: "flex flex-col lg:flex-row lg:gap-x-12 mx-auto",
              children: [
                e.jsx("div", {
                  className: "space-y-10 lg:w-1/2",
                  children: g.slice(0, 2).map((t, n) =>
                    e.jsxs(
                      "div",
                      {
                        "data-index": n,
                        ref: (i) => (l.current[n] = i),
                        className: `flex flex-col ${
                          o.has(String(n)) ? "animate-opacity" : "opacity-0"
                        }`,
                        children: [
                          e.jsxs("div", {
                            className:
                              "relative rounded-t-lg aspect-video group",
                            children: [
                              e.jsx("img", {
                                src: t.thumbnail,
                                alt: `${t.name} thumbnail`,
                                className:
                                  "rounded-t-lg w-full object-cover relative z-20",
                              }),
                              e.jsxs("a", {
                                href: t.github,
                                target: "_blank",
                                className:
                                  "bg-black/80 border border-transparent rounded-t-lg absolute z-30 inset-0 h-full w-full opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2",
                                children: [
                                  e.jsx(h, {}),
                                  e.jsx("span", { children: "View Source" }),
                                ],
                              }),
                              e.jsx("div", {
                                className:
                                  "animate-pulse absolute inset-0 rounded-t-lg w-full bg-gray-500 z-10",
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className:
                              "rounded-x-lg rounded-b-lg bg-[#121212] relative p-5 text-white w-full",
                            children: [
                              e.jsxs("h3", {
                                className:
                                  "text-2xl font-semibold mb-2 flex items-center",
                                children: [
                                  t.name,
                                  " ",
                                  e.jsx("span", {
                                    className:
                                      "ml-4 bg-[#222222] text-sm rounded-full px-2 py-1",
                                    children: t.platform,
                                  }),
                                ],
                              }),
                              e.jsx("p", {
                                className: "text-sm lg:text-base mb-4",
                                children: t.details,
                              }),
                              e.jsx("div", {
                                className: "flex flex-wrap gap-1 sm:gap-2 mb-4",
                                children: t.tech.map((i) =>
                                  e.jsxs(
                                    "div",
                                    {
                                      className:
                                        "flex items-center bg-[#222222] text-sm pl-2 pr-4 py-2 rounded-lg",
                                      children: [
                                        e.jsx("img", {
                                          src: i.path,
                                          alt: `${i.name} icon`,
                                          className:
                                            "w-5 h-5 sm:h-6 sm:w-6 mr-2 object-cover flex-shrink-0",
                                        }),
                                        e.jsx("span", { children: i.name }),
                                      ],
                                    },
                                    i.name
                                  )
                                ),
                              }),
                            ],
                          }),
                        ],
                      },
                      t.name
                    )
                  ),
                }),
                e.jsx("div", {
                  className: "mt-10 lg:mt-20 space-y-10 lg:w-1/2",
                  children: g.slice(2).map((t, n) =>
                    e.jsxs(
                      "div",
                      {
                        "data-index": n + 2,
                        ref: (i) => (l.current[n + 2] = i),
                        className: `flex flex-col ${
                          o.has(String(n)) ? "animate-opacity" : "opacity-0"
                        }`,
                        children: [
                          e.jsxs("div", {
                            className:
                              "relative rounded-t-lg aspect-video group",
                            children: [
                              e.jsx("img", {
                                src: t.thumbnail,
                                alt: `${t.name} thumbnail`,
                                className:
                                  "rounded-t-lg w-full object-cover relative z-20",
                              }),
                              e.jsxs("a", {
                                href: t.github,
                                target: "_blank",
                                className:
                                  "bg-black/80 border border-transparent rounded-t-lg absolute z-30 inset-0 h-full w-full opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2",
                                children: [
                                  e.jsx(h, {}),
                                  e.jsx("span", { children: "View Source" }),
                                ],
                              }),
                              e.jsx("div", {
                                className:
                                  "animate-pulse absolute inset-0 rounded-t-lg w-full bg-gray-500 z-10",
                              }),
                            ],
                          }),
                          e.jsxs("div", {
                            className:
                              "rounded-x-lg rounded-b-lg bg-[#121212] relative p-5 text-white w-full",
                            children: [
                              e.jsxs("h3", {
                                className:
                                  "text-2xl font-semibold mb-2 flex items-center",
                                children: [
                                  t.name,
                                  " ",
                                  e.jsx("span", {
                                    className:
                                      "ml-4 bg-[#222222] text-sm rounded-full px-2 py-1",
                                    children: t.platform,
                                  }),
                                ],
                              }),
                              e.jsx("p", {
                                className: "text-sm lg:text-base mb-4",
                                children: t.details,
                              }),
                              e.jsx("div", {
                                className: "flex flex-wrap gap-1 sm:gap-2 mb-4",
                                children: t.tech.map((i) =>
                                  e.jsxs(
                                    "div",
                                    {
                                      className:
                                        "flex items-center bg-[#222222] text-sm pl-2 pr-4 py-2 rounded-lg",
                                      children: [
                                        e.jsx("img", {
                                          src: i.path,
                                          alt: `${i.name} icon`,
                                          className:
                                            "w-5 h-5 sm:h-6 sm:w-6 mr-2 object-cover flex-shrink-0",
                                        }),
                                        e.jsx("span", { children: i.name }),
                                      ],
                                    },
                                    i.name
                                  )
                                ),
                              }),
                            ],
                          }),
                        ],
                      },
                      t.name
                    )
                  ),
                }),
              ],
            }),
          ],
        }),
      })
    );
  },
  k = () => [
    { title: "Jawad | Portfolio" },
    { name: "description", content: "Jawad's Portfolio" },
  ];
function S() {
  return e.jsxs(e.Fragment, {
    children: [e.jsx(f, {}), e.jsx(v, {}), e.jsx(j, {}), e.jsx(y, {})],
  });
}
export { S as default, k as meta };
