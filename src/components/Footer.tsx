import { useState } from "react";
import { useStore } from "../store/StoreContext";
import {
  FacebookIcon,
  HeadsetIcon,
  InstagramIcon,
  LeafIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  RefreshIcon,
  ShieldIcon,
  TruckIcon,
  TwitterIcon,
} from "./Icons";

export function Footer() {
  const { navigate, showToast } = useStore();
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      showToast("Please enter a valid email", "error");
      return;
    }
    showToast("Subscribed! Check your inbox for 10% off.");
    setEmail("");
  };

  return (
    <footer className="mt-24 bg-stone-900 text-cream">
      {/* Features strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { icon: TruckIcon, title: "Free Shipping", desc: "On orders over $150" },
            { icon: RefreshIcon, title: "30-Day Returns", desc: "Easy & free returns" },
            { icon: ShieldIcon, title: "Secure Payment", desc: "256-bit SSL encryption" },
            { icon: LeafIcon, title: "Sustainable", desc: "Ethically sourced materials" },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-2 text-center">
              <f.icon className="h-7 w-7 text-amber-400" />
              <h4 className="text-sm font-semibold">{f.title}</h4>
              <p className="text-xs text-cream/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        {/* Brand + newsletter */}
        <div className="lg:col-span-2">
          <button
            onClick={() => navigate("home")}
            className="font-display text-3xl font-bold tracking-[0.15em]"
          >
            AK Clothes
          </button>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
            Premium fashion house crafting timeless pieces for the modern individual.
            Designed in Paris, made ethically around the world.
          </p>
          <form onSubmit={subscribe} className="mt-6 max-w-sm">
            <label className="text-xs font-semibold uppercase tracking-wider text-cream/60">
              Join the AK Clothes list
            </label>
            <div className="mt-2 flex overflow-hidden rounded-full border border-white/20 bg-white/5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none"
              />
              <button
                type="submit"
                className="bg-amber-500 px-5 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-400"
              >
                Subscribe
              </button>
            </div>
            <p className="mt-2 text-[11px] text-cream/50">
              Get 10% off your first order. Unsubscribe anytime.
            </p>
          </form>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400">Shop</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
            {[
              { label: "New Arrivals", path: "shop" },
              { label: "Men", path: "shop/men" },
              { label: "Women", path: "shop/women" },
              { label: "Accessories", path: "shop/accessories" },
              { label: "Bestsellers", path: "shop" },
              { label: "Sale", path: "shop" },
            ].map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => navigate(l.path)}
                  className="transition-colors hover:text-amber-400"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
            {[
              { label: "About Us", path: "about" },
              { label: "Contact", path: "contact" },
              { label: "Careers", path: "about" },
              { label: "Sustainability", path: "about" },
              { label: "Press", path: "about" },
              { label: "My Account", path: "account" },
            ].map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => navigate(l.path)}
                  className="transition-colors hover:text-amber-400"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400">Get in Touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span>12 Rue Saint-Honoré, 75001 Paris, France</span>
            </li>
            <li className="flex items-center gap-2.5">
              <PhoneIcon className="h-4 w-4 shrink-0 text-amber-400" />
              <a href="tel:+33180001234" className="hover:text-amber-400">+33 1 80 00 12 34</a>
            </li>
            <li className="flex items-center gap-2.5">
              <MailIcon className="h-4 w-4 shrink-0 text-amber-400" />
              <a href="mailto:hello@eleve.com" className="hover:text-amber-400">hello@eleve.com</a>
            </li>
            <li className="flex items-center gap-2.5">
              <HeadsetIcon className="h-4 w-4 shrink-0 text-amber-400" />
              <span>24/7 Customer Support</span>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            {[InstagramIcon, FacebookIcon, TwitterIcon].map((Icon, i) => (
              <a
                key={i}
                href="#/contact"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-cream/70 transition-all hover:border-amber-400 hover:bg-amber-400 hover:text-stone-900"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-cream/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 AK Clothes by AnabiyaWear. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Shipping Info"].map((t) => (
              <button key={t} onClick={() => navigate("about")} className="hover:text-amber-400">
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {["VISA", "MC", "AMEX", "PAYPAL"].map((p) => (
              <span
                key={p}
                className="rounded bg-white/10 px-2 py-1 text-[9px] font-bold tracking-wider text-cream/70"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
