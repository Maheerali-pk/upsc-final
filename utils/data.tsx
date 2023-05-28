export const monthsArray = [
   { value: "0", text: "January" },
   { value: "1", text: "February" },
   { value: "2", text: "March" },
   { value: "3", text: "April" },
   { value: "4", text: "May" },
   { value: "5", text: "June" },
   { value: "6", text: "July" },
   { value: "7", text: "August" },
   { value: "8", text: "September" },
   { value: "9", text: "October" },
   { value: "10", text: "November" },
   { value: "11", text: "December" },
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
