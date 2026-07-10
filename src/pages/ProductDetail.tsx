import { useState } from "react";
import { getProductById, getRelatedProducts } from "../data/products";
import { useStore } from "../store/StoreContext";
import { ProductCard } from "../components/ProductCard";
import {
  ArrowLeft,
  CartIcon,
  CheckIcon,
  ChevronRight,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  RefreshIcon,
  ShieldIcon,
  StarIcon,
  TruckIcon,
} from "../components/Icons";

export function ProductDetail({ id }: { id: string }) {
  const { navigate, addToCart, toggleWishlist, isWishlisted } = useStore();
  const product = getProductById(id);

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0].name || "");
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<"description" | "details" | "shipping" | "reviews">("description");

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-stone-900">Product not found</h1>
        <p className="mt-3 text-stone-500">The product you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("shop")}
          className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const wished = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product.id, selectedSize, selectedColor, quantity);
    navigate("checkout");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-stone-500">
        <button onClick={() => navigate("home")} className="hover:text-amber-700">Home</button>
        <ChevronRight className="h-3 w-3" />
        <button onClick={() => navigate("shop")} className="hover:text-amber-700">Shop</button>
        <ChevronRight className="h-3 w-3" />
        <button
          onClick={() => navigate(`shop/${product.category}`)}
          className="hover:text-amber-700 capitalize"
        >
          {product.category}
        </button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-stone-700">{product.name}</span>
      </nav>

      <button
        onClick={() => navigate(`shop/${product.category}`)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-amber-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {product.category}
      </button>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-stone-100">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  New
                </span>
              )}
              {product.isBestseller && (
                <span className="rounded-full bg-amber-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Bestseller
                </span>
              )}
              {discount > 0 && (
                <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  -{discount}%
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`h-24 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                  activeImg === i ? "border-amber-600" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            {product.brand}
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(product.rating) ? "text-amber-500" : "text-stone-300"}`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-stone-700">{product.rating}</span>
            <span className="text-sm text-stone-400">·</span>
            <button
              onClick={() => setTab("reviews")}
              className="text-sm text-stone-500 underline-offset-2 hover:underline"
            >
              {product.reviews} reviews
            </button>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-stone-900">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-stone-400 line-through">${product.originalPrice}</span>
                <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
                  Save ${product.originalPrice - product.price}
                </span>
              </>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-stone-600">{product.description}</p>

          {/* Colors */}
          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                Color: <span className="font-normal text-stone-600">{selectedColor}</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`relative h-11 w-11 rounded-full border-2 transition-all ${
                    selectedColor === c.name
                      ? "border-amber-600 ring-2 ring-amber-200"
                      : "border-stone-300 hover:border-stone-500"
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {selectedColor === c.name && (
                    <CheckIcon className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                Size: <span className="font-normal text-stone-600">{selectedSize}</span>
              </span>
              <button className="text-xs text-amber-700 underline-offset-2 hover:underline">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`min-w-[52px] rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                    selectedSize === s
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-300 text-stone-700 hover:border-stone-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + actions */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-stone-300">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 items-center justify-center text-stone-600 hover:text-stone-900"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-12 w-12 items-center justify-center text-stone-600 hover:text-stone-900"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-stone-900 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-stone-800"
            >
              <CartIcon className="h-4 w-4" />
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all ${
                wished
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-stone-300 text-stone-600 hover:border-red-400 hover:text-red-500"
              }`}
            >
              <HeartIcon className="h-5 w-5" fill={wished ? "currentColor" : "none"} />
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="mt-3 w-full rounded-xl bg-amber-500 py-3.5 text-sm font-semibold uppercase tracking-wider text-stone-900 transition-all hover:bg-amber-400"
          >
            Buy It Now
          </button>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-stone-200 pt-6">
            {[
              { icon: TruckIcon, label: "Free Shipping" },
              { icon: RefreshIcon, label: "30-Day Returns" },
              { icon: ShieldIcon, label: "Secure Payment" },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-2 text-center">
                <b.icon className="h-6 w-6 text-amber-700" />
                <span className="text-[11px] font-medium text-stone-600">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex flex-wrap gap-1 border-b border-stone-200">
          {([
            ["description", "Description"],
            ["details", "Details & Care"],
            ["shipping", "Shipping & Returns"],
            ["reviews", `Reviews (${product.reviews})`],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative px-5 py-4 text-sm font-medium transition-colors ${
                tab === key ? "text-amber-700" : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {label}
              {tab === key && (
                <span className="absolute -bottom-px left-0 h-0.5 w-full bg-amber-700" />
              )}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === "description" && (
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-stone-600">
              <p>{product.description}</p>
              <p>
                Every {product.name} is crafted with meticulous attention to detail, using only the
                finest materials sourced from trusted suppliers around the world. Our commitment to
                quality ensures that each piece will be a cherished part of your wardrobe for years to come.
              </p>
              <ul className="space-y-2 pt-2">
                {["Premium materials", "Ethically made", "Designed in Paris", "Limited production run"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-emerald-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tab === "details" && (
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-stone-600">
              <div>
                <h4 className="font-semibold text-stone-900">Material & Care</h4>
                <ul className="mt-2 space-y-1">
                  <li>· Outer: {product.subcategory === "Footwear" ? "Full-grain leather" : "Premium fabric blend"}</li>
                  <li>· Lining: Soft-touch cotton blend</li>
                  <li>· Care: Dry clean only / Specialist clean</li>
                  <li>· Origin: Designed in Paris, ethically manufactured</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900">Product Details</h4>
                <ul className="mt-2 space-y-1">
                  <li>· Brand: {product.brand}</li>
                  <li>· Category: {product.subcategory}</li>
                  <li>· Available colors: {product.colors.map((c) => c.name).join(", ")}</li>
                  <li>· Available sizes: {product.sizes.join(", ")}</li>
                </ul>
              </div>
            </div>
          )}
          {tab === "shipping" && (
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-stone-600">
              <div>
                <h4 className="font-semibold text-stone-900">Shipping</h4>
                <p className="mt-2">
                  We offer free standard shipping on all orders over $150. Orders are processed within
                  24 hours and delivered within 3-5 business days. Express shipping (1-2 business days)
                  is available at checkout for an additional fee.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900">Returns</h4>
                <p className="mt-2">
                  We offer 30-day free returns on all unworn items with original tags attached.
                  Simply initiate a return from your account dashboard and print your prepaid label.
                  Refunds are processed within 5-7 business days of receiving your return.
                </p>
              </div>
            </div>
          )}
          {tab === "reviews" && (
            <div className="max-w-3xl">
              <div className="flex items-center gap-6 rounded-2xl bg-sand/40 p-6">
                <div className="text-center">
                  <div className="font-display text-5xl font-bold text-stone-900">{product.rating}</div>
                  <div className="mt-1 flex justify-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-3.5 w-3.5" />
                    ))}
                  </div>
                  <div className="mt-1 text-xs text-stone-500">{product.reviews} reviews</div>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="w-3 text-xs text-stone-500">{star}</span>
                      <StarIcon className="h-3 w-3 text-amber-500" />
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200">
                        <div
                          className="h-full rounded-full bg-amber-500"
                          style={{
                            width: `${star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : 1}%`,
                          }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs text-stone-500">
                        {star === 5 ? "78%" : star === 4 ? "15%" : star === 3 ? "5%" : "1%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-6">
                {[
                  {
                    name: "Emily R.",
                    rating: 5,
                    date: "2 weeks ago",
                    text: "Absolutely stunning piece! The quality is exceptional and the fit is perfect. Worth every penny.",
                  },
                  {
                    name: "James K.",
                    rating: 5,
                    date: "1 month ago",
                    text: "Better than expected. The material feels premium and the craftsmanship is top-notch. Highly recommend.",
                  },
                  {
                    name: "Sophie L.",
                    rating: 4,
                    date: "1 month ago",
                    text: "Beautiful design and great quality. Shipping was fast too. Only minor thing is sizing runs slightly small.",
                  },
                ].map((r) => (
                  <div key={r.name} className="border-b border-stone-200 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 font-bold text-white">
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-stone-900">{r.name}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5 text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`h-3 w-3 ${i < r.rating ? "text-amber-500" : "text-stone-300"}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-stone-400">{r.date}</span>
                          </div>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        Verified Purchase
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-8 font-display text-3xl font-bold text-stone-900">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
