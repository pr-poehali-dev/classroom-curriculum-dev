import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import EditableContent from '@/components/EditableContent';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useEditMode } from '@/components/EditModeContext';

export default function AboutAuthor() {
  const navigate = useNavigate();
  const { isEditMode, toggleEditMode } = useEditMode();
  
  const [content, setContent] = useLocalStorage('aboutAuthorContent', {
    title: 'Об авторе',
    name: 'Имя Автора',
    position: 'Учитель начальных классов',
    bio: 'Проект создан учителем начальных классов с многолетним опытом работы по программе "Школа России". Цель — сделать обучение увлекательным и эффективным.',
    achievements: [
      'Высшая квалификационная категория',
      'Опыт работы более 15 лет',
      'Автор методических разработок',
      'Участник образовательных конференций'
    ],
    photo: 'https://cdn.poehali.dev/files/51871eff-33d4-41d4-9edf-4145c31c1c07.png',
    contacts: {
      email: 'info@example.com',
      phone: '+7 (999) 123-45-67',
      social: ''
    }
  });

  const updateContent = (key: string, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const updateAchievement = (index: number, value: string) => {
    const newAchievements = [...content.achievements];
    newAchievements[index] = value;
    updateContent('achievements', newAchievements);
  };

  const updateContact = (key: string, value: string) => {
    updateContent('contacts', { ...content.contacts, [key]: value });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="watercolor-leaves" />
      
      <header className="relative z-10 bg-white/90 backdrop-blur-md border-b border-purple-200 shadow-sm sticky top-0">
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
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent"
            />
          </div>

          <Card className="mb-8 watercolor-card">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3">
                  <EditableContent
                    type="image"
                    initialValue={content.photo}
                    onSave={(value) => updateContent('photo', value)}
                    className="w-full aspect-square object-cover rounded-2xl shadow-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <EditableContent
                    initialValue={content.name}
                    onSave={(value) => updateContent('name', value)}
                    as="h2"
                    className="text-3xl font-bold text-purple-800 mb-2"
                  />
                  <EditableContent
                    initialValue={content.position}
                    onSave={(value) => updateContent('position', value)}
                    as="p"
                    className="text-lg text-purple-600 mb-4"
                  />
                  <EditableContent
                    initialValue={content.bio}
                    onSave={(value) => updateContent('bio', value)}
                    as="p"
                    className="text-gray-700 leading-relaxed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 watercolor-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Достижения:</h3>
              <ul className="space-y-3">
                {content.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="Award" className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                    <EditableContent
                      initialValue={achievement}
                      onSave={(value) => updateAchievement(index, value)}
                      as="span"
                      className="text-gray-700"
                    />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="watercolor-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Контакты:</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="text-purple-600" size={20} />
                  <EditableContent
                    initialValue={content.contacts.email}
                    onSave={(value) => updateContact('email', value)}
                    as="span"
                    className="text-gray-700"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="text-purple-600" size={20} />
                  <EditableContent
                    initialValue={content.contacts.phone}
                    onSave={(value) => updateContact('phone', value)}
                    as="span"
                    className="text-gray-700"
                  />
                </div>
                {(content.contacts.social || isEditMode) && (
                  <div className="flex items-center gap-3">
                    <Icon name="Globe" className="text-purple-600" size={20} />
                    <EditableContent
                      initialValue={content.contacts.social || 'Добавить ссылку'}
                      onSave={(value) => updateContact('social', value)}
                      as="span"
                      className="text-gray-700"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
