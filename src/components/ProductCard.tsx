import { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { SanityProduct, urlFor } from '../lib/sanity';

interface ProductCardProps {
  product: SanityProduct;
  whatsappNumber: string;
}

export default function ProductCard({ product, whatsappNumber }: ProductCardProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const hasImages = product.images?.length > 0;
  const currentImg = hasImages ? urlFor(product.images[imgIndex].asset).width(500).url() : null;

  function prevImg(e: React.MouseEvent) {
    e.stopPropagation();
    setImgIndex((i) => (i - 1 + product.images.length) % product.images.length);
    setImgError(false);
  }

  function nextImg(e: React.MouseEvent) {
    e.stopPropagation();
    setImgIndex((i) => (i + 1) % product.images.length);
    setImgError(false);
  }

  function handleWhatsApp() {
    const msg = encodeURIComponent(
      `Hola! Me interesa la prenda: *${product.name}*${product.price ? ` ($${product.price.toLocaleString('es-AR')})` : ''}. Quisiera más información.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
  }

  const categoryName = typeof product.category === 'object' ? product.category.title : 'Producto';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-400 hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
        {currentImg && !imgError ? (
          <img
            src={currentImg}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-stone-300 gap-2">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Sin imagen</span>
          </div>
        )}

        {/* Arrows */}
        {product.images?.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4 text-stone-700" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight className="w-4 h-4 text-stone-700" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImgIndex(i);
                    setImgError(false);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIndex ? 'bg-white w-3' : 'bg-white/60'}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Stock badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
            product.inStock
              ? 'bg-emerald-500 text-white'
              : 'bg-stone-800 text-white'
          }`}>
            {product.inStock ? 'Disponible' : 'Sin stock'}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-stone-600 capitalize">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-stone-900 text-sm leading-tight mb-1 line-clamp-1">{product.name}</h3>

        {product.description && (
          <p className="text-stone-500 text-xs leading-relaxed line-clamp-2 mb-2">{product.description}</p>
        )}

        {product.collection && (
          <p className="text-stone-400 text-xs mb-2">Colección: {product.collection}</p>
        )}

        {product.material && (
          <p className="text-stone-400 text-xs mb-3">Material: {product.material}</p>
        )}

        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1 mb-3">
            {product.colors.slice(0, 5).map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-stone-300 cursor-pointer hover:ring-2 ring-stone-400 transition-all"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}

        {product.price && (
          <p className="text-stone-900 font-bold text-base mb-3">${product.price.toLocaleString('es-AR')}</p>
        )}

        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-xs ${i < Math.floor(product.rating!) ? 'text-amber-400' : 'text-stone-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-stone-400">({product.rating})</span>
          </div>
        )}

        <button
          onClick={handleWhatsApp}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            product.inStock
              ? 'bg-[#25D366] hover:bg-[#1ebe5d] text-white active:scale-95'
              : 'bg-stone-100 text-stone-400 cursor-not-allowed'
          }`}
          disabled={!product.inStock}
        >
          <MessageCircle className="w-4 h-4" />
          {product.inStock ? 'Consultar por WhatsApp' : 'Sin stock'}
        </button>
      </div>
    </div>
  );
}
