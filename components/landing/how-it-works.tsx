import { CalendarDays, Search, Sparkles } from "lucide-react";
import BlurFade from "./blur-fade";

const steps = [
  {
    title: "Find your treatment",
    description: "Search by service, neighborhood, or the venue you already love.",
    icon: Search,
  },
  {
    title: "Pick a time",
    description: "See real availability and choose a slot that fits your day.",
    icon: CalendarDays,
  },
  {
    title: "Show up glowing",
    description: "Get reminders, pay securely, and enjoy the appointment.",
    icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full scroll-mt-28">
      <BlurFade>
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-themeVilot">
            Getting started
          </p>
          <h2 className="mt-2 text-3xl font-bold text-black md:text-4xl">
            Three steps to your next appointment
          </h2>
        </div>
      </BlurFade>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <BlurFade key={step.title} delay={index * 100}>
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-themeVilot">
                    0{index + 1}
                  </span>
                  <div className="rounded-2xl bg-gradient-to-tr from-themeBlue/10 to-themeVilot/10 p-3 text-themeVilot">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black">{step.title}</h3>
                <p className="mt-2 text-slate-600">{step.description}</p>
              </div>
            </BlurFade>
          );
        })}
      </div>
      <BlurFade delay={200} className="mt-10">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 -z-10 bg-landing-yoga bg-cover blur-[3px]" />
          <div className="bg-black/20 p-4 md:p-8">
            <iframe
              className="m-auto aspect-video w-full rounded-2xl hover-scale"
              src="https://www.youtube.com/embed/yFKRYzQ1ZRg"
              title="Busy Life? Book Beauty & Wellness in Seconds with Kimih!"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
