import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Social Media Automation",
      description: "Automatically post content across multiple platforms based on scheduling rules",
      lastUpdated: "2 hours ago"
    },
    {
      title: "Lead Scoring System",
      description: "AI-powered lead qualification and routing based on engagement data",
      lastUpdated: "1 day ago"
    },
    {
      title: "Email Campaign Manager",
      description: "Automated email sequences with personalization and A/B testing",
      lastUpdated: "3 days ago"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-1">Recent Projects</h3>
          <p className="text-sm text-muted-foreground">
            Pick up where you left off or start something new
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">All</Button>
          <Button variant="ghost" size="sm">Recent projects</Button>
          <Button variant="ghost" size="sm">My Projects</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard isNew />
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
