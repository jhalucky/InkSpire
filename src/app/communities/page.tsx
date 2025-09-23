"use client";

import Communities from "@/components/Communities";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";

export default function CommunitiesPage() {
  const router = useRouter();

  const handleJoinCommunity = (communityId: string) => {
    console.log(`Joining community: ${communityId}`);
    // In real implementation, this would make an API call
  };

  const handleCreateCommunity = () => {
    router.push("/communities/create");
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                <span className="gradient-text">Communities</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join topic-based communities and connect with like-minded{" "}
                <span className="gradient-text-secondary font-semibold">writers and readers</span>
              </p>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <Communities 
              onJoinCommunity={handleJoinCommunity}
              onCreateCommunity={handleCreateCommunity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
