import { useMemo, useState, useEffect } from "react";
import { products } from "../data/products";
import { useStore } from "../store/StoreContext";
import { ProductCard } from "../components/ProductCard";
import { CheckIcon, CloseIcon, FilterIcon, SearchIcon } from "../components/Icons";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "38", "39", "40", "41", "42", "43", "44", "45", "One Size"];

export function Shop() {
  const { route, navigate, searchQuery, setSearchQuery } = useStore();
  const category = route.name === "shop" ? route.category : undefined;

  const [sort, setSort] = useState("featured");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 500]);
    setSort("featured");
  }, [category]);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter((p) => p.category === category);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }
    if (selectedSizes.length)
      list = list.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    if (selectedColors.length)
      list = list.filter((p) => p.colors.some((c) => selectedColors.includes(c.name)));
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
        break;
      default:
        list.sort(
          (a, b) => Number(!!b.isBestseller) - Number(!!a.isBestseller)
        );
    }
    return list;
  }, [category, searchQuery, selectedSizes, selectedColors, priceRange, sort]);

  const toggleSize = (s: string) =>
    setSelectedSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  const toggleColor = (c: string) =>
    setSelectedColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const activeFilters =
    selectedSizes.length + selectedColors.length + (priceRange[1] < 500 ? 1 : 0);

  const clearAll = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 500]);
    setSearchQuery("");
  };

  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Products";

  const FilterPanel = (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-900">
          Category
        </h4>
        <div className="space-y-1">
          {[
            { label: "All Products", path: "shop" },
            { label: "Men", path: "shop/men" },
            { label: "Women", path: "shop/women" },
            { label: "Accessories", path: "shop/accessories" },
          ].map((c) => (
            <button
              key={c.path}
              onClick={() => navigate(c.path)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                (category || "all") === (c.path.split("/")[1] || "all")
                  ? "bg-amber-50 font-semibold text-amber-700"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-900">
          Price Range
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-stone-600">${priceRange[0]}</span>
            <span className="text-stone-600">${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-amber-600"
          />
          <div className="flex flex-wrap gap-2">
            {[[0, 100], [100, 200], [200, 300], [300, 500]].map(([min, max]) => (
              <button
                key={`${min}-${max}`}
                onClick={() => setPriceRange([min, max])}
                className="rounded-full border border-stone-300 px-3 py-1 text-xs transition-colors hover:border-amber-600 hover:text-amber-700"
              >
                ${min} - ${max}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-900">Size</h4>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={`min-w-[44px] rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                selectedSizes.includes(s)
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "border-stone-300 text-stone-600 hover:border-stone-500"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-900">Color</h4>
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleColor(c.name)}
              title={c.name}
              className={`relative h-9 w-9 rounded-full border-2 transition-all ${
                selectedColors.includes(c.name)
                  ? "border-amber-600 ring-2 ring-amber-200"
                  : "border-stone-300 hover:border-stone-500"
              }`}
              style={{ backgroundColor: c.hex }}
            >
              {selectedColors.includes(c.name) && (
                <CheckIcon className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />
              )}
            </button>
          ))}
        </div>
      </div>

      {activeFilters > 0 && (
        <button
          onClick={clearAll}
          className="w-full rounded-lg border border-stone-300 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-600 transition-colors hover:bg-stone-100"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <nav className="mb-3 text-xs text-stone-500">
          <button onClick={() => navigate("home")} className="hover:text-amber-700">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate("shop")} className="hover:text-amber-700">Shop</button>
          {category && (
            <>
              <span className="mx-2">/</span>
              <span className="text-stone-700">{categoryTitle}</span>
            </>
          )}
        </nav>
        <h1 className="font-display text-4xl font-bold text-stone-900 sm:text-5xl">
          {categoryTitle}
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          {filtered.length} {filtered.length === 1 ? "product" : "products"} available
        </p>
      </div>

      {/* Search bar */}
      {searchQuery && (
        <div className="mb-6 flex items-center justify-center gap-2 rounded-full bg-amber-50 px-4 py-3 text-sm">
          <SearchIcon className="h-4 w-4 text-amber-700" />
          <span>
            Showing results for <strong className="text-amber-800">"{searchQuery}"</strong>
          </span>
          <button
            onClick={() => setSearchQuery("")}
            className="ml-2 rounded-full p-1 hover:bg-amber-100"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-28">
            <h3 className="mb-5 font-display text-xl font-bold text-stone-900">Filters</h3>
            {FilterPanel}
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 lg:hidden"
            >
              <FilterIcon className="h-4 w-4" />
              Filters
              {activeFilters > 0 && (
                <span className="rounded-full bg-amber-600 px-1.5 text-[10px] font-bold text-white">
                  {activeFilters}
                </span>
              )}
            </button>
            <div className="hidden text-sm text-stone-500 lg:block">
              {filtered.length} results
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-stone-500">Sort by:</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-600"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 py-20 text-center">
              <p className="font-display text-2xl font-bold text-stone-700">No products found</p>
              <p className="mt-2 text-sm text-stone-500">
                Try adjusting your filters or search query.
              </p>
              <button
                onClick={clearAll}
                className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-stone-800"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-stone-900/50"
            onClick={() => setShowFilters(false)}
          />
          <div className="animate-slide-right absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-cream p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            {FilterPanel}
            <button
              onClick={() => setShowFilters(false)}
              className="mt-6 w-full rounded-full bg-stone-900 py-3 text-sm font-semibold uppercase tracking-wider text-white"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
