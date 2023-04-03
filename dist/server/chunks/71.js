"use strict";
exports.id = 71;
exports.ids = [71];
exports.modules = {

/***/ 4824:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3334);


const PageWrapper = ({ Component  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_1__/* .GlobalContextProvider */ .n, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {})
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageWrapper);


/***/ }),

/***/ 5183:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ useForm)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3334);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5551);



function useForm(props) {
    const [state, dispatch] = (0,_contexts_GlobalContext__WEBPACK_IMPORTED_MODULE_1__/* .useGlobalContext */ .b)();
    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.inputs);
    // const onChangeEvents = Object.fromEntries(
    //    Object.keys(props.inputs).map((x) => [
    //       `on${x[0].toUpperCase() + x.slice(1)}Change` as T,
    //       (val: IInputValue) => {
    //          setData({ ...data, [x]: { ...data[x], value: val } });
    //          // onAnyChange();
    //       },
    //    ])
    // ) as { [k in T]: (val: IInputValue) => void };
    const inputsData = Object.fromEntries(Object.keys(props.inputs).map((x)=>[
            x,
            {
                onChange: (val)=>{
                    setData({
                        ...data,
                        [x]: {
                            ...data[x],
                            value: val
                        }
                    });
                // onAnyChange();
                },
                setState: (val)=>{
                    setData({
                        ...data,
                        [x]: {
                            ...data[x],
                            state: val
                        }
                    });
                },
                value: data[x].value,
                state: data[x].state
            }
        ]));
    // const setStates = Object.fromEntries(
    //    Object.keys(props.inputs).map((x) => [
    //       `set${x[0].toUpperCase() + x.slice(1)}State` as T,
    //       (val: InputState) => {
    //          setData({ ...data, [x]: { ...data[x], state: val } });
    //          onAnyChange();
    //       },
    //    ])
    // ) as { [k in T]: (val: InputState) => void };
    // const onAnyChange = () => {
    //    if (props.onAnyChange) {
    //       const values = Object.fromEntries(
    //          Object.keys(data).map((x) => [x , data[x ].value])
    //       ) as {
    //          [k in Names]: IInputValue;
    //       };
    //       props.onAnyChange(values);
    //    }
    // };
    // const values = Object.fromEntries(
    //    Object.keys(data).map((x) => [x , data[x ].value])
    // ) as {
    //    [k in Names]: IInputValue;
    // };
    // type T = `on${Capitalize<Names>}Change`;
    const onSubmit = ()=>{
        const newData = {
            ...data
        };
        for(let key in data){
            const k = key;
            const input = data[k];
            if (input.checks) {
                let stateChanged = false;
                for (let check of input.checks){
                    if (check.cond(input.value)) {
                        newData[k].state = check.state;
                        stateChanged = true;
                        break;
                    }
                //    break;
                // }
                }
                console.log("state changed", stateChanged);
                if (!stateChanged) {
                    newData[k].state = undefined;
                // setPartialData({
                //    [k ]: { state: undefined },
                // } as PartialFormProps<Names>);
                }
            }
            setData({
                ...newData
            });
        }
        dispatch({
            setState: {
                loading: true
            }
        });
        fetch(`${_utils_helpers__WEBPACK_IMPORTED_MODULE_2__/* .host */ .ho}${props.api}`, {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(Object.entries(inputsData).map(([k, v])=>[
                    k,
                    v.value
                ]))),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("auth-token")}`
            }
        }).then((res)=>res.json()).then((data)=>{
            console.log(data, "Response from api");
            if (data.statusCode === undefined) {
                if (props.onSuccess) {
                    props.onSuccess(data);
                }
                dispatch({
                    setState: {
                        error: {
                            title: "",
                            message: ""
                        }
                    }
                });
            } else {
                var _props_onFail;
                props === null || props === void 0 ? void 0 : (_props_onFail = props.onFail) === null || _props_onFail === void 0 ? void 0 : _props_onFail.call(props, data);
                dispatch({
                    setState: {
                        error: {
                            title: data.error,
                            message: data.message
                        }
                    }
                });
            }
        }).catch((err)=>{}).finally(()=>{
            dispatch({
                setState: {
                    loading: false
                }
            });
        });
    };
    const setPartialData = (props)=>{
        const newData = Object.fromEntries(Object.keys(data).map((k)=>[
                k,
                {
                    ...data[k],
                    ...props[k] || {}
                }
            ]));
        setData({
            ...data,
            ...newData
        });
    };
    console.log(inputsData, "inputs data");
    return {
        // onChangeEvents,
        // values,
        onSubmit,
        inputsData,
        data,
        setData: setPartialData
    };
}


/***/ })

};
;