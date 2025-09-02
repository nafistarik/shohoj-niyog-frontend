function Stats() {
  return (
    <section id="about" className="py-20 px-4 bg-primary/5">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
          Built for Modern Hiring Teams
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          InterviewFlow was created to solve the challenges of remote hiring.
          Our platform combines the personal touch of face-to-face interviews
          with the convenience and efficiency of digital tools, helping you find
          the best talent faster.
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
  );
}

export default Stats;
