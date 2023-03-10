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
      console.log("onsubmit called");

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

   return { onChangeEvents, values, onSubmit };
}
