import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useForm } from "../hooks/useForm";
import { checks, icons } from "../utils/helpers";
import { routes } from "../utils/utils";
import Input from "./Input";
import OrDivider from "./OrDivider";

interface SignupFormProps {
   className?: string;
   type: "student" | "company";
   heading: string;
}

const SignupForm: React.FC<SignupFormProps> = ({
   className = "",
   type,
   heading,
}) => {
   const [state, dispatch] = useGlobalContext();
   const router = useRouter();
   const { inputsData, onSubmit } = useForm<
      {
         firstName: string;
         lastName: string;
         email: string;
         phone: string;
         password: string;
      },
      {}
   >({
      inputs: {
         email: {
            value: "",
            checks: [checks.required.string, checks.workEmailWarning],
         },
         firstName: { value: "", checks: [checks.required.string] },
         lastName: { value: "", checks: [checks.required.string] },
         password: {
            value: "",
            state: {
               text: "Minimum 8 characters with at least one uppercase character",
               type: "primary",
            },
            checks: [checks.required.string, checks.password],
         },
         phone: { value: "", checks: [checks.required.string] },
      },
   });
   const handleSubmit = () => {
      const error = onSubmit();
      if (!error) {
      }
   };
   return (
      <div className={"flex flex-col  " + className}>
         <div
            className={classNames(
               "font-semibold text-2xl md:text-3xl mb-10 text-center md:text-left md:mb-14",
               { "md:text-center": type === "student" }
            )}
         >
            {heading}
         </div>
         <div className="inputs-y">
            <div className="inputs-y flex md:flex-row">
               <Input
                  placeholder="First name"
                  label="First Name"
                  testId="signup-firstname"
                  {...inputsData.firstName}
               ></Input>
               <Input
                  testId="signup-lastname"
                  placeholder="Last name"
                  label="Last Name"
                  {...inputsData.lastName}
               ></Input>
            </div>

            <Input
               placeholder={
                  type === "student" ? "Email address" : "Work email address"
               }
               startIcon={icons.input.message}
               label="Email"
               testId="signup-email"
               {...inputsData.email}
            ></Input>
            <Input
               placeholder="Your phone number"
               startIcon={<div className="mr-1 text-gray-900">+91</div>}
               label="Phone number"
               testId="signup-phone"
               {...inputsData.phone}
            ></Input>
            <Input
               placeholder="Create a password"
               label="Password"
               {...inputsData.password}
               showEye={true}
               endIcon={icons.input.question}
               testId="signup-password"
            ></Input>
         </div>

         <div
            className="btn btn-primary btn-lg mt-8 mb-6"
            onClick={handleSubmit}
            data-testid="signup-submit"
         >
            Get started
         </div>
         <OrDivider></OrDivider>
         <div className="flex flex-col mb-8 md:mb-10 gap-3 md:flex-row whitespace-nowrap">
            <button className="btn-gray btn-outlined btn btn-sm gap-3">
               {icons.brand.google}
               Sign in with Google
            </button>
            <button className="btn-gray btn-outlined btn btn-sm gap-3">
               {<img src="/images/linkedin.png"></img>}
               Sign in with Linkedin
            </button>
         </div>
         <div className="flex text-sm gap-1 whitespace-nowrap justify-center">
            <div className="text-gray-600 ">Already have an account?</div>
            <button
               onClick={() => router.push(routes.login)}
               className="btn btn-primary btn-link w-fit"
               data-testid="signin-login-link"
            >
               Log in
            </button>
         </div>
      </div>
   );
};

export default SignupForm;
