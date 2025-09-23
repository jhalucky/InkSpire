"use client";

import { useState } from "react";
import { Heart, Coffee, Star, Zap, Gift, MessageCircle } from "lucide-react";

interface TippingSystemProps {
  authorId: string;
  authorName: string;
  authorImage?: string;
  onTip?: (amount: number, message: string) => void;
}

export default function TippingSystem({ authorId, authorName, authorImage, onTip }: TippingSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [tipMessage, setTipMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [
    { amount: 5, label: "Coffee", icon: <Coffee className="w-4 h-4" />, color: "bg-amber-500" },
    { amount: 10, label: "Lunch", icon: <Heart className="w-4 h-4" />, color: "bg-red-500" },
    { amount: 25, label: "Dinner", icon: <Star className="w-4 h-4" />, color: "bg-yellow-500" },
    { amount: 50, label: "Support", icon: <Zap className="w-4 h-4" />, color: "bg-blue-500" },
    { amount: 100, label: "Sponsor", icon: <Gift className="w-4 h-4" />, color: "bg-purple-500" },
  ];

  const handleTip = async () => {
    if (selectedAmount <= 0) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onTip?.(selectedAmount, tipMessage);
    
    // Reset form
    setSelectedAmount(0);
    setCustomAmount("");
    setTipMessage("");
    setIsOpen(false);
    setIsProcessing(false);
    
    // Show success message
    alert(`Thank you for tipping $${selectedAmount} to ${authorName}!`);
  };

  const getTotalAmount = () => {
    if (customAmount) {
      return parseFloat(customAmount) || 0;
    }
    return selectedAmount;
  };

  return (
    <div className="relative">
      {/* Tip Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <Coffee className="w-4 h-4" />
        <span>Tip Author</span>
      </button>

      {/* Tip Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Support {authorName}</h3>
                  <p className="text-sm text-muted-foreground">Show appreciation for their work</p>
                </div>
              </div>

              {/* Preset Amounts */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Choose an amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset.amount}
                      onClick={() => {
                        setSelectedAmount(preset.amount);
                        setCustomAmount("");
                      }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedAmount === preset.amount
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full ${preset.color} flex items-center justify-center mx-auto mb-2`}>
                        {preset.icon}
                      </div>
                      <div className="text-sm font-medium text-foreground">${preset.amount}</div>
                      <div className="text-xs text-muted-foreground">{preset.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Or enter custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
              </div>

              {/* Tip Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Add a message (optional)
                </label>
                <textarea
                  value={tipMessage}
                  onChange={(e) => setTipMessage(e.target.value)}
                  placeholder="Thanks for the great content!"
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                />
              </div>

              {/* Total */}
              {getTotalAmount() > 0 && (
                <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="text-lg font-semibold text-foreground">
                      ${getTotalAmount().toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Platform fee: ${(getTotalAmount() * 0.05).toFixed(2)} (5%)
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 bg-muted text-muted-foreground font-medium rounded-lg hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTip}
                  disabled={getTotalAmount() <= 0 || isProcessing}
                  className="flex-1 px-4 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    `Tip $${getTotalAmount().toFixed(2)}`
                  )}
                </button>
              </div>

              {/* Payment Methods */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Secure payment powered by Stripe
                </p>
                <div className="flex justify-center gap-2 mt-2">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    V
                  </div>
                  <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    M
                  </div>
                  <div className="w-8 h-5 bg-yellow-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
