import { useId } from "react";
interface RadioProps {
   value: string;
   text: string;
   name: string;
   onChange: (value: string) => void;
}

const Radio: React.FC<RadioProps> = (props) => {
   const id = useId();
   return (
      <div className="flex gap-3 items-center">
         <input
            id={id}
            type="radio"
            name={props.name}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
         ></input>
         <label htmlFor={id}>{props.text}</label>
      </div>
   );
};

export default Radio;
