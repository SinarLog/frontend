import { useContext, useState } from "react";
import { NotifContext } from "../../../../../app/context/notif";
import { getHrDashboardAnal } from "../../../../../app/services/api/analytics";
import { useSelector } from "react-redux";

const initAnal = {
  totalEmployees: 0,
  lateClockIns: 0,
  earlyClockOuts: 0,
  approvedUnpaidLeaves: 0,
  approvedAnnualMarriageLeaves: 0,
  sickLeaves: 0,
  currentMonth: "",
};

export default function AnalyticsModel() {
  const { showAlert } = useContext(NotifContext);
  const [anal, setAnal] = useState(initAnal);
  const theme = useSelector((state) => state.theme);

  const fetchAnal = () => {
    getHrDashboardAnal()
      .then((data) => {
        setAnal(data);
      })
      .catch((err) => {
        showAlert("ERROR", err);
      });
  };

  return {
    values: {
      isDarkTheme: theme === "dark",
      anal,
    },
    fetchers: {
      anal: fetchAnal,
    },
  };
}
