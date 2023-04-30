import { useEffect } from "react";
import Head from "next/head";
import ProfileSetupFooter from "../../components/ProfileSetupFooter";
import CompanyNavbar from "../../components/CompanyNavbar";
import { useForm } from "../../hooks/useForm";
import RadioGroup from "../../components/RadioGroup";
import Input from "../../components/Input";
import Select from "../../components/Select";
import CheckboxList from "../../components/CheckboxList";
import DateInput from "../../components/DateInput";
import Checkbox from "../../components/Checkbox";
import AsssessmentQuestion from "../../components/AssessmentQuestion";
import { icons } from "../../utils/helpers";

interface PostJobPage2Props {
   formData: ReturnType<typeof useForm<IJobApplication, {}>>;
   onClickOnBack: () => void;
   onClickOnNext: () => void;
}

const PostJobPage2: React.FC<PostJobPage2Props> = ({
   formData: { inputsData, checkForErrors },
   onClickOnBack,
   onClickOnNext,
}) => {
   const disableNext = () => {
      const errors = checkForErrors(undefined, [
         "locationType",
         "city",
         "state",
         "stipendType",
         "stipend",
         "stipendPeriod",
         "timeAvail",
         "deadline",
      ]);
      return errors;
   };
   useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
   }, []);
   return (
      <>
         <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <CompanyNavbar selectedItem={2}></CompanyNavbar>
         <div className="pt-14 md:pb-60 pb-28 px-4">
            <div className="md:w-150 w-full mx-auto flex flex-col">
               <div className="flex flex-col gap-10 mt-12">
                  <div className="flex flex-col gap-4">
                     <div className="text-xl font-bold text-gray-900">
                        Location
                     </div>
                     <RadioGroup<IJobLocation>
                        items={[
                           { value: "OFFICE", text: "In office" },
                           { value: "REMOTE", text: "Remote" },
                           { value: "FLEXIBLE", text: "Flexible" },
                        ]}
                        {...inputsData.locationType}
                     ></RadioGroup>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6">
                     <Input
                        {...inputsData.city}
                        placeholder="e.g Mumbai"
                        label="City"
                     ></Input>
                     <Input
                        {...inputsData.state}
                        placeholder="e.g. Maharashtra"
                        label="State"
                     ></Input>
                  </div>
                  <div className="border-t border-gray-300"></div>
                  <div className="flex flex-col gap-4">
                     <div className="text-xl font-bold text-gray-900">
                        Stipend & Perks
                     </div>
                     <RadioGroup<IStipendType>
                        items={[
                           { value: "FIXED", text: "Fixed" },
                           { value: "NEGOTIABLE", text: "Negotiable" },
                           { value: "FREELACE_BASED", text: "Freelance based" },
                        ]}
                        {...inputsData.stipendType}
                     ></RadioGroup>
                  </div>

                  <div className="flex flex-col md:flex-row gap-3 items-center">
                     <Input {...inputsData.stipend} type="number"></Input>
                     {inputsData.stipendType.value &&
                     inputsData.stipendType.value !== "FIXED" ? (
                        <>
                           <div className="text-gray-900">to</div>

                           <Input
                              {...inputsData.maxStipend}
                              type="number"
                           ></Input>
                        </>
                     ) : null}
                     <Select
                        options={[
                           { value: "month", heading: "Month" },
                           { value: "year", heading: "Year" },
                        ]}
                        placeholder="Select"
                        {...inputsData.stipendPeriod}
                     ></Select>
                  </div>
                  <CheckboxList
                     label="Perks"
                     labelSubtext="optional"
                     {...inputsData.perks}
                     items={[
                        { text: "Certificate", value: "Certificate" },
                        {
                           text: "Letter of recommendation",
                           value: "Letter of recommendation",
                        },
                        {
                           text: "Flexible work hours",
                           value: "Flexible work hours",
                        },
                        { text: "5 days a week", value: "5 days a week" },
                        {
                           text: "Informal dress code",
                           value: "Informal dress code",
                        },
                        {
                           text: "Free snacks & beverages",
                           value: "Free snacks & beverages",
                        },
                     ]}
                  ></CheckboxList>

                  <div className="border-t border-gray-300"></div>
                  <div className="flex flex-col gap-4">
                     <div className="text-xl font-bold text-gray-900">
                        Job duration
                     </div>
                     <RadioGroup<IJobDuration>
                        items={[
                           { value: "FT", text: "Full time" },
                           { value: "PT", text: "Part time" },
                           { value: "FR", text: "Freelance based" },
                        ]}
                        {...inputsData.timeAvail}
                     ></RadioGroup>
                  </div>
                  {/* <Input
                     {...inputsData.deadline}
                     placeholder="dd/mm/yyyy"
                     label="Deadline for job application"
                     labelSubtext="optional"
                  ></Input> */}
                  <DateInput {...inputsData.deadline}></DateInput>
                  <div className="border-t border-gray-300"></div>
                  <div className="flex flex-col gap-4">
                     <div className="text-xl font-bold text-gray-900">
                        Cover letter / assessment qusestion
                     </div>
                     <div className="text-gray-500">
                        Cover letter & availability question can be asked to
                        every applicant. If you wish, you may ask two more
                        customised questions as an assessment
                     </div>
                  </div>
                  <Checkbox
                     {...inputsData.isCoverLetterRequired}
                     label={
                        <div className="flex gap-0.5 flex-col">
                           <div className="text-gray-700 font-medium">
                              Ask for cover letter
                           </div>
                           <div className="text-gray-500">
                              Question: Why should you be hired for this role?
                           </div>
                        </div>
                     }
                     wrapperClassName="items-start"
                  ></Checkbox>
                  {inputsData.questions.value.length ? (
                     <div className="flex mb-12 flex-col gap-10">
                        {inputsData.questions.value.map((question, i) => (
                           <AsssessmentQuestion
                              onClickOnRemove={() =>
                                 inputsData.questions.removeItem(i)
                              }
                              index={i}
                              value={question}
                              onChange={(val) =>
                                 inputsData.questions.updateItem(i, val)
                              }
                           ></AsssessmentQuestion>
                        ))}
                     </div>
                  ) : null}

                  <div
                     onClick={() => inputsData.questions.addItem("")}
                     className="flex gap-2 font-semibold items-center btn btn-link btn-primary w-fit"
                  >
                     {icons.plusPrimary}
                     Add assessment question
                  </div>
               </div>
            </div>
         </div>
         <ProfileSetupFooter
            stepNo={2}
            buttonText="Continue"
            totalSteps={3}
            onClickOnNext={onClickOnNext}
            onClickOnBack={onClickOnBack}
            disableNext={disableNext()}
         ></ProfileSetupFooter>
      </>
   );
};

export default PostJobPage2;
