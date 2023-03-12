import classNames from "classnames";
import { useState } from "react";

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
}

const Input: React.FC<CustomInputProps> = (props) => {
   const [focus, setFocus] = useState(false);
   return (
      <div
         className={classNames("input-wrapper input-primary", {
            "input-error": props.state?.type === "error",
            "input-primary": props.state === undefined,
         })}
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
               type="text"
               onFocus={() => setFocus(true)}
               onBlur={() => setFocus(false)}
               placeholder={props.placeholder}
            />
            {props.endIcon && props.endIcon}
         </div>
         <div className="text-sm helper-text">{props.state?.text}</div>
      </div>
   );
};

export default Input;
