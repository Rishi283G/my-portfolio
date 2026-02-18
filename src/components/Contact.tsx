import { useState, useEffect } from "react";
import { Github, Mail, Send, ArrowRight, Loader2, MapPin, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { AnimationWrapper } from "./anime";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mzzeyqqd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message received! I'll get back to you shortly.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Connection error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "jadhavrushikesh283@gmail.com",
      link: "mailto:jadhavrushikesh283@gmail.com"
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      value: "github.com/rishi283g",
      link: "https://github.com/rishi283g"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Maharashtra, India",
    }
  ];

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Column: Context */}
            <div className="space-y-12">
              <AnimationWrapper type="fade" direction="up">
                <h2 className="text-sm font-outfit uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
                  Get in touch
                </h2>
                <h3 className="text-5xl md:text-6xl font-outfit font-bold text-foreground leading-tight">
                  Let's craft something <span className="gradient-text">exceptional.</span>
                </h3>
                <p className="text-muted-foreground font-inter text-lg leading-relaxed mt-6 max-w-md">
                  Whether you have a groundbreaking idea or just want to say hi, my inbox is always open. 
                  Let's make digital magic happen.
                </p>
              </AnimationWrapper>

              <div className="space-y-6">
                {contactInfo.map((info, idx) => (
                  <AnimationWrapper key={idx} type="fade" direction="right" delay={0.1 * idx}>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-5 p-5 rounded-3xl glass border-border/40 hover:border-primary/20 hover:bg-accent/5 transition-all group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          {info.icon}
                        </div>
                        <div>
                          <p className="text-[10px] font-outfit font-bold uppercase tracking-widest text-muted-foreground/40 mb-1">{info.label}</p>
                          <p className="text-foreground font-medium">{info.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-5 p-5 rounded-3xl glass border-border/40">
                        <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center text-muted-foreground/40">
                          {info.icon}
                        </div>
                        <div>
                          <p className="text-[10px] font-outfit font-bold uppercase tracking-widest text-muted-foreground/40 mb-1">{info.label}</p>
                          <p className="text-muted-foreground/60 font-medium">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </AnimationWrapper>
                ))}
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="relative">
              <AnimationWrapper type="fade" direction="left">
                <div className="p-10 rounded-[2.5rem] glass border-border/40 relative overflow-hidden backdrop-blur-2xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-20" />
                  
                  <h4 className="text-2xl font-outfit font-bold text-foreground mb-8 flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Send a Message
                  </h4>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className={`text-xs font-outfit font-bold uppercase tracking-widest transition-colors ${focusedField === 'name' ? 'text-primary' : 'text-muted-foreground/40'}`}>Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        className="h-14 rounded-2xl bg-accent/5 border-border/40 focus:border-primary/50 focus:ring-primary/20 text-foreground font-inter placeholder:text-muted-foreground/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className={`text-xs font-outfit font-bold uppercase tracking-widest transition-colors ${focusedField === 'email' ? 'text-primary' : 'text-muted-foreground/40'}`}>Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="john@example.com"
                        className="h-14 rounded-2xl bg-accent/5 border-border/40 focus:border-primary/50 focus:ring-primary/20 text-foreground font-inter placeholder:text-muted-foreground/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className={`text-xs font-outfit font-bold uppercase tracking-widest transition-colors ${focusedField === 'message' ? 'text-primary' : 'text-muted-foreground/40'}`}>Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="How can I help you?"
                        className="rounded-2xl bg-accent/5 border-border/40 focus:border-primary/50 focus:ring-primary/20 text-foreground font-inter placeholder:text-muted-foreground/20 resize-none p-4"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-black font-outfit font-extrabold text-lg gap-2 cursor-pointer shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </AnimationWrapper>

              {/* Decorative Glow */}
              <div className="absolute -z-10 bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}