import React from 'react';
import { Package, PlusCircle } from 'lucide-react';

export default function Header({ ownerMode, onToggleOwner, onOpenAdd }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-pastel-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-pink-100 to-blue-100">
            <Package className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Pastel Paper Co.</h1>
            <p className="text-xs text-slate-500">Stationery & school supplies</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAdd}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-300/70 to-blue-300/70 hover:from-teal-300 hover:to-blue-300 text-slate-800 px-3 py-2 text-sm font-medium shadow-sm transition-colors"
            aria-label="Add new item"
          >
            <PlusCircle className="w-4 h-4" />
            Add item
          </button>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <span className="hidden sm:inline">Owner mode</span>
            <input
              type="checkbox"
              checked={ownerMode}
              onChange={(e) => onToggleOwner(e.target.checked)}
              className="peer sr-only"
              aria-label="Toggle owner mode"
            />
            <span className="w-12 h-7 inline-flex items-center p-1 rounded-full bg-slate-200 peer-checked:bg-teal-300 transition-colors">
              <span className="w-5 h-5 bg-white rounded-full shadow translate-x-0 peer-checked:translate-x-5 transition-transform" />
            </span>
          </label>
        </div>
      </div>
    </header>
  );
}
