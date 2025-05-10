import { useState, useRef } from "react";
import {
  Calendar,
  GraduationCap,
  BookOpen,
  Award,
  Book,
  Lightbulb,
  ExternalLink,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

export default function Journey() {
  const [activeIndex, setActiveIndex] = useState(null);
  const timelineRef = useRef(null);
  const certSectionRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "0px 0px -100px 0px" });
  const isCertSectionInView = useInView(certSectionRef, { once: true, margin: "0px 0px -100px 0px" });

  const timelineItems = [
    {
      period: "2015 - 2019",
      title: "Early Education",
      description:
        "Completed schooling at Z.P.H.S. Radi with limited exposure to technology but a strong foundation in core subjects and a curious mind.",
      icon: GraduationCap,
    },
    {
      period: "2019 - 2021",
      title: "Yashwantrao Chavan College",
      description:
        "Gained exposure to computers and developed interest in technology. First introduction to programming concepts and digital tools.",
      icon: BookOpen,
    },
    {
      period: "2022",
      title: "The Self-Taught Decision",
      description:
        "Made the pivotal decision to pursue web development through self-education. Started with HTML, CSS, and basic JavaScript using free online resources.",
      icon: Lightbulb,
    },
    {
      period: "2023",
      title: "First Certifications",
      description:
        "Completed freeCodeCamp certifications in Responsive Web Design and JavaScript Algorithms. Built my first projects and started learning React.",
      icon: Award,
    },
    {
      period: "2024 - Present",
      title: "Current Journey",
      description:
        "Relocated to Pune to pursue my development career more seriously. Working on building a portfolio of projects while continuing to learn React and preparing for full-stack development.",
      icon: Book,
    },
  ];

  const certifications = [
    {
      year: "2023",
      title: "Responsive Web Design",
      description:
        "freeCodeCamp certification covering HTML, CSS, and responsive design principles.",
      provider: "freeCodeCamp",
      link: "https://www.freecodecamp.org/certification/fcc5087bebd-ef5d-4982-acd6-f203374d309b/responsive-web-design", // Replace with your actual certificate link
    },
    {
      year: "2024",
      title: "JavaScript Algorithms",
      description:
        "JavaScript data structures and algorithm certification from freeCodeCamp.",
      provider: "freeCodeCamp",
      link: "https://verify.letsupgrade.in/certificate/LUEJSJAN125666", // Replace with your actual certificate link
    },
    {
      year: "2024",
      title: "Lets upgrade AI Workshop",
      description:
        "Intensive workshop on AI applications and integration in modern web development.",
      provider: "be10x",
      link: "https://verify.letsupgrade.in/certificate/LUEGENJAN12585", // Replace with your actual certificate link
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="journey" className="py-20 overflow-hidden">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
          <h2 className="font-poppins text-3xl md:text-4xl font-bold relative">
            My <span className="gradient-text">Journey</span>
          </h2>
          <div className="mt-4 mx-auto max-w-xl relative">
            <p className="text-muted-foreground">
              The path of self-education and continuous growth.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <motion.div
          className="max-w-3xl mx-auto relative"
          ref={timelineRef}
          variants={containerVariants}
          initial="hidden"
          animate={isTimelineInView ? "visible" : "hidden"}
        >
          <div className="absolute left-7 top-10 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 via-primary/20 to-transparent"></div>

          <div className="space-y-16">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                variants={timelineItemVariants}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className="relative"
              >
                <div
                  className={`timeline-dot absolute left-7 w-5 h-5 rounded-full bg-background border-2 transform -translate-x-1/2 transition-all duration-300 ${
                    activeIndex === index
                      ? "border-primary scale-125"
                      : "border-primary/50"
                  }`}
                ></div>

                <div className="flex items-start gap-4 pl-14">
                  <div
                    className={`transition-all duration-300 h-14 w-14 flex items-center justify-center rounded-xl ${
                      activeIndex === index
                        ? "bg-primary text-background shadow-lg shadow-primary/20"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {item.period}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <div className="mt-24 relative" ref={certSectionRef}>
          <div className="absolute -top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <h3 className="font-poppins text-2xl font-semibold text-center mb-12 relative">
            <span className="relative inline-block">
              Certifications
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></span>
            </span>
          </h3>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isCertSectionInView ? "visible" : "hidden"}
          >
            {certifications.map((cert, index) => (
              <motion.a
                key={index}
                href={cert.link || "#"}
                target={cert.link ? "_blank" : undefined}
                rel={cert.link ? "noopener noreferrer" : undefined}
                variants={cardVariants}
                whileHover={{
                  scale: cert.link ? 1.05 : 1,
                  boxShadow: cert.link ? "0 10px 20px rgba(0, 0, 0, 0.1)" : "",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: cert.link ? 0.95 : 1 }}
                className={`group p-6 rounded-xl bg-gradient-to-br from-card to-card/80 border border-border hover:border-primary/40 flex flex-col transition-all duration-300 relative overflow-hidden ${
                  cert.link ? "cursor-pointer" : "cursor-default"
                }`}
                aria-label={
                  cert.link
                    ? `View ${cert.title} certificate from ${cert.provider}`
                    : `${cert.title} certificate from ${cert.provider} (link unavailable)`
                }
                onClick={(e) => {
                  if (!cert.link) {
                    e.preventDefault();
                    // Optional: Add a toast notification for unavailable links
                    console.log("Certificate link not available");
                  }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <div className="mb-4 flex justify-between items-center">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary group-hover:bg-primary/30 transition-all duration-300">
                    {cert.year}
                  </span>
                  {cert.link && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      className="text-primary group-hover:opacity-100 group-hover:x-0 transition-all duration-300"
                      whileHover={{ rotate: 20 }}
                    >
                      <ExternalLink size={16} />
                    </motion.span>
                  )}
                </div>
                <h4 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-2 flex-grow">
                  {cert.description}
                </p>
                <div className="mt-4 pt-4 border-t border-border group-hover:border-primary/40 transition-colors duration-300">
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {cert.provider}
                  </span>
                </div>
                <motion.div
                  className="absolute top-2 right-2 h-12 w-12 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <Award className="h-6 w-6 text-primary/50 group-hover:text-primary" />
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}