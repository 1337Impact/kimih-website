import {
  Scissors,
  Sparkles,
  Flower2,
  Dumbbell,
  Smile,
  Hand,
  Brush,
  Heart,
} from "lucide-react";
import Marquee from "./marquee";

const categories = [
  { name: "Hair", icon: Scissors },
  { name: "Spa", icon: Flower2 },
  { name: "Nails", icon: Sparkles },
  { name: "Makeup", icon: Brush },
  { name: "Fitness", icon: Dumbbell },
  { name: "Massage", icon: Hand },
  { name: "Dental", icon: Smile },
  { name: "Wellness", icon: Heart },
];

export default function CategoryMarquee() {
  return (
    <section
      id="categories"
      className="relative w-full overflow-hidden py-6"
      aria-label="Popular treatments"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
      <Marquee className="[--duration:32s]">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.name}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
            >
              <Icon className="h-4 w-4 text-themeVilot" />
              {category.name}
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}
