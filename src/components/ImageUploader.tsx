import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ImageUploaderProps {
  onImageSelect: (url: string) => void;
  currentImage?: string;
  trigger?: React.ReactNode;
}

export default function ImageUploader({ onImageSelect, currentImage, trigger }: ImageUploaderProps) {
  const [urlInput, setUrlInput] = useState('');
  const [open, setOpen] = useState(false);

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onImageSelect(urlInput.trim());
      setUrlInput('');
      setOpen(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
        setOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Icon name="Image" size={16} className="mr-2" />
            {currentImage ? 'Изменить изображение' : 'Добавить изображение'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Загрузить изображение</DialogTitle>
          <DialogDescription>
            Выберите способ загрузки изображения
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">По ссылке</TabsTrigger>
            <TabsTrigger value="file">С компьютера</TabsTrigger>
          </TabsList>
          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
              />
              <Button onClick={handleUrlSubmit} className="w-full">
                <Icon name="Link" size={16} className="mr-2" />
                Загрузить по ссылке
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="file" className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Icon name="Upload" size={32} className="mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Нажмите для выбора файла</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF до 10MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </TabsContent>
        </Tabs>
        {currentImage && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Текущее изображение:</p>
            <img src={currentImage} alt="Current" className="w-full h-32 object-cover rounded-lg" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
