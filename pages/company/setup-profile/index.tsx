import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import {
   GlobalContextProvider,
   useGlobalContext,
} from "../../../contexts/GlobalContext";
import { icons } from "../../../utils/helpers";
import * as React from "react";
import { useEffect } from "react";
import PageWrapper from "../../../components/PageWrapper";
import { useRouter } from "next/router";

import CustomRadioGroup from "../../../components/CustomRadioGroup";
import classNames from "classnames";
import { errors, routes } from "../../../utils/utils";
import { useForm } from "../../../hooks/useForm";
import Input from "../../../components/Input";
import OrDivider from "../../../components/OrDivider";
import SignupForm from "../../../components/SignupForm";
import Loader from "../../../components/Loader";
import UploadFile from "../../../components/UploadFile";
import ProfileSetupHeader from "../../../components/ProfileSetupHeader";
import Select from "../../../components/Select";
import Textarea from "../../../components/Textarea";
import Checkbox from "../../../components/Checkbox";

const CompanyProfileSetup: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const [signupType, setSignupType] = useState("");
   const router = useRouter();
   const { inputsData, onSubmit } = useForm<
      {
         name: string;
         city: string;
         url: string;
         phoneNum: string;
         logo: File | null;
         orgType: string;
         description: string;
         address: string;
         state: string;
         pincode: string;
         verify: boolean;
         understand: boolean;
      },
      {}
   >({
      inputs: {
         city: { value: "" },
         name: { value: "" },
         phoneNum: { value: "" },
         url: { value: "" },
         logo: { value: null },
         orgType: { value: "" },
         description: { value: "" },
         state: { value: "" },
         address: { value: "" },
         pincode: { value: "" },
         verify: { value: false },
         understand: { value: false },
      },
   });

   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Navbar></Navbar>

         <div className="setup-wrapper">
            <div className="flex flex-col gap-12 mb-12">
               <ProfileSetupHeader
                  text="Welcome aboard! Let’s set up your profile"
                  icon={icons.profileSetup.company}
               ></ProfileSetupHeader>
               <UploadFile {...inputsData.logo}></UploadFile>
            </div>
            <div className="flex flex-col gap-10 mb-12">
               <Select
                  {...inputsData.orgType}
                  placeholder="Select"
                  options={[
                     { text: "Org type 1", value: "org-type-1", heading: "" },
                     { text: "Org type 2", value: "org-type-2", heading: "" },
                     { text: "Org type 3", value: "org-type-3", heading: "" },
                     { text: "Org type 4", value: "org-type-4", heading: "" },
                  ]}
               ></Select>
               <Textarea
                  label="Description"
                  rightLabel="At least 90 characters"
                  {...inputsData.description}
               ></Textarea>
               <div className="flex-col gap-4 flex">
                  <Input {...inputsData.address} label="Address" />
                  <div className="gap-6 flex">
                     <Select
                        {...inputsData.city}
                        placeholder="City"
                        options={[
                           { heading: "City 1", text: "", value: "city 1" },
                           { heading: "City 2", text: "", value: "city 2" },
                           { heading: "City 3", text: "", value: "city 3" },
                        ]}
                     ></Select>
                     <Select
                        {...inputsData.state}
                        placeholder="state"
                        options={[
                           { heading: "state 1", text: "", value: "state 1" },
                           { heading: "state 2", text: "", value: "state 2" },
                           { heading: "state 3", text: "", value: "state 3" },
                        ]}
                     ></Select>
                     <Input
                        {...inputsData.pincode}
                        placeholder="Pincode"
                     ></Input>
                  </div>
               </div>
               <Input
                  {...inputsData.url}
                  label="Website"
                  labelSubtext="Optional"
                  startText={"https://"}
               ></Input>
            </div>
            <div className="flex flex-col gap-8">
               <Checkbox
                  {...inputsData.verify}
                  label="I verify that I am an authorised representative of this organisation and have the right to act on its behalf in the creation and management of this page. The organisation and I agree to the additional terms for Pages."
               ></Checkbox>
               <Checkbox
                  {...inputsData.understand}
                  label="I verify that I am an authorised representative of this organisation and have the right to act on its behalf in the creation and management of this page. The organisation and I agree to the additional terms for Pages."
               ></Checkbox>
            </div>
         </div>
      </>
   );
};

const ProfileSetup: NextPage = () => {
   return <PageWrapper Component={CompanyProfileSetup}></PageWrapper>;
};

export default ProfileSetup;
