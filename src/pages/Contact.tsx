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
      const { name, email, phone, message } = formData;

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer re_B8HWTGVw_Hg796QGJzwre3tzfTFwm1tDm",
        },
        body: JSON.stringify({
          from: "Zoebar Contact Form <onboarding@resend.dev>",
          to: ["eden@zoebarbusinessgroup.com"],
          reply_to: email,
          subject: `New Contact from ${name}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
              <div style="background:linear-gradient(135deg,#047857,#065f46);color:#fff;padding:30px;text-align:center;border-radius:12px 12px 0 0">
                <h1 style="margin:0;font-size:24px">New Contact Form Submission</h1>
                <p style="margin:10px 0 0;opacity:.9;font-size:14px">Zoebar Business Group Website</p>
              </div>
              <div style="padding:30px;background:#fff">
                <div style="margin-bottom:20px;padding:15px;background:#f9fafb;border-radius:8px;border-left:4px solid #047857">
                  <div style="font-weight:600;color:#047857;font-size:12px;text-transform:uppercase;margin-bottom:8px">Name</div>
                  <div style="color:#1f2937;font-size:15px">${name}</div>
                </div>
                <div style="margin-bottom:20px;padding:15px;background:#f9fafb;border-radius:8px;border-left:4px solid #047857">
                  <div style="font-weight:600;color:#047857;font-size:12px;text-transform:uppercase;margin-bottom:8px">Email</div>
                  <div style="color:#1f2937;font-size:15px"><a href="mailto:${email}" style="color:#047857">${email}</a></div>
                </div>
                <div style="margin-bottom:20px;padding:15px;background:#f9fafb;border-radius:8px;border-left:4px solid #047857">
                  <div style="font-weight:600;color:#047857;font-size:12px;text-transform:uppercase;margin-bottom:8px">Phone</div>
                  <div style="color:#1f2937;font-size:15px">${phone || "Not provided"}</div>
                </div>
                <div style="padding:15px;background:#f9fafb;border-radius:8px;border-left:4px solid #047857">
                  <div style="font-weight:600;color:#047857;font-size:12px;text-transform:uppercase;margin-bottom:8px">Message</div>
                  <div style="color:#1f2937;font-size:15px;white-space:pre-wrap">${message}</div>
                </div>
              </div>
              <div style="background:#047857;color:#fff;padding:20px;text-align:center;font-size:13px;border-radius:0 0 12px 12px">
                <p style="margin:5px 0"><strong>Click reply to respond directly to ${name}</strong></p>
                <a href="mailto:${email}" style="display:inline-block;background:#fff;color:#047857;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:10px">Reply to ${name}</a>
              </div>
            </div>
          `,
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you within 24 hours. Thank you!",
          duration: 5000,
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const result = await response.json();
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error("Unable to send message", {
        description: error.message || "Please try again or email us directly.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar dark />
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
                        href="mailto:eden@zoebarbusinessgroup.com"
                        className="text-primary hover:underline"
                      >
                        eden@zoebarbusinessgroup.com
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
                        href="tel:+971589899564"
                        className="text-primary hover:underline"
                      >
                        +971 58 989 9564
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
                    href="mailto:eden@zoebarbusinessgroup.com"
                    className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    eden@zoebarbusinessgroup.com
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
                      placeholder="+971 58 989 9564"
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
