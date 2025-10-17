import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import EditableContent from '@/components/EditableContent';
import AnimatedCharacter from '@/components/AnimatedCharacter';
import RippleCard from '@/components/RippleCard';
import DraggableBlock from '@/components/DraggableBlock';
import ImageUploader from '@/components/ImageUploader';
import EditorPanel from '@/components/editor/EditorPanel';
import { useEditMode } from '@/components/EditModeContext';
import { Input } from '@/components/ui/input';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Block {
  id: string;
  type: string;
  data: any;
}

export default function Home() {
  const navigate = useNavigate();
  const { isEditMode, toggleEditMode } = useEditMode();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  const [backgroundColor, setBackgroundColor] = useLocalStorage('homeBackgroundColor', '#f0f9f0');
  const [backgroundImage, setBackgroundImage] = useLocalStorage('homeBackgroundImage', '');
  
  const [texts, setTexts] = useLocalStorage('homeTexts', {
    mainTitle: 'Добро пожаловать в мир природы!',
    mainSubtitle: 'Интерактивная образовательная платформа по предмету "Окружающий мир" для учеников 1-4 классов по программе УМК "Школа России"',
    aboutProjectTitle: 'О проекте',
    aboutProjectText: 'Познавательная платформа с интерактивными играми, викторинами и творческими заданиями. Учитесь вместе с Муравьишкой Вопросиком и Мудрой Черепахой!',
    aboutAuthorTitle: 'Об авторе',
    aboutAuthorText: 'Проект создан учителем начальных классов с многолетним опытом работы по программе "Школа России". Цель - сделать обучение увлекательным и эффективным.',
    antMessage: '💡 Привет! Я Муравьишка Вопросик. Люблю задавать вопросы и узнавать новое!',
    turtleMessage: '🎓 Здравствуй! Я Мудрая Черепаха. Помогу тебе учиться терпеливо!',
    quoteText: 'Природа — это единственная книга, каждая страница которой полна глубокого содержания',
    quoteAuthor: 'И. В. Гёте'
  });
  
  const [media, setMedia] = useLocalStorage('homeMedia', {
    projectImage: 'https://cdn.poehali.dev/files/51871eff-33d4-41d4-9edf-4145c31c1c07.png',
    authorImage: 'https://cdn.poehali.dev/files/51871eff-33d4-41d4-9edf-4145c31c1c07.png'
  });

  const [blocks, setBlocks] = useLocalStorage<Block[]>('homeBlocks', [
    { id: 'hero', type: 'hero', data: {} },
    { id: 'about-cards', type: 'about-cards', data: {} },
    { id: 'quote', type: 'quote', data: {} }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateText = (key: string, value: string) => {
    setTexts(prev => ({ ...prev, [key]: value }));
  };
  
  const updateMedia = (key: string, value: string) => {
    setMedia(prev => ({ ...prev, [key]: value }));
  };

  const handleInsertBlock = (blockType: string, data: any) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type: blockType,
      data
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case 'hero':
        return (
          <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-8 mb-6">
                <div 
                  className="hidden md:block transform scale-x-[-1] group relative"
                  title="Муравьишка Вопросик"
                >
                  <AnimatedCharacter type="ant" animation="happy" size={160} />
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10 scale-x-[-1]">
                    <EditableContent
                      initialValue={texts.antMessage}
                      onSave={(value) => updateText('antMessage', value)}
                      as="p"
                      className="text-sm font-medium text-green-700"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <EditableContent
                    initialValue={texts.mainTitle}
                    onSave={(value) => updateText('mainTitle', value)}
                    as="h2"
                    className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-800 via-green-600 to-green-500 bg-clip-text text-transparent"
                  />
                  <EditableContent
                    initialValue={texts.mainSubtitle}
                    onSave={(value) => updateText('mainSubtitle', value)}
                    as="p"
                    className="text-xl text-green-700 max-w-3xl mx-auto leading-relaxed"
                  />
                </div>
                <div 
                  className="hidden md:block group relative"
                  title="Мудрая Черепаха"
                >
                  <AnimatedCharacter type="turtle" animation="happy" size={160} />
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
                    <EditableContent
                      initialValue={texts.turtleMessage}
                      onSave={(value) => updateText('turtleMessage', value)}
                      as="p"
                      className="text-sm font-medium text-blue-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'about-cards':
        return (
          <section className="container mx-auto px-4 mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <RippleCard 
                className="watercolor-card border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer active:scale-95 active:shadow-lg"
                onClick={() => navigate('/about-project')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <EditableContent
                      initialValue={texts.aboutProjectTitle}
                      onSave={(value) => updateText('aboutProjectTitle', value)}
                      as="h3"
                      className="text-2xl font-bold text-green-800"
                    />
                    <Icon name="ChevronRight" className="text-green-600" size={24} />
                  </div>
                  {isEditMode && (
                    <div className="mb-4">
                      <ImageUploader
                        currentImage={media.projectImage}
                        onImageSelect={(url) => updateMedia('projectImage', url)}
                      />
                    </div>
                  )}
                  <img 
                    src={media.projectImage} 
                    alt="О проекте"
                    className="aspect-video rounded-xl mb-4 w-full object-cover"
                  />
                  <EditableContent
                    initialValue={texts.aboutProjectText}
                    onSave={(value) => updateText('aboutProjectText', value)}
                    as="p"
                    className="text-green-700 line-clamp-3"
                  />
                </CardContent>
              </RippleCard>

              <RippleCard 
                className="watercolor-card border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer active:scale-95 active:shadow-lg"
                onClick={() => navigate('/about-author')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <EditableContent
                      initialValue={texts.aboutAuthorTitle}
                      onSave={(value) => updateText('aboutAuthorTitle', value)}
                      as="h3"
                      className="text-2xl font-bold text-green-800"
                    />
                    <Icon name="ChevronRight" className="text-green-600" size={24} />
                  </div>
                  {isEditMode && (
                    <div className="mb-4">
                      <ImageUploader
                        currentImage={media.authorImage}
                        onImageSelect={(url) => updateMedia('authorImage', url)}
                      />
                    </div>
                  )}
                  <img 
                    src={media.authorImage} 
                    alt="Об авторе"
                    className="aspect-video rounded-xl mb-4 w-full object-cover"
                  />
                  <EditableContent
                    initialValue={texts.aboutAuthorText}
                    onSave={(value) => updateText('aboutAuthorText', value)}
                    as="p"
                    className="text-green-700 line-clamp-3"
                  />
                </CardContent>
              </RippleCard>
            </div>
          </section>
        );

      case 'quote':
        return (
          <section className="container mx-auto px-4 mb-16">
            <Card className="watercolor-card border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white shadow-xl max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="text-6xl text-green-500 opacity-50">"</div>
                  <div className="flex-1">
                    <EditableContent
                      initialValue={texts.quoteText}
                      onSave={(value) => updateText('quoteText', value)}
                      as="p"
                      className="text-xl italic text-green-800 mb-4"
                    />
                    <EditableContent
                      initialValue={texts.quoteAuthor}
                      onSave={(value) => updateText('quoteAuthor', value)}
                      as="p"
                      className="text-sm font-medium text-green-600 text-right"
                    />
                  </div>
                  <div className="text-6xl text-green-500 opacity-50 self-end">"</div>
                </div>
              </CardContent>
            </Card>
          </section>
        );

      case 'image':
        return (
          <section className="container mx-auto px-4 mb-8">
            {isEditMode && (
              <ImageUploader
                currentImage={block.data.url}
                onImageSelect={(url) => {
                  const updatedBlocks = blocks.map(b => 
                    b.id === block.id ? { ...b, data: { ...b.data, url } } : b
                  );
                  setBlocks(updatedBlocks);
                }}
              />
            )}
            <img 
              src={block.data.url} 
              alt={block.data.alt || 'Изображение'}
              className="w-full max-w-3xl mx-auto rounded-xl shadow-lg"
            />
          </section>
        );

      case 'text':
        return (
          <section className="container mx-auto px-4 mb-8">
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-6">
                <EditableContent
                  initialValue={block.data.content || 'Новый текстовый блок'}
                  onSave={(value) => {
                    const updatedBlocks = blocks.map(b => 
                      b.id === block.id ? { ...b, data: { ...b.data, content: value } } : b
                    );
                    setBlocks(updatedBlocks);
                  }}
                  as="div"
                  className="prose max-w-none"
                />
              </CardContent>
            </Card>
          </section>
        );

      default:
        return null;
    }
  };

  const backgroundStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor };

  return (
    <div className="min-h-screen relative overflow-hidden" style={backgroundStyle}>
      <div className="watercolor-leaves" />
      <div className="absolute inset-0 gradient-nature opacity-90" />
      
      {isEditMode && (
        <>
          <div className="fixed bottom-4 left-4 z-50 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border-2 border-green-300 max-w-xs">
            <p className="text-sm font-semibold text-green-800 mb-2">🎨 Настройка фона</p>
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <Input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-16 h-10 cursor-pointer"
                />
                <span className="text-xs text-muted-foreground">{backgroundColor}</span>
              </div>
              <ImageUploader
                currentImage={backgroundImage}
                onImageSelect={setBackgroundImage}
                trigger={
                  <Button variant="outline" size="sm" className="w-full">
                    <Icon name="Image" size={16} className="mr-2" />
                    {backgroundImage ? 'Изменить фон' : 'Добавить фон'}
                  </Button>
                }
              />
              {backgroundImage && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setBackgroundImage('')}
                >
                  Убрать фоновое изображение
                </Button>
              )}
            </div>
          </div>
          <EditorPanel 
            onInsertBlock={handleInsertBlock}
            isOpen={isPanelOpen}
            onToggle={() => setIsPanelOpen(!isPanelOpen)}
          />
        </>
      )}
      
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-green-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                <span className="text-3xl">🌿</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                  Окружающий мир
                </h1>
                <p className="text-sm text-green-600">Интерактивное обучение</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={toggleEditMode}
                variant={isEditMode ? 'default' : 'outline'}
                className="gap-2"
              >
                <Icon name={isEditMode ? 'Lock' : 'Edit'} size={18} />
                {isEditMode ? 'Завершить' : 'Редактировать'}
              </Button>
              <Link to="/learn">
                <Button className="gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  <Icon name="BookOpen" size={18} />
                  Начать обучение
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={blocks.map(b => b.id)}
            strategy={verticalListSortingStrategy}
          >
            {blocks.map((block) => (
              <DraggableBlock
                key={block.id}
                id={block.id}
                onDelete={() => handleDeleteBlock(block.id)}
              >
                {renderBlock(block)}
              </DraggableBlock>
            ))}
          </SortableContext>
        </DndContext>
      </main>
    </div>
  );
}
