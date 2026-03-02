import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroCoffee from "@/assets/hero-coffee.jpg";
import heroEcommerce from "@/assets/hero-ecommerce.jpg";
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
    title: "Consistent, Traceable Ethiopian Green Coffee for GCC Specialty Roasters",
    subtitle: "",
    description: "We supply specialty-grade Ethiopian green coffee with verified traceability, consistent lot quality, and structured export coordination; built for growing roasters in the UAE and Saudi Arabia.",
    primaryAction: { text: "Request Coffee Specs", href: "/contact" },
    secondaryAction: { text: "Speak with Us", href: "/contact" },
  },
  {
    image: heroEcommerce,
    title: "eCommerce Made Simple",
    subtitle: "Your Online Store, Our Expertise",
    description: "End-to-end eCommerce solutions to bring premium Ethiopian products directly to customers worldwide through seamless digital experiences.",
    primaryAction: { text: "Our Services", href: "/products" },
    secondaryAction: { text: "Get Started", href: "/contact" },
  },
  {
    image: heroAI,
    title: "Sovereign-Grade AI Infrastructure for the GCC",
    subtitle: "",
    description: "Enterprise and government-ready AI decisioning infrastructure — built for regulated industries across the UAE and Saudi Arabia. Not an AI agency. The backbone.",
    primaryAction: { text: "Explore AI Infrastructure", href: "/products" },
    secondaryAction: { text: "Speak with Us", href: "/contact" },
  },
];

const Hero = ({ onSlideChange }: { onSlideChange?: (index: number) => void }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      const idx = api.selectedScrollSnap();
      setCurrent(idx);
      onSlideChange?.(idx);
    });

    onSlideChange?.(api.selectedScrollSnap());
  }, [api, onSlideChange]);

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
                  {slide.subtitle && (
                    <p className="text-2xl md:text-3xl text-white/90 mb-8 animate-fade-in">
                      {slide.subtitle}
                    </p>
                  )}
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
