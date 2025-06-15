'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Hammer, 
  GraduationCap, 
  Palette, 
  User, 
  FolderOpen,
  FileText,
  MessageSquare,
  BookOpen,
  Settings,
  Zap,
  Mic
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-muted/10 border-r">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Navigation
            </h2>
            <div className="space-y-1">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  asChild
                  variant={pathname === route.href ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                >
                  <Link href={route.href}>
                    <route.icon className={cn('mr-2 h-4 w-4', route.color)} />
                    {route.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Projects
            </h2>
            <div className="space-y-1">
              {projectRoutes.map((route) => (
                <Button
                  key={route.href}
                  asChild
                  variant={pathname === route.href ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                >
                  <Link href={route.href}>
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Tools
            </h2>
            <div className="space-y-1">
              {toolRoutes.map((route) => (
                <Button
                  key={route.href}
                  asChild
                  variant={pathname === route.href ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                >
                  <Link href={route.href}>
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="px-3 py-2">
            <div className="space-y-1">
              {settingsRoutes.map((route) => (
                <Button
                  key={route.href}
                  asChild
                  variant={pathname === route.href ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                >
                  <Link href={route.href}>
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}