import { useStore } from "../store/StoreContext";
import {
  ArrowRight,
  ChevronRight,
  LeafIcon,
  ShieldIcon,
  SparkleIcon,
} from "../components/Icons";

export function About() {
  const { navigate } = useStore();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-900">
        <img
          src="https://images.pexels.com/photos/10619443/pexels-photo-10619443.jpeg?auto=compress&cs=tinysrgb&w=1600&q=80"
          alt="About ÉLÉVE"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-stone-900/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300">
              <SparkleIcon className="h-3.5 w-3.5" />
              Our Story
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-cream sm:text-6xl">
              Crafting Elegance
              <br />
              <span className="italic text-amber-400">Since 2018</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/80">
              ÉLÉVE was born from a simple belief: that clothing should be beautiful,
              sustainable, and made to last. We design timeless pieces that transcend trends.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
          Our Mission
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
          Fashion with a conscience
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-stone-600">
          We believe in slow fashion — pieces designed to be worn for years, not seasons.
          Every ÉLÉVE garment is crafted from responsibly sourced materials by skilled artisans
          who are paid fair wages. We're proving that luxury and sustainability can coexist.
        </p>
      </section>

      {/* Values */}
      <section className="bg-sand/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
              What We Stand For
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-stone-900">Our Values</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: LeafIcon,
                title: "Sustainability First",
                desc: "We use certified organic and recycled materials, and offset 100% of our carbon emissions. Our packaging is fully recyclable.",
              },
              {
                icon: ShieldIcon,
                title: "Ethical Production",
                desc: "Every piece is made in certified factories where workers are treated fairly and paid living wages. No exceptions.",
              },
              {
                icon: SparkleIcon,
                title: "Timeless Design",
                desc: "We design pieces that transcend trends — clothing you'll reach for year after year, season after season.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-stone-200 bg-white p-8 text-center transition-shadow hover:shadow-md"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                  <v.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-stone-900">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-stone-900 py-20 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { value: "250k+", label: "Happy Customers" },
              { value: "12k+", label: "5-Star Reviews" },
              { value: "48", label: "Countries Served" },
              { value: "100%", label: "Carbon Neutral" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-5xl font-bold text-amber-400">{s.value}</p>
                <p className="mt-2 text-sm text-cream/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Our Journey
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-stone-900">Milestones</h2>
        </div>
        <div className="space-y-8">
          {[
            { year: "2018", title: "The Beginning", desc: "ÉLÉVE founded in a small Paris atelier with a vision for sustainable luxury." },
            { year: "2020", title: "First Flagship", desc: "Opened our flagship store on Rue Saint-Honoré in the heart of Paris." },
            { year: "2022", title: "Going Global", desc: "Expanded to 30+ countries with our carbon-neutral shipping program." },
            { year: "2024", title: "100% Sustainable", desc: "Achieved full carbon neutrality and 100% recyclable packaging across all operations." },
            { year: "2026", title: "The Future", desc: "Launching our circular fashion program — take-back and repair services for every ÉLÉVE piece." },
          ].map((m, i) => (
            <div key={m.year} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-cream">
                  {m.year}
                </div>
                {i < 4 && <div className="mt-2 w-px flex-1 bg-stone-300" />}
              </div>
              <div className="pb-8">
                <h3 className="font-display text-xl font-bold text-stone-900">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 p-10 text-center sm:p-16">
          <SparkleIcon className="mx-auto h-10 w-10 text-white/80" />
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Join the ÉLÉVE Movement
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Become part of a community that values quality over quantity, people over profit,
            and timeless style over fleeting trends.
          </p>
          <button
            onClick={() => navigate("shop")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-stone-800"
          >
            Explore the Collection
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <nav className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <button onClick={() => navigate("home")} className="hover:text-amber-700">Home</button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-stone-700">About</span>
        </div>
      </nav>
    </div>
  );
}
