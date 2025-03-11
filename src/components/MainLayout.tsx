
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Search } from "lucide-react";
import Sidebar from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

const searchSuggestions = [
  {
    label: "Show me your projects",
    path: "/projects",
  },
  {
    label: "Tell me about yourself",
    path: "/about",
  },
  {
    label: "Show me your experience",
    path: "/experience",
  },
  {
    label: "What technologies do you use?",
    path: "/about",
  },
  {
    label: "How can I contact you?",
    path: "/about",
  },
];

export default function MainLayout() {
  const [searchValue, setSearchValue] = useState("");
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

    // Clean up
    return () => observer.disconnect();
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
          <div className="flex-1 max-w-md mr-4">
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    className="w-full h-9 rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 max-w-md" align="end">
                <div className="py-2">
                  {searchSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left px-3 py-2 text-sm"
                      asChild
                    >
                      <a href={suggestion.path}>{suggestion.label}</a>
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <ThemeToggle />
        </header>

        {/* Main content with fixed height and scrollable */}
        <main className="flex-1 flex flex-col relative">
          <div className="flex-1 overflow-y-auto py-8 px-4 sm:px-6">
            <Outlet />
          </div>
          
          {/* Fixed chat input at bottom */}
          <div className="sticky bottom-0 left-0 right-0 p-4 flex justify-center bg-gradient-to-t from-background via-background/95 to-transparent pb-6">
            <div className="w-full max-w-3xl bg-background border border-border rounded-lg shadow-lg">
              <div className="flex items-center px-3 py-2">
                <input
                  type="text"
                  placeholder="Send a message..."
                  className="flex-1 bg-transparent border-0 focus:outline-none text-sm"
                  disabled
                />
                <Button size="sm" className="ml-2" disabled>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
