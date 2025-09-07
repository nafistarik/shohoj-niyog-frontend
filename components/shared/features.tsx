import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Users, Video } from "lucide-react";

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
          <Card className="border-sidebar-border hover:shadow-primary transition-all duration-300 hover:border-primary glass-effect animate-slide-in">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center mb-4 shadow-soft">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-heading text-foreground">
                Video Recording
              </CardTitle>
              <CardDescription className="text-muted-foreground font-body">
                Seamless video recording with automatic upload and processing
                for candidate responses.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-sidebar-border hover:shadow-primary transition-all duration-300 hover:border-primary glass-effect animate-slide-in">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center mb-4 shadow-soft">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-heading text-foreground">
                Role-Based Access
              </CardTitle>
              <CardDescription className="text-muted-foreground font-body">
                Separate dashboards for interviewers and candidates with
                tailored experiences.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-sidebar-border hover:shadow-primary transition-all duration-300 hover:border-primary glass-effect animate-slide-in">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center mb-4 shadow-soft">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-heading text-foreground">
                Secure & Private
              </CardTitle>
              <CardDescription className="text-muted-foreground font-body">
                Enterprise-grade security with encrypted video storage and GDPR
                compliance.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Features;
