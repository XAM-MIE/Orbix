'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  BookOpen,
  Sparkles,
  Code,
  Mic,
  Brain,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const featuredPost = {
    title: "The Future of Voice-Powered Development",
    excerpt: "Discover how AI and voice commands are revolutionizing the way we build applications, making development more intuitive and accessible than ever before.",
    author: "Orbix Team",
    date: "2025-01-15",
    readTime: "8 min read",
    category: "AI Development",
    image: "🎤",
    href: "/blog/future-voice-development"
  };

  const blogPosts = [
    {
      title: "Getting Started with AI Code Generation",
      excerpt: "Learn the fundamentals of AI-powered code generation and how to leverage it in your development workflow.",
      author: "Sarah Chen",
      date: "2025-01-12",
      readTime: "6 min read",
      category: "Tutorial",
      icon: Code,
      href: "/blog/ai-code-generation-guide"
    },
    {
      title: "Building Responsive UIs with Voice Commands",
      excerpt: "Step-by-step guide to creating beautiful, responsive user interfaces using natural language descriptions.",
      author: "Mike Rodriguez",
      date: "2025-01-10",
      readTime: "10 min read",
      category: "Design",
      icon: Mic,
      href: "/blog/voice-ui-design"
    },
    {
      title: "Team Collaboration in the Age of AI",
      excerpt: "How AI-powered development tools are transforming team collaboration and project management.",
      author: "Emily Johnson",
      date: "2025-01-08",
      readTime: "7 min read",
      category: "Collaboration",
      icon: Brain,
      href: "/blog/ai-team-collaboration"
    },
    {
      title: "Optimizing Performance with Smart Deployment",
      excerpt: "Best practices for deploying AI-generated applications with optimal performance and scalability.",
      author: "David Kim",
      date: "2025-01-05",
      readTime: "12 min read",
      category: "DevOps",
      icon: Zap,
      href: "/blog/smart-deployment-guide"
    },
    {
      title: "The Evolution of No-Code Development",
      excerpt: "Exploring how voice-powered development is pushing the boundaries of no-code and low-code platforms.",
      author: "Lisa Wang",
      date: "2025-01-03",
      readTime: "9 min read",
      category: "Industry",
      icon: Sparkles,
      href: "/blog/no-code-evolution"
    },
    {
      title: "Security Best Practices for AI Applications",
      excerpt: "Essential security considerations when building and deploying AI-powered applications.",
      author: "Alex Thompson",
      date: "2025-01-01",
      readTime: "11 min read",
      category: "Security",
      icon: BookOpen,
      href: "/blog/ai-security-practices"
    }
  ];

  const categories = ["All", "AI Development", "Tutorial", "Design", "Collaboration", "DevOps", "Industry", "Security"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <BookOpen className="w-3 h-3 mr-1" />
            Blog
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Insights & Updates
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stay up to date with the latest in AI-powered development, tutorials, and industry insights from the Orbix team.
          </p>
        </motion.div>
      </section>

      {/* Featured Post */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center p-12">
                <div className="text-6xl">{featuredPost.image}</div>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant="secondary">{featuredPost.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center text-primary">
                  Read more
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 p-2">
                      <post.icon className="w-full h-full text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-4">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center bg-muted/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest blog posts, tutorials, and product updates delivered straight to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Link href="/newsletter">
                Subscribe to Newsletter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/rss">
                RSS Feed
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
