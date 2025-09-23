"use client";

import { useState, useEffect } from "react";
import { Twitter, Linkedin, Share2, Copy, Check, Hash, AtSign } from "lucide-react";

interface SocialSnippetsProps {
  title: string;
  content: string;
  authorName: string;
  authorUsername: string;
  blogUrl: string;
}

interface SocialSnippet {
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
  content: string;
  characterCount: number;
  maxCharacters: number;
  hashtags: string[];
  mentions: string[];
}

export default function SocialSnippets({ title, content, authorName, authorUsername, blogUrl }: SocialSnippetsProps) {
  const [snippets, setSnippets] = useState<SocialSnippet[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Generate social media snippets
  const generateSnippets = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Extract key points from content (mock implementation)
    const keyPoints = content.split('.').slice(0, 3).map(point => point.trim()).filter(point => point.length > 0);
    const hashtags = extractHashtags(content);
    const mentions = extractMentions(content);
    
    const generatedSnippets: SocialSnippet[] = [
      {
        platform: 'twitter',
        content: `🚀 ${title}\n\n${keyPoints[0] || 'Check out this amazing read!'}\n\nRead more: ${blogUrl}\n\n#${hashtags.slice(0, 3).join(' #')}`,
        characterCount: 0,
        maxCharacters: 280,
        hashtags: hashtags.slice(0, 3),
        mentions: mentions.slice(0, 2)
      },
      {
        platform: 'linkedin',
        content: `📝 ${title}\n\n${keyPoints.slice(0, 2).join(' ')}\n\nAs a writer, I'm always exploring new ideas and sharing insights with my network. This article dives deep into ${title.toLowerCase()} and offers valuable perspectives.\n\nWhat are your thoughts on this topic? I'd love to hear your insights in the comments below.\n\nRead the full article: ${blogUrl}\n\n#${hashtags.slice(0, 5).join(' #')}`,
        characterCount: 0,
        maxCharacters: 3000,
        hashtags: hashtags.slice(0, 5),
        mentions: mentions.slice(0, 3)
      },
      {
        platform: 'facebook',
        content: `Just published: ${title}\n\n${keyPoints[0] || 'An interesting read that I wanted to share with you all.'}\n\nI'd love to hear your thoughts on this topic. What do you think?\n\nRead more: ${blogUrl}`,
        characterCount: 0,
        maxCharacters: 63206,
        hashtags: hashtags.slice(0, 3),
        mentions: mentions.slice(0, 2)
      },
      {
        platform: 'instagram',
        content: `✨ ${title}\n\n${keyPoints[0] || "Sharing some thoughts on this topic that I've been exploring lately."}\n\nSwipe up to read the full article! 🔗\n\n#${hashtags.slice(0, 10).join(' #')}`,
        characterCount: 0,
        maxCharacters: 2200,
        hashtags: hashtags.slice(0, 10),
        mentions: mentions.slice(0, 3)
      }
    ];

    // Calculate character counts
    generatedSnippets.forEach(snippet => {
      snippet.characterCount = snippet.content.length;
    });

    setSnippets(generatedSnippets);
    setIsGenerating(false);
  };

  const extractHashtags = (text: string): string[] => {
    // Mock hashtag extraction - in real implementation, this would use AI
    const commonHashtags = ['writing', 'blogging', 'content', 'creativity', 'inspiration', 'tech', 'business', 'startup', 'ai', 'productivity'];
    return commonHashtags.slice(0, Math.floor(Math.random() * 5) + 3);
  };

  const extractMentions = (text: string): string[] => {
    // Mock mention extraction
    return ['@InkSpire', '@WritingCommunity'];
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'facebook':
        return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>;
      case 'instagram':
        return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>;
      default:
        return <Share2 className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'bg-blue-500';
      case 'linkedin':
        return 'bg-blue-700';
      case 'facebook':
        return 'bg-blue-600';
      case 'instagram':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCharacterColor = (count: number, max: number) => {
    const percentage = (count / max) * 100;
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 80) return 'text-yellow-500';
    return 'text-green-500';
  };

  useEffect(() => {
    if (title && content) {
      generateSnippets();
    }
  }, [title, content]);

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Share2 className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Social Media Snippets</h3>
            <p className="text-xs text-muted-foreground">AI-generated posts for your content</p>
          </div>
        </div>

        <button
          onClick={generateSnippets}
          disabled={isGenerating}
          className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Regenerate'}
        </button>
      </div>

      <div className="p-4">
        {isGenerating ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-muted-foreground">Generating snippets...</span>
            </div>
          </div>
        ) : snippets.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
              <Share2 className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Start writing to generate social media snippets
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {snippets.map((snippet, index) => (
              <div key={snippet.platform} className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${getPlatformColor(snippet.platform)} flex items-center justify-center text-white`}>
                      {getPlatformIcon(snippet.platform)}
                    </div>
                    <span className="text-sm font-medium text-foreground capitalize">
                      {snippet.platform}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${getCharacterColor(snippet.characterCount, snippet.maxCharacters)}`}>
                      {snippet.characterCount}/{snippet.maxCharacters}
                    </span>
                    <button
                      onClick={() => copyToClipboard(snippet.content, index)}
                      className="p-1.5 rounded-md hover:bg-accent transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <Copy className="w-3 h-3 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-background border border-input rounded-lg p-3 mb-3">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {snippet.content}
                  </p>
                </div>

                {/* Hashtags and Mentions */}
                <div className="flex flex-wrap gap-2">
                  {snippet.hashtags.map((hashtag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-xs"
                    >
                      <Hash className="w-3 h-3" />
                      {hashtag}
                    </span>
                  ))}
                  {snippet.mentions.map((mention, mentionIndex) => (
                    <span
                      key={mentionIndex}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md text-xs"
                    >
                      <AtSign className="w-3 h-3" />
                      {mention}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
