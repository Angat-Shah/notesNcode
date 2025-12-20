import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-6 right-6 z-50 sm:top-8 sm:right-8"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={cn(
          "h-12 w-12 rounded-full backdrop-blur-xl border border-border/60",
          "bg-background/90 hover:bg-background dark:bg-background/80 dark:hover:bg-background/90",
          "shadow-lg hover:shadow-xl",
          "transition-all duration-300 ease-out",
          "group relative overflow-hidden",
          "hover:scale-105 active:scale-95"
        )}
        aria-label="Toggle theme"
      >
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 180 : 0,
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-5 w-5 text-foreground" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 0 : -180,
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-5 w-5 text-foreground" />
        </motion.div>
        
        {/* Subtle glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/5 dark:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </Button>
    </motion.div>
  );
}
