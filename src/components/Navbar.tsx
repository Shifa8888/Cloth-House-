import { useEffect, useState } from "react";
import { useStore } from "../store/StoreContext";
import {
  CartIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
  SparkleIcon,
} from "./Icons";

const NAV_LINKS = [
  { label: "Home", path: "home" },
  { label: "Shop All", path: "shop" },
  { label: "Men", path: "shop/men" },
  { label: "Women", path: "shop/women" },
  { label: "Accessories", path: "shop/accessories" },
  { label: "About", path: "about" },
  { label: "Contact", path: "contact" },
];

export function Navbar() {
  const { navigate, route, cartCount, wishlist, user, searchQuery, setSearchQuery } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [route]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate("shop");
    setSearchOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "home") return route.name === "home";
    if (path.startsWith("shop/")) {
      const cat = path.split("/")[1];
      return route.name === "shop" && route.category === cat;
    }
    if (path === "shop") return route.name === "shop" && !route.category;
    return route.name === path;
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="overflow-hidden bg-stone-900 text-cream">
        <div className="flex whitespace-nowrap py-2.5 text-[11px] font-medium uppercase tracking-[0.2em]">
          <div className="marquee flex shrink-0 items-center gap-12 px-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                <span className="flex items-center gap-2">
                  <SparkleIcon className="h-3.5 w-3.5 text-amber-400" />
                  Free shipping on orders over $150
                </span>
                <span className="flex items-center gap-2">
                  <SparkleIcon className="h-3.5 w-3.5 text-amber-400" />
                  New Season — Autumn / Winter 2026
                </span>
                <span className="flex items-center gap-2">
                  <SparkleIcon className="h-3.5 w-3.5 text-amber-400" />
                  Use code WELCOME10 for 10% off your first order
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream/95 shadow-md backdrop-blur-md"
            : "bg-cream"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <CloseIcon className="h-6 w-6 text-stone-800" />
            ) : (
              <MenuIcon className="h-6 w-6 text-stone-800" />
            )}
          </button>

          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            className="font-display text-2xl font-bold tracking-[0.15em] text-stone-900 sm:text-3xl"
          >
            AK Clothes
          </button>

          {/* Desktop nav */}
          <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`relative text-sm font-medium tracking-wide transition-colors ${
                  isActive(link.path)
                    ? "text-amber-700"
                    : "text-stone-700 hover:text-amber-700"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-amber-700 transition-all duration-300 ${
                    isActive(link.path) ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200/60"
              aria-label="Search"
            >
              <SearchIcon className="h-5 w-5" />
            </button>

            <button
              onClick={() => navigate(user ? "account" : "auth")}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200/60 sm:flex"
              aria-label="Account"
            >
              <UserIcon className="h-5 w-5" />
            </button>

            <button
              onClick={() => navigate("wishlist")}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200/60"
              aria-label="Wishlist"
            >
              <HeartIcon className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate("cart")}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200/60"
              aria-label="Cart"
            >
              <CartIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="animate-fade border-t border-stone-200 bg-cream">
            <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
              <form onSubmit={submitSearch} className="relative">
                <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                <input
                  autoFocus
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search for products, brands, categories..."
                  className="w-full rounded-full border border-stone-300 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition-colors focus:border-amber-600"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </form>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span>Popular:</span>
                {["Dress", "Leather Jacket", "Sneakers", "Knitwear", "Denim"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setLocalSearch(t);
                      setSearchQuery(t);
                      navigate("shop");
                      setSearchOpen(false);
                    }}
                    className="rounded-full border border-stone-300 px-3 py-1 transition-colors hover:border-amber-600 hover:text-amber-700"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="animate-fade border-t border-stone-200 bg-cream lg:hidden">
            <div className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-amber-50 text-amber-700"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => navigate(user ? "account" : "auth")}
                className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-stone-700 hover:bg-stone-100 sm:hidden"
              >
                {user ? `Hi, ${user.name.split(" ")[0]}` : "Login / Register"}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
