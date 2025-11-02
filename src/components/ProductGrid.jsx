import React from 'react';
import { Star } from 'lucide-react';

const fallbackImg =
  'https://images.unsplash.com/photo-1505765581254-24c1e5232b96?q=80&w=1200&auto=format&fit=crop';

function Rating({ value, count, onRate, disabled }) {
  const rounded = Math.round(value || 0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          onClick={() => !disabled && onRate(i)}
          className={`p-0.5 ${disabled ? 'cursor-default' : 'hover:scale-105'} transition`}
          aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
        >
          <Star
            className={`w-4 h-4 ${i <= rounded ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
          />
        </button>
      ))}
      <span className="text-xs text-slate-500 ml-1">({count || 0})</span>
    </div>
  );
}

export default function ProductGrid({ products, ownerMode, onToggleStock, onRate }) {
  if (!products.length) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600">No items yet. Switch on Owner mode to add products.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p.id} className="group rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={p.imageUrl || fallbackImg}
              alt={p.name}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
              onError={(e) => {
                e.currentTarget.src = fallbackImg;
              }}
            />
            {!p.inStock && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur flex items-center justify-center">
                <span className="px-3 py-1 text-sm rounded-full bg-slate-200 text-slate-700 border border-slate-300">Out of stock</span>
              </div>
            )}
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-slate-800">{p.name}</h3>
                <p className="text-sm text-slate-500">${p.price.toFixed(2)}</p>
              </div>
              {ownerMode && (
                <button
                  onClick={() => onToggleStock(p.id)}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    p.inStock
                      ? 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {p.inStock ? 'Mark out' : 'Mark in'}
                </button>
              )}
            </div>

            <Rating
              value={p.avgRating}
              count={p.ratingCount}
              onRate={(val) => onRate(p.id, val)}
              disabled={ownerMode}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
