import classNames from "classnames";
import { icons } from "../utils/helpers";
import ProgressBar from "./ProgressBar";

interface ProfileSetupFooterProps {
   stepNo: number;
   disableNext?: boolean;
   onClickOnNext?: () => void;
   onClickOnBack?: () => void;
}
const totalSteps = 4;

const ProfileSetupFooter: React.FC<ProfileSetupFooterProps> = ({
   stepNo,
   disableNext = false,
   onClickOnNext,
   onClickOnBack,
}) => {
   return (
      <div className="w-full flex flex-col   fixed bottom-0 bg-white">
         <ProgressBar percentage={(stepNo / totalSteps) * 100}></ProgressBar>
         <div className="flex gap-6  md:p-0 p-4 justify-center md:pb-12 md:pt-8">
            {stepNo > 1 ? (
               <div
                  onClick={onClickOnBack}
                  className="btn btn-gray btn-outlined w-72 btn-sm  gap-1.5 flex items-center justify-center text-gray-700"
               >
                  {icons.chevronLeft}
                  Back
               </div>
            ) : null}
            <button
               onClick={onClickOnNext}
               disabled={disableNext}
               className={classNames("w-72 btn btn-primary btn-xl", {})}
            >
               Next
            </button>
         </div>
      </div>
   );
};

export default ProfileSetupFooter;
