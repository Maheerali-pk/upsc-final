import { customFetch } from "../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
interface AccountSignUpBody {
   email: string;
   password: string;
   phoneNumber?: string;
   firstName?: string;
   lastName?: string;
}
export const accountSignUp = () => {
   return customFetch({ method: "get", path: "company/profile" });
};

export const getCandidateProfile = () => {
   return customFetch({ method: "get", path: "candidate/profile" });
};
