import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AuthPageWrapper from "../../components/AuthPageWrapper";
import Checkbox from "../../components/Checkbox";
import Input from "../../components/Input";
import Navbar from "../../components/NavbarBase";
import { checks, icons } from "../../utils/helpers";
import { useState } from "react";
import { useRouter } from "next/router";
import { routes } from "../../utils/utils";
import { forgetPassword } from "../../apis/forgetPassword";
import { useForm } from "../../hooks/useForm";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { setEngine } from "crypto";
import PageWrapper from "../../components/PageWrapper";

const SetNewPasswordPage: React.FC = () => {
   const router = useRouter();
   const [state, dispatch] = useGlobalContext();
   const { inputsData, onSubmit } = useForm<
      { password: string; confirmPassword: string },
      {}
   >({
      inputs: {
         password: {
            value: "",
            checks: [checks.required.string, checks.password],
         },
         confirmPassword: {
            value: "",
            checks: [checks.required.string, checks.password],
         },
      },
   });
   const resetPassword = () => {
      if (!onSubmit()) {
         // dispatch({ setState: { email: inputsData.email.value } });
         dispatch({ setState: { loading: true } });
         // forgetPassword({ email: inputsData.email.value }).then((res) => {
         //    setSent(true);
         // });
         router.push(routes.forgetPass.newpassSuccess);
         dispatch({ setState: { loading: false } });
      }
   };

   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <AuthPageWrapper
            icon={icons.authPage.forgetPass}
            heading="Set New Password"
            subHeading="Your new password must be different to previously used passwords."
         >
            <div className="inputs-y">
               <Input
                  {...inputsData.password}
                  label="Password"
                  placeholder="Enter your password"
               ></Input>
               <Input
                  {...inputsData.confirmPassword}
                  label="Confirm Password"
                  placeholder="Confirm your password"
               ></Input>
            </div>

            <button
               onClick={() => resetPassword()}
               className="btn-primary btn btn-sm mt-6 mb-8"
            >
               Reset Password
            </button>

            <div
               onClick={() => router.push(routes.login)}
               className="btn btn-link btn-gray mb-10 gap-2"
            >
               {icons.arrowLeft}
               Back to log in
            </div>
         </AuthPageWrapper>
      </>
   );
};
const ForgetPass: NextPage = () => {
   return <PageWrapper Component={SetNewPasswordPage}></PageWrapper>;
};

export default ForgetPass;
