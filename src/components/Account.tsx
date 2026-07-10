import { useStore } from "../store/StoreContext";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import {
  ArrowRight,
  ChevronRight,
  HeartIcon,
  LockIcon,
  LogOut,
  MailIcon,
  PackageIcon,
  TruckIcon,
  UserIcon,
} from "./Icons";

export function Account() {
  const { user, orders, logout, navigate } = useStore();

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-stone-100">
          <UserIcon className="h-9 w-9 text-stone-400" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-stone-900">Not Signed In</h1>
        <p className="mt-3 text-stone-500">
          Please sign in to view your account details and order history.
        </p>
        <button
          onClick={() => navigate("auth")}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-stone-800"
        >
          Sign In
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
        <span className="text-stone-700">My Account</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 font-display text-2xl font-bold text-white">
            {user.name[0]}
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-stone-900">
              Hi, {user.name.split(" ")[0]}!
            </h1>
            <p className="text-sm text-stone-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Orders", value: orders.length, icon: PackageIcon },
          {
            label: "Items Ordered",
            value: orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0),
            icon: TruckIcon,
          },
          {
            label: "Total Spent",
            value: `$${orders.reduce((sum, o) => sum + o.total, 0)}`,
            icon: LockIcon,
          },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <s.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">{s.label}</p>
              <p className="font-display text-2xl font-bold text-stone-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Order history */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="font-display text-xl font-bold text-stone-900">Order History</h2>
            {orders.length === 0 ? (
              <div className="py-12 text-center">
                <PackageIcon className="mx-auto h-12 w-12 text-stone-300" />
                <p className="mt-3 text-sm text-stone-500">You haven't placed any orders yet.</p>
                <button
                  onClick={() => navigate("shop")}
                  className="mt-4 rounded-full bg-stone-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border border-stone-200 p-5 transition-shadow hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 pb-3">
                      <div>
                        <p className="font-semibold text-stone-900">Order #{order.id}</p>
                        <p className="text-xs text-stone-500">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                        {order.status}
                      </span>
                    </div>
                    <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                      {order.items.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => navigate(`product/${item.product.id}`)}
                          className="h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-stone-100"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                      <div className="flex flex-col justify-center text-xs text-stone-500">
                        <p>
                          {order.items.reduce((s, i) => s + i.quantity, 0)} items · ${order.total}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm text-stone-600">
                        {order.items.length} {order.items.length === 1 ? "product" : "products"} ·{" "}
                        <span className="font-bold text-stone-900">${order.total}</span>
                      </p>
                      <button
                        onClick={() => navigate(`order/${order.id}`)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:underline"
                      >
                        View Details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="font-display text-xl font-bold text-stone-900">Account Details</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-stone-600">
                <UserIcon className="h-4 w-4 text-amber-700" />
                <span>{user.name}</span>
              </div>
              <div className="flex items-center gap-3 text-stone-600">
                <MailIcon className="h-4 w-4 text-amber-700" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-stone-600">
                <LockIcon className="h-4 w-4 text-amber-700" />
                <span>••••••••</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("wishlist")}
            className="flex w-full items-center justify-between rounded-2xl border border-stone-200 bg-white p-5 text-left transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
                <HeartIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900">My Wishlist</p>
                <p className="text-xs text-stone-500">View saved items</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-stone-400" />
          </button>

          <button
            onClick={() => navigate("shop")}
            className="flex w-full items-center justify-between rounded-2xl border border-stone-200 bg-white p-5 text-left transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                <PackageIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900">Continue Shopping</p>
                <p className="text-xs text-stone-500">Browse new arrivals</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-stone-400" />
          </button>
        </div>
      </div>

      {/* Recommended */}
      {orders.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-stone-900">Recommended for You</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
