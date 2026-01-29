import { Coffee, Apple, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCoffee from "@/assets/hero-coffee.jpg";
import heroProduce from "@/assets/hero-produce.jpg";
import heroHospitality from "@/assets/hero-hospitality.jpg";
import heroAi from "@/assets/hero-ai.jpg";

const Products = () => {
  const products = [
    {
      icon: Coffee,
      title: "Premium Ethiopian Coffee",
      description:
        "Single-origin, farm-direct coffee beans. Healthy and naturally processed without additives. Available for bulk export and wholesale partnerships.",
      image: heroCoffee,
      features: ["100% Arabica", "Direct from farm", "No additives", "Bulk available"],
    },
    {
      icon: Apple,
      title: "Organic Fruits & Vegetables",
      description:
        "Fresh bananas, avocados, potatoes, tomatoes, and seasonal produce. Harvested to order, shipped within 1-2 weeks with no preservatives.",
      image: heroProduce,
      features: ["Farm fresh", "No preservatives", "1-2 week delivery", "Organic certified"],
    },
    {
      icon: Home,
      title: "Dubai Hospitality",
      description:
        "Quality apartments with modern amenities. Conveniently located for both business and leisure travelers with a focus on comfort and cleanliness.",
      image: heroHospitality,
      features: ["Modern amenities", "Prime location", "Business friendly", "Quality service"],
    },
    {
      icon: Sparkles,
      title: "AI-Driven Solutions",
      description:
        "Innovative AI-powered product development and business optimization solutions to enhance efficiency and quality across all operations.",
      image: heroAi,
      features: ["Smart automation", "Data analytics", "Process optimization", "Future-ready"],
    },
  ];

  return (
    <section id="products" className="py-20 bg-background">
      <span id="services" className="block scroll-mt-24" aria-hidden="true" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Products & Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From the rich coffee farms of Ethiopia to cutting-edge AI solutions, we
            deliver excellence in every offering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden shadow-medium hover:shadow-large transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <product.icon className="h-12 w-12 text-white" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {product.title}
                </h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {product.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-lg"
                    >
                      • {feature}
                    </div>
                  ))}
                </div>

                <a href="/contact">
                  <Button variant="default" className="w-full">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
