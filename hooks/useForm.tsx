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
               setData({ ...data, [x]: { ...data[x], value: val } });
               // onAnyChange();
            },
            setState: (val: InputState) => {
               setData({ ...data, [x]: { ...data[x], state: val } });
            },
            value: data[x].value,
            state: data[x].state,
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
      for (let key in data) {
         const k = key;
         const input = data[k];
         if (input.checks) {
            let stateChanged = false;
            for (let check of input.checks) {
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
         setData({ ...newData });
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
            console.log(data, "Response from api");
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

   console.log(inputsData, "inputs data");
   return {
      // onChangeEvents,
      // values,
      onSubmit,
      inputsData,
      data,
      setData: setPartialData,
   };
}
