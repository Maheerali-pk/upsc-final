import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AuthPageWrapper from "../../../components/AuthPageWrapper";
import Checkbox from "../../../components/Checkbox";
import Input from "../../../components/Input";
import Navbar from "../../../components/NavbarBase";
import { checks, icons } from "../../../utils/helpers";
import { useState } from "react";
import { useRouter } from "next/router";
import { routes } from "../../../utils/utils";
import { forgetPassword } from "../../../apis/forgetPassword";
import { useForm } from "../../../hooks/useForm";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { setEngine } from "crypto";
import PageWrapper from "../../../components/PageWrapper";
import ComapnyNavbar from "../../../components/CompanyNavbar";

const SuccessfulJobPostPage: React.FC = () => {
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
         <ComapnyNavbar selectedItem={2} />
         <AuthPageWrapper
            icon={icons.success}
            heading="Your job has been sent for internal review"
            subHeading="Your job posting will be live within 24hrs. We’ll notify you in case of any discrepancy"
         >
            <div className="flex gap-3 items-center">
               <div
                  className="btn-gray btn-sm btn btn-outlined whitespace-nowrap"
                  onClick={() => router.push(routes.company.dashboard)}
               >
                  Go to dashboard
               </div>
               <div
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                     router.push(routes.company.postJob);
                  }}
               >
                  Post new job
               </div>
            </div>
         </AuthPageWrapper>
      </>
   );
};
const SetNewPasswordSucess: NextPage = () => {
   return <PageWrapper Component={SuccessfulJobPostPage}></PageWrapper>;
};

export default SetNewPasswordSucess;
