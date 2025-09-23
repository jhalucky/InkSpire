"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Eye, Heart, MessageCircle, Clock } from "lucide-react";
import BlogCard from "@/components/BlogCard";

type TrendingBlog = {
  id: string;
  title: string;
  content: string;
  author: { id: string; name?: string; username?: string; image?: string } | null;
  likes?: { id: string }[];
  comments?: { id: string; content: string; author: { name?: string; image?: string } }[];
  views: number;
  trendingScore: number;
  category: string;
  publishedAt: string;
};

export default function TrendingPage() {
  const [trendingBlogs, setTrendingBlogs] = useState<TrendingBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'tech' | 'business' | 'creative'>('all');
  const currentUserId = "USER_ID_HERE";

  // Mock trending blogs data
  const mockTrendingBlogs: TrendingBlog[] = [
    {
      id: '1',
      title: 'The Future of AI in Content Creation: What Writers Need to Know',
      content: 'Artificial Intelligence is revolutionizing how we create content. From automated writing assistants to AI-generated images, the landscape is changing rapidly...',
      author: { id: '1', name: 'Sarah Chen', username: 'sarahchen', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
      likes: [{ id: '1' }, { id: '2' }, { id: '3' }],
      comments: [
        { id: '1', content: 'Great insights!', author: { name: 'John Doe', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' } }
      ],
      views: 15420,
      trendingScore: 95,
      category: 'tech',
      publishedAt: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      title: 'Building a Successful Startup: Lessons from 5 Years of Entrepreneurship',
      content: 'After five years of building and scaling my startup, I\'ve learned valuable lessons about what works and what doesn\'t...',
      author: { id: '2', name: 'Mike Johnson', username: 'mikejohnson', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
      likes: [{ id: '1' }, { id: '2' }],
      comments: [],
      views: 8930,
      trendingScore: 87,
      category: 'business',
      publishedAt: '2024-01-19T14:15:00Z'
    },
    {
      id: '3',
      title: 'The Art of Storytelling: How to Captivate Your Readers',
      content: 'Storytelling is one of the most powerful tools in a writer\'s arsenal. Here\'s how to craft compelling narratives that keep readers engaged...',
      author: { id: '3', name: 'Emma Wilson', username: 'emmawilson', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
      likes: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
      comments: [
        { id: '1', content: 'Love this!', author: { name: 'Alex Smith', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' } }
      ],
      views: 12350,
      trendingScore: 82,
      category: 'creative',
      publishedAt: '2024-01-18T09:45:00Z'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTrendingBlogs(mockTrendingBlogs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBlogs = activeFilter === 'all' 
    ? trendingBlogs 
    : trendingBlogs.filter(blog => blog.category === activeFilter);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="animate-fade-in-up text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center shadow-glow">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="gradient-text">Trending Stories</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover what's capturing the{" "}
              <span className="gradient-text-secondary font-semibold">community's attention</span> right now
            </p>
          </div>

          {/* Filters */}
          <div className="animate-fade-in-up flex flex-wrap justify-center gap-2" style={{animationDelay: '0.2s'}}>
          {[
            { key: 'all', label: 'All Topics' },
            { key: 'tech', label: 'Technology' },
            { key: 'business', label: 'Business' },
            { key: 'creative', label: 'Creative' },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key as any)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : 'bg-muted/50 text-muted-foreground hover:bg-background/50 hover:text-foreground border border-border/50'
              }`}
            >
              {filter.label}
            </button>
          ))}
          </div>
        </div>

        {/* Trending Blogs */}
        <div className="space-y-6">
          {filteredBlogs.map((blog, index) => (
            <div key={blog.id} className="group card-modern hover-lift animate-fade-in-up overflow-hidden" style={{animationDelay: `${0.4 + index * 0.1}s`}}>
            <div className="p-6">
              {/* Trending Badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-800 dark:text-orange-300 rounded-full text-xs font-semibold border border-orange-200 dark:border-orange-800">
                  <TrendingUp className="w-3 h-3" />
                  Trending #{blog.trendingScore}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {getTimeAgo(blog.publishedAt)}
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <img
                    src={blog.author?.image || 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png'}
                    alt={blog.author?.name || 'Unknown Author'}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border group-hover:border-orange-500 transition-all duration-300"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {blog.author?.name || 'Unknown Author'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    @{blog.author?.username || 'unknown'}
                  </p>
                </div>
              </div>

              {/* Title & Content */}
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer group-hover:gradient-text">
                  {blog.title}
                </h2>
                <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                  {blog.content}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{blog.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{blog.likes?.length || 0} likes</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{blog.comments?.length || 0} comments</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Read Full Story
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredBlogs.length > 0 && (
        <div className="text-center mt-12">
          <button className="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 px-10 py-4 text-lg font-semibold text-white hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 gap-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <TrendingUp className="h-6 w-6 relative z-10" />
            <span className="relative z-10">Load More Trending Stories</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No trending stories</h3>
          <p className="text-muted-foreground">
            Check back later for the latest trending content
          </p>
        </div>
      )}
      </div>
    </div>
  );
}
