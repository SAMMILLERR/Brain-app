import type { Content } from '../types';
import { Button } from './Button';

interface ContentCardProps {
  content: Content;
  onEdit?: (content: Content) => void;
  onDelete?: (id: string) => void;
  isSharedView?: boolean;
}

export function ContentCard({ content, onEdit, onDelete, isSharedView = false }: ContentCardProps) {
  const getTypeColor = (type: Content['type']) => {
    const colors = {
      tweet: 'bg-blue-100 text-blue-800',
      reddit: 'bg-orange-100 text-orange-800',
      youtube: 'bg-red-100 text-red-800',
      document: 'bg-gray-100 text-gray-800',
      link: 'bg-green-100 text-green-800',
      article: 'bg-purple-100 text-purple-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: Content['type']) => {
    const icons = {
      tweet: '🐦',
      reddit: '🔴',
      youtube: '📺',
      document: '📄',
      link: '🔗',
      article: '📰',
    };
    return icons[type] || '📄';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-secondary-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getTypeIcon(content.type)}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(content.type)}`}>
            {content.type}
          </span>
        </div>
        {!isSharedView && (onEdit || onDelete) && (
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(content)}
                className="text-secondary-500 hover:text-primary-600 transition-colors"
                title="Edit"
              >
                ✏️
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => content.id && onDelete(content.id)}
                className="text-secondary-500 hover:text-red-600 transition-colors"
                title="Delete"
              >
                🗑️
              </button>
            )}
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-secondary-800 mb-2 line-clamp-2">
        {content.title}
      </h3>

      {/* Link */}
      <a
        href={content.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 hover:text-primary-700 text-sm mb-3 block truncate"
      >
        {content.link}
      </a>

      {/* Tags */}
      {content.tags && content.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {content.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-accent-100 text-accent-800 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-secondary-100">
        <span className="text-xs text-secondary-500">
          by {content.username || 'Unknown'}
        </span>
        <Button
          text="View"
          size="sm"
          variant="secondary"
          onClick={() => window.open(content.link, '_blank')}
        />
      </div>
    </div>
  );
}
