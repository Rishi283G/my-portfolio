import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

// Animation Variants with Type Definitions
export const fadeIn = (
  direction: "up" | "down" | "left" | "right",
  delay: number
): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.8,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };
};

export const staggerContainer = (
  staggerChildren: number,
  delayChildren: number
): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  };
};

export const slideIn = (
  direction: "up" | "down" | "left" | "right",
  type: string,
  delay: number,
  duration: number
): Variants => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut"
      }
    }
  };
};

export const scale = (
  delay: number = 0,
  duration: number = 0.8
): Variants => {
  return {
    hidden: {
      scale: 0.8,
      opacity: 0
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay,
        duration,
        ease: "easeOut"
      }
    }
  };
};

// Props Interface for AnimationWrapper
interface AnimationWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  variants?: Variants;
  direction?: "up" | "down" | "left" | "right";
  type?: "fade" | "slide" | "scale";
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
}

export const AnimationWrapper = ({
  children,
  id,
  className = "",
  variants,
  direction,
  type,
  delay = 0,
  duration = 0.8,
  amount = 0.3,
  once = true
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  let chosenVariants: Variants;

  if (variants) {
    chosenVariants = variants;
  } else if (direction) {
    chosenVariants = fadeIn(direction, delay);
  } else if (type === "slide") {
    chosenVariants = slideIn(direction || "up", "tween", delay, duration);
  } else if (type === "scale") {
    chosenVariants = scale(delay, duration);
  } else {
    chosenVariants = fadeIn("up", delay);
  }

  return (
    <motion.div
      ref={ref}
      variants={chosenVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      id={id}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Props Interface for StaggerContainer
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  amount?: number;
  once?: boolean;
}

export const StaggerContainer = ({
  children,
  className = "",
  staggerChildren = 0.1,
  delayChildren = 0,
  amount = 0.3,
  once = true
}: StaggerContainerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(staggerChildren, delayChildren)}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};
