import Head from "next/head";
import PageWrapper from "../../components/PageWrapper";
import CompanyNavbar from "../../components/CompanyNavbar";
import PrivateRoute from "../../components/PrivateRoute";
import { icons } from "../../utils/helpers";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { useEffect, useState } from "react";
import AllJobPostsTable from "../../components/AllJobPostsTable";
import { getJobPostsList } from "../../apis/getJobPostsList";
import DateInputRange from "../../components/DateInputRange";

interface DashboardProps {}

const jobTypeSelectOptions: ISelectOption<IJobStatus | "ALL">[] = [
   { value: "ALL", text: "All posts" },
   { value: "OPEN", text: "Active" },
   { value: "HOLD", text: "On Hold" },
   { value: "UNDER_REVIEW", text: "Under review" },
   { value: "CLOSED", text: "Closed" },
];

const DashboardContent: React.FC<DashboardProps> = () => {
   const [jobType, setJobType] = useState<IJobStatus | "ALL">("ALL");
   const [posts, setPosts] = useState<IJobPostMini[]>([]);
   const [startDate, setStartDate] = useState<Date | null>(null);
   const [endDate, setEndDate] = useState<Date | null>(null);
   const onChange = (dates: [Date | null, Date | null]) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
   };
   useEffect(() => {
      getJobPostsList().then((res) => {
         setPosts(res.docs);
      });
   }, []);
   return (
      <PrivateRoute purpose="COMPANY">
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <CompanyNavbar selectedItem={1}></CompanyNavbar>

         <div className="flex flex-col gap-8 py-12 pb-24 px-28">
            <div className="flex flex-col gap-1">
               <div className="text-gray-900 font-semibold text-3xl">Your job posts</div>
               <div className="text-gray-600 font-normal text-base">View your job posts and applications</div>
            </div>
            <div className="flex flex-col gap-6 ">
               <div className="flex justify-between gap-4 items-center py-3">
                  <div className="w-96">
                     <Input
                        startIcon={icons.searchInput}
                        placeholder="Search for job post"
                        value=""
                        onChange={() => {}}
                     ></Input>
                  </div>
                  <div className="flex gap-3 items-center">
                     <DateInputRange
                        showFooter
                        endDate={endDate}
                        startDate={startDate}
                        onChange={onChange}
                     ></DateInputRange>
                     <div className="w-40">
                        <Select
                           options={jobTypeSelectOptions}
                           onChange={(value) => setJobType(value as IJobStatus | "ALL")}
                           value={jobType}
                           placeholder=""
                        ></Select>
                     </div>
                  </div>
               </div>
            </div>
            <AllJobPostsTable posts={posts}></AllJobPostsTable>
         </div>
      </PrivateRoute>
   );
};

const Dashboard: React.FC<DashboardProps> = () => {
   return <PageWrapper Component={DashboardContent}></PageWrapper>;
};
export default Dashboard;
