
import { Calendar, GraduationCap, BookOpen, Award, Book, Lightbulb } from "lucide-react";

export default function Journey() {
  return (
    <section id="journey" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold">
            My <span className="gradient-text">Journey</span>
          </h2>
          <div className="mt-4 mx-auto max-w-xl">
            <p className="text-muted-foreground">
              The path of self-education and continuous growth.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="flex items-start gap-4">
                <GraduationCap className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">2015 - 2019</span>
                  </div>
                  <h3 className="text-xl font-semibold">Early Education</h3>
                  <p className="mt-2 text-muted-foreground">
                    Completed schooling at Z.P.H.S. Radi with limited exposure to technology 
                    but a strong foundation in core subjects and a curious mind.
                  </p>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="flex items-start gap-4">
                <BookOpen className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">2019 - 2021</span>
                  </div>
                  <h3 className="text-xl font-semibold">Yashwantrao Chavan College</h3>
                  <p className="mt-2 text-muted-foreground">
                    Gained exposure to computers and developed interest in technology.
                    First introduction to programming concepts and digital tools.
                  </p>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="flex items-start gap-4">
                <Lightbulb className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">2022</span>
                  </div>
                  <h3 className="text-xl font-semibold">The Self-Taught Decision</h3>
                  <p className="mt-2 text-muted-foreground">
                    Made the pivotal decision to pursue web development through self-education.
                    Started with HTML, CSS, and basic JavaScript using free online resources.
                  </p>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="flex items-start gap-4">
                <Award className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">2023</span>
                  </div>
                  <h3 className="text-xl font-semibold">First Certifications</h3>
                  <p className="mt-2 text-muted-foreground">
                    Completed freeCodeCamp certifications in Responsive Web Design and JavaScript Algorithms.
                    Built my first projects and started learning React.
                  </p>
                </div>
              </div>
            </div>

            <div className="timeline-item before:h-0">
              <div className="timeline-dot"></div>
              <div className="flex items-start gap-4">
                <Book className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">2024 - Present</span>
                  </div>
                  <h3 className="text-xl font-semibold">Current Journey</h3>
                  <p className="mt-2 text-muted-foreground">
                    Relocated to Pune to pursue my development career more seriously.
                    Working on building a portfolio of projects while continuing to learn React
                    and preparing for full-stack development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-poppins text-2xl font-semibold text-center mb-8">Certifications</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-card border border-border flex flex-col">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  2023
                </span>
              </div>
              <h4 className="text-lg font-medium">Responsive Web Design</h4>
              <p className="text-sm text-muted-foreground mt-2 flex-grow">
                freeCodeCamp certification covering HTML, CSS, and responsive design principles.
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">freeCodeCamp</span>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border flex flex-col">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  2024
                </span>
              </div>
              <h4 className="text-lg font-medium">JavaScript Algorithms</h4>
              <p className="text-sm text-muted-foreground mt-2 flex-grow">
                JavaScript data structures and algorithm certification from freeCodeCamp.
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">freeCodeCamp</span>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border flex flex-col">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  2024
                </span>
              </div>
              <h4 className="text-lg font-medium">be10x AI Workshop</h4>
              <p className="text-sm text-muted-foreground mt-2 flex-grow">
                Intensive workshop on AI applications and integration in modern web development.
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">be10x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
