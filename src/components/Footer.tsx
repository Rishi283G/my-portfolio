import { Github, Heart, Mail, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "0px 0px -100px 0px" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div className="absolute w-64 h-64 -bottom-32 -left-32 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute w-64 h-64 -top-32 -right-32 bg-pink-500/5 rounded-full blur-3xl"></div>

      <motion.div
        className="container"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* About section */}
          <motion.div className="space-y-4" variants={fadeInUp}>
            <h3 className="font-poppins font-bold text-xl mb-4 text-slate-900 dark:text-white relative inline-block">
              Rushikesh Jadhav
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-indigo-500"></span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Self-taught software engineer passionate about building impactful web applications
              and creating intuitive user experiences.
            </p>
            <div className="flex space-x-3 mt-6">
              {[
                {
                  icon: <Github className="h-5 w-5" />,
                  href: "https://github.com/Rishi283G",
                  label: "GitHub",
                },
                {
                  icon: <Mail className="h-5 w-5" />,
                  href: "mailto:jadhavrushikesh283@gmail.com",
                  label: "Email",
                },
                {
                  icon: <Linkedin className="h-5 w-5" />,
                  href: "#",
                  label: "LinkedIn",
                },
                {
                  icon: <Twitter className="h-5 w-5" />,
                  href: "#",
                  label: "Twitter",
                },
              ].map(({ icon, href, label }, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Connect section */}
          <motion.div className="space-y-4" variants={fadeInUp}>
            <h3 className="font-poppins font-bold text-xl mb-4 text-slate-900 dark:text-white relative inline-block">
              Connect
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-purple-500"></span>
            </h3>
            <div className="flex flex-col space-y-3">
              {[
                {
                  icon: <Mail className="h-5 w-5" />,
                  href: "mailto:jadhavrushikesh283@gmail.com",
                  label: "jadhavrushikesh283@gmail.com",
                },
                {
                  icon: <Github className="h-5 w-5" />,
                  href: "https://github.com/Rishi283G",
                  label: "GitHub",
                },
                {
                  icon: <ExternalLink className="h-5 w-5" />,
                  href: "#portfolio",
                  label: "Portfolio",
                },
              ].map(({ icon, href, label }, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                >
                  <span className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                    {icon}
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    {label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Built with section */}
          <motion.div className="space-y-4" variants={fadeInUp}>
            <h3 className="font-poppins font-bold text-xl mb-4 text-slate-900 dark:text-white relative inline-block">
              Built with
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-pink-500"></span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "TailwindCSS", "Vite", "GitHub"].map((tech, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center"
          variants={fadeInUp}
        >
          <p className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300">
            Built with
            <Heart className="h-4 w-4 text-pink-500 animate-pulse" />
            by Rushikesh Jadhav © {currentYear}
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Hosted on
            <span className="font-medium text-slate-700 dark:text-slate-300 ml-1">
              GitHub Pages
            </span>
          </p>
        </motion.div>
      </motion.div>
      
    </footer>
  );
}