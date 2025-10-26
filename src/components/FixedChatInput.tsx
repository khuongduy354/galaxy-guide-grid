import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface FixedChatInputProps {
  sidebarCollapsed?: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FixedChatInput = ({ 
  sidebarCollapsed = false,
  searchQuery,
  onSearchChange 
}: FixedChatInputProps) => {

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
          searchQuery ? "border-primary/40 shadow-[0_0_40px_rgba(var(--primary),0.3)]" : "border-primary/20"
        )}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
          <Search className="w-5 h-5 text-primary-foreground" />
        </div>
        <Input
          type="search"
          placeholder="Search for templates..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-lg px-0"
        />
      </div>
    </div>
  );
};

export default FixedChatInput;
