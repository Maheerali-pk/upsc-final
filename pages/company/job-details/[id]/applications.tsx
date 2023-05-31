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

   const reloadApplications = () => {
      if (props.jobId) {
         getApplications(props.jobId).then((res) => {
            setApplications(res.docs);
         });
      }
   };
   useEffect(() => {
      reloadApplications();
   }, [props.jobId]);
   return (
      <div className="grid grid-flow-row h-screen grid-rows-[min-content_min-content_auto] overflow-auto">
         {state.dialog === CandidateHiredDialog ? <CandidateHiredDialog></CandidateHiredDialog> : null}
         <CompanyNavbar selectedItem={1}></CompanyNavbar>

         <JobDetailsPageLayout
            reloadApplications={reloadApplications}
            myApplications={applications.filter((x) => x.status === "UNDER_REVIEW")}
            allApplications={applications}
            hideHeader={selectedApplicatoins.size > 0}
            jobId={props.jobId}
            selectedItem={1}
         ></JobDetailsPageLayout>
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
