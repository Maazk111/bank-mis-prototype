// src/components/layout/Topbar.jsx
import { Menu, User, Calendar } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { branches } from "../../data/dummyData";

const ROLE_TITLES = {
  teller: "Teller Dashboard",
  "loan-officer": "Loan Application & Approval",
  "branch-manager": "Branch Manager Dashboard",
  executive: "Executive Multi-Branch Report",
};

function branchName(code) {
  if (!code || code === "Head Office") return "Head Office";
  const branch = branches.find((b) => b.code === code);
  return branch ? branch.name : code;
}

export default function Topbar({ onMenuClick }) {
  const { currentUser, role, today } = useApp();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-navy-900 hover:bg-surface md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-base font-semibold text-navy-900">
            {ROLE_TITLES[role] || "Dashboard"}
          </h1>
          <p className="flex items-center gap-1 text-xs text-slate-500">
            <Calendar size={12} />
            {today}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-navy-900">{currentUser?.name}</p>
          <p className="text-xs text-slate-500">
            {currentUser?.role} • {branchName(currentUser?.branch)}
          </p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-white">
          <User size={18} />
        </div>
      </div>
    </header>
  );
}