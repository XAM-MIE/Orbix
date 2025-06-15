'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  Brain, 
  Palette, 
  Sparkles, 
  Zap, 
  Code, 
  MessageSquare,
  Wand2,
  ArrowRight,
  Play,
  Users,
  Globe,
  Shield
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered App Builder
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Build Apps with
            <br />
            Your Voice
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your ideas into stunning applications using natural language. 
            No coding required, just speak your vision and watch it come to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-6">
              <Link href="/signup" className="flex items-center space-x-2">
                <Mic className="w-5 h-5" />
                <span>Start Building</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="#demo" className="flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-muted-foreground">10,000+ Builders</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Globe className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">50+ Countries</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-muted-foreground">Enterprise Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Modern Builders
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to turn your ideas into production-ready applications
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Voice Builder</h3>
              <p className="text-muted-foreground mb-4">
                Describe your app in natural language and watch our AI transform your words into working code instantly.
              </p>
              <div className="flex items-center text-sm text-purple-600 group-hover:text-purple-700">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Mentor Mode</h3>
              <p className="text-muted-foreground mb-4">
                Get step-by-step guidance and learn best practices with our intelligent mentoring system.
              </p>
              <div className="flex items-center text-sm text-green-600 group-hover:text-green-700">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-6">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Visual Designer</h3>
              <p className="text-muted-foreground mb-4">
                Fine-tune your app's appearance with our intuitive drag-and-drop visual editor.
              </p>
              <div className="flex items-center text-sm text-orange-600 group-hover:text-orange-700">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-20 bg-muted/10 rounded-3xl mx-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From idea to deployment in minutes, not months
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">1. Speak Your Idea</h3>
            <p className="text-muted-foreground">
              Describe your app using natural language. Our AI understands context and intent.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">2. AI Generates Code</h3>
            <p className="text-muted-foreground">
              Watch as our AI creates clean, production-ready code based on your requirements.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-6">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">3. Deploy Instantly</h3>
            <p className="text-muted-foreground">
              One-click deployment to the cloud. Your app is live and ready for users.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Ideas?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of builders who are already creating amazing apps with voice commands.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-6">
              <Link href="/signup" className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Get Started Free</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}