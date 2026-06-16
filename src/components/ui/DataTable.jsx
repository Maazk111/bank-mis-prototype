// src/components/ui/DataTable.jsx
function alignClass(align) {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
}

export default function DataTable({ columns, data, emptyMessage = "No records found.", dense = false }) {
  const cellPadding = dense ? "px-3 py-2" : "px-4 py-3";

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-navy-900">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`${cellPadding} text-xs font-semibold uppercase tracking-wide text-white ${alignClass(col.align)}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={`${cellPadding} text-center text-slate-400`}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id ?? row.accountNumber ?? row.employeeId ?? rowIndex}
                className={`${rowIndex % 2 === 1 ? "bg-surface/40" : "bg-white"} hover:bg-surface/70 transition-colors`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`${cellPadding} text-slate-700 ${col.nowrap ? "whitespace-nowrap" : ""} ${alignClass(col.align)}`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}