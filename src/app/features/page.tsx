"use client";

import { useState } from "react";
import { 
  Sparkles, 
  PenTool, 
  Users, 
  TrendingUp, 
  BookOpen, 
  Coffee, 
  MessageSquare, 
  Trophy, 
  Image, 
  Share2,
  Eye,
  Zap,
  Target,
  Award,
  Mail,
  Palette
} from "lucide-react";
import AIWritingAssistant from "@/components/AIWritingAssistant";
import ReadingModes from "@/components/ReadingModes";
import TippingSystem from "@/components/TippingSystem";
import InteractiveBlogFeatures from "@/components/InteractiveBlogFeatures";
import GamificationSystem from "@/components/GamificationSystem";
import Communities from "@/components/Communities";
import SocialSnippets from "@/components/SocialSnippets";
import AICoverImageGenerator from "@/components/AICoverImageGenerator";
import PaidNewsletter from "@/components/PaidNewsletter";
import SponsorshipMarketplace from "@/components/SponsorshipMarketplace";
import CustomBranding from "@/components/CustomBranding";

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState<string>("ai-writing");

  const features = [
    {
      id: "ai-writing",
      title: "AI Writing Assistant",
      description: "Smart grammar, readability, and SEO suggestions powered by AI",
      icon: <Sparkles className="w-6 h-6" />,
      component: <AIWritingAssistant 
        content="This is a sample blog post content that demonstrates the AI writing assistant capabilities. It can analyze grammar, suggest improvements, and provide SEO recommendations."
        title="Sample Blog Post"
        onSuggestionApply={(suggestion) => console.log('Applied suggestion:', suggestion)}
      />
    },
    {
      id: "reading-modes",
      title: "Reading Modes",
      description: "Focus, Fast, and Deep reading modes for personalized experience",
      icon: <Eye className="w-6 h-6" />,
      component: <ReadingModes 
        content="This is a comprehensive blog post about the future of content creation. It covers various aspects including AI integration, user experience, and community building. The content is designed to be engaging and informative, providing readers with valuable insights into the evolving landscape of digital content."
        title="The Future of Content Creation"
        onModeChange={(mode) => console.log('Reading mode changed:', mode)}
      />
    },
    {
      id: "tipping",
      title: "Tipping System",
      description: "Support creators with built-in tipping functionality",
      icon: <Coffee className="w-6 h-6" />,
      component: <TippingSystem 
        authorId="demo-author"
        authorName="Demo Author"
        authorImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        onTip={(amount, message) => console.log('Tipped:', amount, message)}
      />
    },
    {
      id: "interactive",
      title: "Interactive Features",
      description: "Polls, quizzes, and commentable highlights",
      icon: <MessageSquare className="w-6 h-6" />,
      component: <InteractiveBlogFeatures 
        blogId="demo-blog"
        onVote={(pollId, optionId) => console.log('Voted:', pollId, optionId)}
        onQuizAnswer={(quizId, answerId) => console.log('Quiz answered:', quizId, answerId)}
        onHighlightComment={(highlightId, comment) => console.log('Highlight comment:', highlightId, comment)}
      />
    },
    {
      id: "gamification",
      title: "Gamification",
      description: "Reading streaks, points, and badges system",
      icon: <Trophy className="w-6 h-6" />,
      component: <GamificationSystem 
        userId="demo-user"
        onAchievementUnlock={(achievementId) => console.log('Achievement unlocked:', achievementId)}
      />
    },
    {
      id: "communities",
      title: "Communities",
      description: "Topic-based communities and discussion forums",
      icon: <Users className="w-6 h-6" />,
      component: <Communities 
        onJoinCommunity={(communityId) => console.log('Joined community:', communityId)}
        onCreateCommunity={() => console.log('Create community clicked')}
      />
    },
    {
      id: "social-snippets",
      title: "Social Snippets",
      description: "Auto-generate LinkedIn/Twitter/X snippets",
      icon: <Share2 className="w-6 h-6" />,
      component: <SocialSnippets 
        title="The Future of AI in Content Creation"
        content="Artificial Intelligence is revolutionizing how we create content. From automated writing assistants to AI-generated images, the landscape is changing rapidly. This article explores the latest trends and what they mean for content creators."
        authorName="Demo Author"
        authorUsername="demoauthor"
        blogUrl="https://inkspire.com/blog/demo"
      />
    },
    {
      id: "cover-images",
      title: "AI Cover Images",
      description: "Generate custom cover images with AI",
      icon: <Image className="w-6 h-6" />,
      component: <AICoverImageGenerator 
        title="The Future of AI in Content Creation"
        content="Artificial Intelligence is revolutionizing how we create content. From automated writing assistants to AI-generated images, the landscape is changing rapidly."
        onImageGenerated={(imageUrl) => console.log('Image generated:', imageUrl)}
      />
    },
    {
      id: "paid-newsletters",
      title: "Paid Newsletters",
      description: "Monetize your content with subscription-based newsletters",
      icon: <Mail className="w-6 h-6" />,
      component: <PaidNewsletter 
        authorId="demo-author"
        authorName="Demo Author"
        authorImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        onSubscribe={(tier, paymentMethod) => console.log('Subscribed to:', tier, paymentMethod)}
      />
    },
    {
      id: "sponsorship-marketplace",
      title: "Sponsorship Marketplace",
      description: "Connect with brands for sponsored content opportunities",
      icon: <Target className="w-6 h-6" />,
      component: <SponsorshipMarketplace 
        onApply={(opportunityId) => console.log('Applied to:', opportunityId)}
        onCreateOpportunity={() => console.log('Create opportunity clicked')}
      />
    },
    {
      id: "custom-branding",
      title: "Custom Branding",
      description: "Personalize your profile with custom themes and branding",
      icon: <Palette className="w-6 h-6" />,
      component: <CustomBranding 
        userId="demo-user"
        onSave={(branding) => console.log('Branding saved:', branding)}
      />
    }
  ];

  const activeFeatureData = features.find(f => f.id === activeFeature);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            InkSpire Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the powerful features that make InkSpire the next-generation blogging platform
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                activeFeature === feature.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activeFeature === feature.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Feature Demo */}
      {activeFeatureData && (
        <div className="bg-card border border-border rounded-xl shadow-sm">
          <div className="p-4 lg:p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                {activeFeatureData.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{activeFeatureData.title}</h2>
                <p className="text-muted-foreground">{activeFeatureData.description}</p>
              </div>
            </div>
          </div>
          <div className="p-4 lg:p-6">
            {activeFeatureData.component}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className="text-center p-4 lg:p-6 bg-card border border-border rounded-xl">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-3">
            <PenTool className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">10+</div>
          <div className="text-muted-foreground">AI-Powered Features</div>
        </div>
        <div className="text-center p-4 lg:p-6 bg-card border border-border rounded-xl">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">100%</div>
          <div className="text-muted-foreground">Responsive Design</div>
        </div>
        <div className="text-center p-4 lg:p-6 bg-card border border-border rounded-xl">
          <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">Real-time</div>
          <div className="text-muted-foreground">Interactive Features</div>
        </div>
      </div>
    </div>
  );
}
