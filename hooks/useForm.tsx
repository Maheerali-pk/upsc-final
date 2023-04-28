import deepClone from "deep-clone";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { host } from "../utils/helpers";

// type ObjectFromNames<NamesObject extends NamesObjectDefault> = {
//    [k in Names]: IInputValue;
// };

interface Props<
   NamesObject extends NamesObjectDefault,
   ResponseData extends any
> {
   inputs: UseFormProps<NamesObject>;
   // onAnyChange?: (data: ObjectFromNames<NamesObject>) => void;
   onSuccess?: (data: ResponseData) => void;
   onFail?: (data: ErrorObject) => void;

   onAnyChange?: (data: UseFormProps<NamesObject>) => void;
   onAnyChangeWithoutData?: () => void;

   checkForErrors?: (data: UseFormProps<NamesObject>) => boolean;
   api?: string;
}

export function useForm<
   NamesObject extends NamesObjectDefault,
   ResponseData extends any
>(props: Props<NamesObject, ResponseData>) {
   const [state, dispatch] = useGlobalContext();
   const [data, setData] = useState(props.inputs);
   // const onChangeEvents = Object.fromEntries(
   //    Object.keys(props.inputs).map((x) => [
   //       `on${x[0].toUpperCase() + x.slice(1)}Change` as T,
   //       (val: IInputValue) => {
   //          setData({ ...data, [x]: { ...data[x], value: val } });
   //          // onAnyChange();
   //       },
   //    ])
   // ) as { [k in T]: (val: IInputValue) => void };

   const inputsData = Object.fromEntries(
      Object.keys(props.inputs).map((x: keyof NamesObject) => [
         x as keyof NamesObject,
         {
            onChange: (val: unknown) => {
               const newData = {
                  ...data,
                  [x]: { ...data[x], value: val },
               } as UseFormProps<NamesObject>;
               setData(newData);
               props.onAnyChange?.(newData);
            },
            setState: (val: InputState) => {
               setData({ ...data, [x]: { ...data[x], state: val } });
            },
            value: data[x].value,
            state: data[x].state,
            updateItem: (index: number, value: unknown) => {
               if (Array.isArray(data[x].value)) {
                  const newArr = deepClone(data[x].value) as unknown[];
                  newArr[index] = value;
                  const newData = {
                     ...data,
                     [x]: { ...data[x], value: newArr },
                  } as UseFormProps<NamesObject>;

                  setData(newData);
                  props.onAnyChange?.(newData);
               }
            },
            addItem: (value: unknown) => {
               if (Array.isArray(data[x].value)) {
                  const newData = {
                     ...data,
                     [x]: {
                        ...data[x],
                        value: [...(data[x].value as unknown[]), value],
                     },
                  };
                  setData(newData);
                  props.onAnyChange?.(newData);
               }
            },
            removeItem: (index: number) => {
               if (Array.isArray(data[x].value)) {
                  const newData = {
                     ...data,
                     [x]: {
                        ...data[x],
                        value: [
                           ...(data[x].value as unknown[]).slice(0, index),
                           ...(data[x].value as unknown[]).slice(index + 1),
                        ],
                     },
                  };
                  setData(newData);
                  props.onAnyChange?.(newData);
               }
            },

            // value: data[x].value,
         },
      ])
   ) as CreateFormObject<NamesObject>;
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

   const onSubmit = () => {
      const newData = { ...data };
      let error = false;
      for (let key in data) {
         const k = key;
         const input = data[k];
         if (input.checks) {
            let stateChanged = false;
            for (let check of input.checks) {
               if (check.cond(input.value)) {
                  newData[k].state = check.state;
                  if (check.state.type === "error") {
                     error = true;
                  }
                  stateChanged = true;
                  break;
               }

               //    break;

               // }
            }
            if (!stateChanged) {
               newData[k].state = undefined;
            }
         }
         setData({ ...newData });
      }
      if (error) {
         return error;
      }
      if (!props.api) {
         return error;
      }
      dispatch({ setState: { loading: true } });
      fetch(`${host}${props.api}`, {
         method: "POST",
         body: JSON.stringify(
            Object.fromEntries(
               Object.entries(inputsData).map(([k, v]) => [k, v.value])
            )
         ),
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            // console.log(data, "Response from api");
            if (data.statusCode === undefined) {
               if (props.onSuccess) {
                  props.onSuccess(data);
               }
               dispatch({ setState: { error: { title: "", message: "" } } });
            } else {
               props?.onFail?.(data as ErrorObject);
               dispatch({
                  setState: {
                     error: { title: data.error, message: data.message },
                  },
               });
            }
         })
         .catch((err) => {})
         .finally(() => {
            dispatch({ setState: { loading: false } });
         });
   };
   const setPartialData = (props: PartialFormProps<NamesObject>) => {
      const newData = Object.fromEntries(
         Object.keys(data).map((k) => [k, { ...data[k], ...(props[k] || {}) }])
      );
      setData({ ...data, ...newData });
   };
   const checkForErrors = (
      myData?: UseFormProps<NamesObject>,
      include?: (keyof NamesObject)[]
   ) => {
      const newData = { ...data };
      let error = false;
      myData = myData || data;
      include = include || Object.keys(myData);
      console.log(myData, "myData");
      for (let key in myData) {
         if (!include.includes(key)) {
            continue;
         }

         const k = key;
         const input = myData[k];
         if (input.checks) {
            console.log("has checks", input.checks);
            let stateChanged = false;
            for (let check of input.checks) {
               if (check.cond(input.value)) {
                  if (check.state.type === "error") {
                     error = true;
                     console.log("Error is true for key: ", key);
                  }
                  stateChanged = true;
                  break;
               }
            }
         }
         // setData({ ...newData });
      }
      return error;
   };

   // console.log(inputsData, "inputs myData");
   return {
      // onChangeEvents,
      // values,

      checkForErrors,
      onSubmit,
      inputsData,
      data,
      setData: setPartialData,
   };
}
