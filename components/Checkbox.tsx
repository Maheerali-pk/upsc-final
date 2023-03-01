interface CheckboxProps {
   checked: boolean;
   onChange: (checked: boolean) => void;
   label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
   return (
      <div className="flex gap-2 text-sm text-gray-700 font-medium">
         <input
            type="checkbox"
            id={label}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
         ></input>
         <label htmlFor={label}>{label}</label>
      </div>
   );
};

export default Checkbox;
