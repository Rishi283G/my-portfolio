
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container">
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

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="font-poppins text-2xl font-semibold mb-4">My Story</h3>
            <p className="mb-4">
              Born and raised in Radi village, I grew up with limited resources but unlimited curiosity. 
              Despite not having access to top-tier education, I've always been driven to learn and grow.
            </p>
            <p className="mb-4">
              After completing my studies at Z.P.H.S. Radi and Yashwantrao Chavan College, 
              I made the bold decision to pursue my passion for technology through self-education.
            </p>
            <p>
              Currently based in Pune, I'm on a mission to become a skilled full-stack developer. 
              Every day is a step forward in my journey of turning challenges into opportunities.
            </p>

            <blockquote className="quote">
              "The only way to do great work is to love what you do. If you haven't found it yet, 
              keep looking. Don't settle." - Steve Jobs
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-sm text-muted-foreground">Pune, Maharashtra, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Education</h4>
                  <p className="text-sm text-muted-foreground">Yashwantrao Chavan College</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Experience</h4>
                  <p className="text-sm text-muted-foreground">Self-taught Developer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-lg p-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-border">
            <h3 className="font-poppins text-2xl font-semibold mb-6">3-Year Plan</h3>
            
            <div className="space-y-6">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <h4 className="font-medium">Year 1: Foundation & First Projects</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Master HTML, CSS, JavaScript fundamentals. Build several small projects.
                  Complete React basics. Create a personal portfolio.
                </p>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <h4 className="font-medium">Year 2: Advanced Skills & Experience</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Deep dive into React ecosystem. Learn backend technologies.
                  Contribute to open source. Build full-stack applications.
                </p>
              </div>
              
              <div className="timeline-item before:h-0">
                <div className="timeline-dot"></div>
                <h4 className="font-medium">Year 3: Professional Growth</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Secure developer position. Continue learning advanced topics.
                  Mentor others from similar backgrounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
