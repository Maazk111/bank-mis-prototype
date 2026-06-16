// src/pages/LoanOfficerDashboard.jsx
import { useState } from "react";
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileCheck,
  FileWarning,
  PieChart,
} from "lucide-react";
import KPICard from "../components/ui/KPICard";
import DataTable from "../components/ui/DataTable";
import StatusBadge from "../components/ui/StatusBadge";
import ReportModal from "../components/ui/ReportModal";
import { loans as initialLoans, branches, sampleRepaymentSchedule } from "../data/dummyData";

const DEMO_DATE = "2026-06-14";

function eligibilityInfo(score) {
  if (!score) return { label: "No Credit History", className: "bg-slate-100 text-slate-600" };
  if (score >= 700) return { label: "Eligible", className: "bg-green-100 text-green-700" };
  if (score >= 600) return { label: "Marginal", className: "bg-amber-100 text-amber-700" };
  return { label: "High Risk", className: "bg-red-100 text-red-700" };
}

function branchName(code) {
  const branch = branches.find((b) => b.code === code);
  return branch ? branch.name : code;
}

// Computes a 5-installment amortization preview for any loan with monthlyInstallment > 0
function generateSchedule(loan, count = 5) {
  const monthlyRate = loan.interestRate / 100 / 12;
  let balance = loan.amount;
  const rows = [];
  for (let i = 1; i <= count; i++) {
    const interest = balance * monthlyRate;
    const principal = loan.monthlyInstallment - interest;
    balance -= principal;
    rows.push({
      installmentNo: i,
      principal: Math.round(principal),
      interest: Math.round(interest),
      total: Math.round(loan.monthlyInstallment),
      status: "Upcoming",
    });
  }
  return rows;
}

function getSchedule(loan) {
  if (loan.id === sampleRepaymentSchedule.loanId) {
    return sampleRepaymentSchedule.schedule.map(({ installmentNo, principal, interest, total, status }) => ({
      installmentNo,
      principal,
      interest,
      total,
      status,
    }));
  }
  return generateSchedule(loan);
}

const scheduleColumns = [
  { key: "installmentNo", label: "#", align: "center" },
  { key: "principal", label: "Principal (PKR)", align: "right", render: (r) => r.principal.toLocaleString() },
  { key: "interest", label: "Interest (PKR)", align: "right", render: (r) => r.interest.toLocaleString() },
  { key: "total", label: "Total (PKR)", align: "right", render: (r) => r.total.toLocaleString() },
  { key: "status", label: "Status", align: "center", render: (r) => <StatusBadge status={r.status} /> },
];

export default function LoanOfficerDashboard() {
  const [loanList, setLoanList] = useState(initialLoans);
  const [activeReport, setActiveReport] = useState(null);
  const [scheduleLoan, setScheduleLoan] = useState(null);

  const pendingCount = loanList.filter((l) => l.status === "Pending").length;
  const approvedCount = loanList.filter((l) => l.status === "Approved").length;
  const rejectedCount = loanList.filter((l) => l.status === "Rejected").length;
  const overdueCount = loanList.filter((l) => l.status === "Overdue").length;

  function handleApprove(loanId) {
    setLoanList((prev) =>
      prev.map((l) => (l.id === loanId ? { ...l, status: "Approved", approvalDate: DEMO_DATE } : l))
    );
  }

  function handleReject(loanId) {
    const reason = window.prompt("Enter rejection reason (required):");
    if (!reason || !reason.trim()) {
      window.alert("Rejection requires a comment. Loan status unchanged.");
      return;
    }
    setLoanList((prev) =>
      prev.map((l) =>
        l.id === loanId ? { ...l, status: "Rejected", rejectionReason: reason.trim(), monthlyInstallment: 0 } : l
      )
    );
  }

  const columns = [
    { key: "id", label: "Loan ID", nowrap: true },
    { key: "customerName", label: "Customer" },
    { key: "type", label: "Loan Type" },
    {
      key: "amount",
      label: "Amount (PKR)",
      align: "right",
      nowrap: true,
      render: (r) => r.amount.toLocaleString(),
    },
    {
      key: "creditScore",
      label: "Credit / Eligibility",
      align: "center",
      render: (r) => {
        const elig = eligibilityInfo(r.creditScore);
        return (
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-slate-500">{r.creditScore || "—"}</span>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${elig.className}`}>
              {elig.label}
            </span>
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      nowrap: true,
      render: (r) => (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {r.status === "Pending" && (
            <>
              <button
                onClick={() => handleApprove(r.id)}
                className="rounded-md bg-green-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(r.id)}
                className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700"
              >
                Reject
              </button>
            </>
          )}
          {r.monthlyInstallment > 0 && (
            <button
              onClick={() => setScheduleLoan(r)}
              className="rounded-md border border-navy-900 px-2.5 py-1 text-xs font-semibold text-navy-900 hover:bg-surface"
            >
              Schedule
            </button>
          )}
          {r.status !== "Pending" && r.monthlyInstallment === 0 && <span className="text-xs text-slate-400">—</span>}
        </div>
      ),
    },
  ];

  // ----- Report data (derived from live loanList) -----
  const approvedLoans = loanList.filter((l) => l.status === "Approved");
  const overdueLoans = loanList.filter((l) => l.status === "Overdue");
  const activePortfolioValue = [...approvedLoans, ...overdueLoans].reduce((sum, l) => sum + l.amount, 0);
  const typeCounts = loanList.reduce((acc, l) => {
    acc[l.type] = (acc[l.type] || 0) + 1;
    return acc;
  }, {});

  const approvalReportColumns = [
    { key: "id", label: "Loan ID", nowrap: true },
    { key: "customerName", label: "Customer" },
    { key: "type", label: "Loan Type" },
    { key: "amount", label: "Amount (PKR)", align: "right", render: (r) => r.amount.toLocaleString() },
    { key: "approvalDate", label: "Approval Date", nowrap: true },
    {
      key: "monthlyInstallment",
      label: "Monthly Installment",
      align: "right",
      render: (r) => `PKR ${r.monthlyInstallment.toLocaleString()}`,
    },
  ];

  const overdueReportColumns = [
    { key: "id", label: "Loan ID", nowrap: true },
    { key: "customerName", label: "Customer" },
    { key: "type", label: "Loan Type" },
    { key: "amount", label: "Amount (PKR)", align: "right", render: (r) => r.amount.toLocaleString() },
    {
      key: "monthlyInstallment",
      label: "Monthly Installment",
      align: "right",
      render: (r) => `PKR ${r.monthlyInstallment.toLocaleString()}`,
    },
    { key: "branch", label: "Branch", render: (r) => branchName(r.branch) },
  ];

  return (
    <div className="space-y-6">
      {/* OVERVIEW */}
      <section id="overview">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard label="Pending Applications" value={pendingCount} icon={Clock} accent="amber" />
          <KPICard label="Approved Loans" value={approvedCount} icon={CheckCircle2} accent="green" />
          <KPICard label="Rejected Loans" value={rejectedCount} icon={XCircle} accent="red" />
          <KPICard label="Overdue Loans" value={overdueCount} icon={AlertCircle} accent="navy" />
        </div>
      </section>

      {/* LOAN APPLICATIONS */}
      <section id="loans">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-navy-900">Loan Applications</h3>
          <DataTable columns={columns} data={loanList} />
          <p className="mt-2 text-xs text-slate-400">
            Approve/Reject update this table live (session only). Rejecting requires a comment.
          </p>
        </div>
      </section>

      {/* REPORTS */}
      <section id="reports">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-navy-900">Reports</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ReportButton
              icon={FileCheck}
              title="Loan Approval Report"
              subtitle={`${approvedLoans.length} approved loans`}
              onClick={() => setActiveReport("approval")}
            />
            <ReportButton
              icon={FileWarning}
              title="Overdue Loan Report"
              subtitle={`${overdueLoans.length} overdue loans`}
              onClick={() => setActiveReport("overdue")}
            />
            <ReportButton
              icon={PieChart}
              title="Loan Portfolio Summary"
              subtitle={`PKR ${activePortfolioValue.toLocaleString()} active`}
              onClick={() => setActiveReport("portfolio")}
            />
          </div>
        </div>
      </section>

      {/* Report Modals */}
      <ReportModal
        open={activeReport === "approval"}
        onClose={() => setActiveReport(null)}
        title="Loan Approval Report"
        meta={`Date: ${DEMO_DATE} | ${approvedLoans.length} approved loans`}
      >
        <DataTable columns={approvalReportColumns} data={approvedLoans} emptyMessage="No approved loans." />
      </ReportModal>

      <ReportModal
        open={activeReport === "overdue"}
        onClose={() => setActiveReport(null)}
        title="Overdue Loan Report"
        meta={`Date: ${DEMO_DATE} | ${overdueLoans.length} overdue loans`}
      >
        <DataTable columns={overdueReportColumns} data={overdueLoans} emptyMessage="No overdue loans." />
      </ReportModal>

      <ReportModal
        open={activeReport === "portfolio"}
        onClose={() => setActiveReport(null)}
        title="Loan Portfolio Summary"
        meta={`Date: ${DEMO_DATE}`}
      >
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ReportField label="Total Applications" value={loanList.length} />
          <ReportField label="Active Portfolio Value" value={`PKR ${activePortfolioValue.toLocaleString()}`} />
          <ReportField label="Pending" value={pendingCount} />
          <ReportField label="Approved" value={approvedCount} />
          <ReportField label="Rejected" value={rejectedCount} />
          <ReportField label="Overdue" value={overdueCount} />
        </dl>
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">By Loan Type</p>
          <ul className="space-y-1 text-sm text-slate-700">
            {Object.entries(typeCounts).map(([type, count]) => (
              <li key={type} className="flex justify-between border-b border-slate-100 py-1">
                <span>{type}</span>
                <span className="font-semibold text-navy-900">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </ReportModal>

      <ReportModal
        open={scheduleLoan !== null}
        onClose={() => setScheduleLoan(null)}
        title={`Repayment Schedule — ${scheduleLoan?.id ?? ""}`}
        meta={scheduleLoan ? `Customer: ${scheduleLoan.customerName} | ${scheduleLoan.type} | PKR ${scheduleLoan.amount.toLocaleString()}` : ""}
      >
        {scheduleLoan && (
          <>
            <DataTable columns={scheduleColumns} data={getSchedule(scheduleLoan)} />
            <p className="mt-2 text-xs text-slate-400">Showing first 5 installments of {scheduleLoan.termMonths}.</p>
          </>
        )}
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