exports.id = 210;
exports.ids = [210];
exports.modules = {

/***/ 36292:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ modules)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/redux-logger@3.0.6/node_modules/redux-logger/dist/redux-logger.js
var redux_logger = __webpack_require__(83054);
// EXTERNAL MODULE: ./node_modules/.pnpm/redux-saga@1.1.3/node_modules/redux-saga/dist/redux-saga-core-npm-proxy.cjs.js
var redux_saga_core_npm_proxy_cjs = __webpack_require__(46806);
var redux_saga_core_npm_proxy_cjs_default = /*#__PURE__*/__webpack_require__.n(redux_saga_core_npm_proxy_cjs);
// EXTERNAL MODULE: ./node_modules/.pnpm/next-redux-wrapper@7.0.5_476bf21d40d59fe20edacbedbec93d2e/node_modules/next-redux-wrapper/lib/index.js
var lib = __webpack_require__(17617);
// EXTERNAL MODULE: ./node_modules/.pnpm/redux-devtools-extension@2.13.9_redux@4.1.1/node_modules/redux-devtools-extension/index.js
var redux_devtools_extension = __webpack_require__(14703);
// EXTERNAL MODULE: ./node_modules/.pnpm/redux@4.1.1/node_modules/redux/lib/redux.js
var redux = __webpack_require__(22469);
// EXTERNAL MODULE: ./modules/search.js
var search = __webpack_require__(45134);
;// CONCATENATED MODULE: ./modules/reducers/index.js




const rootReducer = (state, action) => {
  switch (action.type) {
    case lib.HYDRATE:
      return action.payload;

    default:
      const combineReducer = (0,redux.combineReducers)({
        search: search/* search */.y
      }); // 이 안에 리듀서 넣기

      return combineReducer(state, action);
  }
};

/* harmony default export */ const reducers = (rootReducer);
// EXTERNAL MODULE: ./node_modules/.pnpm/redux-saga@1.1.3/node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.cjs.js
var redux_saga_effects_npm_proxy_cjs = __webpack_require__(52196);
;// CONCATENATED MODULE: ./modules/sagas/index.js

function* rootSaga() {
  yield (0,redux_saga_effects_npm_proxy_cjs.all)([]);
}
;// CONCATENATED MODULE: ./modules/index.js








const configureStore = () => {
  const logger = (0,redux_logger.createLogger)();
  const sagaMiddleware = redux_saga_core_npm_proxy_cjs_default()();
  const middlewares = [logger, sagaMiddleware];
  const store = (0,redux.createStore)(reducers, (0,redux_devtools_extension/* composeWithDevTools */.Uo)((0,redux.applyMiddleware)(...middlewares)));
  sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = (0,lib.createWrapper)(configureStore);
/* harmony default export */ const modules = (wrapper);

/***/ }),

/***/ 88406:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38288);
/* harmony import */ var _modules_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36292);
/* harmony import */ var next_auth_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76932);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4637);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @next/next/no-page-custom-font */

/* eslint-disable @next/next/no-sync-scripts */








function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(next_head__WEBPACK_IMPORTED_MODULE_0__.default, {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("title", {
        children: "\uB358\uD30C\uB79C\uB4DC"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("link", {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("link", {
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css",
        rel: "stylesheet",
        integrity: "sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU",
        crossOrigin: "anonymous"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("script", {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js",
        integrity: "sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ",
        crossOrigin: "anonymous"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("link", {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.0/font/bootstrap-icons.css"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("link", {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("link", {
        rel: "preconnect",
        href: "https://fonts.gstatic.com"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("link", {
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap",
        rel: "stylesheet"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("script", {
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6213316268216160",
        crossOrigin: "anonymous"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(next_auth_client__WEBPACK_IMPORTED_MODULE_2__/* .Provider */ .zt, {
      session: pageProps.session,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(Component, _objectSpread({}, pageProps))
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_modules_index__WEBPACK_IMPORTED_MODULE_1__/* .default.withRedux */ .Z.withRedux(MyApp));

/***/ }),

/***/ 19570:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 19570;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 97020:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"polyfillFiles":["static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js"],"devFiles":[],"ampDevFiles":[],"lowPriorityFiles":["static/GhPgr6qryNIODLUwxyJub/_buildManifest.js","static/GhPgr6qryNIODLUwxyJub/_ssgManifest.js"],"pages":{"/":["static/chunks/webpack-af28476a2e7790fd48db.js","static/chunks/main-726dd3659c1a87890d5b.js","static/chunks/523-e9081e2948b8b0b934d6.js","static/chunks/181-4be7651f2d7268b0cbac.js","static/css/8b0597f4f27c7da098aa.css","static/chunks/pages/index-026fcca91eff05b3c8eb.js"],"/_app":["static/chunks/webpack-af28476a2e7790fd48db.js","static/chunks/main-726dd3659c1a87890d5b.js","static/css/2e0a7207f6cb008f6608.css","static/chunks/pages/_app-89c98ea82a3339c73689.js"],"/_error":["static/chunks/webpack-af28476a2e7790fd48db.js","static/chunks/main-726dd3659c1a87890d5b.js","static/chunks/pages/_error-75dca612a8fabbfd958d.js"],"/adventure":["static/chunks/webpack-af28476a2e7790fd48db.js","static/chunks/main-726dd3659c1a87890d5b.js","static/chunks/523-e9081e2948b8b0b934d6.js","static/chunks/181-4be7651f2d7268b0cbac.js","static/css/a768522a059f0886da53.css","static/chunks/pages/adventure-98cd0bb107918ca5f4f6.js"],"/search":["static/chunks/webpack-af28476a2e7790fd48db.js","static/chunks/main-726dd3659c1a87890d5b.js","static/chunks/523-e9081e2948b8b0b934d6.js","static/chunks/108-10a21848d45662f78ae3.js","static/chunks/181-4be7651f2d7268b0cbac.js","static/css/f974ce8e54b3c7d17e2a.css","static/chunks/pages/search-1bf444a4f546bc080779.js"],"/setting":["static/chunks/webpack-af28476a2e7790fd48db.js","static/chunks/main-726dd3659c1a87890d5b.js","static/chunks/523-e9081e2948b8b0b934d6.js","static/chunks/181-4be7651f2d7268b0cbac.js","static/css/a768522a059f0886da53.css","static/chunks/pages/setting-97eab12c9d6e1517594d.js"],"/test":["static/chunks/webpack-af28476a2e7790fd48db.js","static/chunks/main-726dd3659c1a87890d5b.js","static/chunks/523-e9081e2948b8b0b934d6.js","static/chunks/181-4be7651f2d7268b0cbac.js","static/css/a768522a059f0886da53.css","static/chunks/pages/test-b1a1d62c1dce8fa733d9.js"]},"ampFirstPages":[]}');

/***/ }),

/***/ 73978:
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ 59450:
/***/ ((module) => {

"use strict";
module.exports = {"Dg":[]};

/***/ })

};
;