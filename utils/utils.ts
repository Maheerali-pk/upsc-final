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
