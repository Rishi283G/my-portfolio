import { Github, ExternalLink, Code2, Sparkles, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AnimationWrapper, StaggerContainer } from "./anime";

const projects = [
  {
    title: "Personal Portfolio",
    description: "A high-end, immersive digital showroom crafted with React and Framer Motion.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=870",
    tags: ["React", "TypeScript", "Framer Motion", "Tailwind"],
    github: "https://github.com/Rishi283G/my-resume",
    demo: "https://my-resume-puce-five.vercel.app/",
    type: "Personal"
  },
  {
    title: "Intro Website",
    description: "A creative editorial experience sharing personal stories and interests.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=870",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Rishi283G/Intro-Website/tree/main/1ST-WEBSITE",
    demo: "https://intro-website-omega.vercel.app/",
    type: "Experimental"
  },
  {
    title: "MindEase Oasis",
    description: "A student-focused wellness platform for mental health and productivity.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=870",
    tags: ["React", "TypeScript", "Vite", "Shadcn"],
    github: "https://github.com/Rishi283G/calm-student-oasis",
    demo: "https://mindease-rouge.vercel.app/",
    type: "Social Impact"
  },
  {
    title: "The Battle Arena",
    description: "A classic strategy game reimagined with modern UI and smooth state logic.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=870",
    tags: ["HTML", "LocalStorage", "Animations"],
    github: "https://github.com/Rishi283G/Rock-paper-scissors-Game",
    demo: "https://rock-paper-scissors-game-chi-ten.vercel.app/",
    type: "Game"
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <AnimationWrapper type="fade" direction="up">
            <h2 className="text-sm font-outfit uppercase tracking-[0.3em] text-primary mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-3 w-3" />
              Selected Works
            </h2>
            <h3 className="text-4xl md:text-6xl font-outfit font-bold text-foreground mb-6">
              Engineering <span className="gradient-text">Dreams</span>
            </h3>
            <p className="text-muted-foreground font-inter max-w-2xl mx-auto text-lg">
              A gallery of my digital creations, from experimental prototypes to finished applications.
            </p>
          </AnimationWrapper>
        </div>

        <StaggerContainer className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto" staggerChildren={0.2}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 30 },
                show: { opacity: 1, scale: 1, y: 0 }
              }}
              className="group relative h-full flex flex-col rounded-[2.5rem] overflow-hidden glass border-border/40 hover:border-primary/20 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity dark:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity dark:hidden block" />
                
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                    {project.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-2xl font-outfit font-bold text-foreground mb-3 flex items-center justify-between">
                    {project.title}
                    <Folder className="h-5 w-5 text-primary/40 group-hover:text-primary transition-colors" />
                  </h4>
                  <p className="text-muted-foreground font-inter leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 rounded-lg bg-accent/5 border border-border/40 text-[10px] font-bold text-muted-foreground tracking-wider group-hover:text-primary transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-border/40">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="flex-1 h-12 rounded-2xl bg-accent/5 hover:bg-accent/10 text-foreground font-outfit font-bold gap-2 group/btn cursor-pointer transition-colors"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 text-primary" />
                      Codebase
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="flex-1 h-12 rounded-2xl bg-primary hover:bg-primary/90 text-black font-outfit font-extrabold gap-2 cursor-pointer shadow-lg shadow-primary/20"
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <AnimationWrapper type="fade" direction="up" delay={0.6}>
          <div className="mt-20 text-center">
            <a href="https://github.com/Rishi283G" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline" 
                size="lg" 
                className="h-16 px-10 rounded-full glass border border-border/40 font-outfit font-bold text-lg hover:bg-accent/5 transition-all gap-3 cursor-pointer"
              >
                <Code2 className="h-5 w-5 text-primary" />
                Explore Archive on GitHub
              </Button>
            </a>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
