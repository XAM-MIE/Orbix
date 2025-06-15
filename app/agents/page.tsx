'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  Send, 
  History, 
  FileText, 
  Code, 
  Eye, 
  Lightbulb,
  Zap,
  MessageSquare,
  Clock,
  User,
  Sparkles,
  Play,
  Download
} from 'lucide-react';

const agentTypes = [
  {
    id: 'ui-generator',
    name: 'UI Generator',
    description: 'Creates beautiful user interfaces from descriptions',
    icon: Eye,
    color: 'bg-blue-500',
    active: true
  },
  {
    id: 'code-explainer',
    name: 'Code Explainer',
    description: 'Explains code functionality and best practices',
    icon: Code,
    color: 'bg-green-500',
    active: false
  },
  {
    id: 'api-builder',
    name: 'API Builder',
    description: 'Generates REST API endpoints and documentation',
    icon: Zap,
    color: 'bg-purple-500',
    active: false
  },
  {
    id: 'design-critic',
    name: 'Design Critic',
    description: 'Provides feedback on UI/UX design decisions',
    icon: Lightbulb,
    color: 'bg-orange-500',
    active: false
  }
];

const chatHistory = [
  {
    id: 1,
    type: 'user',
    content: 'Create a modern dashboard with cards showing key metrics',
    timestamp: '2:30 PM'
  },
  {
    id: 2,
    type: 'agent',
    content: 'I\'ll create a modern dashboard for you with metric cards. Let me generate the UI components with a clean, professional design.',
    timestamp: '2:31 PM',
    actions: ['Generate UI', 'Show Code']
  },
  {
    id: 3,
    type: 'user',
    content: 'Make the cards more colorful and add some animations',
    timestamp: '2:35 PM'
  },
  {
    id: 4,
    type: 'agent',
    content: 'Perfect! I\'ve updated the dashboard with vibrant gradient cards and smooth hover animations. The cards now have a more engaging visual appeal.',
    timestamp: '2:36 PM',
    actions: ['View Updated UI', 'Export Code']
  }
];

const actionHistory = [
  { action: 'Generated Dashboard UI', time: '2:36 PM', type: 'ui' },
  { action: 'Explained React Hooks', time: '2:20 PM', type: 'code' },
  { action: 'Created API Endpoint', time: '2:15 PM', type: 'api' },
  { action: 'Reviewed Design System', time: '2:10 PM', type: 'design' },
];

export default function AgentsPage() {
  const [message, setMessage] = useState('');
  const [activeAgent, setActiveAgent] = useState('ui-generator');
  const [scratchpadNotes, setScratchpadNotes] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Handle message sending logic here
    setMessage('');
  };

  const currentAgent = agentTypes.find(agent => agent.id === activeAgent);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex">
          {/* Agent Selection Sidebar */}
          <div className="w-80 border-r flex flex-col">
            <div className="border-b p-4">
              <h2 className="text-xl font-bold mb-2">AI Agents</h2>
              <p className="text-sm text-muted-foreground">
                Specialized AI assistants for different tasks
              </p>
            </div>
            
            <div className="flex-1 p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Available Agents</h3>
                <div className="space-y-2">
                  {agentTypes.map((agent) => (
                    <Card 
                      key={agent.id}
                      className={`cursor-pointer transition-all ${
                        activeAgent === agent.id ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/20' : 'hover:shadow-md'
                      }`}
                      onClick={() => setActiveAgent(agent.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg ${agent.color} flex items-center justify-center`}>
                            <agent.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{agent.name}</h4>
                            <p className="text-xs text-muted-foreground">{agent.description}</p>
                          </div>
                          {agent.active && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Recent Actions</h3>
                <div className="space-y-2">
                  {actionHistory.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.action}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${currentAgent?.color} flex items-center justify-center`}>
                    <currentAgent.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">{currentAgent?.name}</h1>
                    <p className="text-sm text-muted-foreground">{currentAgent?.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Active</span>
                  </Badge>
                  <Button variant="outline" size="sm">
                    <History className="w-4 h-4 mr-2" />
                    History
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-4xl mx-auto">
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-4 ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {msg.type === 'agent' && (
                          <Bot className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                        )}
                        {msg.type === 'user' && (
                          <User className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                          {msg.actions && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {msg.actions.map((action, index) => (
                                <Button key={index} size="sm" variant="secondary" className="text-xs">
                                  {action === 'Generate UI' && <Eye className="w-3 h-3 mr-1" />}
                                  {action === 'Show Code' && <Code className="w-3 h-3 mr-1" />}
                                  {action === 'View Updated UI' && <Play className="w-3 h-3 mr-1" />}
                                  {action === 'Export Code' && <Download className="w-3 h-3 mr-1" />}
                                  {action}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <Textarea
                      placeholder={`Ask ${currentAgent?.name} to help you...`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[60px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <Button onClick={handleSendMessage} size="icon" className="bg-gradient-to-r from-purple-500 to-blue-500">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Scratchpad Sidebar */}
          <div className="w-80 border-l flex flex-col">
            <Tabs defaultValue="scratchpad" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="scratchpad">
                  <FileText className="w-4 h-4 mr-2" />
                  Notes
                </TabsTrigger>
                <TabsTrigger value="actions">
                  <Zap className="w-4 h-4 mr-2" />
                  Actions
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="scratchpad" className="flex-1 mt-0 p-4">
                <div className="h-full flex flex-col">
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Scratchpad</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep notes and ideas while working with agents
                    </p>
                  </div>
                  <Textarea
                    placeholder="Write your notes here..."
                    value={scratchpadNotes}
                    onChange={(e) => setScratchpadNotes(e.target.value)}
                    className="flex-1 resize-none"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="actions" className="flex-1 mt-0 p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Quick Actions</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Common tasks you can ask agents to perform
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Eye className="w-4 h-4 mr-2" />
                      Generate UI
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Code className="w-4 h-4 mr-2" />
                      Explain this code
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Zap className="w-4 h-4 mr-2" />
                      Create API endpoint
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Review design
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Optimize performance
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}