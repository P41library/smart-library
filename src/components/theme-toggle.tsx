import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      data-cursor="hover"
      className="relative flex h-9 w-16 items-center rounded-full border border-border bg-secondary/70 px-1 backdrop-blur transition-colors"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="grid h-7 w-7 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-soft"
        style={{ marginLeft: isDark ? "auto" : 0 }}
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </motion.span>
      </motion.span>
    </button>
  );
}
