import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotifContext } from "../../../../../app/context/notif";
import { getEmployeeFullProfileForStaff } from "../../../../../app/services/api/employee";
import { useSelector } from "react-redux";

export default function EmployeeDetailModel() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);
  const { employeeId } = useParams();
  const { showAlert } = useContext(NotifContext);

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   ****************************
   * HANDLERS SECTION
   ****************************
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchEmployeeFullProfile = (id = employeeId) => {
    getEmployeeFullProfileForStaff(id, currentUser.role.code)
      .then((data) => setDetail(data))
      .catch((err) => showAlert("ERROR", err));
  };

  return {
    values: {
      employeeId,
      detail,
      loading,
      setLoading,
    },
    handlers: {
      back: handleGoBack,
    },
    fetchers: {
      employee: fetchEmployeeFullProfile,
    },
  };
}
