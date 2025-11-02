import React, { useState } from 'react';

export default function ProductForm({ onAdd, open, onClose }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPrice = parseFloat(price);
    if (!name.trim() || isNaN(cleanPrice)) return;
    onAdd({ name: name.trim(), price: cleanPrice, imageUrl: imageUrl.trim() });
    setName('');
    setPrice('');
    setImageUrl('');
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-stone-900/30 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-100 via-stone-100 to-amber-100 p-4">
          <h2 className="text-lg font-semibold text-stone-800">Add a new item</h2>
          <p className="text-xs text-stone-600">Create a product with a price and optional image.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Smooth Gel Pen"
              className="w-full rounded-lg border border-stone-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-200/60 px-3 py-2 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="2.99"
              className="w-full rounded-lg border border-stone-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-200/60 px-3 py-2 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.example/pen.png"
              className="w-full rounded-lg border border-stone-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-200/60 px-3 py-2 outline-none"
            />
            <p className="text-xs text-stone-500 mt-1">Optional – leave blank to use a friendly placeholder.</p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-300 to-amber-400 text-stone-900 font-medium hover:from-amber-400/90 hover:to-amber-500/90"
            >
              Save item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
