// src/pages/LoginPage.jsx
import { useState } from "react";
import { ShieldCheck, IdCard, Lock, Info } from "lucide-react";
import { useApp } from "../context/AppContext";
import { roles } from "../data/dummyData";

export default function LoginPage() {
  const { login } = useApp();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(roles[0].id);

  function handleSubmit(e) {
    e.preventDefault();
    login(selectedRole);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-900 text-white">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-xl font-bold text-navy-900">Bank Core Banking MIS</h1>
          <p className="mt-1 text-sm text-slate-500">
            Management Information System — Staff Login Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="employeeId" className="mb-1 block text-sm font-medium text-slate-700">
              Employee ID / Customer ID
            </label>
            <div className="relative">
              <IdCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="employeeId"
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="e.g. EMP-1001"
                className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 text-sm text-slate-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/30"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 text-sm text-slate-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/30"
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="mb-1 block text-sm font-medium text-slate-700">
              Login As
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm text-slate-700 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/30"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-navy-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
          >
            Login
          </button>
        </form>

        <div className="mt-5 flex items-start gap-2 rounded-lg bg-surface/60 p-3 text-xs text-navy-900">
          <Info size={16} className="mt-0.5 shrink-0" />
          <p>
            <strong>Demo credentials:</strong> any Employee ID and Password will work — this is a
            static academic prototype with no real authentication. The dashboard shown after
            login is determined entirely by the role selected above.
          </p>
        </div>
      </div>
    </div>
  );
}