'use client';

import React, { useRef, useEffect, useState } from 'react';
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
  Shield,
  Send,
  Plus,
  Paperclip,
  Feather,
  Star
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { motion, useMotionValue, useTransform, useInView } from 'framer-motion';


export default function Home() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });

  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const rotateX = useTransform(y, [-100, 100], ["10deg", "-10deg"]);
  const rotateY = useTransform(x, [-100, 100], ["-10deg", "10deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const target = event.currentTarget;
    const { left, top, width, height } = target.getBoundingClientRect();

    const newX = clientX - (left + width / 2);
    const newY = clientY - (top + height / 2);

    x.set(newX);
    y.set(newY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      {/* Background Lighting/Floating Components */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={cardRef}
      >
        {/* Example floating orb - more can be added and positioned differently */}
        <motion.div
          style={{
            x: useTransform(x, [-windowWidth / 2, windowWidth / 2], [-50, 50]),
            y: useTransform(y, [-windowHeight / 2, windowHeight / 2], [-50, 50]),
            rotateX,
            rotateY,
          }}
          className="absolute top-[10%] left-[10%] w-48 h-48 rounded-full bg-purple-500/30 blur-lg opacity-70"
        />
        <motion.div
          style={{
            x: useTransform(x, [-windowWidth / 2, windowWidth / 2], [50, -50]),
            y: useTransform(y, [-windowHeight / 2, windowHeight / 2], [50, -50]),
            rotateX,
            rotateY,
          }}
          className="absolute bottom-[20%] right-[15%] w-64 h-64 rounded-full bg-blue-500/30 blur-lg opacity-70"
        />

        {/* New lighting elements around the nav bar and screen edges */}
        <motion.div
          style={{
            x: useTransform(x, [-windowWidth / 2, windowWidth / 2], [-20, 20]),
            y: useTransform(y, [-windowHeight / 2, windowHeight / 2], [-20, 20]),
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-2xl opacity-60 pointer-events-none"
        />
        <motion.div
          style={{
            x: useTransform(x, [-windowWidth / 2, windowWidth / 2], [10, -10]),
            y: useTransform(y, [-windowHeight / 2, windowHeight / 2], [10, -10]),
          }}
          className="absolute top-0 left-0 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl opacity-50 pointer-events-none"
        />
        <motion.div
          style={{
            x: useTransform(x, [-windowWidth / 2, windowWidth / 2], [-10, 10]),
            y: useTransform(y, [-windowHeight / 2, windowHeight / 2], [-10, 10]),
          }}
          className="absolute top-0 right-0 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl opacity-50 pointer-events-none"
        />
      </div>

      {/* Hero Section */}
      <section
        className="container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[calc(100vh-64px)] relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Floating elements */}
        <motion.div
          style={{ x: rotateY, y: rotateX, rotateX, rotateY, z: 100 }}
          className="absolute top-1/4 left-[15%] hidden md:block w-24 h-24 rounded-full bg-blue-500/10 blur-xl"
        />
        <motion.div
          style={{ x: rotateX, y: rotateY, rotateX, rotateY, z: 100 }}
          className="absolute bottom-1/4 right-[10%] hidden md:block w-32 h-32 rounded-full bg-purple-500/10 blur-xl"
        />
        <motion.div
          style={{ x: rotateY, y: rotateX, rotateX, rotateY, z: 100 }}
          className="absolute top-[10%] right-[20%] hidden md:block w-16 h-16 rounded-lg bg-green-500/10 blur-xl"
        />
        <motion.div
          style={{ x: rotateX, y: rotateY, rotateX, rotateY, z: 100 }}
          className="absolute bottom-[5%] left-[25%] hidden md:block w-20 h-20 rounded-full bg-orange-500/10 blur-xl"
        />

        <div className="max-w-4xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered App Builder
            </Badge>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent relative"
          >
            <span className="animate-pulse-slow">Build Smarter</span>
            <br />
            <span className="animate-pulse-slow">With AI.</span>
          </motion.h1>
          
          <style jsx global>{`
            @keyframes pulse-slow {
              0%, 100% {
                text-shadow: 0 0 10px rgba(147, 51, 234, 0.5),
                            0 0 20px rgba(59, 130, 246, 0.5);
              }
              50% {
                text-shadow: 0 0 20px rgba(147, 51, 234, 0.8),
                            0 0 30px rgba(59, 130, 246, 0.8);
              }
            }
            .animate-pulse-slow {
              animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
          `}</style>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Your All-in-One Hub for Web & App Creation
          </motion.p>
          
          {/* Main Input Area - Unified Chat Bubble Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-3xl mx-auto relative bg-card/80 backdrop-blur-lg border border-border/60 shadow-lg rounded-2xl"
          >
            <Textarea
              placeholder="How can Orbix help you today? Describe your app, ask for code, or discuss a design."
              className="min-h-[140px] resize-none p-6 pt-4 pb-16 rounded-2xl border border-border bg-background/90 dark:bg-background/10 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="absolute bottom-4 left-6 flex items-center space-x-2">
              <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary rounded-full">
                <Plus className="w-5 h-5" />
              </Button>
              <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full">
                Public
              </Badge>
            </div>
            <div className="absolute bottom-4 right-6 flex items-center space-x-2">
              <Button size="icon" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-full">
                <Mic className="w-5 h-5" />
              </Button>
              <Button size="icon" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-full">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
          
          {/* Prompt Suggestions */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 max-w-3xl mx-auto">
            {[
              { icon: Sparkles, text: 'Generate a UI' },
              { icon: Code, text: 'Explain this code' },
              { icon: Zap, text: 'Build an API' },
              { icon: MessageSquare, text: 'Discuss a design' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Button variant="outline" className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium hover:bg-muted transition-colors">
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </Button>
              </motion.div>
            ))}
          </div>
         </div> 
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Powerful Features for Modern Development
          </motion.h2>
          
          <div className="space-y-32">
            {/* First Feature */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              <div className="flex-1">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 p-4 mb-4"
                >
                  <Mic className="w-full h-full text-white" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-2xl font-bold mb-2"
                >
                  Voice-Powered Development
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-muted-foreground"
                >
                  Build applications using natural language. Just describe what you want, and our AI will help you create it.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex-1 bg-muted rounded-2xl p-8 h-[300px] flex items-center justify-center"
              >
                <p className="text-muted-foreground text-center">Feature Preview</p>
              </motion.div>
            </motion.div>

            {/* Second Feature */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="flex flex-col md:flex-row-reverse items-center gap-8"
            >
              <div className="flex-1">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-4 mb-4"
                >
                  <Code className="w-full h-full text-white" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-2xl font-bold mb-2"
                >
                  AI-Powered Code Generation
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-muted-foreground"
                >
                  Generate high-quality code with AI assistance. Get suggestions, explanations, and optimizations in real-time.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex-1 bg-muted rounded-2xl p-8 h-[300px] flex items-center justify-center"
              >
                <p className="text-muted-foreground text-center">Feature Preview</p>
              </motion.div>
            </motion.div>

            {/* Third Feature */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              <div className="flex-1">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 p-4 mb-4"
                >
                  <Users className="w-full h-full text-white" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-2xl font-bold mb-2"
                >
                  Real-Time Collaboration
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-muted-foreground"
                >
                  Work together with your team in real-time. Share code, ideas, and feedback seamlessly.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex-1 bg-muted rounded-2xl p-8 h-[300px] flex items-center justify-center"
              >
                <p className="text-muted-foreground text-center">Feature Preview</p>
              </motion.div>
            </motion.div>
          </div>
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