import { ArrowRight, Download, MousePointer2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState, useRef } from "react";
import { fadeIn, staggerContainer } from "./anime";
import ModelViewer from "./ModelViewer";

// Create a motion-enabled Button
const MotionButton = motion(Button);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const [showWelcome, setShowWelcome] = useState(false);
  const [particles, setParticles] = useState([]);

  // Progress bar animation
  const progressVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: '100%', 
      transition: { duration: 4, ease: 'easeInOut' } 
    },
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) / (width / 2);
    const y = (clientY - centerY) / (height / 2);
    rotateY.set(x * 15);
    rotateX.set(-y * 15);
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
      sessionStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  useEffect(() => {
    if (!showWelcome) return;
    const newParticles = Array.from({ length: 20 }, () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => setShowWelcome(false), 4500);
    return () => clearTimeout(timer);
  }, [showWelcome]);

  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center z-[100] bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative text-center"
            >
              <h2 className="text-sm font-outfit uppercase tracking-[0.3em] text-primary mb-4">Initializing</h2>
              <h1 className="text-5xl md:text-7xl font-outfit font-bold gradient-text">Portfolio</h1>
              
              <div className="mt-8 w-64 h-1 bg-white/5 rounded-full overflow-hidden mx-auto relative">
                <motion.div
                  className="h-full bg-primary"
                  variants={progressVariants}
                  initial="hidden"
                  animate="visible"
                />
              </div>
            </motion.div>

            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20"
      >
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 opacity-50 dark:opacity-100">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        {/* Dynamic Background Assets: 3D Model & Profile Aura */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full max-w-7xl mx-auto">
            {/* Profile Picture with animated glow */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full overflow-hidden blur-sm dark:blur-none opacity-20 dark:opacity-30"
            >
              <img 
                src="https://res.cloudinary.com/dts9o4fhd/image/upload/v1739854486/WhatsApp_Image_2025-02-18_at_10.21.32_AM_m867ia.jpg" 
                alt="Rushikesh Jadhav"
                className="w-full h-full object-cover grayscale dark:grayscale-0"
              />
            </motion.div>

            {/* 3D Model Layer */}
            <div className="absolute inset-0 z-10 opacity-40 dark:opacity-60">
              <ModelViewer 
                modelSrc="https://models.readyplayer.me/64b584e037149a850ca09503.glb"
                height="100vh"
                width="100vw"
                containerWidth="100vw"
                margin="0"
                backgroundColor="transparent"
                initialOrbit="0deg 85deg 4m"
                maxFieldOfView="40deg"
              />
            </div>
          </div>
        </div>

        <div className="container relative z-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer(0.2, 0.5)}
              className="space-y-8"
            >
              <motion.div
                variants={fadeIn("up", 0.1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-border/40 text-xs font-medium text-primary glow-primary mb-4"
              >
                <Sparkles className="h-3 w-3" />
                <span>Available for new projects</span>
              </motion.div>

              <motion.h1
                variants={fadeIn("up", 0.2)}
                className="font-outfit text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] text-foreground"
              >
                I BUILD <br />
                <span className="gradient-text">DIGITAL</span> MAGIC.
              </motion.h1>

              <motion.div
                variants={fadeIn("up", 0.3)}
                className="text-xl md:text-2xl font-outfit font-medium text-muted-foreground"
              >
                <TypeAnimation
                  sequence={[
                    'Frontend Developer.', 2000,
                    'React & Next.js Architect.', 2000,
                    'Self-Taught Engineer.', 2000,
                    'Creative Builder.', 2000,
                  ]}
                  repeat={Infinity}
                />
              </motion.div>

              <motion.p
                variants={fadeIn("up", 0.4)}
                className="text-lg text-muted-foreground max-w-2xl mx-auto font-inter leading-relaxed"
              >
                Based in India, I specialize in crafting high-end digital experiences 
                where code meets creativity. Turning complex problems into simple, 
                beautiful, and intuitive designs.
              </motion.p>

              <motion.div
                variants={fadeIn("up", 0.5)}
                className="flex flex-wrap items-center justify-center gap-6 pt-6"
              >
                <a href="#projects" className="z-30">
                  <MotionButton
                    size="lg"
                    className="h-14 px-8 rounded-full text-lg font-outfit font-semibold shadow-2xl shadow-primary/20 cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore My Work
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </MotionButton>
                </a>
                
                <a href="#contact" className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors p-2 cursor-pointer z-30">
                  <div className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                    <MousePointer2 className="h-4 w-4" />
                  </div>
                  <span className="font-outfit font-medium">Get in touch</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/30 font-medium">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>
    </>
  );
}
