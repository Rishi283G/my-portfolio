import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-10">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I'm <span className="gradient-text">Rushikesh Jadhav</span>
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-poppins font-semibold">
              I build with passion, not permission.
            </p>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg">
              A self-taught aspiring software engineer from Radi, India.
              Currently building with React, JavaScript, and a whole lot of
              determination.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#projects">
                <Button className="gap-2">
                  View My Work
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="https://my-resume-puce-five.vercel.app/" download>
                <Button variant="outline" className="gap-2">
                  Download Resume
                  <Download className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-accent/50 blur-lg opacity-50"></div>
              <div className="relative aspect-square w-64 md:w-80 bg-muted rounded-full overflow-hidden border-4 border-background">
                <img
                  src="/lovable-uploads/9f3affde-eade-442b-b40d-f96efe92f2c0.png"
                  alt="Rushikesh Jadhav"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
