import { User, Mail, MapPin, Calendar, BookOpen, Heart } from "lucide-react";
import { AnimationWrapper } from "./anime";

export default function About() {
  const infoItems = [
    { label: "Name", value: "Rushikesh Jadhav", icon: <User className="h-4 w-4" /> },
    { label: "Email", value: "jadhavrushikesh283@gmail.com", icon: <Mail className="h-4 w-4" /> },
    { label: "Location", value: "Maharashtra, India", icon: <MapPin className="h-4 w-4" /> },
    { label: "Birthday", value: "Oct 18, 2004", icon: <Calendar className="h-4 w-4" /> },
  ];

  const yearPlanItems = [
    { year: "2024", goal: "Mastering React, Next.js & TypeScript" },
    { year: "2025", goal: "Exploring Backend & Cloud Technologies" },
    { year: "2026", goal: "Building Scalable Full-Stack Applications" },
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Vision & Bio */}
          <div className="space-y-12">
            <AnimationWrapper type="fade" direction="up">
              <h2 className="text-sm font-outfit uppercase tracking-[0.3em] text-primary mb-6">Introduction</h2>
              <h3 className="text-5xl md:text-6xl font-outfit font-bold text-foreground leading-tight">
                Crafting interfaces that <span className="gradient-text">matter.</span>
              </h3>
            </AnimationWrapper>

            <AnimationWrapper type="fade" direction="up" delay={0.2}>
              <div className="space-y-6 text-lg text-muted-foreground font-inter leading-relaxed max-w-xl">
                <p>
                  As an aspiring software engineer, I've dedicated my journey to understanding 
                  not just the <span className="text-foreground">how</span> of technology, but the <span className="text-foreground">why</span>. 
                  My focus lies at the intersection of performance and playful interaction.
                </p>
                <div className="quote">
                  "I don't just write code; I design systems that communicate with users 
                  on a human level."
                </div>
                <p>
                  I'm currently pushing the boundaries of what's possible in the browser, 
                  one commit at a time.
                </p>
              </div>
            </AnimationWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
              {infoItems.map((item, idx) => (
                <AnimationWrapper key={idx} type="fade" direction="up" delay={0.1 * idx}>
                  <div className="flex items-center gap-4 group p-4 rounded-2xl bg-accent/5 border border-border/40 hover:border-primary/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">{item.label}</p>
                      <p className="text-sm text-foreground/80 font-medium">{item.value}</p>
                    </div>
                  </div>
                </AnimationWrapper>
              ))}
            </div>
          </div>

          {/* Right Column: Timeline & Personal */}
          <div className="lg:pl-16 space-y-16">
            <AnimationWrapper type="fade" direction="left">
              <div className="p-10 rounded-[2.5rem] glass border-border/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors" />
                
                <h4 className="flex items-center gap-3 text-xl font-outfit font-bold text-foreground mb-8">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Growth Roadmap
                </h4>
                
                <div className="space-y-10 relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                  
                  {yearPlanItems.map((item, idx) => (
                    <div key={idx} className="relative pl-10">
                      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(139,92,246,0.3)] border-2 border-background" />
                      <span className="text-xs font-outfit font-bold text-primary uppercase tracking-widest">{item.year}</span>
                      <p className="text-muted-foreground font-medium mt-1">{item.goal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper type="fade" direction="up" delay={0.4}>
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-border/40" />
                  <Heart className="h-4 w-4 text-primary animate-pulse" />
                  <div className="h-px flex-1 bg-border/40" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-3xl bg-accent/5 border border-border/40">
                    <p className="text-3xl font-outfit font-bold text-foreground">20+</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mt-1">Projects</p>
                  </div>
                  <div className="text-center p-4 rounded-3xl bg-accent/5 border border-border/40">
                    <p className="text-3xl font-outfit font-bold text-foreground">2k+</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mt-1">Commits</p>
                  </div>
                  <div className="text-center p-4 rounded-3xl bg-accent/5 border border-border/40">
                    <p className="text-3xl font-outfit font-bold text-foreground">100%</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mt-1">Dedicated</p>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
