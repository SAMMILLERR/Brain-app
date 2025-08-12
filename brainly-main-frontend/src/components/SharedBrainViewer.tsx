import { useState, useEffect } from 'react';

interface ContentItem {
  id: string;
  title: string;
  type: string;
  link: string;
  tags: string[];
  username: string;
}

export function SharedBrainViewer() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ownerUsername, setOwnerUsername] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Get shareId from URL path
  const getShareIdFromUrl = () => {
    const path = window.location.pathname;
    return path.replace('/shared/', '');
  };

  const contentTypes = [
    { value: 'all', label: 'All Content', icon: '📂' },
    { value: 'document', label: 'Documents', icon: '📄' },
    { value: 'youtube', label: 'YouTube', icon: '📺' },
    { value: 'reddit', label: 'Reddit', icon: '🔗' },
    { value: 'tweet', label: 'Twitter', icon: '🐦' },
    { value: 'article', label: 'Articles', icon: '📰' },
    { value: 'website', label: 'Websites', icon: '🌐' },
    { value: 'link', label: 'Links', icon: '🔗' },
  ];

  useEffect(() => {
    loadSharedBrain();
  }, []);

  const loadSharedBrain = async () => {
    try {
      setLoading(true);
      const shareId = getShareIdFromUrl();
      console.log('🔗 Loading shared brain with ID:', shareId);
      
      const response = await fetch(`http://localhost:3000/api/v1/brain/${shareId}`);
      
      if (!response.ok) {
        throw new Error('Failed to load shared brain');
      }
      
      const data = await response.json();
      console.log('📊 Shared brain data:', data);
      setContent(data.content || []);
      
      // Get owner username from first content item
      if (data.content && data.content.length > 0) {
        setOwnerUsername(data.content[0].username);
      }
    } catch (error) {
      console.error('❌ Error loading shared brain:', error);
      setError(error instanceof Error ? error.message : 'Failed to load shared brain');
    } finally {
      setLoading(false);
    }
  };

  // Filter content by type
  const filteredContent = selectedType === 'all' 
    ? content 
    : content.filter(item => item.type === selectedType);

  // Calculate content counts by type
  const getContentCounts = (): {[key: string]: number} => {
    const counts: {[key: string]: number} = { all: content.length };
    content.forEach((item) => {
      counts[item.type] = (counts[item.type] || 0) + 1;
    });
    return counts;
  };

  const contentCounts = getContentCounts();

  if (loading) {
    return (
      <div className="min-h-screen bg-neural-pattern flex items-center justify-center">
        <div className="glass p-8 rounded-2xl text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-primary-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Loading Brain...</h2>
          <p className="text-text-muted">Accessing shared content</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neural-pattern flex items-center justify-center">
        <div className="glass p-8 rounded-2xl text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold text-danger mb-2">Access Denied</h2>
          <p className="text-text-muted mb-6">{error}</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="btn btn-primary"
          >
            Go to Your Brain
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neural-pattern">
      {/* Header */}
      <div className="glass border-b border-border/30 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-gradient flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 3-.35 4.29-.99.36-.18.65-.47.83-.84.18-.37.21-.79.09-1.17-.12-.38-.36-.71-.68-.93-.32-.22-.71-.32-1.1-.28-.39.04-.75.21-1.02.47-.27.26-.45.6-.51.96-.06.36.01.73.19 1.03.18.3.45.53.77.66.32.13.67.16 1.01.08.34-.08.65-.26.89-.51.24-.25.41-.56.49-.9.08-.34.07-.7-.03-1.03-.1-.33-.29-.63-.54-.86-.25-.23-.56-.39-.89-.45-.33-.06-.67-.02-.98.12-.31.14-.58.36-.78.64-.2.28-.32.61-.35.95-.03.34.05.68.22.97.17.29.42.52.72.67.3.15.63.22.96.19.33-.03.65-.14.92-.32.27-.18.49-.42.64-.7.15-.28.23-.59.23-.91 0-.32-.08-.63-.23-.91-.15-.28-.37-.52-.64-.7-.27-.18-.59-.29-.92-.32-.33-.03-.66.04-.96.19-.3.15-.55.38-.72.67-.17.29-.25.63-.22.97.03.34.15.67.35.95.2.28.47.5.78.64.31.14.65.18.98.12.33-.06.64-.22.89-.45.25-.23.44-.53.54-.86.1-.33.11-.69.03-1.03-.08-.34-.25-.65-.49-.9-.24-.25-.55-.43-.89-.51-.34-.08-.69-.05-1.01.08-.32.13-.59.36-.77.66-.18.3-.25.67-.19 1.03.06.36.24.7.51.96.27.26.63.43 1.02.47.39.04.78-.06 1.1-.28.32-.22.56-.55.68-.93.12-.38.09-.8-.09-1.17-.18-.37-.47-.66-.83-.84C15 21.65 13.54 22 12 22 6.48 22 2 17.52 2 12S6.48 2 12 2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  {ownerUsername ? `${ownerUsername}'s Brain` : 'Shared Brain'}
                </h1>
                <p className="text-text-muted text-sm">
                  {content.length} {content.length === 1 ? 'item' : 'items'} shared
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-sm text-text-muted bg-surface/50 px-3 py-2 rounded-lg">
                Read-only view
              </div>
              <button 
                onClick={() => window.location.href = '/'}
                className="btn btn-secondary"
              >
                Go to Your Brain
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Content Types */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
                Content Types
              </h3>
              <div className="space-y-2">
                {contentTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      selectedType === type.value
                        ? 'bg-primary-gradient text-white shadow-neural'
                        : 'text-text-secondary hover:bg-white/40 hover:text-text-primary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{type.icon}</span>
                      <span className="text-sm font-medium">{type.label}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full transition-colors ${
                      selectedType === type.value 
                        ? 'bg-white/20 text-white' 
                        : 'bg-primary/10 text-primary-600'
                    }`}>
                      {contentCounts[type.value] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {filteredContent.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  No {selectedType === 'all' ? '' : contentTypes.find(t => t.value === selectedType)?.label?.toLowerCase()} content
                </h3>
                <p className="text-text-muted">
                  {ownerUsername} hasn't shared any {selectedType === 'all' ? 'content' : contentTypes.find(t => t.value === selectedType)?.label?.toLowerCase()} yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredContent.map((item) => (
                  <div key={item.id} className="glass rounded-2xl overflow-hidden hover:shadow-neural transition-all duration-300 group">
                    {/* Content Type Header */}
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 border-b border-border/20">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">
                          {contentTypes.find(t => t.value === item.type)?.icon || '📄'}
                        </span>
                        <span className="text-xs bg-primary/20 text-primary-700 px-2 py-1 rounded-full font-medium">
                          {item.type}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content Body */}
                    <div className="p-6">
                      <h3 className="font-semibold text-text-primary text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-primary-600 mb-4 block truncate hover:underline"
                      >
                        {item.link}
                      </a>
                      
                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.slice(0, 3).map((tag, tagIndex) => (
                            tag ? (
                              <span 
                                key={tagIndex} 
                                className="bg-accent/20 text-accent-700 text-xs px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ) : null
                          ))}
                          {item.tags.length > 3 && (
                            <span className="text-text-muted text-xs px-2 py-1">
                              +{item.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Visit Link Button */}
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm w-full group"
                      >
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Visit Link
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
