"use client";

import { useState } from "react";
import { Users, Plus, Search, TrendingUp, MessageCircle, BookOpen, Hash } from "lucide-react";

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  postCount: number;
  category: string;
  isJoined: boolean;
  trending: boolean;
  tags: string[];
}

interface CommunitiesProps {
  onJoinCommunity?: (communityId: string) => void;
  onCreateCommunity?: () => void;
}

export default function Communities({ onJoinCommunity, onCreateCommunity }: CommunitiesProps) {
  const [activeTab, setActiveTab] = useState<'discover' | 'joined' | 'trending'>('discover');
  const [searchQuery, setSearchQuery] = useState("");

  // Mock communities data
  const communities: Community[] = [
    {
      id: '1',
      name: 'Tech Writers',
      description: 'A community for technology writers and bloggers to share insights, tips, and collaborate on projects.',
      memberCount: 1250,
      postCount: 340,
      category: 'Technology',
      isJoined: true,
      trending: true,
      tags: ['tech', 'programming', 'ai', 'startup']
    },
    {
      id: '2',
      name: 'Creative Writing',
      description: 'Explore the art of storytelling, poetry, and creative expression through writing.',
      memberCount: 890,
      postCount: 156,
      category: 'Creative',
      isJoined: false,
      trending: false,
      tags: ['fiction', 'poetry', 'storytelling', 'creative']
    },
    {
      id: '3',
      name: 'Business & Entrepreneurship',
      description: 'Share business insights, startup stories, and entrepreneurial experiences.',
      memberCount: 2100,
      postCount: 520,
      category: 'Business',
      isJoined: true,
      trending: true,
      tags: ['business', 'startup', 'entrepreneurship', 'finance']
    },
    {
      id: '4',
      name: 'AI & Machine Learning',
      description: 'Latest trends, research, and discussions about artificial intelligence and machine learning.',
      memberCount: 750,
      postCount: 180,
      category: 'Technology',
      isJoined: false,
      trending: true,
      tags: ['ai', 'ml', 'data-science', 'automation']
    },
    {
      id: '5',
      name: 'Design & UX',
      description: 'User experience design, interface design, and design thinking discussions.',
      memberCount: 1100,
      postCount: 290,
      category: 'Design',
      isJoined: false,
      trending: false,
      tags: ['design', 'ux', 'ui', 'product']
    },
    {
      id: '6',
      name: 'Personal Development',
      description: 'Self-improvement, productivity, and personal growth through writing and reflection.',
      memberCount: 1650,
      postCount: 420,
      category: 'Lifestyle',
      isJoined: true,
      trending: false,
      tags: ['productivity', 'mindfulness', 'growth', 'lifestyle']
    }
  ];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    switch (activeTab) {
      case 'joined':
        return matchesSearch && community.isJoined;
      case 'trending':
        return matchesSearch && community.trending;
      default:
        return matchesSearch;
    }
  });

  const handleJoinCommunity = (communityId: string) => {
    onJoinCommunity?.(communityId);
    // In real implementation, this would update the community state
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technology':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Creative':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Business':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Design':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300';
      case 'Lifestyle':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Communities</h1>
            <p className="text-muted-foreground">
              Join communities of like-minded writers and readers
            </p>
          </div>
          <button
            onClick={onCreateCommunity}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Community
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/50 p-1 rounded-lg mb-6">
        {[
          { key: 'discover', label: 'Discover', icon: <Hash className="w-4 h-4" /> },
          { key: 'joined', label: 'Joined', icon: <Users className="w-4 h-4" /> },
          { key: 'trending', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.key
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((community) => (
          <div
            key={community.id}
            className="bg-card border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{community.name}</h3>
                    {community.trending && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-xs font-medium">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(community.category)}`}>
                      {community.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {community.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {community.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {community.tags.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs">
                    +{community.tags.length - 3} more
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{community.memberCount.toLocaleString()} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{community.postCount} posts</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleJoinCommunity(community.id)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    community.isJoined
                      ? 'bg-muted text-muted-foreground hover:bg-accent'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {community.isJoined ? 'Joined' : 'Join Community'}
                </button>
                <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCommunities.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No communities found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Be the first to create a community'}
          </p>
          {!searchQuery && (
            <button
              onClick={onCreateCommunity}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Community
            </button>
          )}
        </div>
      )}
    </div>
  );
}
