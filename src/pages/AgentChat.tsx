import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Paperclip, RefreshCw, Plus } from "lucide-react";
import { toast } from "sonner";

const AgentChat = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'll help you build a custom workflow. What would you like to automate?"
    }
  ]);

  const suggestions = [
    "Summarize customer support tickets",
    "Triage GitHub issues automatically",
    "Store and organize inbound leads",
    "Generate social media content",
    "Automate email responses"
  ];

  const recentProjects = [
    { id: "1", name: "Customer Support Automation", lastModified: "2 hours ago" },
    { id: "2", name: "Lead Generation Pipeline", lastModified: "Yesterday" },
    { id: "3", name: "Social Media Manager", lastModified: "3 days ago" }
  ];

  const handleSubmit = () => {
    if (!input.trim()) return;
    
    toast.success("Creating your workflow...");
    navigate(`/workflow-canvas/new?query=${encodeURIComponent(input)}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleItemClick = (item: string) => {
    if (item === "workflow") navigate("/");
    else if (item === "agent") navigate("/agent-chat");
    else if (item === "manage") navigate("/tools-integrations");
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar 
        activeItem="agent" 
        onItemClick={handleItemClick}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col">
        <Header searchQuery="" onSearchChange={() => {}} />
        
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold">Build AI Powered Automations</h1>
              <p className="text-muted-foreground text-lg">
                Describe your workflow in natural language and watch it come to life
              </p>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <Card className="p-6 border-2 border-primary/20">
              <div className="space-y-4">
                <Textarea
                  placeholder="Describe the automation you want to build..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="min-h-[120px] text-base resize-none"
                  maxLength={2000}
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button onClick={handleSubmit} className="gap-2">
                    <Send className="w-4 h-4" />
                    Send
                  </Button>
                </div>
              </div>
            </Card>

            {/* Suggestion Chips */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, i) => (
                  <Button
                    key={i}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="rounded-full"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Recent Projects */}
            <div className="space-y-4 pt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Recent Projects</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card
                  className="p-6 border-2 border-dashed hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/workflow-canvas/new`)}
                >
                  <div className="flex flex-col items-center justify-center h-32 text-center">
                    <Plus className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="font-medium">Create New</p>
                  </div>
                </Card>
                {recentProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="p-6 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer"
                    onClick={() => navigate(`/workflow-canvas/${project.id}`)}
                  >
                    <div className="space-y-2">
                      <h3 className="font-semibold line-clamp-2">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Modified {project.lastModified}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentChat;
