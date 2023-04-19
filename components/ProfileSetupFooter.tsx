import classNames from "classnames";
import { icons } from "../utils/helpers";

interface ProfileSetupFooterProps {
   stepNo: number;
   disableNext?: boolean;
   onClickOnNext?: () => void;
}
const totalSteps = 4;

const ProfileSetupFooter: React.FC<ProfileSetupFooterProps> = ({
   stepNo,
   disableNext = false,
   onClickOnNext,
}) => {
   return (
      <div className="w-full flex flex-col">
         <div className="bg-gray-200 h-1.5 relative w-full">
            <div
               className="bg-primary-400 h-1.5 absolute left-0 top-0"
               style={{ width: (stepNo / totalSteps) * 100 + "%" }}
            ></div>
         </div>
         <div className="flex gap-6 pt-8 justify-center pb-12">
            {stepNo > 1 ? (
               <div className="btn btn-gray btn-outlined w-72 btn-xl gap-1.5 flex items-center justify-center text-gray-700">
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
