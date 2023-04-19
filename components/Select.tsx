import { icons } from "../utils/helpers";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

interface IOption {
   heading: string;
   text: string;
   value: string;
}
interface SelectProps {
   options: IOption[];
   value: string;
   onChange: (val: string) => void;
   placeholder: string;
   state: InputState;
}

const Select: React.FC<SelectProps> = ({
   options,
   value,
   onChange,
   placeholder,
   state,
}) => {
   const [open, setOpen] = useState(false);
   const elmRef = useRef<HTMLDivElement>(null);
   const selectedOption = options.find((x) => x.value === value);
   console.log(selectedOption);
   console.log(options, value);
   const onOpenMenu = () => {
      setOpen(!open);
   };
   useEffect(() => {
      const func = (e: MouseEvent) => {
         console.log(e.target, "target");
         if (open) {
            console.log("open", open);
            if (!elmRef.current?.contains(e.target as Node)) {
               console.log("Ref set to false");
               setOpen(false);
            }
         }
      };
      window.addEventListener("click", func, true);
      return () => window.removeEventListener("click", func);
   }, [open]);
   return (
      <div
         ref={elmRef}
         onClick={onOpenMenu}
         className={classNames(
            "flex justify-between w-full py-2.5 h-fit px-3.5 items-center rounded-lg border border-gray-300 cursor-pointer relative",
            {
               "select-error": state?.type === "error",
               "select-primary": state === undefined,
               "select-warn": state?.type === "warn",
            }
         )}
      >
         <div className="text-gray-500">
            {selectedOption?.heading || selectedOption?.text || placeholder}
         </div>
         <div>{icons.chevronDown}</div>
         {
            <div className={classNames("select-menu", { show: open })}>
               {options.map((opt) => (
                  <div
                     onClick={() => onChange(opt.value)}
                     className={classNames(
                        "flex w-full justify-between gap-2 items-center py-2.5 px-2 hover:bg-gray-50 rounded-md",
                        { "bg-gray-50": value === opt.value }
                     )}
                  >
                     <div className="flex flex-col gap-[2px]">
                        <div className="text-gray-900 font-medium ">
                           {opt.heading}
                        </div>
                        <div className="text-gray-500 text-sm">{opt.text}</div>
                     </div>
                     {value === opt.value ? icons.check : <></>}
                  </div>
               ))}
            </div>
         }
      </div>
   );
};

export default Select;
