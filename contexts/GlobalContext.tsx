import React from "react";
import OTPDialog from "../dialogs/OTPDialog";
import { createCustomContext } from "../utils/CreateCustomContext";

interface IGlobalState {
   dialog?: React.FC;
}

export interface IUser {
   name: string;
   image: string;
}

const initialState: IGlobalState = {};

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
