import * as React from "react";
import { useState } from "react";

import Head from "next/head";
import PageWrapper from "../../components/PageWrapper";
import CompanyNavbar from "../../components/CompanyNavbar";
import PrivateRoute from "../../components/PrivateRoute";
import CompleteProfileHeader from "../../components/CompleteProfileHeader";
import ProfileLevelCard, {
   IProfileLevelCardItem,
} from "../../components/ProfileLevelCard";
import { icons } from "../../utils/helpers";
import RecentPostsTable from "../../components/RecentPostsTable";
import { getJobPostsList } from "../../apis/getJobPostsList";
import HowToWorkWithTalent from "../../components/HowToWorkWithTalent";

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
         <div className="flex flex-col px-28 py-8 gap-14">
            <CompleteProfileHeader
               totalSteps={5}
               completedSteps={3}
            ></CompleteProfileHeader>
            <div className="grid grid-cols-[auto_18rem] w-full gap-8">
               <div className="flex flex-col gap-8 ">
                  <div className="flex items-center justify-between w-full gap-2">
                     <div className="text-gray-900 font-semibold text-3xl">
                        Recent Posts
                     </div>
                     <button className="btn btn-md btn-primary w-fit">
                        View all posts
                     </button>
                  </div>
                  <RecentPostsTable
                     posts={posts.slice(0, 3)}
                  ></RecentPostsTable>
                  <HowToWorkWithTalent></HowToWorkWithTalent>
               </div>
               <div className="flex flex-col gap-8 ">
                  <ProfileLevelCard
                     items={items}
                     completedPercentage={56}
                  ></ProfileLevelCard>
                  <img
                     src="/images/ad-image.png"
                     className="rounded-2xl"
                     alt=""
                  />
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
