import React from "react";
import OTPDialog from "../dialogs/OTPDialog";
import { createCustomContext } from "../utils/CreateCustomContext";

interface IGlobalState {
   dialog?: React.FC;
   loading: boolean;
   error: { title: string; message: string };
   email: string;
}

export interface IUser {
   name: string;
   image: string;
}

const initialState: IGlobalState = {
   loading: false,
   error: { title: "", message: "" },
   email: "",
};

const functions = {
   setDialog: (
      state: IGlobalState,
      dialog: React.FC | undefined
   ): IGlobalState => ({ ...state, dialog }),
   setState: (
      state: IGlobalState,
      props: Partial<IGlobalState>
   ): IGlobalState => ({ ...state, ...props }),
};

const { Context, Provider, useContextHook } = createCustomContext<
   IGlobalState,
   typeof functions
>({
   initialState,
   functions,
});

export const GlobalContextProvider = Provider;
export const useGlobalContext = useContextHook;
