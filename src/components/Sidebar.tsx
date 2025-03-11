
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Menu, X, Home, User, Code, Briefcase, 
  FileText, Sparkles, Github, Linkedin, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-mobile";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  isNew?: boolean;
  isExpanded: boolean;
};

const NavItem = ({ icon, label, to, isNew, isExpanded }: NavItemProps) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => `
      flex items-center p-2 rounded-lg transition-all
      ${isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50"}
      ${isExpanded ? "justify-start" : "justify-center"}
    `}
  >
    <div className="flex items-center">
      <div className="w-5 h-5">{icon}</div>
      {isExpanded && (
        <span className="ml-3 text-sm whitespace-nowrap">
          {label}
          {isNew && (
            <span className="ml-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              NEW
            </span>
          )}
        </span>
      )}
    </div>
  </NavLink>
);

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
      setIsSidebarHidden(true);
    } else {
      setIsSidebarHidden(false);
    }
  }, [isMobile]);
  
  // Main sidebar variants
  const sidebarVariants = {
    expanded: { width: 256, x: 0 },
    collapsed: { width: 64, x: 0 },
    hidden: { x: "-100%" }
  };

  return (
    <div className="flex h-screen relative">
      <motion.div 
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar border-r border-border transition-all duration-300 ${isSidebarHidden ? 'translate-x-[-100%]' : ''}`}
        initial={isExpanded ? "expanded" : (isSidebarHidden ? "hidden" : "collapsed")}
        animate={isExpanded ? "expanded" : (isSidebarHidden ? "hidden" : "collapsed")}
        variants={sidebarVariants}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {isExpanded && <h2 className="text-lg font-semibold">Main Menu</h2>}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full"
          >
            {isExpanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <NavItem 
            icon={<Home className="h-5 w-5" />} 
            label="Home" 
            to="/" 
            isExpanded={isExpanded} 
          />

          {/* Section divider */}
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
            isExpanded={isExpanded} 
          />
          <NavItem 
            icon={<Code className="h-5 w-5" />} 
            label="Projects" 
            to="/projects" 
            isExpanded={isExpanded} 
          />
          <NavItem 
            icon={<Briefcase className="h-5 w-5" />} 
            label="Experience" 
            to="/experience" 
            isExpanded={isExpanded} 
          />
          <NavItem 
            icon={<FileText className="h-5 w-5" />} 
            label="Blogs" 
            to="/blogs" 
            isExpanded={isExpanded} 
          />
          <NavItem 
            icon={<Sparkles className="h-5 w-5" />} 
            label="Make me a SE portfolio" 
            to="/portfolio-generator" 
            isExpanded={isExpanded}
            isNew={true}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          {isExpanded ? (
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">Connect with me</p>
              <div className="flex space-x-2">
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

      {/* Mobile sidebar toggle */}
      {isMobile && isSidebarHidden && (
        <Button 
          variant="secondary" 
          size="icon" 
          onClick={() => setIsSidebarHidden(false)}
          className="fixed top-4 left-4 z-50 rounded-full shadow-lg"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
