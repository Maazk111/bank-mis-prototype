// src/App.jsx
import { AppProvider, useApp } from "./context/AppContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import TellerDashboard from "./pages/TellerDashboard";
import LoanOfficerDashboard from "./pages/LoanOfficerDashboard";
import BranchManagerDashboard from "./pages/BranchManagerDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";

const DASHBOARD_BY_ROLE = {
  teller: TellerDashboard,
  "loan-officer": LoanOfficerDashboard,
  "branch-manager": BranchManagerDashboard,
  executive: ExecutiveDashboard,
};

function AppContent() {
  const { role } = useApp();

  if (!role) {
    return <LoginPage />;
  }

  const DashboardPage = DASHBOARD_BY_ROLE[role];

  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}