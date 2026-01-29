import { CheckCircle } from "lucide-react";

const About = () => {
  const values = [
    "Uncompromising quality standards",
    "Direct farm partnerships in Ethiopia",
    "Sustainable and ethical sourcing",
    "Efficient delivery within 1-2 weeks",
  ];

  return (
    <section id="about" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Zoebar Business Group
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Based in Dubai with strong partnerships in Ethiopia, we specialize in
            delivering premium Ethiopian coffee, organic fruits and vegetables, and
            quality hospitality services. Our mission is to connect global customers
            directly to the source, ensuring every product meets the highest standards
            of quality, freshness, and efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-card p-8 rounded-2xl shadow-medium">
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
            <p className="text-muted-foreground">
              To be a trusted global brand delivering premium, ethically sourced
              Ethiopian coffee, fresh organic produce, and exceptional hospitality
              experiences — where quality is never compromised.
            </p>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-medium">
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground">
              Building strong, reliable partnerships to deliver authentic products and
              services while maintaining the highest standards in every aspect of our
              operations.
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-foreground mb-8">
            Core Values
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <span className="text-lg text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
