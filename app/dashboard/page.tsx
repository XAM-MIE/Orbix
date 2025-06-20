'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSidebar } from '@/contexts/SidebarContext';
import { 
  Plus, 
  Mic, 
  BookOpen, 
  Palette, 
  Zap,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

export default function DashboardPage() {
  const { isOpen } = useSidebar();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        {/* Mobile Sidebar */}
        <MobileSidebar />

        {/* Desktop Sidebar */}
        <div className={`transition-all duration-300 overflow-hidden hidden md:block ${isOpen ? 'w-64' : 'w-16'}`}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-8 pt-20 md:pt-4 lg:pt-8">
              <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 lg:mb-8">
                  <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back!</h1>
                  <p className="text-sm lg:text-base text-muted-foreground">
                    Ready to build something amazing? Choose how you&apos;d like to start.
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                  <Card
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => handleNavigation('/build')}
                  >
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                          <Mic className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm lg:text-base group-hover:text-purple-600 transition-colors truncate">
                            Start with Voice
                          </h3>
                          <p className="text-xs lg:text-sm text-muted-foreground">
                            Describe your app idea
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => handleNavigation('/mentor')}
                  >
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm lg:text-base group-hover:text-green-600 transition-colors truncate">
                            Teach Me
                          </h3>
                          <p className="text-xs lg:text-sm text-muted-foreground">
                            Learn while building
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-green-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group sm:col-span-2 lg:col-span-1"
                    onClick={() => handleNavigation('/design')}
                  >
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                          <Palette className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm lg:text-base group-hover:text-orange-600 transition-colors truncate">
                            Sketch an App
                          </h3>
                          <p className="text-xs lg:text-sm text-muted-foreground">
                            Visual design first
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-orange-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                  <Card>
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs lg:text-sm font-medium text-muted-foreground truncate">Total Projects</p>
                          <p className="text-xl lg:text-2xl font-bold">12</p>
                        </div>
                        <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs lg:text-sm font-medium text-muted-foreground truncate">Active Users</p>
                          <p className="text-xl lg:text-2xl font-bold">1,234</p>
                        </div>
                        <Users className="w-6 h-6 lg:w-8 lg:h-8 text-green-500 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs lg:text-sm font-medium text-muted-foreground truncate">Build Time</p>
                          <p className="text-xl lg:text-2xl font-bold">2.5h</p>
                        </div>
                        <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-purple-500 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs lg:text-sm font-medium text-muted-foreground truncate">Deployments</p>
                          <p className="text-xl lg:text-2xl font-bold">45</p>
                        </div>
                        <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-orange-500 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Projects */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg lg:text-xl">Recent Projects</CardTitle>
                      <CardDescription className="text-sm">
                        Your latest app building sessions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 lg:space-y-4">
                        <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 rounded-lg bg-muted/50">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm lg:text-base truncate">Task Manager Pro</h4>
                            <p className="text-xs lg:text-sm text-muted-foreground">Web App • 2 hours ago</p>
                          </div>
                          <Badge variant="secondary" className="text-xs flex-shrink-0">In Progress</Badge>
                        </div>

                        <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 rounded-lg bg-muted/50">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                            <Users className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm lg:text-base truncate">Social Dashboard</h4>
                            <p className="text-xs lg:text-sm text-muted-foreground">Mobile App • 1 day ago</p>
                          </div>
                          <Badge variant="default" className="text-xs flex-shrink-0">Deployed</Badge>
                        </div>

                        <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 rounded-lg bg-muted/50">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                            <Palette className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm lg:text-base truncate">E-commerce Store</h4>
                            <p className="text-xs lg:text-sm text-muted-foreground">Hybrid App • 3 days ago</p>
                          </div>
                          <Badge variant="outline" className="text-xs flex-shrink-0">Draft</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg lg:text-xl">Learning Progress</CardTitle>
                      <CardDescription className="text-sm">
                        Your journey to becoming a better builder
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">React Fundamentals</span>
                            <span className="text-sm text-muted-foreground">85%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">API Integration</span>
                            <span className="text-sm text-muted-foreground">60%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{width: '60%'}}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Database Design</span>
                            <span className="text-sm text-muted-foreground">40%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{width: '40%'}}></div>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full mt-4"
                          onClick={() => handleNavigation('/mentor')}
                        >
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
      </div>
    </ProtectedRoute>
  );
}
