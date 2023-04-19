import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
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

const defaultExamObject: IExam = {
   language: "",
   optSubject: "",
   qualifiedForInterview: false,
   qualifiedForMains: false,
   state: "UPSC",
   yearOfAttempt: "",
};

const defaultOtherExamObject: IOtherExam = {
   yearOfAttempt: "",
   description: "",
   title: "",
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
         upsc: boolean;
         statepcs: boolean;
         others: boolean;
         upscAttempts: IExam[];
         statePscAttempts: IExam[];
         otherAttempts: IOtherExam[];
      },
      {}
   >({
      inputs: {
         upsc: { value: false },
         statepcs: { value: false },
         others: { value: false },
         upscAttempts: { value: [] },
         statePscAttempts: { value: [] },
         otherAttempts: { value: [] },
      },
   });

   const onClickOnNext = async () => {
      const error = onSubmit();
      if (!error) {
         dispatch({ setState: { loading: true } });
         const res = await UpdateStudentProfile({
            upscJourney: {
               statePscAttempts: convertYearOfAtemptToNumber(
                  inputsData.statePscAttempts.value
               ),
               upscAttempts: convertYearOfAtemptToNumber(
                  inputsData.upscAttempts.value
               ),
               others: convertYearOfAtemptToNumber(
                  inputsData.otherAttempts.value
               ),
            },
         });
         if (res.status === 200) {
            dispatch({ setState: { loading: false } });
            router.push(routes.student.setupProfile.education);
         }
      }
   };

   const allowNext =
      inputsData.otherAttempts.value.length > 0 ||
      inputsData.upscAttempts.value.length > 0 ||
      inputsData.statePscAttempts.value.length > 0;
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
               <div className="flex flex-col gap-6 border-b border-b-gray-200 pb-6 md:mt-20 mt-12 ">
                  <Checkbox
                     label={
                        <div className="font-bold text-base flex ">UPSC</div>
                     }
                     {...inputsData.upsc}
                  ></Checkbox>
                  {inputsData.upsc.value && (
                     <>
                        {inputsData.upscAttempts.value.map((item, i) => (
                           <ExamInput
                              state="UPSC"
                              value={item}
                              onChange={(value) =>
                                 inputsData.upscAttempts.updateItem(i, value)
                              }
                           ></ExamInput>
                        ))}
                        <button
                           onClick={() =>
                              inputsData.upscAttempts.addItem(defaultExamObject)
                           }
                           className="btn btn-primary btn-outlined btn-sm gap-2 flex items-center w-full"
                        >
                           {icons.add} Add Attempt
                        </button>
                     </>
                  )}
               </div>
               <div className="flex flex-col gap-6 border-b border-b-gray-200 py-6">
                  <Checkbox
                     label={
                        <div className="font-bold text-base flex ">
                           State PCS
                        </div>
                     }
                     {...inputsData.statepcs}
                  ></Checkbox>
                  {inputsData.statepcs.value && (
                     <>
                        {inputsData.statePscAttempts.value.map((item, i) => (
                           <ExamInput
                              state="UPSC"
                              value={item}
                              onChange={(value) =>
                                 inputsData.statePscAttempts.updateItem(
                                    i,
                                    value
                                 )
                              }
                           ></ExamInput>
                        ))}
                        <button
                           onClick={() =>
                              inputsData.statePscAttempts.addItem(
                                 defaultExamObject
                              )
                           }
                           className="btn btn-primary btn-outlined btn-sm gap-2 flex items-center w-full"
                        >
                           {icons.add} Add Attempt
                        </button>
                     </>
                  )}
               </div>
               <div className="flex flex-col gap-6 border-b border-b-gray-200 py-6">
                  <Checkbox
                     label={
                        <div className="font-bold text-base flex ">Others</div>
                     }
                     {...inputsData.others}
                  ></Checkbox>
                  {inputsData.others.value && (
                     <>
                        {inputsData.otherAttempts.value.map((item, i) => (
                           <OtherExamInput
                              state="UPSC"
                              value={item}
                              onChange={(value) =>
                                 inputsData.otherAttempts.updateItem(i, value)
                              }
                           ></OtherExamInput>
                        ))}
                        <button
                           onClick={() =>
                              inputsData.otherAttempts.addItem(
                                 defaultOtherExamObject
                              )
                           }
                           className="btn btn-primary btn-outlined btn-sm gap-2 flex items-center w-full"
                        >
                           {icons.add} Add Attempt
                        </button>
                     </>
                  )}
               </div>
            </div>
         </div>
         <ProfileSetupFooter
            stepNo={3}
            onClickOnNext={onClickOnNext}
            disableNext={!allowNext}
         ></ProfileSetupFooter>
      </>
   );
};

const Work: NextPage = () => {
   return <PageWrapper Component={WorkSetup}></PageWrapper>;
};

export default Work;
