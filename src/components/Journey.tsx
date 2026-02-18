import { useState } from "react";
import {
  Calendar,
  GraduationCap,
  BookOpen,
  Award,
  Book,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimationWrapper, StaggerContainer } from "./anime";

const timelineItems = [
  {
    period: "2015 - 2019",
    title: "Early Education",
    location: "Z.P.H.S. Radi",
    description: "Built a strong foundation in core subjects with limited resources but high curiosity.",
    icon: <GraduationCap className="h-5 w-5" />,
    type: "education"
  },
  {
    period: "2019 - 2021",
    title: "Higher Secondary",
    location: "Yashwantrao Chavan College",
    description: "First real exposure to computers. Developed a deep fascination with technology and programming.",
    icon: <BookOpen className="h-5 w-5" />,
    type: "education"
  },
  {
    period: "2022",
    title: "The Self-Taught Turn",
    location: "Remote / Self-Study",
    description: "Dedicated myself to learning web development from scratch using online resources and community docs.",
    icon: <Lightbulb className="h-5 w-5" />,
    type: "milestone"
  },
  {
    period: "2023",
    title: "First Certifications",
    location: "Global Platforms",
    description: "Completed Responsive Web Design and JavaScript DS&A certifications. Built 10+ practice projects.",
    icon: <Award className="h-5 w-5" />,
    type: "certification"
  },
  {
    period: "2024 - Present",
    title: "Career Focus",
    location: "Pune, India",
    description: "Relocated to Pune to immerse in the tech ecosystem. Building high-end React apps and exploring ecosystem advancements.",
    icon: <Book className="h-5 w-5" />,
    type: "career"
  },
];

const certifications = [
  {
    year: "2023",
    title: "Responsive Web Design",
    provider: "freeCodeCamp",
    link: "https://www.freecodecamp.org/certification/fcc5087bebd-ef5d-4982-acd6-f203374d309b/responsive-web-design",
  },
  {
    year: "2024",
    title: "JavaScript Algorithms",
    provider: "freeCodeCamp",
    link: "https://verify.letsupgrade.in/certificate/LUEJSJAN125666",
  },
  {
    year: "2024",
    title: "AI Workshop",
    provider: "LetsUpgrade",
    link: "https://verify.letsupgrade.in/certificate/LUEGENJAN12585",
  },
];

export default function Journey() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="journey" className="py-24 bg-background relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <AnimationWrapper type="fade" direction="up">
            <h2 className="text-sm font-outfit uppercase tracking-[0.3em] text-primary mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-3 w-3" />
              My Path
            </h2>
            <h3 className="text-4xl md:text-5xl font-outfit font-bold text-foreground mb-6">
              The <span className="gradient-text">Journey</span> So Far
            </h3>
            <p className="text-muted-foreground font-inter max-w-2xl mx-auto text-lg leading-relaxed">
              A timeline of continuous growth, self-discovery, and the relentless pursuit of excellence in engineering.
            </p>
          </AnimationWrapper>
        </div>

        <div className="max-w-4xl mx-auto mb-32">
          <StaggerContainer className="space-y-12" staggerChildren={0.15}>
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
                className="group relative flex gap-8 md:gap-12"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                    activeIndex === index 
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(139,92,246,0.2)]" 
                      : "bg-accent/5 text-primary border-border/40"
                  }`}>
                    {item.icon}
                  </div>
                  {index !== timelineItems.length - 1 && (
                    <div className="w-px h-full bg-gradient-to-b from-primary/50 to-transparent my-4" />
                  )}
                </div>

                <div className="flex-1 pb-12">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-outfit font-bold uppercase tracking-widest text-primary/60">{item.period}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/40 px-2 py-0.5 rounded-full border border-border/40">{item.location}</span>
                  </div>
                  <h4 className="text-2xl font-outfit font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-muted-foreground font-inter leading-relaxed max-w-2xl">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>

        <div className="mt-24">
          <AnimationWrapper type="fade" direction="up">
            <h3 className="text-2xl font-outfit font-bold text-foreground text-center mb-12 flex items-center justify-center gap-3">
              <Award className="h-5 w-5 text-primary" />
              Verified Achievements
            </h3>
          </AnimationWrapper>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerChildren={0.1}>
            {certifications.map((cert, index) => (
              <motion.a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  show: { opacity: 1, scale: 1 }
                }}
                className="group relative p-8 rounded-3xl glass border-border/40 hover:border-primary/20 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <span className="text-xs font-outfit font-bold text-primary mb-2 block">{cert.year}</span>
                  <h4 className="text-lg font-outfit font-bold text-foreground mb-2 leading-tight">{cert.title}</h4>
                  <p className="text-sm text-muted-foreground mb-6">{cert.provider}</p>
                  <div className="flex items-center gap-2 text-primary font-outfit font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                    Verify Credential <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
              </motion.a>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}