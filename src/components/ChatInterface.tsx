import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatInterface = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Navigate to Workflow Canvas (SCR-003) with the query
      navigate(`/workflow-canvas/new?query=${encodeURIComponent(input)}`);
    }
  };

  const quickActions = [
    "Generate workflow report",
    "Triage Github issues",
    "Score inbound leads"
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
          <span className="text-sm font-medium text-primary-foreground">
            AI-Powered Automations
          </span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Build AI Powered Automations</h2>
        <p className="text-muted-foreground">
          Describe what you can do to automate and assist in create intelligent workflows for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative mb-6">
        <div className="relative border-2 border-accent/20 rounded-2xl bg-card overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the automation you want to build..."
            className="min-h-[120px] border-0 resize-none pr-12 text-base focus-visible:ring-0"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-3 bottom-3 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 justify-center">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => setInput(action)}
            className="rounded-full hover:border-primary hover:text-primary transition-colors"
          >
            {action}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChatInterface;
