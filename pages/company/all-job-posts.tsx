import * as React from "react";
import { useState } from "react";

import Head from "next/head";
import PageWrapper from "../../components/PageWrapper";
import CompanyNavbar from "../../components/CompanyNavbar";
import PrivateRoute from "../../components/PrivateRoute";
import CompleteProfileHeader from "../../components/CompleteProfileHeader";
import ProfileLevelCard, { IProfileLevelCardItem } from "../../components/ProfileLevelCard";
import { icons } from "../../utils/helpers";
import RecentPostsTable from "../../components/RecentPostsTable";
import { getJobPostsList } from "../../apis/getJobPostsList";
import HowToWorkWithTalent from "../../components/HowToWorkWithTalent";
import Input from "../../components/Input";

interface DashboardProps {}

const items: IProfileLevelCardItem[] = [
   {
      icon: icons.profileLevelCardIcons.invite,
      text: "Invite talent to apply",
      url: "/update-profile/skills",
   },
   {
      icon: icons.profileLevelCardIcons.invite,
      text: "Complete your profile",
      url: "/update-profile/skills",
   },
];
const AllJobPostsContent: React.FC<DashboardProps> = () => {
   const [posts, setPosts] = useState<IJobPostMini[]>([]);
   React.useEffect(() => {
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
         <CompanyNavbar selectedItem={0}></CompanyNavbar>
         <div className="flex flex-col gap-8 py-12 pb-24">
            <div className="flex flex-col gap-1">
               <div className="text-gray-900 font-semibold text-3xl">Your job posts</div>
               <div className="text-gray-600 font-normal text-base">View your job posts and applications</div>
            </div>
            <div className="flex flex-col gap-6 ">
               <div className="flex justify-between gap-4 py-3">
                  <div className="w-96">
                     <Input
                        startIcon={icons.searchBig}
                        placeholder="Search for job post"
                        value=""
                        onChange={() => {}}
                     ></Input>
                  </div>
               </div>
            </div>
         </div>
      </PrivateRoute>
   );
};

const AllJobPosts: React.FC<DashboardProps> = () => {
   return <PageWrapper Component={AllJobPostsContent}></PageWrapper>;
};
export default AllJobPosts;
