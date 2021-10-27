exports.id = 122;
exports.ids = [122];
exports.modules = {

/***/ 82181:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Layout)
});

// EXTERNAL MODULE: ./node_modules/styled-jsx/style.js
var style = __webpack_require__(65988);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@11.1.2_react-dom@17.0.2+react@17.0.2/node_modules/next/link.js
var next_link = __webpack_require__(70963);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@11.1.2_react-dom@17.0.2+react@17.0.2/node_modules/next/image.js
var next_image = __webpack_require__(59434);
// EXTERNAL MODULE: ./styles/navbar.module.css
var navbar_module = __webpack_require__(63833);
var navbar_module_default = /*#__PURE__*/__webpack_require__.n(navbar_module);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@11.1.2_react-dom@17.0.2+react@17.0.2/node_modules/next/router.js
var next_router = __webpack_require__(5572);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js
var react = __webpack_require__(59496);
// EXTERNAL MODULE: ./node_modules/.pnpm/next-auth@3.29.0_5ed29e49f7032b49b2eb187fdde81d35/node_modules/next-auth/dist/client/index.js
var client = __webpack_require__(76932);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-popper@2.2.5_838acf1c84808345430cf17171f87518/node_modules/react-popper/lib/cjs/index.js
var cjs = __webpack_require__(98113);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-redux@7.2.5_react-dom@17.0.2+react@17.0.2/node_modules/react-redux/lib/index.js
var lib = __webpack_require__(12107);
// EXTERNAL MODULE: ./modules/search.js
var search = __webpack_require__(45134);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@17.0.2/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4637);
;// CONCATENATED MODULE: ./components/layout/navbar.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












function Navbar() {
  const router = (0,next_router.useRouter)();
  const inputRef = (0,react.useRef)(null); // 캐릭터 검색 이벤트 핸들러 //

  const onSubmit = (0,react.useCallback)(e => {
    e.preventDefault();
    router.push(`/search?charactername=${inputRef.current.value}`, '/search');
    inputRef.current.value = '';
  }, [router]); // 캐릭터 검색 입력에 포커스 //

  (0,react.useEffect)(() => {
    var _inputRef$current;

    inputRef === null || inputRef === void 0 ? void 0 : (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
  }); // 로그인 세션 //

  const [session, loading] = (0,client/* useSession */.kP)(); // popover 세팅 //

  const {
    0: referenceElement,
    1: setReferenceElement
  } = (0,react.useState)(null);
  const {
    0: popperElement,
    1: setPopperElement
  } = (0,react.useState)(null);
  const {
    0: arrowElement,
    1: setArrowElement
  } = (0,react.useState)(null);
  const {
    styles,
    attributes
  } = (0,cjs/* usePopper */.D4)(referenceElement, popperElement, {
    modifiers: [{
      name: 'arrow',
      options: {
        element: arrowElement
      }
    }, {
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  const {
    0: popover,
    1: setPopover
  } = (0,react.useState)(false);
  const popRef = (0,react.useRef)(null);
  const btnRef = (0,react.useRef)(null); // 검색 설정 //

  const settings = (0,lib.useSelector)(state => state.search);
  const {
    scope,
    wordType,
    filter
  } = settings;
  const dispatch = (0,lib.useDispatch)();
  const onChange = (0,react.useCallback)(({
    target
  }) => {
    dispatch((0,search/* setSettings */.I)({
      type: target.name,
      option: target.value
    }));
  }, [dispatch]); // popper 닫기 이벤트 핸들러 //

  (0,react.useEffect)(() => {
    document.addEventListener('mousedown', e => {
      var _popRef$current, _btnRef$current;

      if (!(popRef !== null && popRef !== void 0 && (_popRef$current = popRef.current) !== null && _popRef$current !== void 0 && _popRef$current.contains(e.target)) && !(btnRef !== null && btnRef !== void 0 && (_btnRef$current = btnRef.current) !== null && _btnRef$current !== void 0 && _btnRef$current.contains(e.target))) setPopover(false);
    });
  }, []);
  return /*#__PURE__*/jsx_runtime.jsx("nav", {
    className: `navbar navbar-expand-md navbar-light bg-light sticky-top shadow-sm ${(navbar_module_default()).Navbar}`,
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: `container-xl`,
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (navbar_module_default()).n1,
        children: [/*#__PURE__*/jsx_runtime.jsx(next_link.default, {
          href: "/",
          children: /*#__PURE__*/jsx_runtime.jsx("a", {
            className: `navbar-brand p-0`,
            children: /*#__PURE__*/jsx_runtime.jsx(next_image.default, {
              src: "/images/DLlogo.png",
              height: "50%",
              width: "50%",
              alt: "homelogo"
            })
          })
        }), /*#__PURE__*/jsx_runtime.jsx("button", {
          className: "navbar-toggler mb-1",
          type: "button",
          "data-bs-toggle": "collapse",
          "data-bs-target": "#navbarSupportedContent",
          "aria-controls": "navbarSupportedContent",
          "aria-expanded": "false",
          "aria-label": "Toggle navigation",
          children: /*#__PURE__*/jsx_runtime.jsx("span", {
            className: "navbar-toggler-icon"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("div", {
          className: `collapse navbar-collapse ${(navbar_module_default()).collapse}`,
          id: "navbarSupportedContent",
          children: /*#__PURE__*/(0,jsx_runtime.jsxs)("ul", {
            className: "navbar-nav mb-2 mb-md-1",
            children: [/*#__PURE__*/jsx_runtime.jsx("li", {
              className: "nav-item",
              children: /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
                href: "/",
                children: /*#__PURE__*/jsx_runtime.jsx("a", {
                  className: "nav-link",
                  children: "\uB7AD\uD0B9"
                })
              })
            }), /*#__PURE__*/(0,jsx_runtime.jsxs)("li", {
              className: "nav-item dropdown",
              children: [/*#__PURE__*/jsx_runtime.jsx("a", {
                className: "nav-link dropdown-toggle",
                id: "navbarDropdown",
                role: "button",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false",
                children: "\uAC8C\uC2DC\uD310"
              }), /*#__PURE__*/(0,jsx_runtime.jsxs)("ul", {
                className: "dropdown-menu",
                "aria-labelledby": "navbarDropdown",
                children: [/*#__PURE__*/jsx_runtime.jsx("li", {
                  children: /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
                    href: "/test",
                    children: /*#__PURE__*/jsx_runtime.jsx("a", {
                      className: "dropdown-item",
                      children: "\uC790\uC720 \uAC8C\uC2DC\uD310"
                    })
                  })
                }), /*#__PURE__*/jsx_runtime.jsx("li", {
                  children: /*#__PURE__*/jsx_runtime.jsx("a", {
                    className: "dropdown-item",
                    onClick: () => router.push('/'),
                    children: "\uC9C8\uBB38 \uAC8C\uC2DC\uD310"
                  })
                }), /*#__PURE__*/jsx_runtime.jsx("li", {
                  children: /*#__PURE__*/jsx_runtime.jsx("hr", {
                    className: "dropdown-divider"
                  })
                }), /*#__PURE__*/jsx_runtime.jsx("li", {
                  children: /*#__PURE__*/jsx_runtime.jsx("a", {
                    className: "dropdown-item",
                    href: "#",
                    children: "\uBB38\uC758\uD558\uAE30"
                  })
                })]
              })]
            }), /*#__PURE__*/jsx_runtime.jsx("li", {
              className: "nav-item",
              children: /*#__PURE__*/jsx_runtime.jsx("a", {
                className: "nav-link",
                children: "\uC0AC\uC774\uD2B8\uC774\uC6A9\uBC95"
              })
            })]
          })
        })]
      }), /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (navbar_module_default()).n1,
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)("form", {
          className: `d-flex mb-3 mb-md-0 pb-1 ms-auto me-auto`,
          onSubmit: onSubmit,
          autoComplete: "on",
          children: [/*#__PURE__*/jsx_runtime.jsx("div", {
            ref: btnRef,
            children: /*#__PURE__*/jsx_runtime.jsx("button", {
              className: `btn ${(navbar_module_default()).settingbtn}`,
              type: "button",
              ref: setReferenceElement,
              onClick: () => setPopover(!popover),
              children: /*#__PURE__*/jsx_runtime.jsx("i", {
                className: `bi bi-gear ${(navbar_module_default()).icon}`
              })
            })
          }), /*#__PURE__*/jsx_runtime.jsx("input", {
            className: "form-control",
            type: "search",
            placeholder: scope === 'character' ? '캐릭터명' : '모험단명',
            style: {
              borderRadius: 0,
              borderRight: 0,
              borderLeft: 0
            },
            size: "10",
            maxLength: "12",
            required: true,
            ref: inputRef
          }), /*#__PURE__*/jsx_runtime.jsx("button", {
            className: "btn btn-outline-primary",
            type: "submit",
            style: {
              whiteSpace: 'nowrap',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            },
            children: "\uAC80\uC0C9"
          })]
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", _objectSpread(_objectSpread({
        ref: setPopperElement,
        style: styles.popper,
        className: `${(navbar_module_default()).pop} ${popover && (navbar_module_default()).show} shadow-sm`
      }, attributes.popper), {}, {
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          ref: popRef,
          children: [/*#__PURE__*/jsx_runtime.jsx("div", {
            style: {
              borderBottom: '1px solid #b6b6b6',
              lineHeight: '40px'
            },
            children: /*#__PURE__*/jsx_runtime.jsx("p", {
              className: "text-center",
              children: "\uAC80\uC0C9 \uC124\uC815"
            })
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            style: {
              padding: '20px'
            },
            children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
              className: "d-flex",
              children: [/*#__PURE__*/jsx_runtime.jsx("div", {
                className: (navbar_module_default()).f1,
                children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
                  className: `form-check form-check-inline`,
                  children: [/*#__PURE__*/jsx_runtime.jsx("input", {
                    className: "form-check-input",
                    type: "radio",
                    name: "scope",
                    id: "inlineRadio1",
                    value: "character",
                    checked: scope === 'character',
                    onChange: onChange
                  }), /*#__PURE__*/jsx_runtime.jsx("label", {
                    className: "form-check-label mb-1",
                    htmlFor: "inlineRadio1",
                    style: {
                      whiteSpace: 'nowrap'
                    },
                    children: "\uCE90\uB9AD\uD130"
                  })]
                })
              }), /*#__PURE__*/jsx_runtime.jsx("div", {
                className: (navbar_module_default()).f1,
                children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
                  className: `form-check form-check-inline`,
                  children: [/*#__PURE__*/jsx_runtime.jsx("input", {
                    className: "form-check-input",
                    type: "radio",
                    name: "scope",
                    id: "inlineRadio2",
                    value: "adventure",
                    checked: scope === 'adventure',
                    onChange: onChange
                  }), /*#__PURE__*/jsx_runtime.jsx("label", {
                    className: "form-check-label",
                    htmlFor: "inlineRadio2",
                    children: "\uBAA8\uD5D8\uB2E8"
                  })]
                })
              })]
            }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
              className: "d-flex",
              children: [/*#__PURE__*/jsx_runtime.jsx("div", {
                className: (navbar_module_default()).f1,
                children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
                  className: "form-check form-check-inline",
                  children: [/*#__PURE__*/jsx_runtime.jsx("input", {
                    className: "form-check-input",
                    type: "radio",
                    name: "wordType",
                    id: "inlineRadio3",
                    value: "match",
                    checked: wordType === 'match',
                    onChange: onChange
                  }), /*#__PURE__*/jsx_runtime.jsx("label", {
                    className: "form-check-label mb-1",
                    htmlFor: "inlineRadio3",
                    style: {
                      whiteSpace: 'nowrap'
                    },
                    children: "\uB3D9\uC77C \uB2E8\uC5B4"
                  })]
                })
              }), /*#__PURE__*/jsx_runtime.jsx("div", {
                className: (navbar_module_default()).f1,
                children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
                  className: "form-check form-check-inline",
                  children: [/*#__PURE__*/jsx_runtime.jsx("input", {
                    className: "form-check-input",
                    type: "radio",
                    name: "wordType",
                    id: "inlineRadio4",
                    value: "full",
                    checked: wordType === 'full',
                    onChange: onChange
                  }), /*#__PURE__*/jsx_runtime.jsx("label", {
                    className: "form-check-label",
                    htmlFor: "inlineRadio4",
                    children: "\uC804\uBB38 \uAC80\uC0C9"
                  })]
                })
              })]
            }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
              className: "d-flex",
              children: [/*#__PURE__*/jsx_runtime.jsx("div", {
                className: (navbar_module_default()).f1,
                children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
                  className: "form-check form-check-inline",
                  children: [/*#__PURE__*/jsx_runtime.jsx("input", {
                    className: "form-check-input",
                    type: "radio",
                    name: "filter",
                    id: "inlineRadio5",
                    value: "true",
                    checked: filter === 'true',
                    onChange: onChange
                  }), /*#__PURE__*/jsx_runtime.jsx("label", {
                    className: "form-check-label",
                    htmlFor: "inlineRadio5",
                    style: {
                      whiteSpace: 'nowrap'
                    },
                    children: "100\uB808\uBCA8 \uC774\uC0C1"
                  })]
                })
              }), /*#__PURE__*/jsx_runtime.jsx("div", {
                className: (navbar_module_default()).f1,
                children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
                  className: "form-check form-check-inline",
                  children: [/*#__PURE__*/jsx_runtime.jsx("input", {
                    className: "form-check-input",
                    type: "radio",
                    name: "filter",
                    id: "inlineRadio6",
                    value: "false",
                    checked: filter === 'false',
                    onChange: onChange
                  }), /*#__PURE__*/jsx_runtime.jsx("label", {
                    className: "form-check-label",
                    htmlFor: "inlineRadio6",
                    children: "\uBAA8\uB4E0 \uB808\uBCA8"
                  })]
                })
              })]
            })]
          })]
        }), /*#__PURE__*/jsx_runtime.jsx("div", {
          ref: setArrowElement,
          style: styles.arrow,
          className: (navbar_module_default()).arrow
        })]
      })), /*#__PURE__*/jsx_runtime.jsx("div", {
        className: `mb-2 mb-md-0 d-flex justify-content-end ${(navbar_module_default()).n1}`,
        children: !session ? /*#__PURE__*/jsx_runtime.jsx("a", {
          onClick: () => (0,client/* signIn */.zB)('kakao'),
          children: /*#__PURE__*/jsx_runtime.jsx(next_image.default, {
            alt: "loginbtn",
            src: "/images/kakao_login_medium_narrow.png",
            width: 183,
            height: 45
          })
        }) : /*#__PURE__*/(0,jsx_runtime.jsxs)("ul", {
          className: "navbar-nav mb-2 mb-md-1",
          children: [/*#__PURE__*/jsx_runtime.jsx("li", {
            className: "nav-item",
            children: /*#__PURE__*/jsx_runtime.jsx("a", {
              className: "nav-link",
              href: "#",
              children: "\uB9C8\uC774\uD398\uC774\uC9C0"
            })
          }), /*#__PURE__*/jsx_runtime.jsx("li", {
            className: "nav-item",
            children: /*#__PURE__*/jsx_runtime.jsx("a", {
              className: "nav-link",
              href: "#",
              children: "\uC124\uC815"
            })
          }), /*#__PURE__*/jsx_runtime.jsx("li", {
            children: /*#__PURE__*/jsx_runtime.jsx("a", {
              className: "nav-link",
              onClick: client/* signOut */.w7,
              children: "\uB85C\uADF8\uC544\uC6C3"
            })
          })]
        })
      })]
    })
  });
}
// EXTERNAL MODULE: ./styles/layout.module.css
var layout_module = __webpack_require__(2490);
var layout_module_default = /*#__PURE__*/__webpack_require__.n(layout_module);
// EXTERNAL MODULE: ./styles/footer.module.css
var footer_module = __webpack_require__(59803);
var footer_module_default = /*#__PURE__*/__webpack_require__.n(footer_module);
;// CONCATENATED MODULE: ./components/layout/footer.js





function Footer() {
  return /*#__PURE__*/jsx_runtime.jsx("div", {
    className: `p-3 pb-0 bg-light ${(footer_module_default()).footer}`,
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: `d-flex container-xl justify-content-between ${(footer_module_default()).container}`,
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: `${(footer_module_default()).devprof} ${(footer_module_default()).container}`,
        children: [/*#__PURE__*/jsx_runtime.jsx("h4", {
          children: "\uB358\uD30C\uB79C\uB4DC \uAC1C\uBC1C\uC790"
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: `d-flex`,
          children: [/*#__PURE__*/jsx_runtime.jsx("div", {
            children: /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
              href: `/search?charactername=${encodeURIComponent('고운말_7794')}`,
              children: /*#__PURE__*/jsx_runtime.jsx("a", {
                children: /*#__PURE__*/jsx_runtime.jsx(next_image.default, {
                  loader: ({
                    src,
                    width
                  }) => `${src}&w=${width}`,
                  alt: "",
                  src: "https://img-api.neople.co.kr/df/servers/cain/characters/4ecd3f9eea4b6dd87044a9d9323efd20?zoom=1",
                  width: "100",
                  height: "115"
                })
              })
            })
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: `align-self-center`,
            children: /*#__PURE__*/(0,jsx_runtime.jsxs)("h5", {
              children: ["\uBAA8\uD5D8\uB2E8\uBA85:", ' ', /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
                href: `/search?adventure=${encodeURIComponent('변태소녀')}`,
                children: /*#__PURE__*/jsx_runtime.jsx("a", {
                  className: "link-primary",
                  children: "\uBCC0\uD0DC\uC18C\uB140"
                })
              }), /*#__PURE__*/jsx_runtime.jsx("br", {}), "\uBCF8\uCE90\uBA85:", ' ', /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
                href: `/search?charactername=${encodeURIComponent('고운말_7794')}`,
                children: /*#__PURE__*/jsx_runtime.jsx("a", {
                  className: "link-primary",
                  children: "\uACE0\uC6B4\uB9D0_7794"
                })
              }), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
                href: "http://df.nexon.com/df/guild/search/detail?guId=10163541&page=1&gname=%BA%EE%B9%CC%BF%AC%C7%D5",
                children: /*#__PURE__*/(0,jsx_runtime.jsxs)("a", {
                  className: "link-primary",
                  children: [/*#__PURE__*/jsx_runtime.jsx(next_image.default, {
                    alt: "",
                    src: "/images/icon02 copy6.png",
                    width: "28",
                    height: "28"
                  }), "\uBE1C\uBBF8\uC5F0\uD569"]
                })
              }), ' ', "\uAE38\uB4DC\uB9C8\uC2A4\uD130"]
            })
          })]
        })]
      }), /*#__PURE__*/jsx_runtime.jsx("div", {
        className: `d-flex align-items-center justify-content-center ${(footer_module_default()).container}`,
        children: /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
          href: "http://developers.neople.co.kr",
          target: "_blank",
          children: /*#__PURE__*/jsx_runtime.jsx("a", {
            children: /*#__PURE__*/jsx_runtime.jsx(next_image.default, {
              alt: "openapi",
              src: "/images/row_color.png",
              height: "36",
              width: "191"
            })
          })
        })
      }), /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (footer_module_default()).container,
        children: /*#__PURE__*/jsx_runtime.jsx("p", {
          className: "text-secondary",
          children: "Copyright 2021. dnfland all rights reserved."
        })
      })]
    })
  });
}
// EXTERNAL MODULE: ./styles/mainbox.module.css
var mainbox_module = __webpack_require__(25232);
var mainbox_module_default = /*#__PURE__*/__webpack_require__.n(mainbox_module);
;// CONCATENATED MODULE: ./components/box/mainbox.js



function MainBox({
  children
}) {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: `${(mainbox_module_default()).container}`,
    children: [/*#__PURE__*/jsx_runtime.jsx("div", {
      className: `${(mainbox_module_default()).ad}`
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: `p-0 ${(mainbox_module_default()).contentbox}`,
      children: children
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: `${(mainbox_module_default()).ad}`
    })]
  });
}
;// CONCATENATED MODULE: ./components/layout/layout.js







function Layout(props) {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "jsx-1084485634" + " " + `${(layout_module_default()).layout}`,
    children: [/*#__PURE__*/jsx_runtime.jsx(style.default, {
      id: "1084485634",
      children: ["html,body,body>div:first-child,div#__next,div#__next>div{height:100%;}"]
    }), /*#__PURE__*/jsx_runtime.jsx(Navbar, {}), /*#__PURE__*/jsx_runtime.jsx(MainBox, {
      children: props.children
    }), props.home && /*#__PURE__*/jsx_runtime.jsx(Footer, {})]
  });
}

/***/ }),

/***/ 45134:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ setSettings),
/* harmony export */   "y": () => (/* binding */ search)
/* harmony export */ });
/* harmony import */ var redux_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(83045);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const SET_SETTINGS = 'search/SET_SETTINGS';
const initialState = {
  scope: 'character',
  // 캐릭터 character || 모험단 adventure
  wordType: 'match',
  // 동일 단어 match || 전문 검색 full
  filter: 'true' // 100레벨 필터 true || false

};
const setSettings = (0,redux_actions__WEBPACK_IMPORTED_MODULE_0__/* .createAction */ .PH)(SET_SETTINGS, ({
  type,
  option
}) => ({
  type,
  option
}));
const search = (0,redux_actions__WEBPACK_IMPORTED_MODULE_0__/* .handleActions */ .jZ)({
  [SET_SETTINGS]: (state, {
    payload: {
      type,
      option
    }
  }) => _objectSpread(_objectSpread({}, state), {}, {
    [type]: option
  })
}, initialState);

/***/ }),

/***/ 59803:
/***/ ((module) => {

// Exports
module.exports = {
	"footer": "footer_footer__A2QDl",
	"devprof": "footer_devprof__2cQ0b",
	"container": "footer_container__29W2-"
};


/***/ }),

/***/ 2490:
/***/ ((module) => {

// Exports
module.exports = {
	"layout": "layout_layout__2yIW4"
};


/***/ }),

/***/ 25232:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "mainbox_container__1F92K",
	"contentbox": "mainbox_contentbox__2k2Pd",
	"ad": "mainbox_ad__34M3S"
};


/***/ }),

/***/ 63833:
/***/ ((module) => {

// Exports
module.exports = {
	"Navbar": "navbar_Navbar__VtzCx",
	"form": "navbar_form__1VZl-",
	"collapse": "navbar_collapse__2ILSE",
	"n1": "navbar_n1__a4FbC",
	"f1": "navbar_f1__1Ub6Z",
	"settingbtn": "navbar_settingbtn__1FFD9",
	"icon": "navbar_icon__3tz2X",
	"pop": "navbar_pop__3Nw2r",
	"show": "navbar_show__2uJZ_",
	"arrow": "navbar_arrow__h_WGu"
};


/***/ }),

/***/ 61733:
/***/ (() => {

/* (ignored) */

/***/ })

};
;