import { Github, Heart, Mail, Linkedin, Twitter, ExternalLink, Code2 } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "0px 0px -100px 0px" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/Rishi283G", label: "GitHub" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:jadhavrushikesh283@gmail.com", label: "Email" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-background py-24 border-t border-border/40 relative overflow-hidden"
    >
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />

      <motion.div
        className="container px-4 mx-auto"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Brand Section */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm shadow-primary/5">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="font-outfit font-bold text-2xl text-foreground tracking-tight">
                Rushikesh Jadhav
              </h3>
            </div>
            <p className="text-muted-foreground font-inter leading-relaxed max-w-sm">
              Crafting premium digital experiences where code meets creativity. 
              Based in India, building for the world.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl glass border-border/40 flex items-center justify-center text-muted-foreground/60 hover:text-primary hover:border-primary/20 transition-all shadow-sm"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <h4 className="font-outfit font-bold text-foreground uppercase tracking-widest text-xs">Navigation</h4>
            <nav className="flex flex-col gap-4">
              {['About', 'Skills', 'Projects', 'Journey', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary font-inter transition-colors w-fit"
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Status Section */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <h4 className="font-outfit font-bold text-foreground uppercase tracking-widest text-xs">Current Status</h4>
            <div className="p-6 rounded-3xl glass border-border/40 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-foreground/70 font-medium">Available for Work</span>
              </div>
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                I'm currently looking for new opportunities to contribute to innovative projects. 
                Let's talk!
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 text-primary font-outfit font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                Start a Conversation <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Credits */}
        <motion.div
          className="mt-24 pt-12 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-6"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2 text-muted-foreground/40 font-inter text-sm font-medium">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500/60 fill-red-500/20" />
            <span>by Rushikesh Jadhav © {currentYear}</span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-muted-foreground/30 text-xs font-outfit font-bold uppercase tracking-widest">
              System Architecture
            </span>
            <span className="text-muted-foreground/30 text-xs font-outfit font-bold uppercase tracking-widest">
              Privacy Policy
            </span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}