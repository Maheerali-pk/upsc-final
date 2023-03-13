interface CheckboxProps {
   value: boolean;
   onChange: (value: boolean) => void;
   label: string;
   className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
   value,
   onChange,
   label,
   className,
}) => {
   return (
      <div className="flex gap-2 items-center  text-sm text-gray-700 font-medium">
         <input
            className={`text-primary-400 ${className || ""}`}
            type="checkbox"
            id={label}
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
         ></input>
         <label htmlFor={label}>{label}</label>
      </div>
   );
};

export default Checkbox;
