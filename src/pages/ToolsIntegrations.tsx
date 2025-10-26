import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Plus, FileCode } from "lucide-react";

const ToolsIntegrations = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("tools");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (item === "workflow") {
      navigate("/");
    } else if (item === "agent") {
      navigate("/agent-chat");
    } else if (item === "tools") {
      navigate("/tools-integrations");
    }
  };

  const agentApps = [
    { name: "Google Drive", icon: "🗂️", description: "Store and access files", status: "Connect", hasUserTriggers: true },
    { name: "HubSpot", icon: "🎯", description: "CRM and marketing platform", status: "Connect", hasUserTriggers: false },
    { name: "Slack", icon: "💬", description: "Team communication", status: "Connect", hasUserTriggers: true },
    { name: "Notion", icon: "📝", description: "Notes and docs", status: "Coming soon", hasUserTriggers: false },
    { name: "Gmail", icon: "✉️", description: "Email management", status: "Connect", hasUserTriggers: true },
    { name: "Calendly", icon: "📅", description: "Schedule meetings", status: "Training soon", hasUserTriggers: false },
  ];

  const integrations = [
    { name: "Slack", icon: "💬", description: "Trigger workflows from Slack messages", status: "Connect" },
    { name: "Zapier", icon: "⚡", description: "Connect with 5000+ apps", status: "Connect" },
    { name: "Salesforce", icon: "☁️", description: "CRM integration", status: "Admin Required" },
    { name: "Microsoft Teams", icon: "👥", description: "Team collaboration triggers", status: "Connect" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Sidebar 
        activeItem={activeItem} 
        onItemClick={handleItemClick}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Tools & Integrations</h1>
              <p className="text-muted-foreground">Manage apps, internal tools, and integrations for your agents</p>
            </div>

            <Tabs defaultValue="agent-apps" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
                <TabsTrigger value="agent-apps">Agent Apps</TabsTrigger>
                <TabsTrigger value="internal-tools">Internal Tools</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>

              <TabsContent value="agent-apps" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {agentApps.map((app) => (
                    <Card key={app.name} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-4xl">{app.icon}</div>
                            <div>
                              <CardTitle className="text-lg">{app.name}</CardTitle>
                              <CardDescription>{app.description}</CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button 
                          className="w-full" 
                          variant={app.status === "Connect" ? "default" : "secondary"}
                          disabled={app.status !== "Connect"}
                        >
                          {app.status}
                        </Button>
                        {app.hasUserTriggers && (
                          <Button variant="outline" className="w-full">
                            User Triggers
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="internal-tools" className="space-y-6">
                <Card className="border-primary/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      Getting Started
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                        <p className="text-sm text-muted-foreground">Install the CLI tool to create custom tools for your agents</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                        <p className="text-sm text-muted-foreground">Define your tool's schema and implementation</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
                        <p className="text-sm text-muted-foreground">Deploy and use your tool in workflows</p>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Tool
                    </Button>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Internal Tools</h3>
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <FileCode className="w-16 h-16 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium text-muted-foreground mb-2">No tools found</p>
                      <p className="text-sm text-muted-foreground text-center max-w-md">
                        Create your first internal tool using the CLI or import existing tools from your codebase
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Platform integrations that can trigger your flows automatically. Connect external services to start automation workflows based on events.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {integrations.map((integration) => (
                    <Card key={integration.name} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">{integration.icon}</div>
                          <div>
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                            <CardDescription>{integration.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          className="w-full" 
                          variant={integration.status === "Connect" ? "default" : "secondary"}
                          disabled={integration.status === "Admin Required"}
                        >
                          {integration.status}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ToolsIntegrations;
