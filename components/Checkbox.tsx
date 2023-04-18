import { useId } from "react";

interface CheckboxProps {
   value: boolean;
   onChange: (value: boolean) => void;
   label: string | JSX.Element;
   className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
   value,
   onChange,
   label,
   className,
}) => {
   const id = useId();
   return (
      <div className="flex gap-2 text-sm text-gray-600 ">
         <input
            className={`text-primary-400 aspect-square ${className || ""}`}
            type="checkbox"
            id={id}
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
         ></input>
         <label htmlFor={id}>{label}</label>
      </div>
   );
};

export default Checkbox;
