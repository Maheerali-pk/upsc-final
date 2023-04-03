"use strict";
exports.id = 416;
exports.ids = [416];
exports.modules = {

/***/ 9416:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Navbar)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./utils/helpers.tsx
var helpers = __webpack_require__(5551);
;// CONCATENATED MODULE: ./components/NavbarItem.tsx



const NavbarItem = (item)=>{
    const [open, setOpen] = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>{
        window.addEventListener("click", (e)=>{
            const target = e.target;
        });
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "gap-2 px-4 md:px-0 py-2.5 md:py-0 text-gray-600 relative flex cursor-pointer items-center md:justify-start justify-between",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                onClick: ()=>setOpen(!open),
                className: " font-semibold gap-4 flex",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "md:hidden",
                        children: item.icon
                    }),
                    item.text
                ]
            }),
            item.subItems && helpers/* icons.arrowDown */.ci.arrowDown
        ]
    });
};
/* harmony default export */ const components_NavbarItem = (NavbarItem);

;// CONCATENATED MODULE: ./components/Navbar.tsx





const navbarItems = [
    {
        text: "Home",
        url: "/",
        icon: helpers/* icons.home */.ci.home
    },
    {
        text: "Products",
        url: "/",
        icon: helpers/* icons.home */.ci.home
    },
    {
        text: "Home",
        url: "/",
        icon: helpers/* icons.home */.ci.home,
        subItems: [
            {
                text: "Overview",
                url: "/"
            },
            {
                text: "Overview",
                url: "/"
            },
            {
                text: "Overview",
                url: "/"
            }
        ]
    },
    {
        text: "Home",
        url: "/",
        icon: helpers/* icons.home */.ci.home
    },
    {
        text: "Home",
        url: "/",
        icon: helpers/* icons.home */.ci.home
    }
];
const Navbar = ()=>{
    const [open, setOpen] = (0,external_react_.useState)(false);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "h-18 md:h-20 flex items-center px-4 lg:px-28 border-b border-b-gray-100 justify-between w-full",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "gap-10 flex w-full items-center",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/images/logo.png"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "gap-8 hidden md:flex w-full",
                        children: navbarItems.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(components_NavbarItem, {
                                ...item
                            }))
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "gap-8 hidden md:flex whitespace-nowrap items-center",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "font-semibold text-gray-600 cursor-pointer",
                        children: "Log in"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "bg-primary-400 cursor-pointer rounded-lg text-white font-semibold py-2.5 px-3.5",
                        children: "Sign up"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "cursor-pointer flex items-center md:hidden",
                onClick: ()=>setOpen(!open),
                children: helpers/* icons.menuBars */.ci.menuBars
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: external_classnames_default()("shadow-lg h-screen md:hidden z-10 top-0 transition-all ease-in time duration-300   bg-white fixed flex flex-col w-9/12 pt-4 px-2", {
                    "left-0": open,
                    "-left-full": !open
                }),
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/images/logo.png",
                        className: "mb-8 h-fit w-fit mx-4 "
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "gap-1 flex flex-col w-full",
                        children: navbarItems.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(components_NavbarItem, {
                                ...item
                            }))
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_Navbar = (Navbar);


/***/ })

};
;