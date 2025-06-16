'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Globe, 
  Github,
  Twitter,
  Trophy,
  Star,
  Zap,
  Target,
  Award,
  Settings,
  Bell,
  Shield,
  CreditCard,
  LogOut
} from 'lucide-react';
import { useAuth, signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      toast.success('Signed out successfully');
      router.push('/');
    }
  };

  const achievements = [
    { name: 'First App', description: 'Built your first app', icon: Trophy, color: 'bg-yellow-500' },
    { name: 'Voice Master', description: '50 voice commands used', icon: Zap, color: 'bg-purple-500' },
    { name: 'Code Ninja', description: '1000 lines of code generated', icon: Target, color: 'bg-green-500' },
    { name: 'Designer', description: 'Used visual designer 10 times', icon: Star, color: 'bg-blue-500' },
  ];

  const stats = [
    { label: 'Apps Built', value: '12', icon: Trophy },
    { label: 'Hours Saved', value: '47', icon: Zap },
    { label: 'Lines of Code', value: '2.5k', icon: Target },
    { label: 'Deployments', value: '8', icon: Star },
  ];

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Profile</h1>
                  <p className="text-muted-foreground">
                    Manage your account and view your progress
                  </p>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Profile Summary */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-6">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="text-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold">{user?.user_metadata?.full_name || 'User'}</h2>
                          <p className="text-muted-foreground mb-2">{user?.email}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Joined March 2024</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>San Francisco, CA</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-2">
                            Pro Member
                          </Badge>
                          <p className="text-sm text-muted-foreground">Level 5 Builder</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                              <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                            <stat.icon className="w-8 h-8 text-purple-500" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest building sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="font-medium">Deployed &quot;Task Manager Pro&quot;</p>
                            <p className="text-sm text-muted-foreground">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="font-medium">Completed &quot;API Integration&quot; tutorial</p>
                            <p className="text-sm text-muted-foreground">1 day ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="font-medium">Created new project &quot;Social Dashboard&quot;</p>
                            <p className="text-sm text-muted-foreground">3 days ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your profile information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input id="fullName" defaultValue={user?.user_metadata?.full_name || ''} />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" defaultValue={user?.email || ''} disabled />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" placeholder="City, Country" />
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input id="website" placeholder="https://example.com" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" placeholder="Tell us about yourself..." />
                      </div>
                      <div>
                        <Label>Social Links</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Github className="w-4 h-4" />
                            <Input placeholder="GitHub username" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Twitter className="w-4 h-4" />
                            <Input placeholder="Twitter username" />
                          </div>
                        </div>
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Achievements</CardTitle>
                      <CardDescription>Unlock badges as you progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border">
                            <div className={`w-12 h-12 rounded-full ${achievement.color} flex items-center justify-center`}>
                              <achievement.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{achievement.name}</h3>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                            <Award className="w-5 h-5 text-yellow-500" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Progress to Next Level</CardTitle>
                      <CardDescription>Level 6 Builder</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Experience Points</span>
                          <span className="text-sm text-muted-foreground">2,400 / 3,000 XP</span>
                        </div>
                        <Progress value={80} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          600 XP to go! Complete more tutorials and build apps to level up.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Manage your account preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5" />
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive updates about your projects</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5" />
                          <div>
                            <p className="font-medium">Privacy Settings</p>
                            <p className="text-sm text-muted-foreground">Control your data and privacy</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-5 h-5" />
                          <div>
                            <p className="font-medium">Billing & Plans</p>
                            <p className="text-sm text-muted-foreground">Manage your subscription</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View Plans</Button>
                      </div>
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