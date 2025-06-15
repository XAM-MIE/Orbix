'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mic, 
  MicOff, 
  Send, 
  Code, 
  Eye, 
  Download, 
  Globe,
  RefreshCw,
  Sparkles,
  MessageSquare,
  Clock
} from 'lucide-react';

export default function BuildPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    {
      id: 1,
      type: 'system',
      content: 'Hi! I\'m your AI assistant. Describe the app you\'d like to build and I\'ll help you create it.',
      timestamp: new Date().toISOString()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: conversation.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setConversation([...conversation, newMessage]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: conversation.length + 2,
        type: 'assistant',
        content: 'Great idea! I\'ll help you build that. Let me start by creating the basic structure...',
        timestamp: new Date().toISOString()
      };
      setConversation(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex">
          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Voice Builder</h1>
                  <p className="text-sm text-muted-foreground">
                    Describe your app and watch it come to life
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Session: 15:42</span>
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Code
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500">
                    <Globe className="w-4 h-4 mr-2" />
                    Deploy with Netlify
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="flex-1 flex">
              {/* Conversation Area */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {conversation.map((msg) => (
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
                          {msg.type === 'assistant' && (
                            <Sparkles className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <p className="text-sm">{msg.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <Textarea
                        placeholder="Describe the app you want to build..."
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
                    <div className="flex flex-col space-y-2">
                      <Button
                        onClick={toggleRecording}
                        variant={isRecording ? "destructive" : "outline"}
                        size="icon"
                        className={isRecording ? "animate-pulse" : ""}
                      >
                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </Button>
                      <Button onClick={handleSendMessage} size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* UI Preview Area */}
              <div className="w-96 border-l flex flex-col">
                <div className="border-b p-4">
                  <h3 className="font-semibold">Live Preview</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time UI rendering
                  </p>
                </div>
                <div className="flex-1 p-4">
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your app preview will appear here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Sidebar */}
          <div className="w-80 border-l flex flex-col">
            <div className="border-b p-4">
              <h3 className="font-semibold">Generated Code</h3>
              <p className="text-sm text-muted-foreground">
                Live code preview & editing
              </p>
            </div>
            <div className="flex-1">
              <Tabs defaultValue="jsx" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="jsx">JSX</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
                  <TabsTrigger value="js">JS</TabsTrigger>
                </TabsList>
                <TabsContent value="jsx" className="flex-1 mt-0">
                  <div className="h-full p-4 overflow-auto">
                    <pre className="text-xs text-muted-foreground bg-muted/50 p-4 rounded-lg">
                      <code>{`// Your JSX code will appear here
function App() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <p>Start describing your app...</p>
    </div>
  );
}`}</code>
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="css" className="flex-1 mt-0">
                  <div className="h-full p-4 overflow-auto">
                    <pre className="text-xs text-muted-foreground bg-muted/50 p-4 rounded-lg">
                      <code>{`/* Your CSS styles will appear here */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}`}</code>
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="js" className="flex-1 mt-0">
                  <div className="h-full p-4 overflow-auto">
                    <pre className="text-xs text-muted-foreground bg-muted/50 p-4 rounded-lg">
                      <code>{`// Your JavaScript code will appear here
console.log('Ready to build!');`}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}