import Head from "next/head";
import PageWrapper from "../components/PageWrapper";
import CompanyNavbar from "../components/CompanyNavbar";
import { icons } from "../utils/helpers";
import JobDetailsSidebarItem from "../components/JobDetailsSidebarItem";
import { useRouter } from "next/router";
import { routes } from "../utils/utils";
import { useEffect, useState } from "react";
import { IApplication, getApplications } from "../apis/getApplications";
import ApplicationCard from "../components/ApplicationCard";
import Input from "./Input";
import Select from "./Select";
import classNames from "classnames";
import Loader from "./Loader";

type JobDetailsRoute = keyof typeof routes.company.jobDetails;
interface JobDetailsPageLayoutProps {
   jobId: string;
   selectedItem: number;
   selectedItemValue?: JobDetailsRoute;
   children?: React.ReactNode;
   hideHeader?: boolean;
   applications: IApplication[];
}

const JobDetailsPageLayout: React.FC<JobDetailsPageLayoutProps> = (props) => {
   const router = useRouter();
   const [searchValue, setSearchValue] = useState("");
   return (
      <>
         <Loader></Loader>
         <div
            className={classNames("flex flex-col w-full items-start py-6 px-4 md:p-8 gap-4 border-b border-gray-200", {
               hidden: props.hideHeader,
               "md:flex": true,
            })}
         >
            <button className="btn btn-md btn-gray btn-link flex gap-2 w-fit px-0">
               {icons.arrowLeft}
               Back to dashboard
            </button>
            <div className="flex gap-4 md:gap-0 md:justify-between md:items-center md:flex-row w-full flex-col">
               <div className="font-semibold text-3xl text-gray-900">Title</div>
               <Input
                  className="md:w-fit w-full"
                  onChange={setSearchValue}
                  value={searchValue}
                  startIcon={icons.searchInput}
                  placeholder="Search for applicants by name"
               />
            </div>
         </div>
         <div className="grid grid-rows-[auto] h-full md:grid md:grid-cols-[17.5rem_auto] w-full overflow-auto">
            <div className="md:flex flex-col w-full p-4 hidden">
               <JobDetailsSidebarItem
                  text="Overview"
                  onClick={() => router.push(routes.company.jobDetails.base(router.query.id as string))}
                  selected={props.selectedItem === 0}
               ></JobDetailsSidebarItem>
               <JobDetailsSidebarItem
                  text="Applications received"
                  badgeNumber={props.applications.length}
                  onClick={() => router.push(routes.company.jobDetails.applications(router.query.id as string))}
                  selected={props.selectedItem === 1}
               ></JobDetailsSidebarItem>
               <JobDetailsSidebarItem
                  text="Shortlisted"
                  badgeNumber={props.applications.filter((x) => x.status === "SHORT_LISTED").length}
                  onClick={() => router.push(routes.company.jobDetails.applications(router.query.id as string))}
                  selected={props.selectedItem === 2}
               ></JobDetailsSidebarItem>
               <JobDetailsSidebarItem
                  text="Hired"
                  badgeNumber={props.applications.filter((x) => x.status === "HIRED").length}
                  onClick={() => router.push(routes.company.jobDetails.applications(router.query.id as string))}
                  selected={props.selectedItem === 3}
               ></JobDetailsSidebarItem>
               <JobDetailsSidebarItem
                  text="Not interested"
                  badgeNumber={props.applications.filter((x) => x.status === "REJECTED").length}
                  onClick={() => router.push(routes.company.jobDetails.applications(router.query.id as string))}
                  selected={props.selectedItem === 4}
               ></JobDetailsSidebarItem>
               <div className="border-t border-gray-200 w-full"></div>
               <JobDetailsSidebarItem
                  text="Assignments"
                  badgeNumber={10}
                  onClick={() => router.push(routes.company.jobDetails.applications(router.query.id as string))}
                  selected={props.selectedItem === 5}
               ></JobDetailsSidebarItem>
               <JobDetailsSidebarItem
                  text="Chat messages"
                  badgeNumber={10}
                  onClick={() => router.push(routes.company.jobDetails.applications(router.query.id as string))}
                  selected={props.selectedItem === 5}
               ></JobDetailsSidebarItem>
            </div>
            <div className="bg-gray-100 overflow-auto">{props.children}</div>
            <div className="gap-2 md:hidden p-4 bg-white border-t border-gray-200 fixed bottom-0 left-0 w-full">
               <Select<JobDetailsRoute>
                  placeholder="Select"
                  options={[
                     { value: "base", heading: "Overview" },
                     { value: "applications", heading: "Applications Recieved" },
                     { value: "shortlisted", heading: "Shortlisted" },
                     { value: "hired", heading: "Hired" },
                     { value: "notInterested", heading: "Not interested" },
                     { value: "assignments", heading: "Assignments" },
                     { value: "chat", heading: "Chat messages" },
                  ]}
                  onChange={() => {}}
                  value={props.selectedItemValue || "base"}
                  openOnTop
                  menuClassName="w-screen top-0 shadow-none rounded-none pb-0.5"
                  relativeParent={false}
               ></Select>
            </div>
         </div>
      </>
   );
};

export default JobDetailsPageLayout;
