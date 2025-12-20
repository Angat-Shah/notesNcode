import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, BookOpen, Code, FileText, FlaskConical } from "lucide-react";

const floatingIcons = [
  { Icon: BookOpen, x: -180, y: -80, delay: 0 },
  { Icon: Code, x: 200, y: -60, delay: 0.5 },
  { Icon: FileText, x: -220, y: 60, delay: 1 },
  { Icon: FlaskConical, x: 180, y: 100, delay: 1.5 },
];

export function Hero() {
  const scrollToSemesters = () => {
    document.getElementById("semesters")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center max-w-3xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 backdrop-blur-sm text-sm font-medium text-muted-foreground mb-6 border border-border/50"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Open-source academic archive
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <img
            src="/logo.png"
            alt="notesNcode Logo"
            className="h-16 sm:h-20 md:h-24 w-auto mx-auto"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground mb-6"
        >
          notesNcode
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-xl sm:text-2xl text-muted-foreground font-normal mb-4 text-balance"
        >
          The systematic archive of an engineering journey.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-base text-muted-foreground/80 mb-10 text-balance"
        >
          A curated retrospective of four years in Computer Science. From foundational laboratory files to terminal examination archives, this repository preserves the documentation that shaped my academic trajectory—shared as a reference for peers and successors.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            onClick={scrollToSemesters}
            size="lg"
            className="rounded-full px-8 py-6 text-base font-medium shadow-soft hover:shadow-card transition-all duration-300"
          >
            Explore Semesters
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-base font-medium border-border/50 hover:bg-secondary hover:text-secondary-foreground"
            asChild
          >
            <a
              href="https://github.com/Angat-Shah/notesNcode"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-border/50 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
