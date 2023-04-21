import { customFetch } from "../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
interface ForgetPasswordBody {
   email: string;
}

export const forgetPassword = (data: ForgetPasswordBody) => {
   return customFetch({
      method: "POST",
      path: "account/forgot-password-send-email",
      data,
   });
};
