import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactFlow, Node, Edge, Controls, Background, BackgroundVariant, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string;
  title: string;
  description: string;
}

// Sample nodes for preview - Yellow for Manager, Blue for Processing
const getPreviewNodes = (templateId: string): Node[] => {
  const templates: Record<string, Node[]> = {
    default: [
      {
        id: '1',
        type: 'default',
        data: { label: 'Start Trigger' },
        position: { x: 100, y: 50 },
        style: { background: '#fef3c7', border: '2px solid #fbbf24', borderRadius: '8px', padding: '12px', fontSize: '12px' }
      },
      {
        id: '2',
        type: 'default',
        data: { label: 'Process Data' },
        position: { x: 100, y: 150 },
        style: { background: '#dbeafe', border: '2px solid #3b82f6', borderRadius: '8px', padding: '12px', fontSize: '12px' }
      },
      {
        id: '3',
        type: 'default',
        data: { label: 'Generate Output' },
        position: { x: 100, y: 250 },
        style: { background: '#dbeafe', border: '2px solid #3b82f6', borderRadius: '8px', padding: '12px', fontSize: '12px' }
      },
      {
        id: '4',
        type: 'default',
        data: { label: 'Send Result' },
        position: { x: 100, y: 350 },
        style: { background: '#fef3c7', border: '2px solid #fbbf24', borderRadius: '8px', padding: '12px', fontSize: '12px' }
      }
    ]
  };

  return templates[templateId] || templates.default;
};

const getPreviewEdges = (templateId: string): Edge[] => {
  return [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true }
  ];
};

const PreviewModal = ({ open, onOpenChange, templateId, title, description }: PreviewModalProps) => {
  const navigate = useNavigate();
  const [nodes] = useState<Node[]>(getPreviewNodes(templateId));
  const [edges] = useState<Edge[]>(getPreviewEdges(templateId));

  const handleUseTemplate = () => {
    onOpenChange(false);
    navigate(`/workflow-canvas/${templateId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] bg-white text-gray-900 p-0">
        {/* Two-Section Layout: 75% Visualization + 25% Info/Action */}
        <div className="flex h-[85vh]">
          
          {/* Left Section: Interactive Canvas (75%) */}
          <div className="w-[75%] border-r-2 border-gray-200 bg-gray-50 relative">
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">
                Drag to pan • Scroll to zoom • Preview only (no editing)
              </p>
            </div>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              fitView
              panOnDrag
              zoomOnScroll
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              minZoom={0.5}
              maxZoom={2}
            >
              <Controls showInteractive={false} />
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
              <MiniMap 
                nodeColor={(node) => {
                  return node.style?.background as string || '#ddd';
                }}
                maskColor="rgba(0, 0, 0, 0.1)"
              />
            </ReactFlow>
          </div>

          {/* Right Section: Info & Action (25%) */}
          <div className="w-[25%] flex flex-col p-8 bg-white">
            {/* Top: Template Info */}
            <div className="flex-1">
              <DialogHeader className="space-y-4">
                <DialogTitle className="text-3xl font-bold text-gray-900 leading-tight">
                  {title}
                </DialogTitle>
                <DialogDescription className="text-base text-gray-600 leading-relaxed">
                  {description}
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* Bottom: Action Button */}
            <div className="mt-auto">
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg py-6"
                onClick={handleUseTemplate}
              >
                Use this template
              </Button>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
