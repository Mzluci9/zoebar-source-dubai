import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroCoffee from "@/assets/hero-coffee.jpg";
import heroHospitality from "@/assets/hero-hospitality.jpg";
import heroAI from "@/assets/hero-ai.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    image: heroCoffee,
    title: "From Farm to You",
    subtitle: "Freshness Without Compromise",
    description: "Premium Ethiopian coffee, organic produce, and exceptional hospitality services from Dubai to the world.",
    primaryAction: { text: "Explore Products", href: "/products" },
    secondaryAction: { text: "Contact Us", href: "/contact" },
  },
  {
    image: heroHospitality,
    title: "Excellence in Hospitality",
    subtitle: "Service That Exceeds Expectations",
    description: "Professional hospitality solutions tailored to your needs. From event management to premium service delivery.",
    primaryAction: { text: "Our Services", href: "/products" },
    secondaryAction: { text: "Get Started", href: "/contact" },
  },
  {
    image: heroAI,
    title: "AI-Driven Innovation",
    subtitle: "The Future of Smart Solutions",
    description: "Cutting-edge AI technology integrated into our products and services for optimal efficiency and results.",
    primaryAction: { text: "Discover AI Solutions", href: "/products" },
    secondaryAction: { text: "Learn More", href: "/contact" },
  },
];

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="relative h-screen overflow-hidden">
      <Carousel
        setApi={setApi}
        className="h-full"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="h-screen ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative h-screen flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-2xl md:text-3xl text-white/90 mb-8 animate-fade-in">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 animate-fade-in">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                    <a href={slide.primaryAction.href}>
                      <Button size="lg" variant="default" className="group">
                        {slide.primaryAction.text}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                    <a href={slide.secondaryAction.href}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary"
                      >
                        {slide.secondaryAction.text}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Arrows */}
        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default Hero;
