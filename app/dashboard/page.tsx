'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Mic, 
  BookOpen, 
  Palette, 
  Zap,
  TrendingUp,
  Users,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
                <p className="text-muted-foreground">
                  Ready to build something amazing? Choose how you'd like to start.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <Mic className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-purple-600 transition-colors">
                          Start with Voice
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Describe your app idea
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-green-600 transition-colors">
                          Teach Me
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Learn while building
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-green-600 group-hover:translate-x-1 transition-all ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                        <Palette className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-orange-600 transition-colors">
                          Sketch an App
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Visual design first
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-orange-600 group-hover:translate-x-1 transition-all ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                        <p className="text-2xl font-bold">1,234</p>
                      </div>
                      <Users className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Build Time</p>
                        <p className="text-2xl font-bold">2.5h</p>
                      </div>
                      <Clock className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Deployments</p>
                        <p className="text-2xl font-bold">45</p>
                      </div>
                      <Zap className="w-8 h-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Projects */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>
                      Your latest app building sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">Task Manager Pro</h4>
                          <p className="text-sm text-muted-foreground">Web App • 2 hours ago</p>
                        </div>
                        <Badge variant="secondary">In Progress</Badge>
                      </div>

                      <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">Social Dashboard</h4>
                          <p className="text-sm text-muted-foreground">Mobile App • 1 day ago</p>
                        </div>
                        <Badge variant="default">Deployed</Badge>
                      </div>

                      <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                          <Palette className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">E-commerce Store</h4>
                          <p className="text-sm text-muted-foreground">Hybrid App • 3 days ago</p>
                        </div>
                        <Badge variant="outline">Draft</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                    <CardDescription>
                      Your journey to becoming a better builder
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">React Fundamentals</span>
                        <span className="text-sm text-muted-foreground">85%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">API Integration</span>
                        <span className="text-sm text-muted-foreground">60%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Database Design</span>
                        <span className="text-sm text-muted-foreground">40%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{width: '40%'}}></div>
                      </div>

                      <Button variant="outline" className="w-full mt-4">
                        Continue Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}