import { motion } from "framer-motion";
import { 
  Code2, 
  Layout, 
  Terminal, 
  Palette,
  Blocks,
  Sparkles
} from "lucide-react";
import { StaggerContainer, AnimationWrapper } from "./anime";

const skillCategories = [
  {
    title: "Frontend Mastery",
    icon: <Layout className="h-6 w-6" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
    className: "md:col-span-2",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Core Languages",
    icon: <Code2 className="h-6 w-6" />,
    skills: ["JavaScript", "HTML5", "CSS3"],
    className: "md:col-span-1",
    color: "from-orange-500/20 to-yellow-500/20"
  },
  {
    title: "Developer Tools",
    icon: <Terminal className="h-6 w-6" />,
    skills: ["Git", "VS Code", "Vite", "NPM"],
    className: "md:col-span-1",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "Styling & UI",
    icon: <Palette className="h-6 w-6" />,
    skills: ["Framer Motion", "Shadcn UI", "Lucide"],
    className: "md:col-span-2",
    color: "from-purple-500/20 to-pink-500/20"
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <AnimationWrapper type="fade" direction="up">
            <h2 className="text-sm font-outfit uppercase tracking-[0.3em] text-primary mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-3 w-3" />
              Abilities
            </h2>
            <h3 className="text-4xl md:text-5xl font-outfit font-bold text-foreground mb-6">
              My <span className="gradient-text">Tech Stack</span>
            </h3>
            <p className="text-muted-foreground font-inter max-w-2xl mx-auto">
              A curated selection of technologies I use to bring digital ideas to life. 
              Focused on performance, aesthetics, and user experience.
            </p>
          </AnimationWrapper>
        </div>

        <StaggerContainer 
          staggerChildren={0.1} 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className={`group relative p-8 rounded-3xl glass border-border/40 overflow-hidden flex flex-col justify-between ${category.className}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-accent/5 border border-border/40 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                  {category.icon}
                </div>
                <h4 className="text-xl font-outfit font-bold text-foreground mb-4">{category.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-3 py-1.5 text-xs font-inter font-medium bg-accent/5 border border-border/40 rounded-full text-muted-foreground group-hover:text-foreground group-hover:border-primary/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Blocks className="w-24 h-24 rotate-12" />
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
