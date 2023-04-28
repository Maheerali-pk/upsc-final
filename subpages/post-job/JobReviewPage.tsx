import Head from "next/head";
import { useState, useEffect } from "react";

import CompanyNavbar from "../../components/CompanyNavbar";
import { useForm } from "../../hooks/useForm";
import JobCard from "../../components/JobCard";
import { icons } from "../../utils/helpers";
import JobDetails from "../../components/JobDetails";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { getCompanyProfile } from "../../apis/getCompanyDetails";
import Loader from "../../components/Loader";
import ProfileSetupFooter from "../../components/ProfileSetupFooter";

interface JobReviewPageProps {
   formData: ReturnType<typeof useForm<IJobApplication, {}>>;

   onClickOnBack: () => void;
   onClickOnNext: () => void;
}

const JobReviewPage: React.FC<JobReviewPageProps> = ({
   formData: { inputsData },
   onClickOnBack,
   onClickOnNext,
}) => {
   const values = Object.fromEntries(
      Object.entries(inputsData).map(([key, value]) => [key, value.value])
   ) as IJobApplication;
   const [companyDetails, setCompanyDetails] = useState<ICompanyDetails>();
   const [state, dispatch] = useGlobalContext();
   useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
   }, []);
   useEffect(() => {
      console.log("Company details api called");
      if (!companyDetails) {
         dispatch({ setState: { loading: true } });
         getCompanyProfile()
            .then((res) => {
               dispatch({ setState: { loading: false } });
               setCompanyDetails(res);
            })
            .catch((err) => {
               console.log(err);
            });
      }
   }, []);
   console.log(inputsData, "inputs data");
   if (!companyDetails) return null;
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <CompanyNavbar selectedItem={2}></CompanyNavbar>
         <Loader></Loader>
         <div className="pt-14 pb-10 md:pb-60">
            <div className="w-full md:w-904 mx-auto flex flex-col">
               {/* Header */}
               <div className="flex flex-col gap-12 mb-14">
                  <div className="flex flex-col gap-5 items-center  pb-6">
                     {icons.reviewJob}
                     <div className="text-3xl font-semibold text-gray-900">
                        Post a job
                     </div>
                  </div>
               </div>
               <JobCard {...(values as IJobApplication)}></JobCard>
               <JobDetails
                  companyDetails={companyDetails}
                  details={values}
               ></JobDetails>
            </div>
         </div>
         <ProfileSetupFooter
            stepNo={2}
            totalSteps={3}
            onClickOnBack={onClickOnBack}
            onClickOnNext={onClickOnNext}
            buttonText="Post Job"
         ></ProfileSetupFooter>
      </>
   );
};

export default JobReviewPage;
