interface INavbarItem {
   text: string;
   url?: string;
   icon: JSX.Element;
   subItems?: INavbarSubItem[];
}

type NamesObjectDefault = { [k in string]: IInputValue };

interface INavbarSubItem {
   text: string;
   url: string;
}

interface CustomFetchProps {
   data?: any;
   method: "GET" | "POST" | "PUT";
   path: string;
}
type InputStateType = "error" | "warn" | "primary";
interface InputState {
   text: string;
   type: InputStateType;
}

interface InputCheck<Value extends IInputValue> {
   cond: (value?: Value) => boolean;
   state: InputState;
}
type InputType =
   | "number"
   | "text"
   | "select"
   | "checkbox"
   | "multiple-checkbox"
   | "password"
   | "radio";

interface IInput<Value extends IInputValue> {
   type?: InputType;
   state?: InputState;
   value?: Value;
   checks?: InputCheck<Value>[];
}

interface ErrorObject {
   statusCode: number;
   message: string;
   error: string;
}

type IInputValue = string | boolean | string[];
type Test = {
   email: string;
   password: string;
   rememberMe: boolean;
   works: string[];
};

type X = UseFormProps<Test>;

type UseFormProps<NamesObject extends NamesObjectDefault> = {
   [k in keyof NamesObject]: IInput<NamesObject[k]>;
};
type PartialFormProps<NamesObject extends NamesObjectDefault> = Partial<
   UseFormProps<NamesObject>
>;
type CreateStateObject<NamesObject extends NamesObjectDefault> = {
   [k in keyof Names]: InputState;
};

type CreateFormObject<NamesObject extends NamesObjectDefault> = {
   [k in keyof NamesObject]: {
      setState: (val: InputState) => void;
      onChange: (val: NamesObject[k]) => void;
      value: NamesObject[k];
      state: InputState;
   };
};
type T = CreateFormObject<{
   email: string;
   password: string;
   rememberMe: boolean;
   jobs: string[];
}>;

// type ValueObject<NamesObject extends NamesObjectDefault> = {
//    [k in keyof NamesObject]: IInput<NamesObject[k]>;
// };

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
interface;

type TestId =
   | "input_email"
   | "input_password"
   | "btn_sign-in"
   | "signin-hire-talent"
   | "signin-apply-for-job"
   | "signin-get-started"
   | "signin-login-link"
   | `signup-${SignUpTestId}`;

type SignUpTestId =
   | "firstname"
   | "lastname"
   | "phone"
   | "email"
   | "password"
   | "submit";

declare global {
   namespace Cypress {
      interface Chainable {
         state(state: any): any;
      }
   }
}

interface cy {
   state: State;
}
