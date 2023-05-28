import Head from "next/head";
import PageWrapper from "../../../../components/PageWrapper";
import CompanyNavbar from "../../../../components/CompanyNavbar";
import { icons } from "../../../../utils/helpers";
import JobDetailsSidebarItem from "../../../../components/JobDetailsSidebarItem";
import { useRouter } from "next/router";
import { routes } from "../../../../utils/utils";

interface DashboardProps {}

const JobDetailsContent: React.FC<DashboardProps> = () => {
   const router = useRouter();

   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <CompanyNavbar selectedItem={1}></CompanyNavbar>
         <div className="flex flex-col w-full items-start p-8 gap-4 border-b border-gray-200">
            <button className="btn btn-md btn-gray btn-link flex gap-2 w-fit px-0">
               {icons.arrowLeft}
               Back to dashboard
            </button>
            <div className="font-semibold text-3xl text-gray-900">Title</div>
         </div>
         <div className="grid grid-cols-[17.5rem_auto] w-full">
            <div className="flex flex-col w-full p-4">
               <JobDetailsSidebarItem
                  text="Overview"
                  onClick={() => router.push(routes.company.jobDetails(router.query.id as string))}
               ></JobDetailsSidebarItem>
               <JobDetailsSidebarItem
                  text="Applications received"
                  badgeNumber={10}
                  onClick={() => router.push(routes.company.jobDetails(router.query.id as string))}
                  selected
               ></JobDetailsSidebarItem>
            </div>
            <div className="flex flex-col gap-1 bg-gray-200"></div>
         </div>
      </>
   );
};

const JobDetails: React.FC<DashboardProps> = () => {
   return <PageWrapper Component={JobDetailsContent}></PageWrapper>;
};
export default JobDetails;
