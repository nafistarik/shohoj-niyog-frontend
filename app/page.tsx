import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, Video, Shield, ArrowRight, Star, ChevronRight } from "lucide-react"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">Shohoj Niyog</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">
              Testimonials
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
              FAQ
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10"></div>
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Star className="w-3 h-3 mr-1 fill-primary" />
            Trusted by 500+ Companies
          </Badge>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            Streamline Your
            <span className="text-primary block">Video Interviews</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your hiring process with our comprehensive video interview platform. Create sessions, evaluate
            candidates, and make informed decisions—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-primary text-primary hover:bg-primary/10" asChild>
              <Link href="#demo">Watch Demo <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Setup in 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Everything You Need for Better Hiring
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make your interview process more efficient and effective.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:shadow-soft transition-all duration-300 hover:border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-foreground">Video Recording</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Seamless video recording with automatic upload and processing for candidate responses.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 hover:shadow-soft transition-all duration-300 hover:border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-foreground">Role-Based Access</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Separate dashboards for interviewers and candidates with tailored experiences.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 hover:shadow-soft transition-all duration-300 hover:border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-foreground">Secure & Private</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enterprise-grade security with encrypted video storage and GDPR compliance.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-6">Built for Modern Hiring Teams</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            InterviewFlow was created to solve the challenges of remote hiring. Our platform combines the personal touch
            of face-to-face interviews with the convenience and efficiency of digital tools, helping you find the best
            talent faster.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Companies Trust Us</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10k+</div>
              <div className="text-muted-foreground">Interviews Conducted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">Hear from companies that transformed their hiring with InterviewFlow</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-background border-border/50">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "InterviewFlow has reduced our time-to-hire by 40%. The platform is intuitive and the customer support is exceptional."
                </p>
                <div className="font-medium text-foreground">Sarah Johnson</div>
                <div className="text-sm text-muted-foreground">HR Director, TechCorp</div>
              </CardContent>
            </Card>
            <Card className="bg-background border-border/50">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The customizable questions and easy candidate management have made our recruitment process so much more efficient."
                </p>
                <div className="font-medium text-foreground">Michael Chen</div>
                <div className="text-sm text-muted-foreground">Talent Acquisition, StartupXYZ</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {/* FAQ Section */}
<section id="faq" className="py-20 px-4 bg-background">
  <div className="container mx-auto max-w-3xl">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-heading font-bold text-foreground mb-4">Frequently Asked Questions</h2>
      <p className="text-xl text-muted-foreground">Everything you need to know about InterviewFlow</p>
    </div>
    
    <Accordion type="single" collapsible className="space-y-4">
      <AccordionItem value="item-1" className="border-border/50 rounded-lg overflow-hidden">
        <AccordionTrigger className="px-6 py-4 hover:bg-card/50 transition-colors rounded-t-lg data-[state=open]:rounded-b-none">
          <span className="font-heading text-lg text-foreground text-left">
            How does the video interview process work?
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-4">
          <p className="text-muted-foreground">
            Interviewers create sessions with custom questions, invite candidates via email, and candidates record
            their responses at their convenience. All videos are automatically processed and made available for
            review.
          </p>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2" className="border-border/50 rounded-lg overflow-hidden">
        <AccordionTrigger className="px-6 py-4 hover:bg-card/50 transition-colors rounded-t-lg data-[state=open]:rounded-b-none">
          <span className="font-heading text-lg text-foreground text-left">
            Is there a limit on video length or file size?
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-4">
          <p className="text-muted-foreground">
            Each response can be up to 5 minutes long. Our platform automatically optimizes video files for
            storage and playback without compromising quality.
          </p>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3" className="border-border/50 rounded-lg overflow-hidden">
        <AccordionTrigger className="px-6 py-4 hover:bg-card/50 transition-colors rounded-t-lg data-[state=open]:rounded-b-none">
          <span className="font-heading text-lg text-foreground text-left">
            Can I customize the interview questions?
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-4">
          <p className="text-muted-foreground">
            Yes! You can create custom questions based on position, tech stack, and experience level. Our AI can
            also suggest relevant questions for your specific requirements.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/10">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of companies already using InterviewFlow to streamline their hiring process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/signup">Start Your Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-primary text-primary hover:bg-primary/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-heading font-bold text-foreground">Shohoj Niyog</span>
              </div>
              <p className="text-muted-foreground">Streamline your hiring process with professional video interviews.</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-4 text-foreground">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#faq" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 InterviewFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}