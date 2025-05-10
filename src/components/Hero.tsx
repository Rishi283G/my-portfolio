import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimationWrapper } from "./anime";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    rotateX.set(-y);
    rotateY.set(x);
  };

  const imageShadow = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  return (
    <section className="min-h-screen flex items-center pt-20 pb-10">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT TEXT SECTION */}
          <div className="order-2 lg:order-1 space-y-6 animate-fade-in">
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

          {/* RIGHT IMAGE SECTION */}
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              className="relative group"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                rotateX.set(0);
                rotateY.set(0);
              }}
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/60 to-accent/30 blur-xl opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                initial={{ scale: 0.8 }}
                animate={{
                  scale: 1,
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="relative aspect-square w-64 md:w-80 bg-muted rounded-full overflow-hidden border-4 border-background shadow-2xl"
                style={{
                  transform: imageShadow,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-full h-full relative"
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src="/lovable-uploads/9f3affde-eade-442b-b40d-f96efe92f2c0.png"
                    alt="Rushikesh Jadhav"
                    className="w-full h-full object-cover scale-[1.15]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 mix-blend-multiply" />
                </motion.div>

                {/* Floating particles */}
                <motion.div
                  className="absolute top-10 left-10 w-2 h-2 rounded-full bg-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1, 0] }}
                  transition={{
                    delay: 0.5,
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-12 right-8 w-3 h-3 rounded-full bg-accent"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1, 0] }}
                  transition={{
                    delay: 1,
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
