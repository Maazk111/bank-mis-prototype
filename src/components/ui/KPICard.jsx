// src/components/ui/KPICard.jsx
export default function KPICard({ label, value, icon: Icon, trend, trendDirection, accent = "navy" }) {
  const accentStyles = {
    navy: "bg-navy-900 text-white",
    blue: "bg-navy-500 text-white",
    light: "bg-surface text-navy-900",
    green: "bg-green-600 text-white",
    amber: "bg-amber-500 text-white",
    red: "bg-red-600 text-white",
  };

  const trendColor =
    trendDirection === "up"
      ? "text-green-600"
      : trendDirection === "down"
      ? "text-red-600"
      : "text-slate-500";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-navy-900">{value}</p>
        {trend && (
          <p className={`mt-1 text-xs font-medium ${trendColor}`}>{trend}</p>
        )}
      </div>
      {Icon && (
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accentStyles[accent]}`}
        >
          <Icon size={20} />
        </div>
      )}
    </div>
  );
}