import moment from "moment";
import { IApplication } from "../apis/getApplications";
import { icons } from "../utils/helpers";
import { getDurationString, turncateStringByWords } from "../utils/utils";
import { useState } from "react";
import Checkbox from "./Checkbox";

interface ApplicationCardProps {
   application: IApplication;
   selected: boolean;
   onChange: (val: boolean) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, selected, onChange }) => {
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
      <div className="flex flex-col items-center rounded-2xl gap-4 py-5 px-4 border border-gray-200 bg-white md:p-6 md:pb-7">
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
            <div className="text-gray-400 font-medium text-sm">Applied 2 days ago</div>
            <Checkbox wrapperClassName="md:hidden" value={selected} onChange={onChange} label={<></>}></Checkbox>
         </div>
         <div className="flex flex-col gap-6 border-b border-gray-200 pb-4">
            <div className="flex flex-col gap-4">
               <div className="text-gray-500 font-normal text-sm">Work experience:</div>
               {application.candidateID.workExp.map((work) => (
                  <div className="flex flex-col justify-center gap-1">
                     <div className="text-gray-900 font-medium text-sm">{work.role}</div>
                     <div className="flex items-center gap-2">
                        <div className="text-gray-500 font-normal text-sm">
                           {moment(new Date(work.startDate)).format("MMM YYYY")}-
                           {work.currentlyWorking ? "Present" : moment(new Date(work.endDate)).format("MMM YYYY")}
                        </div>
                        {icons.dot}
                        <div className="text-gray-500 font-normal text-sm">{getDurationString(work)}</div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="flex flex-col gap-1.5">
               <div className="text-gray-500 font-normal text-sm">Cover letter: </div>
               {renderCoverLetter()}
            </div>
         </div>
         <div className="flex gap-1.5 items-center w-full justify-center py-3.5">
            <div className="cursor-pointer flex gap-2 text-gray-500 font-semibold text-sm flex-grow w-full justify-center ">
               {icons.jobCardCompany.message}
               Message
            </div>
            <div className="border-r border-gray-300 h-6"></div>
            <div className="cursor-pointer flex gap-2 text-gray-500 font-semibold text-sm flex-grow  w-full justify-center">
               {icons.jobCardCompany.notes}
               Notes
            </div>
            <div className="border-r border-gray-300 h-6"></div>
            <div className="cursor-pointer flex gap-2 text-gray-500 font-semibold text-sm flex-grow w-full justify-center">
               {icons.jobCardCompany.shortlist}
               Shortlist
            </div>
         </div>
         <button className="btn-primary btn btn-sm w-full gap-2">Next steps {icons.jobCardCompany.caretDown}</button>
         <button className="btn btn-gray btn-outlined gap-2 btn-sm">
            {icons.jobCardCompany.notInterested}
            Not interested
         </button>
      </div>
   );
};

export default ApplicationCard;
