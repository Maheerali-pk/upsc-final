import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import { GlobalContextProvider, useGlobalContext } from "../../../contexts/GlobalContext";
import { icons } from "../../../utils/helpers";
import * as React from "react";
import { useEffect } from "react";
import PageWrapper from "../../../components/PageWrapper";
import { useRouter } from "next/router";

import CustomRadioGroup from "../../../components/CustomRadioGroup";
import classNames from "classnames";
import { errors, routes } from "../../../utils/utils";

const SignupComponent: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const [signupType, setSignupType] = useState("");
   const router = useRouter();
   const onSubmit = () => {
      router.push("/auth/signup/" + signupType);
   };
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Navbar></Navbar>
         <div className="flex flex-col px-4 md:px-0 pt-12 md:pt-28 items-center md:w-200 mx-auto">
            <div className="font-semibold text-2xl md:text-3xl mb-8 md:mb-16">How can we help you?</div>
            <CustomRadioGroup
               items={[
                  {
                     heading: "Hire talent",
                     value: "company",
                     text: "If you’re an organisation looking to hire great talent",
                     icon: icons.customCheckbox.searchLarge,
                     iconSmall: icons.customCheckbox.search,
                     testId: "signin-hire-talent",
                  },
                  {
                     heading: "Apply for job",
                     value: "student",
                     text: "If you’re an individual looking for great job opportunities",
                     icon: icons.customCheckbox.bagLarge,
                     iconSmall: icons.customCheckbox.bag,
                     testId: "signin-apply-for-job",
                  },
               ]}
               onChange={setSignupType}
               value={signupType}
            ></CustomRadioGroup>
            <button
               data-testid="signin-get-started"
               disabled={signupType === ""}
               onClick={onSubmit}
               className={classNames("btn btn-primary btn-lg md:w-90 w-full md:mt-16 mt-8 mb-6")}
            >
               Get Started
            </button>
            <div className="flex text-sm gap-1 whitespace-nowrap mb-18">
               <div className="text-gray-600 ">Already have an account?</div>
               <button
                  onClick={() => router.push(routes.login)}
                  className="btn btn-primary btn-link"
                  data-testid="signin-login-link"
               >
                  Log in
               </button>
            </div>
         </div>
      </>
   );
};

const Signup: NextPage = () => {
   return <PageWrapper Component={SignupComponent}></PageWrapper>;
};

export default Signup;
