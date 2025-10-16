import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useEditMode } from '@/components/EditModeContext';

interface MediaEmbedProps {
  type: 'video' | 'gif';
  initialUrl?: string;
  className?: string;
  onUrlChange?: (url: string) => void;
}

export default function MediaEmbed({ type, initialUrl = '', className = '', onUrlChange }: MediaEmbedProps) {
  const [url, setUrl] = useState(initialUrl);
  const [isEditing, setIsEditing] = useState(false);
  const { isEditMode } = useEditMode();

  const handleSave = () => {
    setIsEditing(false);
    onUrlChange?.(url);
  };

  const getYouTubeEmbedUrl = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    return null;
  };

  const renderMedia = () => {
    if (!url) {
      return (
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          <div className="text-center">
            <Icon name={type === 'video' ? 'Video' : 'Image'} size={48} className="mx-auto mb-2" />
            <p>Нет медиа</p>
          </div>
        </div>
      );
    }

    if (type === 'video') {
      const embedUrl = getYouTubeEmbedUrl(url);
      
      if (embedUrl) {
        return (
          <iframe
            src={embedUrl}
            className="w-full h-64 rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
      
      return (
        <video
          src={url}
          controls
          className="w-full h-64 rounded-lg object-cover"
        />
      );
    }

    return (
      <img
        src={url}
        alt="Медиа контент"
        className="w-full h-64 rounded-lg object-cover"
      />
    );
  };

  return (
    <div className={`relative ${className}`}>
      {renderMedia()}
      
      {isEditMode && (
        <div className="mt-2">
          {isEditing ? (
            <div className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={type === 'video' ? 'URL видео (YouTube или прямая ссылка)' : 'URL изображения или GIF'}
                className="flex-1"
              />
              <Button onClick={handleSave} size="sm">
                <Icon name="Check" size={16} />
              </Button>
              <Button onClick={() => setIsEditing(false)} size="sm" variant="outline">
                <Icon name="X" size={16} />
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} size="sm" variant="outline" className="w-full">
              <Icon name="Edit" size={16} className="mr-2" />
              {url ? 'Изменить ссылку' : 'Добавить ссылку'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
