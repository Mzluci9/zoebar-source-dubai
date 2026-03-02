import { useState, useEffect } from "react";
import { Coffee, Apple, ShoppingCart, Sparkles, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroCoffee from "@/assets/hero-coffee.jpg";
import heroProduce from "@/assets/hero-produce.jpg";
import heroEcommerce from "@/assets/hero-ecommerce.jpg";
import heroAi from "@/assets/hero-ai.jpg";

const productsData = [
  {
    id: "coffee",
    icon: Coffee,
    title: "Ethiopian Green Coffee",
    subtitle: "Consistent, Traceable, GCC-Ready",
    description:
      "Reliable origin sourcing of Ethiopian green coffee with quality consistency, transparent traceability, and professional communication. Tailored for small and medium specialty roasters in the UAE and Saudi Arabia.",
    image: heroCoffee,
    features: [
      { title: "Quality Consistency", desc: "Uniform grade every shipment" },
      { title: "Full Traceability", desc: "Origin transparency from farm to port" },
      { title: "GCC-Focused", desc: "UAE & Saudi Arabia specialists" },
      { title: "Specialty Grade", desc: "For discerning roasters" },
    ],
    benefits: [
      "Reliable supply chain for GCC specialty roasters",
      "Professional communication and responsive support",
      "Transparent sourcing with full origin documentation",
      "Tailored volumes for small and medium roasters",
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
    id: "ecommerce",
    icon: ShoppingCart,
    title: "eCommerce Solutions",
    subtitle: "Shop Premium, Ship Global",
    description:
      "A full-service online retail platform that connects premium Ethiopian coffee and organic produce with customers worldwide. Seamless digital storefronts, secure payment processing, and reliable global logistics — all in one place.",
    image: heroEcommerce,
    features: [
      { title: "Online Storefront", desc: "Beautiful, branded shop" },
      { title: "Secure Payments", desc: "Multiple payment options" },
      { title: "Global Shipping", desc: "Worldwide delivery network" },
      { title: "Order Tracking", desc: "Real-time shipment updates" },
    ],
    benefits: [
      "Direct-to-consumer sales channel",
      "Subscription and bulk ordering options",
      "Multi-currency and multi-language support",
      "Integrated inventory management",
    ],
  },
  {
    id: "ai-infrastructure",
    icon: Sparkles,
    title: "Sovereign AI Infrastructure",
    subtitle: "Infrastructure-First, Not AI-as-a-Feature",
    description:
      "We build sovereign-grade AI infrastructure for enterprise, government, and regulated industries across the UAE and GCC. Real-time decisioning engines, model governance, zero-trust security, and compliance-ready architecture — designed as the backbone of AI-enabled financial and civic systems.",
    image: heroAi,
    features: [
      { title: "AI Decisioning Engines", desc: "Real-time enterprise-scale inference" },
      { title: "Model Governance", desc: "Audit trails, explainability, bias monitoring" },
      { title: "Zero-Trust Security", desc: "Sovereign data localization compliance" },
      { title: "API-First & Modular", desc: "WSO2, Kong, Apigee, AWS, Azure ready" },
    ],
    benefits: [
      "Built for GCC regulatory frameworks and sovereign cloud",
      "Arabic-first AI modeling capability",
      "Financial services risk, compliance, and operational AI",
      "Smart city intelligence and public-sector AI modernization",
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
                            Speak with Us
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

