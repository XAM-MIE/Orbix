'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'dots' | 'pulse' | 'wave';
  className?: string;
  text?: string;
}

export function Loader({ 
  size = 'md', 
  variant = 'default', 
  className,
  text 
}: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center justify-center space-x-1', className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn(
              'rounded-full bg-gradient-to-r from-purple-500 to-blue-500',
              size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
        {text && (
          <span className="ml-3 text-sm text-muted-foreground animate-pulse">
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex flex-col items-center justify-center space-y-3', className)}>
        <motion.div
          className={cn(
            'rounded-full bg-gradient-to-r from-purple-500 to-blue-500',
            sizeClasses[size]
          )}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {text && (
          <motion.span 
            className="text-sm text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {text}
          </motion.span>
        )}
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div className={cn('flex items-center justify-center space-x-1', className)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={cn(
              'bg-gradient-to-t from-purple-500 to-blue-500 rounded-sm',
              size === 'sm' ? 'w-1 h-4' : size === 'md' ? 'w-1.5 h-6' : 'w-2 h-8'
            )}
            animate={{
              scaleY: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
        {text && (
          <span className="ml-3 text-sm text-muted-foreground">
            {text}
          </span>
        )}
      </div>
    );
  }

  // Default spinner
  return (
    <div className={cn('flex flex-col items-center justify-center space-y-3', className)}>
      <motion.div
        className={cn(
          'border-2 border-muted rounded-full border-t-purple-500 border-r-blue-500',
          sizeClasses[size]
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {text && (
        <span className="text-sm text-muted-foreground animate-pulse">
          {text}
        </span>
      )}
    </div>
  );
}

// Full page loader component
export function PageLoader({ text }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <Loader variant="wave" size="lg" text={text} />
      </div>
    </div>
  );
}

// Inline loader for sections
export function SectionLoader({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader variant="dots" size="md" text={text} />
    </div>
  );
}

// Button loader
export function ButtonLoader({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <motion.div
      className={cn(
        'border-2 border-current rounded-full border-t-transparent',
        size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}
