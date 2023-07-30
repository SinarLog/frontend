import { DAY_NAME } from "./constants";

/**
 *
 * @param {number} month
 * @param {number} year
 * @returns {Array<{date: string,employees: any[]}>}
 */
export function loadCalendar(month = 0, year = 2023) {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);
  const calendar = [];

  for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
    if (String(i).length < 2) {
      calendar.push({ date: `0${i}`, employees: [] });
    } else {
      calendar.push({ date: String(i), employees: [] });
    }
  }

  return calendar;
}

/**
 * @param {number} month
 * @param {number} year
 * @returns {string[]}
 */
export function loadCalendarDays(month = 0, year = 2023) {
  const days = [];

  for (let i = 1; i <= 7; i++) {
    days.push(DAY_NAME[new Date(year, month - 1, i).getDay()]);
  }
  return days;
}
