import Radio from "./Radio";

import { useId } from "react";
interface RadioItem {
   text: string;
   value: string;
}
interface RadioGroupProps {
   items: RadioItem[];
   onChange: (value: string) => void;
   value: string;
   label?: string;
   labelSubtext?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
   const id = useId();
   return (
      <div className="flex flex-col gap-4">
         {props.label && (
            <div className="text-sm text-gray-700 font-medium">
               {props.label}{" "}
               {props.labelSubtext ? (
                  <span className="text-gray-400 font-normal">
                     ({props.labelSubtext})
                  </span>
               ) : null}
            </div>
         )}
         <div className="flex md:flex-row flex-col gap-8">
            {props.items.map((item) => (
               <Radio
                  text={item.text}
                  onChange={props.onChange}
                  value={item.value}
                  name={id}
               ></Radio>
            ))}
         </div>
      </div>
   );
};

export default RadioGroup;
