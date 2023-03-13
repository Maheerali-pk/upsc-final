import { customFetch } from "../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export const getCompanyProfile = () => {
   return customFetch({ method: "get", path: "company/profile" });
};

export const getCandidateProfile = () => {
   return customFetch({ method: "get", path: "candidate/profile" });
};
