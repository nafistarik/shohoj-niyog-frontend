import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQ() {
  return (
    <section id="faq" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Shohoj Niyog
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {[
            {
              q: "How does Shohoj Niyog simplify the recruitment process?",
              a: "Shohoj Niyog streamlines hiring by allowing recruiters to create customized video interview sessions, invite candidates via unique links, and review responses at their convenience. Our platform automatically organizes all candidate videos for efficient evaluation and comparison.",
            },
            {
              q: "What types of interviews can I conduct with Shohoj Niyog?",
              a: "Our platform supports various interview formats including one-way video interviews, skill-based assessments, and customizable questionnaire sessions. You can create technical evaluations, behavioral interviews, or role-specific assessments tailored to your hiring needs.",
            },
            {
              q: "How does the candidate evaluation system work?",
              a: "Shohoj Niyog provides structured evaluation tools including rating scales, scorecards, and collaborative feedback systems. Hiring teams can comment, rate responses, and share insights directly on candidate videos, ensuring comprehensive and unbiased assessments.",
            },
            {
              q: "Can I integrate Shohoj Niyog with our existing HR systems?",
              a: "Yes, Shohoj Niyog offers API access and integrations with popular Applicant Tracking Systems (ATS) and HR platforms. This allows seamless data transfer, candidate synchronization, and streamlined workflow management between systems.",
            },
            {
              q: "What measures does Shohoj Niyog take to ensure candidate privacy?",
              a: "We prioritize data security with end-to-end encryption, secure cloud storage, and strict access controls. Candidates have rights to their data and can request deletion at any time. We comply with global data protection regulations including GDPR and local data privacy laws.",
            },
            {
              q: "How does Shohoj Niyog support remote hiring and distributed teams?",
              a: "Our platform is designed for remote hiring workflows, featuring asynchronous interviews, collaborative evaluation tools, and seamless communication channels. Hiring teams can participate from anywhere, providing feedback and making decisions without geographical constraints.",
            },
          ].map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx + 1}`}
              className="bg-card rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border/40"
            >
              <AccordionTrigger className="px-6 py-4 transition-all rounded-t-2xl data-[state=open]:text-primary">
                <span className="font-heading text-lg text-left">
                  {item.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-muted-foreground">{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FAQ;
