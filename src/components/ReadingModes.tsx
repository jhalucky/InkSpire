  "use client";

  import { useState, useEffect } from "react";
  import { Eye, Zap, BookOpen, Settings, Maximize, Minimize } from "lucide-react";

  interface ReadingModesProps {
    content: string;
    title: string;
    metadata?: {
      readingTime: string;
      publishedAt: string;
    };
    onModeChange?: (mode: 'normal' | 'focus' | 'fast' | 'deep') => void;
  }

  export default function ReadingModes({ content, title, onModeChange }: ReadingModesProps) {
    const [currentMode, setCurrentMode] = useState<'normal' | 'focus' | 'fast' | 'deep'>('normal');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.6);

    const modes = [
      {
        key: 'normal' as const,
        label: 'Normal',
        icon: <BookOpen className="w-4 h-4" />,
        description: 'Standard reading experience'
      },
      {
        key: 'focus' as const,
        label: 'Focus',
        icon: <Eye className="w-4 h-4" />,
        description: 'Distraction-free reading'
      },
      {
        key: 'fast' as const,
        label: 'Fast',
        icon: <Zap className="w-4 h-4" />,
        description: 'Quick summary mode'
      },
      {
        key: 'deep' as const,
        label: 'Deep',
        icon: <BookOpen className="w-4 h-4" />,
        description: 'Enhanced with resources'
      }
    ];

    const handleModeChange = (mode: 'normal' | 'focus' | 'fast' | 'deep') => {
      setCurrentMode(mode);
      onModeChange?.(mode);
      
      // Apply mode-specific styles
      const body = document.body;
      body.className = body.className.replace(/reading-mode-\w+/g, '');
      body.classList.add(`reading-mode-${mode}`);
    };

    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    };

    // Generate fast mode summary (mock implementation)
    const generateFastSummary = (text: string) => {
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const keySentences = sentences.slice(0, Math.ceil(sentences.length * 0.3));
      return keySentences.join('. ') + '.';
    };

    const generateDeepEnhancements = (text: string) => {
      const words = text.split(' ');
      const enhancedWords = words.map(word => {
        if (['technology', 'AI', 'blockchain', 'startup'].includes(word.toLowerCase())) {
          return `<span class="highlight" title="Click for more info">${word}</span>`;
        }
        return word;
      });
      return enhancedWords.join(' ');
    };

    const renderContent = () => {
      switch (currentMode) {
        case 'fast':
          return (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Quick Summary</h3>
                <p className="text-blue-800 dark:text-blue-200">{generateFastSummary(content)}</p>
              </div>
              <div className="text-muted-foreground">
                <p className="text-sm">Reading time: ~2 minutes (vs 8 minutes full article)</p>
              </div>
            </div>
          );
        
        case 'deep':
          return (
            <div className="space-y-4">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: generateDeepEnhancements(content) }}
              />
              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Related Resources</h4>
                <ul className="space-y-1 text-sm">
                  <li>• <a href="#" className="text-primary hover:underline">Understanding AI in Content Creation</a></li>
                  <li>• <a href="#" className="text-primary hover:underline">Best Practices for Blog Writing</a></li>
                  <li>• <a href="#" className="text-primary hover:underline">SEO Optimization Guide</a></li>
                </ul>
              </div>
            </div>
          );
        
        default:
          return (
            <div 
              className="prose prose-lg max-w-none"
              style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}
            >
              {content}
            </div>
          );
      }
    };

    return (
      <div className={`${currentMode === 'focus' ? 'fixed inset-0 z-50 bg-background' : ''}`}>
        {/* Mode Selector */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Reading Mode:</span>
                <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
                  {modes.map((mode) => (
                    <button
                      key={mode.key}
                      onClick={() => handleModeChange(mode.key)}
                      className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        currentMode === mode.key
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      title={mode.description}
                    >
                      {mode.icon}
                      <span className="hidden sm:inline">{mode.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Font Size Controls */}
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                    className="p-1.5 rounded-md hover:bg-accent transition-colors"
                  >
                    -A
                  </button>
                  <span className="text-sm text-muted-foreground min-w-[2rem] text-center">
                    {fontSize}px
                  </span>
                  <button
                    onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                    className="p-1.5 rounded-md hover:bg-accent transition-colors"
                  >
                    +A
                  </button>
                </div>

                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-md hover:bg-accent transition-colors"
                  title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
               
                {currentMode === 'fast' && (
                  <>
                    <span>•</span>
                    <span className="text-blue-600 dark:text-blue-400">Fast mode active</span>
                  </>
                )}
              </div>
            </header>

            <div className="reading-mode">
              {renderContent()}
            </div>
          </article>
        </div>

        {/* Focus Mode Overlay */}
        {currentMode === 'focus' && (
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => handleModeChange('normal')}
              className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
              title="Exit focus mode"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    );
  }
