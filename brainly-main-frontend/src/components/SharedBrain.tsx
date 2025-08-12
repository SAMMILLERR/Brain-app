import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Content } from '../types';
import { apiService } from '../services/api';
import { ContentCard } from './ContentCard';

export function SharedBrain() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shareLink) {
      loadSharedBrain();
    }
  }, [shareLink]);

  const loadSharedBrain = async () => {
    if (!shareLink) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getSharedBrain(shareLink);
      setContents(response.content || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load shared brain');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <div className="text-secondary-600">Loading shared brain...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-secondary-800 mb-2">Access Denied</h2>
          <p className="text-secondary-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-secondary-800">Shared Brain</h1>
              <span className="text-sm text-secondary-600">
                {contents.length > 0 && contents[0].username && `by ${contents[0].username}`}
              </span>
            </div>
            <div className="text-sm text-secondary-500">
              {contents.length} item{contents.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {contents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-secondary-400 text-6xl mb-4">🧠</div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">
              This brain is empty
            </h3>
            <p className="text-secondary-600">
              The owner hasn't added any content yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents.map((content, index) => (
              <ContentCard
                key={content.id || index}
                content={content}
                isSharedView={true}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
