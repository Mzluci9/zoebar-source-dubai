import { useState, useEffect } from "react";
import { Coffee, Apple, Home, Sparkles, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroCoffee from "@/assets/hero-coffee.jpg";
import heroProduce from "@/assets/hero-produce.jpg";
import heroHospitality from "@/assets/hero-hospitality.jpg";
import heroAi from "@/assets/hero-ai.jpg";

const productsData = [
  {
    id: "coffee",
    icon: Coffee,
    title: "Premium Ethiopian Coffee",
    subtitle: "Farm to Cup Excellence",
    description:
      "Single-origin, farm-direct coffee beans from the highlands of Ethiopia. Our coffee is naturally processed without any additives, maintaining its authentic flavor profile and health benefits. Perfect for wholesalers and retailers looking for premium quality.",
    image: heroCoffee,
    features: [
      { title: "100% Arabica", desc: "Premium single-origin beans" },
      { title: "Direct from Farm", desc: "No middlemen, better prices" },
      { title: "No Additives", desc: "Naturally processed coffee" },
      { title: "Bulk Available", desc: "Export and wholesale options" },
    ],
    benefits: [
      "Rich, authentic Ethiopian flavor",
      "Sustainable farming practices",
      "Fair trade partnerships",
      "Quality certifications available",
    ],
  },
  {
    id: "produce",
    icon: Apple,
    title: "Organic Fruits & Vegetables",
    subtitle: "Fresh from the Farm",
    description:
      "Fresh bananas, avocados, potatoes, tomatoes, and seasonal produce. Harvested to order and shipped within 1-2 weeks to ensure maximum freshness. All our produce is grown without synthetic pesticides or preservatives.",
    image: heroProduce,
    features: [
      { title: "Farm Fresh", desc: "Harvested on demand" },
      { title: "No Preservatives", desc: "Natural and healthy" },
      { title: "Fast Delivery", desc: "1-2 week shipping" },
      { title: "Organic Certified", desc: "Verified organic produce" },
    ],
    benefits: [
      "Maximum freshness guaranteed",
      "Nutritionally superior produce",
      "Support sustainable agriculture",
      "Traceable from farm to table",
    ],
  },
  {
    id: "hospitality",
    icon: Home,
    title: "Dubai Hospitality Services",
    subtitle: "Your Home Away from Home",
    description:
      "Quality apartments with modern amenities in prime Dubai locations. We offer both short-term and long-term accommodation solutions for business and leisure travelers, with a focus on comfort, cleanliness, and exceptional service.",
    image: heroHospitality,
    features: [
      { title: "Modern Amenities", desc: "Fully equipped apartments" },
      { title: "Prime Locations", desc: "Central Dubai access" },
      { title: "Business Friendly", desc: "Work-ready spaces" },
      { title: "Quality Service", desc: "24/7 support available" },
    ],
    benefits: [
      "Flexible booking options",
      "Professional property management",
      "Competitive rates",
      "Personalized guest services",
    ],
  },
  {
    id: "ai-solutions",
    icon: Sparkles,
    title: "AI-Driven Solutions",
    subtitle: "Innovation Meets Intelligence",
    description:
      "Innovative AI-powered product development and business optimization solutions. We help businesses leverage artificial intelligence to enhance efficiency, improve quality, and drive growth across all operations.",
    image: heroAi,
    features: [
      { title: "Smart Automation", desc: "Streamline operations" },
      { title: "Data Analytics", desc: "Actionable insights" },
      { title: "Process Optimization", desc: "Efficiency gains" },
      { title: "Future-Ready", desc: "Stay competitive" },
    ],
    benefits: [
      "Custom AI solutions tailored to your needs",
      "Proven ROI and efficiency improvements",
      "Ongoing support and updates",
      "Integration with existing systems",
    ],
  },
];

const Products = () => {
  const [activeTab, setActiveTab] = useState(productsData[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sections = productsData.map((p) => ({
        id: p.id,
        element: document.getElementById(p.id),
      }));

      const current = sections.find((section) => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });

      if (current) {
        setActiveTab(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Our Products & Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From the rich coffee farms of Ethiopia to cutting-edge AI solutions,
            we deliver excellence in every offering.
          </p>
        </div>
      </section>

      {/* Sticky Navigation Tabs */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-md shadow-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {productsData.map((product) => (
              <button
                key={product.id}
                onClick={() => scrollToSection(product.id)}
                className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap border-b-2 transition-all duration-300 ${
                  activeTab === product.id
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <product.icon className="h-5 w-5" />
                <span className="hidden sm:inline">{product.title}</span>
                <span className="sm:hidden">{product.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Sections */}
      <div className="bg-background">
        {productsData.map((product, index) => (
          <section
            key={product.id}
            id={product.id}
            className={`py-20 ${index % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
          >
            <div className="container mx-auto px-4">
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 items-center`}
              >
                {/* Image Section */}
                <div className="lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-large group">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                    <div className="absolute bottom-8 left-8">
                      <product.icon className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                    <product.icon className="h-4 w-4" />
                    <span className="text-sm font-semibold">{product.subtitle}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                    {product.title}
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-8">
                    {product.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="bg-card p-4 rounded-xl border border-border hover:border-primary transition-colors"
                      >
                        <h4 className="font-semibold text-foreground mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="bg-primary/5 p-6 rounded-xl mb-8">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      Key Benefits
                    </h3>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact CTA */}
                  <div className="bg-gradient-to-r from-primary to-primary/80 p-6 rounded-xl text-white">
                    <div className="flex items-start gap-4">
                      <Mail className="h-8 w-8 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          Interested in {product.title}?
                        </h3>
                        <p className="text-white/90 mb-4">
                          Get in touch with us to learn more about pricing, availability,
                          and how we can meet your specific needs.
                        </p>
                        <a href="/contact">
                          <Button
                            variant="outline"
                            size="lg"
                            className="bg-white text-primary hover:bg-white/90 border-none"
                          >
                            Contact Us Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Products;

