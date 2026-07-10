import { useStore } from "../store/StoreContext";
import { products, categories } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import {
  ArrowRight,
  LeafIcon,
  ShieldIcon,
  SparkleIcon,
  StarIcon,
  TruckIcon,
} from "../components/Icons";

export function Home() {
  const { navigate } = useStore();
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/9594680/pexels-photo-9594680.jpeg?auto=compress&cs=tinysrgb&w=1600&q=80"
            alt="ÉLÉVE Collection"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300">
              <SparkleIcon className="h-3.5 w-3.5" />
              Autumn / Winter 2026
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
              Where Elegance
              <br />
              <span className="italic text-amber-400">Becomes You</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg">
              Discover timeless pieces crafted from the world's finest materials.
              Designed in Paris, made to be lived in.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate("shop/women")}
                className="group flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-sm font-semibold uppercase tracking-wider text-stone-900 transition-all hover:bg-amber-400"
              >
                Shop Women
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate("shop/men")}
                className="rounded-full border border-cream/40 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:bg-cream/10"
              >
                Shop Men
              </button>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-6 text-cream/70">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs">4.9/5 from 12k+ reviews</span>
              </div>
              <div className="h-8 w-px bg-cream/20" />
              <span className="text-xs">Trusted by 250,000+ customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Explore
          </span>
          <h2 className="mt-2 font-display text-4xl font-bold text-stone-900 sm:text-5xl">
            Shop by Category
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => navigate(`shop/${cat.id}`)}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <h3 className="font-display text-3xl font-bold text-cream">{cat.name}</h3>
                <p className="mt-1 text-sm text-cream/80">{cat.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Discover
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-sand/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
                Loved by Many
              </span>
              <h2 className="mt-2 font-display text-4xl font-bold text-stone-900 sm:text-5xl">
                Bestsellers
              </h2>
            </div>
            <button
              onClick={() => navigate("shop")}
              className="group flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-amber-700"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial banner */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="https://images.pexels.com/photos/8346261/pexels-photo-8346261.jpeg?auto=compress&cs=tinysrgb&w=900&q=80"
              alt="Editorial"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-cream">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                The Edit
              </span>
              <h3 className="mt-2 font-display text-3xl font-bold">The Cozy Edit</h3>
              <p className="mt-2 text-sm text-cream/80">
                Layer up in luxurious knits and plush textures for the season ahead.
              </p>
              <button
                onClick={() => navigate("shop/women")}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cream underline-offset-4 hover:underline"
              >
                Shop the Edit <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="https://images.pexels.com/photos/16069733/pexels-photo-16069733.jpeg?auto=compress&cs=tinysrgb&w=900&q=80"
              alt="Editorial"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-cream">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                Menswear
              </span>
              <h3 className="mt-2 font-display text-3xl font-bold">Modern Tailoring</h3>
              <p className="mt-2 text-sm text-cream/80">
                Sharp silhouettes and refined fabrics for the contemporary gentleman.
              </p>
              <button
                onClick={() => navigate("shop/men")}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cream underline-offset-4 hover:underline"
              >
                Shop Menswear <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
              Just Landed
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold text-stone-900 sm:text-5xl">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => navigate("shop")}
            className="group flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-amber-700"
          >
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Brand values */}
      <section className="bg-stone-900 py-20 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                icon: LeafIcon,
                title: "Sustainably Sourced",
                desc: "Certified materials and ethical manufacturing at every step of our supply chain.",
              },
              {
                icon: ShieldIcon,
                title: "Crafted to Last",
                desc: "Each piece is designed for longevity, with reinforced construction and premium fabrics.",
              },
              {
                icon: TruckIcon,
                title: "Carbon Neutral Delivery",
                desc: "Every order ships carbon-neutral in recyclable packaging, at no extra cost.",
              },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400">
                  <v.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Word of Mouth
          </span>
          <h2 className="mt-2 font-display text-4xl font-bold text-stone-900 sm:text-5xl">
            What They Say
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "The cashmere overcoat is the finest piece in my wardrobe. The cut, the weight, the drape — absolute perfection.",
              name: "Isabelle Laurent",
              role: "Fashion Editor, Vogue Paris",
            },
            {
              quote:
                "ÉLÉVE has redefined what premium means. Every piece feels considered, intentional, and built to last for years.",
              name: "Marcus Chen",
              role: "Creative Director",
            },
            {
              quote:
                "From ordering to delivery, the experience was flawless. The packaging alone made me feel like I'd received a gift.",
              name: "Sofia Reyes",
              role: "Loyal Customer since 2022",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-4 font-display text-lg italic leading-relaxed text-stone-700">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 font-display text-lg font-bold text-white">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{t.name}</p>
                  <p className="text-xs text-stone-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
