import CompleteProfileHeader from "../../components/CompleteProfileHeader";
import PageWrapper from "../../components/PageWrapper";
import ProfileLevelCard from "../../components/ProfileLevelCard";
import { icons } from "../../utils/helpers";

interface DashboardProps {}

const DashboardPage: React.FC<DashboardProps> = () => {
   return (
      <div className="flex flex-col">
         <CompleteProfileHeader completePercentage={56}></CompleteProfileHeader>
         <div className="flex flex-col px-28 py-14 bg-gray-100 gap-8">
            <div className="flex justify-between">
               <div className="text-3xl font-semibold">Jobs for you</div>
               <div className="gap-3 flex">
                  <button className="btn btn-primary btn-sm">
                     Search for jobs
                  </button>
                  <button className="btn bg-white btn-outlined btn-gray btn-sm">
                     {icons.bookmark}
                     Saved
                  </button>
               </div>
            </div>
            <div className="flex">
               <div className="flex flex-col"></div>
               <div className="flex flex-col gap-8 w-72">
                  <ProfileLevelCard completedPercentage={56}></ProfileLevelCard>
                  <img src="/images/ad-image.png" className="rounded-2xl"></img>
               </div>
            </div>
         </div>
      </div>
   );
};

const Dashboard: React.FC = () => {
   return <PageWrapper Component={DashboardPage}></PageWrapper>;
};
export default Dashboard;
