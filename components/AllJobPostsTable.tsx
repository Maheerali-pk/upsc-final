import moment from "moment";
import { routes } from "../utils/utils";
import { useRouter } from "next/router";
import classNames from "classnames";
import { jobStatusToText } from "../utils/data";
import { useEffect, useState } from "react";
import JobStatusBadge from "./JobStatusBadge";
import { icons } from "../utils/helpers";
import Dropdown from "./Dropdown";
import { getJobPostsList } from "../apis/getJobPostsList";

interface AllJobPostsTableProps {
   posts: IJobPostMini[];
}
const jobsPerPage = 5;

const AllJobPostsTable: React.FC<AllJobPostsTableProps> = ({ posts }) => {
   const [page, setPage] = useState(0);
   const router = useRouter();
   const totalPages = Math.ceil(posts.length / jobsPerPage);

   const renderPaginationButtons = () => {
      const allPages = Array(totalPages).fill(false);
      allPages[page] = true;
      if (page === 0) {
         allPages;
      }
      if (allPages[page + 1] !== undefined) allPages[page + 1] = true;
      if (allPages[page - 1] !== undefined) allPages[page - 1] = true;
   };
   const renderActionCell = (post: IJobPostMini) => {
      if (post.status === "UNDER_REVIEW") return <div></div>;
      if (post.status === "HOLD") return <button className="btn btn-link btn-gray">Learn more</button>;
      if (post.status === "OPEN")
         return (
            <button
               onClick={() => router.push(routes.company.jobDetails.applications(post._id))}
               className="btn btn-primary btn-link"
            >
               View Applications
            </button>
         );
      if (post.status === "CLOSED")
         return <button className="btn btn-link btn-gray">Hired Candidates {icons.openExternalArrow}</button>;
   };
   const renderNote = (post: IJobPostMini) => {
      if (post.status === "OPEN") {
         return (
            <div className="gap-1 flex items-center text-error-500 font-medium text-xs">
               {icons.alterCircle} Expires in 5 days. Click to extend
            </div>
         );
      }
      return null;
   };
   return (
      <div className="flex flex-col  rounded-xl border border-gray-200 shadow-sm">
         <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.25fr] items-center h-11">
            <div className="text-gray-600 font-medium text-xs pl-6">Position</div>
            <div className="text-gray-600 font-medium text-xs text-center">Status</div>
            <div className="text-gray-600 font-medium text-xs text-center">Applications</div>
            <div className="text-gray-600 font-medium text-xs text-center">Action</div>
            <div className="text-gray-600 font-medium text-xs text-center">Date</div>
            <div></div>
         </div>
         {posts.slice(jobsPerPage * page, jobsPerPage * (page + 1)).map((post) => (
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.25fr] items-center py-4 border-t border-gray-200">
               <div className="flex flex-col gap-1 pl-6">
                  <div className="text-gray-900 font-medium text-sm ">{post.position}</div>
                  {renderNote(post)}
               </div>
               <div className="flex items-center justify-center">
                  <JobStatusBadge status={post.status}></JobStatusBadge>
               </div>
               <div className="text-center text-gray-600 text-sm">{post.applications}</div>
               {renderActionCell(post)}
               <div className="text-center text-gray-600 text-sm">
                  {moment(new Date(post.createdAt)).format("DD MMM, YYYY")}
               </div>
               <Dropdown
                  items={[
                     { text: "Close job post", onClick: () => {}, icon: icons.jobActionsIcon.closeJob },

                     { text: "Extend deadline", onClick: () => {}, icon: icons.jobActionsIcon.extendDeadline },
                     { text: "Post similar job", onClick: () => {}, icon: icons.jobActionsIcon.postSimilarJob },
                  ]}
                  elm={<div className="flex items-center justify-end pr-6 cursor-pointer">{icons.threeDots}</div>}
               ></Dropdown>
            </div>
         ))}

         <div className="items-center flex justify-between border-t border-gray-200 px-6 py-3.5">
            <button className="btn btn-sm btn-gray btn-outlined gap-2 w-fit" onClick={() => setPage(page - 1)}>
               {icons.arrowLeft}
               <div>Previous</div>
            </button>
            <div className="flex">
               {Array(totalPages)
                  .fill(0)
                  .map((_, i) => (
                     <div
                        onClick={() => setPage(i)}
                        className={classNames(
                           "rounded-lg flex h-10 w-10 items-center justify-center text-gray-800 font-medium text-sm cursor-pointer",
                           {
                              "bg-gray-50": page === i,
                           }
                        )}
                     >
                        {i + 1}
                     </div>
                  ))}
            </div>
            <button className="btn btn-sm btn-gray btn-outlined gap-2 w-fit" onClick={() => setPage(page + 1)}>
               <div>Next</div>
               {icons.arrowRight}
            </button>
         </div>
      </div>
   );
};

export default AllJobPostsTable;
