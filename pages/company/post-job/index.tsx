import * as React from "react";
import { useState, useMemo } from "react";

import Head from "next/head";
import PageWrapper from "../../../components/PageWrapper";
import CompanyNavbar from "../../../components/CompanyNavbar";
import ProfileSetupFooter from "../../../components/ProfileSetupFooter";
import { useForm } from "../../../hooks/useForm";
import { checks, icons } from "../../../utils/helpers";
import Radio from "../../../components/Radio";
import RadioGroup from "../../../components/RadioGroup";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import InputWithTags from "../../../components/InputWithTags";
import Textarea from "../../../components/Textarea";
import shadows from "@mui/material/styles/shadows";
import PostJobPage2 from "../../../subpages/post-job/PostJobPage2";
import JobReviewPage from "../../../subpages/post-job/JobReviewPage";
import {
   convertJobApplicationToOpportunity,
   createJob,
} from "../../../apis/createJob";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { useRouter } from "next/router";
import { routes } from "../../../utils/utils";

interface DashboardProps {}

const PostJobContent: React.FC<DashboardProps> = () => {
   const res = useForm<IJobApplication, {}>({
      inputs: {
         opportunityType: { value: "", checks: [checks.required.string] },
         position: { value: "", checks: [checks.required.string] },
         description: { value: "", checks: [checks.required.string] },
         exam: { value: "", checks: [checks.required.string] },
         subjects: { value: [] },
         minQualification: { value: "", checks: [checks.required.string] },
         minMainAttempts: { value: "", checks: [checks.required.string] },
         workLanguage: { value: [], checks: [checks.required.array] },
         locationType: { value: "", checks: [checks.required.string] },
         city: { value: "", checks: [checks.required.string] },
         state: { value: "", checks: [checks.required.string] },
         stipendType: { value: "", checks: [checks.required.string] },
         stipend: { value: "0", checks: [checks.required.string] },
         stipendPeriod: { value: "month", checks: [checks.required.string] },
         timeAvail: { value: "", checks: [checks.required.string] },
         skillSets: { value: [] },
         noOfMainsAttempted: { value: "" },
         workExp: { value: "", checks: [checks.required.string] },
         openings: { value: "", checks: [checks.required.string] },
         perks: { value: [] },
         deadline: { value: "", checks: [checks.required.string] },
         isCoverLetterRequired: { value: false },
         questions: { value: [] },
         status: { value: "" },
         maxStipend: { value: "0" },
      },
   });
   const { inputsData, checkForErrors } = res;
   const [page, setPage] = useState(0);
   const [state, dispatch] = useGlobalContext();
   const router = useRouter();
   const submitJob = () => {
      const values = Object.fromEntries(
         Object.entries(inputsData).map(([key, value]) => [key, value.value])
      ) as IJobApplication;
      dispatch({ setState: { loading: true } });
      createJob(convertJobApplicationToOpportunity(values)).then((res) => {
         router.push(routes.company.successfulPostJob);
         dispatch({ setState: { loading: false } });
      });
   };
   const disableNext = () => {
      if (inputsData.opportunityType.value === "Academic") {
         const hasErrors = checkForErrors(undefined, [
            "position",
            "exam",
            "minQualification",
            ...[
               ...(inputsData.minQualification.value === "MAIN"
                  ? ["minMainAttempts" as const]
                  : []),
            ],
            "workLanguage",
            "workExp",
            "description",
            "openings",
         ]);

         console.log("disable next callled", hasErrors);
         return hasErrors;
      }
      if (inputsData.opportunityType.value === "Other") {
         const hasErrors = checkForErrors(undefined, [
            "position",
            "workLanguage",
            "workExp",
            "description",
            "openings",
         ]);
         return hasErrors;
      } else return true;
   };
   if (page === 1) {
      return (
         <PostJobPage2
            onClickOnNext={() => setPage(2)}
            onClickOnBack={() => setPage(0)}
            formData={res}
         ></PostJobPage2>
      );
   }
   if (page === 2) {
      return (
         <JobReviewPage
            onClickOnNext={submitJob}
            onClickOnBack={() => setPage(1)}
            formData={res}
         ></JobReviewPage>
      );
   }

   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <CompanyNavbar selectedItem={2}></CompanyNavbar>
         <div className="pt-14 md:pb-60 pb-28 px-4">
            <div className="md:w-150 w-full mx-auto flex flex-col">
               {/* Header */}
               <div className="flex flex-col gap-12">
                  <div className="flex flex-col gap-5 items-center border-b border-b-200 pb-6">
                     {icons.postJob}
                     <div className="text-3xl font-semibold text-gray-900">
                        Post a job
                     </div>
                  </div>
               </div>

               {/* Inputs */}
               <div className="flex flex-col gap-10 mt-12">
                  <div className="flex flex-col">
                     <div className="text-xl mb-6 text-gray-900 font-bold">
                        Opportunity type
                     </div>
                     <RadioGroup<"Academic" | "Other" | "">
                        items={[
                           { text: "Academic", value: "Academic" },
                           { text: "Other", value: "Other" },
                        ]}
                        {...inputsData.opportunityType}
                     ></RadioGroup>
                  </div>
                  {inputsData.opportunityType.value && (
                     <div className="flex flex-col gap-10">
                        <Input
                           label="Job title"
                           placeholder="e.g. Senior evaluator"
                           {...inputsData.position}
                        ></Input>
                        {inputsData.opportunityType.value === "Academic" && (
                           <div className="flex flex-col gap-10">
                              <Input
                                 label="Exam"
                                 placeholder="e.g. UPSC"
                                 {...inputsData.exam}
                                 options={["UPSC", "SSC", "IBPS", "Other"]}
                              ></Input>
                              <InputWithTags
                                 label="Subjects"
                                 labelSubtext="optional"
                                 placeholder="e.g sociology"
                                 items={["sociology", "geography", "history"]}
                                 {...inputsData.subjects}
                              ></InputWithTags>
                              <RadioGroup
                                 column={true}
                                 label="Minimum qualification"
                                 {...inputsData.minQualification}
                                 items={[
                                    {
                                       text: "Qualified for mains",
                                       value: "MAIN",
                                    },
                                    {
                                       text: "Qualified for interview",
                                       value: "INTERVIEW",
                                    },
                                    {
                                       text: "Candidates without any mains attempts can apply",
                                       value: "NONE",
                                    },
                                 ]}
                              ></RadioGroup>
                              {inputsData.minQualification.value === "MAIN" && (
                                 <Select
                                    options={[
                                       { value: "1", heading: "1" },
                                       { value: "2", heading: "2" },
                                       { value: "3", heading: "3" },
                                    ]}
                                    placeholder="e.g 2"
                                    label="Min. mains attempts"
                                    {...inputsData.minMainAttempts}
                                 ></Select>
                              )}
                              <div className="w-full border-b border-gray-200"></div>
                           </div>
                        )}
                        <div className="flex flex-col">
                           {inputsData.opportunityType.value === "Academic" && (
                              <div className="text-xl mb-4 font-bold text-gray-900">
                                 Additional details
                              </div>
                           )}
                           <InputWithTags
                              placeholder="e.g Hindi"
                              label="Language of work"
                              items={[
                                 "English",
                                 "Hindi",
                                 "Marathi",
                                 "Tamil",
                                 "Telugu",
                              ]}
                              {...inputsData.workLanguage}
                           ></InputWithTags>
                        </div>
                        {/* Common Section */}
                        <InputWithTags
                           placeholder="e.g Marketing"
                           label="Skills"
                           labelSubtext="optional"
                           labelRightText="Max 6 skills"
                           maxItems={6}
                           items={[
                              "Marketing",
                              "Sales",
                              "Finance",
                              "HR",
                              "IT",
                              "Operations",
                           ]}
                           suggestedTags={[
                              "Paper checking",
                              "Fluency in english",
                              "Sales",
                           ]}
                           {...inputsData.skillSets}
                        ></InputWithTags>
                        <Select
                           placeholder="e.g 1 Year"
                           options={[
                              { text: "1", value: "1" },
                              { text: "2", value: "2" },
                           ]}
                           {...inputsData.workExp}
                           label="Years of work experience"
                        ></Select>
                        <Select
                           placeholder="e.g 4"
                           options={[
                              { text: "1", value: "1" },
                              { text: "2", value: "2" },
                              { text: "3", value: "3" },
                              { text: "4", value: "4" },
                              { text: "5", value: "5" },
                           ]}
                           {...inputsData.openings}
                           label="No. of openings"
                        ></Select>
                        <Textarea
                           rows={5}
                           {...inputsData.description}
                           label="Job description"
                           rightLabel="At least 100 characters"
                           placeholder={
                              "Selected candidate’s day-to-day responsibilities include: \n1. \n2. \n3."
                           }
                        ></Textarea>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <ProfileSetupFooter
            stepNo={1}
            buttonText="Continue"
            totalSteps={3}
            disableNext={disableNext()}
            onClickOnNext={() => setPage(1)}
         ></ProfileSetupFooter>
      </>
   );
};

const PostJob: React.FC<DashboardProps> = () => {
   return <PageWrapper Component={PostJobContent}></PageWrapper>;
};
export default PostJob;
