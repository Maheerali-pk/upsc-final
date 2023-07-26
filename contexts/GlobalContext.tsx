import React from "react";
import OTPDialog from "../dialogs/OTPDialog";
import { createCustomContext } from "../utils/CreateCustomContext";
import { IApplication } from "../apis/getApplications";

interface IGlobalState {
   dialog?: React.FC<any>;
   loading: boolean;
   error: { title: string; message: string };
   user: IUser | null;
   email: string;
   alert: { text: string } | null;
   applications: IApplication[];
}

export interface IUser {
   purpose: IAccountPurpose;
   name?: string;
   emai?: string;
}

const initialState: IGlobalState = {
   loading: false,
   error: { title: "", message: "" },
   email: "",
   user: null,
   alert: null,
   applications: [],
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
