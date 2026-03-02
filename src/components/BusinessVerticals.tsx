import { Coffee, ShoppingCart, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const verticals = [
  {
    icon: Coffee,
    title: "Zoebar Coffee",
    label: "Primary",
    labelColor: "bg-amber-800 text-white",
    description:
      "Specialty Ethiopian green coffee sourcing for small and medium GCC roasters, built on traceability and long-term partnerships.",
    action: { type: "button" as const, text: "Explore Coffee", href: "/products" },
  },
  {
    icon: ShoppingCart,
    title: "Zoebar eCommerce Solutions",
    label: "Future Expansion",
    labelColor: "bg-blue-600 text-white",
    description:
      "Digital trade facilitation and cross-border commerce initiatives supporting product distribution and online market expansion.",
    action: { type: "label" as const, text: "Coming Soon" },
  },
  {
    icon: Cpu,
    title: "Zoebar Sovereign AI Infrastructure",
    label: "Secondary Vertical",
    labelColor: "bg-gray-800 text-white",
    description:
      "Partnership-driven AI infrastructure development aligned with regional digital transformation strategies.",
    action: { type: "button" as const, text: "Learn More", href: "/products" },
  },
];

const BusinessVerticals = () => {
  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Business Verticals
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Zoebar Business Group operates across trade and digital
            infrastructure sectors aligned with cross-border growth and
            long-term strategic development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {verticals.map((vertical, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-medium hover:shadow-large transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <vertical.icon className="h-10 w-10 text-primary" />
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${vertical.labelColor}`}
                >
                  {vertical.label}
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                {vertical.title}
              </h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                {vertical.description}
              </p>

              {vertical.action.type === "button" ? (
                <a href={vertical.action.href}>
                  <Button variant="default" className="w-full">
                    {vertical.action.text}
                  </Button>
                </a>
              ) : (
                <div className="w-full text-center py-2.5 px-4 rounded-md bg-muted text-muted-foreground font-medium text-sm">
                  {vertical.action.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessVerticals;
