import { Bot, Settings, Menu, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const Sidebar = ({ 
  activeItem = "workflow", 
  onItemClick,
  collapsed = false,
  onCollapsedChange
}: SidebarProps) => {
  const handleToggle = () => {
    const newState = !collapsed;
    onCollapsedChange?.(newState);
  };
  
  const menuItems = [
    { id: "tempalte", label: "Template", icon: Workflow },
    { id: "agent", label: "Agent", icon: Bot },
    { id: "tools", label: "Tools & Integration", icon: Settings },
  ];

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Hamburger Menu */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <button
          onClick={handleToggle}
          className="w-10 h-10 rounded-lg hover:bg-sidebar-accent flex items-center justify-center transition-colors"
        >
          <Menu className="w-5 h-5 text-sidebar-foreground" />
        </button>
        {!collapsed && (
          <h1 className="text-lg font-bold text-sidebar-foreground">
            AutoFlow AI
          </h1>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive && "bg-primary text-primary-foreground shadow-md",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
