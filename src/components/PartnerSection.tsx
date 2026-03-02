import { CheckCircle } from "lucide-react";

const focusPoints = [
  "Consistent Ethiopian origin lots season after season",
  "Transparent farm-level traceability",
  "Predictable communication and shipment coordination",
  "Flexible allocations suited for small and medium roasting operations",
];

const PartnerSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-10 text-center">
            Built for Long-Term Specialty Roasting Partners
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Zoebar Business Group is not a one-off broker.
              <br />
              We build structured, long-term supply relationships with growing
              specialty roasters across the GCC.
            </p>

            <div>
              <p className="font-semibold text-foreground mb-4">We focus on:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {focusPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="font-semibold text-foreground">Our goal is simple:</p>
              <p>
                To become your trusted Ethiopian origin sourcing partner —{" "}
                <span className="italic">"Not just another exporter."</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
