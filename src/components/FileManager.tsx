import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useEditMode } from '@/components/EditModeContext';

interface FileItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size?: string;
  uploadDate: string;
}

interface FileManagerProps {
  category: string;
  title: string;
  icon: string;
}

export default function FileManager({ category, title, icon }: FileManagerProps) {
  const { isEditMode } = useEditMode();
  const [files, setFiles] = useLocalStorage<FileItem[]>(`files-${category}`, []);
  const [urlInput, setUrlInput] = useState('');
  const [fileNameInput, setFileNameInput] = useState('');

  const handleAddFromUrl = () => {
    if (urlInput.trim() && fileNameInput.trim()) {
      const newFile: FileItem = {
        id: Date.now().toString(),
        name: fileNameInput.trim(),
        url: urlInput.trim(),
        type: 'url',
        uploadDate: new Date().toLocaleDateString('ru-RU')
      };
      setFiles([...files, newFile]);
      setUrlInput('');
      setFileNameInput('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newFile: FileItem = {
          id: Date.now().toString(),
          name: file.name,
          url: reader.result as string,
          type: file.type,
          size: `${(file.size / 1024).toFixed(1)} КБ`,
          uploadDate: new Date().toLocaleDateString('ru-RU')
        };
        setFiles([...files, newFile]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleDownload = (file: FileItem) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  return (
    <Card className="watercolor-card border-2 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <span className="text-2xl">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditMode && (
          <div className="mb-6 space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-semibold text-green-800">Добавить файл</p>
            
            <div className="space-y-2">
              <Input
                placeholder="Название файла"
                value={fileNameInput}
                onChange={(e) => setFileNameInput(e.target.value)}
              />
              <Input
                placeholder="Ссылка на файл (https://...)"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddFromUrl()}
              />
              <Button onClick={handleAddFromUrl} className="w-full" size="sm">
                <Icon name="Link" size={16} className="mr-2" />
                Добавить по ссылке
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-green-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-green-50 px-2 text-green-600">или</span>
              </div>
            </div>

            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-green-300 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
              <div className="flex flex-col items-center justify-center">
                <Icon name="Upload" size={24} className="mb-1 text-green-600" />
                <p className="text-xs text-green-700">Загрузить с компьютера</p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        )}

        {files.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Icon name="FileText" size={48} className="mx-auto mb-2 opacity-50" />
            <p>Файлов пока нет</p>
            {isEditMode && <p className="text-sm">Добавьте файлы выше</p>}
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-white border border-green-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {file.uploadDate}
                      {file.size && ` • ${file.size}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(file)}
                  >
                    <Icon name="Download" size={16} />
                  </Button>
                  {isEditMode && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(file.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
