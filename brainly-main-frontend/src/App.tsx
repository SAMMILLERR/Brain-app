import { AuthProvider, useAuth } from './contexts/AuthContext'
import { useState, useEffect } from 'react'
import { SharedBrainViewer } from './components/SharedBrainViewer'
import './App.css'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? 'signin' : 'signup';
      const response = await fetch(`http://localhost:3000/api/v1/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (isLogin) {
        // For login, we get a JWT token
        if (data.jwt) {
          // Parse JWT to get user info
          const payload = JSON.parse(atob(data.jwt.split('.')[1]));
          login(data.jwt, { id: payload.sub, username: payload.username });
        }
      } else {
        // For signup, automatically login
        const loginResponse = await fetch('http://localhost:3000/api/v1/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        
        const loginData = await loginResponse.json();
        if (loginData.jwt) {
          const payload = JSON.parse(atob(loginData.jwt.split('.')[1]));
          login(loginData.jwt, { id: payload.sub, username: payload.username });
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neural-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary-gradient shadow-neural mb-4">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 3-.35 4.29-.99.36-.18.65-.47.83-.84.18-.37.21-.79.09-1.17-.12-.38-.36-.71-.68-.93-.32-.22-.71-.32-1.1-.28-.39.04-.75.21-1.02.47-.27.26-.45.6-.51.96-.06.36.01.73.19 1.03.18.3.45.53.77.66.32.13.67.16 1.01.08.34-.08.65-.26.89-.51.24-.25.41-.56.49-.9.08-.34.07-.7-.03-1.03-.1-.33-.29-.63-.54-.86-.25-.23-.56-.39-.89-.45-.33-.06-.67-.02-.98.12-.31.14-.58.36-.78.64-.2.28-.32.61-.35.95-.03.34.05.68.22.97.17.29.42.52.72.67.3.15.63.22.96.19.33-.03.65-.14.92-.32.27-.18.49-.42.64-.7.15-.28.23-.59.23-.91 0-.32-.08-.63-.23-.91-.15-.28-.37-.52-.64-.7-.27-.18-.59-.29-.92-.32-.33-.03-.66.04-.96.19-.3.15-.55.38-.72.67-.17.29-.25.63-.22.97.03.34.15.67.35.95.2.28.47.5.78.64.31.14.65.18.98.12.33-.06.64-.22.89-.45.25-.23.44-.53.54-.86.1-.33.11-.69.03-1.03-.08-.34-.25-.65-.49-.9-.24-.25-.55-.43-.89-.51-.34-.08-.69-.05-1.01.08-.32.13-.59.36-.77.66-.18.3-.25.67-.19 1.03.06.36.24.7.51.96.27.26.63.43 1.02.47.39.04.78-.06 1.1-.28.32-.22.56-.55.68-.93.12-.38.09-.8-.09-1.17-.18-.37-.47-.66-.83-.84C15 21.65 13.54 22 12 22 6.48 22 2 17.52 2 12S6.48 2 12 2z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-2">Brain</h1>
          <p className="text-text-muted text-lg">Your Personal Knowledge Universe</p>
        </div>

        {/* Auth Form */}
        <div className="glass rounded-3xl p-8 shadow-neural">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {isLogin ? 'Welcome Back' : 'Join the Network'}
            </h2>
            <p className="text-text-muted">
              {isLogin ? 'Access your neural connections' : 'Create your digital brain'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-text-primary">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-border/30 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-text-primary">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-border/30 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-danger/10 border border-danger/20 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-danger flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-danger text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-gradient text-white py-3 px-6 rounded-xl font-semibold shadow-neural hover:shadow-neural-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{isLogin ? 'Connecting...' : 'Creating...'}</span>
                </div>
              ) : (
                <span>{isLogin ? 'Access Your Brain' : 'Create Your Brain'}</span>
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-8 text-center">
            <p className="text-text-muted mb-4">
              {isLogin ? "New to the neural network?" : "Already have a brain?"}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setUsername('');
                setPassword('');
              }}
              className="text-primary hover:text-primary-600 font-semibold transition-colors duration-300 hover:underline"
            >
              {isLogin ? 'Join the Network' : 'Access Existing Brain'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState({ title: '', link: '', type: 'website', tags: '' });
  const [adding, setAdding] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [sharing, setSharing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState({ title: '', link: '', type: 'website', tags: '' });
  const [existingTags, setExistingTags] = useState<string[]>([]);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const contentTypes = [
    { value: 'all', label: 'All Content', icon: '📂', count: 0 },
    { value: 'document', label: 'Documents', icon: '📄', count: 0 },
    { value: 'youtube', label: 'YouTube', icon: '📺', count: 0 },
    { value: 'reddit', label: 'Reddit', icon: '🔗', count: 0 },
    { value: 'tweet', label: 'Twitter', icon: '🐦', count: 0 },
    { value: 'article', label: 'Articles', icon: '📰', count: 0 },
    { value: 'website', label: 'Websites', icon: '🌐', count: 0 },
    { value: 'link', label: 'Links', icon: '🔗', count: 0 },
  ];

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Calculate content counts by type
  const getContentCounts = (): {[key: string]: number} => {
    const counts: {[key: string]: number} = { all: content.length };
    content.forEach((item: any) => {
      counts[item.type] = (counts[item.type] || 0) + 1;
    });
    return counts;
  };

  // Filter content by selected type
  const filteredContent = selectedType === 'all' 
    ? content 
    : content.filter((item: any) => item.type === selectedType);

  const contentCounts = getContentCounts();

  // Fetch existing tags from database
  const fetchExistingTags = async () => {
    try {
      const token = localStorage.getItem('token');
      // We'll get all content and extract unique tags
      const response = await fetch('http://localhost:3000/api/v1/content', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        const allTags = new Set<string>();
        
        data.content.forEach((item: any) => {
          if (item.tags && Array.isArray(item.tags)) {
            item.tags.forEach((tag: string) => {
              if (tag && tag.trim()) {
                allTags.add(tag.trim());
              }
            });
          }
        });
        
        setExistingTags(Array.from(allTags).sort());
      }
    } catch (error) {
      console.error('Failed to fetch existing tags:', error);
    }
  };

  // Fetch user's content
  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/v1/content', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched content:', data.content); // Debug log
        setContent(data.content || []);
        
        // Extract existing tags
        const allTags = new Set<string>();
        data.content.forEach((item: any) => {
          if (item.tags && Array.isArray(item.tags)) {
            item.tags.forEach((tag: string) => {
              if (tag && tag.trim()) {
                allTags.add(tag.trim());
              }
            });
          }
        });
        setExistingTags(Array.from(allTags).sort());
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add new content
  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.title || !newContent.link) return;
    
    setAdding(true);
    try {
      const token = localStorage.getItem('token');
      
      // Process tags - split by comma and clean up
      const tagsArray = newContent.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      const contentToSend = {
        title: newContent.title,
        link: newContent.link,
        type: newContent.type,
        tags: tagsArray
      };
      
      const response = await fetch('http://localhost:3000/api/v1/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(contentToSend),
      });
      
      if (response.ok) {
        setNewContent({ title: '', link: '', type: 'website', tags: '' });
        fetchContent(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to add content:', error);
    } finally {
      setAdding(false);
    }
  };

  // Delete content
  const handleDeleteContent = async (contentId: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/v1/content/${contentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        fetchContent(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to delete content:', error);
    }
  };

  // Edit content
  const handleEditContent = async (contentId: string) => {
    try {
      const token = localStorage.getItem('token');
      
      const tagsArray = editContent.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      const contentToSend = {
        title: editContent.title,
        link: editContent.link,
        type: editContent.type,
        tags: tagsArray
      };
      
      const response = await fetch(`http://localhost:3000/api/v1/content/${contentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(contentToSend),
      });
      
      if (response.ok) {
        setEditingId(null);
        fetchContent(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to update content:', error);
    }
  };

  // Share brain
  const handleShareBrain = async () => {
    setSharing(true);
    try {
      const token = localStorage.getItem('token');
      console.log('🔗 Attempting to share brain with token:', token ? 'Token exists' : 'No token');
      
      const response = await fetch('http://localhost:3000/api/v1/brain/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ share: "true" }),
      });
      
      console.log('📡 Share response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Share response data:', data);
        const fullLink = `http://localhost:5174/shared/${data.message}`;
        console.log('🔗 Generated share link:', fullLink);
        setShareLink(fullLink);
      } else {
        const errorData = await response.json();
        console.error('❌ Share failed with status:', response.status, 'Error:', errorData);
      }
    } catch (error) {
      console.error('💥 Failed to create share link:', error);
    } finally {
      setSharing(false);
    }
  };

  // Start editing
  const startEditing = (item: any) => {
    setEditingId(item.id);
    setEditContent({
      title: item.title,
      link: item.link,
      type: item.type,
      tags: item.tags ? item.tags.join(', ') : ''
    });
  };

  // Load content when component mounts
  useEffect(() => {
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome {user?.username}!</h1>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
        <p>Loading your brain content...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neural-pattern">
      {/* Glassmorphism Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 glass border-r border-border backdrop-blur-2xl z-10">
        {/* Brain Logo Header */}
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-gradient flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 3-.35 4.29-.99.36-.18.65-.47.83-.84.18-.37.21-.79.09-1.17-.12-.38-.36-.71-.68-.93-.32-.22-.71-.32-1.1-.28-.39.04-.75.21-1.02.47-.27.26-.45.6-.51.96-.06.36.01.73.19 1.03.18.3.45.53.77.66.32.13.67.16 1.01.08.34-.08.65-.26.89-.51.24-.25.41-.56.49-.9.08-.34.07-.7-.03-1.03-.1-.33-.29-.63-.54-.86-.25-.23-.56-.39-.89-.45-.33-.06-.67-.02-.98.12-.31.14-.58.36-.78.64-.2.28-.32.61-.35.95-.03.34.05.68.22.97.17.29.42.52.72.67.3.15.63.22.96.19.33-.03.65-.14.92-.32.27-.18.49-.42.64-.7.15-.28.23-.59.23-.91 0-.32-.08-.63-.23-.91-.15-.28-.37-.52-.64-.7-.27-.18-.59-.29-.92-.32-.33-.03-.66.04-.96.19-.3.15-.55.38-.72.67-.17.29-.25.63-.22.97.03.34.15.67.35.95.2.28.47.5.78.64.31.14.65.18.98.12.33-.06.64-.22.89-.45.25-.23.44-.53.54-.86.1-.33.11-.69.03-1.03-.08-.34-.25-.65-.49-.9-.24-.25-.55-.43-.89-.51-.34-.08-.69-.05-1.01.08-.32.13-.59.36-.77.66-.18.3-.25.67-.19 1.03.06.36.24.7.51.96.27.26.63.43 1.02.47.39.04.78-.06 1.1-.28.32-.22.56-.55.68-.93.12-.38.09-.8-.09-1.17-.18-.37-.47-.66-.83-.84C15 21.65 13.54 22 12 22 6.48 22 2 17.52 2 12S6.48 2 12 2z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-text-primary">Brain</h1>
            </div>
            {/* Small Dark Mode Toggle */}
            <button
              onClick={() => {
                const isDark = document.documentElement.classList.contains('dark');
                if (isDark) {
                  document.documentElement.classList.remove('dark');
                  localStorage.setItem('theme', 'light');
                } else {
                  document.documentElement.classList.add('dark');
                  localStorage.setItem('theme', 'dark');
                }
              }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {/* Sun Icon for Light Mode */}
              <svg className="w-4 h-4 dark:hidden text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {/* Moon Icon for Dark Mode */}
              <svg className="w-4 h-4 hidden dark:block text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="avatar avatar-sm">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-text-secondary font-medium">{user?.username}</span>
          </div>
        </div>

        {/* Content Types Navigation */}
        <div className="p-4">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-4">Content Types</h3>
          <div className="space-y-1">
            {contentTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
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
                    : 'bg-primary/10 text-primary-600 group-hover:bg-primary/20'
                }`}>
                  {contentCounts[type.value] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3 border-t border-border/30">
          <button 
            onClick={handleShareBrain}
            disabled={sharing}
            className="btn btn-secondary w-full justify-center"
          >
            {sharing ? (
              <>
                <div className="animate-pulse w-4 h-4 bg-current rounded-full"></div>
                Creating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share Brain
              </>
            )}
          </button>
          <button 
            onClick={logout}
            className="btn btn-ghost w-full justify-center text-danger hover:bg-danger/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-72 min-h-screen">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 border-b border-border/30">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  {selectedType === 'all' ? 'All Content' : contentTypes.find(t => t.value === selectedType)?.label}
                </h2>
                <p className="text-sm text-text-muted mt-1">
                  {filteredContent.length} {filteredContent.length === 1 ? 'brain drop' : 'brain drops'}
                </p>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn btn-primary hover-lift"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Drop a Thought
              </button>
            </div>
          </div>
        </div>

        {/* Share Link Display */}
        {shareLink && (
          <div className="mx-6 mt-6 animate-slide-up">
            <div className="card-glass p-6 border-success/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Brain Successfully Shared!</h3>
                  <p className="text-sm text-text-muted">Anyone with this link can explore your thoughts</p>
                </div>
              </div>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={shareLink} 
                  readOnly 
                  className="input flex-1 bg-white/50 text-sm"
                />
                <button 
                  onClick={() => navigator.clipboard.writeText(shareLink)}
                  className="btn btn-secondary"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
                <a 
                  href={shareLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Add Content Form */}
        {showAddForm && (
          <div className="mx-6 mt-6 animate-slide-up">
            <div className="card-glass p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary-gradient flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">What's sparking in your mind?</h3>
                  <p className="text-sm text-text-muted">Share a thought, link, or idea with your brain network</p>
                </div>
              </div>
              
              <form onSubmit={handleAddContent} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Give your thought a name..."
                      value={newContent.title}
                      onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                      className="input focus-ring"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Type</label>
                    <select
                      value={newContent.type}
                      onChange={(e) => setNewContent({ ...newContent, type: e.target.value })}
                      className="input focus-ring"
                    >
                      <option value="website">🌐 Website</option>
                      <option value="youtube">🎥 YouTube</option>
                      <option value="twitter">🐦 Twitter</option>
                      <option value="document">📄 Document</option>
                      <option value="article">📰 Article</option>
                      <option value="reddit">📱 Reddit</option>
                      <option value="tweet">💭 Tweet</option>
                      <option value="link">🔗 Link</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Link</label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={newContent.link}
                    onChange={(e) => setNewContent({ ...newContent, link: e.target.value })}
                    className="input focus-ring"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Tags</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Add tags to organize your thoughts..."
                      value={newContent.tags}
                      onChange={(e) => setNewContent({ ...newContent, tags: e.target.value })}
                      onFocus={() => setShowTagSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
                      className="input focus-ring"
                    />
                    {showTagSuggestions && existingTags.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 card-glass max-h-40 overflow-y-auto animate-slide-up">
                        <div className="p-3 border-b border-border/30">
                          <p className="text-xs font-medium text-text-muted">Existing tags</p>
                        </div>
                        <div className="p-3 flex flex-wrap gap-2">
                          {existingTags.map((tag, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                const currentTags = newContent.tags.split(',').map(t => t.trim()).filter(t => t);
                                if (!currentTags.includes(tag)) {
                                  const newTagsString = currentTags.length > 0 ? `${currentTags.join(', ')}, ${tag}` : tag;
                                  setNewContent({ ...newContent, tags: newTagsString });
                                }
                              }}
                              className="chip hover-scale"
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={adding}
                    className="btn btn-primary flex-1"
                  >
                    {adding ? (
                      <>
                        <div className="animate-pulse w-4 h-4 bg-current rounded-full"></div>
                        Adding to Brain...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add to Brain
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-primary-gradient animate-pulse-slow mb-4"></div>
              <div className="text-text-muted">Loading your brain drops...</div>
            </div>
          ) : filteredContent.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-primary-gradient/10 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {selectedType === 'all' 
                  ? "Your brain is waiting for its first spark!" 
                  : `No ${contentTypes.find(t => t.value === selectedType)?.label?.toLowerCase()} yet`}
              </h3>
              <p className="text-text-muted mb-6 max-w-md">
                {selectedType === 'all' 
                  ? "Start by sharing what's on your mind - a link, thought, or discovery." 
                  : `Add your first ${contentTypes.find(t => t.value === selectedType)?.label?.toLowerCase()} to get started.`}
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary hover-lift"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Drop Your First Thought
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
              {filteredContent.map((item: any) => (
                <div key={item.id} className="card-glass aspect-square flex flex-col hover-lift group">
                  {editingId === item.id ? (
                    // Edit Mode
                    <div className="p-4 space-y-3 flex-1">
                      <input
                        type="text"
                        value={editContent.title}
                        onChange={(e) => setEditContent({ ...editContent, title: e.target.value })}
                        className="input text-sm"
                        placeholder="Title"
                      />
                      <input
                        type="url"
                        value={editContent.link}
                        onChange={(e) => setEditContent({ ...editContent, link: e.target.value })}
                        className="input text-sm"
                        placeholder="Link"
                      />
                      <select
                        value={editContent.type}
                        onChange={(e) => setEditContent({ ...editContent, type: e.target.value })}
                        className="input text-sm"
                      >
                        <option value="website">🌐 Website</option>
                        <option value="youtube">🎥 YouTube</option>
                        <option value="twitter">🐦 Twitter</option>
                        <option value="document">📄 Document</option>
                        <option value="article">📰 Article</option>
                        <option value="reddit">📱 Reddit</option>
                        <option value="tweet">💭 Tweet</option>
                        <option value="link">🔗 Link</option>
                      </select>
                      <div className="relative">
                        <input
                          type="text"
                          value={editContent.tags}
                          onChange={(e) => setEditContent({ ...editContent, tags: e.target.value })}
                          placeholder="Tags (comma separated)"
                          onFocus={() => setShowTagSuggestions(true)}
                          onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
                          className="input text-sm"
                        />
                        {showTagSuggestions && existingTags.length > 0 && (
                          <div className="absolute z-50 w-full mt-1 card-glass max-h-32 overflow-y-auto">
                            <div className="p-2 flex flex-wrap gap-1">
                              {existingTags.map((tag, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => {
                                    const currentTags = editContent.tags.split(',').map(t => t.trim()).filter(t => t);
                                    if (!currentTags.includes(tag)) {
                                      const newTagsString = currentTags.length > 0 ? `${currentTags.join(', ')}, ${tag}` : tag;
                                      setEditContent({ ...editContent, tags: newTagsString });
                                    }
                                  }}
                                  className="chip text-xs"
                                >
                                  #{tag}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-auto pt-2">
                        <button
                          onClick={() => handleEditContent(item.id)}
                          className="btn btn-sm flex-1 bg-success text-white hover:bg-success/90"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="btn btn-sm btn-secondary flex-1"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex flex-col h-full">
                      {/* Content Type Header */}
                      <div className="p-4 border-b border-border/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">
                              {contentTypes.find(t => t.value === item.type)?.icon || '📄'}
                            </span>
                            <span className="chip text-xs">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Body */}
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-text-primary text-sm line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:text-primary-600 mb-4 line-clamp-2 transition-colors"
                        >
                          {item.link.length > 50 ? `${item.link.substring(0, 50)}...` : item.link}
                        </a>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4 flex-1">
                          {item.tags && Array.isArray(item.tags) && item.tags.length > 0 ? (
                            item.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                              tag ? (
                                <span key={tagIndex} className="chip text-xs">
                                  #{tag}
                                </span>
                              ) : null
                            ))
                          ) : (
                            <span className="text-text-muted text-xs italic">No tags</span>
                          )}
                          {item.tags && item.tags.length > 3 && (
                            <span className="text-text-muted text-xs">+{item.tags.length - 3}</span>
                          )}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-2 mt-auto">
                          <button
                            onClick={() => startEditing(item)}
                            className="btn btn-sm btn-secondary flex-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteContent(item.id)}
                            className="btn btn-sm btn-ghost text-danger hover:bg-danger/10"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SharedBrain() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [brainOwner, setBrainOwner] = useState('');

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        // Get share link from URL path
        const path = window.location.pathname;
        const shareLink = path.split('/shared/')[1];
        
        if (!shareLink) {
          setError('Invalid share link');
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:3000/api/v1/brain/${shareLink}`);
        
        if (response.ok) {
          const data = await response.json();
          setContent(data.content || []);
          if (data.content && data.content.length > 0) {
            setBrainOwner(data.content[0].username);
          }
        } else {
          setError('Failed to load shared brain');
        }
      } catch (error) {
        setError('Error loading shared content');
        console.error('Failed to fetch shared content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, []);

  if (loading) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Loading Shared Brain...</h1>
        <p>Please wait while we load the content.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-red-600 mb-6">Error</h1>
        <p>{error}</p>
        <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Go to Home
        </a>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Shared Brain</h1>
          {brainOwner && <p className="text-gray-600">by {brainOwner}</p>}
        </div>
        <a 
          href="/" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to My Brain
        </a>
      </div>

      {/* Content List */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Shared Content ({content.length} items)</h2>
        
        {content.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>This brain doesn't have any content yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {content.map((item: any) => (
              <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-600">{item.title}</h3>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:underline"
                    >
                      {item.link}
                    </a>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-gray-200 text-xs px-2 py-1 rounded">
                        {item.type}
                      </span>
                      {item.tags && item.tags.map((tag: string, tagIndex: number) => (
                        <span key={tagIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AuthContent() {
  const { isAuthenticated } = useAuth();
  
  // Check if this is a shared brain URL
  const path = window.location.pathname;
  if (path.startsWith('/shared/')) {
    const shareId = path.replace('/shared/', '');
    return <SharedBrainViewer />;
  }
  
  if (isAuthenticated) {
    return <Dashboard />;
  }
  
  return <LoginForm />;
}

export default function App() {
  console.log('App component rendering...');
  
  try {
    return (
      <AuthProvider>
        <AuthContent />
      </AuthProvider>
    );
  } catch (error) {
    console.error('Error in App:', error);
    return (
      <div className="p-4">
        <h1 className="text-red-500">Critical Error</h1>
        <p>Failed to initialize app</p>
        <pre className="bg-gray-100 p-2 mt-2 text-sm">{String(error)}</pre>
      </div>
    );
  }
}
