import * as React from "react";
import { useState } from "react";

import OtpInput from "react-otp-input";
import AuthPageWrapper from "../components/AuthPageWrapper";
import DialogWrapper from "../components/DialogWrapper";
import { icons } from "../utils/helpers";
import CustomOTPInput from "../components/CustomOTPInput";
import { routes } from "../utils/utils";
import { useRouter } from "next/router";

interface OTPDialogProps {
   onSuccess: () => void;
}

const OTPDialog: React.FC<OTPDialogProps> = (props) => {
   const [otp, setOtp] = useState("");
   const [error, setError] = useState(false);
   const router = useRouter();
   const [waitToResend, setWaitToResend] = useState(false);
   const [showSuccess, setShowSuccess] = useState(false);
   const verifyOtp = () => {
      console.log(otp, "otp");
      if (otp === "1234") {
         setShowSuccess(true);
         setTimeout(() => {
            props.onSuccess();
         }, 2000);
      } else {
         setError(true);
      }
   };
   const resendOtp = () => {
      if (!waitToResend) {
         setWaitToResend(true);
         setTimeout(() => {
            setWaitToResend(false);
         }, 30000);
      }
   };
   if (showSuccess) {
      return (
         <DialogWrapper className="md:w-106 flex flex-col w-full p-8 mx-4">
            <div className="flex justify-center items-center relative w-full flex-col">
               <div className="mb-6">{icons.success}</div>
               <div className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-2 md:mb-3">
                  OTP verification successful
               </div>
            </div>
         </DialogWrapper>
      );
   }
   return (
      <DialogWrapper className="md:w-106 flex flex-col w-full p-8 mx-4">
         <div className="flex-col flex items-center">
            <div className="flex justify-center items-center relative w-full flex-col">
               <div className="mb-6">{icons.authPage.resetLinkSent}</div>
               <div className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-2 md:mb-3">
                  Verify OTP
               </div>
               <div className=" mb-3 flex flex-col text-gray-600 text-center ">
                  <div>Please enter the OTP sent to</div>
                  <div className="font-medium">+91 9432176945</div>
               </div>
               <div className="text-sm underline btn btn-link btn-sm btn-primary mb-8">
                  Change number
               </div>
            </div>

            <CustomOTPInput
               value={otp}
               onChange={setOtp}
               errorState={error}
            ></CustomOTPInput>
            {error && (
               <div className="flex justify-center gap-2 mt-4">
                  {icons.otpError}
                  <div className="text-sm text-error-500">
                     You have entered an incorrect code
                  </div>
               </div>
            )}
            <button className="my-8 btn btn-primary btn-lg" onClick={verifyOtp}>
               Verify
            </button>
            <div className="flex justify-center mb-8 w-full whitespace-nowrap gap-1">
               <div className="text-sm text-gray-600">
                  Didn’t receive the email?
               </div>
               <div
                  onClick={resendOtp}
                  className="btn-link btn btn-primary w-fit text-sm"
               >
                  {waitToResend ? "Resend in 30s" : "Click to resend"}
               </div>
            </div>
            <div
               onClick={() => router.push(routes.login)}
               className="btn btn-link btn-gray mb-2 gap-2"
            >
               {icons.arrowLeft}
               Back to log in
            </div>
         </div>
      </DialogWrapper>
   );
};

export default OTPDialog;
