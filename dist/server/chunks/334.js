"use strict";
exports.id = 334;
exports.ids = [334];
exports.modules = {

/***/ 3334:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "n": () => (/* binding */ GlobalContextProvider),
  "b": () => (/* binding */ useGlobalContext)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./utils/CreateCustomContext.tsx


/*################################################################################################################################
                                                      To build a reducer function
##################################################################################################################################
*/ function buildReducer({ functions  }) {
    return (state, action)=>{
        let tempState = {
            ...state
        };
        Object.keys(action).forEach((key)=>{
            let inferredKey = key;
            const func = functions[inferredKey];
            tempState = func(tempState, action[inferredKey]);
        });
        return tempState;
    };
}
/*################################################################################################################################
                                                         Main function
##################################################################################################################################
*/ function createCustomContext({ initialState , functions  }) {
    //Creathe reducer function
    const reducer = buildReducer({
        functions
    });
    //Create initial Context value and Context itself
    const initialContext = [
        initialState,
        ()=>{}
    ];
    const Context = /*#__PURE__*/ (0,external_react_.createContext)(initialContext);
    //Create the wrapper function which provied that context
    const Provider = ({ children  })=>{
        const [state, dispatch] = (0,external_react_.useReducer)(reducer, initialState);
        return /*#__PURE__*/ jsx_runtime_.jsx(Context.Provider, {
            value: [
                state,
                dispatch
            ],
            children: children
        });
    };
    return {
        Context,
        Provider,
        useContextHook: ()=>(0,external_react_.useContext)(Context)
    };
}

;// CONCATENATED MODULE: ./contexts/GlobalContext.tsx


const initialState = {
    loading: false,
    error: {
        title: "",
        message: ""
    }
};
const functions = {
    setDialog: (state, dialog)=>({
            ...state,
            dialog
        }),
    setState: (state, props)=>({
            ...state,
            ...props
        })
};
const { Context , Provider , useContextHook  } = createCustomContext({
    initialState,
    functions
});
const GlobalContextProvider = Provider;
const useGlobalContext = useContextHook;


/***/ })

};
;