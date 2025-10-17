import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useEditMode } from '@/components/EditModeContext';

interface DraggableBlockProps {
  id: string;
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export default function DraggableBlock({ id, children, onEdit, onDelete, className = '' }: DraggableBlockProps) {
  const { isEditMode } = useEditMode();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const playClickSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${className}`}
      onClick={playClickSound}
    >
      {isEditMode && (
        <div className="absolute -top-3 right-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="sm"
            className="h-8 w-8 p-0 bg-white shadow-lg hover:scale-110 transition-transform"
            {...attributes}
            {...listeners}
          >
            <Icon name="GripVertical" size={16} />
          </Button>
          {onEdit && (
            <Button
              variant="secondary"
              size="sm"
              className="h-8 w-8 p-0 bg-white shadow-lg hover:scale-110 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Icon name="Pencil" size={16} />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              className="h-8 w-8 p-0 shadow-lg hover:scale-110 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Icon name="Trash2" size={16} />
            </Button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
