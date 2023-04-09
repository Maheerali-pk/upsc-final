import { customFetch } from "../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
interface AccountSignUpBody {
   email: string;
   password: string;
   purpose: "CANDIDATE" | "COMPANY";
   phoneNum?: string;
   name?: string;
   confirmPassword?: string;
}
interface SignUpResponse {
   token: string;
   onboardingState: "PERSONALINFO" | "COMPANYINFO" | "COMPLETE";
}
export const accountSignUp = (data: AccountSignUpBody) => {
   return customFetch<SignUpResponse>({
      method: "POST",
      path: "account/signup",
      data,
   });
};
