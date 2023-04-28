import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../../../components/NavbarBase";
import {
   GlobalContextProvider,
   useGlobalContext,
} from "../../../contexts/GlobalContext";
import { checks, icons } from "../../../utils/helpers";
import * as React from "react";
import { useEffect } from "react";
import PageWrapper from "../../../components/PageWrapper";
import { useRouter } from "next/router";

import CustomRadioGroup from "../../../components/CustomRadioGroup";
import classNames from "classnames";
import { errors, fileToBase64, routes } from "../../../utils/utils";
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
import SocialMediaInput from "../../../components/SocialMediaInput";
import { updateCompanyProfile } from "../../../apis/updateCompanyProfile";

const CompanyProfileSetup: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const [signupType, setSignupType] = useState("");
   const router = useRouter();
   const [logoUrl, setLogoUrl] = useState("");
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
         facebook: string;
         instagram: string;
         linkedin: string;
      },
      {}
   >({
      inputs: {
         name: { value: "", checks: [checks.required.string] },
         city: { value: "" },
         phoneNum: { value: "" },
         url: { value: "" },
         logo: { value: null },
         orgType: { value: "", checks: [checks.required.string] },
         description: {
            value: "",
            checks: [checks.required.string, checks.alteast90],
         },
         state: { value: "" },
         address: { value: "", checks: [checks.required.string] },
         pincode: { value: "", checks: [checks.required.string] },
         verify: { value: false, checks: [checks.mustBeTrue] },
         understand: { value: false, checks: [checks.mustBeTrue] },
         facebook: { value: "" },
         instagram: { value: "" },
         linkedin: { value: "" },
      },
   });
   useEffect(() => {
      if (inputsData.logo.value) {
         fileToBase64(inputsData.logo.value as File).then((res) => {
            setLogoUrl(res as string);
         });
      }
   }, [inputsData.logo.value]);

   const onClickOnContinue = async () => {
      const error = onSubmit();
      if (!error) {
         dispatch({ setState: { loading: true } });
         const res = await updateCompanyProfile({
            address: {
               city: inputsData.city.value,
               state: inputsData.state.value,
               pincode: inputsData.pincode.value,
               firstLine: inputsData.address.value,
            },
            description: inputsData.description.value,
            logo: logoUrl,

            // name: inputsData.name.value,
            type: inputsData.orgType.value,
            phoneNum: inputsData.phoneNum.value,
            socialLinks: [
               inputsData.facebook.value,
               inputsData.instagram.value,
               inputsData.linkedin.value,
            ],
            url: inputsData.url.value,
            organisationName: inputsData.name.value,
         });
         if (res.status === 200) {
            dispatch({ setState: { loading: false } });
            router.push(routes.company.setupProfile.success);
         } else {
         }
      }
   };
   console.log("loading", state.loading);
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Navbar></Navbar>

         <div className="setup-wrapper md:pb-28 pb-10">
            <Loader></Loader>
            <div className="flex flex-col gap-12 mb-12">
               <ProfileSetupHeader
                  text="Welcome aboard! Let’s set up your profile"
                  icon={icons.profileSetup.company}
               ></ProfileSetupHeader>
               <UploadFile {...inputsData.logo}></UploadFile>
            </div>
            <div className="flex flex-col gap-10 mb-12">
               <Input
                  {...inputsData.name}
                  placeholder="What is your organisation’s name?"
               ></Input>
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
                  <div className="gap-6 flex flex-col md:flex-row">
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
            <div className="flex gap-1.5 mb-12 flex-col">
               <div className="text-sm text-gray-700 font-medium">
                  Social links
                  <span className="text-gray-400 font-normal">(optional)</span>
               </div>
               <div className="flex-col w-full gap-4 flex md:flex-row ">
                  <SocialMediaInput
                     {...inputsData.facebook}
                     iconUrl="/images/social-media/facebook-link.png"
                     placeholder="Facebook"
                  ></SocialMediaInput>
                  <SocialMediaInput
                     {...inputsData.instagram}
                     iconUrl="/images/social-media/instagram-link.png"
                     placeholder="Instagram"
                  ></SocialMediaInput>
                  <SocialMediaInput
                     {...inputsData.linkedin}
                     iconUrl="/images/social-media/linkedin-link.png"
                     placeholder="Linkedin"
                  ></SocialMediaInput>
               </div>
            </div>
            <div className="flex flex-col gap-8 mb-12">
               <Checkbox
                  {...inputsData.verify}
                  label="I verify that I am an authorised representative of this organisation and have the right to act on its behalf in the creation and management of this page. The organisation and I agree to the additional terms for Pages."
               ></Checkbox>
               <Checkbox
                  {...inputsData.understand}
                  label={
                     <>
                        Yes I understand and agree to the{" "}
                        <span className="text-primary-400">
                           Upscnaukri Employer Terms
                        </span>
                        , including the
                        <span className="text-primary-400">
                           {" "}
                           User Agreement
                        </span>{" "}
                        and
                        <span className="text-primary-400">
                           {" "}
                           Privacy Policy.
                        </span>
                     </>
                  }
               ></Checkbox>
            </div>
            <button
               onClick={onClickOnContinue}
               className="btn btn-primary w-full btn-xl"
            >
               Continue
            </button>
         </div>
      </>
   );
};

const ProfileSetup: NextPage = () => {
   return <PageWrapper Component={CompanyProfileSetup}></PageWrapper>;
};

export default ProfileSetup;
