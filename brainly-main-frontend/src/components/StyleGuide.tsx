import React from 'react';

export const StyleGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-neural-pattern p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Brain App Style Guide
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A comprehensive design system for the empathetic, playful Brain sharing platform
          </p>
        </header>

        {/* Colors */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primary Colors */}
            <div className="card-glass p-6">
              <h3 className="font-semibold text-text-primary mb-4">Primary</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary-300"></div>
                  <span className="text-sm">Light</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary"></div>
                  <span className="text-sm">Default</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary-700"></div>
                  <span className="text-sm">Dark</span>
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="card-glass p-6">
              <h3 className="font-semibold text-text-primary mb-4">Accent</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-accent-300"></div>
                  <span className="text-sm">Light</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-accent"></div>
                  <span className="text-sm">Default</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-accent-700"></div>
                  <span className="text-sm">Dark</span>
                </div>
              </div>
            </div>

            {/* Status Colors */}
            <div className="card-glass p-6">
              <h3 className="font-semibold text-text-primary mb-4">Status</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-success"></div>
                  <span className="text-sm">Success</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-warning"></div>
                  <span className="text-sm">Warning</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-danger"></div>
                  <span className="text-sm">Danger</span>
                </div>
              </div>
            </div>

            {/* Gradients */}
            <div className="card-glass p-6">
              <h3 className="font-semibold text-text-primary mb-4">Gradients</h3>
              <div className="space-y-3">
                <div className="h-8 rounded bg-primary-gradient"></div>
                <span className="text-sm">Primary Gradient</span>
                <div className="h-8 rounded bg-accent-gradient"></div>
                <span className="text-sm">Accent Gradient</span>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Typography</h2>
          <div className="card-glass p-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Heading 1 - Neural Connections</h1>
                <p className="text-sm text-text-muted mt-1">text-3xl font-bold</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-text-primary">Heading 2 - Brain Networks</h2>
                <p className="text-sm text-text-muted mt-1">text-2xl font-semibold</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-text-primary">Heading 3 - Thought Bubbles</h3>
                <p className="text-sm text-text-muted mt-1">text-xl font-medium</p>
              </div>
              <div>
                <p className="text-base text-text-primary">
                  Body text - Share what's sparking in your mind with empathy and curiosity. 
                  This platform encourages authentic expression and meaningful connections.
                </p>
                <p className="text-sm text-text-muted mt-1">text-base</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">
                  Small text - Perfect for metadata, captions, and secondary information.
                </p>
                <p className="text-sm text-text-muted mt-1">text-sm</p>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-glass p-6">
              <h3 className="font-semibold text-text-primary mb-4">Primary Buttons</h3>
              <div className="space-y-3">
                <button className="btn btn-primary w-full">Share Your Spark</button>
                <button className="btn btn-primary btn-sm w-full">Small Primary</button>
                <button className="btn btn-primary btn-lg w-full">Large Primary</button>
              </div>
            </div>

            <div className="card-glass p-6">
              <h3 className="font-semibold text-text-primary mb-4">Secondary Buttons</h3>
              <div className="space-y-3">
                <button className="btn btn-secondary w-full">Explore Minds</button>
                <button className="btn btn-secondary btn-sm w-full">Small Secondary</button>
                <button className="btn btn-secondary btn-lg w-full">Large Secondary</button>
              </div>
            </div>

            <div className="card-glass p-6">
              <h3 className="font-semibold text-text-primary mb-4">Ghost Buttons</h3>
              <div className="space-y-3">
                <button className="btn btn-ghost w-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Like
                </button>
                <button className="btn btn-ghost btn-sm w-full">Small Ghost</button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="avatar avatar-md">JD</div>
                <div>
                  <h3 className="font-semibold text-text-primary">Glass Card</h3>
                  <p className="text-sm text-text-muted">Glassmorphism design</p>
                </div>
              </div>
              <p className="text-text-secondary">
                This is a glass card with backdrop blur and subtle transparency. 
                Perfect for floating content and creating depth.
              </p>
            </div>

            <div className="card-surface p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="avatar avatar-md">AL</div>
                <div>
                  <h3 className="font-semibold text-text-primary">Surface Card</h3>
                  <p className="text-sm text-text-muted">Solid background design</p>
                </div>
              </div>
              <p className="text-text-secondary">
                This is a surface card with solid background and subtle shadows. 
                Great for content that needs clear separation.
              </p>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Form Elements</h2>
          <div className="card-glass p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  What's brewing in your mind?
                </label>
                <input 
                  type="text" 
                  placeholder="Share your thoughts..." 
                  className="input focus-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Content Type
                </label>
                <select className="input focus-ring">
                  <option>💭 Thought</option>
                  <option>🎥 Video</option>
                  <option>📰 Article</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Expand your thought
                </label>
                <textarea 
                  placeholder="What sparked this idea? Share more context..."
                  className="input textarea focus-ring"
                ></textarea>
              </div>
            </div>
          </div>
        </section>

        {/* Chips and Tags */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Interest Chips</h2>
          <div className="card-glass p-6">
            <div className="flex flex-wrap gap-3">
              <span className="chip">#AI</span>
              <span className="chip chip-active">#Poetry</span>
              <span className="chip">#LifeHacks</span>
              <span className="chip">#Sketches</span>
              <span className="chip">#Philosophy</span>
              <span className="chip">#MusicSnippets</span>
              <span className="chip">#Mindfulness</span>
              <span className="chip">#Innovation</span>
            </div>
          </div>
        </section>

        {/* Avatars */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Avatars</h2>
          <div className="card-glass p-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="avatar avatar-sm">JS</div>
                <p className="text-xs text-text-muted mt-2">Small</p>
              </div>
              <div className="text-center">
                <div className="avatar avatar-md avatar-online">AD</div>
                <p className="text-xs text-text-muted mt-2">Medium + Online</p>
              </div>
              <div className="text-center">
                <div className="avatar avatar-lg">MK</div>
                <p className="text-xs text-text-muted mt-2">Large</p>
              </div>
            </div>
          </div>
        </section>

        {/* Microcopy Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Microcopy & Voice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-glass p-6">
              <h3 className="font-semibold text-text-primary mb-4">CTA Taglines</h3>
              <div className="space-y-2 text-sm">
                <p>"Share what's sparking"</p>
                <p>"Drop your mind bubble"</p>
                <p>"Hop on the brainwave"</p>
                <p>"Pop your curiosity"</p>
                <p>"Light up the network"</p>
              </div>
            </div>
            
            <div className="card-glass p-6">
              <h3 className="font-semibold text-text-primary mb-4">Placeholder Text</h3>
              <div className="space-y-2 text-sm">
                <p>"What's brewing in your mind?"</p>
                <p>"Share your spark with the world..."</p>
                <p>"A thought, link, or wild idea?"</p>
                <p>"What caught your curiosity today?"</p>
                <p>"Drop something that made you think..."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Animation Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-glass p-6 hover-lift">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-gradient mx-auto mb-3"></div>
                <p className="text-sm">Hover Lift</p>
              </div>
            </div>
            
            <div className="card-glass p-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent animate-pulse-slow mx-auto mb-3"></div>
                <p className="text-sm">Pulse Animation</p>
              </div>
            </div>
            
            <div className="card-glass p-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient animate-gradient mx-auto mb-3"></div>
                <p className="text-sm">Gradient Animation</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
