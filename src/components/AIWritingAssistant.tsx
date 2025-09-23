"use client";

import { useState, useEffect } from "react";
import { Sparkles, CheckCircle, AlertCircle, Lightbulb, Target, Eye, Zap } from "lucide-react";

interface AIWritingAssistantProps {
  content: string;
  title: string;
  onSuggestionApply?: (suggestion: string) => void;
}

interface Suggestion {
  id: string;
  type: 'grammar' | 'readability' | 'seo' | 'style';
  message: string;
  suggestion: string;
  severity: 'low' | 'medium' | 'high';
  position?: { start: number; end: number };
}

export default function AIWritingAssistant({ content, title, onSuggestionApply }: AIWritingAssistantProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'grammar' | 'readability' | 'seo' | 'style'>('all');

  // Mock AI analysis - in real implementation, this would call an AI API
  const analyzeContent = async () => {
    setIsAnalyzing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock suggestions based on content analysis
    const mockSuggestions: Suggestion[] = [
      {
        id: '1',
        type: 'grammar',
        message: 'Consider using "its" instead of "it\'s" for possessive form',
        suggestion: 'Replace "it\'s" with "its" when showing possession',
        severity: 'medium',
        position: { start: 45, end: 50 }
      },
      {
        id: '2',
        type: 'readability',
        message: 'This sentence is quite long. Consider breaking it into shorter sentences.',
        suggestion: 'Split into 2-3 shorter sentences for better readability',
        severity: 'low',
        position: { start: 120, end: 200 }
      },
      {
        id: '3',
        type: 'seo',
        message: 'Add more relevant keywords to improve SEO',
        suggestion: 'Include keywords like "blogging", "writing", "content creation"',
        severity: 'high'
      },
      {
        id: '4',
        type: 'style',
        message: 'Consider using more active voice',
        suggestion: 'Change "was written by" to "wrote" for stronger impact',
        severity: 'low',
        position: { start: 80, end: 95 }
      }
    ];
    
    setSuggestions(mockSuggestions);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    if (content.length > 50) {
      const debounceTimer = setTimeout(() => {
        analyzeContent();
      }, 1000);
      
      return () => clearTimeout(debounceTimer);
    }
  }, [content]);

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'grammar':
        return <CheckCircle className="w-4 h-4" />;
      case 'readability':
        return <Eye className="w-4 h-4" />;
      case 'seo':
        return <Target className="w-4 h-4" />;
      case 'style':
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800';
      case 'low':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800';
    }
  };

  const filteredSuggestions = activeTab === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.type === activeTab);

  const stats = {
    total: suggestions.length,
    grammar: suggestions.filter(s => s.type === 'grammar').length,
    readability: suggestions.filter(s => s.type === 'readability').length,
    seo: suggestions.filter(s => s.type === 'seo').length,
    style: suggestions.filter(s => s.type === 'style').length,
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Writing Assistant</h3>
            <p className="text-xs text-muted-foreground">Smart suggestions for better writing</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <div className="text-sm font-semibold text-foreground">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <div className="text-sm font-semibold text-foreground">{stats.grammar}</div>
            <div className="text-xs text-muted-foreground">Grammar</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <div className="text-sm font-semibold text-foreground">{stats.readability}</div>
            <div className="text-xs text-muted-foreground">Readability</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <div className="text-sm font-semibold text-foreground">{stats.seo}</div>
            <div className="text-xs text-muted-foreground">SEO</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
          {[
            { key: 'all', label: 'All', icon: <Sparkles className="w-3 h-3" /> },
            { key: 'grammar', label: 'Grammar', icon: <CheckCircle className="w-3 h-3" /> },
            { key: 'readability', label: 'Readability', icon: <Eye className="w-3 h-3" /> },
            { key: 'seo', label: 'SEO', icon: <Target className="w-3 h-3" /> },
            { key: 'style', label: 'Style', icon: <Lightbulb className="w-3 h-3" /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === tab.key
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-muted-foreground">Analyzing your content...</span>
            </div>
          </div>
        ) : filteredSuggestions.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-950/20 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              {suggestions.length === 0 
                ? "Start writing to get AI suggestions" 
                : "No suggestions in this category"}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={`p-3 rounded-lg border ${getSeverityColor(suggestion.severity)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getSuggestionIcon(suggestion.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-1">{suggestion.message}</p>
                    <p className="text-xs opacity-80 mb-2">{suggestion.suggestion}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        suggestion.severity === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                        suggestion.severity === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:bg-blue-300'
                      }`}>
                        {suggestion.severity}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {suggestion.type}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onSuggestionApply?.(suggestion.suggestion)}
                    className="flex-shrink-0 p-1.5 rounded-md hover:bg-background/50 transition-colors"
                    title="Apply suggestion"
                  >
                    <Zap className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={analyzeContent}
              disabled={isAnalyzing}
              className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : 'Re-analyze'}
            </button>
            <button className="px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground rounded-md hover:bg-accent transition-colors">
              Generate Summary
            </button>
            <button className="px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground rounded-md hover:bg-accent transition-colors">
              SEO Keywords
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
