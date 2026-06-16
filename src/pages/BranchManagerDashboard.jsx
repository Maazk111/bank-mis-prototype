// src/pages/BranchManagerDashboard.jsx
import { useState } from "react";
import {
  Activity,
  Wallet,
  Landmark,
  UserPlus,
  AlertTriangle,
  AlertCircle,
  Users,
  TrendingUp,
  ClipboardList,
  PieChart,
  FileText,
} from "lucide-react";
import KPICard from "../components/ui/KPICard";
import DataTable from "../components/ui/DataTable";
import StatusBadge from "../components/ui/StatusBadge";
import ChartCard from "../components/ui/ChartCard";
import ReportModal from "../components/ui/ReportModal";
import {
  branches,
  transactions,
  loans,
  staffPerformance,
  monthlyTransactionTrend,
  accountGrowthTrend,
  sbpMonthlyReportPreview,
} from "../data/dummyData";

const BRANCH_CODE = "BR001";
const LARGE_TXN_THRESHOLD = 100000;

// Local report-only data — illustrative branch P&L for the monthly summary report
const branchPL = {
  period: "May 2026",
  interestIncome: 8400000,
  feeIncome: 1250000,
  totalIncome: 9650000,
  interestExpense: 3200000,
  operatingExpenses: 2850000,
  totalExpenses: 6050000,
  netProfit: 3600000,
};

export default function BranchManagerDashboard() {
  const branch = branches.find((b) => b.code === BRANCH_CODE);

  const branchTransactions = transactions.filter((t) => t.branch === BRANCH_CODE);
  const largeTransactions = branchTransactions.filter((t) => t.amount >= LARGE_TXN_THRESHOLD);
  const overdueLoans = loans.filter((l) => l.branch === BRANCH_CODE && l.status === "Overdue");

  const [activeReport, setActiveReport] = useState(null);

  const largeTxnColumns = [
    { key: "id", label: "Txn ID", nowrap: true },
    { key: "customerName", label: "Customer" },
    { key: "type", label: "Type" },
    {
      key: "amount",
      label: "Amount (PKR)",
      align: "right",
      nowrap: true,
      render: (row) => row.amount.toLocaleString(),
    },
    { key: "time", label: "Time", nowrap: true },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  const overdueLoanColumns = [
    { key: "id", label: "Loan ID", nowrap: true },
    { key: "customerName", label: "Customer" },
    { key: "type", label: "Loan Type" },
    {
      key: "amount",
      label: "Principal (PKR)",
      align: "right",
      nowrap: true,
      render: (row) => row.amount.toLocaleString(),
    },
    {
      key: "monthlyInstallment",
      label: "Monthly Installment",
      align: "right",
      nowrap: true,
      render: (row) => `PKR ${row.monthlyInstallment.toLocaleString()}`,
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  const staffColumns = [
    { key: "employeeId", label: "Employee ID", nowrap: true },
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "transactionsProcessed", label: "Txns Processed", align: "right" },
    { key: "avgTimePerTxn", label: "Avg Time / Txn", align: "right" },
    { key: "errorRate", label: "Error Rate", align: "right" },
  ];

  return (
    <div className="space-y-6">
      {/* OVERVIEW */}
      <section id="overview" className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard label="Daily Transaction Volume" value={`${branch.dailyTransactionVolume} txns`} icon={Activity} accent="navy" />
          <KPICard label="Branch Cash Position" value={`PKR ${branch.cashPosition.toLocaleString()}`} icon={Wallet} accent="blue" />
          <KPICard label="Active Loans" value={`${branch.activeLoans} loans`} icon={Landmark} accent="green" />
          <KPICard label="New Accounts Today" value={`${branch.newAccountsToday} accounts`} icon={UserPlus} accent="amber" />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCard
            title="Monthly Transaction Trend"
            subtitle="Deposits vs Withdrawals (PKR)"
            type="line"
            data={monthlyTransactionTrend}
            xKey="month"
            series={[
              { key: "deposits", label: "Deposits", color: "#1F3864" },
              { key: "withdrawals", label: "Withdrawals", color: "#C0504D" },
            ]}
          />
          <ChartCard
            title="Account Growth Trend"
            subtitle="New accounts opened per month"
            type="bar"
            data={accountGrowthTrend}
            xKey="month"
            series={[{ key: "newAccounts", label: "New Accounts", color: "#4472C4" }]}
          />
        </div>
      </section>

      {/* TRANSACTIONS - Large Transaction Alerts */}
      <section id="transactions">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-600" />
            <h3 className="text-sm font-semibold text-navy-900">
              Large Transaction Alerts (&ge; PKR {LARGE_TXN_THRESHOLD.toLocaleString()})
            </h3>
          </div>
          <DataTable columns={largeTxnColumns} data={largeTransactions} emptyMessage="No large transactions flagged today." />
        </div>
      </section>

      {/* LOANS - Overdue Loan Alerts */}
      <section id="loans">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <AlertCircle size={18} className="text-red-600" />
            <h3 className="text-sm font-semibold text-navy-900">Overdue Loan Alerts</h3>
          </div>
          <DataTable columns={overdueLoanColumns} data={overdueLoans} emptyMessage="No overdue loans for this branch." />
        </div>
      </section>

      {/* REPORTS */}
      <section id="reports" className="space-y-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <Users size={18} className="text-navy-900" />
            <h3 className="text-sm font-semibold text-navy-900">Staff Performance Summary</h3>
          </div>
          <DataTable columns={staffColumns} data={staffPerformance} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-navy-900">Reports</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ReportButton
              icon={TrendingUp}
              title="Branch Performance Report"
              subtitle="KPI snapshot for this branch"
              onClick={() => setActiveReport("performance")}
            />
            <ReportButton
              icon={ClipboardList}
              title="Staff Performance Report"
              subtitle="Per-employee productivity"
              onClick={() => setActiveReport("staff")}
            />
            <ReportButton
              icon={PieChart}
              title="Branch Profit / Loss Summary"
              subtitle={`Monthly P&L — ${branchPL.period}`}
              onClick={() => setActiveReport("pl")}
            />
            <ReportButton
              icon={FileText}
              title="SBP Monthly Report Preview"
              subtitle="Regulatory submission preview"
              onClick={() => setActiveReport("sbp")}
            />
          </div>
        </div>
      </section>

      {/* Report Modals */}
      <ReportModal
        open={activeReport === "performance"}
        onClose={() => setActiveReport(null)}
        title="Branch Performance Report"
        meta={`Branch: ${branch.name} | Manager: ${branch.manager}`}
      >
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ReportField label="Daily Transaction Volume" value={`${branch.dailyTransactionVolume} txns`} />
          <ReportField label="Branch Cash Position" value={`PKR ${branch.cashPosition.toLocaleString()}`} />
          <ReportField label="Active Loans" value={`${branch.activeLoans} loans`} />
          <ReportField label="New Accounts Today" value={`${branch.newAccountsToday} accounts`} />
          <ReportField label="Staff Count" value={branch.staffCount} />
          <ReportField label="Large Transaction Alerts" value={largeTransactions.length} />
        </dl>
      </ReportModal>

      <ReportModal
        open={activeReport === "staff"}
        onClose={() => setActiveReport(null)}
        title="Staff Performance Report"
        meta={`Branch: ${branch.name} | Date: 2026-06-14`}
      >
        <DataTable columns={staffColumns} data={staffPerformance} />
      </ReportModal>

      <ReportModal
        open={activeReport === "pl"}
        onClose={() => setActiveReport(null)}
        title="Branch Profit / Loss Summary"
        meta={`Branch: ${branch.name} | Period: ${branchPL.period}`}
      >
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ReportField label="Interest Income" value={`PKR ${branchPL.interestIncome.toLocaleString()}`} />
          <ReportField label="Fee Income" value={`PKR ${branchPL.feeIncome.toLocaleString()}`} />
          <ReportField label="Total Income" value={`PKR ${branchPL.totalIncome.toLocaleString()}`} />
          <ReportField label="Interest Expense" value={`PKR ${branchPL.interestExpense.toLocaleString()}`} />
          <ReportField label="Operating Expenses" value={`PKR ${branchPL.operatingExpenses.toLocaleString()}`} />
          <ReportField label="Total Expenses" value={`PKR ${branchPL.totalExpenses.toLocaleString()}`} />
          <ReportField label="Net Profit" value={`PKR ${branchPL.netProfit.toLocaleString()}`} />
        </dl>
      </ReportModal>

      <ReportModal
        open={activeReport === "sbp"}
        onClose={() => setActiveReport(null)}
        title="SBP Monthly Report Preview"
        meta={`Branch: ${sbpMonthlyReportPreview.branch} | Period: ${sbpMonthlyReportPreview.reportingMonth}`}
      >
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ReportField label="Total Deposits" value={`PKR ${sbpMonthlyReportPreview.totalDeposits.toLocaleString()}`} />
          <ReportField label="Total Advances" value={`PKR ${sbpMonthlyReportPreview.totalAdvances.toLocaleString()}`} />
          <ReportField label="Total Transactions" value={sbpMonthlyReportPreview.totalTransactions.toLocaleString()} />
          <ReportField label="AML Flags Raised" value={sbpMonthlyReportPreview.amlFlags} />
          <ReportField label="Large Transactions Reported" value={sbpMonthlyReportPreview.largeTransactionsReported} />
          <ReportField label="Submission Status" value={<StatusBadge status={sbpMonthlyReportPreview.submissionStatus} />} />
        </dl>
      </ReportModal>
    </div>
  );
}

function ReportButton({ icon: Icon, title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-left transition-colors hover:bg-surface/60"
    >
      <Icon size={20} className="text-navy-900" />
      <div>
        <p className="text-sm font-semibold text-navy-900">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </button>
  );
}

function ReportField({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="text-sm font-semibold text-navy-900">{value}</dd>
    </div>
  );
}