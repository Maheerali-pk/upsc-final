import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useForm } from "../hooks/useForm";
import { checks, customFetch, icons } from "../utils/helpers";
import { errors, routes } from "../utils/utils";
import Input from "./Input";
import OrDivider from "./OrDivider";
import { accountSignUp } from "../apis/accountSignUp";
import OTPDialog from "../dialogs/OTPDialog";

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
   const { inputsData, onSubmit, setData } = useForm<
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
         firstName: { value: "" },
         lastName: { value: "" },
         password: {
            value: "",
            state: {
               text: "Minimum 8 characters with at least one uppercase character",
               type: "primary",
            },
            checks: [checks.required.string],
         },
         phone: { value: "" },
      },
   });
   const handleSubmit = () => {
      const error = onSubmit();
      if (!error) {
         accountSignUp({
            email: inputsData.email.value,
            password: inputsData.password.value,
            name: {
               firstName: inputsData.firstName.value,
               lastName: inputsData.lastName.value,
            },
            // name: inputsData.firstName.value + " " + inputsData.lastName.value,
            // phoneNum: inputsData.phone.value,
            purpose: type === "student" ? "CANDIDATE" : "COMPANY",
         })
            .then((res) => {
               if (res.status === 409) {
                  setData({
                     email: {
                        state: { text: errors.userAlreadyExist, type: "error" },
                     },
                  });
                  return;
               } else if (res.status === 200) {
                  // router.push(routes[type].setupProfile.base);
                  dispatch({ setState: { dialog: OTPDialog } });
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
      // var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");

      // var raw = JSON.stringify({
      //    email: "bodegi1530@haizail.com",
      //    password: "123456",
      //    purpose: "CANDIDATE",
      // });

      // fetch("https://api.csenaukri.com/account/signup", {
      //    method: "POST",
      //    headers: myHeaders,
      //    body: raw,
      //    redirect: "follow",
      // })
      //    .then((response) => response.text())
      //    .then((result) => console.log(result))
      //    .catch((error) => console.log("error", error));
   };
   return (
      <div className={"flex flex-col  " + className}>
         {state.dialog === OTPDialog && (
            <OTPDialog
               onSuccess={() => router.push(routes[type].setupProfile.base)}
            ></OTPDialog>
         )}
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
