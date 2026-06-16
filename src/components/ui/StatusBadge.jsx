// src/components/ui/StatusBadge.jsx
const STATUS_STYLES = {
  active: "bg-green-100 text-green-700 ring-green-600/20",
  completed: "bg-green-100 text-green-700 ring-green-600/20",
  approved: "bg-green-100 text-green-700 ring-green-600/20",
  verified: "bg-green-100 text-green-700 ring-green-600/20",
  paid: "bg-green-100 text-green-700 ring-green-600/20",
  balanced: "bg-green-100 text-green-700 ring-green-600/20",

  pending: "bg-amber-100 text-amber-700 ring-amber-600/20",
  upcoming: "bg-amber-100 text-amber-700 ring-amber-600/20",
  "pending submission": "bg-amber-100 text-amber-700 ring-amber-600/20",

  rejected: "bg-red-100 text-red-700 ring-red-600/20",
  overdue: "bg-red-100 text-red-700 ring-red-600/20",

  flagged: "bg-orange-100 text-orange-700 ring-orange-600/20",

  inactive: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

export default function StatusBadge({ status }) {
  const key = String(status).toLowerCase();
  const styles = STATUS_STYLES[key] || "bg-slate-100 text-slate-600 ring-slate-500/20";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles}`}
    >
      {status}
    </span>
  );
}