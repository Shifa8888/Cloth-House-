import { useState } from "react";
import { products } from "../data/products";
import { useStore } from "../store/StoreContext";
import {
  ArrowRight,
  CartIcon,
  ChevronRight,
  MinusIcon,
  PlusIcon,
  RefreshIcon,
  ShieldIcon,
  TrashIcon,
  TruckIcon,
} from "../components/Icons";

export function Cart() {
  const { cart, updateCartQty, removeFromCart, cartSubtotal, navigate } = useStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const shipping = cartSubtotal >= 150 || cartSubtotal === 0 ? 0 : 12;
  const discount = promoApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const tax = Math.round((cartSubtotal - discount) * 0.08);
  const total = cartSubtotal - discount + shipping + tax;

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean) as {
    productId: string;
    size: string;
    color: string;
    quantity: number;
    product: (typeof products)[number];
  }[];

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "WELCOME10") {
      setPromoApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-stone-100">
          <CartIcon className="h-10 w-10 text-stone-400" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-stone-900">Your cart is empty</h1>
        <p className="mt-3 text-stone-500">
          Looks like you haven't added anything yet. Let's fix that.
        </p>
        <button
          onClick={() => navigate("shop")}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white hover:bg-stone-800"
        >
          Start Shopping
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-xs text-stone-500">
        <button onClick={() => navigate("home")} className="hover:text-amber-700">Home</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-stone-700">Shopping Cart</span>
      </nav>

      <h1 className="mb-8 font-display text-4xl font-bold text-stone-900">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
            {cartItems.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 p-5">
                <button
                  onClick={() => navigate(`product/${item.productId}`)}
                  className="h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-stone-100"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </button>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-medium uppercase tracking-wider text-stone-500">
                        {item.product.brand}
                      </span>
                      <h3
                        className="cursor-pointer font-semibold text-stone-900 hover:text-amber-700"
                        onClick={() => navigate(`product/${item.productId}`)}
                      >
                        {item.product.name}
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-stone-500">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size, item.color)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div className="flex items-center rounded-lg border border-stone-300">
                      <button
                        onClick={() =>
                          updateCartQty(item.productId, item.size, item.color, item.quantity - 1)
                        }
                        className="flex h-9 w-9 items-center justify-center text-stone-600 hover:text-stone-900"
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQty(item.productId, item.size, item.color, item.quantity + 1)
                        }
                        className="flex h-9 w-9 items-center justify-center text-stone-600 hover:text-stone-900"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-stone-900">
                        ${item.product.price * item.quantity}
                      </div>
                      {item.product.originalPrice && (
                        <div className="text-xs text-stone-400 line-through">
                          ${item.product.originalPrice * item.quantity}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => navigate("shop")}
              className="text-sm font-medium text-stone-600 hover:text-amber-700"
            >
              ← Continue Shopping
            </button>
            <button
              onClick={() => navigate("cart")}
              className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-amber-700"
            >
              <RefreshIcon className="h-4 w-4" />
              Update Cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-5 rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="font-display text-xl font-bold text-stone-900">Order Summary</h2>

            {/* Promo */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Promo Code
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="WELCOME10"
                  disabled={promoApplied}
                  className="flex-1 rounded-lg border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-amber-600 disabled:bg-stone-50"
                />
                <button
                  onClick={applyPromo}
                  disabled={promoApplied || !promoCode}
                  className="rounded-lg bg-stone-900 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-stone-800 disabled:opacity-50"
                >
                  {promoApplied ? "Applied" : "Apply"}
                </button>
              </div>
              {promoApplied && (
                <p className="mt-2 text-xs text-emerald-600">✓ 10% discount applied!</p>
              )}
              <p className="mt-1 text-[11px] text-stone-400">Try code: WELCOME10</p>
            </div>

            <div className="space-y-3 border-t border-stone-200 pt-5 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-medium text-stone-900">${cartSubtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount (10%)</span>
                  <span className="font-medium">-${discount}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="font-medium text-stone-900">
                  {shipping === 0 ? "FREE" : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Tax (8%)</span>
                <span className="font-medium text-stone-900">${tax}</span>
              </div>
              {shipping > 0 && (
                <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  Add ${150 - cartSubtotal} more for free shipping!
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-stone-200 pt-5">
              <span className="font-display text-lg font-bold text-stone-900">Total</span>
              <span className="font-display text-2xl font-bold text-stone-900">${total}</span>
            </div>

            <button
              onClick={() => navigate("checkout")}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-stone-800"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { icon: TruckIcon, label: "Fast Delivery" },
                { icon: RefreshIcon, label: "Easy Returns" },
                { icon: ShieldIcon, label: "Secure Pay" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1.5 text-center">
                  <b.icon className="h-5 w-5 text-amber-700" />
                  <span className="text-[10px] font-medium text-stone-500">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
