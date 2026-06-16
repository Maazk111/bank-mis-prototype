// src/components/ui/ChartCard.jsx
import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";

const DEFAULT_COLORS = ["#1F3864", "#4472C4", "#8FAADC", "#C0504D"];

function formatCompact(value) {
  if (typeof value !== "number") return value;
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return value;
}

export default function ChartCard({ title, subtitle, type = "line", data, xKey, series, height = 260 }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-navy-900">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height={height}>
        {type === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="#64748B" />
            <YAxis tick={{ fontSize: 12 }} stroke="#64748B" tickFormatter={formatCompact} />
            <Tooltip formatter={formatCompact} />
            {series.length > 1 && <Legend />}
            {series.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label}
                fill={s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="#64748B" />
            <YAxis tick={{ fontSize: 12 }} stroke="#64748B" tickFormatter={formatCompact} />
            <Tooltip formatter={formatCompact} />
            {series.length > 1 && <Legend />}
            {series.map((s, i) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}