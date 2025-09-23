"use client";

import { useState } from "react";
import { Image, Download, RefreshCw, Palette, Sparkles, Wand2 } from "lucide-react";

interface AICoverImageGeneratorProps {
  title: string;
  content: string;
  onImageGenerated?: (imageUrl: string) => void;
}

interface ImageStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export default function AICoverImageGenerator({ title, content, onImageGenerated }: AICoverImageGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const imageStyles: ImageStyle[] = [
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Clean, simple design with focus on typography",
      prompt: "minimalist design, clean typography, simple colors, modern"
    },
    {
      id: "abstract",
      name: "Abstract",
      description: "Artistic and creative abstract visuals",
      prompt: "abstract art, creative, colorful, artistic, modern"
    },
    {
      id: "photographic",
      name: "Photographic",
      description: "Realistic photography style",
      prompt: "photographic, realistic, professional, high quality"
    },
    {
      id: "illustration",
      name: "Illustration",
      description: "Hand-drawn or digital illustration style",
      prompt: "illustration, hand-drawn, artistic, creative"
    },
    {
      id: "tech",
      name: "Technology",
      description: "Tech-focused with digital elements",
      prompt: "technology, digital, futuristic, tech, modern"
    },
    {
      id: "business",
      name: "Business",
      description: "Professional business-oriented design",
      prompt: "business, professional, corporate, clean, modern"
    }
  ];

  const generateImage = async () => {
    if (!selectedStyle || !title) return;

    setIsGenerating(true);
    
    // Simulate AI image generation delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const style = imageStyles.find(s => s.id === selectedStyle);
    if (!style) return;

    // Mock generated images - in real implementation, this would call an AI image generation API
    const mockImages = [
      `https://picsum.photos/800/400?random=${Date.now()}&blur=1`,
      `https://picsum.photos/800/400?random=${Date.now() + 1}&blur=1`,
      `https://picsum.photos/800/400?random=${Date.now() + 2}&blur=1`,
      `https://picsum.photos/800/400?random=${Date.now() + 3}&blur=1`
    ];

    setGeneratedImages(mockImages);
    setIsGenerating(false);
  };

  const downloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cover-image-${title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  const selectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onImageGenerated?.(imageUrl);
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Image className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Cover Image Generator</h3>
            <p className="text-xs text-muted-foreground">Generate custom cover images for your blog</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Style Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Choose Image Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {imageStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedStyle === style.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{style.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{style.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="mb-6">
          <button
            onClick={generateImage}
            disabled={!selectedStyle || !title || isGenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                Generating Images...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate Cover Images
              </>
            )}
          </button>
        </div>

        {/* Generated Images */}
        {generatedImages.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Generated Images</h4>
              <button
                onClick={generateImage}
                disabled={isGenerating}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-muted text-muted-foreground rounded-md hover:bg-accent transition-colors disabled:opacity-50"
              >
                <RefreshCw className="w-3 h-3" />
                Regenerate
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {generatedImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className={`relative group rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === imageUrl
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => selectImage(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`Generated cover image ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          selectImage(imageUrl);
                        }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                        title="Select this image"
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage(imageUrl);
                        }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                        title="Download image"
                      >
                        <Download className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Selected indicator */}
                  {selectedImage === imageUrl && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedImage && (
              <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-900 dark:text-green-100">
                    Cover image selected! It will be used when you publish your blog.
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Preview */}
        {selectedImage && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Preview</h4>
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt="Selected cover image"
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h3 className="text-white font-semibold text-sm line-clamp-2">
                  {title}
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Tips for Better Results</h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Choose a style that matches your content theme</li>
            <li>• Make sure your title is descriptive and engaging</li>
            <li>• You can regenerate images multiple times to get the perfect one</li>
            <li>• Selected images will be automatically optimized for web use</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
