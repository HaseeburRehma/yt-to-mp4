"use strict";
(self.webpackChunkyt1s = self.webpackChunkyt1s || []).push([[1563], {
    35035: function(e, t, a) {
        var l = a(96540)
          , n = a(24794);
        t.A = e => {
            let {isOpen: t, onClose: a, title: o, children: r} = e;
            return l.createElement(l.Fragment, null, t && l.createElement(l.Fragment, null, l.createElement("div", {
                className: "modal-overlay"
            }), l.createElement("div", {
                id: "default-modal",
                tabIndex: "-1",
                "aria-hidden": "true",
                className: "modal-container " + (t ? "" : "hidden")
            }, l.createElement("div", {
                className: "modal-content-wrapper"
            }, l.createElement("div", {
                className: "modal-content"
            }, l.createElement("div", {
                className: "modal-header"
            }, l.createElement("h3", {
                className: "modal-title"
            }, o), l.createElement("button", {
                onClick: a,
                type: "button",
                className: "modal-close-button",
                "data-modal-hide": "default-modal"
            }, l.createElement("svg", {
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                height: "14px",
                viewBox: "0 0 14 14"
            }, l.createElement("path", {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            })))), l.createElement("div", {
                className: "modal-body"
            }, r, l.createElement(n.Script, {
                async: !0,
                "data-cfasync": "false",
                "data-size": "300x250",
                "data-category": "common",
                "data-id": "dl-banner-300x250",
                "data-zone": "8998942",
                src: "//koaptouw.com/btag.min.js"
            })), l.createElement("div", {
                className: "modal-footer"
            }, l.createElement("button", {
                type: "button",
                onClick: a,
                className: "close-button"
            }, "Close")))))))
        }
    },
    40194: function(e, t, a) {
        var l = a(24794)
          , n = a(96540);
        t.A = () => {
            (0,
            n.useEffect)(( () => {
                const e = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
                  , t = t => {
                    e || t.preventDefault()
                }
                  , a = t => {
                    !e && (123 === t.keyCode || t.ctrlKey && t.shiftKey && (73 === t.keyCode || 74 === t.keyCode || 67 === t.keyCode) || t.ctrlKey && 85 === t.keyCode || t.metaKey && t.altKey && 73 === t.keyCode) && t.preventDefault()
                }
                  , n = () => {
                    !e && (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) && (0,
                    l.navigate)("https://www.google.com/")
                }
                  , o = () => {
                    (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) && (0,
                    l.navigate)("https://www.google.com/")
                }
                ;
                if (!e) {
                    window.addEventListener("contextmenu", t),
                    window.addEventListener("keydown", a),
                    window.addEventListener("resize", n),
                    n(),
                    ( () => {
                        const e = setInterval(( () => {
                            window.console && (console.firebug || console.table && /firebug/i.test(window.console.table)) && (0,
                            l.navigate)("https://www.google.com/")
                        }
                        ), 500);
                        setTimeout(( () => clearInterval(e)), 5e3)
                    }
                    )();
                    const e = setInterval(o, 1e3);
                    return () => {
                        window.removeEventListener("contextmenu", t),
                        window.removeEventListener("keydown", a),
                        window.removeEventListener("resize", n),
                        clearInterval(e)
                    }
                }
            }
            ), [])
        }
    },
    86195: function(e, t, a) {
        a.r(t),
        a.d(t, {
            Head: function() {
                return m
            }
        });
        var l = a(96540)
          , n = a(24794)
          , o = a(86462)
          , r = a(32532)
          , s = a(35035)
          , c = a(40194)
          , i = a(48746)
          , d = a(35092);
        t.default = () => {
            (0,
            c.A)();
            const e = (0,
            o.useLocation)()
              , {videoId: t} = e.state || {}
              , {0: m, 1: u} = (0,
            l.useState)({})
              , {0: w, 1: E} = (0,
            l.useState)("mp3")
              , {0: p, 1: f} = (0,
            l.useState)({})
              , {0: g, 1: v} = (0,
            l.useState)(!1)
              , {0: b, 1: y} = (0,
            l.useState)(!1)
              , {0: h, 1: C} = (0,
            l.useState)(null)
              , {0: N, 1: M} = (0,
            l.useState)(null)
              , {0: k, 1: x} = (0,
            l.useState)(!1);
            let j = 0;
            const L = (0,
            l.useRef)(null)
              , T = (0,
            l.useRef)(null);
            (0,
            l.useEffect)(( () => {
                S("mp3")
            }
            ), [e]);
            const S = async e => {
                if (E(e),
                t) {
                    if (!m || 0 === Object.keys(m).length) {
                        y(!0),
                        C(null);
                        try {
                            const e = await fetch(`https://www.youtube.com/oembed?url=https://www.youtubse.com/watch?v=${t}&format=json`, {
                                method: "GET"
                            });
                            if (!e.ok)
                                throw new Error("Failed to fetch data");
                            const a = await e.json();
                            if (null != a && a.error)
                                return void C(a.error);
                            u(a)
                        } catch (a) {
                            C(a.message)
                        } finally {
                            y(!1)
                        }
                    }
                } else
                    C("The download link not found. Please try again")
            }
              , I = async e => {
                try {
                    window.open("https://ak.stikroltiltoowi.net/4/8998572"),
                    v(!0),
                    x(!0),
                    M(null);
                    const a = await fetch(`https://p.oceansaver.in/ajax/download.php?copyright=0&format=${e}&url=https://www.youtube.com/watch?v=${t}&api=30de256ad09118bd6b60a13de631ae2cea6e5f9d`)
                      , l = await a.json();
                    if (null == l || !l.success)
                        return M("Please try again."),
                        void x(!1);
                    null != l && l.download_url ? (f(l),
                    x(!1)) : z(l.id)
                } catch (a) {
                    M(`${a}. Please try again.`),
                    x(!1)
                }
            }
              , z = async e => {
                try {
                    T.current || (j = 0,
                    T.current = setInterval(( () => {
                        j < 650 && (j += 20,
                        f((e => ({
                            ...e,
                            progress: j
                        }))))
                    }
                    ), 1500));
                    const t = await fetch(`https://p.oceansaver.in/ajax/progress.php?id=${e}`)
                      , a = await t.json();
                    (null == a ? void 0 : a.progress) >= 650 && (clearInterval(T.current),
                    T.current = null,
                    f(a)),
                    1 === (null == a ? void 0 : a.success) ? (clearInterval(T.current),
                    T.current = null,
                    f(a),
                    x(!1)) : L.current = setTimeout(( () => z(e)), 1e3)
                } catch (t) {
                    clearInterval(T.current),
                    T.current = null,
                    clearTimeout(L.current),
                    L.current = null,
                    x(!1),
                    M(`${t}. Please try again.`)
                }
            }
            ;
            return l.createElement(l.Fragment, null, l.createElement("div", {
                className: d.tE
            }, l.createElement(n.Link, {
                className: d.wm,
                to: "/"
            }, l.createElement(r.S, {
                src: "../images/logo.svg",
                loading: "eager",
                alt: "logo",
                quality: 100,
                __imageData: a(35478)
            }), l.createElement("span", {
                className: d.Hv
            }, "YT1s"))), l.createElement("div", {
                className: d.Lg
            }, l.createElement("div", {
                className: d.oM
            }, l.createElement(n.Link, {
                className: d.Gj,
                to: "/",
                activeClassName: d.Xu
            }, "Youtube Downloader")), l.createElement("div", {
                className: d.oM
            }, l.createElement(n.Link, {
                className: d.Gj,
                to: "/youtube-to-mp3",
                activeClassName: d.Xu
            }, "Youtube to MP3")), l.createElement("div", {
                className: d.oM
            }, l.createElement(n.Link, {
                className: d.Gj,
                to: "/youtube-to-mp4",
                activeClassName: d.Xu
            }, "Youtube to MP4"))), l.createElement("div", {
                className: "layout"
            }, b && l.createElement("div", {
                className: "loader-wrapper"
            }, l.createElement("img", {
                alt: "logo",
                src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' style='margin:auto;background:%23fff;display:block;' width='100px' height='100px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3E%3Cg transform='translate(20 50)'%3E%3Ccircle cx='0' cy='0' r='6' fill='%23e15b64'%3E%3CanimateTransform attributeName='transform' type='scale' begin='-0.375s' calcMode='spline' keySplines='0.3 0 0.7 1;0.3 0 0.7 1' values='0;1;0' keyTimes='0;0.5;1' dur='1s' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/circle%3E%3C/g%3E%3Cg transform='translate(40 50)'%3E%3Ccircle cx='0' cy='0' r='6' fill='%23f8b26a'%3E%3CanimateTransform attributeName='transform' type='scale' begin='-0.25s' calcMode='spline' keySplines='0.3 0 0.7 1;0.3 0 0.7 1' values='0;1;0' keyTimes='0;0.5;1' dur='1s' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/circle%3E%3C/g%3E%3Cg transform='translate(60 50)'%3E%3Ccircle cx='0' cy='0' r='6' fill='%23abbd81'%3E%3CanimateTransform attributeName='transform' type='scale' begin='-0.125s' calcMode='spline' keySplines='0.3 0 0.7 1;0.3 0 0.7 1' values='0;1;0' keyTimes='0;0.5;1' dur='1s' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/circle%3E%3C/g%3E%3Cg transform='translate(80 50)'%3E%3Ccircle cx='0' cy='0' r='6' fill='%2381a3bd'%3E%3CanimateTransform attributeName='transform' type='scale' begin='0s' calcMode='spline' keySplines='0.3 0 0.7 1;0.3 0 0.7 1' values='0;1;0' keyTimes='0;0.5;1' dur='1s' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/circle%3E%3C/g%3E%3C/svg%3E"
            })), m && !b && l.createElement("div", {
                className: "table-container"
            }, l.createElement("div", {
                className: "left-section"
            }, l.createElement("div", {
                className: "video-info"
            }, l.createElement("img", {
                src: (null == m ? void 0 : m.thumbnail_url) || `https://i.ytimg.com/vi/${t}/hqdefault.jpg`,
                alt: "yt1s"
            }), l.createElement("div", {
                className: "text-left"
            }, l.createElement("b", {
                className: "video-title"
            }, (null == m ? void 0 : m.title) || `https://www.youtubse.com/watch?v=${t}`)))), l.createElement("div", {
                className: "right-section"
            }, l.createElement("ul", {
                className: "tab-buttons"
            }, l.createElement("li", null, l.createElement("button", {
                onClick: () => S("mp3"),
                className: "tab-btn",
                id: "mp3-tab",
                style: "mp3" === w ? {
                    backgroundColor: "#eee",
                    color: "#de1c07",
                    border: "1px solid #ddd",
                    borderBottomColor: "transparent",
                    cursor: "default"
                } : {}
            }, "Audio (MP3)")), l.createElement("li", null, l.createElement("button", {
                onClick: () => S("mp4"),
                className: "tab-btn",
                id: "mp4-tab",
                style: "mp4" === w ? {
                    backgroundColor: "#eee",
                    color: "#de1c07",
                    border: "1px solid #ddd",
                    borderBottomColor: "transparent",
                    cursor: "default"
                } : {}
            }, "Video (MP4)"))), l.createElement("div", null, "mp4" === w && l.createElement("table", {
                className: "content-table"
            }, l.createElement("thead", null, l.createElement("tr", null, l.createElement("th", null, "File type"), l.createElement("th", null, "Format"), l.createElement("th", null, "Action"))), l.createElement("tbody", null, [{
                quality: "MP4 auto quality",
                format: "Auto",
                value: "720"
            }, {
                quality: "1080p (.mp4)",
                hd: "HD",
                format: "Auto",
                value: "1080"
            }, {
                quality: "720p (.mp4)",
                hd: "m-HD",
                format: "Auto",
                value: "720"
            }, {
                quality: "360p (.mp4)",
                format: "Auto",
                value: "360"
            }].map((e => l.createElement("tr", null, l.createElement("td", null, null == e ? void 0 : e.quality, (null == e ? void 0 : e.hd) && l.createElement("span", {
                className: "hd-tag"
            }, null == e ? void 0 : e.hd)), l.createElement("td", null, null == e ? void 0 : e.format), l.createElement("td", null, l.createElement("button", {
                className: "download-btn",
                onClick: () => I(null == e ? void 0 : e.value)
            }, l.createElement("img", {
                src: i.A,
                alt: "yt1s",
                width: "20"
            }), " Download"))))))), "mp3" === w && l.createElement("table", {
                className: "content-table"
            }, l.createElement("thead", null, l.createElement("tr", null, l.createElement("th", null, "File type"), l.createElement("th", null, "Format"), l.createElement("th", null, "Action"))), l.createElement("tbody", null, [{
                quality: "MP3 - 320kbps",
                format: "Auto",
                value: "mp3"
            }, {
                quality: "MP3 - 256kbps",
                format: "Auto",
                value: "mp3"
            }, {
                quality: "MP3 - 128kbps",
                format: "Auto",
                value: "mp3"
            }].map((e => l.createElement("tr", null, l.createElement("td", null, null == e ? void 0 : e.quality), l.createElement("td", null, null == e ? void 0 : e.format), l.createElement("td", null, l.createElement("button", {
                className: "download-btn",
                onClick: () => I(null == e ? void 0 : e.value)
            }, l.createElement("img", {
                src: i.A,
                alt: "yt1s",
                width: "20"
            }), " Download")))))))))), l.createElement(n.Script, {
                async: !0,
                "data-cfasync": "false",
                "data-size": "300x250",
                "data-category": "common",
                "data-id": "dl-banner-300x250",
                "data-zone": "8998587",
                src: "//koaptouw.com/btag.min.js"
            })), l.createElement(s.A, {
                isOpen: g,
                onClose: () => {
                    window.open("https://ak.stikroltiltoowi.net/4/8998572"),
                    v(!1),
                    f({}),
                    M(null),
                    clearInterval(T.current),
                    clearTimeout(L.current),
                    T.current = null,
                    L.current = null,
                    j = 0
                }
                ,
                title: (null == m ? void 0 : m.title) || `https://www.youtubse.com/watch?v=${t}`
            }, k && l.createElement("div", {
                className: "modal-preparation"
            }, l.createElement("div", {
                className: "loader-wrapper"
            }, l.createElement("img", {
                alt: "logo",
                src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' style='margin:auto;background:%23fff;display:block;' width='100px' height='100px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3E%3Cg transform='translate(20 50)'%3E%3Ccircle cx='0' cy='0' r='6' fill='%23e15b64'%3E%3CanimateTransform attributeName='transform' type='scale' begin='-0.375s' calcMode='spline' keySplines='0.3 0 0.7 1;0.3 0 0.7 1' values='0;1;0' keyTimes='0;0.5;1' dur='1s' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/circle%3E%3C/g%3E%3Cg transform='translate(40 50)'%3E%3Ccircle cx='0' cy='0' r='6' fill='%23f8b26a'%3E%3CanimateTransform attributeName='transform' type='scale' begin='-0.25s' calcMode='spline' keySplines='0.3 0 0.7 1;0.3 0 0.7 1' values='0;1;0' keyTimes='0;0.5;1' dur='1s' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/circle%3E%3C/g%3E%3Cg transform='translate(60 50)'%3E%3Ccircle cx='0' cy='0' r='6' fill='%23abbd81'%3E%3CanimateTransform attributeName='transform' type='scale' begin='-0.125s' calcMode='spline' keySplines='0.3 0 0.7 1;0.3 0 0.7 1' values='0;1;0' keyTimes='0;0.5;1' dur='1s' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/circle%3E%3C/g%3E%3Cg transform='translate(80 50)'%3E%3Ccircle cx='0' cy='0' r='6' fill='%2381a3bd'%3E%3CanimateTransform attributeName='transform' type='scale' begin='0s' calcMode='spline' keySplines='0.3 0 0.7 1;0.3 0 0.7 1' values='0;1;0' keyTimes='0;0.5;1' dur='1s' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/circle%3E%3C/g%3E%3C/svg%3E"
            })), l.createElement("p", null, l.createElement("b", null, "Please wait while the file is being prepared for downloading")), l.createElement("div", {
                className: "download-progress"
            }, l.createElement("div", {
                className: "progress-bar",
                style: {
                    width: `${Math.floor(((null == p ? void 0 : p.progress) || 0) / 10)}%`
                }
            }, l.createElement("span", null, Math.floor(((null == p ? void 0 : p.progress) || 0) / 10), "%")))), N && !k && l.createElement("div", {
                className: "errorMessage"
            }, N), !k && !N && p.download_url && l.createElement(l.Fragment, null, l.createElement("div", {
                className: "download-section"
            }, l.createElement("a", {
                onClick: () => (e => {
                    window.open("https://p.oceansaver.in/ajax/ad/l.php"),
                    window.location.href = null == e ? void 0 : e.download_url
                }
                )(p),
                className: "download-button"
            }, l.createElement(r.S, {
                className: "download-icon",
                src: "../images/downloadIcon.svg",
                placeholder: "none",
                alt: "Download",
                width: 23,
                quality: 50,
                __imageData: a(718)
            }), "Download Now")), l.createElement("div", null, l.createElement("p", {
                className: "thank-you-text"
            }, "Thank you for using our service. If you could share our website with your friends, that would be a huge help. ", l.createElement("br", null)), l.createElement("p", {
                className: "thank-you-text"
            }, l.createElement("br", null), " ", l.createElement("strong", null, "Thank you."))))), l.createElement("div", {
                className: d.qr
            }, l.createElement("div", {
                className: d.Vv
            }, l.createElement(n.Link, {
                className: d.xd,
                to: "/contact-us"
            }, "Contact us"), l.createElement(n.Link, {
                className: d.xd,
                to: "/privacy-policy"
            }, "Privacy Policy"), l.createElement(n.Link, {
                className: d.xd,
                to: "/terms-of-service"
            }, "Terms of service")), l.createElement("p", {
                className: d.Cv
            }, "© 2025 yt1s.com.co")))
        }
        ;
        const m = () => l.createElement(l.Fragment, null, l.createElement("html", {
            lang: "en"
        }), l.createElement("title", null, "Yt1s - YouTube Downloader | YouTube Video Downloader for Free"), l.createElement("meta", {
            name: "description",
            content: "Yt1s is a YouTube Video Downloader which Allows you to Download Videos and audio from YouTube Free and Easy It's Simple and Fastest YouTube Video Downloader."
        }), l.createElement("meta", {
            name: "robots",
            content: "noindex,nofollow"
        }), l.createElement("link", {
            rel: "canonical",
            href: "https://yt1s.com.co/download/"
        }))
    },
    48746: function(e, t) {
        t.A = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiBmaWxsPSIjZmZmIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGQ9Ik0xOC4zMTMgMTMuNjI1aC00LjAzMVY3LjAzMUExLjA0IDEuMDQgMCAwIDAgMTMuMjUxIDZIOS4yMmMtLjU5NCAwLTEuMDYzLjQ2OS0xLjA2MyAxLjAzMXY2LjU5NEg0LjEyNmMtLjUzMSAwLS43MTkuMzQ0LS4zMTMuNzVsNi42ODggNi42NTZjLjE4OC4xODguNDM4LjI4MS43MTkuMjgxcy41NjMtLjA5NC43NS0uMjgxbDYuNjU2LTYuNjU2Yy4zNzUtLjQwNi4yNS0uNzUtLjMxMy0uNzVNMCAxOC4zNDR2Ny4xMjVjMCAuMzEzLjE1Ni41LjUuNWgyMS4zNzVjLjM0NCAwIC41MzEtLjE4OC41MzEtLjV2LTcuMTI1YS41MjYuNTI2IDAgMCAwLS41MzEtLjUzMWgtMi4wMzFhLjU1LjU1IDAgMCAwLS41MzEuNTMxdjQuNTMxSDMuMDYzdi00LjUzMWMwLS4zMTMtLjIxOS0uNTMxLS41LS41MzFILjVjLS4yODEgMC0uNS4yNS0uNS41MzEiLz48L3N2Zz4="
    },
    35478: function(e) {
        e.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#e81808","images":{"fallback":{"src":"/static/54d5827b66b6d667a827da372d4c6282/421a6/logo.svg","srcSet":"/static/54d5827b66b6d667a827da372d4c6282/c27ca/logo.svg 9w,\\n/static/54d5827b66b6d667a827da372d4c6282/b6497/logo.svg 19w,\\n/static/54d5827b66b6d667a827da372d4c6282/421a6/logo.svg 37w","sizes":"(min-width: 37px) 37px, 100vw"},"sources":[{"srcSet":"/static/54d5827b66b6d667a827da372d4c6282/eea8e/logo.webp 9w,\\n/static/54d5827b66b6d667a827da372d4c6282/4a249/logo.webp 19w,\\n/static/54d5827b66b6d667a827da372d4c6282/1008e/logo.webp 37w","type":"image/webp","sizes":"(min-width: 37px) 37px, 100vw"}]},"width":37,"height":28}')
    },
    718: function(e) {
        e.exports = JSON.parse('{"layout":"constrained","images":{"fallback":{"src":"/static/fd896093f98233af2e4a68758c3401f5/8a4b0/downloadIcon.svg","srcSet":"/static/fd896093f98233af2e4a68758c3401f5/6fd5a/downloadIcon.svg 6w,\\n/static/fd896093f98233af2e4a68758c3401f5/91fc7/downloadIcon.svg 12w,\\n/static/fd896093f98233af2e4a68758c3401f5/8a4b0/downloadIcon.svg 23w,\\n/static/fd896093f98233af2e4a68758c3401f5/83b12/downloadIcon.svg 46w","sizes":"(min-width: 23px) 23px, 100vw"},"sources":[{"srcSet":"/static/fd896093f98233af2e4a68758c3401f5/cc3eb/downloadIcon.webp 6w,\\n/static/fd896093f98233af2e4a68758c3401f5/8bebd/downloadIcon.webp 12w,\\n/static/fd896093f98233af2e4a68758c3401f5/e2b2c/downloadIcon.webp 23w,\\n/static/fd896093f98233af2e4a68758c3401f5/7bd4a/downloadIcon.webp 46w","type":"image/webp","sizes":"(min-width: 23px) 23px, 100vw"}]},"width":23,"height":23}')
    }
}]);
//# sourceMappingURL=component---src-pages-download-js-6a53459b4ce1ff6c7c2f.js.map
