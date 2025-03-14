import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarStateType = "expanded" | "collapsed" | "hidden";

interface SidebarContextType {
  sidebarState: SidebarStateType;
  toggleSidebar: () => void;
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [sidebarState, setSidebarState] =
    useState<SidebarStateType>("expanded");
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setSidebarState("hidden");
    } else {
      setSidebarState("expanded");
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarState(sidebarState === "hidden" ? "expanded" : "hidden");
    } else {
      setSidebarState(sidebarState === "expanded" ? "collapsed" : "expanded");
    }
  };

  return (
    <SidebarContext.Provider value={{ sidebarState, toggleSidebar, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextType {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
