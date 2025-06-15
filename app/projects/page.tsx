'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  Zap,
  Users,
  Code,
  Palette,
  Database,
  CreditCard,
  Shield,
  Bell
} from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Task Manager Pro',
    description: 'A comprehensive task management application with team collaboration features',
    type: 'web',
    status: 'deployed',
    lastModified: '2 hours ago',
    features: ['Auth', 'Dashboard', 'API'],
    users: 1234,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Social Dashboard',
    description: 'Analytics dashboard for social media management',
    type: 'mobile',
    status: 'development',
    lastModified: '1 day ago',
    features: ['Dashboard', 'API', 'Payments'],
    users: 567,
    color: 'bg-green-500'
  },
  {
    id: 3,
    name: 'E-commerce Store',
    description: 'Modern online store with payment integration',
    type: 'hybrid',
    status: 'draft',
    lastModified: '3 days ago',
    features: ['Auth', 'Payments', 'Dashboard'],
    users: 89,
    color: 'bg-purple-500'
  },
  {
    id: 4,
    name: 'Learning Platform',
    description: 'Educational platform with video courses and quizzes',
    type: 'web',
    status: 'deployed',
    lastModified: '1 week ago',
    features: ['Auth', 'Dashboard'],
    users: 2341,
    color: 'bg-orange-500'
  }
];

const features = [
  { id: 'auth', name: 'Authentication', icon: Shield },
  { id: 'dashboard', name: 'Dashboard', icon: Monitor },
  { id: 'api', name: 'API Integration', icon: Code },
  { id: 'payments', name: 'Payments', icon: CreditCard },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'database', name: 'Database', icon: Database }
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    type: 'web',
    features: []
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || project.type === filterType;
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateProject = () => {
    // Handle project creation logic here
    console.log('Creating project:', newProject);
    setIsNewProjectOpen(false);
    setNewProject({ name: '', description: '', type: 'web', features: [] });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'development': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'web': return Monitor;
      case 'mobile': return Smartphone;
      case 'hybrid': return Globe;
      default: return Monitor;
    }
  };

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
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Projects</h1>
                  <p className="text-muted-foreground">
                    Manage and organize your app building projects
                  </p>
                </div>
                <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-500">
                      <Plus className="w-4 h-4 mr-2" />
                      New Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Create New Project</DialogTitle>
                      <DialogDescription>
                        Start building your next amazing app with our project wizard
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input
                          id="projectName"
                          placeholder="My Awesome App"
                          value={newProject.name}
                          onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="projectDescription">Description</Label>
                        <Textarea
                          id="projectDescription"
                          placeholder="Describe what your app will do..."
                          value={newProject.description}
                          onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>App Type</Label>
                        <Select value={newProject.type} onValueChange={(value) => setNewProject({...newProject, type: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="web">
                              <div className="flex items-center space-x-2">
                                <Monitor className="w-4 h-4" />
                                <span>Web App</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="mobile">
                              <div className="flex items-center space-x-2">
                                <Smartphone className="w-4 h-4" />
                                <span>Mobile App</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="hybrid">
                              <div className="flex items-center space-x-2">
                                <Globe className="w-4 h-4" />
                                <span>Hybrid App</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Features</Label>
                        <div className="grid grid-cols-2 gap-4">
                          {features.map((feature) => (
                            <div key={feature.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={feature.id}
                                checked={newProject.features.includes(feature.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setNewProject({
                                      ...newProject,
                                      features: [...newProject.features, feature.id]
                                    });
                                  } else {
                                    setNewProject({
                                      ...newProject,
                                      features: newProject.features.filter(f => f !== feature.id)
                                    });
                                  }
                                }}
                              />
                              <Label htmlFor={feature.id} className="flex items-center space-x-2 cursor-pointer">
                                <feature.icon className="w-4 h-4" />
                                <span>{feature.name}</span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsNewProjectOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateProject} className="bg-gradient-to-r from-purple-500 to-blue-500">
                        Start Building
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="web">Web Apps</SelectItem>
                    <SelectItem value="mobile">Mobile Apps</SelectItem>
                    <SelectItem value="hybrid">Hybrid Apps</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="deployed">Deployed</SelectItem>
                    <SelectItem value="development">In Development</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => {
                  const TypeIcon = getTypeIcon(project.type);
                  return (
                    <Card key={project.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center`}>
                              <TypeIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                                {project.name}
                              </CardTitle>
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>{project.lastModified}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-muted-foreground">
                              <Users className="w-4 h-4" />
                              <span>{project.users.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-2">Features:</p>
                            <div className="flex flex-wrap gap-1">
                              {project.features.map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1">
                              <Code className="w-4 h-4 mr-2" />
                              Open
                            </Button>
                            <Button size="sm" variant="outline">
                              <Palette className="w-4 h-4 mr-2" />
                              Design
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || filterType !== 'all' || filterStatus !== 'all' 
                      ? 'Try adjusting your search or filters'
                      : 'Create your first project to get started'
                    }
                  </p>
                  <Button onClick={() => setIsNewProjectOpen(true)} className="bg-gradient-to-r from-purple-500 to-blue-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}