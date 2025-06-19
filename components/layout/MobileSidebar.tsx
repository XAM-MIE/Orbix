'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/contexts/SidebarContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Hammer, 
  GraduationCap, 
  Palette, 
  User, 
  FolderOpen,
  FileText,
  MessageSquare,
  Settings,
  Zap,
  Mic,
  X,
  Menu
} from 'lucide-react';

const routes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Build',
    icon: Hammer,
    href: '/build',
    color: 'text-violet-500',
  },
  {
    label: 'Mentor',
    icon: GraduationCap,
    href: '/mentor',
    color: 'text-pink-700',
  },
  {
    label: 'Design',
    icon: Palette,
    href: '/design',
    color: 'text-orange-700',
  },
  {
    label: 'Profile',
    icon: User,
    href: '/profile',
    color: 'text-green-700',
  },
];

const projectRoutes = [
  {
    label: 'Projects',
    icon: FolderOpen,
    href: '/projects',
  },
  {
    label: 'Templates',
    icon: FileText,
    href: '/templates',
  },
];

const toolRoutes = [
  {
    label: 'Voice Chat',
    icon: MessageSquare,
    href: '/voice-chat',
  },
  {
    label: 'AI Agents',
    icon: Zap,
    href: '/agents',
  },
  {
    label: 'Integrations',
    icon: Mic,
    href: '/integrations',
  },
];

const settingsRoutes = [
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export function MobileSidebar() {
  const pathname = usePathname();
  const { isMobileOpen, toggleMobile, closeMobile } = useSidebar();

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const sidebarVariants = {
    hidden: { 
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    visible: { 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  const handleLinkClick = () => {
    closeMobile();
  };

  return (
    <>
      {/* Mobile Menu Button - Minimal Design */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-6 left-6 z-50 w-10 h-10 rounded-lg bg-background/90 backdrop-blur-sm border border-border/50 shadow-lg hover:bg-muted/50 transition-all duration-200 flex items-center justify-center group"
        aria-label="Toggle mobile menu"
      >
        <div className="relative w-5 h-5 flex flex-col justify-center items-center">
          <span className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${isMobileOpen ? 'rotate-45 translate-y-0.5' : ''}`} />
          <span className={`block h-0.5 w-5 bg-foreground transition-all duration-300 mt-1 ${isMobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-foreground transition-all duration-300 mt-1 ${isMobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </button>

      {/* Mobile Sidebar Overlay and Panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMobile}
            />

            {/* Sidebar Panel */}
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed left-0 top-0 bottom-0 w-80 bg-background border-r shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Mic className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Orbix
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobile}
                  className="hover:bg-muted/50"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Navigation Content */}
              <div className="p-6 space-y-6">
                {/* Main Navigation */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Navigation
                  </h3>
                  <div className="space-y-1">
                    {routes.map((route, index) => (
                      <motion.div
                        key={route.href}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                      >
                        <Button
                          asChild
                          variant={pathname === route.href ? 'secondary' : 'ghost'}
                          className="w-full justify-start h-12 text-base relative overflow-hidden group"
                          onClick={handleLinkClick}
                        >
                          <Link href={route.href}>
                            <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                            {route.label}
                            {pathname === route.href && (
                              <motion.div
                                layoutId="mobile-active-indicator"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                          </Link>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Projects */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Projects
                  </h3>
                  <div className="space-y-1">
                    {projectRoutes.map((route, index) => (
                      <motion.div
                        key={route.href}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={routes.length + index}
                      >
                        <Button
                          asChild
                          variant={pathname === route.href ? 'secondary' : 'ghost'}
                          className="w-full justify-start h-12 text-base relative overflow-hidden"
                          onClick={handleLinkClick}
                        >
                          <Link href={route.href}>
                            <route.icon className="h-5 w-5 mr-3" />
                            {route.label}
                            {pathname === route.href && (
                              <motion.div
                                layoutId="mobile-active-indicator"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                          </Link>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Tools */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Tools
                  </h3>
                  <div className="space-y-1">
                    {toolRoutes.map((route, index) => (
                      <motion.div
                        key={route.href}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={routes.length + projectRoutes.length + index}
                      >
                        <Button
                          asChild
                          variant={pathname === route.href ? 'secondary' : 'ghost'}
                          className="w-full justify-start h-12 text-base relative overflow-hidden"
                          onClick={handleLinkClick}
                        >
                          <Link href={route.href}>
                            <route.icon className="h-5 w-5 mr-3" />
                            {route.label}
                            {pathname === route.href && (
                              <motion.div
                                layoutId="mobile-active-indicator"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                          </Link>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Settings */}
                <div>
                  {settingsRoutes.map((route, index) => (
                    <motion.div
                      key={route.href}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={routes.length + projectRoutes.length + toolRoutes.length + index}
                    >
                      <Button
                        asChild
                        variant={pathname === route.href ? 'secondary' : 'ghost'}
                        className="w-full justify-start h-12 text-base relative overflow-hidden"
                        onClick={handleLinkClick}
                      >
                        <Link href={route.href}>
                          <route.icon className="h-5 w-5 mr-3" />
                          {route.label}
                          {pathname === route.href && (
                            <motion.div
                              layoutId="mobile-active-indicator"
                              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full"
                              initial={false}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
