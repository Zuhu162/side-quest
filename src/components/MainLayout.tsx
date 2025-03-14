import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { useSidebar } from "./SidebarContext";
import ConversationInterface from "./ConversationInterface";
import { Button } from "./ui/button";
import { Github, Link } from "lucide-react";

interface HeaderExtensionProps {
  sidebarState: "expanded" | "collapsed" | "hidden";
  isMobile: boolean;
}

// Updated component for the fake header extension with precise border alignment
const HeaderExtension: React.FC<HeaderExtensionProps> = ({
  sidebarState,
  isMobile,
}) => {
  // Only show this when sidebar is visible
  if (isMobile || sidebarState === "hidden") return null;

  return (
    <div
      className={`fixed top-0 left-0 z-10 h-16 bg-background transition-all duration-300 ${
        sidebarState === "expanded" ? "w-64" : "w-[70px]"
      }`}
      style={{
        borderBottom: "1px solid var(--border)",
        boxSizing: "border-box",
      }}
    />
  );
};

const MainLayout: React.FC = () => {
  const { sidebarState, isMobile } = useSidebar();
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Add the fake header extension */}
      <HeaderExtension sidebarState={sidebarState} isMobile={isMobile} />

      {/* Original sidebar */}
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
        <header className="sticky top-0 z-20 border-b border-border h-16 flex justify-between items-center px-4 sm:px-6 bg-background">
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
        <div className="w-full h-full">
          <ConversationInterface currentPath={location.pathname}>
            <Outlet />
          </ConversationInterface>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
