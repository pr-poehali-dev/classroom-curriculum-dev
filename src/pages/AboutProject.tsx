import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import EditableContent from '@/components/EditableContent';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useEditMode } from '@/components/EditModeContext';

export default function AboutProject() {
  const navigate = useNavigate();
  const { isEditMode, toggleEditMode } = useEditMode();
  
  const [content, setContent] = useLocalStorage('aboutProjectContent', {
    title: 'О проекте',
    subtitle: 'Интерактивная платформа для изучения окружающего мира',
    mainText: 'Познавательная платформа с интерактивными играми, викторинами и творческими заданиями. Учитесь вместе с Муравьишкой Вопросиком и Мудрой Черепахой!',
    features: [
      'Игровой формат обучения с викторинами и кроссвордами',
      'Адаптация под разные уровни сложности',
      'Визуальная мотивация и звуковые эффекты',
      'Подробные объяснения при ошибках'
    ],
    videoUrl: '',
    images: ['', '', '']
  });

  const updateContent = (key: string, value: string | string[]) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...content.features];
    newFeatures[index] = value;
    updateContent('features', newFeatures);
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...content.images];
    newImages[index] = value;
    updateContent('images', newImages);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      <div className="watercolor-leaves" />
      
      <header className="relative z-10 bg-white/90 backdrop-blur-md border-b border-green-200 shadow-sm sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={() => navigate('/')} variant="ghost" className="gap-2">
              <Icon name="ArrowLeft" size={20} />
              На главную
            </Button>
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

      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <EditableContent
              initialValue={content.title}
              onSave={(value) => updateContent('title', value)}
              as="h1"
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent"
            />
            <EditableContent
              initialValue={content.subtitle}
              onSave={(value) => updateContent('subtitle', value)}
              as="p"
              className="text-xl text-green-600"
            />
          </div>

          {content.videoUrl || isEditMode ? (
            <Card className="mb-8 watercolor-card">
              <CardContent className="p-6">
                <EditableContent
                  type="video"
                  initialValue={content.videoUrl}
                  onSave={(value) => updateContent('videoUrl', value)}
                  className="aspect-video w-full rounded-lg bg-gradient-to-br from-blue-100 to-green-100"
                />
              </CardContent>
            </Card>
          ) : null}

          <Card className="mb-8 watercolor-card">
            <CardContent className="p-8">
              <EditableContent
                initialValue={content.mainText}
                onSave={(value) => updateContent('mainText', value)}
                as="p"
                className="text-lg text-green-800 leading-relaxed mb-6"
              />

              <h3 className="text-2xl font-bold text-green-800 mb-4">Особенности:</h3>
              <ul className="space-y-3">
                {content.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="Check" className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <EditableContent
                      initialValue={feature}
                      onSave={(value) => updateFeature(index, value)}
                      as="span"
                      className="text-green-700"
                    />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {content.images.map((image, index) => (
              <Card key={index} className="watercolor-card">
                <CardContent className="p-4">
                  <EditableContent
                    type="image"
                    initialValue={image || `https://via.placeholder.com/400x300/4ade80/ffffff?text=Фото+${index + 1}`}
                    onSave={(value) => updateImage(index, value)}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
