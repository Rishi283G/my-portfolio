import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigationItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" },
  ];

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="fixed top-6 left-0 right-0 w-full z-50 flex justify-center px-4"
    >
      <div className={`flex items-center justify-between px-6 py-3 w-full max-w-4xl rounded-full transition-all duration-300 border ${
        isScrolled
          ? "glass border-border/40 shadow-lg"
          : "bg-transparent border-transparent"
      }`}>
        <motion.a 
          href="#" 
          className="font-outfit text-xl font-bold gradient-text cursor-pointer"
          variants={itemVariants}
        >
          Rushikesh.dev
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navigationItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                variants={itemVariants}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors cursor-pointer"
              >
                {item.name}
              </motion.a>
            ))}
          </div>
          <div className="flex items-center gap-4 pl-4 border-l border-border/40">
            <motion.div variants={itemVariants}>
              <ThemeToggle />
            </motion.div>
            <motion.a href="#contact" variants={itemVariants}>
              <Button size="sm" className="rounded-full px-5 cursor-pointer">
                Let's Talk
              </Button>
            </motion.a>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <motion.div className="flex md:hidden items-center gap-2" variants={itemVariants}>
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="cursor-pointer rounded-full">
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </motion.div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 md:hidden glass border border-border/40 rounded-2xl overflow-hidden p-4 z-50"
          >
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors py-3 px-4 rounded-xl hover:bg-accent/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-xl">Let's Talk</Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
