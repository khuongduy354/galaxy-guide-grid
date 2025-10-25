import { useState } from "react";
import WorkflowCard from "./WorkflowCard";
import { Button } from "@/components/ui/button";

interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  isPremium?: boolean;
  isPopular?: boolean;
  createdAt: Date;
}

const mockTemplates: WorkflowTemplate[] = [
  {
    id: "1",
    title: "Lead Scoring Automation",
    description: "Automatically score and prioritize incoming leads based on engagement and demographic data",
    category: "Sales",
    isPopular: true,
    createdAt: new Date(2025, 0, 15),
  },
  {
    id: "2",
    title: "Email Campaign Workflow",
    description: "Create personalized email sequences triggered by user behavior and engagement",
    category: "Marketing",
    isPremium: true,
    createdAt: new Date(2025, 0, 18),
  },
  {
    id: "3",
    title: "Customer Onboarding",
    description: "Streamline new customer onboarding with automated tasks and notifications",
    category: "Customer Success",
    createdAt: new Date(2025, 0, 10),
  },
  {
    id: "4",
    title: "Invoice Processing",
    description: "Automate invoice generation, approval workflows, and payment tracking",
    category: "Finance",
    isPremium: true,
    createdAt: new Date(2025, 0, 20),
  },
  {
    id: "5",
    title: "Support Ticket Triage",
    description: "Automatically categorize and route support tickets to the right team",
    category: "Support",
    isPopular: true,
    createdAt: new Date(2025, 0, 12),
  },
  {
    id: "6",
    title: "Social Media Scheduler",
    description: "Plan and automatically publish content across multiple social platforms",
    category: "Marketing",
    createdAt: new Date(2025, 0, 8),
  },
  {
    id: "7",
    title: "Data Backup Automation",
    description: "Schedule and execute automated backups of critical business data",
    category: "IT Operations",
    createdAt: new Date(2025, 0, 14),
  },
  {
    id: "8",
    title: "Employee Onboarding",
    description: "Coordinate tasks across HR, IT, and teams for new employee setup",
    category: "HR",
    isPremium: true,
    isPopular: true,
    createdAt: new Date(2025, 0, 22),
  },
  {
    id: "9",
    title: "Inventory Management",
    description: "Track stock levels and trigger reorder workflows automatically",
    category: "Operations",
    createdAt: new Date(2025, 0, 5),
  },
];

interface WorkflowGalleryProps {
  searchQuery: string;
}

const WorkflowGallery = ({ searchQuery }: WorkflowGalleryProps) => {
  const [sortBy, setSortBy] = useState<"popular" | "recent">("popular");

  // Filter templates based on search query
  const filteredTemplates = mockTemplates.filter(template => 
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort templates
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === "popular") {
      // Popular templates first, then by date
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else {
      // Sort by most recent
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  return (
    <div className="w-full mb-32">
      {/* Header with Sort Options */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Workflow Templates</h2>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "popular" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("popular")}
          >
            Popular
          </Button>
          <Button
            variant={sortBy === "recent" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("recent")}
          >
            Recent
          </Button>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTemplates.map((template) => (
          <WorkflowCard
            key={template.id}
            id={template.id}
            title={template.title}
            description={template.description}
            category={template.category}
            isPremium={template.isPremium}
            isPopular={template.isPopular}
          />
        ))}
      </div>

      {/* No Results */}
      {sortedTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No workflow templates found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkflowGallery;
