import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AuthPageWrapper from "../../components/AuthPageWrapper";
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
            <div>Contenth</div>
         </AuthPageWrapper>
      </>
   );
};

export default Login;
