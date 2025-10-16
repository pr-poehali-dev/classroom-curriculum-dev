import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface EditorPanelProps {
  onInsertBlock: (blockType: string, data?: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const templates = {
  text: [
    { name: 'Заголовок H1', type: 'h1', content: 'Новый заголовок' },
    { name: 'Заголовок H2', type: 'h2', content: 'Подзаголовок' },
    { name: 'Параграф', type: 'p', content: 'Новый текстовый блок' },
    { name: 'Цитата', type: 'quote', content: 'Вдохновляющая цитата', author: 'Автор' }
  ],
  media: [
    { name: 'Изображение', type: 'image', url: '' },
    { name: 'Видео (YouTube)', type: 'video', url: '' },
    { name: 'GIF', type: 'gif', url: '' },
    { name: 'Аудио', type: 'audio', url: '' }
  ],
  files: [
    { name: 'Файл (Word/PDF)', type: 'file', title: 'Документ', url: '' },
    { name: 'Раскраска', type: 'coloring', title: 'Раскраска', url: '' },
    { name: 'Рабочий лист', type: 'worksheet', title: 'Рабочий лист', url: '' }
  ],
  layout: [
    { name: 'Контейнер', type: 'container', columns: 1 },
    { name: '2 колонки', type: 'container', columns: 2 },
    { name: '3 колонки', type: 'container', columns: 3 },
    { name: 'Карточка', type: 'card' }
  ],
  games: [
    { name: 'Викторина', type: 'quiz' },
    { name: 'Соответствия', type: 'match' },
    { name: 'Сортировка', type: 'sort' },
    { name: 'Память', type: 'memory' },
    { name: 'Пазл', type: 'puzzle' }
  ]
};

export default function EditorPanel({ onInsertBlock, isOpen, onToggle }: EditorPanelProps) {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const handleInsert = (template: any) => {
    setSelectedTemplate(template);
    onInsertBlock(template.type, template);
    toast({
      title: 'Блок добавлен',
      description: `${template.name} успешно добавлен на страницу`,
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <Icon name="Plus" size={24} />
      </Button>
    );
  }

  return (
    <>
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
        size="icon"
        variant="secondary"
      >
        <Icon name="X" size={24} />
      </Button>

      <Card className="fixed bottom-24 right-6 z-40 w-96 max-h-[600px] overflow-y-auto shadow-2xl">
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Icon name="Wand2" size={20} />
            Панель редактирования
          </h3>

          <Tabs defaultValue="text">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text">Текст</TabsTrigger>
              <TabsTrigger value="media">Медиа</TabsTrigger>
              <TabsTrigger value="files">Файлы</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-2 mt-4">
              {templates.text.map((template, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleInsert(template)}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Icon name="Type" size={16} className="mr-2" />
                  {template.name}
                </Button>
              ))}
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Раскладки</p>
                {templates.layout.map((template, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleInsert(template)}
                    variant="outline"
                    className="w-full justify-start mb-2"
                  >
                    <Icon name="LayoutGrid" size={16} className="mr-2" />
                    {template.name}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-2 mt-4">
              {templates.media.map((template, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleInsert(template)}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Icon name="Image" size={16} className="mr-2" />
                  {template.name}
                </Button>
              ))}
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Интерактив</p>
                {templates.games.map((template, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleInsert(template)}
                    variant="outline"
                    className="w-full justify-start mb-2"
                  >
                    <Icon name="Gamepad2" size={16} className="mr-2" />
                    {template.name}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="files" className="space-y-2 mt-4">
              {templates.files.map((template, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleInsert(template)}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Icon name="FileText" size={16} className="mr-2" />
                  {template.name}
                </Button>
              ))}
            </TabsContent>
          </Tabs>

          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              💡 После вставки блока кликните на него для редактирования
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
