import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import WorkflowGallery from "@/components/WorkflowGallery";
import FixedChatInput from "@/components/FixedChatInput";

const Index = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("workflow");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (item === "agent") {
      navigate("/agent-chat");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Sidebar 
        activeItem={activeItem} 
        onItemClick={handleItemClick}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <WorkflowGallery searchQuery={searchQuery} />
          </div>
        </main>

        <FixedChatInput sidebarCollapsed={sidebarCollapsed} />
      </div>
    </div>
  );
};

export default Index;
