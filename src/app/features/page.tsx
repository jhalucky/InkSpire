"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  PenTool,
  Users,
  Coffee,
  MessageSquare,
  Trophy,
  Image,
  Share2,
  Eye,
  Zap,
  Target,
  Mail,
  Palette,
} from "lucide-react";

import AIWritingAssistant from "@/components/AIWritingAssistant";
import ReadingModes from "@/components/ReadingModes";
import TippingPage from "../tipping/page";
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
  const [author, setAuthor] = useState<{
    id: string;
    name: string;
    image: string;
    username: string;
  } | null>(null);

  useEffect(() => {
    // Fetch the real logged-in user / author
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.id) {
          setAuthor({
            id: data.id,
            name: data.name,
            image: data.image,
            username: data.username,
          });
        }
      })
      .catch((err) => console.error("Error fetching author:", err));
  }, []);

  const features = [
    {
      id: "ai-writing",
      title: "AI Writing Assistant",
      description: "Smart grammar, readability, and SEO suggestions powered by AI",
      icon: <Sparkles className="w-6 h-6" />,
      component: (
        <AIWritingAssistant
          content="This is a sample blog post demonstrating the AI writing assistant capabilities."
          title="Sample Blog Post"
          onSuggestionApply={(s) => console.log("Applied suggestion:", s)}
        />
      ),
    },
    {
      id: "reading-modes",
      title: "Reading Modes",
      description: "Focus, Fast, and Deep reading modes for personalized experience",
      icon: <Eye className="w-6 h-6" />,
      component: (
        <ReadingModes
          content="This is a blog post about the future of content creation and AI integration."
          title="The Future of Content Creation"
          onModeChange={(mode) => console.log("Reading mode changed:", mode)}
        />
      ),
    },
    {
      id: "tipping",
      title: "Tipping System",
      description: "Support creators with built-in tipping functionality",
      icon: <Coffee className="w-6 h-6" />,
      component: <TippingPage />,
    },
    {
      id: "interactive",
      title: "Interactive Features",
      description: "Polls, quizzes, and commentable highlights",
      icon: <MessageSquare className="w-6 h-6" />,
      component: (
        <InteractiveBlogFeatures
          blogId="real-blog"
          onVote={(pollId, optionId) => console.log("Voted:", pollId, optionId)}
          onQuizAnswer={(quizId, ansId) => console.log("Quiz answered:", quizId, ansId)}
          onHighlightComment={(hlId, c) => console.log("Highlight comment:", hlId, c)}
        />
      ),
    },
    {
      id: "gamification",
      title: "Gamification",
      description: "Reading streaks, points, and badges system",
      icon: <Trophy className="w-6 h-6" />,
      component: (
        <GamificationSystem
          userId={author?.id ?? ""}
          onAchievementUnlock={(achId) => console.log("Achievement unlocked:", achId)}
        />
      ),
    },
    {
      id: "communities",
      title: "Communities",
      description: "Topic-based communities and discussion forums",
      icon: <Users className="w-6 h-6" />,
      component: (
        <Communities
          onJoinCommunity={(cid) => console.log("Joined community:", cid)}
          onCreateCommunity={() => console.log("Create community clicked")}
        />
      ),
    },
    {
      id: "social-snippets",
      title: "Social Snippets",
      description: "Auto-generate LinkedIn/Twitter/X snippets",
      icon: <Share2 className="w-6 h-6" />,
      component: author && (
        <SocialSnippets
          title="The Future of AI in Content Creation"
          content="AI is revolutionizing how we create content. From writing assistants to image generation, the landscape is changing rapidly."
          authorName={author.name}
          authorUsername={author.username}
          blogUrl="https://inkspire.com/blog/real"
        />
      ),
    },
    {
      id: "cover-images",
      title: "AI Cover Images",
      description: "Generate custom cover images with AI",
      icon: <Image className="w-6 h-6" />,
      component: (
        <AICoverImageGenerator
          title="The Future of AI in Content Creation"
          content="Artificial Intelligence is changing how creators work and collaborate."
          onImageGenerated={(url) => console.log("Image generated:", url)}
        />
      ),
    },
    {
      id: "paid-newsletters",
      title: "Paid Newsletters",
      description: "Monetize your content with subscription-based newsletters",
      icon: <Mail className="w-6 h-6" />,
      component: author && (
        <PaidNewsletter
          authorId={author.id}
          authorName={author.name}
          authorImage={author.image}
          onSubscribe={(tier, method) => console.log("Subscribed to:", tier, method)}
        />
      ),
    },
    {
      id: "sponsorship-marketplace",
      title: "Sponsorship Marketplace",
      description: "Connect with brands for sponsored content opportunities",
      icon: <Target className="w-6 h-6" />,
      component: (
        <SponsorshipMarketplace
          onApply={(oppId) => console.log("Applied to:", oppId)}
          onCreateOpportunity={() => console.log("Create opportunity clicked")}
        />
      ),
    },
    {
      id: "custom-branding",
      title: "Custom Branding",
      description: "Personalize your profile with custom themes and branding",
      icon: <Palette className="w-6 h-6" />,
      component: author && (
        <CustomBranding
          userId={author.id}
          onSave={(branding) => console.log("Branding saved:", branding)}
        />
      ),
    },
  ];

  const activeFeatureData = features.find((f) => f.id === activeFeature);

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
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeFeature === feature.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
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
          <div className="p-4 lg:p-6">{activeFeatureData.component}</div>
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
