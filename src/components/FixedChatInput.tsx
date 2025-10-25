import { Bot, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FixedChatInputProps {
  sidebarCollapsed?: boolean;
}

const FixedChatInput = ({ sidebarCollapsed = false }: FixedChatInputProps) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;
    
    // Navigate directly to Workflow Canvas (SCR-003) with the query
    navigate(`/workflow-canvas/new?query=${encodeURIComponent(input)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Calculate positioning based on sidebar state
  const sidebarWidth = sidebarCollapsed ? 64 : 256;
  const leftOffset = sidebarWidth / 2;

  return (
    <div 
      className={cn(
        "fixed bottom-8 w-full max-w-3xl px-6 z-50 transition-all duration-300"
      )}
      style={{
        left: `${leftOffset}px`,
        transform: `translateX(calc(50vw - ${leftOffset}px - 50%))`
      }}
    >
      <div 
        className={cn(
          "flex items-center gap-4 px-6 py-4 bg-card border-2 rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-300",
          isFocused ? "border-primary/40 shadow-[0_0_40px_rgba(var(--primary),0.3)]" : "border-primary/20"
        )}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <Textarea
          placeholder="Chat here everything you want to come true"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 min-h-[40px] max-h-[120px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
          maxLength={2000}
        />
        <Button 
          onClick={handleSubmit} 
          size="icon"
          className="flex-shrink-0"
          disabled={!input.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default FixedChatInput;
