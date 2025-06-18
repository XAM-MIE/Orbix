'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Mic, Sparkles, Menu, ChevronDown, X } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import OrbixLogo from '@/assets/Orbix logo.png';
import OrbixLogo2 from '@/assets/OrBix_Logo2.png';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Header() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

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
        className="container max-w-5xl mx-auto px-4 flex h-14 items-center justify-between rounded-full border border-border bg-gradient-to-r from-black-600 to-black-600 shadow-lg"
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
            <Link
              href="/features"
              className={cn(
                "text-sm font-medium transition-colors relative",
                isActive('/features')
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Features
              {isActive('/features') && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
            <Link
              href="/how-it-works"
              className={cn(
                "text-sm font-medium transition-colors relative",
                isActive('/how-it-works')
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              How it Works
              {isActive('/how-it-works') && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
            <Link
              href="/pricing"
              className={cn(
                "text-sm font-medium transition-colors relative",
                isActive('/pricing')
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Pricing
              {isActive('/pricing') && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </div>
          <div className="h-6 w-px bg-border mx-8" />
          <div className="flex items-center space-x-8">
            <Link
              href="/docs"
              className={cn(
                "text-sm font-medium transition-colors relative",
                isActive('/docs')
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Documentation
              {isActive('/docs') && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
            <Link
              href="/blog"
              className={cn(
                "text-sm font-medium transition-colors relative",
                isActive('/blog')
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Blog
              {isActive('/blog') && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
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

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 pb-4 border-b">
                  {mounted && (
                    <img
                      src={resolvedTheme === 'dark' ? OrbixLogo.src : OrbixLogo2.src}
                      alt="Orbix Logo"
                      className="w-24 h-auto"
                    />
                  )}
                </div>

                <div className="flex flex-col space-y-3 pt-4">
                  <Link
                    href="/features"
                    className={cn(
                      "text-lg font-medium transition-colors py-2 px-3 rounded-lg relative",
                      isActive('/features')
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    Features
                    {isActive('/features') && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full" />
                    )}
                  </Link>
                  <Link
                    href="/how-it-works"
                    className={cn(
                      "text-lg font-medium transition-colors py-2 px-3 rounded-lg relative",
                      isActive('/how-it-works')
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    How it Works
                    {isActive('/how-it-works') && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full" />
                    )}
                  </Link>
                  <Link
                    href="/pricing"
                    className={cn(
                      "text-lg font-medium transition-colors py-2 px-3 rounded-lg relative",
                      isActive('/pricing')
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    Pricing
                    {isActive('/pricing') && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full" />
                    )}
                  </Link>
                  <Link
                    href="/docs"
                    className={cn(
                      "text-lg font-medium transition-colors py-2 px-3 rounded-lg relative",
                      isActive('/docs')
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    Documentation
                    {isActive('/docs') && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full" />
                    )}
                  </Link>
                  <Link
                    href="/blog"
                    className={cn(
                      "text-lg font-medium transition-colors py-2 px-3 rounded-lg relative",
                      isActive('/blog')
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    Blog
                    {isActive('/blog') && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full" />
                    )}
                  </Link>
                </div>

                <div className="flex flex-col space-y-3 pt-6 border-t">
                  <Button asChild variant="ghost" className="justify-start text-lg h-12">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 justify-start text-lg h-12">
                    <Link href="/signup" className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Start Building</span>
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </motion.header>
  );
}