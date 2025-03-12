
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import ConversationInterface from "./ConversationInterface";

export default function MainLayout() {
  const [sidebarState, setSidebarState] = useState<"expanded" | "collapsed" | "hidden">("expanded");
  const isMobile = useIsMobile();

  // Watch for sidebar state changes by checking element width
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebarEl = document.querySelector('[class*="fixed inset-y-0 left-0"]');
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
        attributeFilter: ["style", "class"] 
      });
    }

    // Set up resize event listener to handle window resize
    window.addEventListener('resize', checkSidebarState);

    // Clean up
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkSidebarState);
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />

      <div 
        className={`flex-1 flex flex-col w-full transition-all duration-300 ${
          isMobile ? 'ml-0' : 
          sidebarState === "expanded" ? 'ml-64' : 
          sidebarState === "collapsed" ? 'ml-16' : 'ml-0'
        }`}
      >
        {/* Top navigation */}
        <header className="sticky top-0 z-30 border-b border-border h-14 flex justify-end items-center px-4 sm:px-6 bg-background/80 backdrop-blur-sm">
          <ThemeToggle />
        </header>

        {/* Main content with conversation interface */}
        <ConversationInterface>
          <Outlet />
        </ConversationInterface>
      </div>
    </div>
  );
}
