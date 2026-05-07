import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  activeCategory: string;
  categories: Array<{ _id: string; title: string; slug: { current: string } }>;
  onCategoryChange: (slug: string) => void;
}

export default function Header({ activeCategory, categories, onCategoryChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Todo', value: 'all' },
    ...categories.map((cat) => ({ label: cat.title, value: cat.slug.current })),
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onCategoryChange('all')}>
            <div className="w-8 h-8 bg-stone-900 rounded flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-stone-900 text-lg tracking-tight">URBANO</span>
              <span className="block text-xs text-stone-400 -mt-1 tracking-widest uppercase">Catálogo</span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.slice(0, 4).map((item) => (
              <button
                key={item.value}
                onClick={() => onCategoryChange(item.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === item.value
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const handleClick = () => {
                onCategoryChange(item.value);
                setMenuOpen(false);
              };
              return (
                <button
                  key={item.value}
                  onClick={handleClick}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                    activeCategory === item.value
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
