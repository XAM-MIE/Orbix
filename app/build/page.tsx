'use client';

import React, { useState, useRef, useCallback } from 'react';
import { ProtectedRoute } from '@/components/ui/protected-route';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSidebar } from '@/contexts/SidebarContext';
import { 
  Mic, 
  MicOff, 
  Send, 
  Code, 
  Eye, 
  Download, 
  Globe,
  Sparkles,
  MessageSquare,
  Clock,
  Zap,
  Play,
  Settings,
  FileText,
  Palette,
  ArrowRight,
  CheckCircle,
  Loader2,
  Monitor,
  Smartphone,
  ChevronDown,
  ChevronUp,
  FileCode2,
  TerminalSquare
} from 'lucide-react';
import { LiveProvider, LivePreview, LiveError } from 'react-live';
import MonacoEditor from '@monaco-editor/react';

const DEFAULT_FILES = [
  {
    name: 'index.html',
    type: 'html',
    icon: <FileText className="w-4 h-4 mr-2 text-blue-400" />,
    code: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Simple HTML Example</title>\n  </head>\n  <body>\n    <h1>Hello, Bolt!</h1>\n    <p>This is a simple HTML file.</p>\n  </body>\n</html>`
  }
];

function highlightCode(code: string, type: string): string {
  // Very basic syntax highlighting for demo purposes
  if (type === 'jsx') {
    return code
      .replace(/(import|from|return|export|default|function|const|let|var|if|else|class|new|extends)/g, '<span class="text-purple-400">$1</span>')
      .replace(/('.*?'|".*?")/g, '<span class="text-amber-300">$1</span>')
      .replace(/(\b[A-Z][A-Za-z0-9_]*\b)/g, '<span class="text-sky-300">$1</span>') // Components
      .replace(/(\d+)/g, '<span class="text-pink-300">$1</span>');
  }
  if (type === 'css') {
    return code
      .replace(/(\.[a-zA-Z0-9_-]+)/g, '<span class="text-sky-300">$1</span>')
      .replace(/(:\s*[^;]+;)/g, '<span class="text-amber-300">$1</span>')
      .replace(/(\{)|(\})/g, '<span class="text-purple-400">$&</span>');
  }
  if (type === 'js') {
    return code
      .replace(/(console|log)/g, '<span class="text-sky-300">$1</span>')
      .replace(/('.*?'|".*?")/g, '<span class="text-amber-300">$1</span>');
  }
  return code;
}

// Helper to parse code blocks from AI response
function parseCodeBlocks(aiContent: string) {
  const result: Record<string, string> = {};
  const filePatterns = [
    { type: 'jsx', name: 'App.jsx', regex: /(?:\/\/\s*App\.jsx|#\s*App\.jsx|App\.jsx)\s*```[\s\S]*?([a-zA-Z]+)?\n([\s\S]*?)```/i },
    { type: 'css', name: 'styles.css', regex: /(?:\/\/\s*styles\.css|#\s*styles\.css|styles\.css)\s*```[\s\S]*?([a-zA-Z]+)?\n([\s\S]*?)```/i },
    { type: 'js', name: 'script.js', regex: /(?:\/\/\s*script\.js|#\s*script\.js|script\.js)\s*```[\s\S]*?([a-zA-Z]+)?\n([\s\S]*?)```/i },
  ];
  for (const { type, regex } of filePatterns) {
    const match = aiContent.match(regex);
    if (match) {
      result[type] = match[2]?.trim() || '';
    }
  }
  return result;
}

// Helper to parse HTML code blocks from AI response
function parseHtmlFromAI(content: string): string | null {
  // Look for code blocks with html or plain code
  const htmlBlock = content.match(/```html([\s\S]*?)```/i);
  if (htmlBlock) return htmlBlock[1].trim();
  // Fallback: look for <html>...</html>
  const htmlTag = content.match(/(<html[\s\S]*<\/html>)/i);
  if (htmlTag) return htmlTag[1].trim();
  return null;
}

// Helper to strip import/export lines for react-live preview
function getPreviewJSX(code: string) {
  return (code || '')
    .split('\n')
    .filter(
      line =>
        !line.trim().startsWith('import') &&
        !line.trim().startsWith('export') &&
        line.trim() !== ''
    )
    .join('\n');
}

// Helper to generate a full HTML document from user files
function getCombinedHTML(fileCodes: Record<string, string>, files: any[]) {
  const htmlFile = files.find(f => f.name === 'index.html');
  const cssFile = files.find(f => f.name === 'styles.css');
  const jsFile = files.find(f => f.name === 'script.js');
  if (!htmlFile || !cssFile || !jsFile) return null;
  const html = fileCodes[htmlFile.type] || '';
  const css = fileCodes[cssFile.type] || '';
  const js = fileCodes[jsFile.type] || '';
  return `<!DOCTYPE html>\n<html>\n<head>\n<style>\n${css}\n</style>\n</head>\n<body>\n${html}\n<script>\n${js}\n</script>\n</body>\n</html>`;
}

// HTMLPreview component for the Preview tab (live reload, no Run button)
function HTMLPreview({ code }: { code: string }) {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {code.trim() ? (
        <iframe
          style={{ width: '100%', maxWidth: 800, height: 600, border: '1px solid #ccc', borderRadius: 8, background: 'white' }}
          sandbox="allow-scripts"
          srcDoc={code}
        />
      ) : (
        <div style={{ color: '#888', fontStyle: 'italic' }}>No HTML code to preview.</div>
      )}
    </div>
  );
}

export default function BuildPage() {
  const { isOpen } = useSidebar();
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [conversation, setConversation] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m ready to help you build your app. Describe what you want to create, and I\'ll generate the code and preview for you.',
      timestamp: new Date().toISOString()
    }
  ]);
  const [showTerminal, setShowTerminal] = useState(true);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLines, setTerminalLines] = useState([
    '✔ Compiled successfully in 2.3s (278 modules)',
    '$'
  ]);
  const [files, setFiles] = useState(DEFAULT_FILES);
  const [activeFile, setActiveFile] = useState(DEFAULT_FILES[0].type);
  const [loadingAI, setLoadingAI] = useState(false);
  const [errorAI, setErrorAI] = useState<string | null>(null);
  const [fileCodes, setFileCodes] = useState<Record<string, string>>(() =>
    Object.fromEntries(DEFAULT_FILES.map(f => [f.type, f.code]))
  );
  const newFileNameRef = useRef<HTMLInputElement>(null);
  const newFileTypeRef = useRef<HTMLSelectElement>(null);
  const [jsConsole, setJsConsole] = useState<string[]>([]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice transcription
      setTimeout(() => {
        const transcribedText = "Create a modern task management app with a clean interface and drag and drop functionality";
        setMessage(transcribedText);
        setIsRecording(false);
      }, 3000);
    }
  };

  // Send message to Groq API with streaming
  async function sendAIMessageStream(messages: { role: string; content: string }[], onChunk: (chunk: string) => void) {
    setLoadingAI(true);
    setErrorAI(null);
    try {
      const res = await fetch('/api/groq-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      if (!res.body) {
        setLoadingAI(false);
        setErrorAI('No response body from Groq.');
        return '';
      }
      const reader = res.body.getReader();
      let aiContent = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        aiContent += chunk;
        onChunk(chunk);
      }
      setLoadingAI(false);
      return aiContent;
    } catch (err) {
      setLoadingAI(false);
      setErrorAI('Error contacting Groq API.');
      return '';
    }
  }

  // Update handleSendMessage to update fileCodes after AI response
  const handleSendMessage = async () => {
    if (!message.trim() || isGenerating) return;

    const userMessage = {
      id: conversation.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setIsGenerating(true);

    // Prepare messages for Groq
    const groqMessages = [
      ...conversation.map(msg => ({ role: msg.type === 'user' ? 'user' : 'assistant', content: msg.content })),
      { role: 'user', content: message }
    ];

    // Add a placeholder assistant message for streaming
    const aiId = Date.now();
    setConversation(prev => [...prev, { id: aiId, type: 'assistant', content: '', timestamp: new Date().toISOString() }]);

    let streamedContent = '';
    await sendAIMessageStream(groqMessages, (chunk) => {
      streamedContent += chunk;
      setConversation(prev => prev.map(msg =>
        msg.id === aiId ? { ...msg, content: streamedContent } : msg
      ));
    });
    setIsGenerating(false);

    // Parse code blocks and update fileCodes
    const codeBlocks = parseCodeBlocks(streamedContent);
    if (Object.keys(codeBlocks).length > 0) {
      setFileCodes(prev => ({ ...prev, ...codeBlocks }));
    }

    // NEW: Parse for HTML and update index.html if found
    const htmlCode = parseHtmlFromAI(streamedContent);
    if (htmlCode) {
      // Find index.html file or add it if missing
      let htmlFile = files.find(f => f.name === 'index.html');
      if (!htmlFile) {
        const newFile = {
          name: 'index.html',
          type: 'html',
          icon: <FileText className="w-4 h-4 mr-2 text-blue-400" />,
          code: htmlCode
        };
        setFiles(prev => [...prev, newFile]);
        setFileCodes(prev => ({ ...prev, html: htmlCode }));
        setActiveFile('html');
      } else {
        setFileCodes(prev => ({ ...prev, [htmlFile.type]: htmlCode }));
        setActiveFile(htmlFile.type);
      }
    }
  };

  const handleTerminalInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTerminalLines(lines => [...lines.slice(0, -1), `$ ${terminalInput}`, 'command not found', '$']);
      setTerminalInput('');
    }
  };

  // Function to run JS code in a sandboxed iframe and capture console.log
  const runScriptJs = useCallback(() => {
    const jsCode = fileCodes['js'] || '';
    let iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('sandbox', 'allow-scripts');
    document.body.appendChild(iframe);
    let logs: string[] = [];
    try {
      // Override console.log in the iframe
      (iframe.contentWindow as any).console.log = (...args: any[]) => {
        logs.push(args.map(String).join(' '));
      };
      (iframe.contentWindow as any).console.error = (...args: any[]) => {
        logs.push('Error: ' + args.map(String).join(' '));
      };
      (iframe.contentWindow as any).console.warn = (...args: any[]) => {
        logs.push('Warning: ' + args.map(String).join(' '));
      };
      // Run the code
      (iframe.contentWindow as any).eval(jsCode);
    } catch (err: any) {
      logs.push('Error: ' + err.message);
    }
    setJsConsole(logs);
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 0);
  }, [fileCodes]);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <div className={`transition-all duration-300 overflow-hidden hidden md:block ${isOpen ? 'w-64' : 'w-16'}`}>
          <Sidebar />
        </div>
        
        <div className="flex-1 flex">
          {/* Chat Panel - Left Side */}
          <div className="w-2/5 flex flex-col border-r">
            {/* Chat Header */}
            <div className="border-b p-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold">AI Builder</h1>
                  <p className="text-sm text-muted-foreground">Describe your app idea</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>15:42</span>
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {msg.type === 'assistant' && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {loadingAI && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 max-w-[80%] flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <Loader2 className="w-3 h-3 text-white animate-spin" />
                    </div>
                    <span className="text-xs text-muted-foreground">Groq is thinking...</span>
                  </div>
                </div>
              )}
              {errorAI && (
                <div className="flex justify-start">
                  <div className="bg-red-900/80 text-red-200 rounded-lg p-3 max-w-[80%] text-xs">
                    {errorAI}
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t p-4 bg-muted/30">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Textarea
                    placeholder="Describe the app you want to build..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[60px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={toggleRecording}
                    variant={isRecording ? "destructive" : "outline"}
                    size="icon"
                    className={isRecording ? "animate-pulse" : ""}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button 
                    onClick={handleSendMessage} 
                    size="icon"
                    disabled={isGenerating || !message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview/Code/Terminal Panel - Right Side */}
          <div className="w-3/5 flex flex-col">
            {/* Panel Header */}
            <div className="border-b p-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                    <TabsList>
                      <TabsTrigger value="preview" className="flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </TabsTrigger>
                      <TabsTrigger value="code" className="flex items-center space-x-2">
                        <Code className="w-4 h-4" />
                        <span>Code</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Monitor className="w-4 h-4 mr-2" />
                    Desktop
                  </Button>
                  <Button variant="outline" size="sm">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Mobile
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                    <Globe className="w-4 h-4 mr-2" />
                    Deploy
                  </Button>
                </div>
              </div>
            </div>

            {/* Panel Content (vertical split) */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {activeTab === 'preview' && (
                (() => {
                  const indexHtmlFile = files.find(f => f.name === 'index.html');
                  if (indexHtmlFile) {
                    return <HTMLPreview code={fileCodes[indexHtmlFile.type] || ''} />;
                  }
                  // fallback to React live preview
                  return (
                    <div className="flex-1 p-4 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-t-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                      <LiveProvider code={getPreviewJSX(fileCodes['jsx'])}>
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <div className="w-full max-w-2xl min-h-[200px] bg-white dark:bg-[#181A20] rounded-lg shadow p-6 flex items-center justify-center">
                            <LivePreview />
                          </div>
                          <LiveError className="mt-2 text-xs text-red-500 bg-red-100 dark:bg-red-900/40 p-2 rounded" />
                        </div>
                      </LiveProvider>
                    </div>
                  );
                })()
              )}
              {activeTab === 'code' && (
                <div className="flex h-full bg-[#181A20] rounded-t-lg border-2 border-[#23262F]">
                  {/* Vertical File List */}
                  <div className="w-36 bg-[#23262F] border-r border-[#23262F] flex flex-col py-2">
                    {files.map(file => (
                      <div key={file.type} className="relative group flex items-center">
                        <button
                          onClick={() => setActiveFile(file.type)}
                          className={`w-full text-left px-3 py-2 flex items-center font-mono text-xs focus:outline-none transition-colors mb-1 border-l-4 ${
                            activeFile === file.type
                              ? 'bg-[#181A20] text-white border-purple-500'
                              : 'bg-[#23262F] text-white/60 border-transparent hover:text-white hover:bg-[#23262F]/80'
                          }`}
                        >
                          {file.icon}
                          {file.name}
                        </button>
                        {/* Delete file button (show only if more than 1 file) */}
                        {files.length > 1 && (
                          <button
                            className="absolute right-1 top-1 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-transparent"
                            title="Delete file"
                            tabIndex={-1}
                            onClick={e => {
                              e.stopPropagation();
                              const idx = files.findIndex(f => f.type === file.type);
                              const newFiles = files.filter(f => f.type !== file.type);
                              setFiles(newFiles);
                              setFileCodes(prev => {
                                const updated = { ...prev };
                                delete updated[file.type];
                                return updated;
                              });
                              // If the deleted file was active, switch to another file
                              if (activeFile === file.type && newFiles.length > 0) {
                                setActiveFile(newFiles[Math.max(0, idx - 1)].type);
                              }
                            }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    {/* Add file UI */}
                    <form
                      className="px-2 pt-2 flex flex-col gap-1 border-t border-[#23262F]"
                      onSubmit={e => {
                        e.preventDefault();
                        const name = newFileNameRef.current?.value?.trim();
                        const type = newFileTypeRef.current?.value;
                        if (!name || !type || files.find(f => f.name === name || f.type === type)) return;
                        setFiles(prev => [
                          ...prev,
                          {
                            name,
                            type,
                            icon: <FileText className="w-4 h-4 mr-2 text-gray-400" />,
                            code: ''
                          }
                        ]);
                        setFileCodes(prev => ({ ...prev, [type]: '' }));
                        setActiveFile(type);
                        if (newFileNameRef.current) newFileNameRef.current.value = '';
                      }}
                    >
                      <input
                        ref={newFileNameRef}
                        className="w-full text-xs px-2 py-1 rounded bg-[#181A20] text-white border border-[#23262F] mb-1"
                        placeholder="New file name (e.g. utils.js)"
                        required
                      />
                      <select
                        ref={newFileTypeRef}
                        className="w-full text-xs px-2 py-1 rounded bg-[#181A20] text-white border border-[#23262F] mb-1"
                        defaultValue="js"
                        required
                      >
                        <option value="js">JavaScript (.js)</option>
                        <option value="jsx">JSX (.jsx)</option>
                        <option value="css">CSS (.css)</option>
                        <option value="ts">TypeScript (.ts)</option>
                        <option value="tsx">TSX (.tsx)</option>
                        <option value="json">JSON (.json)</option>
                        <option value="html">HTML (.html)</option>
                        <option value="md">Markdown (.md)</option>
                      </select>
                      <button type="submit" className="w-full text-xs py-1 rounded bg-purple-600 hover:bg-purple-700 text-white">Add File</button>
                    </form>
                  </div>
                  {/* Code Area with Monaco Editor */}
                  <div className="flex-1 flex flex-col">
                    {/* Header Bar */}
                    <div className="flex items-center px-4 py-2 bg-[#1a1c23] border-b border-[#23262F] text-xs text-white/80 font-mono">
                      {files.find(f => f.type === activeFile)?.icon}
                      <span className="ml-1 font-semibold">{files.find(f => f.type === activeFile)?.name}</span>
                    </div>
                    {/* Monaco Editor */}
                    <div className="flex-1 overflow-auto bg-[#181A20] flex">
                      <MonacoEditor
                        height="100%"
                        width="100%"
                        theme="vs-dark"
                        language={activeFile === 'jsx' ? 'javascript' : activeFile}
                        value={fileCodes[activeFile] || ''}
                        options={{
                          fontSize: 14,
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                          wordWrap: 'on',
                          fontFamily: 'Fira Mono, monospace',
                          automaticLayout: true,
                        }}
                        onChange={(value) => {
                          setFileCodes(prev => ({ ...prev, [activeFile]: value || '' }));
                        }}
                      />
                    </div>
                    {/* Terminal Panel (only in code tab) */}
                    <div className={`bg-[#181A20] border-t border-[#23262F] ${showTerminal ? 'h-1/3' : 'h-8'} transition-all duration-300 flex flex-col shadow-inner`}>
                      <div className="flex items-center px-4 py-2 bg-[#23262F] text-xs text-white/80 cursor-pointer select-none border-t border-[#23262F]" onClick={() => setShowTerminal(v => !v)}>
                        <TerminalSquare className="w-4 h-4 mr-2 text-green-400" />
                        <span className="font-mono">Terminal</span>
                        <span className="ml-2">{showTerminal ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}</span>
                      </div>
                      {showTerminal && (
                        <div className="flex-1 overflow-auto p-3 font-mono text-xs text-[#B5BFE2] bg-[#181A20]">
                          {terminalLines.map((line, i) => (
                            <div key={i} className="whitespace-pre">{line}</div>
                          ))}
                          <input
                            className="w-full bg-transparent border-none outline-none text-[#B5BFE2] font-mono mt-1"
                            value={terminalInput}
                            onChange={e => setTerminalInput(e.target.value)}
                            onKeyDown={handleTerminalInput}
                            placeholder="$"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
