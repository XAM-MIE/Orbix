'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Mic, 
  CreditCard, 
  Video, 
  Mail,
  Cloud,
  Zap,
  Settings,
  Plus,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const integrations = [
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Backend-as-a-Service for database and authentication',
    icon: Database,
    color: 'bg-green-500',
    category: 'Database',
    connected: true,
    popular: true,
    features: ['Authentication', 'Database', 'Storage', 'Edge Functions']
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'AI-powered text-to-speech and voice synthesis',
    icon: Mic,
    color: 'bg-purple-500',
    category: 'AI Voice',
    connected: false,
    popular: true,
    features: ['Text-to-Speech', 'Voice Cloning', 'Multiple Languages']
  },
  {
    id: 'revenuecat',
    name: 'RevenueCat',
    description: 'In-app purchases and subscription management',
    icon: CreditCard,
    color: 'bg-blue-500',
    category: 'Payments',
    connected: false,
    popular: true,
    features: ['Subscriptions', 'Analytics', 'A/B Testing']
  },
  {
    id: 'tavus',
    name: 'Tavus',
    description: 'AI-generated personalized videos at scale',
    icon: Video,
    color: 'bg-red-500',
    category: 'Video',
    connected: false,
    popular: false,
    features: ['Video Generation', 'Personalization', 'API Integration']
  },
  {
    id: 'resend',
    name: 'Resend',
    description: 'Email API for developers',
    icon: Mail,
    color: 'bg-orange-500',
    category: 'Email',
    connected: false,
    popular: false,
    features: ['Transactional Email', 'Templates', 'Analytics']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Platform for deploying and hosting applications',
    icon: Cloud,
    color: 'bg-gray-900',
    category: 'Deployment',
    connected: true,
    popular: true,
    features: ['Instant Deployment', 'Edge Functions', 'Analytics']
  }
];

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Database', 'AI Voice', 'Payments', 'Video', 'Email', 'Deployment'];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Integrations</h1>
                <p className="text-muted-foregroun mb-4">
                  Connect your favorite services to supercharge your apps
                </p>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">
                    {connectedCount} Connected
                  </Badge>
                  <Badge variant="outline">
                    {integrations.length - connectedCount} Available
                  </Badge>
                </div>
              </div>

              <Tabs defaultValue="browse" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="browse">Browse</TabsTrigger>
                  <TabsTrigger value="connected">Connected</TabsTrigger>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                </TabsList>

                <TabsContent value="browse" className="space-y-6">
                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search integrations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category === 'all' ? 'All' : category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Popular Integrations */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Popular Integrations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredIntegrations
                        .filter(integration => integration.popular)
                        .map((integration) => (
                        <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-lg ${integration.color} flex items-center justify-center`}>
                                  <integration.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                                  <Badge variant="secondary" className="text-xs">
                                    {integration.category}
                                  </Badge>
                                </div>
                              </div>
                              {integration.connected ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <Switch />
                              )}
                            </div>
                            <CardDescription>{integration.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium mb-2">Features:</p>
                                <div className="flex flex-wrap gap-1">
                                  {integration.features.map((feature, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  className="flex-1"
                                  variant={integration.connected ? 'outline' : 'default'}
                                >
                                  {integration.connected ? (
                                    <>
                                      <Settings className="w-4 h-4 mr-2" />
                                      Configure
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-4 h-4 mr-2" />
                                      Connect
                                    </>
                                  )}
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* All Integrations */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">All Integrations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredIntegrations.map((integration) => (
                        <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-lg ${integration.color} flex items-center justify-center`}>
                                  <integration.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                                  <Badge variant="secondary" className="text-xs">
                                    {integration.category}
                                  </Badge>
                                </div>
                              </div>
                              {integration.connected ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <Switch />
                              )}
                            </div>
                            <CardDescription>{integration.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium mb-2">Features:</p>
                                <div className="flex flex-wrap gap-1">
                                  {integration.features.map((feature, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  className="flex-1"
                                  variant={integration.connected ? 'outline' : 'default'}
                                >
                                  {integration.connected ? (
                                    <>
                                      <Settings className="w-4 h-4 mr-2" />
                                      Configure
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-4 h-4 mr-2" />
                                      Connect
                                    </>
                                  )}
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="connected" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {integrations
                      .filter(integration => integration.connected)
                      .map((integration) => (
                      <Card key={integration.id} className="border-green-200 dark:border-green-800">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-lg ${integration.color} flex items-center justify-center`}>
                                <integration.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{integration.name}</CardTitle>
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  Connected
                                </Badge>
                              </div>
                            </div>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                          <CardDescription>{integration.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Status</span>
                              <span className="text-green-600 font-medium">Active</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Last sync</span>
                              <span>2 minutes ago</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Settings className="w-4 h-4 mr-2" />
                                Configure
                              </Button>
                              <Button size="sm" variant="ghost">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="custom" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Custom Integration</CardTitle>
                      <CardDescription>
                        Add your own API endpoints and webhooks
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Integration Name</Label>
                          <Input id="name" placeholder="My Custom API" />
                        </div>
                        <div>
                          <Label htmlFor="endpoint">API Endpoint</Label>
                          <Input id="endpoint" placeholder="https://api.example.com" />
                        </div>
                        <div>
                          <Label htmlFor="apiKey">API Key</Label>
                          <Input id="apiKey" type="password" placeholder="Your API key" />
                        </div>
                        <div>
                          <Label htmlFor="method">HTTP Method</Label>
                          <Input id="method" placeholder="GET, POST, PUT, DELETE" />
                        </div>
                      </div>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Integration
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Webhook Configuration</CardTitle>
                      <CardDescription>
                        Set up webhooks to receive real-time updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="webhookUrl">Webhook URL</Label>
                        <Input id="webhookUrl" placeholder="https://your-app.com/webhook" />
                      </div>
                      <div>
                        <Label htmlFor="events">Events</Label>
                        <Input id="events" placeholder="user.created, payment.completed" />
                      </div>
                      <Button>
                        <Zap className="w-4 h-4 mr-2" />
                        Create Webhook
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}