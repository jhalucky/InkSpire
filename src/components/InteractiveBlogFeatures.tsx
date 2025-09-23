"use client";

import { useState } from "react";
import { MessageSquare, BarChart3, HelpCircle, Bookmark, Share2, ThumbsUp } from "lucide-react";

interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
  userVote?: string;
}

interface Quiz {
  id: string;
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
  userAnswer?: string;
  isAnswered: boolean;
}

interface Highlight {
  id: string;
  text: string;
  comments: { id: string; author: string; content: string; timestamp: string }[];
}

interface InteractiveBlogFeaturesProps {
  blogId: string;
  onVote?: (pollId: string, optionId: string) => void;
  onQuizAnswer?: (quizId: string, answerId: string) => void;
  onHighlightComment?: (highlightId: string, comment: string) => void;
}

export default function InteractiveBlogFeatures({ 
  blogId, 
  onVote, 
  onQuizAnswer, 
  onHighlightComment 
}: InteractiveBlogFeaturesProps) {
  const [activeTab, setActiveTab] = useState<'polls' | 'quiz' | 'highlights'>('polls');
  const [newComment, setNewComment] = useState("");

  // Mock data - in real implementation, this would come from API
  const polls: Poll[] = [
    {
      id: '1',
      question: "What's your favorite programming language?",
      options: [
        { id: '1', text: 'JavaScript', votes: 45 },
        { id: '2', text: 'Python', votes: 32 },
        { id: '3', text: 'TypeScript', votes: 28 },
        { id: '4', text: 'Go', votes: 15 }
      ],
      totalVotes: 120,
      userVote: '1'
    }
  ];

  const quizzes: Quiz[] = [
    {
      id: '1',
      question: "What is the main advantage of using TypeScript over JavaScript?",
      options: [
        { id: '1', text: 'Faster execution', isCorrect: false },
        { id: '2', text: 'Static type checking', isCorrect: true },
        { id: '3', text: 'Smaller file size', isCorrect: false },
        { id: '4', text: 'Better browser support', isCorrect: false }
      ],
      explanation: "TypeScript provides static type checking at compile time, which helps catch errors before runtime.",
      isAnswered: true,
      userAnswer: '2'
    }
  ];

  const highlights: Highlight[] = [
    {
      id: '1',
      text: "AI-powered writing assistants are revolutionizing content creation",
      comments: [
        {
          id: '1',
          author: 'Sarah Chen',
          content: 'This is so true! I\'ve been using AI tools and they\'ve improved my writing significantly.',
          timestamp: '2 hours ago'
        },
        {
          id: '2',
          author: 'Mike Johnson',
          content: 'What AI tools do you recommend?',
          timestamp: '1 hour ago'
        }
      ]
    }
  ];

  const handleVote = (pollId: string, optionId: string) => {
    onVote?.(pollId, optionId);
    // In real implementation, this would update the poll state
  };

  const handleQuizAnswer = (quizId: string, answerId: string) => {
    onQuizAnswer?.(quizId, answerId);
    // In real implementation, this would update the quiz state
  };

  const handleHighlightComment = (highlightId: string) => {
    if (newComment.trim()) {
      onHighlightComment?.(highlightId, newComment);
      setNewComment("");
    }
  };

  const getPercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Interactive Features</h3>
            <p className="text-xs text-muted-foreground">Engage with polls, quizzes, and highlights</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
          {[
            { key: 'polls', label: 'Polls', icon: <BarChart3 className="w-3 h-3" /> },
            { key: 'quiz', label: 'Quiz', icon: <HelpCircle className="w-3 h-3" /> },
            { key: 'highlights', label: 'Highlights', icon: <Bookmark className="w-3 h-3" /> },
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
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Polls Tab */}
        {activeTab === 'polls' && (
          <div className="space-y-4">
            {polls.map((poll) => (
              <div key={poll.id} className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-3">{poll.question}</h4>
                <div className="space-y-2">
                  {poll.options.map((option) => (
                    <div key={option.id} className="relative">
                      <button
                        onClick={() => handleVote(poll.id, option.id)}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                          poll.userVote === option.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{option.text}</span>
                          <span className="text-xs text-muted-foreground">
                            {option.votes} votes ({getPercentage(option.votes, poll.totalVotes)}%)
                          </span>
                        </div>
                        <div className="mt-2 w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getPercentage(option.votes, poll.totalVotes)}%` }}
                          />
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  {poll.totalVotes} total votes
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-3">{quiz.question}</h4>
                <div className="space-y-2">
                  {quiz.options.map((option) => (
                    <div
                      key={option.id}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        quiz.isAnswered
                          ? option.isCorrect
                            ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                            : quiz.userAnswer === option.id
                            ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                            : 'border-border bg-muted/50'
                          : 'border-border hover:border-primary/50 cursor-pointer'
                      }`}
                      onClick={() => !quiz.isAnswered && handleQuizAnswer(quiz.id, option.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{option.text}</span>
                        {quiz.isAnswered && option.isCorrect && (
                          <span className="text-green-600 dark:text-green-400 text-xs">✓ Correct</span>
                        )}
                        {quiz.isAnswered && quiz.userAnswer === option.id && !option.isCorrect && (
                          <span className="text-red-600 dark:text-red-400 text-xs">✗ Your answer</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {quiz.isAnswered && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Explanation</h5>
                    <p className="text-sm text-blue-800 dark:text-blue-200">{quiz.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Highlights Tab */}
        {activeTab === 'highlights' && (
          <div className="space-y-4">
            {highlights.map((highlight) => (
              <div key={highlight.id} className="p-4 bg-muted/30 rounded-lg">
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 rounded-r-lg mb-3">
                  <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                    "{highlight.text}"
                  </p>
                </div>
                
                <div className="space-y-3">
                  {highlight.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-primary">
                          {comment.author.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-foreground">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-border">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment on this highlight..."
                      className="flex-1 px-3 py-2 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                    <button
                      onClick={() => handleHighlightComment(highlight.id)}
                      disabled={!newComment.trim()}
                      className="px-3 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {((activeTab === 'polls' && polls.length === 0) ||
          (activeTab === 'quiz' && quizzes.length === 0) ||
          (activeTab === 'highlights' && highlights.length === 0)) && (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              No {activeTab} available for this article yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
