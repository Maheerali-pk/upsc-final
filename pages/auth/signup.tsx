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
import { errors } from "../../utils/messages";
import { useRouter } from "next/router";
import { getCandidateProfile, getCompanyProfile } from "../../apis/getProfile";

const SignupComponent: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const [checked, setChecked] = useState(false);
   const router = useRouter();
   const { onSubmit, onChangeEvents, values, inputsData, setData, data } =
      useForm<"email" | "password", LoginResponse>({
         inputs: {
            email: {
               type: "text",
               value: "",
               checks: [
                  {
                     cond: (x) => x.trim() === "",
                     state: { text: errors.requiredField, type: "error" },
                  },
               ],
            },
            password: {
               type: "text",
               value: "",
               checks: [
                  {
                     cond: (x) => x.trim() === "",
                     state: { text: errors.requiredField, type: "error" },
                  },
               ],
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
                  dispatch({ setState: { loading: false } });
               } else {
                  getCandidateProfile().then((data) => {
                     console.log("my data 2", data);
                     if (data) {
                        router.push("/student/dashboard");
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
         <div className=""></div>
      </>
   );
};

const Login: NextPage = () => {
   return <PageWrapper Component={SignupComponent}></PageWrapper>;
};

export default Login;
