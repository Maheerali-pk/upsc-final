import { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import { icons } from "../utils/helpers";
import { useForm } from "../hooks/useForm";
import DialogWrapper from "./DialogWrapper";
import Checkbox from "./Checkbox";
import { monthsArray, yearsArray } from "../utils/data";
import Textarea from "./Textarea";
interface LanguageInputProps {
   value: IWork;
   editing?: boolean;
   onChange: (value: IWork) => void;
   state: string;
}

const proficencyOptions = [
   {
      heading: "Basic",
      text: "I write clearly in this language",
      value: "Basic",
   },
   {
      heading: "Conversational",
      text: "I write & speak clearly in this language",
      value: "Conversational",
   },

   {
      heading: "Fluent",
      text: "I write & speak this language to a high level",
      value: "Fluent",
   },
   {
      heading: "Native",
      text: "I write & speak this language perfectly",
      value: "Native",
   },
];

const WorkInput: React.FC<LanguageInputProps> = (props) => {
   const [editing, setEditing] = useState(props.editing === true ? true : false);

   const { inputsData } = useForm<IWork, {}>({
      inputs: {
         compName: { value: "" },
         role: { value: "" },
         currentlyWorking: { value: false },
         description: { value: "" },
         startMonth: { value: "" },
         startYear: { value: "" },
         endMonth: { value: "" },
         endYear: { value: "" },
         state: { value: "" },
         location: { value: "" },
      },
   });
   const onClickOnSave = () => {
      props.onChange({
         location: inputsData.location.value,
         compName: inputsData.compName.value,
         role: inputsData.role.value,
         currentlyWorking: inputsData.currentlyWorking.value,
         description: inputsData.description.value,
         startMonth: inputsData.startMonth.value,
         startYear: inputsData.startYear.value,
         endMonth: inputsData.endMonth.value,
         endYear: inputsData.endYear.value,
         state: inputsData.state.value,
      });
      setEditing(false);
   };
   if (editing) {
      return (
         <DialogWrapper className="md:w-160 px-4 pb-4 pt-5 w-full mx-4 flex-col">
            <>
               <div className="flex justify-between items-center w-full mb-6">
                  {icons.featured}
                  <div className="cursor-pointer" onClick={() => setEditing(false)}>
                     {icons.close}
                  </div>
               </div>

               <div className="text-lg mb-5 font-semibold text-gray-900">Add Work Experience</div>
               <div className="flex flex-col gap-8 mb-6">
                  <Input {...inputsData.role} label="Title" placeholder="e.g. Tutor"></Input>
                  <Input {...inputsData.compName} label="Name of organization" placeholder="Type here"></Input>
                  <div className="gap-6 flex items-end">
                     <Input {...inputsData.location} label="Location" placeholder="e.g. Delhi"></Input>
                     <Input {...inputsData.state} label="" placeholder="State"></Input>
                  </div>
                  <Checkbox label="I am currently working here" {...inputsData.currentlyWorking}></Checkbox>
                  <div className="flex flex-col gap-8 md:flex-row md:gap-6">
                     <div className="flex gap-4 items-end w-full">
                        <Select
                           {...inputsData.startMonth}
                           placeholder="Month"
                           label="Start date"
                           options={monthsArray}
                        ></Select>
                        <Select {...inputsData.startYear} placeholder="Year" options={yearsArray}></Select>
                     </div>
                     <div className="flex gap-4 items-end w-full">
                        <Select
                           {...inputsData.endMonth}
                           placeholder="Month"
                           label="End date"
                           options={monthsArray}
                        ></Select>
                        <Select {...inputsData.endYear} placeholder="Year" options={yearsArray}></Select>
                     </div>
                  </div>

                  <Textarea
                     {...inputsData.description}
                     label="Description"
                     placeholder="A brief about your roles & responsibilities"
                     rows={4}
                  ></Textarea>
               </div>
               <button className="btn btn-primary btn-lg" onClick={onClickOnSave}>
                  Save
               </button>
            </>
         </DialogWrapper>
      );
   }
   return (
      <div className="flex rounded-lg py-2.5 px-3.5 justify-between border border-gray-300">
         <div className="text-gray-900">{props.value.compName}</div>
         <div className="cursor-pointer" onClick={() => setEditing(true)}>
            {icons.edit}
         </div>
      </div>
   );
};

export default WorkInput;
