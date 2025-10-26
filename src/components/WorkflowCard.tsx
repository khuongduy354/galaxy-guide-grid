import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PreviewModal from "./PreviewModal";
import ParameterModal from "./ParameterModal";

interface WorkflowCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  isPremium?: boolean;
  isPopular?: boolean;
}

const WorkflowCard = ({ 
  id, 
  title, 
  description, 
  category, 
  isPremium = false,
  isPopular = false 
}: WorkflowCardProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showParameters, setShowParameters] = useState(false);

  return (
    <>
      <div 
        className="group relative aspect-square border border-border rounded-xl p-6 bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden"
      >
        {/* Badges - Always visible with highest z-index */}
        <div className="absolute top-4 right-4 flex gap-2 z-20 pointer-events-none">
          {isPopular && (
            <Badge variant="secondary" className="bg-accent text-accent-foreground shadow-lg">
              Popular
            </Badge>
          )}
          {isPremium && (
            <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg">
              Upgrade
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col h-full relative z-0">
          <span className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            {category}
          </span>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
            {description}
          </p>
        </div>

        {/* Hover Overlay with TWO Buttons */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
          <Button 
            size="lg"
            variant="outline"
            className="border-2"
            onClick={(e) => {
              e.stopPropagation();
              setShowPreview(true);
            }}
          >
            Preview
          </Button>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={(e) => {
              e.stopPropagation();
              setShowParameters(true);
            }}
          >
            Use Template
          </Button>
        </div>
      </div>

      {/* Preview Modal - Interactive Canvas */}
      <PreviewModal
        open={showPreview}
        onOpenChange={setShowPreview}
        templateId={id}
        title={title}
        description={description}
      />

      {/* Parameter Collection Modal */}
      <ParameterModal
        open={showParameters}
        onOpenChange={setShowParameters}
        templateId={id}
        title={title}
      />
    </>
  );
};

export default WorkflowCard;
