'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Code, 
  Sparkles, 
  Zap, 
  MessageSquare,
  Users,
  Globe,
  Shield,
  Search,
  ArrowRight,
  ExternalLink,
  FileText,
  Video,
  Github,
  Terminal,
  Lightbulb,
  Rocket
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DocsPage() {
  const quickStartGuides = [
    {
      icon: Rocket,
      title: "Getting Started",
      description: "Set up your first Orbix project in under 5 minutes",
      href: "/docs/getting-started",
      time: "5 min read"
    },
    {
      icon: Code,
      title: "Voice Commands",
      description: "Learn how to use voice commands to build applications",
      href: "/docs/voice-commands",
      time: "10 min read"
    },
    {
      icon: Sparkles,
      title: "AI Code Generation",
      description: "Master AI-powered code generation and optimization",
      href: "/docs/ai-generation",
      time: "15 min read"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Set up team workspaces and collaborative development",
      href: "/docs/collaboration",
      time: "8 min read"
    }
  ];

  const apiResources = [
    {
      icon: Terminal,
      title: "REST API Reference",
      description: "Complete API documentation with examples",
      href: "/docs/api",
      badge: "v2.0"
    },
    {
      icon: Code,
      title: "SDK Documentation",
      description: "JavaScript, Python, and Go SDKs",
      href: "/docs/sdks",
      badge: "Multiple"
    },
    {
      icon: Globe,
      title: "Webhooks",
      description: "Real-time notifications and integrations",
      href: "/docs/webhooks",
      badge: "New"
    },
    {
      icon: Shield,
      title: "Authentication",
      description: "OAuth, API keys, and security best practices",
      href: "/docs/auth",
      badge: "Secure"
    }
  ];

  const resources = [
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      href: "/docs/videos",
      count: "25+ videos"
    },
    {
      icon: FileText,
      title: "Examples & Templates",
      description: "Ready-to-use project templates",
      href: "/docs/examples",
      count: "50+ templates"
    },
    {
      icon: MessageSquare,
      title: "Community Forum",
      description: "Get help from the community",
      href: "/community",
      count: "10k+ members"
    },
    {
      icon: Github,
      title: "Open Source",
      description: "Contribute to Orbix development",
      href: "https://github.com/orbix",
      count: "View on GitHub"
    }
  ];

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
            Documentation
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Everything You Need to Know
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive guides, API references, and resources to help you build amazing applications with Orbix.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search documentation..." 
              className="pl-10 h-12 text-base"
            />
          </div>
        </motion.div>
      </section>

      {/* Quick Start Guides */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Quick Start Guides</h2>
          <p className="text-muted-foreground">Get up and running with Orbix in minutes</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickStartGuides.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 p-2 mb-3">
                      <guide.icon className="w-full h-full text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {guide.time}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {guide.title}
                  </CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-primary">
                    Read guide
                    <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* API Resources */}
      <section className="container mx-auto px-4 py-16 bg-muted/50 rounded-2xl my-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">API & Developer Resources</h2>
          <p className="text-muted-foreground">Technical documentation for developers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apiResources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-2 mb-3">
                      <resource.icon className="w-full h-full text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {resource.badge}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-primary">
                    View docs
                    <ExternalLink className="ml-1 w-3 h-3" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
          <p className="text-muted-foreground">Community, examples, and learning materials</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 p-3 mb-3 mx-auto">
                    <resource.icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="text-xs">
                    {resource.count}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Lightbulb className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-8">
            Can't find what you're looking for? Our support team is here to help you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Link href="/features">
                Explore Features
                <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
