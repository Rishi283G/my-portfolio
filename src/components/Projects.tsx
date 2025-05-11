"use client";

import { Github, ExternalLink, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function Projects() {
  const projects = [
    {
      title: "Personal Portfolio",
      description:
        "My personal portfolio website showcasing my projects and skills.",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=870",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/Rishi283G/my-resume",
      demo: "https://my-resume-puce-five.vercel.app/",
    },
    {
      title: "intro-website",
      description:
        "A personal website introducing myself — sharing my hobbies, interests, favorite movies, books, and",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=870",
      tags: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/Rishi283G/Intro-Website/tree/main/1ST-WEBSITE",
      demo: "https://intro-website-omega.vercel.app/",
    },
    {
      title: "🧠 MindEase",
      description:
        "A wellness and academic companion web app for students to manage mental health resources, emergency contacts, and study tools in one clean interface.",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=870",
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      github: "https://github.com/Rishi283G/calm-student-oasis",
      demo: "https://mindease-rouge.vercel.app/",
    },
    {
      title: "Rock Paper Scissors-Game",
      description:
        "A classic Rock Paper Scissors game built with HTML, CSS, and JavaScript for casual play.",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=870",
      tags: ["HTML", "Local Storage", "CSS"],
      github: "https://github.com/Rishi283G/Rock-paper-scissors-Game",
      demo: "https://rock-paper-scissors-game-chi-ten.vercel.app/",
    },
  ];

  return (
    <motion.section
      id="projects"
      className="py-20 bg-muted/30"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            className="font-poppins text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            My <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.div
            className="mt-4 mx-auto max-w-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.2 }}
          >
            <p className="text-muted-foreground">
              A selection of projects I've built during my self-taught journey.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
            >
              <Card className="group overflow-hidden border-border/50 transition-all duration-300 hover:shadow-lg">
                <div className="aspect-video overflow-hidden bg-muted/50">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      asChild
                    >
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Github className="h-4 w-4" /> Code
                      </motion.div>
                    </Button>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="gap-1" asChild>
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </motion.div>
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a
            href="https://github.com/Rishi283G"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              <Code className="h-4 w-4" />
              View More on GitHub
            </Button>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
