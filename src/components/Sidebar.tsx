import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Briefcase,
  FileText,
  Sparkles,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavItem } from "./NavItem";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const isMobile = useIsMobile();
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      setIsSidebarHidden(true); // Hidden by default on mobile
    } else {
      setIsSidebarHidden(false); // Always visible on desktop
      setIsExpanded(true); // Always expanded on desktop
    }
  }, [isMobile]);

  const handleNavLinkClick = () => {
    if (isMobile) {
      setIsSidebarHidden(true);
    }
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      setIsSidebarHidden(true);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarHidden(true);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && isSidebarHidden && (
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsSidebarHidden(false)}
          className="fixed top-4 left-4 z-50 rounded-full shadow-lg">
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Backdrop overlay for mobile */}
      {isMobile && !isSidebarHidden && (
        <div
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={handleOverlayClick}
        />
      )}

      <motion.div
        className="fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar border-r border-border transition-all duration-300"
        initial={isMobile ? { x: "-100%" } : { width: 256 }}
        animate={
          isMobile
            ? { x: isSidebarHidden ? "-100%" : 0, width: 256 }
            : { x: 0, width: isExpanded ? 256 : 70 }
        }>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="w-full flex justify-center">
            <button onClick={toggleSidebar}>
              <img className="h-25 w-25" src="/Logo.svg"></img>
            </button>
          </div>
          {isExpanded && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <NavItem
            icon={<Home className="h-5 w-5" />}
            label="Home"
            to="/"
            onClick={handleNavLinkClick}
            isExpanded={isExpanded}
          />

          {isExpanded && (
            <div className="pt-4 pb-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                CONVERSATIONS
              </div>
            </div>
          )}

          <NavItem
            icon={<User className="h-5 w-5" />}
            label="About Me"
            to="/about"
            onClick={handleNavLinkClick}
            isExpanded={isExpanded}
          />

          <NavItem
            icon={<Code className="h-5 w-5" />}
            label="Projects"
            to="/projects"
            onClick={handleNavLinkClick}
            isExpanded={isExpanded}
          />

          <NavItem
            icon={<Briefcase className="h-5 w-5" />}
            label="Experience"
            to="/experience"
            onClick={handleNavLinkClick}
            isExpanded={isExpanded}
          />

          <NavItem
            icon={<FileText className="h-5 w-5" />}
            label="Blogs"
            to="/blogs"
            onClick={handleNavLinkClick}
            isExpanded={isExpanded}
          />

          <NavItem
            icon={<Sparkles className="h-5 w-5" />}
            label="Make me a SE portfolio"
            to="/portfolio-generator"
            onClick={handleNavLinkClick}
            badge={true}
            isExpanded={isExpanded}
          />
        </div>

        <div className="w-full flex justify-center text-center p-4 border-t border-border">
          {isExpanded ? (
            <div className="text-sm">
              <p className="mb-2">Connect with me</p>
              <div className="flex">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
