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

const EdutcationSetup: React.FC = () => {
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
            <div className="flex flex-col mb-8">
               <ProfileSetupHeader
                  text="Add details about your education"
                  icon={icons.profileSetup.education}
               ></ProfileSetupHeader>
            </div>
         </div>
         <ProfileSetupFooter
            stepNo={2}
            onClickOnNext={onClickOnNext}
            disableNext={!allowNext}
         ></ProfileSetupFooter>
      </>
   );
};

const Education: NextPage = () => {
   return <PageWrapper Component={EdutcationSetup}></PageWrapper>;
};

export default Education;
