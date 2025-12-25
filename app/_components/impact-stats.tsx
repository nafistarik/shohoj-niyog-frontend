"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { useOnScreen } from "@/hooks/use-on-screen";

const stats = [
  { start: 500, end: 2000, duration: 2000, label: "Active Users" },
  { start: 120, end: 2000, duration: 2000, label: "Projects" },
  { start: 15, end: 2000, duration: 2000, label: "Awards" },
];

type ImpactCardProps = {
  start: number;
  end: number;
  duration: number;
  isVisible: boolean;
  label: string;
};

export function ImpactCard({ start, end, isVisible, label }: ImpactCardProps) {
  const value = useCountUp(start, end, true, isVisible);

  return (
    <div className="p-6 rounded-lg bg-white glass-effect shadow-soft animate-fade-in space-y-2">
      <p className="text-5xl font-extrabold text-primary">{value}</p>
      <p className="text-muted-foreground font-medium">{label}</p>
    </div>
  );
}

export default function ImpactStats() {
  const [ref, isVisible] = useOnScreen<HTMLDivElement>();

  return (
    <section ref={ref} className="py-20 px-4 text-center">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-12">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
          {stats.map((stat, index) => (
            <ImpactCard
              key={index}
              start={stat.start}
              end={stat.end}
              duration={stat.duration}
              isVisible={isVisible}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
