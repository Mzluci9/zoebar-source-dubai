import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/#services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="Zoebar Logo" 
              className={`h-16 w-auto transition-all duration-300 ${
                isScrolled 
                  ? "" 
                  : "brightness-0 invert"
              }`}
              style={isScrolled ? { filter: 'brightness(0) saturate(100%) invert(29%) sepia(89%) saturate(1463%) hue-rotate(129deg) brightness(91%) contrast(101%)' } : {}}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            <Link to="/support">
              <Button variant="default" size="lg">
                Get Support
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="block py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Link to="/support" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="default" size="lg" className="w-full">
                Get Support
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
