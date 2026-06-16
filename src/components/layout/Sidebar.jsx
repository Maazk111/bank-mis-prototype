// src/components/layout/Sidebar.jsx
import {
  LayoutDashboard,
  ArrowLeftRight,
  Landmark,
  Building2,
  FileText,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const NAV_ITEMS = {
  teller: [
    { label: "Dashboard", href: "#overview", icon: LayoutDashboard },
    { label: "Transactions", href: "#transactions", icon: ArrowLeftRight },
    { label: "Reports", href: "#reports", icon: FileText },
  ],
  "loan-officer": [
    { label: "Dashboard", href: "#overview", icon: LayoutDashboard },
    { label: "Loan Applications", href: "#loans", icon: Landmark },
    { label: "Reports", href: "#reports", icon: FileText },
  ],
  "branch-manager": [
    { label: "Dashboard", href: "#overview", icon: LayoutDashboard },
    { label: "Transactions", href: "#transactions", icon: ArrowLeftRight },
    { label: "Loans", href: "#loans", icon: Landmark },
    { label: "Reports", href: "#reports", icon: FileText },
  ],
  executive: [
    { label: "Dashboard", href: "#overview", icon: LayoutDashboard },
    { label: "Branches", href: "#branches", icon: Building2 },
    { label: "Reports", href: "#reports", icon: FileText },
  ],
};

const ROLE_LABELS = {
  teller: "Teller",
  "loan-officer": "Loan Officer",
  "branch-manager": "Branch Manager",
  executive: "Bank Executive",
};

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const { role, logout } = useApp();
  const items = NAV_ITEMS[role] || [];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy-900 text-white transition-transform duration-200 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 border-b border-navy-700 px-5 py-5">
          <ShieldCheck size={28} className="text-surface" />
          <div>
            <p className="text-sm font-bold leading-tight">Bank Core Banking</p>
            <p className="text-xs leading-tight text-surface/80">MIS Portal</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-surface/60">
            {ROLE_LABELS[role]}
          </p>
        {items.map(({ label, href, icon: Icon }) => (
              <a
            
              key={label}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-surface transition-colors hover:bg-navy-700 hover:text-white"
            >
              <Icon size={18} />
              {label}
            </a>
          ))}
        </nav>

        <div className="border-t border-navy-700 px-3 py-4">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-surface transition-colors hover:bg-navy-700 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}