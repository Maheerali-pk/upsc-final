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
   data?: any;
   method: "get" | "post" | "put";
   path: string;
}
type InputStateType = "error" | "warn" | "primary";
interface InputState {
   text: string;
   type: InputStateType;
}

interface InputCheck {
   cond: (value: string) => boolean;
   state: InputState;
}
interface IInput {
   type:
      | "number"
      | "text"
      | "select"
      | "checkbox"
      | "multiple-checkbox"
      | "radio";
   state?: InputState;
   value?: IInputValue;
   checks?: InputCheck[];
}

interface ErrorObject {
   statusCode: number;
   message: string;
   error: string;
}

type IInputValue = string;
type UseFormProps<Names extends string> = { [k in Names]: IInput };
type PartialFormProps<Names extends string> = Partial<
   Record<Names, Partial<IInput>>
>;
type CreateStateObject<Names extends string> = { [k in Names]: InputState };

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

type TestId = "input_email" | "input_password" | "btn_sign-in";
