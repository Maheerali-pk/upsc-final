import classNames from "classnames";
import moment from "moment";
import { useRouter } from "next/router";
import { routes } from "../utils/utils";
import { icons } from "../utils/helpers";

interface RecentPostsTableProps {
   posts: IJobPostMini[];
}

const jobStatusToText: { [key in IJobStatus]: string } = {
   CLOSED: "Closed",
   HOLD: "On Hold",
   OPEN: "Active",
   UNDER_REVIEW: "Under Review",
};

const RecentPostsTable: React.FC<RecentPostsTableProps> = (props) => {
   const router = useRouter();
   if (props.posts.length === 0)
      return (
         <div className="flex flex-col gap-8 items-center justify-center rounded-xl border border-gray-200 shadow-sm pt-12 pb-14">
            {icons.searchBig}
            <div className="flex flex-col gap-2 items-center">
               <div className="text-gray-900 font-semibold text-xl">
                  Post a job
               </div>
               <div className="text-gray-600 font-normal text-base">
                  Click below to post a job and start hiring
               </div>
            </div>
            <button
               className="btn btn-md btn-primary w-fit"
               onClick={() => router.push(routes.company.postJob)}
            >
               Post a job
            </button>
         </div>
      );
   return (
      <div className="flex flex-col  rounded-xl border border-gray-200 shadow-sm">
         <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center h-11">
            <div className="text-gray-600 font-medium text-xs pl-6">
               Position
            </div>
            <div className="text-gray-600 font-medium text-xs text-center">
               Status
            </div>
            <div className="text-gray-600 font-medium text-xs text-center">
               Applications
            </div>
            <div className="text-gray-600 font-medium text-xs text-center">
               Action
            </div>
            <div className="text-gray-600 font-medium text-xs text-center">
               Date
            </div>
         </div>
         {props.posts.map((post) => (
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center py-4 border-t border-gray-200">
               <div className="text-gray-900 font-medium text-sm pl-6">
                  {post.position}
               </div>
               <div className="flex items-center justify-center">
                  <div
                     className={classNames(
                        "flex justify-center items-center rounded-2xl py-0.5 w-28 font-medium text-xs",
                        {
                           "text-secondary-700": post.status === "UNDER_REVIEW",
                           "bg-secondary-50": post.status === "UNDER_REVIEW",
                           "text-error-700": post.status === "HOLD",
                           "bg-error-50": post.status === "HOLD",
                           "text-success-700": post.status === "OPEN",
                           "bg-success-50": post.status === "OPEN",
                        }
                     )}
                  >
                     {jobStatusToText[post.status]}
                  </div>
               </div>
               <div className="text-center text-gray-600 text-sm">
                  {post.applications}
               </div>
               <div
                  className="btn btn-link btn-primary text-sm"
                  onClick={() =>
                     router.push(routes.company.jobDetails(post._id))
                  }
               >
                  View
               </div>
               <div className="text-center text-gray-600 text-sm">
                  {moment(new Date(post.createdAt)).format("DD MMM, YYYY")}
               </div>
            </div>
         ))}
      </div>
   );
};

export default RecentPostsTable;
