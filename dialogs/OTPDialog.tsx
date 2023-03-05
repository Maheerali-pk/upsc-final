import DialogWrapper from "../components/DialogWrapper";

interface OTPDialogProps {}

const OTPDialog: React.FC<OTPDialogProps> = () => {
   return (
      <DialogWrapper className="w-106">
         <div className="w-106 flex flex-col py-8 px-4 items-center">
            Hello world
         </div>
      </DialogWrapper>
   );
};

export default OTPDialog;
