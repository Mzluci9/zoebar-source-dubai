import { Coffee, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCoffee from "@/assets/hero-coffee.jpg";
import heroCoffeeRoasted from "@/assets/hero-coffee-roasted.jpg";

const coffeeFeatures = [
  "Specialty-grade Yirgacheffe, Sidamo & Guji lots",
  "Verified farm-level traceability",
  "Consistent cup profiles season after season",
  "Structured export coordination & flexible allocations",
  "Tailored for small and medium GCC roasters",
  "Direct communication — no middlemen delays",
];

const Products = () => {
  return (
    <section id="products" className="py-20 bg-background">
      <span id="services" className="block scroll-mt-24" aria-hidden="true" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ethiopian Green Coffee
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our primary vertical — specialty-grade Ethiopian green coffee
            sourced directly for growing roasters across the UAE and Saudi Arabia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-2xl overflow-hidden shadow-medium">
            <img
              src={heroCoffee}
              alt="Ethiopian green coffee beans"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-medium">
            <img
              src={heroCoffeeRoasted}
              alt="Roasted Ethiopian coffee"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {coffeeFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/contact">
              <Button size="lg" variant="default" className="group">
                <Coffee className="mr-2 h-5 w-5" />
                Request Coffee Specs
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
