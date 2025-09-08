import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Video, Users, Shield } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Video Recording",
    description:
      "Seamless video recording with automatic upload and processing for candidate responses.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description:
      "Separate dashboards for interviewers and candidates with tailored experiences.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Enterprise-grade security with encrypted video storage and GDPR compliance.",
  },
];

type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={`animate-slide-in bg-white glass-effect ${className || ""}`}
    >
      <CardHeader>
        <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center mb-4 shadow-soft">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="font-heading text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground font-body">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function Features() {
  return (
    <section id="features" className="py-20 px-4 animate-fade-in">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Everything You Need for Better Hiring
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Powerful features designed to make your interview process more
            efficient and effective.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
