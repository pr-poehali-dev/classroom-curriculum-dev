import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface EditableBlockProps {
  type: string;
  initialData: any;
  onUpdate: (data: any) => void;
  onDelete: () => void;
  children?: React.ReactNode;
}

export default function EditableBlock({ 
  type, 
  initialData, 
  onUpdate, 
  onDelete,
  children 
}: EditableBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(initialData);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSave = () => {
    onUpdate(data);
    setIsEditing(false);
    toast({
      title: 'Сохранено',
      description: 'Изменения успешно сохранены',
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setData({ ...data, url, fileName: file.name });
      toast({
        title: 'Файл загружен',
        description: file.name,
      });
    }
  };

  const renderEditor = () => {
    switch (type) {
      case 'h1':
      case 'h2':
      case 'p':
        return (
          <div className="space-y-2">
            <Input
              value={data.content || ''}
              onChange={(e) => setData({ ...data, content: e.target.value })}
              placeholder="Введите текст"
            />
          </div>
        );

      case 'quote':
        return (
          <div className="space-y-2">
            <Textarea
              value={data.content || ''}
              onChange={(e) => setData({ ...data, content: e.target.value })}
              placeholder="Текст цитаты"
              rows={3}
            />
            <Input
              value={data.author || ''}
              onChange={(e) => setData({ ...data, author: e.target.value })}
              placeholder="Автор"
            />
          </div>
        );

      case 'image':
      case 'video':
      case 'gif':
        return (
          <div className="space-y-2">
            <Input
              value={data.url || ''}
              onChange={(e) => setData({ ...data, url: e.target.value })}
              placeholder="URL изображения или видео"
            />
            <p className="text-xs text-muted-foreground">
              Или вставьте ссылку на YouTube, изображение или GIF
            </p>
          </div>
        );

      case 'audio':
        return (
          <div className="space-y-2">
            <Input
              value={data.url || ''}
              onChange={(e) => setData({ ...data, url: e.target.value })}
              placeholder="URL аудиофайла"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full"
            >
              <Icon name="Upload" size={16} className="mr-2" />
              Или загрузить файл
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        );

      case 'file':
      case 'worksheet':
      case 'coloring':
        return (
          <div className="space-y-2">
            <Input
              value={data.title || ''}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Название файла"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full"
            >
              <Icon name="Upload" size={16} className="mr-2" />
              Загрузить файл (Word, PDF, изображение)
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".doc,.docx,.pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
            {data.fileName && (
              <p className="text-sm text-muted-foreground">
                📎 {data.fileName}
              </p>
            )}
          </div>
        );

      default:
        return (
          <Textarea
            value={JSON.stringify(data, null, 2)}
            onChange={(e) => {
              try {
                setData(JSON.parse(e.target.value));
              } catch {}
            }}
            rows={10}
            placeholder="JSON данные"
          />
        );
    }
  };

  if (isEditing) {
    return (
      <Card className="p-4 border-2 border-primary">
        <div className="space-y-4">
          {renderEditor()}
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              <Icon name="Check" size={16} className="mr-2" />
              Сохранить
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Отмена
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div className="absolute top-2 right-2 flex gap-1 bg-background/90 backdrop-blur rounded-lg p-1 shadow-lg">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8"
          >
            <Icon name="Edit" size={14} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={onDelete}
            className="h-8 w-8"
          >
            <Icon name="Trash2" size={14} />
          </Button>
        </div>
      )}
    </div>
  );
}
