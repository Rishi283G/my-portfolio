import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  animation?: {
    hover?: Record<string, unknown>
    tap?: Record<string, unknown>
    transition?: Record<string, unknown>
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, animation, ...props }, ref) => {
    const Comp = asChild ? motion(Slot) : motion.button
    const shouldReduceMotion = useReducedMotion()

    // Default animations
    const defaultAnimations = {
      hover: { scale: 1.05, boxShadow: "0 4px 14px rgba(0,0,0,0.1)" },
      tap: { scale: 0.98 },
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }

    // Entrance animation
    const entranceAnimation = shouldReduceMotion ? {} : {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "0px 0px -50px 0px" }
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={shouldReduceMotion ? undefined : animation?.hover ?? defaultAnimations.hover}
        whileTap={shouldReduceMotion ? undefined : animation?.tap ?? defaultAnimations.tap}
        transition={animation?.transition ?? defaultAnimations.transition}
        {...entranceAnimation}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }