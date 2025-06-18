"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play, 
  CheckCircle, 
  Calendar,
  TrendingUp,
  Award,
  Target,
  Menu,
  X,
  Code,
  Database,
  Globe,
  Smartphone,
  Layers,
  Zap,
  Cpu,
  GitBranch
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  progress: number;
  image: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  icon: any;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete React Developer Bootcamp",
    description: "Master React.js with hooks, context, and modern patterns. Build real-world applications from scratch.",
    instructor: "Max Schwarzmüller",
    duration: "48 hours",
    students: 1250000,
    rating: 4.8,
    progress: 75,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    category: "Frontend",
    level: "Beginner",
    price: 89.99,
    icon: Code
  },
  {
    id: "2",
    title: "Node.js & Express.js Masterclass",
    description: "Build scalable backend APIs with Node.js, Express, MongoDB, and authentication systems.",
    instructor: "Jonas Schmedtmann",
    duration: "42 hours",
    students: 890000,
    rating: 4.7,
    progress: 45,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    category: "Backend",
    level: "Intermediate",
    price: 94.99,
    icon: Database
  },
  {
    id: "3",
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into ES6+, async/await, closures, and advanced JavaScript patterns for modern development.",
    instructor: "Anthony Alicea",
    duration: "35 hours",
    students: 750000,
    rating: 4.9,
    progress: 90,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
    category: "JavaScript",
    level: "Advanced",
    price: 79.99,
    icon: Zap
  },
  {
    id: "4",
    title: "Full-Stack Web Development",
    description: "Complete MERN stack development: MongoDB, Express, React, Node.js with deployment strategies.",
    instructor: "Colt Steele",
    duration: "52 hours",
    students: 450000,
    rating: 4.6,
    progress: 30,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    category: "Full-Stack",
    level: "Intermediate",
    price: 84.99,
    icon: Layers
  },
  {
    id: "5",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps using React Native, Expo, and modern mobile development practices.",
    instructor: "Stephen Grider",
    duration: "38 hours",
    students: 320000,
    rating: 4.7,
    progress: 60,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    category: "Mobile",
    level: "Intermediate",
    price: 99.99,
    icon: Smartphone
  },
  {
    id: "6",
    title: "Python for Web Development",
    description: "Learn Django and Flask frameworks to build robust web applications with Python backend.",
    instructor: "Jose Portilla",
    duration: "28 hours",
    students: 280000,
    rating: 4.5,
    progress: 20,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
    category: "Backend",
    level: "Beginner",
    price: 74.99,
    icon: Cpu
  }
];

const categories = ["All", "Frontend", "Backend", "Full-Stack", "Mobile", "JavaScript"];

export default function MentorPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="w-64 hidden lg:block flex-shrink-0">
          <Sidebar />
        </div>
        
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">Mentor</h1>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0 lg:ml-0">
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-8 pt-20 lg:pt-8">
              <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 lg:mb-8">
                  <h1 className="text-2xl lg:text-3xl font-bold mb-2">Learn with Expert Mentors</h1>
                  <p className="text-sm lg:text-base text-muted-foreground">
                    Master software development with world-class instructors. Choose from specialized courses 
                    and accelerate your coding journey.
                  </p>
                </div>

                <Tabs defaultValue="courses" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="courses">My Courses</TabsTrigger>
                    <TabsTrigger value="recommendations">Recommended</TabsTrigger>
                    <TabsTrigger value="progress">Learning Progress</TabsTrigger>
                  </TabsList>

                  <TabsContent value="courses" className="space-y-6">
                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Search courses..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                        />
                      </div>
                      <div className="flex gap-2 overflow-x-auto">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category)}
                            className="whitespace-nowrap"
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCourses.map((course) => (
                        <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-border">
                          <div className="relative">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3">
                              <Badge variant="secondary" className="bg-background/90 text-foreground">
                                {course.level}
                              </Badge>
                            </div>
                            <div className="absolute bottom-3 left-3">
                              <Badge className="bg-primary text-primary-foreground">
                                ${course.price}
                              </Badge>
                            </div>
                            <div className="absolute top-3 left-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                                <course.icon className="w-5 h-5 text-primary" />
                              </div>
                            </div>
                          </div>
                          
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
                                  {course.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2 mb-3">
                                  {course.description}
                                </CardDescription>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} />
                                <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span>{course.instructor}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{(course.students / 1000).toFixed(0)}k students</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{course.rating}</span>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                          </CardHeader>

                          <CardContent className="pt-0">
                            <div className="flex gap-2">
                              <Button className="flex-1" variant="outline">
                                <Play className="w-4 h-4 mr-2" />
                                Continue
                              </Button>
                              <Button className="flex-1">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Complete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="recommendations" className="space-y-6">
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Personalized Recommendations
                      </h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Based on your learning history and interests, we'll recommend the best software development courses for you.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="progress" className="space-y-6">
                    {/* Learning Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Learning Time</CardTitle>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">127 hours</div>
                          <p className="text-xs text-muted-foreground">
                            +12% from last month
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
                          <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">8</div>
                          <p className="text-xs text-muted-foreground">
                            +2 this month
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                          <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">15 days</div>
                          <p className="text-xs text-muted-foreground">
                            Keep it up!
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Learning Calendar */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Learning Activity</CardTitle>
                        <CardDescription>
                          Your daily learning progress over the last 30 days
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 flex items-center justify-center text-muted-foreground">
                          <div className="text-center">
                            <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                            <p>Learning activity chart will appear here</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 