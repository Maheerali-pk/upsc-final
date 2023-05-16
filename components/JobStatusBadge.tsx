import classNames from "classnames";
import { jobStatusToText } from "../utils/data";

interface JobStatusBadgeProps {
	status: IJobStatus;
	
}
 
const JobStatusBadge: React.FC<JobStatusBadgeProps> = ({status}) => {
	return (  
                  <div
                     className={classNames(
                        "flex justify-center items-center rounded-2xl py-0.5 w-28 font-medium text-xs",
                        {
                           "text-secondary-700": status === "UNDER_REVIEW",
                           "bg-secondary-50": status === "UNDER_REVIEW",
                           "text-error-700": status === "HOLD",
                           "bg-error-50": status === "HOLD",
                           "text-success-700": status === "OPEN",
                           "bg-success-50": status === "OPEN",
                        }
                     )}
                  >
                     {jobStatusToText[status]}
                  </div>
		);
}
 
export default JobStatusBadge;