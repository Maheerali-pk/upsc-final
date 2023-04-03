import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AuthPageWrapper from "../../components/AuthPageWrapper";
import Checkbox from "../../components/Checkbox";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import { icons } from "../../utils/helpers";

const ForgetPass: NextPage = () => {
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <AuthPageWrapper
            icon={<></>}
            heading="Forgot password?"
            subHeading="No worries, we’ll send you reset instructions."
         >
            <div className="inputs-y">
               {/* <Input
                  label="Email"
                  placeholder="Enter your email"
               ></Input> */}
            </div>

            <button className="btn-primary btn btn-sm mt-6 mb-8">
               Reset Password
            </button>

            <div className="btn btn-link btn-gray mb-10 gap-2">
               {icons.arrowLeft}
               Back to log in
            </div>
         </AuthPageWrapper>
      </>
   );
};

export default ForgetPass;
