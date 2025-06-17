'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Mic,
  Brain,
  Code,
  Sparkles,
  Zap,
  MessageSquare,
  Users,
  Globe,
  Shield,
  Cpu,
  Database,
  Video,
  ArrowRight,
  CheckCircle,
  Play,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: Mic,
      title: "Voice-Powered Development",
      description: "Build applications using natural language. Just describe what you want, and our AI will help you create it.",
      features: ["Natural language processing", "Voice-to-code conversion", "Real-time feedback", "Multi-language support"]
    },
    {
      icon: Code,
      title: "AI Code Generation",
      description: "Generate high-quality code with AI assistance. Get suggestions, explanations, and optimizations in real-time.",
      features: ["Smart code completion", "Bug detection", "Code optimization", "Multiple frameworks"]
    },
    {
      icon: Brain,
      title: "Intelligent Design System",
      description: "Create beautiful UIs with AI-powered design suggestions and automatic responsive layouts.",
      features: ["Auto-responsive design", "Component library", "Design tokens", "Accessibility built-in"]
    },
    {
      icon: Users,
      title: "Real-Time Collaboration",
      description: "Work together with your team in real-time. Share code, ideas, and feedback seamlessly.",
      features: ["Live collaboration", "Version control", "Team workspaces", "Comment system"]
    },
    {
      icon: Zap,
      title: "Instant Deployment",
      description: "Deploy your applications instantly with our integrated hosting and CI/CD pipeline.",
      features: ["One-click deployment", "Auto-scaling", "Global CDN", "SSL certificates"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Built with security in mind. SOC 2 compliant with enterprise-grade data protection.",
      features: ["SOC 2 compliance", "Data encryption", "Access controls", "Audit logs"]
    }
  ];

  const integrations = [
    { name: "GitHub", icon: "🐙" },
    { name: "Vercel", icon: "▲" },
    { name: "AWS", icon: "☁️" },
    { name: "Supabase", icon: "🗄️" },
    { name: "OpenAI", icon: "🤖" },
    { name: "Figma", icon: "🎨" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 sm:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Powerful Features
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Everything You Need to Build Amazing Apps
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover the powerful features that make Orbix the ultimate AI-powered development platform for modern teams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Link href="/signup">
                Start Building Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs">
                <BookOpen className="mr-2 h-4 w-4" />
                View Documentation
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Main Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 p-3 mb-4">
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Integrations Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50 rounded-2xl my-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Seamless Integrations</h2>
          <p className="text-muted-foreground">Connect with your favorite tools and services</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center p-6 bg-background rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">{integration.icon}</div>
              <span className="text-sm font-medium">{integration.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What's Next Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What&apos;s Next?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3 mb-4">
                    <BookOpen className="w-full h-full text-white" />
                  </div>
                  <CardTitle>Learn How to Use</CardTitle>
                  <CardDescription>
                    Get started with our comprehensive documentation and tutorials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/docs">
                      View Documentation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-3 mb-4">
                    <Sparkles className="w-full h-full text-white" />
                  </div>
                  <CardTitle>Choose Your Plan</CardTitle>
                  <CardDescription>
                    Find the perfect plan for your development needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/pricing">
                      View Pricing
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of developers who are already building amazing applications with Orbix.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">
                Read Our Blog
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
