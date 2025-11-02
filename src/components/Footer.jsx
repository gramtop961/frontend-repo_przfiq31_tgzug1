import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-amber-200/60 bg-white/80">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-sm text-stone-600">
          © {new Date().getFullYear()} Pastel Paper Co. Crafted with care for students and professionals.
        </p>
      </div>
    </footer>
  );
}
