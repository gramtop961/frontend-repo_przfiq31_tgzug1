import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/70">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Pastel Paper Co. Crafted with care for students and professionals.
        </p>
      </div>
    </footer>
  );
}
