"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { useOnScreen } from "@/hooks/use-on-screen";

export default function Stats() {
  const [ref, isVisible] = useOnScreen<HTMLDivElement>();

  const users = useCountUp(500, 2000, true, isVisible);
  const projects = useCountUp(120, 2000, true, isVisible);
  const awards = useCountUp(15, 2000, true, isVisible);

  return (
    <section ref={ref} className="py-20 px-4 bg-secondary/30 text-center">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-12">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
          <div className="p-6 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 shadow-soft animate-fade-in">
            <p className="text-5xl font-extrabold text-primary mb-2">{users}</p>
            <p className="text-muted-foreground font-medium">Active Users</p>
          </div>
          <div className="p-6 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 shadow-soft animate-fade-in">
            <p className="text-5xl font-extrabold text-primary mb-2">
              {projects}
            </p>
            <p className="text-muted-foreground font-medium">Projects</p>
          </div>
          <div className="p-6 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 shadow-soft animate-fade-in">
            <p className="text-5xl font-extrabold text-primary mb-2">
              {awards}
            </p>
            <p className="text-muted-foreground font-medium">Awards</p>
          </div>
        </div>
      </div>
    </section>
  );
}
