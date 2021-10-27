"use strict";
exports.id = 209;
exports.ids = [209];
exports.modules = {

/***/ 31519:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ modules)
});

// EXTERNAL MODULE: ./node_modules/redux-logger/dist/redux-logger.js
var redux_logger = __webpack_require__(94500);
// EXTERNAL MODULE: ./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.cjs.js
var redux_saga_core_npm_proxy_cjs = __webpack_require__(51523);
var redux_saga_core_npm_proxy_cjs_default = /*#__PURE__*/__webpack_require__.n(redux_saga_core_npm_proxy_cjs);
// EXTERNAL MODULE: ./node_modules/next-redux-wrapper/lib/index.js
var lib = __webpack_require__(30876);
// EXTERNAL MODULE: ./node_modules/redux-devtools-extension/index.js
var redux_devtools_extension = __webpack_require__(28500);
// EXTERNAL MODULE: ./node_modules/next-redux-cookie-wrapper/dist/index.js
var dist = __webpack_require__(37331);
// EXTERNAL MODULE: ./node_modules/@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js
var redux_toolkit_cjs_production_min = __webpack_require__(47389);
// EXTERNAL MODULE: ./node_modules/redux/lib/redux.js
var redux = __webpack_require__(35281);
// EXTERNAL MODULE: ./modules/search.js
var search = __webpack_require__(93071);
// EXTERNAL MODULE: ./node_modules/redux-actions/lib/index.js
var redux_actions_lib = __webpack_require__(89848);
;// CONCATENATED MODULE: ./modules/character.js

const LOAD_USER = 'search/LOAD_USER';
const loadUser = (0,redux_actions_lib/* createAction */.PH)(LOAD_USER, userId => userId);
const initialState = {
  searchLoading: false
};
function* setUserSaga(action) {
  yield;
}
const test = 'test';
const tester = (0,redux_actions_lib/* createAction */.PH)(test);
const character = (0,redux_actions_lib/* handleActions */.jZ)({
  [LOAD_USER]: (state, action) => state,
  [test]: (state, action) => {
    console.log('ang');
  }
}, initialState);
;// CONCATENATED MODULE: ./modules/reducers/index.js





const rootReducer = (state, action) => {
  switch (action.type) {
    case lib.HYDRATE:
      return state;

    default:
      const combineReducer = (0,redux.combineReducers)({
        search: search/* search */.y,
        character: character
      }); // 이 안에 리듀서 넣기

      return combineReducer(state, action);
  }
};

/* harmony default export */ const reducers = (rootReducer);
// EXTERNAL MODULE: ./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.cjs.js
var redux_saga_effects_npm_proxy_cjs = __webpack_require__(73375);
;// CONCATENATED MODULE: ./modules/sagas/index.js

function* rootSaga() {
  yield (0,redux_saga_effects_npm_proxy_cjs.all)([]);
}
;// CONCATENATED MODULE: ./modules/index.js










const store = () => {
  const logger = (0,redux_logger.createLogger)();
  const sagaMiddleware = redux_saga_core_npm_proxy_cjs_default()();
  const middlewares = [logger, sagaMiddleware];
  const store = (0,redux_toolkit_cjs_production_min.configureStore)({
    reducer: reducers,
    middleware: middlewares // dasdasd

  });
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = (0,lib.createWrapper)(store);
/* harmony default export */ const modules = (wrapper);

/***/ }),

/***/ 7672:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9008);
/* harmony import */ var _modules_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31519);
/* harmony import */ var next_auth_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48633);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(85893);
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

/***/ 97020:
/***/ ((module) => {

module.exports = JSON.parse('{"polyfillFiles":["static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js"],"devFiles":[],"ampDevFiles":[],"lowPriorityFiles":["static/y0LpFq1LRn-SlLCFg7vBp/_buildManifest.js","static/y0LpFq1LRn-SlLCFg7vBp/_ssgManifest.js"],"pages":{"/":["static/chunks/webpack-655b6d7689a7ae56cf07.js","static/chunks/framework-7ca91e23eda17187b798.js","static/chunks/main-f8eaab94bd87644df4ca.js","static/chunks/504-6e5e6b5e2c6e16fd486d.js","static/chunks/76-4a73cb77b2e98ca284cc.js","static/css/18510aab5830f3c31eed.css","static/chunks/pages/index-2561b0a9d1f2bfd70ebf.js"],"/_app":["static/chunks/webpack-655b6d7689a7ae56cf07.js","static/chunks/framework-7ca91e23eda17187b798.js","static/chunks/main-f8eaab94bd87644df4ca.js","static/css/2e0a7207f6cb008f6608.css","static/chunks/pages/_app-1ce7dabac358ccd06a0a.js"],"/_error":["static/chunks/webpack-655b6d7689a7ae56cf07.js","static/chunks/framework-7ca91e23eda17187b798.js","static/chunks/main-f8eaab94bd87644df4ca.js","static/chunks/pages/_error-7c0021887b48cacd1423.js"],"/adventure":["static/chunks/webpack-655b6d7689a7ae56cf07.js","static/chunks/framework-7ca91e23eda17187b798.js","static/chunks/main-f8eaab94bd87644df4ca.js","static/chunks/504-6e5e6b5e2c6e16fd486d.js","static/chunks/76-4a73cb77b2e98ca284cc.js","static/css/e876cd426c46a39e1d3d.css","static/chunks/pages/adventure-fe60d40e2ac0b939e176.js"],"/board":["static/chunks/webpack-655b6d7689a7ae56cf07.js","static/chunks/framework-7ca91e23eda17187b798.js","static/chunks/main-f8eaab94bd87644df4ca.js","static/chunks/504-6e5e6b5e2c6e16fd486d.js","static/chunks/76-4a73cb77b2e98ca284cc.js","static/css/e876cd426c46a39e1d3d.css","static/chunks/pages/board-8405cbc13f11a47a0ddc.js"],"/board/notice":["static/chunks/webpack-655b6d7689a7ae56cf07.js","static/chunks/framework-7ca91e23eda17187b798.js","static/chunks/main-f8eaab94bd87644df4ca.js","static/chunks/504-6e5e6b5e2c6e16fd486d.js","static/chunks/76-4a73cb77b2e98ca284cc.js","static/css/e876cd426c46a39e1d3d.css","static/chunks/pages/board/notice-e97a5ff0d4df20ac1026.js"],"/board/post/[id]":["static/chunks/webpack-655b6d7689a7ae56cf07.js","static/chunks/framework-7ca91e23eda17187b798.js","static/chunks/main-f8eaab94bd87644df4ca.js","static/chunks/504-6e5e6b5e2c6e16fd486d.js","static/chunks/76-4a73cb77b2e98ca284cc.js","static/css/e876cd426c46a39e1d3d.css","static/chunks/pages/board/post/[id]-4b48193b89f8350b1e6d.js"],"/board/write":["static/chunks/webpack-655b6d7689a7ae56cf07.js","static/chunks/framework-7ca91e23eda17187b798.js","static/chunks/main-f8eaab94bd87644df4ca.js","static/css/558bfc5827ae08b2a56c.css","static/chunks/504-6e5e6b5e2c6e16fd486d.js","static/chunks/76-4a73cb77b2e98ca284cc.js","static/css/ff9935f395afc7266297.css","static/chunks/pages/board/write-55eb36279422bf3e69dd.js"],"/help":["static/chunks/webpack-655b6d7689a7ae56cf07.js","static/chunks/framework-7ca91e23eda17187b798.js","static/chunks/main-f8eaab94bd87644df4ca.js","static/chunks/504-6e5e6b5e2c6e16fd486d.js","static/chunks/76-4a73cb77b2e98ca284cc.js","static/css/e876cd426c46a39e1d3d.css","static/chunks/pages/help-d73b01a83e5cb90b7c29.js"],"/rank":["static/chunks/webpack-655b6d7689a7ae56cf07.js","static/chunks/framework-7ca91e23eda17187b798.js","static/chunks/main-f8eaab94bd87644df4ca.js","static/chunks/504-6e5e6b5e2c6e16fd486d.js","static/chunks/76-4a73cb77b2e98ca284cc.js","static/css/e876cd426c46a39e1d3d.css","static/chunks/pages/rank-fe2260bf27359cb8fbda.js"],"/search":["static/chunks/webpack-655b6d7689a7ae56cf07.js","static/chunks/framework-7ca91e23eda17187b798.js","static/chunks/main-f8eaab94bd87644df4ca.js","static/chunks/504-6e5e6b5e2c6e16fd486d.js","static/chunks/669-8e6195d52d1673b24127.js","static/chunks/76-4a73cb77b2e98ca284cc.js","static/css/6d7b07800b4d78c48e00.css","static/chunks/pages/search-5993caec1cf5e6aa532d.js"],"/setting":["static/chunks/webpack-655b6d7689a7ae56cf07.js","static/chunks/framework-7ca91e23eda17187b798.js","static/chunks/main-f8eaab94bd87644df4ca.js","static/chunks/504-6e5e6b5e2c6e16fd486d.js","static/chunks/76-4a73cb77b2e98ca284cc.js","static/css/e876cd426c46a39e1d3d.css","static/chunks/pages/setting-7f049c0190a1e612c4d2.js"],"/test":["static/chunks/webpack-655b6d7689a7ae56cf07.js","static/chunks/framework-7ca91e23eda17187b798.js","static/chunks/main-f8eaab94bd87644df4ca.js","static/chunks/504-6e5e6b5e2c6e16fd486d.js","static/chunks/76-4a73cb77b2e98ca284cc.js","static/css/e876cd426c46a39e1d3d.css","static/chunks/pages/test-524a366e45ad34fa7066.js"]},"ampFirstPages":[]}');

/***/ }),

/***/ 73978:
/***/ ((module) => {

module.exports = JSON.parse('{"..\\\\components\\\\common\\\\wrappededitor.js -> ./posteditor":{"id":5501,"files":["static/chunks/ccf7da5b.4faae59daf1bee4848c5.js","static/chunks/de49cc29.577a0f7f3b6f5d17c0f2.js","static/chunks/1606726a.fcd41d88f77753b9c12d.js","static/chunks/90.886112394ac2d7789127.js","static/chunks/501.82209e2784b63ac9a25b.js"]},"board\\\\post\\\\[id].js -> ../../../components/common/postviewer":{"id":6817,"files":["static/chunks/ccf7da5b.4faae59daf1bee4848c5.js","static/chunks/de49cc29.577a0f7f3b6f5d17c0f2.js","static/chunks/1606726a.fcd41d88f77753b9c12d.js","static/chunks/90.886112394ac2d7789127.js","static/css/ac74dfbf6c7c2448a3fc.css","static/chunks/817.fb7eea495bd177b3234c.js"]}}');

/***/ })

};
;