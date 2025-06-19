'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Palette, 
  Type, 
  Layout, 
  Smartphone, 
  Monitor, 
  Tablet,
  Undo,
  Redo,
  Eye,
  Download,
  Share,
  Wand2,
  Move,
  RotateCcw,
  Trash2,
  Plus
} from 'lucide-react';

const colorPalettes = [
  { name: 'Ocean', colors: ['#0891b2', '#06b6d4', '#67e8f9', '#a7f3d0'] },
  { name: 'Sunset', colors: ['#dc2626', '#f97316', '#fbbf24', '#fef3c7'] },
  { name: 'Forest', colors: ['#166534', '#22c55e', '#86efac', '#dcfce7'] },
  { name: 'Purple', colors: ['#7c3aed', '#a855f7', '#c084fc', '#e9d5ff'] },
];

const components = [
  { name: 'Button', icon: 'btn', category: 'Interactive' },
  { name: 'Card', icon: 'card', category: 'Layout' },
  { name: 'Input', icon: 'input', category: 'Forms' },
  { name: 'Navigation', icon: 'nav', category: 'Layout' },
  { name: 'Hero Section', icon: 'hero', category: 'Content' },
  { name: 'Footer', icon: 'footer', category: 'Layout' },
];

export default function DesignPage() {
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  const [selectedPalette, setSelectedPalette] = useState(0);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        {/* Mobile Sidebar */}
        <MobileSidebar />

        {/* Desktop Sidebar */}
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex">
          {/* Design Tools Sidebar */}
          <div className="w-80 border-r flex flex-col">
            <div className="border-b p-4 pt-20 md:pt-4">
              <h2 className="text-xl font-bold mb-2">Design Studio</h2>
              <p className="text-sm text-muted-foreground">
                Visual app designer with drag-and-drop components
              </p>
            </div>
            
            <Tabs defaultValue="components" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
              </TabsList>
              
              <TabsContent value="components" className="flex-1 mt-0 p-4 overflow-auto">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Layout className="w-4 h-4 mr-2" />
                      Layout Components
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {components.filter(c => c.category === 'Layout').map((component, index) => (
                        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-3 text-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded mx-auto mb-2"></div>
                            <p className="text-xs font-medium">{component.name}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Interactive Elements</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {components.filter(c => c.category === 'Interactive').map((component, index) => (
                        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-3 text-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded mx-auto mb-2"></div>
                            <p className="text-xs font-medium">{component.name}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Content Blocks</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {components.filter(c => c.category === 'Content').map((component, index) => (
                        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-3 text-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded mx-auto mb-2"></div>
                            <p className="text-xs font-medium">{component.name}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="style" className="flex-1 mt-0 p-4 overflow-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Palette className="w-4 h-4 mr-2" />
                      Color Palette
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {colorPalettes.map((palette, index) => (
                        <Card 
                          key={index} 
                          className={`cursor-pointer transition-all ${
                            selectedPalette === index ? 'ring-2 ring-purple-500' : ''
                          }`}
                          onClick={() => setSelectedPalette(index)}
                        >
                          <CardContent className="p-3">
                            <div className="flex space-x-1 mb-2">
                              {palette.colors.map((color, colorIndex) => (
                                <div
                                  key={colorIndex}
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: color }}
                                ></div>
                              ))}
                            </div>
                            <p className="text-xs font-medium">{palette.name}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Type className="w-4 h-4 mr-2" />
                      Typography
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs">Font Size</Label>
                        <Slider defaultValue={[16]} max={24} min={12} step={1} className="mt-2" />
                      </div>
                      <div>
                        <Label className="text-xs">Line Height</Label>
                        <Slider defaultValue={[1.5]} max={2} min={1} step={0.1} className="mt-2" />
                      </div>
                      <div>
                        <Label className="text-xs">Letter Spacing</Label>
                        <Slider defaultValue={[0]} max={2} min={-1} step={0.1} className="mt-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Spacing</h3>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs">Padding</Label>
                        <Slider defaultValue={[16]} max={64} min={0} step={4} className="mt-2" />
                      </div>
                      <div>
                        <Label className="text-xs">Margin</Label>
                        <Slider defaultValue={[16]} max={64} min={0} step={4} className="mt-2" />
                      </div>
                      <div>
                        <Label className="text-xs">Border Radius</Label>
                        <Slider defaultValue={[8]} max={32} min={0} step={2} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="layout" className="flex-1 mt-0 p-4 overflow-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Grid System</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm">1 Col</Button>
                      <Button variant="outline" size="sm">2 Col</Button>
                      <Button variant="outline" size="sm">3 Col</Button>
                      <Button variant="outline" size="sm">4 Col</Button>
                      <Button variant="outline" size="sm">Auto</Button>
                      <Button variant="outline" size="sm">Custom</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Alignment</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm">Left</Button>
                      <Button variant="outline" size="sm">Center</Button>
                      <Button variant="outline" size="sm">Right</Button>
                      <Button variant="outline" size="sm">Top</Button>
                      <Button variant="outline" size="sm">Middle</Button>
                      <Button variant="outline" size="sm">Bottom</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Container</h3>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs">Max Width</Label>
                        <Input placeholder="1200px" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs">Min Height</Label>
                        <Input placeholder="400px" className="mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant={selectedDevice === 'desktop' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedDevice('desktop')}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant={selectedDevice === 'tablet' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedDevice('tablet')}
                    >
                      <Tablet className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant={selectedDevice === 'mobile' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setSelectedDevice('mobile')}
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Undo className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Redo className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>

            {/* Design Canvas */}
            <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 overflow-auto">
              <div className="max-w-6xl mx-auto">
                <div 
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg mx-auto transition-all duration-300 ${
                    selectedDevice === 'desktop' ? 'w-full' : 
                    selectedDevice === 'tablet' ? 'w-3/4 max-w-2xl' : 
                    'w-96 max-w-sm'
                  }`}
                  style={{ minHeight: '600px' }}
                >
                  <div className="p-8 h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Wand2 className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">Design Canvas</h2>
                      <p className="text-muted-foreground mb-8">
                        Drag components from the sidebar to start building your app interface
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                        <Button variant="outline" className="flex items-center justify-center space-x-2">
                          <Plus className="w-4 h-4" />
                          <span>Add Component</span>
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center space-x-2">
                          <Wand2 className="w-4 h-4" />
                          <span>AI Generate</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Panel */}
          <div className="w-80 border-l flex flex-col">
            <div className="border-b p-4">
              <h3 className="font-semibold">Properties</h3>
              <p className="text-sm text-muted-foreground">
                Configure selected element
              </p>
            </div>
            
            <div className="flex-1 p-4 overflow-auto">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Element Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Move className="w-4 h-4 mr-2" />
                        Move
                      </Button>
                      <Button variant="outline" size="sm">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Rotate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Hide
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Dimensions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs">Width</Label>
                        <Input placeholder="100%" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs">Height</Label>
                        <Input placeholder="auto" className="mt-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Position</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">X</Label>
                        <Input placeholder="0" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs">Y</Label>
                        <Input placeholder="0" className="mt-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}