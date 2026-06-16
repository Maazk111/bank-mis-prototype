// src/components/ui/ReportModal.jsx
import { X, Printer } from "lucide-react";

export default function ReportModal({ open, onClose, title, meta, children }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between rounded-t-xl border-b border-slate-200 bg-navy-900 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            {meta && <p className="mt-1 text-xs text-surface">{meta}</p>}
          </div>
          <button onClick={onClose} className="text-white hover:text-surface" aria-label="Close report">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">{children}</div>

        <div className="flex justify-end gap-2 border-t border-slate-200 px-6 py-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-700"
          >
            <Printer size={16} />
            Print / Save as PDF
          </button>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}