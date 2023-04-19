import { customFetch } from "../utils/helpers";

export interface UpdateCompanyProfileDetailsBody {
   // name: { firstName: string; lastName: string };
   organisationName: string;
   type: string;
   description: string;
   address: {
      firstLine?: string;
      secondLine?: string;
      landmark?: string;
      city: string;
      state: string;
      pincode: string;
   };
   url?: string;
   phoneNum?: string;
   logo?: string;
   onboardingState?: string;
   socialLinks: [string, string, string];
}
export const updateCompanyProfile = (data: UpdateCompanyProfileDetailsBody) => {
   return customFetch<any>({
      method: "POST",
      path: "company/update",
      data,
   });
};
