import { useStore } from "../store/StoreContext";
import {
  ArrowRight,
  CheckIcon,
  ChevronRight,
  MailIcon,
  TruckIcon,
} from "../components/Icons";

export function OrderConfirmation({ id }: { id: string }) {
  const { getOrder, navigate } = useStore();
  const order = getOrder(id);

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-stone-900">Order not found</h1>
        <p className="mt-3 text-stone-500">We couldn't find this order.</p>
        <button
          onClick={() => navigate("home")}
          className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt);
  const deliveryDate = new Date(order.createdAt);
  deliveryDate.setDate(deliveryDate.getDate() + 4);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Success header */}
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 animate-scale">
          <CheckIcon className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold text-stone-900 sm:text-5xl">
          Thank You for Your Order!
        </h1>
        <p className="mt-3 text-stone-600">
          Your order has been placed successfully. We've sent a confirmation email to{" "}
          <strong className="text-stone-900">{order.customer.email}</strong>
        </p>
      </div>

      {/* Order info card */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Order Number</p>
          <p className="mt-2 font-display text-xl font-bold text-stone-900">{order.id}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Order Date</p>
          <p className="mt-2 font-display text-xl font-bold text-stone-900">
            {orderDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Est. Delivery</p>
          <p className="mt-2 font-display text-xl font-bold text-stone-900">
            {deliveryDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* Tracking steps */}
      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="font-display text-xl font-bold text-stone-900">Order Status</h2>
        <div className="mt-6 flex items-center justify-between">
          {[
            { label: "Order Placed", icon: CheckIcon, active: true },
            { label: "Processing", icon: TruckIcon, active: true },
            { label: "Shipped", icon: TruckIcon, active: false },
            { label: "Delivered", icon: CheckIcon, active: false },
          ].map((step, i) => (
            <div key={step.label} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {i > 0 && (
                  <div className={`h-0.5 flex-1 ${step.active ? "bg-emerald-600" : "bg-stone-200"}`} />
                )}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    step.active
                      ? "bg-emerald-600 text-white"
                      : "bg-stone-100 text-stone-400"
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                {i < 3 && (
                  <div className={`h-0.5 flex-1 ${i < 1 ? "bg-emerald-600" : "bg-stone-200"}`} />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step.active ? "text-stone-900" : "text-stone-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Items */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="font-display text-xl font-bold text-stone-900">Items Ordered</h2>
          <div className="mt-4 space-y-4">
            {order.items.map((item, i) => (
              <div
                key={`${item.product.id}-${i}`}
                className="flex gap-3 border-b border-stone-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-stone-500">
                    {item.product.brand}
                  </span>
                  <p className="text-sm font-semibold text-stone-900">{item.product.name}</p>
                  <p className="mt-1 text-xs text-stone-500">
                    {item.color} · Size {item.size} · Qty {item.quantity}
                  </p>
                  <p className="mt-1 text-sm font-bold text-stone-900">
                    ${item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping + Payment */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="font-display text-xl font-bold text-stone-900">Shipping Address</h2>
            <div className="mt-4 text-sm text-stone-600">
              <p className="font-semibold text-stone-900">{order.customer.name}</p>
              <p>{order.customer.address}</p>
              <p>{order.customer.city}, {order.customer.zip}</p>
              <p>{order.customer.country}</p>
              <p className="mt-2 text-stone-500">{order.customer.phone}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="font-display text-xl font-bold text-stone-900">Payment Method</h2>
            <div className="mt-4 text-sm text-stone-600">
              <p>
                <span className="font-medium text-stone-900">{order.payment.method}</span>
              </p>
              {order.payment.cardLast4 !== "N/A" && (
                <p>Card ending in {order.payment.cardLast4}</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="font-display text-xl font-bold text-stone-900">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">${order.subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="font-medium text-stone-900">
                  {order.shipping === 0 ? "FREE" : `$${order.shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Tax</span>
                <span className="font-medium text-stone-900">${order.tax}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-3">
                <span className="font-display text-lg font-bold text-stone-900">Total Paid</span>
                <span className="font-display text-2xl font-bold text-stone-900">${order.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help bar */}
      <div className="mt-8 flex items-center gap-3 rounded-2xl bg-amber-50 p-5 text-sm">
        <MailIcon className="h-5 w-5 shrink-0 text-amber-700" />
        <p className="text-stone-700">
          A confirmation email has been sent. Need help?{" "}
          <button onClick={() => navigate("contact")} className="font-semibold text-amber-700 underline-offset-2 hover:underline">
            Contact our support team
          </button>
        </p>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <button
          onClick={() => navigate("shop")}
          className="group flex items-center gap-2 rounded-full bg-stone-900 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white hover:bg-stone-800"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        <button
          onClick={() => navigate("account")}
          className="rounded-full border border-stone-300 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-stone-700 hover:bg-stone-50"
        >
          View My Orders
        </button>
      </div>

      <nav className="mt-8 flex items-center justify-center gap-2 text-xs text-stone-500">
        <button onClick={() => navigate("home")} className="hover:text-amber-700">Home</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-stone-700">Order Confirmation</span>
      </nav>
    </div>
  );
}
