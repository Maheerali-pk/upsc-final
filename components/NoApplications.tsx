import { useRouter } from "next/router";
import { icons } from "../utils/helpers";

interface NoApplicationsProps {
   type: IApplicationStatus;
}

const texts: { [k in IApplicationStatus]?: string } = {
   HIRED: "No candidates have been hired yet",
   REJECTED: "No applications have been rejected yet",
   SHORT_LISTED: "No candidates have been shortlisted yet",
   UNDER_REVIEW: "No applications are under review.",
};

const NoApplications: React.FC<NoApplicationsProps> = (props) => {
   const router = useRouter();
   const renderActionButton = () => {
      if (props.type === "UNDER_REVIEW") {
         return (
            <button onClick={() => {}} className="btn btn-md btn-primary">
               Go to overview
            </button>
         );
      }
      return (
         <button onClick={() => {}} className="btn btn-md btn-primary">
            View applications received
         </button>
      );
   };
   return (
      <div className="flex flex-col justify-center items-center gap-8 h-full">
         <div className="flex flex-col items-center gap-5">
            {icons.noApplications}
            <div className="text-gray-900 font-semibold text-xl">
               {texts[props.type]}
            </div>
         </div>
         {renderActionButton()}
      </div>
   );
};

export default NoApplications;
