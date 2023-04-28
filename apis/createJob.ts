import { customFetch } from "../utils/helpers";

export interface CreateJobBody {
   opportunityType: string;
   position: string;
   description: string;
   exam: string;
   subjects: string[];
   workLanguage: string[];
   location: {
      type: "OFFICE" | "REMOTE" | "FLEXIBLE";
      city: string;
      state: string;
   };
   compensation: {
      stipendType: string;
      stipend: number;
      stipendPeriod: string;
   };
   timeAvail: "FT" | "PT" | "FR";
   skillSets: string[];
   preferences: {
      noOfMainsAttempted: number;
      workExp: {
         years: number;
         months: number;
      };
      isMainsRequired: boolean;
      isInterviewRequired: boolean;
   };
   openings: number;
   perks: string[];
   deadline: string;
   isCoverLetterRequired: boolean;
   questions: string[];
}

export function convertJobApplicationToOpportunity(
   application: IJobApplication
): CreateJobBody {
   const opportunity: CreateJobBody = {
      opportunityType: application.opportunityType,
      position: application.position,
      description: application.description,
      exam: application.exam,
      subjects: [...application.subjects],
      workLanguage: application.workLanguage,
      location: {
         type: application.locationType as "OFFICE" | "REMOTE" | "FLEXIBLE",
         city: application.city,
         state: application.state,
      },
      compensation: {
         stipendType: application.stipendType,
         stipend: parseInt(application.stipend, 10),
         stipendPeriod: application.stipendPeriod,
      },
      timeAvail: application.timeAvail as "FT" | "PT" | "FR",
      skillSets: application.skillSets,
      preferences: {
         noOfMainsAttempted: parseInt(application.noOfMainsAttempted, 10),
         workExp: {
            months: 0,
            years: parseInt(application.workExp, 10),
         },
         isMainsRequired: application.minQualification === "MAIN",
         isInterviewRequired:
            application.minQualification === "INTERVIEW" ||
            application.minQualification === "MAIN",
      },
      openings: parseInt(application.openings, 10),
      perks: application.perks,
      deadline: application.deadline,
      isCoverLetterRequired: application.isCoverLetterRequired,
      questions: application.questions,
   };

   console.log(opportunity, "data before sending");
   return opportunity;
}

export const createJob = (data: CreateJobBody) => {
   return customFetch<any>({
      method: "POST",
      path: "job/create-job",
      data,
   });
};
