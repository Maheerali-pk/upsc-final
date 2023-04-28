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
import RadioGroup from "../../../components/RadioGroup";
import LanguageInput from "../../../components/LanguageInput";
import CheckboxList from "../../../components/CheckboxList";
import ProfileSetupFooter from "../../../components/ProfileSetupFooter";
import { UpdateStudentProfile } from "../../../apis/updateStudentProfile";
import NotificationPopup from "../../../components/NotificationPopup";
import DialogWrapper from "../../../components/DialogWrapper";
import ExamInput from "../../../components/ExamInput";
import OtherExamInput from "../../../components/OtherExamInput";

const degreeTypeOptions: ISelectOption[] = [
   { value: "Graduation", heading: "Graduation" },
   { value: "Post Graduation", heading: "Post Graduation" },
   { value: "PhD", heading: "PhD" },
];
const convertYearOfAtemptToNumber = (arr: IExam[] | IOtherExam[]) =>
   arr.map((x) => ({ ...x, yearOfAttempt: Number(x.yearOfAttempt) }));

const EdutcationSetup: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const router = useRouter();
   const [disableNext, setDisableNext] = useState(true);
   const [showDialog, setShowDialog] = useState(false);
   const { inputsData, onSubmit, checkForErrors } = useForm<IGrad, {}>({
      inputs: {
         college: { value: "", checks: [checks.required.string] },
         degree: { value: "", checks: [checks.required.string] },
         yearOfPassing: { value: "", checks: [checks.required.string] },
         marks: { value: "", checks: [checks.required.string] },
         status: { value: "", checks: [checks.required.string] },
         totalCgpa: { value: "", checks: [checks.required.string] },
         type: { value: "", checks: [checks.required.string] },
         stream: { value: "", checks: [checks.required.string] },
      },
      onAnyChange: (data) => {
         const error = checkForErrors(data);
         if (error) {
            setDisableNext(true);
         } else {
            setDisableNext(false);
         }
      },
   });

   const onClickOnNext = async () => {
      const error = onSubmit();
      if (!error) {
         dispatch({ setState: { loading: true } });
         const res = await UpdateStudentProfile({
            grads: [
               {
                  type: inputsData.type.value,
                  value: Number(inputsData.marks.value),
               },
            ],
         });
         if (res.status === 200) {
            dispatch({ setState: { loading: false } });
            router.push(routes.student.setupProfile.work);
         }
      }
   };

   // const allowNext =
   //    inputsData.otherAttempts.value.length > 0 ||
   //    inputsData.upscAttempts.value.length > 0 ||
   //    inputsData.statePscAttempts.value.length > 0;
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Navbar></Navbar>

         <div className="setup-wrapper overflow-auto">
            <Loader></Loader>
            <div className="flex flex-col ">
               <ProfileSetupHeader
                  text="Add details about your education"
                  icon={icons.profileSetup.education}
               ></ProfileSetupHeader>
            </div>
            <div className="flex flex-col gap-10 md:mt-20 mt-12">
               <Select
                  label="Current / highest level of education"
                  placeholder="Select"
                  options={degreeTypeOptions}
                  {...inputsData.type}
               ></Select>
               <RadioGroup
                  items={[
                     { text: "Pursuing", value: "Pursuing" },
                     { text: "Completed", value: "Completed" },
                  ]}
                  {...inputsData.status}
                  label="Graduation status"
               ></RadioGroup>
               <Input
                  label="College"
                  {...inputsData.college}
                  placeholder="e.g. Hindu College"
               ></Input>
               <div className="md:gap-6 gap-10 flex flex-col md:flex-row">
                  <Input
                     label="Degree"
                     {...inputsData.degree}
                     placeholder="e.g. B.Sc (Hons.)"
                  ></Input>
                  <Input
                     label="Stream"
                     {...inputsData.stream}
                     placeholder="e.g. Economics"
                  ></Input>
               </div>
               <Input
                  {...inputsData.yearOfPassing}
                  label="Year of passing"
                  placeholder="Choose Year"
               ></Input>

               <div className="grid md:grid-cols-2 grid-cols-[2fr_1fr] gap-6 items-end">
                  <Select
                     {...inputsData.totalCgpa}
                     label="Marks obtained"
                     placeholder="Select"
                     options={[{ value: "10", heading: "CGPA(out of 10)" }]}
                  ></Select>
                  <Input
                     type="number"
                     {...inputsData.marks}
                     placeholder=""
                  ></Input>
               </div>
            </div>
         </div>
         <ProfileSetupFooter
            stepNo={2}
            onClickOnNext={onClickOnNext}
            disableNext={disableNext}
         ></ProfileSetupFooter>
      </>
   );
};

const Education: NextPage = () => {
   return <PageWrapper Component={EdutcationSetup}></PageWrapper>;
};

export default Education;
