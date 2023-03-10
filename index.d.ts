interface INavbarItem {
   text: string;
   url?: string;
   icon: JSX.Element;
   subItems?: INavbarSubItem[];
}
interface INavbarSubItem {
   text: string;
   url: string;
}

interface CustomFetchProps {
   data: any;
   method: "get" | "post" | "put";
   path: string;
}
type InputStateType = "error" | "warn";
interface InputState {
   text: string;
   type: InputStateType;
   check: (val: string) => boolean;
}

interface IInput {
   type:
      | "number"
      | "text"
      | "select"
      | "checkbox"
      | "multiple-checkbox"
      | "radio";
   states?: InputState[];
   value?: IInputValue;
}

type IInputValue = string | string[] | boolean;
type UseFormProps<Names extends string> = { [k in Names]: IInput };

type ValueObject<Names extends string> = { [k in Names]: IInputValue };

type IExperience = ValueObject<
   "compName" | "startDate" | "endDate" | "description" | "role"
>;
type IDegree = ValueObject<
   "currentStudying" | "degree" | "stream" | "college" | "yearOfGrad" | "marks"
>;
type IUPSCAttempt = ValueObject<
   | "yearOfAttempt"
   | "qualifiedForMains"
   | "qualifiedForInterview"
   | "optSubject"
   | "language"
>;

type StatePCNames =
   | "yearOfAttempt"
   | "qualifiedForMains"
   | "qualifiedForInterview"
   | "optSubject"
   | "language"
   | "state";

type OtherExamNames = "title" | "yearOfAttempt" | "description";
type IOtherExam = ValueObject<OtherExamNames>;

type IStatePCAttempt = ValueObject<StatePCNames>;

interface LoginResponse {
   access_token: string;
}
