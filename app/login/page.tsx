'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { signIn, signInWithGoogle } from '@/lib/auth';
import { 
  Loader2, 
  Mail, 
  Lock, 
  ArrowLeft, 
  Mic, 
  Eye, 
  EyeOff, 
  Sparkles,
  Shield,
  Zap,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for interactive background
  const x = useMotionValue(0);
  const y = useMotionValue(0);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
      } else if (data.user) {
        toast.success('Welcome back!');
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{
            x: useTransform(x, [-500, 500], [-50, 50]),
            y: useTransform(y, [-500, 500], [-50, 50]),
            rotateX,
            rotateY,
          }}
          className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
        />
        <motion.div
          style={{
            x: useTransform(x, [-500, 500], [50, -50]),
            y: useTransform(y, [-500, 500], [50, -50]),
            rotateX,
            rotateY,
          }}
          className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"
        />
        <motion.div
          style={{
            x: useTransform(x, [-500, 500], [-30, 30]),
            y: useTransform(y, [-500, 500], [-30, 30]),
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
          
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Orbix
            </span>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-6">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20"
              >
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  Welcome back to Orbix
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              >
                Ready to{' '}
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Build
                </span>{' '}
                Again?
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-xl text-muted-foreground max-w-lg"
              >
                Sign in to continue your AI-powered development journey. Your projects are waiting for you.
              </motion.p>
            </div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-500" />
                </div>
                <span className="text-sm text-muted-foreground">Secure authentication with enterprise-grade security</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-sm text-muted-foreground">Lightning-fast AI-powered development tools</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-500" />
                </div>
                <span className="text-sm text-muted-foreground">Collaborate with your team in real-time</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex justify-center"
          >
            <motion.div
              ref={cardRef}
              className="w-full max-w-md group"
            >
              <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-lg transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
                <CardHeader className="space-y-2 pb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                    <CardDescription className="text-center text-muted-foreground">
                      Access your AI development workspace
                    </CardDescription>
                  </motion.div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert variant="destructive" className="border-red-500/20 bg-red-500/10">
                        <AlertDescription className="text-red-600 dark:text-red-400">{error}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <Button
                      onClick={handleGoogleSignIn}
                      variant="outline"
                      className="w-full h-12 border-2 hover:bg-muted/50 transition-all duration-200"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      )}
                      Continue with Google
                    </Button>
                  </motion.div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-4 text-muted-foreground font-medium">
                        Or continue with email
                      </span>
                    </div>
                  </div>

                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12 border-2 focus:border-purple-500 transition-colors"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 h-12 border-2 focus:border-purple-500 transition-colors"
                          required
                          disabled={loading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={loading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        'Sign In to Orbix'
                      )}
                    </Button>
                  </motion.form>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="text-center text-sm pt-4"
                  >
                    <span className="text-muted-foreground">Don&apos;t have an account? </span>
                    <Link href="/signup" className="font-medium text-purple-600 hover:text-purple-500 hover:underline transition-colors">
                      Create account
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}