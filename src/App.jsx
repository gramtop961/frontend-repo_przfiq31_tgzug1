import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import ProductForm from './components/ProductForm.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import Footer from './components/Footer.jsx';

function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState];
}

export default function App() {
  const [ownerMode, setOwnerMode] = useLocalStorage('ownerMode', false);
  const [products, setProducts] = useLocalStorage('products', []);
  const [userRatings, setUserRatings] = useLocalStorage('userRatings', {}); // { [productId]: rating }
  const [query, setQuery] = useState('');
  const [openForm, setOpenForm] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [query, products]);

  const handleAdd = ({ name, price, imageUrl }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const newItem = {
      id,
      name,
      price,
      imageUrl,
      inStock: true,
      avgRating: 0,
      ratingCount: 0,
    };
    setProducts([newItem, ...products]);
  };

  const handleToggleStock = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const handleRate = (id, value) => {
    setProducts((prev) => {
      const product = prev.find((p) => p.id === id);
      if (!product) return prev;
      const previous = userRatings[id];
      // If user has rated before, adjust average without changing count
      if (previous && product.ratingCount > 0) {
        const newAvg = (product.avgRating * product.ratingCount - previous + value) / product.ratingCount;
        return prev.map((p) => (p.id === id ? { ...p, avgRating: newAvg } : p));
      }
      // First time rating: increment count
      const newAvg = (product.avgRating * product.ratingCount + value) / (product.ratingCount + 1);
      return prev.map((p) =>
        p.id === id
          ? { ...p, avgRating: newAvg, ratingCount: (p.ratingCount || 0) + 1 }
          : p
      );
    });
    setUserRatings((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1000px_400px_at_-10%_-10%,#fde1e6_5%,transparent),radial-gradient(1000px_400px_at_110%_-10%,#dbeafe_5%,transparent),radial-gradient(1000px_400px_at_50%_120%,#ccfbf1_5%,transparent)] bg-fixed">
      <Header
        ownerMode={ownerMode}
        onToggleOwner={(v) => setOwnerMode(v)}
        onOpenAdd={() => setOpenForm(true)}
      />

      <main className="max-w-6xl mx-auto px-4">
        <section className="py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">Our Stationery</h2>
              <p className="text-slate-600 text-sm">Pastel-perfect picks for school, office, and creative play.</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pens, notebooks, colors..."
                className="w-full sm:w-72 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200/70 focus:border-blue-200"
              />
              {ownerMode && (
                <button
                  onClick={() => setOpenForm(true)}
                  className="sm:hidden px-3 py-2 rounded-lg bg-gradient-to-r from-teal-300 to-blue-300 text-slate-900 font-medium"
                >
                  Add
                </button>
              )}
            </div>
          </div>

          <div className="mt-8">
            <ProductGrid
              products={filtered}
              ownerMode={ownerMode}
              onToggleStock={handleToggleStock}
              onRate={handleRate}
            />
          </div>
        </section>
      </main>

      <Footer />

      <ProductForm open={openForm && ownerMode} onClose={() => setOpenForm(false)} onAdd={handleAdd} />
    </div>
  );
}
