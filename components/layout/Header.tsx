'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Mic, Sparkles, Menu, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import OrbixLogo from '@/assets/Orbix logo.png';
import OrbixLogo2 from '@/assets/OrBix_Logo2.png';
import { motion } from 'framer-motion';

export function Header() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full bg-transparent py-4"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container max-w-5xl mx-auto px-4 flex h-14 items-center justify-between rounded-full border border-border bg-gradient-to-r from-black-600 shadow-lg to-black-600 shadow-lg"
      >
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-0">
            {mounted && (
              <img 
                src={resolvedTheme === 'dark' ? OrbixLogo.src : OrbixLogo2.src} 
                alt="Orbix Logo" 
                className="w-32 h-auto" 
              />
            )}
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center justify-center flex-1 px-8">
          <div className="flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              How it Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>
          <div className="h-6 w-px bg-border mx-8" />
          <div className="flex items-center space-x-8">
            <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Documentation
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Blog
            </Link>
          </div>
        </nav>

        <div className="flex items-center space-x-6">
          <ModeToggle />
          <div className="hidden sm:flex items-center space-x-4">
            <Button asChild variant="ghost" className="px-4">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-6 rounded-full">
              <Link href="/signup" className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Start Building</span>
              </Link>
            </Button>
            
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>
    </motion.header>
  );
}