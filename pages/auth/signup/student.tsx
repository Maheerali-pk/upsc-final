import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../../../components/NavbarBase";
import {
   GlobalContextProvider,
   useGlobalContext,
} from "../../../contexts/GlobalContext";
import { icons } from "../../../utils/helpers";
import * as React from "react";
import { useEffect } from "react";
import PageWrapper from "../../../components/PageWrapper";
import { useRouter } from "next/router";

import CustomRadioGroup from "../../../components/CustomRadioGroup";
import classNames from "classnames";
import { errors, routes } from "../../../utils/utils";
import { useForm } from "../../../hooks/useForm";
import Input from "../../../components/Input";
import OrDivider from "../../../components/OrDivider";
import SignupForm from "../../../components/SignupForm";

const SignupStudent: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const [signupType, setSignupType] = useState("");
   const router = useRouter();
   const { inputsData, onSubmit } = useForm<
      {
         firstName: string;
         lastName: string;
         email: string;
         phone: string;
         password: string;
      },
      {}
   >({
      inputs: {
         email: { value: "" },
         firstName: { value: "" },
         lastName: { value: "" },
         password: {
            value: "",
            state: {
               text: "Minimum 8 characters with at least one uppercase character",
               type: "primary",
            },
         },
         phone: { value: "" },
      },
   });

   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <div className="grid-cols-1 md:grid-cols-2 grid min-h-screen">
            <SignupForm
               heading="Create an account"
               type="student"
               className="min-h-full justify-center px-4 md:px-20"
            ></SignupForm>
            <div className="bg-black w-full h-full md:flex hidden">
               <img
                  src="/images/signup-student.png"
                  className="object-cover w-full h-screen"
                  alt=""
               />
            </div>
         </div>
      </>
   );
};

const Signup: NextPage = () => {
   return <PageWrapper Component={SignupStudent}></PageWrapper>;
};

export default Signup;
