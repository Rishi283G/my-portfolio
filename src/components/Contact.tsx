import { useState, useEffect, useRef } from "react";
import { Github, Mail, Send, ArrowRight, Loader2, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formCompleted, setFormCompleted] = useState(0);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -100px 0px" });

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  useEffect(() => {
    // Calculate form completion percentage
    const totalFields = 3;
    let filledFields = 0;

    if (formData.name.trim()) filledFields++;
    if (formData.email.trim()) filledFields++;
    if (formData.message.trim()) filledFields++;

    setFormCompleted((filledFields / totalFields) * 100);
  }, [formData]);

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
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      id: "email",
      icon: Mail,
      title: "Email",
      value: "jadhavrushikesh283@gmail.com",
      link: "mailto:jadhavrushikesh283@gmail.com",
    },
    {
      id: "github",
      icon: Github,
      title: "GitHub",
      value: "@rushikesh",
      link: "https://github.com/rishi283g",
    },
    {
      id: "location",
      icon: MapPin,
      title: "Location",
      value: "Pune, Maharashtra, India",
      link: null,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-muted/30 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl opacity-50"></div>
      </div>

      <motion.div
        className="container relative"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="text-center mb-16">
          <motion.h2
            className="font-poppins text-3xl md:text-4xl font-bold"
            variants={fadeInUp}
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.div
            className="mt-4 mx-auto max-w-xl"
            variants={fadeInUp}
          >
            <p className="text-muted-foreground">
              Have a question or want to work together? I'd love to hear from you!
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div variants={slideInLeft}>
            <Card className="border-border/50 h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden group">
              <motion.div
                className="absolute h-1 left-0 top-0 bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-700"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
              />
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Contact Information
                  <motion.div
                    className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <ExternalLink className="h-4 w-4 text-primary" />
                  </motion.div>
                </CardTitle>
                <CardDescription>
                  Feel free to reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.id}
                    variants={fadeInUp}
                    className="transition-all duration-300"
                  >
                    {method.link ? (
                      <motion.a
                        href={method.link}
                        target={method.id === "github" ? "_blank" : undefined}
                        rel={method.id === "github" ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-primary/5 transition-all duration-300 group/item"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="h-10 w-10 rounded-full bg-primary/10 group-hover/item:bg-primary/20 flex items-center justify-center transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <method.icon className="h-5 w-5 text-primary" />
                        </motion.div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{method.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {method.value}
                          </p>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          className="group-hover/item:opacity-100 group-hover/item:translate-x-1"
                        >
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </motion.div>
                      </motion.a>
                    ) : (
                      <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 transition-all duration-300">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <method.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{method.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {method.value}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  variants={fadeInUp}
                  className="p-5 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 mt-6 border border-border/30 transition-all duration-300"
                >
                  <p className="text-sm">
                    Currently open to freelance projects and full-time opportunities.
                    Let's build something amazing together!
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={slideInRight}>
            <Card className="border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden group relative">
              <motion.div
                className="absolute h-1 left-0 top-0 bg-gradient-to-r from-primary to-accent"
                animate={{ width: `${formCompleted}%` }}
                transition={{ duration: 0.3 }}
              />
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
                <CardDescription>
                  I'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  action="https://formspree.io/f/mzzeyqqd"
                  method="POST"
                  className="space-y-5"
                >
                  <motion.div
                    variants={fadeInUp}
                    className="space-y-2 transition-all duration-300"
                  >
                    <Label
                      htmlFor="name"
                      className={`transition-colors duration-300 ${
                        focusedField === "name" ? "text-primary" : ""
                      }`}
                    >
                      Name
                    </Label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your name"
                        required
                        className={`transition-all duration-300 ${
                          focusedField === "name"
                            ? "border-primary/50 shadow-sm shadow-primary/20"
                            : formData.name
                            ? "border-border bg-muted/30"
                            : ""
                        }`}
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    variants={fadeInUp}
                    className="space-y-2 transition-all duration-300"
                  >
                    <Label
                      htmlFor="email"
                      className={`transition-colors duration-300 ${
                        focusedField === "email" ? "text-primary" : ""
                      }`}
                    >
                      Email
                    </Label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your email"
                        required
                        className={`transition-all duration-300 ${
                          focusedField === "email"
                            ? "border-primary/50 shadow-sm shadow-primary/20"
                            : formData.email
                            ? "border-border bg-muted/30"
                            : ""
                        }`}
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    variants={fadeInUp}
                    className="space-y-2 transition-all duration-300"
                  >
                    <Label
                      htmlFor="message"
                      className={`transition-colors duration-300 ${
                        focusedField === "message" ? "text-primary" : ""
                      }`}
                    >
                      Message
                    </Label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your message"
                        rows={4}
                        required
                        className={`transition-all duration-300 resize-none ${
                          focusedField === "message"
                            ? "border-primary/50 shadow-sm shadow-primary/20"
                            : formData.message
                            ? "border-border bg-muted/30"
                            : ""
                        }`}
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <Button
                      type="submit"
                      className="w-full gap-2 relative overflow-hidden group/button"
                      disabled={isSubmitting}
                      as={motion.button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <motion.div
                          className="flex items-center gap-2"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                        >
                          <Send className="h-4 w-4" />
                          Send Message
                        </motion.div>
                      )}
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/button:opacity-10"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.1 }}
                      />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
              <motion.div
                variants={fadeInUp}
                className="text-xs text-muted-foreground pt-0 px-4 pb-4"
              >
                <p>All information is stored securely and never shared with third parties.</p>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}