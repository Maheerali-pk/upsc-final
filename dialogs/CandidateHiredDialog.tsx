import DialogWrapper from "../components/DialogWrapper";
import { useGlobalContext } from "../contexts/GlobalContext";
import { icons } from "../utils/helpers";

interface CandidateHiredDialogProps {}

const CandidateHiredDialog: React.FC<CandidateHiredDialogProps> = () => {
   const [state, dispatch] = useGlobalContext();
   return (
      <DialogWrapper className="h-80 flex items-center justify-center">
         <div className="absolute top-6.5 right-6.5 cursor-pointer" onClick={() => dispatch({ setDialog: undefined })}>
            {icons.close}
         </div>
         <div className="flex flex-col gap-6 items-center w-130 ">
            {icons.success}
            <div className="text-gray-900 font-semibold text-3xl">Candidate hired</div>
         </div>
      </DialogWrapper>
   );
};

export default CandidateHiredDialog;
