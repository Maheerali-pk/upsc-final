"use strict";
exports.id = 876;
exports.ids = [876];
exports.modules = {

/***/ 3876:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3334);
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3858);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);





const AuthPageWrapper = ({ icon , heading , subHeading , children  })=>{
    const [state, dispatch] = (0,_contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_1__/* .useGlobalContext */ .b)();
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        console.log("loading", state.loading);
    // dispatch({ setState: { loading: true } });
    }, [
        state.loading
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex justify-center relative w-full py-20",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Loader__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {}),
                state.dialog && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(state.dialog, {}),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-col md:w-90 w-full items-center h-full pt-12 md:pt-24 px-4 ",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "mb-6",
                            children: icon
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "text-2xl md:text-3xl font-semibold text-gray-900 mb-2 md:mb-3",
                            children: heading
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "mb-8 text-gray-600 text-center whitespace-nowrap",
                            children: subHeading
                        }),
                        children
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthPageWrapper);


/***/ }),

/***/ 3858:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_loader_spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1223);
/* harmony import */ var react_loader_spinner__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_loader_spinner__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3334);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5551);




const Loader = ()=>{
    const [state, dispatch] = (0,_contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_2__/* .useGlobalContext */ .b)();
    return state.loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "absolute pt-36 top-0 left-0 h-full w-full flex justify-center bg-white z-10",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_loader_spinner__WEBPACK_IMPORTED_MODULE_1__.ColorRing, {
            colors: [
                _utils_helpers__WEBPACK_IMPORTED_MODULE_3__/* .colors.primary[400] */ .O9.primary[400],
                _utils_helpers__WEBPACK_IMPORTED_MODULE_3__/* .colors.primary[400] */ .O9.primary[400],
                _utils_helpers__WEBPACK_IMPORTED_MODULE_3__/* .colors.primary[400] */ .O9.primary[400],
                _utils_helpers__WEBPACK_IMPORTED_MODULE_3__/* .colors.primary[400] */ .O9.primary[400],
                _utils_helpers__WEBPACK_IMPORTED_MODULE_3__/* .colors.primary[400] */ .O9.primary[400]
            ],
            height: 56,
            width: 56
        })
    }) : null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);


/***/ })

};
;