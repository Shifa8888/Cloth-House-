import { useState } from "react";
import { useStore } from "../store/StoreContext";
import {
  ArrowRight,
  LockIcon,
  MailIcon,
  ShieldIcon,
  SparkleIcon,
  UserIcon,
} from "../components/Icons";

export function Auth() {
  const { login, register, navigate, showToast } = useStore();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required";
    if (form.password.length < 6) errs.password = "Min 6 characters";
    if (mode === "register") {
      if (!form.name.trim()) errs.name = "Name required";
      if (form.password !== form.confirm) errs.confirm = "Passwords don't match";
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setTimeout(() => {
      const result =
        mode === "login"
          ? login(form.email, form.password)
          : register(form.name, form.email, form.password);
      setLoading(false);
      if (!result.ok) {
        setErrors({ form: result.message });
        showToast(result.message, "error");
      } else {
        navigate("account");
      }
    }, 600);
  };

  const fillDemo = () => {
    setForm({
      name: "",
      email: "demo@eleve.com",
      password: "demo1234",
      confirm: "demo1234",
    });
    setMode("login");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm lg:grid-cols-2">
        {/* Left side - branding */}
        <div className="relative hidden bg-stone-900 p-10 lg:flex lg:flex-col lg:justify-between">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/9594680/pexels-photo-9594680.jpeg?auto=compress&cs=tinysrgb&w=800&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-900/80 to-stone-900/95" />
          <div className="relative">
            <button
              onClick={() => navigate("home")}
              className="font-display text-3xl font-bold tracking-[0.15em] text-cream"
            >
              ÉLÉVE
            </button>
          </div>
          <div className="relative text-cream">
            <SparkleIcon className="h-8 w-8 text-amber-400" />
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight">
              Join the world of <span className="italic text-amber-400">ÉLÉVE</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/80">
              Create an account to enjoy faster checkout, track your orders, save your
              favorites, and get exclusive access to new collections and members-only offers.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Exclusive members-only discounts",
                "Faster checkout with saved details",
                "Track orders and view history",
                "Early access to new collections",
              ].map((b) => (
                <div key={b} className="flex items-center gap-3 text-sm text-cream/90">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
                    ✓
                  </div>
                  {b}
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex items-center gap-3 text-xs text-cream/60">
            <ShieldIcon className="h-4 w-4 text-amber-400" />
            Your data is protected with industry-leading security
          </div>
        </div>

        {/* Right side - form */}
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-stone-900">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              {mode === "login"
                ? "Sign in to your ÉLÉVE account"
                : "Join ÉLÉVE in just a few seconds"}
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex rounded-full bg-stone-100 p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-all ${
                mode === "login" ? "bg-stone-900 text-white" : "text-stone-500"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-all ${
                mode === "register" ? "bg-stone-900 text-white" : "text-stone-500"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-stone-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-200"
                    placeholder="Jane Doe"
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Email Address
              </label>
              <div className="relative">
                <MailIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-stone-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-200"
                  placeholder="jane@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-lg border border-stone-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-200"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            {mode === "register" && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    className="w-full rounded-lg border border-stone-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-200"
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirm && <p className="mt-1 text-xs text-red-500">{errors.confirm}</p>}
              </div>
            )}

            {errors.form && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{errors.form}</div>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-stone-600">
                  <input type="checkbox" className="rounded border-stone-300 text-amber-600" />
                  Remember me
                </label>
                <button type="button" className="text-sm text-amber-700 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-stone-800 disabled:opacity-70"
            >
              {loading ? (
                <span>Please wait...</span>
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-stone-400">
            <div className="h-px flex-1 bg-stone-200" />
            OR
            <div className="h-px flex-1 bg-stone-200" />
          </div>

          <button
            onClick={fillDemo}
            className="w-full rounded-full border border-stone-300 py-3.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
          >
            Continue as Demo User
          </button>
          <p className="mt-2 text-center text-[11px] text-stone-400">
            Demo: demo@eleve.com / demo1234
          </p>

          <p className="mt-6 text-center text-xs text-stone-400">
            By continuing, you agree to ÉLÉVE's{" "}
            <button onClick={() => navigate("about")} className="underline hover:text-amber-700">
              Terms of Service
            </button>{" "}
            and{" "}
            <button onClick={() => navigate("about")} className="underline hover:text-amber-700">
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
