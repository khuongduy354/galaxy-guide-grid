import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ReactFlow, Node, Edge, Controls, Background, useNodesState, useEdgesState, addEdge, Connection, BackgroundVariant } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Play, Save, Download, Share2, Edit, Check, Clock, AlertCircle, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    data: { 
      label: 'Product Name',
      status: 'completed',
      input: '5.7k',
      output: 'Shows'
    },
    position: { x: 250, y: 50 },
    style: { background: '#fef3c7', border: '2px solid #fbbf24', borderRadius: '8px', padding: '10px' }
  },
  {
    id: '2',
    type: 'default',
    data: { 
      label: 'Research Product',
      status: 'completed',
      input: 'Product data',
      output: 'Analysis'
    },
    position: { x: 250, y: 150 },
    style: { background: '#dbeafe', border: '2px solid #3b82f6', borderRadius: '8px', padding: '10px' }
  },
  {
    id: '3',
    type: 'default',
    data: { 
      label: 'Generate Ad Text',
      status: 'running',
      input: 'Analysis',
      output: 'Pending'
    },
    position: { x: 250, y: 250 },
    style: { background: '#dbeafe', border: '2px solid #3b82f6', borderRadius: '8px', padding: '10px' }
  },
  {
    id: '4',
    type: 'default',
    data: { 
      label: 'Describe Target Audience',
      status: 'running',
      input: 'User input',
      output: 'Pending'
    },
    position: { x: 450, y: 150 },
    style: { background: '#fef3c7', border: '2px solid #fbbf24', borderRadius: '8px', padding: '10px' }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e4-3', source: '4', target: '3', animated: true }
];

type ExecutionStatus = 'draft' | 'ready' | 'running' | 'completed' | 'failed';

const WorkflowCanvas = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [workflowStatus, setWorkflowStatus] = useState<ExecutionStatus>('running');
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [activeTab, setActiveTab] = useState("preview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Initialize chat messages from query parameter
  useEffect(() => {
    const query = searchParams.get('query');
    if (query && chatMessages.length === 0) {
      setChatMessages([
        {
          role: 'user',
          content: query
        },
        {
          role: 'assistant',
          content: "Great! I'll help you build this workflow. Let me gather some details to create the best automation for you. What are your target criteria for this automation?"
        }
      ]);
    }
  }, [searchParams]);

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, 
      { role: 'user', content: chatInput },
      { role: 'assistant', content: "I understand. I'm processing your requirements and will update the workflow accordingly..." }
    ]);
    setChatInput("");
  };

  const handleChatKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit();
    }
  };

  const handleItemClick = (item: string) => {
    if (item === "workflow") navigate("/");
    else if (item === "agent") navigate("/agent-chat");
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const workflowSteps = [
    { id: '1', name: 'Product Name', status: 'completed', input: '5.7k', output: 'Shows' },
    { id: '4', name: 'Describe Target Audience', status: 'running', input: 'User input', output: 'Pending' },
    { id: '2', name: 'Research Product', status: 'completed', input: 'Product data', output: 'Analysis' },
    { id: '3', name: 'Generate Ad Text', status: 'running', input: 'Analysis', output: 'Pending' }
  ];

  const consoleLog = [
    { time: '14:30:21', level: 'info', node: 'Product Name', message: 'Processing input: 5.7k records' },
    { time: '14:30:22', level: 'success', node: 'Product Name', message: 'Completed successfully' },
    { time: '14:30:23', level: 'info', node: 'Research Product', message: 'Starting analysis...' },
    { time: '14:30:25', level: 'success', node: 'Research Product', message: 'Analysis complete' },
    { time: '14:30:26', level: 'warning', node: 'Generate Ad Text', message: 'Waiting for target audience data' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'running':
        return <Clock className="w-4 h-4 text-yellow-600 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: ExecutionStatus) => {
    const variants = {
      draft: { label: 'Draft', className: 'bg-gray-500' },
      ready: { label: 'Ready', className: 'bg-green-500' },
      running: { label: 'Running', className: 'bg-yellow-500' },
      completed: { label: 'Completed', className: 'bg-blue-500' },
      failed: { label: 'Failed', className: 'bg-red-500' }
    };
    const { label, className } = variants[status];
    return <Badge className={className}>{label}</Badge>;
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        activeItem="workflow"
        onItemClick={handleItemClick}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <h1 className="font-semibold text-lg">Social Media Management Automation</h1>
            {getStatusBadge(workflowStatus)}
            <span className="text-xs text-muted-foreground">Auto-saved 2 min ago</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="gap-2">
            <Save className="w-4 h-4" />
            Save
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-accent">
            <Play className="w-4 h-4" />
            Run Workflow
          </Button>
        </div>
      </header>

      {/* Secondary Navigation */}
      <div className="border-b border-border bg-card px-6 py-2">
        <div className="flex gap-6">
          {['User Input', 'Generate', 'Output', 'Add Assets'].map((tab) => (
            <button
              key={tab}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
          </ReactFlow>
        </div>

        {/* Right Panel */}
        <div className="w-[40%] border-l border-border bg-card flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b px-6">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="console">Console</TabsTrigger>
              <TabsTrigger value="step">Step</TabsTrigger>
              <TabsTrigger value="theme">Theme</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-auto">
              <TabsContent value="preview" className="p-6 space-y-4 m-0 flex flex-col h-full">
                <div className="flex-1 space-y-4 overflow-auto">
                  {chatMessages.length === 0 ? (
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">
                        Start a conversation to build or refine your workflow
                      </p>
                    </div>
                  ) : (
                    chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Chat Input */}
                <Card className="p-4 border-2 border-primary/20">
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Continue the conversation to refine your workflow..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={handleChatKeyPress}
                      className="min-h-[80px] text-sm resize-none"
                      maxLength={2000}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleChatSubmit} size="sm" className="gap-2">
                        <Send className="w-4 h-4" />
                        Send
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="console" className="p-6 m-0">
                <div className="space-y-2 font-mono text-xs">
                  {consoleLog.map((log, i) => (
                    <div
                      key={i}
                      className={cn(
                        "p-2 rounded",
                        log.level === 'error' && "bg-red-500/10 text-red-600",
                        log.level === 'warning' && "bg-yellow-500/10 text-yellow-600",
                        log.level === 'success' && "bg-green-500/10 text-green-600",
                        log.level === 'info' && "bg-blue-500/10 text-blue-600"
                      )}
                    >
                      <span className="text-muted-foreground">[{log.time}]</span>{" "}
                      <span className="font-semibold">{log.node}:</span> {log.message}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="step" className="p-6 m-0">
                <div className="space-y-3">
                  <h3 className="font-semibold mb-4">Workflow Execution Flow</h3>
                  {workflowSteps.map((step) => (
                    <div
                      key={step.id}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50",
                        step.status === 'running' && "bg-yellow-500/10 border-yellow-500/30"
                      )}
                      onClick={() => {
                        // Highlight corresponding node
                        const updatedNodes = nodes.map(node => ({
                          ...node,
                          selected: node.id === step.id
                        }));
                        setNodes(updatedNodes);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(step.status)}
                          <div>
                            <p className="font-medium">{step.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Input: {step.input} → Output: {step.output}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="theme" className="p-6 m-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Canvas Theme</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-20">Light Mode</Button>
                      <Button variant="outline" className="h-20">Dark Mode</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Primary Color</h3>
                    <div className="flex gap-2">
                      {['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'].map((color) => (
                        <button
                          key={color}
                          className="w-10 h-10 rounded-full border-2"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      </div>
    </div>
  );
};

export default WorkflowCanvas;
