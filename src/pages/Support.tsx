import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";
import { MessageCircle } from "lucide-react";

const Support = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20">
        <section className="py-20 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                  <MessageCircle className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                  AI Support Assistant
                </h1>
                <p className="text-lg text-muted-foreground">
                  Get instant answers to your questions about our products and services.
                </p>
              </div>

              <ChatInterface />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Support;
