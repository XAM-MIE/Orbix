'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2,
  CheckCircle,
  Circle,
  Code,
  Eye,
  Lightbulb,
  Target,
  Trophy,
  Clock
} from 'lucide-react';

const tutorials = [
  {
    id: 1,
    title: 'Getting Started with React',
    description: 'Learn the fundamentals of React components and JSX',
    duration: '15 min',
    completed: true,
    steps: [
      'Understanding Components',
      'JSX Syntax',
      'Props and State',
      'Event Handling'
    ]
  },
  {
    id: 2,
    title: 'Building Your First API',
    description: 'Create and consume REST APIs with Node.js',
    duration: '25 min',
    completed: false,
    current: true,
    steps: [
      'Setting up Express',
      'Creating Routes',
      'Database Integration',
      'Error Handling'
    ]
  },
  {
    id: 3,
    title: 'Responsive Design Principles',
    description: 'Master CSS Grid and Flexbox for modern layouts',
    duration: '20 min',
    completed: false,
    steps: [
      'CSS Grid Basics',
      'Flexbox Layout',
      'Media Queries',
      'Mobile-First Design'
    ]
  }
];

export default function MentorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex">
          {/* Tutorial List */}
          <div className="w-80 border-r flex flex-col">
            <div className="border-b p-4">
              <h2 className="text-xl font-bold mb-2">Learning Path</h2>
              <p className="text-sm text-muted-foreground">
                Step-by-step tutorials to master app development
              </p>
            </div>
            
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {tutorials.map((tutorial) => (
                <Card 
                  key={tutorial.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    tutorial.current ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/20' : 'hover:shadow-md'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {tutorial.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{tutorial.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {tutorial.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {tutorial.duration}
                          </Badge>
                          {tutorial.current && (
                            <Badge className="bg-purple-500 text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="border-b p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Building Your First API</h1>
                  <p className="text-muted-foreground">
                    Step 2 of 4: Creating Routes
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="font-semibold">{progress}%</p>
                  </div>
                  <div className="w-32">
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex">
              {/* Instructions */}
              <div className="flex-1 p-6 overflow-auto">
                <div className="max-w-3xl">
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-purple-500" />
                        <span>Learning Objective</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        In this lesson, you&apos;ll learn how to create RESTful routes in Express.js 
                        to handle different HTTP methods and build a solid foundation for your API.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        <span>Key Concepts</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>HTTP Methods (GET, POST, PUT, DELETE)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Route Parameters and Query Strings</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Request and Response Objects</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Middleware Functions</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Voice Explanation</span>
                        <Button
                          onClick={() => setIsPlaying(!isPlaying)}
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-2"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          <span>{isPlaying ? 'Pause' : 'Play'}</span>
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Listen to the audio explanation while you follow along with the code examples.
                        The AI mentor will guide you through each concept step by step.
                      </p>
                      
                      <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm">
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <SkipForward className="w-4 h-4" />
                        </Button>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '35%'}}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">2:15 / 6:30</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Code Editor */}
              <div className="w-96 border-l flex flex-col">
                <Tabs defaultValue="code" className="h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="code">
                      <Code className="w-4 h-4 mr-2" />
                      Code
                    </TabsTrigger>
                    <TabsTrigger value="preview">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="code" className="flex-1 mt-0">
                    <div className="h-full p-4 overflow-auto">
                      <pre className="text-xs bg-muted/50 p-4 rounded-lg">
                        <code>{`// Express route example
const express = require('express');
const app = express();

// GET route
app.get('/api/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// POST route
app.post('/api/users', (req, res) => {
  res.json({ message: 'Create new user' });
});

// PUT route with parameter
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    message: \`Update user \${userId}\`
  });
});

// DELETE route
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    message: \`Delete user \${userId}\`
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="preview" className="flex-1 mt-0">
                    <div className="h-full p-4">
                      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                            <Trophy className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            API endpoint test results will appear here
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Navigation */}
            <div className="border-t p-4">
              <div className="flex items-center justify-between">
                <Button variant="outline">
                  <SkipBack className="w-4 h-4 mr-2" />
                  Previous Step
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    Test Code
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500">
                    Next Step
                    <SkipForward className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
