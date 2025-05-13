import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";

// Create a motion-enabled Button
const MotionButton = motion(Button);

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 }; // Lighter spring for faster response
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  // State to control welcome animation visibility
  const [showWelcome, setShowWelcome] = useState(false);

  // Particle state for animation
  const [particles, setParticles] = useState([]);

  // Welcome animation control
  const welcomeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Welcome screen animation variants
  const welcomeScreenVariants = {
    hidden: { opacity: 1, scale: 1 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0 } },
    exit: { opacity: 0, scale: 1.2, transition: { duration: 0.7, ease: "easeIn" } },
  };

  // Welcome text animation variants with 3D effect
  const welcomeTextVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: 60, y: 100 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0, 
      y: 0, 
      transition: { duration: 1.2, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      scale: 1.3, 
      rotateX: -30, 
      y: -100, 
      transition: { duration: 0.7 } 
    },
  };

  // Progress bar animation
  const progressVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: '100%', 
      transition: { duration: 10, ease: 'linear' } // Matches 10s welcome animation
    },
  };

  // Handle mouse movement for 3D tilt effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) / (width / 2); // Normalize to -1 to 1
    const y = (clientY - centerY) / (height / 2); // Normalize to -1 to 1
    rotateY.set(x * 10); // Reduced to 10deg for lighter feel
    rotateX.set(-y * 10); // Reduced to 10deg for lighter feel
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Reset rotation on mouse leave
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Image transform template
  const imageTransform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // Check sessionStorage and control welcome animation
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
      sessionStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  // Generate particles for animation and handle welcome animation timeout
  useEffect(() => {
    if (!showWelcome) return;

    const newParticles = Array.from({ length: 12 }, () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      color: Math.random() > 0.5 ? '#4F46E5' : '#EC4899',
    }));
    setParticles(newParticles);

    // Hide welcome animation after it completes
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [showWelcome]);

  return (
    <>
      <style>
        {`
          :root {
            --gradient-primary: linear-gradient(45deg, #4F46E5, #EC4899);
            --bg-gradient: linear-gradient(135deg, rgba(30, 41, 59, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%);
            --welcome-bg: radial-gradient(circle at center, rgba(30, 41, 59, 1) 0%, rgba(0, 0, 0, 1) 80%);
          }
        `}
      </style>

      {/* Enhanced Welcome Animation Overlay */}
      {showWelcome && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'var(--welcome-bg)' }}
          variants={welcomeScreenVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Progress Bar */}
          <motion.div
            className="absolute bottom-10 w-64 h-2 bg-white/20 rounded-full overflow-hidden"
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#4F46E5] to-[#EC4899]"
              variants={progressVariants}
              initial="hidden"
              animate="visible"
            />
          </motion.div>

          {/* Particle Animation */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                left: particle.x,
                top: particle.y,
                background: particle.color,
                boxShadow: `0 0 8px ${particle.color}80`,
                zIndex: 10,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [1, 1.5, 0.5],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Glowing Background Effect */}
          <motion.div
            className="absolute inset-0 z-5"
            style={{
              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Animated Welcome Text */}
          <motion.div variants={welcomeTextVariants} style={{ zIndex: 20 }}>
            <TypeAnimation
              sequence={[
                'Welcome', 1500,
                'स्वागत है', 1500,
                'Bienvenido', 1500,
                'ようこそ', 1500,
                'Willkommen', 1500,
                'ようこそ', 1500,
              ]}
              wrapper="h1"
              cursor={false}
              repeat={0}
              className="text-5xl md:text-7xl font-poppins font-bold"
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                transform: 'perspective(1000px)',
              }}
            />
          </motion.div>

          {/* Sparkle Effects */}
          <motion.div
            className="absolute w-2 h-2 bg-white rounded-full z-10"
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              opacity: [0, 1, 1, 0],
              scale: [0, 1.5, 1.5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            style={{ top: '40%', left: '60%' }}
          />
          <motion.div
            className="absolute w-3 h-3 bg-white rounded-full z-10"
            animate={{
              x: [-50, 50, -50, 50],
              y: [50, -50, 50, -50],
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1.2, 0],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            style={{ top: '60%', left: '40%' }}
          />
        </motion.div>
      )}

      {/* Main Hero Section */}
      <section
        className="min-h-screen flex items-center pt-20 pb-10"
        style={{ background: 'var(--bg-gradient)' }}
        role="banner"
      >
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT TEXT SECTION */}
            <motion.div
              className="order-2 lg:order-1 space-y-6"
              initial="hidden"
              animate="visible"
              variants={welcomeVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                variants={welcomeVariants}
                style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
              >
                Hi, I'm <span className="gradient-text">Rushikesh Jadhav</span>
              </motion.h1>

              <motion.div
                className="mt-4 text-xl md:text-2xl font-poppins font-semibold h-12"
                variants={welcomeVariants}
              >
                <TypeAnimation
                  sequence={[
                    'Frontend Developer.',
                    2000,
                    'React.js Enthusiast',
                    2000,
                    'Self-Taught Software Engineer',
                    2000,
                    'AI-Powered Developer in Progress',
                    2000,
                    'Learner. Builder. Dreamer.',
                    2000,
                    'Full Stack Explorer',
                    2000,
                    'Your Next Favorite Developer 🚀',
                    2000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  className="gradient-text"
                  style={{
                    fontSize: '1em',
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  }}
                />
              </motion.div>

              <motion.p
                className="mt-4 text-lg text-muted-foreground max-w-lg"
                variants={welcomeVariants}
                transition={{ delay: 0.4 }}
                style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}
              >
                A self-taught aspiring software engineer from Radi, India.
                Currently building with React, JavaScript, and a whole lot of
                determination.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                variants={welcomeVariants}
                transition={{ delay: 0.6 }}
              >
                <a href="#projects">
                  <MotionButton
                    className="gap-2"
                    aria-label="View my projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work
                    <ArrowRight className="h-4 w-4" />
                  </MotionButton>
                </a>
                <a href="https://my-resume-puce-five.vercel.app/" download>
                  <MotionButton
                    variant="outline"
                    className="gap-2"
                    aria-label="Download my resume"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Download Resume
                    <Download className="h-4 w-4" />
                  </MotionButton>
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT IMAGE SECTION */}
            <motion.div
              className="order-1 lg:order-2 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* PROFILE IMAGE */}
              <motion.div
                className="relative group"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: 1000, transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/60 to-accent/30 blur-xl opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: 1,
                    rotate: [0, 5, -5, 0],
                    y: [0, -15, 0],
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
                    transform: imageTransform,
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
                    style={{
                      x: rotateY, // Parallax effect
                      y: rotateX,
                      transition: 'transform 0.05s ease-out', // Faster transition
                    }}
                  >
                    <img
                      src="/lovable-uploads/9f3affde-eade-442b-b40d-f96efe92f2c0.png"
                      alt="Rushikesh Jadhav - Portfolio"
                      className="w-full h-full object-cover scale-[1.12]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 mix-blend-multiply" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}