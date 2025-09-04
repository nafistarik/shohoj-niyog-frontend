import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQ() {
  return (
    <section id="faq" className="py-20 px-4 bg-card animate-fade-in">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground font-body">
            Everything you need to know about Shohoj Niyog
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem
            value="item-1"
            className="border-sidebar-border rounded-lg overflow-hidden glass-effect shadow-soft animate-slide-in"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 hover:text-primary-dark transition-colors rounded-t-lg data-[state=open]:rounded-b-none">
              <span className="font-heading text-lg text-foreground text-left">
                How does Shohoj Niyog simplify the recruitment process?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 font-body text-muted-foreground">
              Shohoj Niyog streamlines hiring by allowing recruiters to create
              customized video interview sessions, invite candidates via
              unique links, and review responses at their convenience. Our
              platform automatically organizes all candidate videos for
              efficient evaluation and comparison.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border-sidebar-border rounded-lg overflow-hidden glass-effect shadow-soft animate-slide-in"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 hover:text-primary-dark transition-colors rounded-t-lg data-[state=open]:rounded-b-none">
              <span className="font-heading text-lg text-foreground text-left">
                What types of interviews can I conduct with Shohoj Niyog?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 font-body text-muted-foreground">
              Our platform supports various interview formats including
              one-way video interviews, skill-based assessments, and
              customizable questionnaire sessions. You can create technical
              evaluations, behavioral interviews, or role-specific assessments
              tailored to your hiring needs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border-sidebar-border rounded-lg overflow-hidden glass-effect shadow-soft animate-slide-in"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 hover:text-primary-dark transition-colors rounded-t-lg data-[state=open]:rounded-b-none">
              <span className="font-heading text-lg text-foreground text-left">
                How does the candidate evaluation system work?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 font-body text-muted-foreground">
              Shohoj Niyog provides structured evaluation tools including
              rating scales, scorecards, and collaborative feedback systems.
              Hiring teams can comment, rate responses, and share insights
              directly on candidate videos, ensuring comprehensive and
              unbiased assessments.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="border-sidebar-border rounded-lg overflow-hidden glass-effect shadow-soft animate-slide-in"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 hover:text-primary-dark transition-colors rounded-t-lg data-[state=open]:rounded-b-none">
              <span className="font-heading text-lg text-foreground text-left">
                Can I integrate Shohoj Niyog with our existing HR systems?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 font-body text-muted-foreground">
              Yes, Shohoj Niyog offers API access and integrations with
              popular Applicant Tracking Systems (ATS) and HR platforms. This
              allows seamless data transfer, candidate synchronization, and
              streamlined workflow management between systems.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="border-sidebar-border rounded-lg overflow-hidden glass-effect shadow-soft animate-slide-in"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 hover:text-primary-dark transition-colors rounded-t-lg data-[state=open]:rounded-b-none">
              <span className="font-heading text-lg text-foreground text-left">
                What measures does Shohoj Niyog take to ensure candidate
                privacy?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 font-body text-muted-foreground">
              We prioritize data security with end-to-end encryption, secure
              cloud storage, and strict access controls. Candidates have
              rights to their data and can request deletion at any time. We
              comply with global data protection regulations including GDPR
              and local data privacy laws.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-6"
            className="border-sidebar-border rounded-lg overflow-hidden glass-effect shadow-soft animate-slide-in"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 hover:text-primary-dark transition-colors rounded-t-lg data-[state=open]:rounded-b-none">
              <span className="font-heading text-lg text-foreground text-left">
                How does Shohoj Niyog support remote hiring and distributed
                teams?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 font-body text-muted-foreground">
              Our platform is designed for remote hiring workflows, featuring
              asynchronous interviews, collaborative evaluation tools, and
              seamless communication channels. Hiring teams can participate
              from anywhere, providing feedback and making decisions without
              geographical constraints.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

export default FAQ;