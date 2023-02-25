import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../../components/Navbar";

const Login: NextPage = () => {
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Navbar></Navbar>
      </>
   );
};

export default Login;
