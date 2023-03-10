import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import AuthPageWrapper from "../../components/AuthPageWrapper";
import Checkbox from "../../components/Checkbox";
import CustomOTPInput from "../../components/CustomOTPInput";
import CustomRadioGroup from "../../components/CustomRadioGroup";
import DialogWrapper from "../../components/DialogWrapper";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import ProfileSetupFooter from "../../components/ProfileSetupFooter";
import Select from "../../components/Select";
import {
   GlobalContextProvider,
   useGlobalContext,
} from "../../contexts/GlobalContext";
import { useForm } from "../../hooks/useForm";
import { icons } from "../../utils/helpers";
import * as React from "react";
import { useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";

const LoginComponent: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const [checked, setChecked] = useState(false);
   const { onSubmit, onChangeEvents, values } = useForm<
      "email" | "password",
      LoginResponse
   >({
      inputs: {
         email: { type: "text", value: "" },
         password: { type: "text", value: "" },
      },
      api: "/account/login",
      onSuccess: (data) => {
         localStorage.setItem("auth-token", data.access_token);
      },
   });
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Navbar></Navbar>
         <AuthPageWrapper
            icon={icons.authPage.login}
            heading="Log in to your account"
            subHeading="Welcome back! Please enter your details."
         >
            <Loader></Loader>
            <div className="inputs-y">
               <Input
                  value={values.email as string}
                  onChange={onChangeEvents.onEmailChange}
                  label="Email"
                  placeholder="Enter your email"
               ></Input>
               <Input
                  value={values.password as string}
                  onChange={onChangeEvents.onPasswordChange}
                  label="Password"
                  placeholder="Enter your password"
                  helperText="This is a hint text to help user."
                  endIcon={icons.input.question}
               ></Input>
            </div>
            <div className="flex  checkbox justify-between w-full my-6">
               <Checkbox
                  checked={checked}
                  label="Remember for 30 days"
                  onChange={setChecked}
                  className="checkbox-sm"
               ></Checkbox>
               <div className=" cursor-pointer text-sm font-semibold text-primary-400">
                  Forgot Password
               </div>
            </div>
            <button className="btn-primary btn btn-sm mb-4" onClick={onSubmit}>
               Sign in
            </button>
            <button className="btn-gray btn-outlined btn btn-sm gap-3 mb-8">
               {icons.brand.google}
               Sign in with Google
            </button>
            <div className="flex gap-1 w-full justify-center items-center mb-10">
               <div className="text-sm text-gray-600">
                  Don’t have an account?
               </div>
               <div className="btn btn-link btn-primary w-fit">Sign up</div>
            </div>
         </AuthPageWrapper>
      </>
   );
};

const Login: NextPage = () => {
   return <PageWrapper Component={LoginComponent}></PageWrapper>;
};

export default Login;
