import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import ConversationInterface from "./ConversationInterface";
import { Button } from "./ui/button";
import { Github, Link } from "lucide-react";

export default function MainLayout() {
  const [sidebarState, setSidebarState] = useState<
    "expanded" | "collapsed" | "hidden"
  >("expanded");
  const isMobile = useIsMobile();

  // Watch for sidebar state changes by checking element width
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebarEl = document.querySelector(
        '[class*="fixed inset-y-0 left-0"]'
      );
      if (!sidebarEl) return;

      const rect = sidebarEl.getBoundingClientRect();

      if (rect.left < 0) {
        setSidebarState("hidden");
      } else if (rect.width <= 70) {
        setSidebarState("collapsed");
      } else {
        setSidebarState("expanded");
      }
    };

    // Initial check
    checkSidebarState();

    // Set up a mutation observer to detect changes in the sidebar
    const observer = new MutationObserver(checkSidebarState);
    const sidebar = document.querySelector('[class*="fixed inset-y-0 left-0"]');

    if (sidebar) {
      observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    // Set up resize event listener to handle window resize
    window.addEventListener("resize", checkSidebarState);

    // Clean up
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkSidebarState);
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />

      <div
        className={`flex-1 flex flex-col w-full transition-all duration-300 ${
          isMobile
            ? "ml-0"
            : sidebarState === "expanded"
            ? "ml-64"
            : sidebarState === "collapsed"
            ? "ml-[70px]"
            : "ml-0"
        }`}>
        {/* Top navigation */}
        <header className="sticky top-0 z-30 border-b border-border h-16 flex justify-between items-center px-4 sm:px-6 bg-background/80 backdrop-blur-sm">
          {/* Left Side: GitHub and Résumé Links */}
          <div className="flex items-center">
            <a target="_blank" href="https://github.com/Zuhu162">
              <Button
                variant="default"
                className="btn-sm rounded-3xl h-8 w-8 mr-2">
                <Github />
              </Button>
            </a>
            <a
              target="_blank"
              href="https://drive.google.com/file/d/1XuXLi2UNpQKvp-dvLy926xHt9XLo0MzB/view?usp=sharing">
              <Button variant="outline" className="btn-sm">
                Résumé <Link />
              </Button>
            </a>
          </div>

          {/* Right Side: Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </header>

        {/* Main content with conversation interface */}
        <ConversationInterface>
          <Outlet />
        </ConversationInterface>
      </div>
    </div>
  );
}
