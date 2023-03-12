import deepClone from "deep-clone";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { host } from "../utils/helpers";

type ObjectFromNames<Names extends string> = {
   [k in Names]: IInputValue;
};

interface Props<Names extends string, ResponseData extends any> {
   inputs: UseFormProps<Names>;
   onAnyChange?: (data: ObjectFromNames<Names>) => void;
   onSuccess?: (data: ResponseData) => void;
   onFail?: (data: ErrorObject) => void;
   api?: string;
}

export function useForm<Names extends string, ResponseData extends any>(
   props: Props<Names, ResponseData>
) {
   const [state, dispatch] = useGlobalContext();
   const [data, setData] = useState(props.inputs);
   const onChangeEvents = Object.fromEntries(
      Object.keys(props.inputs).map((x) => [
         `on${x[0].toUpperCase() + x.slice(1)}Change` as T,
         (val: IInputValue) => {
            setData({ ...data, [x]: { ...data[x as Names], value: val } });
            onAnyChange();
         },
      ])
   ) as { [k in T]: (val: IInputValue) => void };
   const inputsData = Object.fromEntries(
      Object.keys(props.inputs).map((x) => [
         x,
         {
            setState: (val: InputState) => {
               setData({ ...data, [x]: { ...data[x as Names], state: val } });
            },
            onChange: (val: IInputValue) => {
               setData({ ...data, [x]: { ...data[x as Names], value: val } });
               onAnyChange();
            },
            value: data[x as Names].value,
            state: data[x as Names].state,
         },
      ])
   ) as {
      [k in Names]: {
         setState: (val: InputState) => void;
         onChange: (val: IInputValue) => void;
         value: IInputValue;
         state: InputState;
      };
   };
   const setStates = Object.fromEntries(
      Object.keys(props.inputs).map((x) => [
         `set${x[0].toUpperCase() + x.slice(1)}State` as T,
         (val: InputState) => {
            setData({ ...data, [x]: { ...data[x as Names], state: val } });
            onAnyChange();
         },
      ])
   ) as { [k in T]: (val: InputState) => void };

   const onAnyChange = () => {
      if (props.onAnyChange) {
         const values = Object.fromEntries(
            Object.keys(data).map((x) => [x as Names, data[x as Names].value])
         ) as {
            [k in Names]: IInputValue;
         };
         props.onAnyChange(values);
      }
   };

   const values = Object.fromEntries(
      Object.keys(data).map((x) => [x as Names, data[x as Names].value])
   ) as {
      [k in Names]: IInputValue;
   };

   type T = `on${Capitalize<Names>}Change`;

   const onSubmit = () => {
      const newData = { ...data };
      for (let key in data) {
         const k = key as Names;
         const input = data[k] as IInput;
         if (input.checks) {
            let stateChanged = false;
            console.log(input);
            for (let check of input.checks) {
               if (check.cond(input.value || "")) {
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
               //    [k as Names]: { state: undefined },
               // } as PartialFormProps<Names>);
            }
         }
         setData({ ...newData });
      }
      dispatch({ setState: { loading: true } });
      fetch(`${host}${props.api}`, {
         method: "POST",
         body: JSON.stringify(values),
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
   const setPartialData = (props: PartialFormProps<Names>) => {
      const newData = Object.fromEntries(
         Object.keys(data).map((k) => [
            k,
            { ...data[k as Names], ...(props[k as Names] || {}) },
         ])
      );
      setData({ ...data, ...newData });
   };

   console.log(inputsData, "inputs data");
   return {
      onChangeEvents,
      values,
      onSubmit,
      inputsData,
      data,
      setData: setPartialData,
   };
}
