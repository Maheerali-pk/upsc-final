import classNames from "classnames";
import { useState } from "react";
import { icons } from "../utils/helpers";

interface CustomInputProps {
   startIcon?: JSX.Element;
   endIcon?: JSX.Element;
   label?: string;
   helperText?: string;
   endButton?: JSX.Element;
   dropdownStart?: boolean;
   dropdownEnd?: boolean;
   placeholder?: string;
   value: string;
   onChange: (val: string) => void;
   state?: InputState;
   showEye?: boolean;
   testId?: TestId;
   type?: InputType;
}

const Input: React.FC<CustomInputProps> = (props) => {
   const [focus, setFocus] = useState(false);
   const [showPass, setShowPass] = useState(false);
   const renderEye = () => (showPass ? icons.eyeClose : icons.eye);
   const renderType = () => {
      if (!props.showEye) {
         return props.type || "text";
      } else {
         return showPass ? "text" : "password";
      }
   };
   return (
      <div
         className={classNames("input-wrapper input-primary", {
            "input-error": props.state?.type === "error",
            "input-primary": props.state === undefined,
            "input-warn": props.state?.type === "warn",
         })}
         data-testid={props.testId}
      >
         <div className="text-sm text-gray-700 font-medium">{props.label}</div>
         <div
            className={classNames("input-base", {
               focus: focus,
            })}
         >
            {props.startIcon && props.startIcon}
            <input
               value={props.value}
               onChange={(e) => props.onChange(e.target.value)}
               type={renderType()}
               onFocus={() => setFocus(true)}
               onBlur={() => setFocus(false)}
               placeholder={props.placeholder}
               autoComplete="off"
            />
            <div
               onClick={() => setShowPass(!showPass)}
               className="cursor-pointer"
            >
               {props.showEye && renderEye()}
            </div>

            {props.endIcon && props.endIcon}
         </div>
         <div className="text-sm helper-text">{props.state?.text}</div>
      </div>
   );
};

export default Input;
