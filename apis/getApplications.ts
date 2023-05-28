import { customFetch } from "../utils/helpers";

export interface IApplication {
   _id: string;
   candidateID: {
      _id: string;
      personalInfo: {
         name: {
            firstName: string;
            lastName: string;
         };
      };
      workExp: IWorkMini[];
   };
   jobID: {
      _id: string;
      position: string;
   };
   coverLetter: string;
   status: IJobStatus;
   createdAt: string;
}

export const getApplications = (jobId: string) => {
   return customFetch<{ docs: IApplication[] }>({
      method: "GET",
      path: `application/company/job/${jobId}`,
   });
};
