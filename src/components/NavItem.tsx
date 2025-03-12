import React from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  badge?: boolean;
  onClick?: () => void;
  isExpanded: boolean;
};

export const NavItem = ({
  icon,
  label,
  to,
  badge,
  onClick,
  isExpanded,
}: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center p-2 rounded-lg transition-all
      ${
        isActive
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:bg-secondary/50"
      }
      ${isExpanded ? "justify-start" : "justify-center"}
    `}
    onClick={onClick}>
    <div className={`flex items-center ${!isExpanded && "justify-center"}`}>
      <div className="w-5 h-5 flex-shrink-0">{icon}</div>
      {isExpanded && (
        <span className="ml-3 text-sm whitespace-nowrap">
          {label}
          {badge && (
            <span className="ml-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              Old
            </span>
          )}
        </span>
      )}
    </div>
  </NavLink>
);
