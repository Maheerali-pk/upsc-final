import { customFetch } from "../utils/helpers";

export interface UpdateApplicationBody {
   type: IApplicationUpdateType;
   applicationIDs?: string[];
   description?: string;
   attachmentUrls?: string[];
   deadline?: string;
}

export const updateApplication = (
   jobId: string,
   data: UpdateApplicationBody
) => {
   return customFetch({
      method: "POST",
      path: `application/company/job/${jobId}`,
      data,
   });
};
