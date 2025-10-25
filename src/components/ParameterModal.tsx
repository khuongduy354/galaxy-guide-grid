import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

interface ParameterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string;
  title: string;
}

const ParameterModal = ({ open, onOpenChange, templateId, title }: ParameterModalProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    workflowName: "",
    description: "",
    triggerType: "manual",
    targetAudience: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
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
      <DialogContent className="max-w-2xl bg-white text-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gray-900">Customize: {title}</DialogTitle>
          <DialogDescription className="text-base mt-2 text-gray-600">
            Provide initial parameters to customize this workflow template
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="workflowName" className="text-gray-700">
              Workflow Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="workflowName"
              placeholder="E.g., Social Media Content Automation"
              value={formData.workflowName}
              onChange={(e) => setFormData({ ...formData, workflowName: e.target.value })}
              className="border-gray-300 text-gray-900"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description of what this workflow will do..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-gray-300 text-gray-900 min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="triggerType" className="text-gray-700">
              Trigger Type
            </Label>
            <select
              id="triggerType"
              value={formData.triggerType}
              onChange={(e) => setFormData({ ...formData, triggerType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            >
              <option value="manual">Manual</option>
              <option value="schedule">Scheduled</option>
              <option value="webhook">Webhook</option>
              <option value="event">Event-based</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience" className="text-gray-700">
              Target Audience / Context
            </Label>
            <Input
              id="targetAudience"
              placeholder="E.g., Tech enthusiasts aged 25-35"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              className="border-gray-300 text-gray-900"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="text-gray-700"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              Submit & Create Workflow
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ParameterModal;
