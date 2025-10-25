import { useState } from "react";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthModal from "@/components/AuthModal";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between gap-6">
      {/* Logo/Company Name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <span className="text-sm font-bold text-primary-foreground">C</span>
        </div>
        <span className="font-semibold text-lg hidden md:block">Company Life + Home</span>
      </div>
      
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-secondary border-0"
          />
        </div>
      </div>
      
      {/* User Profile */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full flex-shrink-0"
        onClick={() => setShowAuthModal(true)}
      >
        <User className="w-5 h-5" />
      </Button>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </header>
  );
};

export default Header;
