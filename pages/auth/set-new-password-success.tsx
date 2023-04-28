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

const SetNewPasswordSuccessPage: React.FC = () => {
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
            icon={icons.success}
            heading="Your password has been reset"
            subHeading="Your password has been successfully reset. Click below to log in magically."
         >
            <button
               onClick={() => router.push(routes.login)}
               className="btn-primary btn btn-sm mb-8"
            >
               Login
            </button>
         </AuthPageWrapper>
      </>
   );
};
const SetNewPasswordSucess: NextPage = () => {
   return <PageWrapper Component={SetNewPasswordSuccessPage}></PageWrapper>;
};

export default SetNewPasswordSucess;
