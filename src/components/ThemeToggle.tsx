import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
        theme === "dark" &&
          toast.success(
            <div style={{ display: "justify-center", alignItems: "center" }}>
              <img src="/my-eyes.gif" alt="My eyes" style={{ width: "100%" }} />
            </div>,
            {
              style: { width: "200px" },
            }
          );
      }}
      className="rounded-full">
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
