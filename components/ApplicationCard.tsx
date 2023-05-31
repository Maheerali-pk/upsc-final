import moment from "moment";
import { IApplication } from "../apis/getApplications";
import { icons } from "../utils/helpers";
import { getDurationString, getDurationStringForWork, turncateStringByWords } from "../utils/utils";
import { useState } from "react";
import Checkbox from "./Checkbox";
import classNames from "classnames";
import DefaultButtonGroupApplicationCard from "./DefaultButtonGroupApplicationCard";

interface ApplicationCardProps {
   application: IApplication;
   selected: boolean;
   onChange: (val: boolean) => void;
   isAnySelected?: boolean;
   jobId: string;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, selected, onChange, isAnySelected, jobId }) => {
   const isCoverLetterLong = application.coverLetter.length > 180;
   const shortenedCoverLetter = turncateStringByWords(application.coverLetter, 180);
   const [showingFullCoverLetter, setShowingFullCoverLetter] = useState(false);
   const renderCoverLetter = () => {
      return (
         <div className="text-gray-900 font-normal text-sm">
            {showingFullCoverLetter ? application.coverLetter : shortenedCoverLetter}{" "}
            {isCoverLetterLong ? (
               <>
                  {showingFullCoverLetter ? null : "... "}
                  <span
                     onClick={() => setShowingFullCoverLetter(!showingFullCoverLetter)}
                     className="btn btn-primary btn-link w-fit inline"
                  >
                     {showingFullCoverLetter ? "Show Less" : "Show More"}
                  </span>
               </>
            ) : null}
         </div>
      );
   };
   return (
      <div className="flex flex-col rounded-2xl gap-4 py-5 px-4 border border-gray-200 bg-white md:p-6 md:pb-7 w-full items-start">
         <div className="flex justify-between items-start w-full border-b border-gray-100 pb-4">
            <div className="flex gap-2 items-start">
               <Checkbox
                  wrapperClassName="hidden md:flex translate-y-1"
                  value={selected}
                  onChange={onChange}
                  label={<></>}
               ></Checkbox>
               <div className="flex flex-col gap-1">
                  <div className="text-gray-900 font-semibold text-lg">
                     {application.candidateID.personalInfo.name.firstName}{" "}
                     {application.candidateID.personalInfo.name.lastName}
                  </div>
                  <div className="text-gray-500 font-medium text-sm">Pune, Maharashtra</div>
               </div>
            </div>
            <div className="text-gray-400 font-medium text-sm">
               Applied {getDurationString(new Date(application.createdAt), new Date())} ago
            </div>
            <Checkbox wrapperClassName="md:hidden" value={selected} onChange={onChange} label={<></>}></Checkbox>
         </div>
         <div className="flex flex-col gap-0 md:gap-8 border-b border-gray-200 pb-4 md:pb-8 md:grid grid-cols-[auto_auto] ">
            <div className="text-gray-500 font-normal text-sm mb-4 md:mb-0">Work experience:</div>
            <div className="flex flex-col gap-4 md:gap-3 mb-6 md:mb-0">
               {application.candidateID.workExp.slice(0, 2).map((work, i) => (
                  <div className="flex flex-col md:flex-row  gap-1 md:gap-2 md:items-center">
                     <div className="text-gray-900 font-medium text-sm md:text-base">{work.role}</div>

                     <div className="hidden md:flex ">{icons.dot}</div>
                     <div className="flex items-center gap-2">
                        <div className="text-gray-500 font-normal text-sm md:text-base">
                           {moment(new Date(work.startDate)).format("MMM YYYY")}-
                           {work.currentlyWorking ? "Present" : moment(new Date(work.endDate)).format("MMM YYYY")}
                        </div>
                        {icons.dot}
                        <div className="text-gray-500 font-normal text-sm md:text-base">
                           {getDurationStringForWork(work)}
                        </div>
                     </div>
                     {i === 1 && application.candidateID.workExp.length > 2 ? (
                        <div className="text-gray-500 font-normal text-sm cursor-pointer ml-2.5 hidden md:flex">
                           +{application.candidateID.workExp.length - 2} more
                        </div>
                     ) : null}
                  </div>
               ))}
            </div>
            <div className="text-gray-500 font-normal text-sm mb-1.5 md:mb-0">Cover letter: </div>
            <div className="flex flex-col gap-1.5">{renderCoverLetter()}</div>
         </div>
         <DefaultButtonGroupApplicationCard
            jobId={jobId}
            isAnySelected={isAnySelected}
            application={application}
         ></DefaultButtonGroupApplicationCard>
      </div>
   );
};

export default ApplicationCard;
