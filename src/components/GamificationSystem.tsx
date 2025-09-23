"use client";

import { useState, useEffect } from "react";
import { Trophy, Flame, Star, Target, Award, TrendingUp, BookOpen, MessageCircle, Share2 } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  earned: boolean;
  earnedAt?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
  completed: boolean;
}

interface GamificationSystemProps {
  userId: string;
  onAchievementUnlock?: (achievementId: string) => void;
}

export default function GamificationSystem({ userId, onAchievementUnlock }: GamificationSystemProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'achievements' | 'leaderboard'>('overview');
  const [streak, setStreak] = useState(7);
  const [points, setPoints] = useState(1250);
  const [level, setLevel] = useState(5);
  const [xp, setXp] = useState(750);
  const [xpToNext, setXpToNext] = useState(250);

  // Mock badges data
  const badges: Badge[] = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Published your first blog post',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-blue-500',
      earned: true,
      earnedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Streak Master',
      description: 'Maintained a 7-day writing streak',
      icon: <Flame className="w-5 h-5" />,
      color: 'bg-orange-500',
      earned: true,
      earnedAt: '2024-01-20'
    },
    {
      id: '3',
      name: 'Community Helper',
      description: 'Received 50 likes on your posts',
      icon: <Star className="w-5 h-5" />,
      color: 'bg-yellow-500',
      earned: true,
      earnedAt: '2024-01-18'
    },
    {
      id: '4',
      name: 'Engagement Expert',
      description: 'Made 100 comments',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-green-500',
      earned: false
    },
    {
      id: '5',
      name: 'Viral Writer',
      description: 'Got 1000 views on a single post',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-purple-500',
      earned: false
    },
    {
      id: '6',
      name: 'Social Butterfly',
      description: 'Shared 25 posts',
      icon: <Share2 className="w-5 h-5" />,
      color: 'bg-pink-500',
      earned: false
    }
  ];

  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Writing Marathon',
      description: 'Write 10 blog posts this month',
      progress: 7,
      target: 10,
      reward: '500 XP',
      completed: false
    },
    {
      id: '2',
      title: 'Comment Champion',
      description: 'Make 50 meaningful comments',
      progress: 32,
      target: 50,
      reward: '300 XP',
      completed: false
    },
    {
      id: '3',
      title: 'Reading Explorer',
      description: 'Read 20 articles this week',
      progress: 20,
      target: 20,
      reward: '200 XP',
      completed: true
    },
    {
      id: '4',
      title: 'Streak Keeper',
      description: 'Maintain a 30-day reading streak',
      progress: 7,
      target: 30,
      reward: '1000 XP',
      completed: false
    }
  ];

  const earnedBadges = badges.filter(badge => badge.earned);
  const completedAchievements = achievements.filter(achievement => achievement.completed);

  const getLevelProgress = () => {
    return (xp / (xp + xpToNext)) * 100;
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-purple-500';
    if (streak >= 14) return 'text-orange-500';
    if (streak >= 7) return 'text-yellow-500';
    return 'text-blue-500';
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Your Progress</h3>
            <p className="text-xs text-muted-foreground">Track your writing journey</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
          {[
            { key: 'overview', label: 'Overview', icon: <Target className="w-3 h-3" /> },
            { key: 'badges', label: 'Badges', icon: <Award className="w-3 h-3" /> },
            { key: 'achievements', label: 'Goals', icon: <Trophy className="w-3 h-3" /> },
            { key: 'leaderboard', label: 'Ranking', icon: <TrendingUp className="w-3 h-3" /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
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
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{level}</div>
                <div className="text-xs text-muted-foreground">Level</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{points}</div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className={`text-2xl font-bold ${getStreakColor(streak)}`}>{streak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{earnedBadges.length}</div>
                <div className="text-xs text-muted-foreground">Badges</div>
              </div>
            </div>

            {/* Level Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Level Progress</span>
                <span className="text-xs text-muted-foreground">{xp}/{xp + xpToNext} XP</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getLevelProgress()}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {xpToNext} XP to next level
              </div>
            </div>

            {/* Recent Achievements */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Recent Achievements</h4>
              <div className="space-y-2">
                {completedAchievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Trophy className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-green-900 dark:text-green-100">
                        {achievement.title}
                      </div>
                      <div className="text-xs text-green-700 dark:text-green-300">
                        +{achievement.reward}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    badge.earned
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-muted/30 opacity-60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full ${badge.color} flex items-center justify-center mx-auto mb-3 ${
                    !badge.earned ? 'grayscale' : ''
                  }`}>
                    {badge.icon}
                  </div>
                  <h4 className="text-sm font-medium text-foreground text-center mb-1">
                    {badge.name}
                  </h4>
                  <p className="text-xs text-muted-foreground text-center mb-2">
                    {badge.description}
                  </p>
                  {badge.earned && badge.earnedAt && (
                    <div className="text-xs text-primary text-center">
                      Earned {new Date(badge.earnedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{achievement.title}</h4>
                  <span className="text-sm text-muted-foreground">
                    {achievement.progress}/{achievement.target}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          achievement.completed ? 'bg-green-500' : 'bg-primary'
                        }`}
                        style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${
                    achievement.completed ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                  }`}>
                    {achievement.reward}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Leaderboard coming soon! Compete with other writers.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
