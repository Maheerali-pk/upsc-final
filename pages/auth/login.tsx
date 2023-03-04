import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import AuthPageWrapper from "../../components/AuthPageWrapper";
import Checkbox from "../../components/Checkbox";
import CustomOTPInput from "../../components/CustomOTPInput";
import CustomRadioGroup from "../../components/CustomRadioGroup";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import Select from "../../components/Select";
import { icons } from "../../utils/helpers";

const Login: NextPage = () => {
   const [checked, setChecked] = useState(false);
   const [value, setValue] = useState("1");
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
            {/* <Select
               value={value}
               onChange={setValue}
               placeholder="Please select"
               options={[
                  {
                     heading: "Heading 1",
                     text: "This is the description",
                     value: "0",
                  },
                  {
                     heading: "Heading 2",
                     text: "This is the description",
                     value: "1",
                  },
                  {
                     heading: "Heading 3",
                     text: "This is the description",
                     value: "2",
                  },
                  {
                     heading: "Heading 4",
                     text: "This is the description",
                     value: "3",
                  },
                  {
                     heading: "Heading 5",
                     text: "This is the description",
                     value: "4",
                  },
                  {
                     heading: "Heading 6",
                     text: "This is the description",
                     value: "5",
                  },
                  {
                     heading: "Heading 7",
                     text: "This is the description",
                     value: "6",
                  },
                  {
                     heading: "Heading 8",
                     text: "This is the description",
                     value: "7",
                  },
               ]}
            ></Select> */}
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
            {/* <CustomRadioGroup
               value={value}
               onChange={setValue}
               items={[
                  {
                     heading: "Hire talent",
                     icon: icons.customCheckbox.searchLarge,
                     iconSmall: icons.customCheckbox.search,
                     value: "0",
                     text: "If you’re an organisation looking to hire great talent",
                  },
                  {
                     heading: "Apply for job",
                     icon: icons.customCheckbox.bagLarge,
                     iconSmall: icons.customCheckbox.bagLarge,
                     value: "1",
                     text: "If you’re an individual looking for great job opportunities",
                  },
               ]}
            ></CustomRadioGroup> */}
            {/* <CustomOTPInput
               errorState={true}
               value={value}
               onChange={setValue}
            ></CustomOTPInput> */}
         </AuthPageWrapper>
      </>
   );
};

export default Login;
