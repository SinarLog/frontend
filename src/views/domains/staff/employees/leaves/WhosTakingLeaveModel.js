import { useContext, useState } from "react";
import { loadCalendar, loadCalendarDays } from "../../../../../app/utils/time";
import { getWhosTakingLeave } from "../../../../../app/services/api/leave";
import { NotifContext } from "../../../../../app/context/notif";

const currDate = new Date();

export default function WhosTakingLeaveModel() {
  const { showAlert } = useContext(NotifContext);
  const [query, setQuery] = useState({
    month: currDate.getMonth() + 1,
    year: currDate.getFullYear(),
  });
  const [calendars, setCalendars] = useState(
    loadCalendar(query.month, query.year)
  );
  const [days, setDays] = useState(loadCalendarDays(query.month, query.year));
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchWhosTakingLeave = (q = query, cal = calendars) => {
    setLoading(true);
    getWhosTakingLeave(q)
      .then((data) => {
        for (let k in data) {
          cal = cal.map((item) => {
            if (item.date === k) {
              item.employees = data[k];
              return item;
            } else {
              return item;
            }
          });
        }

        setCalendars(cal);
      })
      .catch((e) => {
        showAlert("ERROR", e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   ****************************
   * HANDLERS SECTION
   ****************************
   */
  const handleChangeAnchor = (val) => () => {
    const newQuery = { month: query.month + val, year: query.year };
    setQuery(newQuery);
    setDetail(null);
    setDays(loadCalendarDays(newQuery.month, newQuery.year));
    fetchWhosTakingLeave(newQuery, loadCalendar(newQuery.month, newQuery.year));
  };

  const handleCalendarBoxOnClick = (date) => () => {
    const item = calendars.find((item) => item.date === date);
    item.fullDate = new Date(query.year, query.month - 1, Number(item.date));
    setDetail(item);
  };

  return {
    values: {
      calendars,
      query,
      days,
      detail,
      loading,
    },
    handlers: {
      anchor: handleChangeAnchor,
      detail: handleCalendarBoxOnClick,
    },
    fetchers: {
      calendar: fetchWhosTakingLeave,
    },
  };
}
