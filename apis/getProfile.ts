import { customFetch } from "../utils/helpers";
import { StudentProfileDetails } from "./updateStudentProfile";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export const getCompanyProfile = () => {
   return customFetch({ method: "GET", path: "company/profile" });
};

export const getCandidateProfile = () => {
   return customFetch<StudentProfileDetails>({
      method: "GET",
      path: "candidate/profile",
   });
};
