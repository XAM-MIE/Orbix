'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader, PageLoader, SectionLoader, ButtonLoader } from '@/components/ui/loader';

export default function LoaderDemoPage() {
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleButtonClick = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 3000);
  };

  const handlePageLoaderClick = () => {
    setShowPageLoader(true);
    setTimeout(() => setShowPageLoader(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      {showPageLoader && <PageLoader text="Demo loading..." />}
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Loader Components Demo
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Default Spinner */}
            <Card>
              <CardHeader>
                <CardTitle>Default Spinner</CardTitle>
                <CardDescription>Classic spinning loader with gradient colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center py-8">
                  <Loader variant="default" size="sm" text="Small" />
                </div>
                <div className="flex items-center justify-center py-8">
                  <Loader variant="default" size="md" text="Medium" />
                </div>
                <div className="flex items-center justify-center py-8">
                  <Loader variant="default" size="lg" text="Large" />
                </div>
              </CardContent>
            </Card>

            {/* Dots Loader */}
            <Card>
              <CardHeader>
                <CardTitle>Dots Loader</CardTitle>
                <CardDescription>Animated dots with sequential scaling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center py-8">
                  <Loader variant="dots" size="sm" text="Loading..." />
                </div>
                <div className="flex items-center justify-center py-8">
                  <Loader variant="dots" size="md" text="Processing..." />
                </div>
                <div className="flex items-center justify-center py-8">
                  <Loader variant="dots" size="lg" text="Please wait..." />
                </div>
              </CardContent>
            </Card>

            {/* Pulse Loader */}
            <Card>
              <CardHeader>
                <CardTitle>Pulse Loader</CardTitle>
                <CardDescription>Smooth pulsing animation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center py-8">
                  <Loader variant="pulse" size="sm" text="Syncing..." />
                </div>
                <div className="flex items-center justify-center py-8">
                  <Loader variant="pulse" size="md" text="Connecting..." />
                </div>
                <div className="flex items-center justify-center py-8">
                  <Loader variant="pulse" size="lg" text="Initializing..." />
                </div>
              </CardContent>
            </Card>

            {/* Wave Loader */}
            <Card>
              <CardHeader>
                <CardTitle>Wave Loader</CardTitle>
                <CardDescription>Audio wave-inspired animation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center py-8">
                  <Loader variant="wave" size="sm" text="Listening..." />
                </div>
                <div className="flex items-center justify-center py-8">
                  <Loader variant="wave" size="md" text="Processing voice..." />
                </div>
                <div className="flex items-center justify-center py-8">
                  <Loader variant="wave" size="lg" text="Generating code..." />
                </div>
              </CardContent>
            </Card>

            {/* Section Loader */}
            <Card>
              <CardHeader>
                <CardTitle>Section Loader</CardTitle>
                <CardDescription>For loading content within sections</CardDescription>
              </CardHeader>
              <CardContent>
                <SectionLoader text="Loading content..." />
              </CardContent>
            </Card>

            {/* Interactive Demos */}
            <Card>
              <CardHeader>
                <CardTitle>Interactive Demos</CardTitle>
                <CardDescription>Try the loaders in action</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleButtonClick}
                  disabled={buttonLoading}
                  className="w-full"
                >
                  {buttonLoading ? (
                    <>
                      <ButtonLoader size="sm" />
                      <span className="ml-2">Loading...</span>
                    </>
                  ) : (
                    'Click to Load'
                  )}
                </Button>
                
                <Button 
                  onClick={handlePageLoaderClick}
                  variant="outline"
                  className="w-full"
                >
                  Show Page Loader
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
