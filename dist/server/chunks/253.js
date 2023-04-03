"use strict";
exports.id = 253;
exports.ids = [253];
exports.modules = {

/***/ 2253:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_SignupForm)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./contexts/GlobalContext.tsx + 1 modules
var GlobalContext = __webpack_require__(3334);
// EXTERNAL MODULE: ./hooks/useForm.tsx
var useForm = __webpack_require__(5183);
// EXTERNAL MODULE: ./utils/helpers.tsx
var helpers = __webpack_require__(5551);
// EXTERNAL MODULE: ./utils/utils.ts
var utils = __webpack_require__(9728);
// EXTERNAL MODULE: ./components/Input.tsx
var Input = __webpack_require__(405);
;// CONCATENATED MODULE: ./components/OrDivider.tsx

const OrDivider = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "gap-2 flex items-center my-6",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("hr", {
                className: "bg-gray-200 w-full"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "text-gray-600 text-sm",
                children: "OR"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("hr", {
                className: "bg-gray-200 w-full"
            })
        ]
    });
};
/* harmony default export */ const components_OrDivider = (OrDivider);

;// CONCATENATED MODULE: ./components/SignupForm.tsx









const SignupForm = ({ className ="" , type , heading  })=>{
    const [state, dispatch] = (0,GlobalContext/* useGlobalContext */.b)();
    const router = (0,router_.useRouter)();
    const { inputsData , onSubmit  } = (0,useForm/* useForm */.c)({
        inputs: {
            email: {
                value: "",
                checks: [
                    helpers/* checks.required.string */.sr.required.string,
                    helpers/* checks.workEmailWarning */.sr.workEmailWarning
                ]
            },
            firstName: {
                value: "",
                checks: [
                    helpers/* checks.required.string */.sr.required.string
                ]
            },
            lastName: {
                value: "",
                checks: [
                    helpers/* checks.required.string */.sr.required.string
                ]
            },
            password: {
                value: "",
                state: {
                    text: "Minimum 8 characters with at least one uppercase character",
                    type: "primary"
                },
                checks: [
                    helpers/* checks.required.string */.sr.required.string,
                    helpers/* checks.password */.sr.password
                ]
            },
            phone: {
                value: "",
                checks: [
                    helpers/* checks.required.string */.sr.required.string
                ]
            }
        }
    });
    const handleSubmit = ()=>{
        onSubmit();
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-col  " + className,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: external_classnames_default()("font-semibold text-2xl md:text-3xl mb-10 text-center md:text-left md:mb-14", {
                    "md:text-center": type === "student"
                }),
                children: heading
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "inputs-y",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "inputs-y flex md:flex-row",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                                placeholder: "First name",
                                label: "First Name",
                                ...inputsData.firstName
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                                placeholder: "Last name",
                                label: "Last Name",
                                ...inputsData.lastName
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                        placeholder: type === "student" ? "Email address" : "Work email address",
                        startIcon: helpers/* icons.input.message */.ci.input.message,
                        label: "Email",
                        ...inputsData.email
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                        placeholder: "Your phone number",
                        startIcon: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "mr-1 text-gray-900",
                            children: "+91"
                        }),
                        label: "Phone number",
                        ...inputsData.phone
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                        placeholder: "Create a password",
                        label: "Password",
                        ...inputsData.password,
                        showEye: true,
                        endIcon: helpers/* icons.input.question */.ci.input.question
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "btn btn-primary btn-lg mt-8 mb-6",
                onClick: handleSubmit,
                children: "Get started"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components_OrDivider, {}),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col mb-8 md:mb-10 gap-3 md:flex-row whitespace-nowrap",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        className: "btn-gray btn-outlined btn btn-sm gap-3",
                        children: [
                            helpers/* icons.brand.google */.ci.brand.google,
                            "Sign in with Google"
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        className: "btn-gray btn-outlined btn btn-sm gap-3",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                src: "/images/linkedin.png"
                            }),
                            "Sign in with Linkedin"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex text-sm gap-1 whitespace-nowrap justify-center",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "text-gray-600 ",
                        children: "Already have an account?"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        onClick: ()=>router.push(utils/* routes.login */._j.login),
                        className: "btn btn-primary btn-link w-fit",
                        "data-testid": "signin-login-link",
                        children: "Log in"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_SignupForm = (SignupForm);


/***/ })

};
;