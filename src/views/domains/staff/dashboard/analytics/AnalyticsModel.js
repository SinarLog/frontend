import { useContext, useState } from "react";
import { NotifContext } from "../../../../../app/context/notif";
import { getDashboardAnalyticsForEmployee } from "../../../../../app/services/api/analytics";

const initAnal = {
  yearlyCount: 0,
  unpaidCount: 0,
  lateClockIns: 0,
  earlyClockOuts: 0,
};

export default function AnalyticsModel() {
  const { showAlert } = useContext(NotifContext);
  const [anal, setAnal] = useState(initAnal);

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */

  const fetchAnalytics = () => {
    getDashboardAnalyticsForEmployee()
      .then((data) => {
        setAnal(data);
      })
      .catch((err) => {
        showAlert("ERROR", err);
      });
  };

  return {
    values: {
      anal,
      dur: 5,
    },
    fetchers: {
      anal: fetchAnalytics,
    },
  };
}
