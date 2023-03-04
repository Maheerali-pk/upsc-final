import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import AuthPageWrapper from "../../components/AuthPageWrapper";
import Checkbox from "../../components/Checkbox";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import { icons } from "../../utils/helpers";

const Login: NextPage = () => {
   const [checked, setChecked] = useState(false);
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
            <div className="inputs-y">
               <Input label="Email" placeholder="Enter your email"></Input>
               <Input
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
            <button className="btn-primary btn btn-sm mb-4">Sign in</button>
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

export default Login;
