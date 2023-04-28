import type { NextPage } from "next";
import Head from "next/head";
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

const ForgetPassPage: React.FC = () => {
   const router = useRouter();
   const [state, dispatch] = useGlobalContext();
   const { inputsData, onSubmit } = useForm<{ email: string }, {}>({
      inputs: { email: { value: "", checks: [checks.required.string] } },
   });
   const [sent, setSent] = useState(false);
   const resetPassword = () => {
      if (!onSubmit()) {
         dispatch({ setState: { email: inputsData.email.value } });
         sendEmail();
      }
   };
   const sendEmail = () => {
      dispatch({ setState: { loading: true } });
      forgetPassword({ email: inputsData.email.value }).then((res) => {
         setSent(true);
         dispatch({ setState: { loading: false } });
      });
   };

   if (sent) {
      return (
         <>
            <Head>
               <title>Create Next App</title>
               <link rel="icon" href="/favicon.ico" />
            </Head>
            <AuthPageWrapper
               icon={icons.authPage.resetLinkSent}
               heading="Check your email"
               subHeading={
                  <div className="flex flex-col items-center">
                     We sent a password reset link to
                     <div className="cursor-pointer underline">
                        {inputsData.email.value}
                     </div>
                  </div>
               }
            >
               <button className="btn-primary btn btn-sm  mb-8">
                  Open email app
               </button>

               <div className="flex justify-center mb-8 w-full whitespace-nowrap gap-1">
                  <div className="text-sm text-gray-600">
                     Didn’t receive the email?
                  </div>
                  <div
                     onClick={sendEmail}
                     className="btn-link btn btn-primary w-fit text-sm"
                  >
                     Click to resend
                  </div>
               </div>
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
   }
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <AuthPageWrapper
            icon={icons.authPage.forgetPass}
            heading="Forgot password?"
            subHeading="No worries, we’ll send you reset instructions."
         >
            <div className="inputs-y">
               <Input
                  {...inputsData.email}
                  label="Email"
                  placeholder="Enter your email"
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
   return <PageWrapper Component={ForgetPassPage}></PageWrapper>;
};

export default ForgetPass;
