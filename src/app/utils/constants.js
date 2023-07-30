export const GENDERS = [
  { value: "M", name: "Male" },
  { value: "F", name: "Female" },
];

export const RELIGIONS = [
  { value: "MUSLIM", name: "Muslim" },
  { value: "CHRISTIAN", name: "Christian" },
  { value: "CATHOLIC", name: "Catholic" },
  { value: "BUDDHA", name: "Buddha" },
  { value: "HINDU", name: "Hindu" },
  { value: "CONFUCION", name: "Confucion" },
];

export const MARITAL_STATUS = [
  { value: "SINGLE", name: "Single" },
  { value: "MARRIED", name: "Married" },
];

export const EMPLOYMENT_TYPES = [
  { value: "FULL_TIME", name: "Full Time" },
  { value: "CONTRACT", name: "Contract" },
  { value: "INTERN", name: "Internship" },
];

export const STATUS_TYPES = [
  { value: "AVAILABLE", name: "Available" },
  { value: "UNAVAILABLE", name: "Unavailable" },
  { value: "ON_LEAVE", name: "On Leave" },
  { value: "RESIGNED", name: "Resigned" },
];

export const RElATIONS = [
  { value: "FATHER", name: "Father" },
  { value: "MOTHER", name: "Mother" },
  { value: "SIBLING", name: "Sibling" },
  { value: "SPOUSE", name: "Spouse" },
];

export const LEAVE_TYPES = [
  { value: "ANNUAL", name: "Annual" },
  { value: "MARRIAGE", name: "Marriage" },
  { value: "UNPAID", name: "Unpaid" },
  { value: "SICK", name: "Sick" },
];

export const MONTH_NAME = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const DAY_NAME = {
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  0: "Sun",
};

export const HOURS = Array(12)
  .fill()
  .map((_, index) => (index + 1 > 9 ? String(index + 1) : `0${index + 1}`));

export const HOURS_FROM_ZERO = Array(12)
  .fill()
  .map((_, index) => (index > 9 ? String(index) : `0${index}`));

export const MINUTES = Array(60)
  .fill()
  .map((_, index) => (index > 9 ? String(index) : `0${index}`));

export const ROLE_CODE_NAME_MAPPER = {
  hr: "Human Resource",
  mngr: "Manager",
  staff: "Staff",
};

export const WHAT_CHANGED_MAPPER = {
  status: {
    AVAILABLE: "Available",
    UNAVAILABLE: "Unavailable",
    ON_LEAVE: "On Leave",
    RESIGNED: "Resigned",
  },
  type: {
    FULL_TIME: "Full Time",
    CONTRACT: "Contract",
    INTERN: "Internship",
  },
};

export const MONTH_ABBR_TO_FULL_MAPPER = {
  Jan: "January",
  Feb: "February",
  Apr: "April",
  Mar: "March",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Nov: "November",
  Oct: "October",
  Dec: "December",
};

export const NAVBAR_MAPPER = {
  staff: [
    {
      name: "Dashboard",
      link: "/staff/dashboard",
    },
    {
      name: "Employees",
      link: "/staff/employees",
    },
  ],
  mngr: [
    {
      name: "Dashboard",
      link: "/mngr/dashboard",
    },
    {
      name: "Employees",
      link: "/mngr/employees",
    },
    {
      name: "History",
      link: "/mngr/history",
    },
  ],
  hr: [
    {
      name: "Dashboard",
      link: "/hr/dashboard",
    },
    {
      name: "Employees",
      link: "/hr/employees",
    },
    {
      name: "History",
      link: "/hr/history",
    },
  ],
};
