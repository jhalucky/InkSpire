"use client";

import { useState } from "react";
import { 
  Target, 
  TrendingUp, 
  Users, 
  Eye, 
  Calendar, 
  DollarSign, 
  Filter, 
  Search,
  Star,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";

interface SponsorshipOpportunity {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    username: string;
    image: string;
    followers: number;
  };
  category: string;
  price: number;
  duration: string;
  reach: number;
  engagement: number;
  status: 'available' | 'pending' | 'completed';
  tags: string[];
  createdAt: string;
  featured?: boolean;
}

interface SponsorshipMarketplaceProps {
  onApply?: (opportunityId: string) => void;
  onCreateOpportunity?: () => void;
}

export default function SponsorshipMarketplace({ onApply, onCreateOpportunity }: SponsorshipMarketplaceProps) {
  const [activeTab, setActiveTab] = useState<'discover' | 'my-opportunities' | 'applications'>('discover');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Mock sponsorship opportunities
  const opportunities: SponsorshipOpportunity[] = [
    {
      id: '1',
      title: 'Tech Product Launch Campaign',
      description: 'Looking for tech influencers to promote our new AI-powered productivity app. Perfect for tech bloggers and productivity enthusiasts.',
      author: {
        name: 'Sarah Chen',
        username: 'sarahchen',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        followers: 12500
      },
      category: 'Technology',
      price: 2500,
      duration: '2 weeks',
      reach: 50000,
      engagement: 4.2,
      status: 'available',
      tags: ['tech', 'ai', 'productivity', 'app'],
      createdAt: '2024-01-20',
      featured: true
    },
    {
      id: '2',
      title: 'Sustainable Living Brand Partnership',
      description: 'Join our mission to promote sustainable living. We\'re looking for eco-conscious content creators to showcase our eco-friendly products.',
      author: {
        name: 'Mike Johnson',
        username: 'mikejohnson',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        followers: 8900
      },
      category: 'Lifestyle',
      price: 1800,
      duration: '1 month',
      reach: 35000,
      engagement: 5.8,
      status: 'available',
      tags: ['sustainability', 'eco-friendly', 'lifestyle', 'green'],
      createdAt: '2024-01-19'
    },
    {
      id: '3',
      title: 'Financial Education Series',
      description: 'Help us educate people about personal finance and investment strategies. Looking for finance bloggers and educators.',
      author: {
        name: 'Emma Wilson',
        username: 'emmawilson',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        followers: 15600
      },
      category: 'Finance',
      price: 3200,
      duration: '3 weeks',
      reach: 75000,
      engagement: 3.9,
      status: 'available',
      tags: ['finance', 'investment', 'education', 'money'],
      createdAt: '2024-01-18'
    }
  ];

  const categories = ['all', 'Technology', 'Lifestyle', 'Finance', 'Health', 'Education', 'Business'];

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || opportunity.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technology':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Lifestyle':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Finance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Health':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'Education':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Business':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Sponsorship Marketplace</h1>
            <p className="text-muted-foreground">
              Connect with brands and monetize your content through sponsored partnerships
            </p>
          </div>
          <button
            onClick={onCreateOpportunity}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Target className="w-5 h-5" />
            Create Opportunity
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-500 text-white'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/50 p-1 rounded-xl mb-8">
        {[
          { key: 'discover', label: 'Discover', icon: <Target className="w-4 h-4" /> },
          { key: 'my-opportunities', label: 'My Opportunities', icon: <Calendar className="w-4 h-4" /> },
          { key: 'applications', label: 'Applications', icon: <CheckCircle className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
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

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className="group card-modern hover-lift animate-fade-in-up overflow-hidden"
          >
            {opportunity.featured && (
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Featured
                </span>
              </div>
            )}

            <div className="p-6">
              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={opportunity.author.image}
                  alt={opportunity.author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-border"
                />
                <div>
                  <p className="font-semibold text-foreground">{opportunity.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    @{opportunity.author.username} • {opportunity.author.followers.toLocaleString()} followers
                  </p>
                </div>
              </div>

              {/* Title and Description */}
              <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                {opportunity.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {opportunity.description}
              </p>

              {/* Category and Tags */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(opportunity.category)}`}>
                  {opportunity.category}
                </span>
                <div className="flex gap-1">
                  {opportunity.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <div className="text-lg font-bold text-foreground">${opportunity.price.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Budget</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">{opportunity.reach.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Reach</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">{opportunity.engagement}%</div>
                  <div className="text-xs text-muted-foreground">Engagement</div>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Duration: {opportunity.duration}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onApply?.(opportunity.id)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Apply Now
                </button>
                <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No opportunities found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Be the first to create an opportunity'}
          </p>
          {!searchQuery && (
            <button
              onClick={onCreateOpportunity}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Target className="w-5 h-5" />
              Create Opportunity
            </button>
          )}
        </div>
      )}
    </div>
  );
}
