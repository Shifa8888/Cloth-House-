import { useState } from "react";
import { useStore } from "../store/StoreContext";
import {
  ArrowRight,
  ChevronRight,
  HeadsetIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SparkleIcon,
} from "../components/Icons";

export function Contact() {
  const { navigate, showToast } = useStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || !form.message.trim()) {
      showToast("Please fill in all fields correctly", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", subject: "General Inquiry", message: "" });
    }, 800);
  };

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: "Visit Us",
      lines: ["12 Rue Saint-Honoré", "75001 Paris, France"],
    },
    {
      icon: PhoneIcon,
      title: "Call Us",
      lines: ["+33 1 80 00 12 34", "Mon-Fri, 9am-6pm CET"],
    },
    {
      icon: MailIcon,
      title: "Email Us",
      lines: ["hello@eleve.com", "support@eleve.com"],
    },
    {
      icon: HeadsetIcon,
      title: "Live Chat",
      lines: ["Available 24/7", "Avg response: 2 min"],
    },
  ];

  const faqs = [
    {
      q: "What is your shipping policy?",
      a: "We offer free standard shipping on orders over $150. Standard delivery takes 3-5 business days. Express shipping (1-2 days) is available at checkout.",
    },
    {
      q: "How do I return an item?",
      a: "We offer 30-day free returns on unworn items with tags attached. Initiate a return from your account dashboard and print your prepaid label.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes! We ship to 48+ countries worldwide. International shipping rates and delivery times vary by location.",
    },
    {
      q: "How can I track my order?",
      a: "Once your order ships, you'll receive a tracking number via email. You can also track your order from your account dashboard.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. Cash on delivery is available in select regions.",
    },
    {
      q: "Are your products sustainable?",
      a: "Yes! We use certified organic and recycled materials, and offset 100% of our carbon emissions. All packaging is fully recyclable.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-xs text-stone-500">
        <button onClick={() => navigate("home")} className="hover:text-amber-700">Home</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-stone-700">Contact</span>
      </nav>

      {/* Header */}
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
          We're Here to Help
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-stone-900 sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-stone-600">
          Have a question, comment, or just want to say hello? We'd love to hear from you.
          Our team typically responds within 24 hours.
        </p>
      </div>

      {/* Contact info cards */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {contactInfo.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-stone-200 bg-white p-6 text-center transition-shadow hover:shadow-md"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
              <c.icon className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-stone-900">{c.title}</h3>
            {c.lines.map((l) => (
              <p key={l} className="mt-1 text-sm text-stone-500">{l}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Form + Map */}
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Form */}
        <div className="rounded-3xl border border-stone-200 bg-white p-8">
          <h2 className="font-display text-2xl font-bold text-stone-900">Send us a Message</h2>
          <p className="mt-1 text-sm text-stone-500">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-200"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Your Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-200"
                  placeholder="jane@example.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Subject
              </label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-600"
              >
                {[
                  "General Inquiry",
                  "Order Support",
                  "Product Question",
                  "Returns & Exchanges",
                  "Wholesale Inquiry",
                  "Press & Media",
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Message *
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-lg border border-stone-300 px-4 py-3 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-200"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-stone-800 disabled:opacity-70"
            >
              {loading ? "Sending..." : (
                <>
                  Send Message
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Map / Location */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-stone-200">
            <iframe
              title="ÉLÉVE Paris Store"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.335%2C48.860%2C2.345%2C48.865&layer=mapnik"
              className="h-72 w-full border-0"
              loading="lazy"
            />
          </div>
          <div className="rounded-3xl bg-stone-900 p-8 text-cream">
            <div className="flex items-center gap-2">
              <SparkleIcon className="h-5 w-5 text-amber-400" />
              <h3 className="font-display text-xl font-bold">Flagship Store</h3>
            </div>
            <div className="mt-4 space-y-3 text-sm text-cream/80">
              <p>12 Rue Saint-Honoré, 75001 Paris</p>
              <p>Mon-Sat: 10am - 8pm</p>
              <p>Sun: 11am - 6pm</p>
            </div>
            <button
              onClick={() => showToast("Booking feature coming soon!", "info")}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-stone-900 transition-colors hover:bg-amber-400"
            >
              Book a Personal Stylist
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-20">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Quick Answers
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-stone-900">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-stone-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-stone-900">
                {f.q}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
