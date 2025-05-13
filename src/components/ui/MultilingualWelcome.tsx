import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MultilingualWelcomeProps {
  onComplete?: () => void;
}

const MultilingualWelcome = ({ onComplete }: MultilingualWelcomeProps) => {
  const [visible, setVisible] = useState(true);
  
  // List of greetings in different languages
  const greetings = [
    { text: "Welcome", lang: "English" },
    { text: "नमस्ते", lang: "Hindi" },
    { text: "स्वागत", lang: "Marathi" },
    { text: "Bienvenue", lang: "French" },
    { text: "Bienvenido", lang: "Spanish" },
    { text: "Willkommen", lang: "German" },
    { text: "Benvenuto", lang: "Italian" },
    { text: "こんにちは", lang: "Japanese" },
    { text: "환영합니다", lang: "Korean" },
    { text: "欢迎", lang: "Chinese" },
    { text: "Bem-vindo", lang: "Portuguese" },
    { text: "Selamat Datang", lang: "Indonesian" }
  ];
  
  // Animation to auto-hide the welcome screen after some time
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  // Skip animation if user clicks
  const handleSkip = () => {
    setVisible(false);
    if (onComplete) onComplete();
  };
  
  if (!visible) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={handleSkip}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute -z-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-xl"
        />
        
        <div className="text-center relative">
          {greetings.map((greeting, index) => (
            <motion.div
              key={greeting.lang}
              className="absolute left-1/2 -translate-x-1/2 top-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: index === 0 ? [0, 1, 1, 0] : [0, 0, 1, 0],
                y: index === 0 ? [20, 0, 0, -20] : [40, 20, 0, -20]
              }}
              transition={{ 
                duration: 3.2,
                times: [0, 0.1, 0.9, 1],
                delay: index * 0.3,
                ease: "easeInOut"
              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {greeting.text}
              </h2>
              <p className="text-sm text-muted-foreground">{greeting.lang}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.p
          className="mt-32 text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Click anywhere to continue
        </motion.p>
      </div>
    </motion.div>
  );
};

// Adding explicit default export at the end
export default MultilingualWelcome;