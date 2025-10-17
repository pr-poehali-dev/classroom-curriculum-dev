import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useEditMode } from '@/components/EditModeContext';
import DraggableBlock from '@/components/DraggableBlock';
import ImageUploader from '@/components/ImageUploader';
import EditableContent from '@/components/EditableContent';

interface Topic {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  gameType: string;
  image?: string;
}

interface Module {
  id: string;
  grade: number;
  title: string;
  topics: Topic[];
}

const defaultModules: Module[] = [
  {
    id: 'grade-1',
    grade: 1,
    title: 'Что и кто?',
    topics: [
      { id: 'topic-1-1', title: 'Что такое Родина?', difficulty: 'easy', gameType: 'quiz' },
      { id: 'topic-1-2', title: 'Что мы знаем о народах России?', difficulty: 'easy', gameType: 'match' },
      { id: 'topic-1-3', title: 'Что такое окружающий мир?', difficulty: 'easy', gameType: 'sort' }
    ]
  },
  {
    id: 'grade-2',
    grade: 2,
    title: 'Где мы живём?',
    topics: [
      { id: 'topic-2-1', title: 'Родная страна', difficulty: 'easy', gameType: 'quiz' },
      { id: 'topic-2-2', title: 'Город и село', difficulty: 'medium', gameType: 'match' },
      { id: 'topic-2-3', title: 'Природа и рукотворный мир', difficulty: 'medium', gameType: 'sort' }
    ]
  },
  {
    id: 'grade-3',
    grade: 3,
    title: 'Как устроен мир',
    topics: [
      { id: 'topic-3-1', title: 'Природа. Разнообразие природы', difficulty: 'medium', gameType: 'quiz' },
      { id: 'topic-3-2', title: 'Человек - часть природы', difficulty: 'medium', gameType: 'match' },
      { id: 'topic-3-3', title: 'Общество', difficulty: 'hard', gameType: 'sort' }
    ]
  },
  {
    id: 'grade-4',
    grade: 4,
    title: 'Земля и человечество',
    topics: [
      { id: 'topic-4-1', title: 'Мир глазами астронома', difficulty: 'hard', gameType: 'quiz' },
      { id: 'topic-4-2', title: 'Планеты Солнечной системы', difficulty: 'hard', gameType: 'match' },
      { id: 'topic-4-3', title: 'Звёздное небо', difficulty: 'hard', gameType: 'memory' }
    ]
  }
];

export default function LearningHub() {
  const navigate = useNavigate();
  const { isEditMode, toggleEditMode } = useEditMode();
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [modules, setModules] = useLocalStorage<Module[]>('learningModules', defaultModules);
  const [backgroundColor, setBackgroundColor] = useLocalStorage('learnBackgroundColor', '#f0f9f0');
  const [backgroundImage, setBackgroundImage] = useLocalStorage('learnBackgroundImage', '');
  const [editingTopic, setEditingTopic] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const currentModules = modules.filter(m => m.grade === selectedGrade);

  const handleDragEnd = (event: DragEndEvent, moduleId: string) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setModules((prevModules) => {
        const moduleIndex = prevModules.findIndex(m => m.id === moduleId);
        const module = prevModules[moduleIndex];
        const oldIndex = module.topics.findIndex(t => t.id === active.id);
        const newIndex = module.topics.findIndex(t => t.id === over.id);
        const newTopics = arrayMove(module.topics, oldIndex, newIndex);
        
        const newModules = [...prevModules];
        newModules[moduleIndex] = { ...module, topics: newTopics };
        return newModules;
      });
    }
  };

  const addNewTopic = (moduleId: string) => {
    const newTopic: Topic = {
      id: `topic-${Date.now()}`,
      title: 'Новая тема',
      difficulty: 'easy',
      gameType: 'quiz'
    };
    setModules(prevModules => 
      prevModules.map(m => 
        m.id === moduleId 
          ? { ...m, topics: [...m.topics, newTopic] }
          : m
      )
    );
  };

  const deleteTopic = (moduleId: string, topicId: string) => {
    setModules(prevModules =>
      prevModules.map(m =>
        m.id === moduleId
          ? { ...m, topics: m.topics.filter(t => t.id !== topicId) }
          : m
      )
    );
  };

  const updateTopic = (moduleId: string, topicId: string, updates: Partial<Topic>) => {
    setModules(prevModules =>
      prevModules.map(m =>
        m.id === moduleId
          ? { ...m, topics: m.topics.map(t => t.id === topicId ? { ...t, ...updates } : t) }
          : m
      )
    );
  };

  const addNewModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      grade: selectedGrade,
      title: 'Новый раздел',
      topics: []
    };
    setModules([...modules, newModule]);
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const updateModuleTitle = (moduleId: string, title: string) => {
    setModules(prevModules =>
      prevModules.map(m =>
        m.id === moduleId ? { ...m, title } : m
      )
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🌱 Лёгкий';
      case 'medium': return '🌿 Средний';
      case 'hard': return '🌳 Сложный';
      default: return difficulty;
    }
  };

  const backgroundStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor };

  return (
    <div className="min-h-screen" style={backgroundStyle}>
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
      
      {isEditMode && (
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
      )}

      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/')} variant="outline" className="gap-2">
                <Icon name="ArrowLeft" size={18} />
                На главную
              </Button>
              <h1 className="text-2xl font-bold text-green-800">
                📚 Обучение
              </h1>
            </div>
            <Button
              onClick={toggleEditMode}
              variant={isEditMode ? 'default' : 'outline'}
              className="gap-2"
            >
              <Icon name={isEditMode ? 'Lock' : 'Edit'} size={18} />
              {isEditMode ? 'Завершить' : 'Редактировать'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-800">Выберите класс:</h2>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map(grade => (
              <Button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                variant={selectedGrade === grade ? 'default' : 'outline'}
                className={`${selectedGrade === grade ? 'bg-green-600' : ''}`}
              >
                {grade} класс
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {currentModules.map((module) => (
            <DraggableBlock
              key={module.id}
              id={module.id}
              onDelete={() => deleteModule(module.id)}
            >
              <Card className="watercolor-card border-2 border-green-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <EditableContent
                        initialValue={module.title}
                        onSave={(value) => updateModuleTitle(module.id, value)}
                        as="h3"
                        className="text-2xl text-green-800 flex items-center gap-3"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        {module.grade} класс • {module.topics.length} тем
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(e) => handleDragEnd(e, module.id)}
                  >
                    <SortableContext 
                      items={module.topics.map(t => t.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {module.topics.map(topic => (
                          <DraggableBlock
                            key={topic.id}
                            id={topic.id}
                            onDelete={() => deleteTopic(module.id, topic.id)}
                            onEdit={() => setEditingTopic(topic.id)}
                            className="p-4 rounded-lg border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all bg-white"
                          >
                            {editingTopic === topic.id && isEditMode ? (
                              <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                                <Input
                                  value={topic.title}
                                  onChange={(e) => updateTopic(module.id, topic.id, { title: e.target.value })}
                                  placeholder="Название темы"
                                  className="text-sm"
                                />
                                <select
                                  value={topic.difficulty}
                                  onChange={(e) => updateTopic(module.id, topic.id, { difficulty: e.target.value as any })}
                                  className="w-full p-2 border rounded text-sm"
                                >
                                  <option value="easy">🌱 Лёгкий</option>
                                  <option value="medium">🌿 Средний</option>
                                  <option value="hard">🌳 Сложный</option>
                                </select>
                                <select
                                  value={topic.gameType}
                                  onChange={(e) => updateTopic(module.id, topic.id, { gameType: e.target.value })}
                                  className="w-full p-2 border rounded text-sm"
                                >
                                  <option value="quiz">Викторина</option>
                                  <option value="match">Соответствия</option>
                                  <option value="sort">Сортировка</option>
                                  <option value="memory">Память</option>
                                </select>
                                <ImageUploader
                                  currentImage={topic.image}
                                  onImageSelect={(url) => updateTopic(module.id, topic.id, { image: url })}
                                />
                                <Button 
                                  size="sm" 
                                  onClick={() => setEditingTopic(null)}
                                  className="w-full"
                                >
                                  Готово
                                </Button>
                              </div>
                            ) : (
                              <button
                                onClick={() => navigate(`/game/${topic.id}`)}
                                className="w-full text-left"
                              >
                                {topic.image && (
                                  <img 
                                    src={topic.image} 
                                    alt={topic.title}
                                    className="w-full h-32 object-cover rounded-lg mb-3"
                                  />
                                )}
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <h3 className="font-medium text-gray-800 group-hover:text-green-700 mb-2">
                                      {topic.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                      <Badge className={`text-xs ${getDifficultyColor(topic.difficulty)}`}>
                                        {getDifficultyLabel(topic.difficulty)}
                                      </Badge>
                                      <Badge variant="outline" className="text-xs">
                                        {topic.gameType === 'quiz' && <><Icon name="HelpCircle" size={12} className="mr-1" /> Викторина</>}
                                        {topic.gameType === 'match' && <><Icon name="Link" size={12} className="mr-1" /> Соответствия</>}
                                        {topic.gameType === 'sort' && <><Icon name="ListFilter" size={12} className="mr-1" /> Сортировка</>}
                                        {topic.gameType === 'memory' && <><Icon name="Brain" size={12} className="mr-1" /> Память</>}
                                      </Badge>
                                    </div>
                                  </div>
                                  <Icon name="PlayCircle" size={20} className="text-green-600 group-hover:scale-110 transition-transform" />
                                </div>
                              </button>
                            )}
                          </DraggableBlock>
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                  
                  {isEditMode && (
                    <Button
                      onClick={() => addNewTopic(module.id)}
                      variant="outline"
                      className="w-full mt-4 border-dashed border-2"
                    >
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить тему
                    </Button>
                  )}
                </CardContent>
              </Card>
            </DraggableBlock>
          ))}
        </div>

        {isEditMode && (
          <Button
            onClick={addNewModule}
            variant="outline"
            className="w-full mt-8 border-dashed border-2 py-8"
          >
            <Icon name="Plus" size={24} className="mr-2" />
            Добавить новый раздел
          </Button>
        )}
      </main>
    </div>
  );
}
