'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/contexts/SidebarContext';
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
  Mic,
  ChevronLeft,
  ChevronRight
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
  const { isOpen, toggle } = useSidebar();
  const collapsed = !isOpen;

  return (
    <div 
      className={`relative space-y-4 py-4 flex flex-col h-full bg-muted/10 border-r ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 group`}
    >
      {/* Toggle button that appears on hover - now vertically centered */}
      <button 
        onClick={toggle}
        className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-1/2 bg-background border rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow-md hover:bg-muted"
        type="button"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? 
          <ChevronRight className="h-4 w-4" /> : 
          <ChevronLeft className="h-4 w-4" />
        }
      </button>

      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          <div className="px-3 py-2">
            {!collapsed && (
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Navigation
              </h2>
            )}
            <div className="space-y-1 flex flex-col items-center">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  asChild
                  variant={pathname === route.href ? 'secondary' : 'ghost'}
                  className={`${collapsed ? 'justify-center w-10 h-10 p-0' : 'w-full justify-start'}`}
                  title={collapsed ? route.label : undefined}
                >
                  <Link href={route.href} className={collapsed ? 'flex justify-center' : ''}>
                    <route.icon className={cn('h-4 w-4', route.color, collapsed ? '' : 'mr-2')} />
                    {!collapsed && route.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          
          {!collapsed && <Separator />}
          
          <div className="px-3 py-2">
            {!collapsed && (
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Projects
              </h2>
            )}
            <div className="space-y-1 flex flex-col items-center">
              {projectRoutes.map((route) => (
                <Button
                  key={route.href}
                  asChild
                  variant={pathname === route.href ? 'secondary' : 'ghost'}
                  className={`${collapsed ? 'justify-center w-10 h-10 p-0' : 'w-full justify-start'}`}
                  title={collapsed ? route.label : undefined}
                >
                  <Link href={route.href} className={collapsed ? 'flex justify-center' : ''}>
                    <route.icon className={`h-4 w-4 ${collapsed ? '' : 'mr-2'}`} />
                    {!collapsed && route.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          
          {!collapsed && <Separator />}
          
          <div className="px-3 py-2">
            {!collapsed && (
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Tools
              </h2>
            )}
            <div className="space-y-1 flex flex-col items-center">
              {toolRoutes.map((route) => (
                <Button
                  key={route.href}
                  asChild
                  variant={pathname === route.href ? 'secondary' : 'ghost'}
                  className={`${collapsed ? 'justify-center w-10 h-10 p-0' : 'w-full justify-start'}`}
                  title={collapsed ? route.label : undefined}
                >
                  <Link href={route.href} className={collapsed ? 'flex justify-center' : ''}>
                    <route.icon className={`h-4 w-4 ${collapsed ? '' : 'mr-2'}`} />
                    {!collapsed && route.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          
          {!collapsed && <Separator />}
          
          <div className="px-3 py-2">
            <div className="space-y-1 flex flex-col items-center">
              {settingsRoutes.map((route) => (
                <Button
                  key={route.href}
                  asChild
                  variant={pathname === route.href ? 'secondary' : 'ghost'}
                  className={`${collapsed ? 'justify-center w-10 h-10 p-0' : 'w-full justify-start'}`}
                  title={collapsed ? route.label : undefined}
                >
                  <Link href={route.href} className={collapsed ? 'flex justify-center' : ''}>
                    <route.icon className={`h-4 w-4 ${collapsed ? '' : 'mr-2'}`} />
                    {!collapsed && route.label}
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
