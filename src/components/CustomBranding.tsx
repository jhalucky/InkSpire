"use client";

import { useState } from "react";
import { 
  Palette, 
  Upload, 
  Globe, 
  Save, 
  Eye, 
  Download,
  Image as ImageIcon,
  Type,
  Layout,
  Sparkles,
  CheckCircle
} from "lucide-react";

interface CustomBrandingProps {
  userId: string;
  onSave?: (branding: BrandingSettings) => void;
}

interface BrandingSettings {
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
  customDomain?: string;
  layout: 'modern' | 'classic' | 'minimal';
  typography: 'sans' | 'serif' | 'mono';
  accentColor: string;
}

export default function CustomBranding({ userId, onSave }: CustomBrandingProps) {
  const [activeTab, setActiveTab] = useState<'theme' | 'branding' | 'domain' | 'preview'>('theme');
  const [branding, setBranding] = useState<BrandingSettings>({
    theme: 'auto',
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    accentColor: '#f59e0b',
    layout: 'modern',
    typography: 'sans'
  });
  const [isSaving, setIsSaving] = useState(false);

  const themes = [
    { id: 'light', name: 'Light', description: 'Clean and bright design', preview: 'bg-white' },
    { id: 'dark', name: 'Dark', description: 'Sleek and modern dark theme', preview: 'bg-gray-900' },
    { id: 'auto', name: 'Auto', description: 'Follows system preference', preview: 'bg-gradient-to-r from-white to-gray-900' }
  ];

  const layouts = [
    { id: 'modern', name: 'Modern', description: 'Contemporary design with gradients', icon: <Layout className="w-5 h-5" /> },
    { id: 'classic', name: 'Classic', description: 'Traditional and professional', icon: <Type className="w-5 h-5" /> },
    { id: 'minimal', name: 'Minimal', description: 'Clean and simple design', icon: <Eye className="w-5 h-5" /> }
  ];

  const typographyOptions = [
    { id: 'sans', name: 'Sans Serif', description: 'Modern and clean', font: 'font-sans' },
    { id: 'serif', name: 'Serif', description: 'Traditional and elegant', font: 'font-serif' },
    { id: 'mono', name: 'Monospace', description: 'Technical and precise', font: 'font-mono' }
  ];

  const colorPresets = [
    { name: 'Indigo', primary: '#6366f1', secondary: '#8b5cf6', accent: '#f59e0b' },
    { name: 'Blue', primary: '#3b82f6', secondary: '#1d4ed8', accent: '#06b6d4' },
    { name: 'Purple', primary: '#8b5cf6', secondary: '#7c3aed', accent: '#ec4899' },
    { name: 'Green', primary: '#10b981', secondary: '#059669', accent: '#f59e0b' },
    { name: 'Red', primary: '#ef4444', secondary: '#dc2626', accent: '#f97316' },
    { name: 'Pink', primary: '#ec4899', secondary: '#db2777', accent: '#8b5cf6' }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSave?.(branding);
    setIsSaving(false);
    
    // Show success message
    alert('Branding settings saved successfully!');
  };

  const handleColorChange = (type: 'primary' | 'secondary' | 'accent', color: string) => {
    setBranding(prev => ({ ...prev, [type === 'primary' ? 'primaryColor' : type === 'secondary' ? 'secondaryColor' : 'accentColor']: color }));
  };

  const handlePresetSelect = (preset: typeof colorPresets[0]) => {
    setBranding(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Custom Branding</h1>
        <p className="text-muted-foreground">
          Personalize your profile and content with custom themes, colors, and branding
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="lg:col-span-2">
          <div className="card-modern">
            <div className="p-6 border-b border-border">
              {/* Tabs */}
              <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
                {[
                  { key: 'theme', label: 'Theme', icon: <Palette className="w-4 h-4" /> },
                  { key: 'branding', label: 'Branding', icon: <ImageIcon className="w-4 h-4" /> },
                  { key: 'domain', label: 'Domain', icon: <Globe className="w-4 h-4" /> },
                  { key: 'preview', label: 'Preview', icon: <Eye className="w-4 h-4" /> },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
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

            <div className="p-6">
              {/* Theme Tab */}
              {activeTab === 'theme' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Color Theme</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => setBranding(prev => ({ ...prev, theme: theme.id as any }))}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            branding.theme === theme.id
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20'
                              : 'border-border hover:border-indigo-300'
                          }`}
                        >
                          <div className={`w-full h-8 rounded-lg mb-3 ${theme.preview}`}></div>
                          <h4 className="font-semibold text-foreground">{theme.name}</h4>
                          <p className="text-sm text-muted-foreground">{theme.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Color Presets</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => handlePresetSelect(preset)}
                          className="p-4 rounded-xl border border-border hover:border-indigo-300 transition-all"
                        >
                          <div className="flex gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.primary }}></div>
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.secondary }}></div>
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.accent }}></div>
                          </div>
                          <h4 className="font-semibold text-foreground">{preset.name}</h4>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Custom Colors</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Primary Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={branding.primaryColor}
                            onChange={(e) => handleColorChange('primary', e.target.value)}
                            className="w-12 h-10 rounded-lg border border-border cursor-pointer"
                          />
                          <input
                            type="text"
                            value={branding.primaryColor}
                            onChange={(e) => handleColorChange('primary', e.target.value)}
                            className="flex-1 px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Secondary Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={branding.secondaryColor}
                            onChange={(e) => handleColorChange('secondary', e.target.value)}
                            className="w-12 h-10 rounded-lg border border-border cursor-pointer"
                          />
                          <input
                            type="text"
                            value={branding.secondaryColor}
                            onChange={(e) => handleColorChange('secondary', e.target.value)}
                            className="flex-1 px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Accent Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={branding.accentColor}
                            onChange={(e) => handleColorChange('accent', e.target.value)}
                            className="w-12 h-10 rounded-lg border border-border cursor-pointer"
                          />
                          <input
                            type="text"
                            value={branding.accentColor}
                            onChange={(e) => handleColorChange('accent', e.target.value)}
                            className="flex-1 px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Branding Tab */}
              {activeTab === 'branding' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Layout Style</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      {layouts.map((layout) => (
                        <button
                          key={layout.id}
                          onClick={() => setBranding(prev => ({ ...prev, layout: layout.id as any }))}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            branding.layout === layout.id
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20'
                              : 'border-border hover:border-indigo-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            {layout.icon}
                            <h4 className="font-semibold text-foreground">{layout.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{layout.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Typography</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {typographyOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setBranding(prev => ({ ...prev, typography: option.id as any }))}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            branding.typography === option.id
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20'
                              : 'border-border hover:border-indigo-300'
                          }`}
                        >
                          <h4 className={`font-semibold text-foreground mb-2 ${option.font}`}>{option.name}</h4>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Logo Upload</h3>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Upload your custom logo</p>
                      <p className="text-sm text-muted-foreground">PNG, JPG up to 2MB</p>
                      <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                        Choose File
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Domain Tab */}
              {activeTab === 'domain' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Custom Domain</h3>
                    <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                      <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        <h4 className="font-semibold text-foreground">Professional Domain</h4>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Connect your own domain to create a professional presence
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="yourname.com"
                          value={branding.customDomain || ''}
                          onChange={(e) => setBranding(prev => ({ ...prev, customDomain: e.target.value }))}
                          className="flex-1 px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview Tab */}
              {activeTab === 'preview' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Live Preview</h3>
                  <div className="border border-border rounded-xl overflow-hidden">
                    <div 
                      className="p-6 text-center"
                      style={{
                        background: `linear-gradient(135deg, ${branding.primaryColor}20, ${branding.secondaryColor}20)`,
                        color: branding.theme === 'dark' ? '#f8fafc' : '#1a1a1a'
                      }}
                    >
                      <div className="w-16 h-16 rounded-full mx-auto mb-4" style={{ backgroundColor: branding.primaryColor }}></div>
                      <h2 className="text-2xl font-bold mb-2">Your Branded Profile</h2>
                      <p className="text-muted-foreground mb-4">This is how your profile will look with your custom branding</p>
                      <div className="flex gap-2 justify-center">
                        <div className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: branding.primaryColor, color: 'white' }}>
                          Primary Button
                        </div>
                        <div className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: branding.secondaryColor, color: branding.secondaryColor }}>
                          Secondary Button
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <div className="card-modern sticky top-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              
              <div className="space-y-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-muted text-muted-foreground font-semibold rounded-xl hover:bg-accent transition-colors">
                  <Download className="w-4 h-4" />
                  Export Theme
                </button>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-muted text-muted-foreground font-semibold rounded-xl hover:bg-accent transition-colors">
                  <Eye className="w-4 h-4" />
                  Preview Live
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold text-foreground mb-3">Current Settings</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Theme:</span>
                    <span className="text-foreground capitalize">{branding.theme}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Layout:</span>
                    <span className="text-foreground capitalize">{branding.layout}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Typography:</span>
                    <span className="text-foreground capitalize">{branding.typography}</span>
                  </div>
                  {branding.customDomain && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domain:</span>
                      <span className="text-foreground">{branding.customDomain}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
