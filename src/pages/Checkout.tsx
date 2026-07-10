import { useState } from "react";
import { products } from "../data/products";
import { useStore, type Order } from "../store/StoreContext";
import {
  ArrowLeft,
  ArrowRight,
  CheckIcon,
  ChevronRight,
  CreditCardIcon,
  LockIcon,
  ShieldIcon,
} from "../components/Icons";

type Step = 1 | 2 | 3;

export function Checkout() {
  const { cart, cartSubtotal, navigate, placeOrder, user, showToast } = useStore();
  const [step, setStep] = useState<Step>(1);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    apartment: "",
    city: "",
    zip: "",
    country: "France",
    phone: "",
  });
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "cod">("card");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = shippingMethod === "express" ? 25 : cartSubtotal >= 150 ? 0 : 12;
  const tax = Math.round(cartSubtotal * 0.08);
  const total = cartSubtotal + shipping + tax;

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

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-stone-900">Your cart is empty</h1>
        <p className="mt-3 text-stone-500">Add some items before checking out.</p>
        <button
          onClick={() => navigate("shop")}
          className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white"
        >
          Browse Products
        </button>
      </div>
    );
  }

  const validateShipping = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.zip.trim()) e.zip = "ZIP code is required";
    if (!/^[+\d\s()-]{7,}$/.test(form.phone)) e.phone = "Valid phone required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    if (paymentMethod !== "card") return true;
    const e: Record<string, string> = {};
    if (card.number.replace(/\s/g, "").length < 15) e.number = "Enter a valid card number";
    if (!card.name.trim()) e.name = "Cardholder name required";
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) e.expiry = "MM/YY format";
    if (!/^\d{3,4}$/.test(card.cvc)) e.cvc = "3-4 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !validateShipping()) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    if (step === 2 && !validatePayment()) {
      showToast("Please check your payment details", "error");
      return;
    }
    setStep((s) => Math.min(3, s + 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setStep((s) => Math.max(1, s - 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeOrderNow = () => {
    const orderId = "ELV" + Date.now().toString().slice(-8);
    const order: Order = {
      id: orderId,
      items: cartItems.map((i) => ({
        product: i.product,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
      })),
      subtotal: cartSubtotal,
      shipping,
      tax,
      total,
      customer: {
        name: form.name,
        email: form.email,
        address: `${form.address}${form.apartment ? ", " + form.apartment : ""}`,
        city: form.city,
        zip: form.zip,
        country: form.country,
        phone: form.phone,
      },
      payment: {
        method: paymentMethod === "card" ? "Credit Card" : paymentMethod === "paypal" ? "PayPal" : "Cash on Delivery",
        cardLast4: paymentMethod === "card" ? card.number.replace(/\s/g, "").slice(-4) : "N/A",
      },
      createdAt: new Date().toISOString(),
      status: "Processing",
    };
    placeOrder(order);
    navigate(`order/${orderId}`);
  };

  const formatCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };
  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const steps = [
    { num: 1, label: "Shipping" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Review" },
  ];

  const inputClass =
    "w-full rounded-lg border border-stone-300 px-4 py-3 text-sm outline-none transition-colors focus:border-amber-600 focus:ring-1 focus:ring-amber-200";
  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-xs text-stone-500">
        <button onClick={() => navigate("cart")} className="hover:text-amber-700">Cart</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-stone-700">Checkout</span>
      </nav>

      <h1 className="mb-8 font-display text-4xl font-bold text-stone-900">Checkout</h1>

      {/* Stepper */}
      <div className="mb-10 flex items-center justify-center">
        <div className="flex items-center gap-2 sm:gap-4">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    step > s.num
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : step === s.num
                      ? "border-amber-600 bg-amber-600 text-white"
                      : "border-stone-300 text-stone-400"
                  }`}
                >
                  {step > s.num ? <CheckIcon className="h-5 w-5" /> : s.num}
                </div>
                <span
                  className={`text-sm font-medium ${
                    step >= s.num ? "text-stone-900" : "text-stone-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 w-8 sm:w-16 ${step > s.num ? "bg-emerald-600" : "bg-stone-300"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="animate-fade space-y-6 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
              <div>
                <h2 className="font-display text-xl font-bold text-stone-900">Contact Information</h2>
                <p className="mt-1 text-sm text-stone-500">We'll use this to send you order updates.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className={errorClass}>{errors.name}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                    placeholder="+33 6 12 34 56 78"
                  />
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                </div>
              </div>

              <div className="pt-4">
                <h2 className="font-display text-xl font-bold text-stone-900">Shipping Address</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className={inputClass}
                    placeholder="123 Rue Saint-Honoré"
                  />
                  {errors.address && <p className={errorClass}>{errors.address}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    value={form.apartment}
                    onChange={(e) => setForm({ ...form, apartment: e.target.value })}
                    className={inputClass}
                    placeholder="Apt 4B"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    City *
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className={inputClass}
                    placeholder="Paris"
                  />
                  {errors.city && <p className={errorClass}>{errors.city}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className={inputClass}
                    placeholder="75001"
                  />
                  {errors.zip && <p className={errorClass}>{errors.zip}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Country
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className={inputClass}
                  >
                    {["France", "United Kingdom", "United States", "Germany", "Spain", "Italy", "Japan", "Canada", "Australia"].map(
                      (c) => (
                        <option key={c}>{c}</option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Shipping method */}
              <div className="pt-4">
                <h2 className="font-display text-xl font-bold text-stone-900">Delivery Method</h2>
                <div className="mt-4 space-y-3">
                  {[
                    { id: "standard", label: "Standard Shipping", desc: "3-5 business days", price: cartSubtotal >= 150 ? 0 : 12 },
                    { id: "express", label: "Express Shipping", desc: "1-2 business days", price: 25 },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setShippingMethod(m.id as "standard" | "express")}
                      className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                        shippingMethod === m.id
                          ? "border-amber-600 bg-amber-50"
                          : "border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                            shippingMethod === m.id ? "border-amber-600" : "border-stone-300"
                          }`}
                        >
                          {shippingMethod === m.id && (
                            <div className="h-2.5 w-2.5 rounded-full bg-amber-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-stone-900">{m.label}</p>
                          <p className="text-xs text-stone-500">{m.desc}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-stone-900">
                        {m.price === 0 ? "FREE" : `$${m.price}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => navigate("cart")}
                  className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-amber-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Cart
                </button>
                <button
                  onClick={next}
                  className="group flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-stone-800"
                >
                  Continue to Payment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="animate-fade space-y-6 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
              <div>
                <h2 className="font-display text-xl font-bold text-stone-900">Payment Method</h2>
                <p className="mt-1 text-sm text-stone-500">All transactions are secure and encrypted.</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, Amex", icon: CreditCardIcon },
                  { id: "paypal", label: "PayPal", desc: "Pay with your PayPal account", icon: null },
                  { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive", icon: null },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as "card" | "paypal" | "cod")}
                    className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                      paymentMethod === m.id
                        ? "border-amber-600 bg-amber-50"
                        : "border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          paymentMethod === m.id ? "border-amber-600" : "border-stone-300"
                        }`}
                      >
                        {paymentMethod === m.id && (
                          <div className="h-2.5 w-2.5 rounded-full bg-amber-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900">{m.label}</p>
                        <p className="text-xs text-stone-500">{m.desc}</p>
                      </div>
                    </div>
                    {m.icon && <m.icon className="h-6 w-6 text-stone-400" />}
                  </button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="animate-fade space-y-4 rounded-xl bg-stone-50 p-5">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <LockIcon className="h-4 w-4 text-emerald-600" />
                    Your payment information is encrypted with 256-bit SSL
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={card.number}
                        onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                        className={inputClass}
                        placeholder="1234 5678 9012 3456"
                      />
                      <CreditCardIcon className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                    </div>
                    {errors.number && <p className={errorClass}>{errors.number}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value })}
                      className={inputClass}
                      placeholder="JANE DOE"
                    />
                    {errors.name && <p className={errorClass}>{errors.name}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={card.expiry}
                        onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                        className={inputClass}
                        placeholder="MM/YY"
                      />
                      {errors.expiry && <p className={errorClass}>{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        CVC
                      </label>
                      <input
                        type="text"
                        value={card.cvc}
                        onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                        className={inputClass}
                        placeholder="123"
                      />
                      {errors.cvc && <p className={errorClass}>{errors.cvc}</p>}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="animate-fade rounded-xl bg-stone-50 p-5 text-sm text-stone-600">
                  You'll be redirected to PayPal to complete your purchase securely.
                </div>
              )}
              {paymentMethod === "cod" && (
                <div className="animate-fade rounded-xl bg-stone-50 p-5 text-sm text-stone-600">
                  Pay with cash when your order arrives. A small fee of $3 applies.
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={back}
                  className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-amber-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Shipping
                </button>
                <button
                  onClick={next}
                  className="group flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-stone-800"
                >
                  Review Order
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="animate-fade space-y-6 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
              <div>
                <h2 className="font-display text-xl font-bold text-stone-900">Review Your Order</h2>
                <p className="mt-1 text-sm text-stone-500">Please confirm everything looks correct.</p>
              </div>

              {/* Shipping summary */}
              <div className="rounded-xl border border-stone-200 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                    Shipping To
                  </h3>
                  <button onClick={() => setStep(1)} className="text-xs text-amber-700 hover:underline">
                    Edit
                  </button>
                </div>
                <div className="mt-3 text-sm text-stone-600">
                  <p className="font-semibold text-stone-900">{form.name}</p>
                  <p>{form.address}{form.apartment ? ", " + form.apartment : ""}</p>
                  <p>{form.city}, {form.zip}</p>
                  <p>{form.country}</p>
                  <p className="mt-1 text-stone-500">{form.email} · {form.phone}</p>
                </div>
                <div className="mt-3 border-t border-stone-200 pt-3 text-sm">
                  <span className="text-stone-500">Delivery: </span>
                  <span className="font-medium capitalize text-stone-900">{shippingMethod} Shipping</span>
                </div>
              </div>

              {/* Payment summary */}
              <div className="rounded-xl border border-stone-200 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                    Payment
                  </h3>
                  <button onClick={() => setStep(2)} className="text-xs text-amber-700 hover:underline">
                    Edit
                  </button>
                </div>
                <div className="mt-3 text-sm text-stone-600">
                  {paymentMethod === "card" ? (
                    <p>
                      Credit Card ending in <strong>{card.number.replace(/\s/g, "").slice(-4)}</strong>
                    </p>
                  ) : paymentMethod === "paypal" ? (
                    <p>PayPal</p>
                  ) : (
                    <p>Cash on Delivery</p>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="rounded-xl border border-stone-200 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                  Items ({cartItems.length})
                </h3>
                <div className="mt-4 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="flex gap-3"
                    >
                      <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-stone-900">{item.product.name}</p>
                          <p className="text-xs text-stone-500">
                            {item.color} · Size {item.size} · Qty {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-stone-900">
                          ${item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={back}
                  className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-amber-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Payment
                </button>
                <button
                  onClick={placeOrderNow}
                  className="group flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-emerald-700"
                >
                  <LockIcon className="h-4 w-4" />
                  Place Order — ${total}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="font-display text-xl font-bold text-stone-900">Order Summary</h2>
            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-3"
                >
                  <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="text-xs font-semibold text-stone-900">{item.product.name}</p>
                    <p className="text-[11px] text-stone-500">
                      {item.color} · {item.size}
                    </p>
                  </div>
                  <p className="self-center text-sm font-bold text-stone-900">
                    ${item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2 border-t border-stone-200 pt-4 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">${cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="font-medium text-stone-900">
                  {shipping === 0 ? "FREE" : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Tax</span>
                <span className="font-medium text-stone-900">${tax}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4">
              <span className="font-display text-lg font-bold text-stone-900">Total</span>
              <span className="font-display text-2xl font-bold text-stone-900">${total}</span>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
              <ShieldIcon className="h-4 w-4" />
              Secure SSL encrypted checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
