import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

interface FileUploadCardProps {
  icon: string;
  title: string;
  description: string;
  storageKey: string;
}

interface UploadedFile {
  name: string;
  url: string;
  type: string;
  uploadedAt: string;
}

export default function FileUploadCard({ icon, title, description, storageKey }: FileUploadCardProps) {
  const [files, setFiles] = useLocalStorage<UploadedFile[]>(`${storageKey}_files`, []);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    
    const newFiles = uploadedFiles.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      uploadedAt: new Date().toISOString()
    }));

    setFiles([...files, ...newFiles]);
    
    toast({
      title: 'Файлы загружены',
      description: `Добавлено файлов: ${newFiles.length}`,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    toast({
      title: 'Файл удалён',
      description: 'Файл успешно удалён из списка',
    });
  };

  const handleDownload = (file: UploadedFile) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  return (
    <Card className="watercolor-card border-blue-200 hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="text-4xl mb-3 text-center">{icon}</div>
        <h4 className="text-lg font-bold text-blue-800 mb-2 text-center">{title}</h4>
        <p className="text-sm text-blue-600 mb-4 text-center">{description}</p>
        
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="w-full mb-2"
          variant="outline"
        >
          <Icon name="Upload" size={16} className="mr-2" />
          Загрузить файлы
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".doc,.docx,.pdf,.jpg,.jpeg,.png,.gif"
          onChange={handleFileUpload}
          className="hidden"
        />

        {files.length > 0 && (
          <>
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="ghost"
              className="w-full text-xs"
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={14} className="mr-1" />
              {files.length} {files.length === 1 ? 'файл' : 'файлов'}
            </Button>

            {isExpanded && (
              <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2 p-2 bg-white/50 rounded-lg text-xs"
                  >
                    <div className="flex-1 truncate">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {new Date(file.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => handleDownload(file)}
                      >
                        <Icon name="Download" size={12} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => handleDelete(index)}
                      >
                        <Icon name="Trash2" size={12} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
