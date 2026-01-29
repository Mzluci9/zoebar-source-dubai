import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <img src={logo} alt="Zoebar Logo" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="text-white/80 mb-4">
              Premium Ethiopian coffee, organic produce, and exceptional hospitality
              services from Dubai to the world.
            </p>
            <p className="text-sm text-white/60">
              © 2025 Zoebar Business Group FZE LLC. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#products" className="text-white/80 hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/#services" className="text-white/80 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-1" />
                <span className="text-white/80">Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 flex-shrink-0 mt-1" />
                <a href="mailto:info@zoebar.ae" className="text-white/80 hover:text-white">
                  info@zoebar.ae
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 flex-shrink-0 mt-1" />
                <a href="tel:+971" className="text-white/80 hover:text-white">
                  +971 XX XXX XXXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>Authentic. Fresh. Exceptional.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
