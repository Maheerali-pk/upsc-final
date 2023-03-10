interface PhoneNumber {
   readonly number: string;
   readonly isVerified: boolean;
}

interface PersonalInformation {
   readonly name: string;
   readonly email: Email;
   readonly phoneNum: PhoneNumber;
   readonly city: string;
}

interface WorkExperience {
   readonly compName: string;
   readonly role: string;
   readonly description: string;
   readonly startDate: Date;
   readonly endDate: Date;
   readonly currentlyWorking: boolean;
}

interface JobPreferences {
   readonly timeAvail: string;
   readonly location: string;
   readonly languages: [string];
   readonly strongSub: string;
   readonly coverLetter: string;
   readonly sampleWork: [WorkExperience];
   readonly roles: [string];
}

interface BoardExam {
   readonly board: string;
   readonly yearOfGrad: number;
   readonly percentage: number;
   readonly doc: File;
}

interface Grad {
   readonly yearOfGrad: Number;
   readonly degree: string;
   readonly stream: string;
   readonly college: string;
   readonly marks: number;
}

interface Attempt {
   readonly state: string;
   readonly yearOfAttempt: number;
   readonly qualifiedForMains: boolean;
   readonly qualifiedForInterview: boolean;
   readonly optSubject: string;
   readonly language: string;
}

interface OtherAttempt {
   readonly title: string;
   readonly yearOfAttempt: number;
   readonly description: string;
}

interface UpscJourney {
   readonly upscAttempts: [Attempt];
   readonly statePscAttempts: [Attempt];
   readonly others: [OtherAttempt];
}

interface Candidate {
   readonly personalInfo: PersonalInformation;
   readonly onboardingState: String;
   readonly jobPref: JobPreferences;
   readonly boardExams: [BoardExam];
   readonly grads: [Grad];
   readonly upscJourney: UpscJourney;
   readonly workExp: [WorkExperience];
}
