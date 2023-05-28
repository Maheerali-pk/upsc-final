import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import { GlobalContextProvider, useGlobalContext } from "../../../contexts/GlobalContext";
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
import WorkInput from "../../../components/WorkInput";

const emptyWork: IWork = {
   compName: "",
   role: "",
   description: "",
   currentlyWorking: false,
   startMonth: "",
   startYear: "",
   endMonth: "",
   endYear: "",
   state: "",
   location: "",
};

const convertYearOfAtemptToNumber = (arr: IExam[] | IOtherExam[]) =>
   arr.map((x) => ({ ...x, yearOfAttempt: Number(x.yearOfAttempt) }));

const WorkSetup: React.FC = () => {
   const [state, dispatch] = useGlobalContext();
   const router = useRouter();
   const [disableNext, setDisableNext] = useState(true);
   const [showDialog, setShowDialog] = useState(false);
   const { inputsData, onSubmit, checkForErrors } = useForm<
      {
         noExperience: boolean;
         workExperience: IWork[];
      },
      {}
   >({
      inputs: {
         noExperience: { value: false },
         workExperience: { value: [] },
      },
   });

   const onClickOnNext = async () => {
      const error = onSubmit();
      if (!error) {
         dispatch({ setState: { loading: true } });
         const res = await UpdateStudentProfile({
            workExp: inputsData.workExperience.value.map((work) => {
               const startDate = new Date();
               startDate.setMonth(Number(work.startMonth));
               startDate.setFullYear(Number(work.startYear));
               startDate.setHours(0, 0, 0, 0);
               startDate.setDate(1);

               const endDate = new Date();
               endDate.setMonth(Number(work.endMonth));
               endDate.setFullYear(Number(work.endYear));
               endDate.setHours(0, 0, 0, 0);
               startDate.setDate(1);
               return { ...work, startDate: startDate.toString(), endDate: endDate.toString() };
            }),
         });
         if (res.status === 200) {
            router.push(routes.student.setupProfile.success);
            dispatch({ setState: { loading: false } });
         }
      }
   };

   const allowNext = inputsData.noExperience.value || inputsData.workExperience.value.length > 0;
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
                  text="Which civil service exams have you appeared for?"
                  icon={icons.profileSetup.exam}
               ></ProfileSetupHeader>
               <div className="flex flex-col gap-6  pb-6 md:mt-20 mt-12 ">
                  {inputsData.workExperience.value.map((item, i) => (
                     <WorkInput
                        state="UPSC"
                        value={item}
                        onChange={(value) => inputsData.workExperience.updateItem(i, value)}
                     ></WorkInput>
                  ))}
                  <button
                     onClick={() => inputsData.workExperience.addItem(emptyWork)}
                     className="btn btn-primary btn-outlined btn-sm gap-2 flex items-center w-full"
                  >
                     {icons.add} Add Work Experience
                  </button>

                  <div className="w-full flex justify-center">
                     <Checkbox {...inputsData.noExperience} label="I do not having any work experience yet"></Checkbox>
                  </div>
               </div>
            </div>
         </div>
         <ProfileSetupFooter
            stepNo={3}
            onClickOnNext={onClickOnNext}
            onClickOnBack={() => router.push(routes.student.setupProfile.education)}
            disableNext={!allowNext}
         ></ProfileSetupFooter>
      </>
   );
};

const Work: NextPage = () => {
   return <PageWrapper Component={WorkSetup}></PageWrapper>;
};

export default Work;
