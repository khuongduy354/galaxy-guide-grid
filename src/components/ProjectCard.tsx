import { FileText, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title?: string;
  description?: string;
  lastUpdated?: string;
  isNew?: boolean;
}

const ProjectCard = ({ title, description, lastUpdated, isNew = false }: ProjectCardProps) => {
  return (
    <div className="group relative border border-border rounded-xl p-6 bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer">
      {isNew ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[180px] text-center">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
            <FileText className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Start from scratch
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
          
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {description}
            </p>
          )}
          {lastUpdated && (
            <p className="text-xs text-muted-foreground">
              Updated {lastUpdated}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectCard;
