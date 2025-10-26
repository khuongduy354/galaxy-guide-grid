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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
  const [formData, setFormData] = useState({
    workflowName: "",
    description: "",
    triggerType: "manual",
    targetAudience: ""
  });

  const handleUseTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.workflowName.trim()) {
      toast.error("Please enter a workflow name");
      return;
    }

    // Navigate to canvas with parameters
    const params = new URLSearchParams({
      name: formData.workflowName,
      description: formData.description,
      trigger: formData.triggerType,
      audience: formData.targetAudience
    });
    
    onOpenChange(false);
    navigate(`/workflow-canvas/${templateId}?${params.toString()}`);
    toast.success("Template loaded successfully!");
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
          <div className="w-[25%] flex flex-col p-6 bg-white overflow-y-auto">
            {/* Top: Template Info */}
            <DialogHeader className="space-y-3 mb-6">
              <DialogTitle className="text-2xl font-bold text-gray-900 leading-tight">
                {title}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 leading-relaxed">
                {description}
              </DialogDescription>
            </DialogHeader>

            {/* Middle: Parameter Form */}
            <form onSubmit={handleUseTemplate} className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workflowName" className="text-gray-700 text-sm">
                  Workflow Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="workflowName"
                  placeholder="E.g., Social Media Automation"
                  value={formData.workflowName}
                  onChange={(e) => setFormData({ ...formData, workflowName: e.target.value })}
                  className="border-gray-300 text-gray-900"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700 text-sm">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="What will this workflow do?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border-gray-300 text-gray-900 min-h-[60px] text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="triggerType" className="text-gray-700 text-sm">
                  Trigger Type
                </Label>
                <select
                  id="triggerType"
                  value={formData.triggerType}
                  onChange={(e) => setFormData({ ...formData, triggerType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white text-sm"
                >
                  <option value="manual">Manual</option>
                  <option value="schedule">Scheduled</option>
                  <option value="webhook">Webhook</option>
                  <option value="event">Event-based</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience" className="text-gray-700 text-sm">
                  Target Audience / Context
                </Label>
                <Input
                  id="targetAudience"
                  placeholder="E.g., Tech enthusiasts"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="border-gray-300 text-gray-900"
                />
              </div>

              {/* Bottom: Action Button */}
              <div className="pt-4">
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  Use this template
                </Button>
              </div>
            </form>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
