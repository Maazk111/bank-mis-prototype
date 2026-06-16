// src/pages/ExecutiveDashboard.jsx
import { useState } from "react";
import {
  Landmark,
  Users,
  Banknote,
  TrendingUp,
  FileText,
  Building2,
  LineChart as LineChartIcon,
  BarChart3,
} from "lucide-react";
import KPICard from "../components/ui/KPICard";
import DataTable from "../components/ui/DataTable";
import ChartCard from "../components/ui/ChartCard";
import ReportModal from "../components/ui/ReportModal";
import { executiveSummary, branchComparison, monthlyTransactionTrend } from "../data/dummyData";

// Local report-only data — illustrative monthly revenue trend.
// June equals executiveSummary.totalRevenue for consistency.
const revenueTrend = [
  { month: "Jan", revenue: 46500000 },
  { month: "Feb", revenue: 49200000 },
  { month: "Mar", revenue: 52800000 },
  { month: "Apr", revenue: 51000000 },
  { month: "May", revenue: 56400000 },
  { month: "Jun", revenue: 60200000 },
];

function formatLargeCurrency(value) {
  if (value >= 1_000_000_000) return `PKR ${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `PKR ${(value / 1_000_000).toFixed(1)}M`;
  return `PKR ${value.toLocaleString()}`;
}

const branchColumns = [
  { key: "branch", label: "Branch" },
  {
    key: "deposits",
    label: "Deposits (PKR)",
    align: "right",
    nowrap: true,
    render: (r) => r.deposits.toLocaleString(),
  },
  {
    key: "loans",
    label: "Loan Portfolio (PKR)",
    align: "right",
    nowrap: true,
    render: (r) => r.loans.toLocaleString(),
  },
  { key: "customers", label: "Customers", align: "right", render: (r) => r.customers.toLocaleString() },
  { key: "transactions", label: "Transactions", align: "right", render: (r) => r.transactions.toLocaleString() },
  {
    key: "revenue",
    label: "Revenue (PKR)",
    align: "right",
    nowrap: true,
    render: (r) => r.revenue.toLocaleString(),
  },
];

export default function ExecutiveDashboard() {
  const [activeReport, setActiveReport] = useState(null);

  const rankedBranches = [...branchComparison].sort((a, b) => b.revenue - a.revenue);
  const totalBranchRevenue = branchComparison.reduce((sum, b) => sum + b.revenue, 0);

  const txnGrowthPct = (
    ((monthlyTransactionTrend[monthlyTransactionTrend.length - 1].deposits - monthlyTransactionTrend[0].deposits) /
      monthlyTransactionTrend[0].deposits) *
    100
  ).toFixed(1);

  const revenueGrowthPct = (
    ((revenueTrend[revenueTrend.length - 1].revenue - revenueTrend[0].revenue) / revenueTrend[0].revenue) *
    100
  ).toFixed(1);

  const totalRevenueTrend = revenueTrend.reduce((sum, r) => sum + r.revenue, 0);
  const avgMonthlyRevenue = Math.round(totalRevenueTrend / revenueTrend.length);

  return (
    <div className="space-y-6">
      {/* OVERVIEW */}
      <section id="overview" className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            label="Total Bank Deposits"
            value={formatLargeCurrency(executiveSummary.totalDeposits)}
            icon={Landmark}
            accent="navy"
          />
          <KPICard
            label="Total Customers"
            value={executiveSummary.totalCustomers.toLocaleString()}
            icon={Users}
            accent="blue"
          />
          <KPICard
            label="Total Loan Portfolio"
            value={formatLargeCurrency(executiveSummary.totalLoanPortfolio)}
            icon={Banknote}
            accent="green"
          />
          <KPICard
            label="Total Revenue"
            value={formatLargeCurrency(executiveSummary.totalRevenue)}
            icon={TrendingUp}
            accent="amber"
            trend={`+${revenueGrowthPct}% vs January`}
            trendDirection="up"
          />
        </div>

        <ChartCard
          title="Monthly Transaction Trend (Bank-Wide)"
          subtitle="Deposits vs Withdrawals (PKR)"
          type="line"
          data={monthlyTransactionTrend}
          xKey="month"
          series={[
            { key: "deposits", label: "Deposits", color: "#1F3864" },
            { key: "withdrawals", label: "Withdrawals", color: "#C0504D" },
          ]}
        />
      </section>

      {/* BRANCHES */}
      <section id="branches" className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <Building2 size={18} className="text-navy-900" />
            <h3 className="text-sm font-semibold text-navy-900">Multi-Branch Comparison</h3>
          </div>
          <DataTable columns={branchColumns} data={branchComparison} />
        </div>

        <ChartCard
          title="Branch Ranking by Revenue"
          subtitle="PKR, current reporting period"
          type="bar"
          data={rankedBranches}
          xKey="branch"
          series={[{ key: "revenue", label: "Revenue (PKR)", color: "#4472C4" }]}
        />
      </section>

      {/* REPORTS */}
      <section id="reports">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-navy-900">Reports</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ReportButton
              icon={FileText}
              title="Executive Summary Report"
              subtitle="Bank-wide KPI snapshot"
              onClick={() => setActiveReport("summary")}
            />
            <ReportButton
              icon={Building2}
              title="Multi-Branch Performance Report"
              subtitle="All 4 branches compared"
              onClick={() => setActiveReport("branches")}
            />
            <ReportButton
              icon={LineChartIcon}
              title="Revenue Trend Report"
              subtitle="6-month revenue trend"
              onClick={() => setActiveReport("revenue")}
            />
            <ReportButton
              icon={BarChart3}
              title="Strategic Analytics Report"
              subtitle="Branch ranking & contribution"
              onClick={() => setActiveReport("strategic")}
            />
          </div>
        </div>
      </section>

      {/* Report Modals */}
      <ReportModal
        open={activeReport === "summary"}
        onClose={() => setActiveReport(null)}
        title="Executive Summary Report"
        meta={`Reporting Period: ${executiveSummary.reportingPeriod}`}
      >
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ReportField label="Total Bank Deposits" value={formatLargeCurrency(executiveSummary.totalDeposits)} />
          <ReportField label="Total Customers" value={executiveSummary.totalCustomers.toLocaleString()} />
          <ReportField label="Total Loan Portfolio" value={formatLargeCurrency(executiveSummary.totalLoanPortfolio)} />
          <ReportField label="Total Revenue" value={formatLargeCurrency(executiveSummary.totalRevenue)} />
          <ReportField label="Transaction Volume Growth (Jan-Jun)" value={`+${txnGrowthPct}%`} />
          <ReportField label="Number of Branches" value={branchComparison.length} />
        </dl>
      </ReportModal>

      <ReportModal
        open={activeReport === "branches"}
        onClose={() => setActiveReport(null)}
        title="Multi-Branch Performance Report"
        meta={`Reporting Period: ${executiveSummary.reportingPeriod}`}
      >
        <DataTable columns={branchColumns} data={branchComparison} />
      </ReportModal>

      <ReportModal
        open={activeReport === "revenue"}
        onClose={() => setActiveReport(null)}
        title="Revenue Trend Report"
        meta={`6-month trend ending ${executiveSummary.reportingPeriod}`}
      >
        <ChartCard
          title="Monthly Revenue"
          subtitle="PKR"
          type="line"
          data={revenueTrend}
          xKey="month"
          series={[{ key: "revenue", label: "Revenue", color: "#1F3864" }]}
          height={220}
        />
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ReportField label="Total Revenue (6 months)" value={formatLargeCurrency(totalRevenueTrend)} />
          <ReportField label="Average Monthly Revenue" value={formatLargeCurrency(avgMonthlyRevenue)} />
          <ReportField label="Growth (Jan-Jun)" value={`+${revenueGrowthPct}%`} />
        </dl>
      </ReportModal>

      <ReportModal
        open={activeReport === "strategic"}
        onClose={() => setActiveReport(null)}
        title="Strategic Analytics Report"
        meta={`Reporting Period: ${executiveSummary.reportingPeriod}`}
      >
        <dl className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ReportField label="Top Performing Branch" value={rankedBranches[0].branch} />
          <ReportField label="Total Branches" value={branchComparison.length} />
        </dl>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Revenue Contribution by Branch
        </p>
        <ul className="space-y-1 text-sm text-slate-700">
          {rankedBranches.map((b) => (
            <li key={b.code} className="flex items-center justify-between border-b border-slate-100 py-1">
              <span>{b.branch}</span>
              <span className="font-semibold text-navy-900">
                PKR {b.revenue.toLocaleString()} ({((b.revenue / totalBranchRevenue) * 100).toFixed(1)}%)
              </span>
            </li>
          ))}
        </ul>
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