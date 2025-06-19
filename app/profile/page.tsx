'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useSidebar } from '@/contexts/SidebarContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useAuth, signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/ui/loader';
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
  LogOut,
  Loader2,
  Sparkles
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { isOpen } = useSidebar();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Form state
  const [profileData, setProfileData] = useState({
    fullName: '',
    location: '',
    website: '',
    bio: '',
    githubUsername: '',
    twitterUsername: ''
  });

  // Load initial data
  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.user_metadata?.full_name || '',
        location: user.user_metadata?.location || '',
        website: user.user_metadata?.website || '',
        bio: user.user_metadata?.bio || '',
        githubUsername: user.user_metadata?.github_username || '',
        twitterUsername: user.user_metadata?.twitter_username || ''
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profileData.fullName,
          location: profileData.location,
          website: profileData.website,
          bio: profileData.bio,
          github_username: profileData.githubUsername,
          twitter_username: profileData.twitterUsername
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast.success('Profile updated successfully', {
        icon: <Sparkles className="w-4 h-4 text-yellow-500" />,
        style: { background: 'rgba(0, 0, 0, 0.8)', color: 'white' },
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

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
    { label: 'Apps Built', value: '12', icon: Trophy, color: 'from-yellow-500 to-amber-600' },
    { label: 'Hours Saved', value: '47', icon: Zap, color: 'from-purple-500 to-indigo-600' },
    { label: 'Lines of Code', value: '2.5k', icon: Target, color: 'from-green-500 to-emerald-600' },
    { label: 'Deployments', value: '8', icon: Star, color: 'from-blue-500 to-cyan-600' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Mobile Sidebar */}
        <MobileSidebar />

        {/* Desktop Sidebar */}
        <div className={`transition-all duration-300 overflow-hidden hidden md:block ${isOpen ? 'w-64' : 'w-16'}`}>
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="p-8 pt-20 md:pt-8 relative">
            {/* Background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
              <div className="absolute bottom-[20%] left-[15%] w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
            </div>
            
            <div className="max-w-4xl mx-auto relative z-10">
              {/* Header */}
              <motion.div 
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Profile</h1>
                  <p className="text-muted-foreground">
                    Manage your account and view your progress
                  </p>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-100/10 transition-all duration-300 hover:shadow-md"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </motion.div>

              <Tabs 
                defaultValue="overview" 
                className="space-y-6"
                onValueChange={setActiveTab}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <TabsList className="grid w-full grid-cols-4 p-1 bg-muted/50 backdrop-blur-sm rounded-xl">
                    <TabsTrigger 
                      value="overview"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/80 data-[state=active]:to-blue-500/80 data-[state=active]:text-white rounded-lg transition-all duration-300"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="profile"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/80 data-[state=active]:to-blue-500/80 data-[state=active]:text-white rounded-lg transition-all duration-300"
                    >
                      Profile
                    </TabsTrigger>
                    <TabsTrigger 
                      value="achievements"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/80 data-[state=active]:to-blue-500/80 data-[state=active]:text-white rounded-lg transition-all duration-300"
                    >
                      Achievements
                    </TabsTrigger>
                    <TabsTrigger 
                      value="settings"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/80 data-[state=active]:to-blue-500/80 data-[state=active]:text-white rounded-lg transition-all duration-300"
                    >
                      Settings
                    </TabsTrigger>
                  </TabsList>
                </motion.div>

                <TabsContent value="overview" className="space-y-6">
                  {/* Profile Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
                      <CardContent className="p-6 pt-16">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                              <AvatarImage src="/placeholder-avatar.jpg" />
                              <AvatarFallback className="text-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                                {user?.email?.charAt(0).toUpperCase() || 'U'}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                          
                          <div className="flex-1 space-y-4">
                            <div>
                              <h2 className="text-2xl font-bold">{profileData.fullName || user?.user_metadata?.full_name || 'User'}</h2>
                              <div className="flex items-center text-muted-foreground">
                                <Mail className="w-4 h-4 mr-2" />
                                <span>{user?.email}</span>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-3 mt-3">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 shadow-md">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Pro Member
                                  </Badge>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Badge variant="outline" className="px-3 py-1 border-purple-200 shadow-sm">
                                    Level 5 Builder
                                  </Badge>
                                </motion.div>
                              </div>
                            </div>
                            
                            {/* Bio */}
                            {profileData.bio && (
                              <motion.div 
                                className="pt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                <p className="text-sm leading-relaxed">{profileData.bio}</p>
                              </motion.div>
                            )}
                            
                            {/* Contact & Social Info */}
                            <motion.div 
                              className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2"
                              variants={container}
                              initial="hidden"
                              animate="show"
                            >
                              {profileData.location && (
                                <motion.div variants={item} className="flex items-center gap-2 text-sm">
                                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-purple-500" />
                                  </div>
                                  <span>{profileData.location}</span>
                                </motion.div>
                              )}
                              
                              <motion.div variants={item} className="flex items-center gap-2 text-sm">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                  <Calendar className="w-4 h-4 text-blue-500" />
                                </div>
                                <span>Joined March 2024</span>
                              </motion.div>
                              
                              {profileData.website && (
                                <motion.div variants={item} className="flex items-center gap-2 text-sm">
                                  <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center">
                                    <Globe className="w-4 h-4 text-cyan-500" />
                                  </div>
                                  <a href={profileData.website} target="_blank" rel="noopener noreferrer" 
                                    className="text-primary hover:underline truncate max-w-[200px] transition-all duration-300 hover:text-blue-400">
                                    {profileData.website.replace(/^https?:\/\//, '')}
                                  </a>
                                </motion.div>
                              )}
                              
                              {profileData.githubUsername && (
                                <motion.div variants={item} className="flex items-center gap-2 text-sm">
                                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    <Github className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                                  </div>
                                  <a href={`https://github.com/${profileData.githubUsername}`} target="_blank" rel="noopener noreferrer"
                                    className="text-primary hover:underline transition-all duration-300 hover:text-blue-400">
                                    {profileData.githubUsername}
                                  </a>
                                </motion.div>
                              )}
                              
                              {profileData.twitterUsername && (
                                <motion.div variants={item} className="flex items-center gap-2 text-sm">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                    <Twitter className="w-4 h-4 text-blue-400" />
                                  </div>
                                  <a href={`https://twitter.com/${profileData.twitterUsername}`} target="_blank" rel="noopener noreferrer"
                                    className="text-primary hover:underline transition-all duration-300 hover:text-blue-400">
                                    @{profileData.twitterUsername}
                                  </a>
                                </motion.div>
                              )}
                            </motion.div>
                          </div>
                          
                          {/* Edit Profile button removed */}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Stats */}
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-4 gap-6"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {stats.map((stat, index) => (
                      <motion.div key={index} variants={item}>
                        <motion.div
                          whileHover={{ 
                            scale: 1.03,
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Card className="border-0 shadow-md overflow-hidden bg-card/80 backdrop-blur-sm">
                            <div className={`h-1 w-full bg-gradient-to-r ${stat.color}`}></div>
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                  <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                                  <stat.icon className="w-6 h-6 text-white" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
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
                  </motion.div>
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
                          <Input 
                            id="fullName" 
                            value={profileData.fullName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" defaultValue={user?.email || ''} disabled />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            placeholder="City, Country" 
                            value={profileData.location}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input 
                            id="website" 
                            placeholder="https://example.com" 
                            value={profileData.website}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          placeholder="Tell us about yourself..."
                          value={profileData.bio}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label>Social Links</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Github className="w-4 h-4" />
                            <Input 
                              id="githubUsername"
                              placeholder="GitHub username" 
                              value={profileData.githubUsername}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Twitter className="w-4 h-4" />
                            <Input 
                              id="twitterUsername"
                              placeholder="Twitter username" 
                              value={profileData.twitterUsername}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
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
