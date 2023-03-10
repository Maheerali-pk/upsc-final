import { customFetch } from "../../utils/helpers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export const loginApi = (data: { email: string; password: string }) => {
   return customFetch({ data: data, method: "post", path: "/account/login" });
};
