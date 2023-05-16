export const monthsArray = [
   { value: "January", text: "January" },
   { value: "February", text: "February" },
   { value: "March", text: "March" },
   { value: "April", text: "April" },
   { value: "May", text: "May" },
   { value: "June", text: "June" },
   { value: "July", text: "July" },
   { value: "August", text: "August" },
   { value: "September", text: "September" },
   { value: "October", text: "October" },
   { value: "November", text: "November" },
   { value: "December", text: "December" },
];

export const jobStatusToText: { [key in IJobStatus]: string } = {
   CLOSED: "Closed",
   HOLD: "On Hold",
   OPEN: "Active",
   UNDER_REVIEW: "Under Review",
};

const yearsArrayInit = [];
for (let year = 1970; year <= 2023; year++) {
   const yearString = year.toString();
   yearsArrayInit.push({ value: yearString, text: yearString });
}
export const yearsArray = yearsArrayInit;
