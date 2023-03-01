import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AuthPageWrapper from "../../components/AuthPageWrapper";
import Checkbox from "../../components/Checkbox";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import { icons } from "../../utils/helpers";

const Login: NextPage = () => {
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
            <div className="flex justify-between w-full my-6">
               <Checkbox
                  checked={false}
                  label="Remember for 30 days"
                  onChange={() => {}}
               ></Checkbox>
               <div className="cursor-pointer text-sm font-semibold text-primary-400">
                  Forgot Password
               </div>
            </div>
            <button className="btn-primary btn btn-sm ">Sign in</button>
         </AuthPageWrapper>
      </>
   );
};

export default Login;
