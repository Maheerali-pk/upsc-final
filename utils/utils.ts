export const errors = {
   requiredField: "Please fill this field!",
   wrongCredentials: "Wrong email or password",
};
export const routes = {
   login: "/auth/login",
   signup: {
      base: "/auth/signup",
      company: "/auth/signup/company",
      student: "/auth/signup/student",
   },
} as const;
