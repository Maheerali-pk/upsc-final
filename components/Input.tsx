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
}

const Input: React.FC<CustomInputProps> = (props) => {
   const [focus, setFocus] = useState(false);
   return (
      <div className="input-wrapper input-primary">
         <div className="text-sm text-gray-700 font-medium">{props.label}</div>
         <div
            className={classNames("input-base input-primary", { focus: focus })}
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
         <div className="text-gray-600 text-sm">{props.helperText}</div>
      </div>
   );
};

export default Input;
