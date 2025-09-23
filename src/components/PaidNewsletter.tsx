"use client";

import { useState } from "react";
import { Mail, Crown, Users, DollarSign, TrendingUp, CheckCircle, Star, Zap } from "lucide-react";

interface PaidNewsletterProps {
  authorId: string;
  authorName: string;
  authorImage?: string;
  onSubscribe?: (tier: string, paymentMethod: string) => void;
}

interface NewsletterTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
}

export default function PaidNewsletter({ authorId, authorName, authorImage, onSubscribe }: PaidNewsletterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const tiers: NewsletterTier[] = [
    {
      id: "basic",
      name: "Basic",
      price: 5,
      description: "Weekly insights and updates",
      features: [
        "Weekly newsletter",
        "Early access to articles",
        "Community access",
        "Basic analytics"
      ],
      icon: <Mail className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "premium",
      name: "Premium",
      price: 15,
      description: "Exclusive content and insights",
      features: [
        "Everything in Basic",
        "Bi-weekly exclusive articles",
        "Direct messaging with author",
        "Premium community access",
        "Advanced analytics",
        "Priority support"
      ],
      popular: true,
      icon: <Crown className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "vip",
      name: "VIP",
      price: 50,
      description: "Ultimate insider experience",
      features: [
        "Everything in Premium",
        "Monthly 1-on-1 call",
        "Exclusive content library",
        "Custom content requests",
        "Behind-the-scenes access",
        "VIP community channel",
        "Personalized insights"
      ],
      icon: <Star className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const handleSubscribe = async (tierId: string) => {
    setSelectedTier(tierId);
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubscribe?.(tierId, "stripe");
    
    setIsProcessing(false);
    setIsOpen(false);
    
    // Show success message
    const tier = tiers.find(t => t.id === tierId);
    alert(`Successfully subscribed to ${tier?.name} tier for $${tier?.price}/month!`);
  };

  return (
    <div className="relative">
      {/* Subscribe Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Crown className="w-5 h-5 relative z-10" />
        <span className="relative z-10">Subscribe to Newsletter</span>
      </button>

      {/* Newsletter Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-glow">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  Subscribe to {authorName}'s Newsletter
                </h3>
                <p className="text-muted-foreground">
                  Get exclusive content, insights, and early access to new articles
                </p>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedTier === tier.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20'
                        : 'border-border hover:border-purple-300 dark:hover:border-purple-700'
                    } ${tier.popular ? 'ring-2 ring-purple-500/20' : ''}`}
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tier.color} flex items-center justify-center mx-auto mb-4 text-white`}>
                        {tier.icon}
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-2">{tier.name}</h4>
                      <div className="text-3xl font-bold text-foreground mb-1">
                        ${tier.price}
                        <span className="text-sm font-normal text-muted-foreground">/month</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{tier.description}</p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleSubscribe(tier.id)}
                      disabled={isProcessing}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedTier === tier.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                          : 'bg-muted text-muted-foreground hover:bg-accent'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isProcessing && selectedTier === tier.id ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : (
                        `Subscribe to ${tier.name}`
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  Why Subscribe?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Exclusive Content</div>
                      <div className="text-sm text-muted-foreground">Premium articles not available elsewhere</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Community Access</div>
                      <div className="text-sm text-muted-foreground">Connect with like-minded readers</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Support Creator</div>
                      <div className="text-sm text-muted-foreground">Help sustain quality content creation</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-6 py-3 bg-muted text-muted-foreground font-semibold rounded-xl hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                {selectedTier && (
                  <button
                    onClick={() => handleSubscribe(selectedTier)}
                    disabled={isProcessing}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      'Complete Subscription'
                    )}
                  </button>
                )}
              </div>

              {/* Payment Info */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span>Secure payment powered by</span>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      S
                    </div>
                    <span className="font-semibold">Stripe</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Cancel anytime. No hidden fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
