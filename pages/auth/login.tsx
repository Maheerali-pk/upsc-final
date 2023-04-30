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
import { checks, icons } from "../../utils/helpers";
import * as React from "react";
import { useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useRouter } from "next/router";
import { getCandidateProfile, getCompanyProfile } from "../../apis/getProfile";
import { errors, routes } from "../../utils/utils";
import UploadFile from "../../components/UploadFile";
import NotificationPopup from "../../components/NotificationPopup";

const LoginComponent: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const [checked, setChecked] = useState(false);
   const router = useRouter();
   const [file, setFile] = useState<File | null>(null);
   const { onSubmit, inputsData, setData, data } = useForm<
      { email: string; password: string; rememberMe: boolean },
      LoginResponse
   >({
      inputs: {
         email: {
            type: "text",
            value: "",
            checks: [checks.required.string],
         },
         password: {
            type: "text",
            value: "",
            checks: [checks.required.string],
         },
         rememberMe: {
            type: "checkbox",
            value: false,
         },
      },

      api: "/account/login",
      onSuccess: (data) => {
         localStorage.setItem("auth-token", data.access_token);
         setData({
            email: { state: undefined },
            password: { state: undefined },
         });
         dispatch({ setState: { loading: true } });
         getCompanyProfile().then((data) => {
            console.log("my data", data);
            if (data) {
               router.push("/company/dashboard");

               localStorage.setItem("loggedin", "true");
               dispatch({ setState: { loading: false } });
            } else {
               getCandidateProfile().then((data) => {
                  console.log("my data 2", data);
                  if (data) {
                     router.push("/student/dashboard");
                     localStorage.setItem("loggedin", "true");
                     dispatch({ setState: { loading: false } });
                  }
               });
            }
         });
      },
      onFail: (data) => {
         if (data.error === "Unauthorized") {
            setData({
               email: {
                  state: { type: "error", text: errors.wrongCredentials },
               },
               password: {
                  state: { text: errors.wrongCredentials, type: "error" },
               },
            });
         } else {
         }
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

            {/* <NotificationPopup
               acceptText="Got it, thanks"
               description="Your profile will be confidential and can be seen by recruiters only when you apply for their job."
               title="Your identity is safe & confidential"
               icon={icons.safety}
            ></NotificationPopup> */}
            <div className="inputs-y">
               <Input
                  {...inputsData.email}
                  testId="input_email"
                  label="Email"
                  placeholder="Enter your email"
               ></Input>
               <Input
                  {...inputsData.password}
                  testId="input_password"
                  label="Password"
                  placeholder="Enter your password"
                  helperText="This is a hint text to help user."
                  endIcon={icons.input.question}
               ></Input>
            </div>
            <div className="flex  checkbox justify-between w-full my-6">
               <Checkbox
                  {...inputsData.rememberMe}
                  label="Remember for 30 days"
                  className="checkbox-sm"
               ></Checkbox>
               <div
                  onClick={() => router.push(routes.forgetPass.base)}
                  className=" cursor-pointer text-sm font-semibold text-primary-400"
               >
                  Forgot Password?
               </div>
            </div>
            <button
               className="btn-primary btn btn-sm mb-4"
               data-testid="btn_sign-in"
               onClick={onSubmit}
            >
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
