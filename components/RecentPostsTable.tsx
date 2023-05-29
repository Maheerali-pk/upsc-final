import classNames from "classnames";
import moment from "moment";
import { useRouter } from "next/router";
import { routes } from "../utils/utils";
import { icons } from "../utils/helpers";
import { jobStatusToText } from "../utils/data";
import JobStatusBadge from "./JobStatusBadge";
console.log("hello");

interface RecentPostsTableProps {
   posts: IJobPostMini[];
}

const RecentPostsTable: React.FC<RecentPostsTableProps> = (props) => {
   const router = useRouter();
   if (props.posts.length === 0)
      return (
         <div className="flex flex-col gap-8 items-center justify-center rounded-xl border border-gray-200 shadow-sm pt-12 pb-14">
            {icons.searchBig}
            <div className="flex flex-col gap-2 items-center">
               <div className="text-gray-900 font-semibold text-xl">Post a job</div>
               <div className="text-gray-600 font-normal text-base">Click below to post a job and start hiring</div>
            </div>
            <button className="btn btn-md btn-primary w-fit" onClick={() => router.push(routes.company.postJob)}>
               Post a job
            </button>
         </div>
      );
   return (
      <div className="flex flex-col  rounded-xl border border-gray-200 shadow-sm">
         <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center h-11">
            <div className="text-gray-600 font-medium text-xs pl-6">Position</div>
            <div className="text-gray-600 font-medium text-xs text-center">Status</div>
            <div className="text-gray-600 font-medium text-xs text-center">Applications</div>
            <div className="text-gray-600 font-medium text-xs text-center">Action</div>
            <div className="text-gray-600 font-medium text-xs text-center">Date</div>
         </div>
         {props.posts.map((post) => (
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center py-4 border-t border-gray-200">
               <div className="text-gray-900 font-medium text-sm pl-6">{post.position}</div>
               <div className="flex items-center justify-center">
                  <JobStatusBadge status={post.status}></JobStatusBadge>
               </div>
               <div className="text-center text-gray-600 text-sm">{post.applications}</div>
               <div
                  className="btn btn-link btn-primary text-sm"
                  onClick={() => router.push(routes.company.jobDetails.base(post._id))}
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
