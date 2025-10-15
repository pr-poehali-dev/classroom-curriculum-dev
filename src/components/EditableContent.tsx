import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useEditMode } from '@/components/EditModeContext';

interface EditableContentProps {
  initialValue: string;
  onSave: (value: string) => void;
  type?: 'text' | 'image' | 'video';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export default function EditableContent({
  initialValue,
  onSave,
  type = 'text',
  className = '',
  as: Component = 'div'
}: EditableContentProps) {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [showControls, setShowControls] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setValue(result);
      onSave(result);
    };
    reader.readAsDataURL(file);
  };

  if (type === 'image') {
    return (
      <div
        className="relative group"
        onMouseEnter={() => isEditMode && setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <img src={value} alt="" className={className} />
        {isEditMode && showControls && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              className="gap-1"
            >
              <Icon name="Upload" size={14} />
              Заменить
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    );
  }

  if (type === 'video') {
    return (
      <div
        className="relative group"
        onMouseEnter={() => isEditMode && setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {value.startsWith('data:') || value.startsWith('http') ? (
          <video src={value} controls className={className} />
        ) : (
          <div className={`${className} bg-muted rounded-lg flex items-center justify-center`}>
            <Icon name="Video" size={48} className="text-muted-foreground" />
          </div>
        )}
        {isEditMode && showControls && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              className="gap-1"
            >
              <Icon name="Upload" size={14} />
              Загрузить
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={contentRef}
      className="relative group"
      onMouseEnter={() => isEditMode && setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {isEditing ? (
        <div className="flex gap-2 items-start">
          <Component
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setValue(e.currentTarget.textContent || '')}
            className={`${className} outline-none border-2 border-primary rounded px-2 min-w-[200px]`}
          >
            {value}
          </Component>
          <div className="flex gap-1">
            <Button size="sm" onClick={handleSave} variant="default">
              <Icon name="Check" size={14} />
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setValue(initialValue);
                setIsEditing(false);
              }}
              variant="outline"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Component className={className}>{value}</Component>
          {isEditMode && showControls && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
            >
              <Icon name="Pencil" size={12} />
            </Button>
          )}
        </>
      )}
    </div>
  );
}