"use strict";
exports.id = 409;
exports.ids = [409];
exports.modules = {

/***/ 405:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5551);




const Input = (props)=>{
    var _props_state, _props_state1;
    const [focus, setFocus] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [showPass, setShowPass] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const renderEye = ()=>showPass ? _utils_helpers__WEBPACK_IMPORTED_MODULE_3__/* .icons.eyeClose */ .ci.eyeClose : _utils_helpers__WEBPACK_IMPORTED_MODULE_3__/* .icons.eye */ .ci.eye;
    const renderType = ()=>{
        if (!props.showEye) {
            return props.type || "text";
        } else {
            return showPass ? "text" : "password";
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("input-wrapper input-primary", {
            "input-error": ((_props_state = props.state) === null || _props_state === void 0 ? void 0 : _props_state.type) === "error",
            "input-primary": props.state === undefined
        }),
        "data-testid": props.testId,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "text-sm text-gray-700 font-medium",
                children: props.label
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("input-base", {
                    focus: focus
                }),
                children: [
                    props.startIcon && props.startIcon,
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        value: props.value,
                        onChange: (e)=>props.onChange(e.target.value),
                        type: renderType(),
                        onFocus: ()=>setFocus(true),
                        onBlur: ()=>setFocus(false),
                        placeholder: props.placeholder,
                        autoComplete: "off"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        onClick: ()=>setShowPass(!showPass),
                        className: "cursor-pointer",
                        children: props.showEye && renderEye()
                    }),
                    props.endIcon && props.endIcon
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "text-sm helper-text",
                children: (_props_state1 = props.state) === null || _props_state1 === void 0 ? void 0 : _props_state1.text
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Input);


/***/ })

};
;