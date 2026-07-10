import { useStore } from "../store/StoreContext";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { HeartIcon, ChevronRight, ArrowRight } from "../components/Icons";

export function Wishlist() {
  const { wishlist, navigate } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-xs text-stone-500">
        <button onClick={() => navigate("home")} className="hover:text-amber-700">Home</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-stone-700">Wishlist</span>
      </nav>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-stone-900 sm:text-5xl">My Wishlist</h1>
          <p className="mt-2 text-sm text-stone-500">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={() => navigate("shop")}
            className="group flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-amber-700"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <HeartIcon className="h-9 w-9 text-red-400" />
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold text-stone-900">
            Your wishlist is empty
          </h2>
          <p className="mt-2 max-w-sm text-sm text-stone-500">
            Tap the heart icon on any product to save it here for later.
          </p>
          <button
            onClick={() => navigate("shop")}
            className="mt-6 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-stone-800"
          >
            Discover Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
