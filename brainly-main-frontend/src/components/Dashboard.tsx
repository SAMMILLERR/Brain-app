import { useState, useEffect } from 'react';
import type { Content } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { Button } from './Button';
import { ContentCard } from './ContentCard';
import { ContentForm } from './ContentForm';

export function Dashboard() {
  const { user, logout } = useAuth();
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | undefined>();
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<Content['type'] | 'all'>('all');

  const contentTypes: Content['type'][] = ['tweet', 'reddit', 'youtube', 'document', 'link', 'article'];

  useEffect(() => {
    loadContents();
  }, []);

  const loadContents = async () => {
    try {
      setLoading(true);
      const response = await apiService.getContent();
      setContents(response.content || []);
    } catch (error) {
      console.error('Failed to load contents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContent = async (contentData: Omit<Content, 'id' | 'username'>) => {
    try {
      await apiService.addContent(contentData);
      setShowForm(false);
      loadContents();
    } catch (error) {
      console.error('Failed to add content:', error);
    }
  };

  const handleEditContent = async (contentData: Omit<Content, 'id' | 'username'>) => {
    if (!editingContent?.id) return;
    
    try {
      await apiService.updateContent(editingContent.id, contentData);
      setEditingContent(undefined);
      loadContents();
    } catch (error) {
      console.error('Failed to update content:', error);
    }
  };

  const handleDeleteContent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;
    
    try {
      await apiService.deleteContent(id);
      loadContents();
    } catch (error) {
      console.error('Failed to delete content:', error);
    }
  };

  const handleShareBrain = async () => {
    try {
      const response = await apiService.shareBrain();
      setShareLink(response.message);
    } catch (error) {
      console.error('Failed to share brain:', error);
    }
  };

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || content.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-secondary-800">Brain App</h1>
              <span className="text-sm text-secondary-600">Welcome, {user?.username}!</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                text="Share Brain"
                variant="secondary"
                size="sm"
                onClick={handleShareBrain}
              />
              <Button
                text="Add Content"
                size="sm"
                onClick={() => setShowForm(true)}
              />
              <Button
                text="Logout"
                variant="secondary"
                size="sm"
                onClick={logout}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search contents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as Content['type'] | 'all')}
              className="px-4 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              {contentTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Share Link Modal */}
        {shareLink && (
          <div className="mb-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-primary-800 mb-2">Share Your Brain</h3>
            <p className="text-primary-700 mb-3">Share this link to let others view your brain:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={`${window.location.origin}/shared/${shareLink}`}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-primary-300 rounded-md"
              />
              <Button
                text="Copy"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/shared/${shareLink}`);
                }}
              />
              <Button
                text="Close"
                variant="secondary"
                size="sm"
                onClick={() => setShareLink(null)}
              />
            </div>
          </div>
        )}

        {/* Content Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-secondary-600">Loading your brain contents...</div>
          </div>
        ) : filteredContents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-secondary-400 text-6xl mb-4">🧠</div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">
              {contents.length === 0 ? 'Your brain is empty' : 'No matching contents'}
            </h3>
            <p className="text-secondary-600 mb-4">
              {contents.length === 0 
                ? 'Start building your digital second brain by adding some content!'
                : 'Try adjusting your search or filter criteria.'
              }
            </p>
            {contents.length === 0 && (
              <Button
                text="Add Your First Content"
                onClick={() => setShowForm(true)}
              />
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContents.map((content, index) => (
              <ContentCard
                key={content.id || index}
                content={content}
                onEdit={setEditingContent}
                onDelete={handleDeleteContent}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Form Modal */}
      {(showForm || editingContent) && (
        <ContentForm
          content={editingContent}
          onSubmit={editingContent ? handleEditContent : handleAddContent}
          onCancel={() => {
            setShowForm(false);
            setEditingContent(undefined);
          }}
        />
      )}
    </div>
  );
}
