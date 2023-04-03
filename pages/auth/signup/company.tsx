import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
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
import Loader from "../../../components/Loader";
import UploadFile from "../../../components/UploadFile";

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
         <Navbar></Navbar>
         <SignupForm
            type="student"
            heading="Signup to hire talent"
            className="min-h-full justify-center px-4 my-16 border-none md:border md:w-160 mx-auto border-gray-200  md:px-20 pb-10"
         ></SignupForm>
      </>
   );
};

const Signup: NextPage = () => {
   return <PageWrapper Component={SignupStudent}></PageWrapper>;
};

export default Signup;
