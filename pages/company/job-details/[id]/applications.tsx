import Head from "next/head";
import PageWrapper from "../../../../components/PageWrapper";
import CompanyNavbar from "../../../../components/CompanyNavbar";
import { icons } from "../../../../utils/helpers";
import JobDetailsSidebarItem from "../../../../components/JobDetailsSidebarItem";
import { useRouter } from "next/router";
import { routes } from "../../../../utils/utils";
import { useEffect, useState } from "react";
import { IApplication, getApplications } from "../../../../apis/getApplications";
import ApplicationCard from "../../../../components/ApplicationCard";
import JobDetailsPageLayout from "../../../../components/JobDetailsPageLayout";
import CompanyApplicationsPageHeader from "../../../../components/CompanyApplicationsPageHeader";
import Checkbox from "../../../../components/Checkbox";
import { updateApplication } from "../../../../apis/updateApplication";
import { useGlobalContext } from "../../../../contexts/GlobalContext";
import Loader from "../../../../components/Loader";
import CandidateHiredDialog from "../../../../dialogs/CandidateHiredDialog";
import classNames from "classnames";

interface ApplicationsContentProps {
   jobId: string;
}

const ApplicationsContent: React.FC<ApplicationsContentProps> = (props) => {
   const router = useRouter();
   const [applications, setApplications] = useState<IApplication[]>([]);
   const [selectedApplicatoins, setSelectedApplications] = useState<Set<string>>(new Set());
   const [selectAllValue, setSelectAllValue] = useState(false);
   const [state, dispatch] = useGlobalContext();

   useEffect(() => {
      console.log(props.jobId, "job id");
      if (props.jobId) {
         getApplications(props.jobId).then((res) => {
            setApplications(res.docs);
         });
      }
   }, [props.jobId]);

   const handleApplicationSelect = (id: string, value: boolean) => {
      const newSelected = new Set(selectedApplicatoins);
      if (!value) {
         newSelected.delete(id);
      } else {
         newSelected.add(id);
      }
      setSelectedApplications(newSelected);
   };
   const handleSelectAllChange = (val: boolean) => {
      if (val) {
         const newSet = new Set([...applications.map((x) => x._id)]);
         setSelectedApplications(newSet);
      } else {
         setSelectedApplications(new Set());
      }
      setSelectAllValue(val);
   };
   const onClickOnHire = () => {
      dispatch({ setState: { loading: true } });
      updateApplication(props.jobId, { type: "HIRE", applicationIDs: Array.from(selectedApplicatoins) }).then(() => {
         setTimeout(() => {
            dispatch({ setState: { loading: false, dialog: CandidateHiredDialog } });
         }, 1000);
      });
   };
   return (
      <div className="grid grid-flow-row h-screen grid-rows-[min-content_min-content_auto] overflow-auto">
         {state.dialog === CandidateHiredDialog ? <CandidateHiredDialog></CandidateHiredDialog> : null}
         <CompanyNavbar selectedItem={1}></CompanyNavbar>

         <JobDetailsPageLayout hideHeader={selectedApplicatoins.size > 0} jobId={props.jobId} selectedItem={1}>
            <div
               className={classNames(
                  "flex md:sticky flex-col md:px-28 md:h-17 justify-center md:justify-start gap-3 md:gap-8 py-6 px-4 md:py-0 bg-white top-0 w-full left-0 z-20 border-b border-gray-200 md:flex-row",
                  {
                     hidden: selectedApplicatoins.size === 0,
                     "md:flex": true,
                  }
               )}
            >
               <Checkbox label="Select All" onChange={handleSelectAllChange} value={selectAllValue}></Checkbox>
               <div
                  className={classNames("flex flex-col gap-3 md:flex-row md:items-center", {
                     "md:hidden": selectedApplicatoins.size === 0,
                  })}
               >
                  <button className="btn btn-outlined btn-gray btn-sm " onClick={onClickOnHire}>
                     Hire
                  </button>
                  <div className="grid grid-cols-2 gap-3 md:flex whitespace-nowrap">
                     <button className="btn btn-outlined btn-gray btn-sm">Message</button>
                     <button className="btn btn-outlined btn-gray btn-sm">Send Assignment</button>
                     <button className="btn btn-outlined btn-gray btn-sm">Shortlist</button>
                     <button className="btn btn-outlined btn-gray btn-sm">Not interested</button>
                  </div>
               </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-4 pb-24 md:px-28 md:overflow-auto">
               {applications.map((app) => (
                  <>
                     <ApplicationCard
                        selected={selectedApplicatoins.has(app._id)}
                        onChange={(val) => handleApplicationSelect(app._id, val)}
                        application={app}
                     ></ApplicationCard>
                  </>
               ))}
            </div>
         </JobDetailsPageLayout>
      </div>
   );
};

const Applications: React.FC = () => {
   const router = useRouter();

   const [jobId, setJobId] = useState<string>();
   useEffect(() => {
      setJobId(router.query.id as string);
   }, [router.query.id]);
   return <PageWrapper Component={<ApplicationsContent jobId={jobId || ""}></ApplicationsContent>}></PageWrapper>;
};
export default Applications;
