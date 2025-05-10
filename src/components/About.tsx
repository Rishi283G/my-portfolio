import { useState } from "react";
import { Briefcase, GraduationCap, MapPin, ChevronRight, Star, Target, Award, LucideIcon } from "lucide-react";
import { AnimationWrapper, StaggerContainer } from "./anime";

interface YearPlanItem {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface InfoItem {
  icon: LucideIcon;
  title: string;
  value: string;
}

export default function About() {
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const yearPlanItems: YearPlanItem[] = [
    {
      year: "Year 1",
      title: "Foundation & First Projects",
      description: "Master HTML, CSS, JavaScript fundamentals. Build several small projects. Complete React basics. Create a personal portfolio.",
      icon: Star
    },
    {
      year: "Year 2",
      title: "Advanced Skills & Experience",
      description: "Deep dive into React ecosystem. Learn backend technologies. Contribute to open source. Build full-stack applications.",
      icon: Target
    },
    {
      year: "Year 3",
      title: "Professional Growth",
      description: "Secure developer position. Continue learning advanced topics. Mentor others from similar backgrounds.",
      icon: Award
    }
  ];

  const infoItems: InfoItem[] = [
    {
      icon: MapPin,
      title: "Location",
      value: "Pune, Maharashtra, India"
    },
    {
      icon: GraduationCap,
      title: "Education",
      value: "Yashwantrao Chavan College"
    },
    {
      icon: Briefcase,
      title: "Experience",
      value: "Self-taught Developer"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <AnimationWrapper direction="right" duration={1.5}>
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
        </AnimationWrapper>
        <AnimationWrapper direction="left" duration={1.5}>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30"></div>
        </AnimationWrapper>
      </div>

      <div className="container relative">
        <AnimationWrapper direction="up">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="mt-4 mx-auto max-w-xl">
              <p className="text-muted-foreground">
                From rural beginnings to coding dreams — my journey of self-teaching and determination.
              </p>
            </div>
          </div>
        </AnimationWrapper>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <AnimationWrapper direction="left" delay={0.2}>
            <h3 className="font-poppins text-2xl font-semibold mb-4 relative inline-block">
              My Story
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/80 to-transparent"></span>
            </h3>

            <p className="mb-4 leading-relaxed text-balance">
              Born and raised in Radi village, I grew up with limited resources but unlimited curiosity.
              Despite not having access to top-tier education, I've always been driven to learn and grow.
            </p>
            <p className="mb-4 leading-relaxed text-balance">
              After completing my studies at Z.P.H.S. Radi and Yashwantrao Chavan College,
              I made the bold decision to pursue my passion for technology through self-education.
            </p>
            <p className="leading-relaxed text-balance">
              Currently based in Pune, I'm on a mission to become a skilled full-stack developer.
              Every day is a step forward in my journey of turning challenges into opportunities.
            </p>

            <AnimationWrapper direction="up" delay={0.4}>
              <blockquote className="quote my-8 p-4 border-l-4 border-primary bg-primary/5 italic rounded-r-lg shadow-sm">
                <p className="text-sm md:text-base">"The only way to do great work is to love what you do. If you haven't found it yet, 
                keep looking. Don't settle."</p>
                <footer className="text-right text-sm font-medium text-primary/80 mt-2">- Steve Jobs</footer>
              </blockquote>
            </AnimationWrapper>

            <StaggerContainer staggerChildren={0.1} delayChildren={0.5}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {infoItems.map((item, index) => (
                  <AnimationWrapper key={index} direction="up">
                    <div className="flex items-start gap-3 group p-3 rounded-lg hover:bg-primary/5 transition-all duration-300">
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  </AnimationWrapper>
                ))}
              </div>
            </StaggerContainer>
          </AnimationWrapper>

          <AnimationWrapper direction="right" delay={0.3}>
            <div className="relative rounded-lg p-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-border hover:border-primary/30 transition-all duration-500 shadow-lg shadow-transparent hover:shadow-primary/5">
              <h3 className="font-poppins text-2xl font-semibold mb-8 relative inline-block">
                3-Year Plan
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/80 to-transparent"></span>
              </h3>

              <div className="space-y-8 relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 via-primary/20 to-transparent"></div>

                <StaggerContainer staggerChildren={0.2} delayChildren={0.6}>
                  {yearPlanItems.map((item, index) => (
                    <AnimationWrapper key={index} direction="right">
                      <div
                        className="relative flex items-start"
                        onMouseEnter={() => setActiveYear(index)}
                        onMouseLeave={() => setActiveYear(null)}
                      >
                        <div
                          className={`timeline-dot absolute left-5 w-4 h-4 rounded-full bg-background transform -translate-x-1/2 transition-all duration-300 ${
                            activeYear === index ? "scale-125 border-2 border-primary" : "border border-primary/50"
                          }`}
                        ></div>

                        <div className="pl-10 flex items-start gap-4">
                          <div
                            className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                              activeYear === index
                                ? "bg-primary text-background shadow-md shadow-primary/20"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            <item.icon className="h-6 w-6" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">
                                <span className="text-primary mr-2">{item.year}:</span>
                                {item.title}
                              </h4>
                              <ChevronRight
                                size={16}
                                className={`transition-all duration-300 ${activeYear === index ? "opacity-100" : "opacity-0"}`}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </AnimationWrapper>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}
