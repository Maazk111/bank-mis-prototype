// src/pages/TellerDashboard.jsx
import { useState } from "react";
import {
  ListChecks,
  ArrowDownToLine,
  ArrowUpFromLine,
  Scale,
  Search,
  Send,
  Receipt,
  FileText,
} from "lucide-react";
import KPICard from "../components/ui/KPICard";
import DataTable from "../components/ui/DataTable";
import StatusBadge from "../components/ui/StatusBadge";
import ReportModal from "../components/ui/ReportModal";
import { useApp } from "../context/AppContext";
import { transactions, accounts, endOfDaySummary } from "../data/dummyData";

const BRANCH_CODE = "BR001";
const BRANCH_NAME = "Karachi Main";
const TXN_TYPES = ["Deposit", "Withdrawal", "Transfer"];

export default function TellerDashboard() {
  const { currentUser } = useApp();

  const branchTransactions = transactions.filter((t) => t.branch === BRANCH_CODE);

  const totalDeposits = branchTransactions
    .filter((t) => t.type === "Deposit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = branchTransactions
    .filter((t) => t.type === "Withdrawal")
    .reduce((sum, t) => sum + t.amount, 0);

  const netCashPosition = totalDeposits - totalWithdrawals;

  // ----- Customer / Account Lookup -----
  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = searchQuery.trim()
    ? accounts.filter(
        (a) =>
          a.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.accountNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // ----- Deposit / Withdrawal / Transfer form -----
  const [form, setForm] = useState({ type: "Deposit", accountNumber: "", amount: "" });
  const [receipt, setReceipt] = useState(null);

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!form.accountNumber || !form.amount) return;

    const account = accounts.find(
      (a) => a.accountNumber.toLowerCase() === form.accountNumber.toLowerCase()
    );

    setReceipt({
      refNo: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      type: form.type,
      accountNumber: form.accountNumber,
      customerName: account?.customerName || "Unknown / Walk-in",
      amount: Number(form.amount),
      date: endOfDaySummary.date,
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      teller: currentUser?.name,
      branch: BRANCH_NAME,
    });

    setForm({ type: "Deposit", accountNumber: "", amount: "" });
  }

  // ----- Reports -----
  const [activeReport, setActiveReport] = useState(null); // "receipt" | "eod" | null

  const txnColumns = [
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

  return (
    <div className="space-y-6">
      {/* OVERVIEW */}
      <section id="overview" className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard label="Today's Transactions" value={branchTransactions.length} icon={ListChecks} accent="navy" />
          <KPICard label="Cash Deposits" value={`PKR ${totalDeposits.toLocaleString()}`} icon={ArrowDownToLine} accent="green" />
          <KPICard label="Cash Withdrawals" value={`PKR ${totalWithdrawals.toLocaleString()}`} icon={ArrowUpFromLine} accent="amber" />
          <KPICard label="Net Cash Position" value={`PKR ${netCashPosition.toLocaleString()}`} icon={Scale} accent="blue" />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Customer / Account Lookup */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-3 text-sm font-semibold text-navy-900">Customer / Account Lookup</h3>
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search by customer name or account number (e.g. "Ali" or "PK01")'
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/30"
              />
            </div>
            {searchQuery.trim() === "" ? (
              <p className="text-sm text-slate-400">Start typing to search accounts.</p>
            ) : searchResults.length === 0 ? (
              <p className="text-sm text-slate-400">No matching accounts found.</p>
            ) : (
              <ul className="space-y-2">
                {searchResults.map((acc) => (
                  <li key={acc.accountNumber} className="rounded-lg border border-slate-200 p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-navy-900">{acc.customerName}</p>
                      <StatusBadge status={acc.status} />
                    </div>
                    <p className="text-slate-500">
                      {acc.accountNumber} • {acc.type}
                    </p>
                    <p className="mt-1 font-semibold text-navy-900">PKR {acc.balance.toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Deposit / Withdrawal / Transfer Form */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-3 text-sm font-semibold text-navy-900">New Transaction</h3>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Transaction Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/30"
                >
                  {TXN_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleFormChange}
                  placeholder="e.g. PK01-1001-0001"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/30"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Amount (PKR)</label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleFormChange}
                  placeholder="0"
                  min="0"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/30"
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
              >
                <Send size={16} />
                Process Transaction
              </button>
              <p className="text-xs text-slate-400">
                Static demo form — submitting generates a receipt preview below but does not modify any account balance.
              </p>
            </form>
          </div>
        </div>

        {/* Receipt Preview */}
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-navy-900">Receipt Preview</h3>
          {receipt ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-surface-soft p-4 font-mono text-sm">
              <p className="mb-2 text-center font-semibold text-navy-900">
                BANK CORE BANKING — TRANSACTION RECEIPT
              </p>
              <div className="space-y-1 text-slate-700">
                <p>Reference No: {receipt.refNo}</p>
                <p>
                  Date: {receipt.date} {receipt.time}
                </p>
                <p>Branch: {receipt.branch}</p>
                <p>Transaction Type: {receipt.type}</p>
                <p>Account Number: {receipt.accountNumber}</p>
                <p>Customer: {receipt.customerName}</p>
                <p>Amount: PKR {receipt.amount.toLocaleString()}</p>
                <p>Processed By: {receipt.teller}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              No transaction processed yet. Fill in the form above and click "Process Transaction" to preview a receipt.
            </p>
          )}
        </div>
      </section>

      {/* TRANSACTIONS */}
      <section id="transactions">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-navy-900">Recent Transactions — {BRANCH_NAME}</h3>
          <DataTable columns={txnColumns} data={branchTransactions} />
        </div>
      </section>

      {/* REPORTS */}
      <section id="reports">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-navy-900">Reports</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={() => setActiveReport("receipt")}
              className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-left transition-colors hover:bg-surface/60"
            >
              <Receipt size={20} className="text-navy-900" />
              <div>
                <p className="text-sm font-semibold text-navy-900">Daily Transaction Receipt</p>
                <p className="text-xs text-slate-500">Latest processed transaction receipt</p>
              </div>
            </button>
            <button
              onClick={() => setActiveReport("eod")}
              className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-left transition-colors hover:bg-surface/60"
            >
              <FileText size={20} className="text-navy-900" />
              <div>
                <p className="text-sm font-semibold text-navy-900">End-of-Day Summary Report</p>
                <p className="text-xs text-slate-500">Branch cash reconciliation summary</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Report Modals */}
      <ReportModal
        open={activeReport === "receipt"}
        onClose={() => setActiveReport(null)}
        title="Daily Transaction Receipt"
        meta={`Branch: ${BRANCH_NAME} | Date: ${endOfDaySummary.date}`}
      >
        {receipt ? (
          <div className="space-y-1 font-mono text-sm text-slate-700">
            <p>Reference No: {receipt.refNo}</p>
            <p>
              Date: {receipt.date} {receipt.time}
            </p>
            <p>Transaction Type: {receipt.type}</p>
            <p>Account Number: {receipt.accountNumber}</p>
            <p>Customer: {receipt.customerName}</p>
            <p>Amount: PKR {receipt.amount.toLocaleString()}</p>
            <p>Processed By: {receipt.teller}</p>
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No transaction has been processed yet in this session. Use the "New Transaction" form to generate a receipt.
          </p>
        )}
      </ReportModal>

      <ReportModal
        open={activeReport === "eod"}
        onClose={() => setActiveReport(null)}
        title="End-of-Day Summary Report"
        meta={`Branch: ${endOfDaySummary.branch} | Date: ${endOfDaySummary.date}`}
      >
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ReportField label="Opening Cash Balance" value={`PKR ${endOfDaySummary.openingCashBalance.toLocaleString()}`} />
          <ReportField label="Total Deposits" value={`PKR ${endOfDaySummary.totalDeposits.toLocaleString()}`} />
          <ReportField label="Total Withdrawals" value={`PKR ${endOfDaySummary.totalWithdrawals.toLocaleString()}`} />
          <ReportField label="Total Transfers" value={`PKR ${endOfDaySummary.totalTransfers.toLocaleString()}`} />
          <ReportField label="Closing Cash Balance" value={`PKR ${endOfDaySummary.closingCashBalance.toLocaleString()}`} />
          <ReportField label="Total Transactions" value={endOfDaySummary.totalTransactions} />
          <ReportField label="Reconciliation Status" value={<StatusBadge status={endOfDaySummary.reconciliationStatus} />} />
        </dl>
      </ReportModal>
    </div>
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