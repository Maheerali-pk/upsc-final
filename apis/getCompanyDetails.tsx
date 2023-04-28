import { customFetch } from "../utils/helpers";

interface IComapnyDetails {
   _id: string;
   email: string;
   onboardingState: string;
   jobPostings: any[];
   __v: number;
   address: {
      firstLine: string;
      secondLine: string;
      landmark: string;
      city: string;
      state: string;
      pincode: string;
      _id: string;
   };
   name: {
      firstName: string;
      lastName: string;
      _id: string;
   };
   phoneNum: string;
   url: string;
   description: string;
   logo: string;
   organisationName: string;
   socialLinks: string[];
   type: string;
   updatedAt: string;
}

export const getCompanyProfile = () => {
   return customFetch<ICompanyDetails>({
      method: "GET",
      path: "company/profile",
   });
};
