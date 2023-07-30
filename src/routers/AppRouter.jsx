import { Routes, Route } from "react-router-dom";

// Global Views
import LoginView from "../views/login/LoginView";
import NotFoundView from "../views/4xx/404View";
import BaseDomainView from "../views/domains/Base";
import ForgotPasswordView from "../views/forgot-password/ForgotPasswordView";
import ProfileView from "../views/profile/ProfileView";

// HR Views
import HrDashboardView from "../views/domains/hr/dashboard/DashboardView";
import HrEmployeeManagementView from "../views/domains/hr/employee/EmployeeView";
import HrEmployeeDetailView from "../views/domains/hr/employee/management/detail/EmployeeDetailView";
import HrCreateEmployeeView from "../views/domains/hr/employee/create/CreateEmployeeView";
import HrHistoryView from "../views/domains/hr/history/HistoryView";
import HrConfigView from "../views/domains/hr/config/ConfigView";

// Manager Views
import ManagerDomainView from "../views/domains/manager/Manager";
import ManagerDashboardView from "../views/domains/manager/dashboard/DashboardView";
import ManagerEmployeeView from "../views/domains/manager/employees/EmployeeView";
import ManagerEmployeeDetailView from "../views/domains/manager/employees/detail/EmployeeDetailView";
import ManagerHistoryView from "../views/domains/manager/history/HistoryView";

// Staff Views
import StaffDomainView from "../views/domains/staff/Staff";
import StaffDashboardView from "../views/domains/staff/dashboard/DashboardView";
import StaffEmployeeView from "../views/domains/staff/employees/EmployeeView";
import StaffEmployeeDetailView from "../views/domains/staff/employees/detail/EmployeeDetailView";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/forgot-password" element={<ForgotPasswordView />} />
      <Route element={<BaseDomainView />}>
        <Route path="profile" element={<ProfileView />} />
        <Route path="hr">
          <Route path="dashboard" element={<HrDashboardView />} />
          <Route path="config" element={<HrConfigView />} />
          <Route path="employees" element={<HrEmployeeManagementView />} />
          <Route path="history" element={<HrHistoryView />} />
          <Route path="employees/create" element={<HrCreateEmployeeView />} />
          <Route
            path="employees/:employeeId"
            element={<HrEmployeeDetailView />}
          />
        </Route>
        <Route path="mngr" element={<ManagerDomainView />}>
          <Route path="dashboard" element={<ManagerDashboardView />} />
          <Route path="employees" element={<ManagerEmployeeView />} />
          <Route
            path="employees/:employeeId"
            element={<ManagerEmployeeDetailView />}
          />
          <Route path="history" element={<ManagerHistoryView />} />
        </Route>
        <Route path="staff" element={<StaffDomainView />}>
          <Route path="dashboard" element={<StaffDashboardView />} />
          <Route path="employees" element={<StaffEmployeeView />} />
          <Route
            path="employees/:employeeId"
            element={<StaffEmployeeDetailView />}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}
