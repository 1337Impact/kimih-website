import { CalendarCheck, MapPin, ShieldCheck, Sparkles, Wallet, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurFade from "./blur-fade";
import NumberTicker from "./number-ticker";

const features = [
  {
    title: "Book in seconds",
    description:
      "Pick a treatment, time, and specialist. Confirm instantly — no phone tag, no waiting rooms.",
    icon: Zap,
    className: "md:col-span-2 md:row-span-2",
    accent: "from-themeBlue/10 to-themeVilot/10",
  },
  {
    title: "Local & trusted",
    description: "Top-rated salons and clinics across the UAE.",
    icon: MapPin,
    className: "md:col-span-1",
    accent: "from-sky-50 to-white",
  },
  {
    title: "No subscriptions",
    description: "Businesses grow without monthly software fees.",
    icon: Wallet,
    className: "md:col-span-1",
    accent: "from-fuchsia-50 to-white",
  },
  {
    title: "Secure payments",
    description: "Protected checkout with local payment methods.",
    icon: ShieldCheck,
    className: "md:col-span-1",
    accent: "from-indigo-50 to-white",
  },
  {
    title: "Always on",
    description: "Browse and book whenever it suits you.",
    icon: CalendarCheck,
    className: "md:col-span-1",
    accent: "from-violet-50 to-white",
  },
];

export default function FeatureBento() {
  return (
    <section id="why-kimih" className="w-full">
      <BlurFade>
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-themeVilot">
            Why Kimih
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-black md:text-4xl">
            Self-care that fits a busy city
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            The first beauty and wellness booking platform built for the Middle
            East — designed to feel as polished as the services you book.
          </p>
        </div>
      </BlurFade>
      <div className="grid auto-rows-[minmax(160px,auto)] gap-4 md:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <BlurFade key={feature.title} delay={index * 80}>
              <article
                className={cn(
                  "group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl",
                  feature.accent,
                  feature.className
                )}
              >
                <div className="mb-4 inline-flex rounded-2xl bg-white p-3 text-themeVilot shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-black">{feature.title}</h3>
                <p className="mt-2 text-slate-600">{feature.description}</p>
                {index === 0 && (
                  <div className="mt-8 flex flex-wrap gap-6">
                    <div>
                      <p className="text-4xl font-extrabold text-black">
                        <NumberTicker value={10} suffix="k+" />
                      </p>
                      <p className="text-sm text-slate-500">Appointments booked</p>
                    </div>
                    <div>
                      <p className="text-4xl font-extrabold text-black">
                        <NumberTicker value={200} suffix="+" />
                      </p>
                      <p className="text-sm text-slate-500">Partner venues</p>
                    </div>
                  </div>
                )}
                <Sparkles className="absolute -right-3 -top-3 h-16 w-16 text-themeVilot/10 transition group-hover:rotate-12" />
              </article>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
