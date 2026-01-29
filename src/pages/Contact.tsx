import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email via local backend server
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you within 24 hours. Thank you!",
          duration: 5000,
        });
        
        // Reset form
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      
      // Check if it's a connection error
      if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
        toast.error("Email server not running", {
          description: "Please start the email server: npm run server",
          duration: 7000,
        });
      } else {
        toast.error("Unable to send message", {
          description: error.message || "Please try again or email us directly.",
          duration: 5000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20">
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Get In Touch
              </h1>
              <p className="text-lg text-muted-foreground">
                Have questions about our products or services? We're here to help.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Reach out to us through any of the following channels, and our team
                  will respond promptly.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Office</h3>
                      <p className="text-muted-foreground">
                        Dubai, United Arab Emirates
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a
                        href="mailto:natnaelargaw@gmail.com"
                        className="text-primary hover:underline"
                      >
                        natnaelargaw@gmail.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <a
                        href="tel:+971"
                        className="text-primary hover:underline"
                      >
                        +971 XX XXX XXXX
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Available Mon-Fri, 9 AM - 6 PM GST
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">
                    <Mail className="inline h-5 w-5 mr-2" />
                    Direct Email
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    For urgent inquiries or if the form doesn't work, email us directly:
                  </p>
                  <a 
                    href="mailto:natnaelargaw@gmail.com"
                    className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    natnaelargaw@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-large border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-foreground block mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-foreground block mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-foreground block mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+971 XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-sm font-medium text-foreground block mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your inquiry..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={5}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By submitting this form, you agree to receive communications from Zoebar Business Group.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
