import { useState } from "react";
import type { Product } from "../data/products";
import { useStore } from "../store/StoreContext";
import { HeartIcon, StarIcon } from "./Icons";

export function ProductCard({ product }: { product: Product }) {
  const { navigate, toggleWishlist, isWishlisted, addToCart } = useStore();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hover, setHover] = useState(false);
  const wished = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image */}
      <div
        className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl bg-stone-100"
        onClick={() => navigate(`product/${product.id}`)}
      >
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-stone-200 to-stone-100" />
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="rounded-full bg-amber-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
              Bestseller
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Toggle wishlist"
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all ${
            wished
              ? "bg-red-500 text-white"
              : "bg-white/80 text-stone-700 hover:bg-white hover:text-red-500"
          }`}
        >
          <HeartIcon className="h-5 w-5" fill={wished ? "currentColor" : "none"} />
        </button>

        {/* Quick add */}
        <div
          className={`absolute inset-x-3 bottom-3 transition-all duration-300 ${
            hover ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product.id, product.sizes[0], product.colors[0].name, 1);
            }}
            className="w-full rounded-xl bg-stone-900/95 py-3 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-colors hover:bg-stone-800"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone-500">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <StarIcon className="h-3 w-3" />
            <span className="text-[11px] font-medium text-stone-600">{product.rating}</span>
          </div>
        </div>
        <h3
          className="cursor-pointer text-sm font-semibold text-stone-900 transition-colors hover:text-amber-700"
          onClick={() => navigate(`product/${product.id}`)}
        >
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-stone-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}
