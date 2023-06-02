import { customFetch } from "../utils/helpers";

interface PersonalInfo {
   name?: {
      firstName?: string;
      lastName?: string;
   };
   phoneNum?: string;
   city?: string;
}

interface Language {
   language?: string;
   proficiency?: string;
}

interface UpscAttempt {
   state?: string;
   yearOfAttempt?: number;
   qualifiedForMains?: boolean;
   qualifiedForInterview?: boolean;
   optSubject?: string;
   language?: string;
}

interface StatePscAttempt {
   state?: string;
   yearOfAttempt?: number;
   qualifiedForMains?: boolean;
   qualifiedForInterview?: boolean;
   optSubject?: string;
   language?: string;
}

interface Other {
   title?: string;
   yearOfAttempt?: number;
   description?: string;
}

interface Grad {
   type?: string;
   value?: number;
}

interface WorkExperience {
   compName?: string;
   role?: string;
   description?: string;
   startDate?: string;
   endDate?: string;
   currentlyWorking?: boolean;
}

interface JobPref {
   timeAvail?: string;
   location?: string;
   languages?: Language[];
   strongSub?: string;
   coverLetter?: string;
   roles?: string[];
   isWillingToRelocate?: boolean;
   preffredLocations?: string[];
}

interface UpscJourney {
   upscAttempts?: UpscAttempt[];
   statePscAttempts?: StatePscAttempt[];
   others?: Other[];
}

interface UpdateStudentProfileDetailsBody {
   personalInfo?: PersonalInfo;
   onboardingState?: string;
   jobPref?: JobPref;
   grads?: Grad[];
   upscJourney?: UpscJourney;
   workExp?: WorkExperience[];
}
export interface StudentProfileDetails {
   personalInfo: PersonalInfo;
   onboardingState: string;
   jobPref: JobPref;
   grads: Grad[];
   upscJourney: UpscJourney;
   workExp: WorkExperience[];
}
export const UpdateStudentProfile = (data: UpdateStudentProfileDetailsBody) => {
   return customFetch<any>({
      method: "POST",
      path: "candidate/update",
      data,
   });
};
