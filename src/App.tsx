import { useState, useEffect } from 'react';
import { MessageCircle, Search, X, Loader2 } from 'lucide-react';
import { getProducts, getCategories, SanityProduct, SanityCategory } from './lib/sanity';
import Header from './components/Header';
import ProductCard from './components/ProductCard';

const WHATSAPP_NUMBER = '5491100000000';

export default function App() {
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [categories, setCategories] = useState<SanityCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'available' | 'unavailable'>('all');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
        setProducts(prods);
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = products.filter((p) => {
    const catMatch =
      category === 'all' || (typeof p.category === 'object' && p.category?.slug?.current === category);
    const searchMatch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    const stockMatch =
      stockFilter === 'all' ||
      (stockFilter === 'available' && p.inStock) ||
      (stockFilter === 'unavailable' && !p.inStock);
    return catMatch && searchMatch && stockMatch;
  });

  const availableCount = products.filter(
    (p) => (category === 'all' ? true : typeof p.category === 'object' && p.category?.slug?.current === category) && p.inStock
  ).length;

  const categoryName =
    category === 'all'
      ? 'Todos los productos'
      : categories.find((c) => c.slug?.current === category)?.title || 'Productos';

  return (
    <div className="min-h-screen bg-stone-50">
      <Header activeCategory={category} categories={categories} onCategoryChange={(c) => { setCategory(c); setSearch(''); }} />

      {/* Hero */}
      <section className="pt-16">
        <div className="relative overflow-hidden bg-stone-900 text-white">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/1619652/pexels-photo-1619652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-xl">
              <p className="text-stone-400 text-xs tracking-widest uppercase mb-3">Colección Importada</p>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                Estilo que
                <br />
                <span className="text-stone-300">habla por vos</span>
              </h1>
              <p className="text-stone-400 text-base leading-relaxed mb-8">
                Camperas y pantalones importados de primera calidad. Consulta disponibilidad directo por WhatsApp.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {(['all', 'available', 'unavailable'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setStockFilter(f)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  stockFilter === f
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {f === 'all' ? 'Todos' : f === 'available' ? 'Disponibles' : 'Sin stock'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-stone-900">
            {categoryName}
            <span className="ml-2 text-sm font-normal text-stone-400">({filtered.length} prendas)</span>
          </h2>
          {availableCount > 0 && (
            <p className="text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1.5 rounded-full">
              {availableCount} disponibles ahora
            </p>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-stone-400 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-stone-300" />
            </div>
            <p className="text-stone-500 font-medium">No se encontraron productos</p>
            <p className="text-stone-400 text-sm mt-1">Intenta cambiar los filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p._id} product={p} whatsappNumber={WHATSAPP_NUMBER} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-stone-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <span className="text-white font-bold tracking-tight">URBANO</span>
              </div>
              <p className="text-xs">Camperas y pantalones importados</p>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
          <div className="border-t border-stone-800 mt-8 pt-6 text-center text-xs text-stone-600">
            Solo catálogo &mdash; Precios y disponibilidad pueden variar. Consulta por WhatsApp.
          </div>
        </div>
      </footer>
    </div>
  );
}