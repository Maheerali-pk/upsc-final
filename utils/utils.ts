import moment from "moment";

export const errors = {
   requiredField: "Please fill this field!",
   wrongCredentials: "Wrong email or password",
   weakPassword: "Minimum 8 characters with at least one uppercase character",
   userAlreadyExist: "User already exists !",
   atleast90: "The description should be at least 90 characters long",
};
export const warnings = {
   gmailAddress:
      "👋🏻 We noticed you’re using a gmail.com address. Would you like to use your work email instead?",
};
export const routes = {
   login: "/auth/login",
   signup: {
      base: "/auth/signup",
      company: "/auth/signup/company",
      student: "/auth/signup/student",
   },

   company: {
      setupProfile: {
         base: "/company/setup-profile",
         success: "/company/setup-profile/success",
      },
      editProfile: "/company/edit-profile",
      dashboard: "/company/dashboard",
      postJob: "/company/post-job",
      successfulPostJob: "/company/post-job/success",
      jobDetails: {
         base: (id: string) => `/company/job-details/${id}`,
         applications: (id: string) =>
            `/company/job-details/${id}/applications`,
         shortlisted: (id: string) => `/company/job-details/${id}/shortlisted`,
         hired: (id: string) => `/company/job-details/${id}/hired`,
         notInterested: (id: string) =>
            `/company/job-details/${id}/notInterested`,
         assignments: (id: string) => `/company/job-details/${id}/assignments`,
         chat: (id: string) => `/company/job-details/${id}/chat`,
      },
   },

   student: {
      setupProfile: {
         base: "/student/setup-profile",
         exams: "/student/setup-profile/exams",
         work: "/student/setup-profile/work",
         education: "/student/setup-profile/education",
         success: "/company/setup-profile/success",
      },
   },
   forgetPass: {
      base: "/auth/forget-pass",
      sent: "/auth/reset-link-sent",
      newpass: "/auth/new-password",
      newpassSuccess: "/auth/set-new-password-success",
   },
} as const;

export const fileToBase64 = (
   file: File
): Promise<string | ArrayBuffer | null> => {
   const reader = new FileReader();
   reader.readAsDataURL(file);
   return new Promise((res, rej) => {
      reader.onload = () => {
         res(reader.result);
      };
   });
};

export const getDurationStringForWork = (work: IWorkMini) => {
   const start = new Date(work.startDate);
   const end = work.currentlyWorking ? new Date() : new Date(work.startDate);
   return getDurationString(start, end);
};

export const getDurationString = (startDate: Date, endDate: Date): string => {
   const start = moment(new Date(startDate));
   const end = moment(new Date(endDate));
   const diff = moment.duration(end.diff(start));
   const seconds = diff.asSeconds();
   const mins = diff.asMinutes();
   const hours = diff.asHours();
   const days = diff.asDays();
   const months = diff.asMonths();
   const years = diff.asYears();

   let res = `${Math.floor(seconds)} second${
      Math.floor(seconds) > 1 ? "s" : ""
   }`;

   if (seconds >= 60) {
      res = `${Math.floor(mins)} minute${Math.floor(mins) > 1 ? "s" : ""}`;
   }
   if (mins >= 60) {
      res = `${Math.floor(hours)} hour${Math.floor(hours) > 1 ? "s" : ""}`;
   }
   if (hours >= 24) {
      res = `${Math.floor(days)} day${Math.floor(days) > 1 ? "s" : ""}`;
   }
   if (days >= 30) {
      res = `${Math.floor(months)} month${Math.floor(months) > 1 ? "s" : ""}`;
   }
   if (months >= 12) {
      res = `${Math.floor(years)} year${Math.floor(years) > 1 ? "s" : ""}`;
   }

   return res;
};

export const turncateStringByWords = (str: string, len: number) => {
   const words = str.split(" ");
   let res = "";
   while (words.length && res.length + words[0].length < len) {
      res += " " + words.shift();
   }
   return res;
};

export const getApplicationAlertText = (
   updateType: IApplicationUpdateType,
   noOfApplications: number
) => {
   if (updateType === "REJECT") {
      return `${noOfApplications} applicant${
         noOfApplications === 1 ? "" : "s"
      } moved to Not interested. Showing next applicants in the list`;
   } else if (updateType === "SHORTLIST") {
      return `Shortlisted ${noOfApplications} applicant${
         noOfApplications === 1 ? "" : "s"
      } . Showing next applicants in the list`;
   } else if (updateType === "HIRE") {
      return `Hired ${noOfApplications} applicant${
         noOfApplications === 1 ? "" : "s"
      } . Showing next applicants in the list`;
   }
   return "";
};
