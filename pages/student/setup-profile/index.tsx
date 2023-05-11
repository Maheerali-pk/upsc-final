import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
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
import RadioGroup from "../../../components/RadioGroup";
import LanguageInput from "../../../components/LanguageInput";
import CheckboxList from "../../../components/CheckboxList";
import ProfileSetupFooter from "../../../components/ProfileSetupFooter";
import { UpdateStudentProfile } from "../../../apis/updateStudentProfile";
import NotificationPopup from "../../../components/NotificationPopup";
import Navbar from "../../../components/Navbar";
import InputWithTags from "../../../components/InputWithTags";
import PrivateRoute from "../../../components/PrivateRoute";

const StudentProfileSetup: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const router = useRouter();
   const [logoUrl, setLogoUrl] = useState("");
   const [disableNext, setDisableNext] = useState(true);
   const [showNotification, setShowNotification] = useState(false);
   const { inputsData, onSubmit, checkForErrors } = useForm<
      {
         gender: string;
         timeAvail: string[];
         languages: ILanguage[];
         strongSub: string[];
         roleType: string;
         roles: string[];
         city: string;
         willingToRelocate: string;
         prefferedLocation1: string;
         prefferedLocation2: string;
         prefferedLocation3: string;
      },
      {}
   >({
      inputs: {
         gender: { value: "", checks: [checks.required.string] },
         timeAvail: { value: [], checks: [checks.required.array] },
         languages: { value: [], checks: [checks.required.array] },
         strongSub: { value: [] },
         roleType: { value: "", checks: [checks.required.string] },
         roles: { value: [] },
         city: { value: "", checks: [checks.required.string] },
         willingToRelocate: { value: "Yes" },
         prefferedLocation1: { value: "" },
         prefferedLocation2: { value: "" },
         prefferedLocation3: { value: "" },
      },
      onAnyChange: (data) => {
         const error = checkForErrors(data);
         if (!error) {
            setDisableNext(false);
         } else {
            setDisableNext(true);
         }
      },
   });

   const onClickOnNext = async () => {
      const error = onSubmit();
      if (!error) {
         dispatch({ setState: { loading: true } });
         const res = await UpdateStudentProfile({
            jobPref: {
               isWillingToRelocate:
                  inputsData.willingToRelocate.value === "Yes",
               languages: inputsData.languages.value,
               // location: inputsData.city.value,
               roles: inputsData.roles.value,
               timeAvail: inputsData.timeAvail.value.join(", "),
               preffredLocations: [
                  inputsData.prefferedLocation1.value,
                  inputsData.prefferedLocation2.value,
                  inputsData.prefferedLocation3.value,
               ],
               strongSub: inputsData.strongSub.value[0],
            },
            personalInfo: { city: inputsData.city.value },
         });
         if (res.status === 200) {
            dispatch({ setState: { loading: false } });
            router.push(routes.student.setupProfile.exams);
         }
         // const res = await updateCompanyProfile({
         //    address: {
         //       city: inputsData.city.value,
         //       state: inputsData.state.value,
         //       pincode: inputsData.pincode.value,
         //       firstLine: inputsData.address.value,
         //    },
         //    description: inputsData.description.value,
         //    logo: logoUrl,

         //    // name: inputsData.name.value,
         //    type: inputsData.orgType.value,
         //    phoneNum: inputsData.phoneNum.value,
         //    socialLinks: [
         //       inputsData.facebook.value,
         //       inputsData.instagram.value,
         //       inputsData.linkedin.value,
         //    ],
         //    url: inputsData.url.value,
         //    organisationName: inputsData.name.value,
         // });
         // if (res.status === 200) {
         //    dispatch({ setState: { loading: false } });
         //    router.push(routes.company.setupProfile.success);
         // } else {
         // }
      }
   };
   useEffect(() => {
      setTimeout(() => {
         setShowNotification(true);
      }, 5000);
   }, []);
   // useEffect(() => {
   //    const error = onSubmit();
   //    console.log("submit error", error);
   //    if (!error) {
   //       setDisableNext(false);
   //    } else {
   //       setDisableNext(true);
   //    }
   // });

   return (
      <PrivateRoute purpose="CANDIDATE">
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Navbar></Navbar>

         <div className="setup-wrapper">
            <Loader></Loader>

            <div className="flex flex-col ">
               <ProfileSetupHeader
                  text="Hi Amit! Let’s set up your profile"
                  icon={icons.profileSetup.company}
               ></ProfileSetupHeader>
               <div className="student-profile-setup-item ">
                  <RadioGroup
                     {...inputsData.gender}
                     label="Gender"
                     items={[
                        { text: "Male", value: "Male" },
                        { text: "Female", value: "Female" },
                        {
                           text: "Prefer not to say",
                           value: "Prefer not to say",
                        },
                     ]}
                  ></RadioGroup>
               </div>
               <div className="student-profile-setup-item gap-6 flex flex-col">
                  <div className="gap-0.5">
                     <div className="text-sm font-medium text-gray-700">
                        Type of job you’re looking for
                     </div>
                     <div className="text-sm font-medium text-gray-500">
                        You may select multiple options
                     </div>
                  </div>
                  <CheckboxList
                     {...inputsData.timeAvail}
                     items={[
                        { text: "Full-time", value: "Full-time" },
                        { text: "Part-time", value: "Part-time" },
                        { text: "Work from home", value: "Work from home" },
                        { text: "Work from office", value: "Work from office" },
                     ]}
                  ></CheckboxList>
               </div>

               <div className="student-profile-setup-item gap-6 flex flex-col">
                  {inputsData.languages.value.map((item, index) => (
                     <LanguageInput
                        value={item}
                        onChange={(value) => {
                           console.log("update called", value);
                           inputsData.languages.updateItem(index, value);
                        }}
                     ></LanguageInput>
                  ))}
                  <button
                     className="btn btn-primary btn-outlined btn-lg gap-2"
                     onClick={() =>
                        inputsData.languages.addItem({
                           language: "",
                           proficiency: "",
                        })
                     }
                  >
                     {icons.add} Add Language
                  </button>
               </div>

               <div className="student-profile-setup-item gap-10 flex flex-col">
                  <RadioGroup
                     {...inputsData.roleType}
                     label="What kind of roles are you looking for?"
                     items={[
                        { text: "Academic", value: "Academic" },
                        { text: "Non-Academic", value: "Non-Academic" },
                        { text: "Open to both", value: "Open to both" },
                     ]}
                  ></RadioGroup>
                  <InputWithTags
                     items={["Hindi", "English", "Social Science", "History"]}
                     {...inputsData.strongSub}
                     label="What are your strong subjects?"
                     labelSubtext="Optional"
                     placeholder="e.g. sociology"
                  ></InputWithTags>
                  <CheckboxList
                     {...inputsData.roles}
                     label="What academic roles you’re interested in"
                     labelSubtext="optional"
                     items={[
                        { text: "Tutor", value: "Tutor" },
                        { text: "Mentor", value: "Mentor" },
                        { text: "Option1", value: "Option1" },
                        { text: "Option 2", value: "Option 2" },
                        { text: "Option 3", value: "Option 3" },
                     ]}
                  ></CheckboxList>
               </div>
               <div className="gap-10 student-profile-setup-item border-b-0 flex flex-col">
                  <div className="gap-1.5 flex flex-col">
                     <div className="text-sm text-gray-700 font-medium">
                        Current City
                     </div>
                     <Select
                        placeholder="Select"
                        {...inputsData.city}
                        options={[
                           { text: "", value: "City 1", heading: "City 1" },
                        ]}
                     ></Select>
                  </div>
                  <RadioGroup
                     {...inputsData.willingToRelocate}
                     label="Are you willing to relocate?"
                     items={[
                        { text: "Yes", value: "Yes" },
                        { text: "No", value: "No" },
                     ]}
                  ></RadioGroup>
                  <div className="flex flex-col gap-4 relative">
                     {showNotification && (
                        <NotificationPopup
                           onClose={() => setShowNotification(false)}
                           className="md:top-32 md:absolute md:-left-36 md:-translate-x-1/2 fixed mt-4   top-0 left-0"
                           icon={icons.safety}
                           title="Your identity is safe & confidential"
                           acceptText="Got it! thanks"
                           description="Your profile will be confidential and can be seen by recruiters only when you apply for their job."
                        ></NotificationPopup>
                     )}
                     <div className="flex flex-col gap-0.5">
                        <div className="text-sm text-gray-700 font-medium">
                           Location Preferences
                        </div>
                        <div className="text-sm text-gray-500 "></div>
                     </div>
                     <div className="gap-6 flex flex-col">
                        <Input
                           {...inputsData.prefferedLocation1}
                           placeholder="Select preference 1"
                        ></Input>
                        <Input
                           {...inputsData.prefferedLocation2}
                           placeholder="Select preference 2"
                        ></Input>
                        <Input
                           {...inputsData.prefferedLocation3}
                           placeholder="Select preference 3"
                        ></Input>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <ProfileSetupFooter
            stepNo={1}
            onClickOnNext={onClickOnNext}
            disableNext={disableNext}
         ></ProfileSetupFooter>
      </PrivateRoute>
   );
};

const ProfileSetup: NextPage = () => {
   return <PageWrapper Component={StudentProfileSetup}></PageWrapper>;
};

export default ProfileSetup;
