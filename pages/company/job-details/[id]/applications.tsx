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

interface ApplicationsContentProps {
   jobId: string;
}

const ApplicationsContent: React.FC<ApplicationsContentProps> = (props) => {
   const router = useRouter();
   const [applications, setApplications] = useState<IApplication[]>([]);
   const [selectedApplicatoins, setSelectedApplications] = useState<Set<string>>(new Set());

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
   return (
      <div className="grid grid-flow-row h-screen grid-rows-[min-content_min-content_auto] overflow-auto">
         <CompanyNavbar selectedItem={1}></CompanyNavbar>
         <JobDetailsPageLayout jobId={props.jobId} selectedItem={1}>
            <div className="flex flex-col items-center justify-center gap-2 p-4 pb-24">
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
