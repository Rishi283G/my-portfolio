import {
  Code2,
  FileCode2,
  Palette,
  Terminal,
  Server,
  GitBranch,
  Gauge,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimationWrapper, StaggerContainer } from "./anime";
import ModelViewer from "@/components/ModelViewer";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code2 className="h-5 w-5 text-primary" />,
      skills: ["HTML", "CSS", "JavaScript", "React (learning)"],
    },
    
    {
      title: "Tools",
      icon: <Terminal className="h-5 w-5 text-primary" />,
      skills: ["Git", "GitHub", "VS Code", "Chrome DevTools"],
    },
    {
      title: "Design",
      icon: <Palette className="h-5 w-5 text-primary" />,
      skills: ["Canva", "Responsive Design", "UI Principles"],
    },
    {
      title: "Computer Science",
      icon: <FileCode2 className="h-5 w-5 text-primary" />,
      skills: ["Basic DSA", "Problem Solving", "Computational Thinking"],
    },
    {
      title: "Learning Next",
      icon: <Server className="h-5 w-5 text-primary" />,
      skills: ["Node.js", "Express", "MongoDB", "Full Stack Development"],
    },
    {
      title: "Soft Skills",
      icon: <Gauge className="h-5 w-5 text-primary" />,
      skills: ["Self-Learning", "Perseverance", "Time Management", "Communication"],
    },
  ];

  return (
    <section id="skills" className="py-20">
      
      <div className="container">
        
        <AnimationWrapper direction="up">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold">
             
              My <span className="gradient-text">Skills</span>
            </h2>
       
            <div className="mt-4 mx-auto max-w-xl">
              
              <p className="text-muted-foreground">
                Technologies and tools I've learned and currently using to build digital experiences.
                
              </p>
   
            </div>
            
          </div>
  
        </AnimationWrapper>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          delayChildren={0.3}
        >
          {skillCategories.map((category, index) => (
            <AnimationWrapper key={index} direction="left">
              <div className="flex flex-col h-full">
                <Card className="group h-full min-h-[220px] flex flex-col justify-between border-border/50 hover:shadow-md transition-all duration-300 overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                    <CardDescription>
                      {category.title === "Learning Next"
                        ? "Technologies on my learning roadmap"
                        : `My ${category.title.toLowerCase()} skills and tools`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="badge bg-secondary/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <div className="h-1 w-full bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Card>
              </div>
            </AnimationWrapper>
          ))}
        </StaggerContainer>

        <div className="mt-16 text-center">
                           <ModelViewer 
  modelSrc="public/models/react_logo.glb"
  height="300px"
  animated={true}
/>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
            <GitBranch className="h-4 w-4 text-primary" />
            
            <span className="text-sm">Always learning and growing my skill set</span>
          </div>
        </div>
      </div>
    </section>
  );
}
