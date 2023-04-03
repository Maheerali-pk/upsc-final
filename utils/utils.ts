export const errors = {
   requiredField: "Please fill this field!",
   wrongCredentials: "Wrong email or password",
   weakPassword: "Minimum 8 characters with at least one uppercase character",
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
