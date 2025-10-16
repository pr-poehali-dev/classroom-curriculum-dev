import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import EditableContent from '@/components/EditableContent';
import AnimatedCharacter from '@/components/AnimatedCharacter';
import RippleCard from '@/components/RippleCard';
import { useEditMode } from '@/components/EditModeContext';
import { Input } from '@/components/ui/input';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Home() {
  const navigate = useNavigate();
  const { isEditMode, toggleEditMode } = useEditMode();
  
  const [backgroundColor, setBackgroundColor] = useLocalStorage('homeBackgroundColor', '#f0f9f0');
  
  const [texts, setTexts] = useLocalStorage('homeTexts', {
    mainTitle: 'Добро пожаловать в мир природы!',
    mainSubtitle: 'Интерактивная образовательная платформа по предмету "Окружающий мир" для учеников 1-4 классов по программе УМК "Школа России"',
    aboutProjectTitle: 'О проекте',
    aboutProjectText: 'Познавательная платформа с интерактивными играми, викторинами и творческими заданиями. Учитесь вместе с Муравьишкой Вопросиком и Мудрой Черепахой!',
    aboutAuthorTitle: 'Об авторе',
    aboutAuthorText: 'Проект создан учителем начальных классов с многолетним опытом работы по программе "Школа России". Цель - сделать обучение увлекательным и эффективным.',
    ctaTitle: 'Готовы начать увлекательное путешествие?',
    ctaText: 'Присоединяйтесь к тысячам учеников, которые уже открывают для себя мир природы!',
    contactEmail: 'info@example.com',
    contactPhone: '+7 (999) 123-45-67'
  });
  
  const [media, setMedia] = useLocalStorage('homeMedia', {
    projectImage: 'https://cdn.poehali.dev/files/51871eff-33d4-41d4-9edf-4145c31c1c07.png',
    authorImage: 'https://cdn.poehali.dev/files/51871eff-33d4-41d4-9edf-4145c31c1c07.png'
  });

  const updateText = (key: string, value: string) => {
    setTexts(prev => ({ ...prev, [key]: value }));
  };
  
  const updateMedia = (key: string, value: string) => {
    setMedia(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor }}>
      <div className="watercolor-leaves" />
      <div className="absolute inset-0 gradient-nature opacity-90" />
      
      {isEditMode && (
        <div className="fixed bottom-4 right-4 z-50 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border-2 border-green-300">
          <p className="text-sm font-semibold text-green-800 mb-2">🎨 Настройка фона</p>
          <div className="flex gap-2 items-center">
            <Input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-16 h-10 cursor-pointer"
            />
            <span className="text-xs text-muted-foreground">{backgroundColor}</span>
          </div>
        </div>
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
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-8 mb-6">
              <div className="hidden md:block transform -scale-x-100">
                <AnimatedCharacter type="ant" animation="happy" size={160} />
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
              <div className="hidden md:block">
                <AnimatedCharacter type="turtle" animation="happy" size={160} />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
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
                <EditableContent
                  type="image"
                  initialValue={media.projectImage}
                  onSave={(value) => updateMedia('projectImage', value)}
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
                <EditableContent
                  type="image"
                  initialValue={media.authorImage}
                  onSave={(value) => updateMedia('authorImage', value)}
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

          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8 text-green-800">
              🎮 Уровни игр
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="watercolor-card border-2 border-green-300 bg-gradient-to-br from-green-50 to-green-100">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-green-200 rounded-full flex items-center justify-center mb-3">
                    <span className="text-3xl">🌱</span>
                  </div>
                  <CardTitle className="text-center text-green-800">Лёгкий</CardTitle>
                  <CardDescription className="text-center text-green-600">
                    Для начинающих
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-green-600" />
                      Простые вопросы
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-green-600" />
                      Базовые понятия
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-green-600" />
                      Подсказки
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="watercolor-card border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-yellow-200 rounded-full flex items-center justify-center mb-3">
                    <span className="text-3xl">🌿</span>
                  </div>
                  <CardTitle className="text-center text-yellow-800">Средний</CardTitle>
                  <CardDescription className="text-center text-yellow-600">
                    Для продолжающих
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-yellow-600" />
                      Углублённые темы
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-yellow-600" />
                      Логические задачи
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-yellow-600" />
                      Меньше подсказок
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="watercolor-card border-2 border-red-300 bg-gradient-to-br from-red-50 to-red-100">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-red-200 rounded-full flex items-center justify-center mb-3">
                    <span className="text-3xl">🌳</span>
                  </div>
                  <CardTitle className="text-center text-red-800">Сложный</CardTitle>
                  <CardDescription className="text-center text-red-600">
                    Для опытных
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-red-600" />
                      Комплексные задачи
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-red-600" />
                      Критическое мышление
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-red-600" />
                      Олимпиадный уровень
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="watercolor-card border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-purple-200 rounded-full flex items-center justify-center mb-3">
                    <span className="text-3xl">🎨</span>
                  </div>
                  <CardTitle className="text-center text-purple-800">Творческий</CardTitle>
                  <CardDescription className="text-center text-purple-600">
                    Для креативных
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-purple-700">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-purple-600" />
                      Проектные задания
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-purple-600" />
                      Исследования
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-purple-600" />
                      Свободное творчество
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8 text-green-800">
              ✨ Особенности платформы
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🎮',
                  title: 'Интерактивные игры',
                  description: 'Викторины, кроссворды, пазлы, сопоставления и многое другое'
                },
                {
                  icon: '🌸',
                  title: 'Растущий цветок',
                  description: 'Визуальная мотивация с анимированным цветком за правильные ответы'
                },
                {
                  icon: '🐜',
                  title: 'Персонажи-помощники',
                  description: 'Муравьишка Вопросик и Мудрая Черепаха всегда помогут'
                },
                {
                  icon: '🔊',
                  title: 'Звуковые эффекты',
                  description: 'Мелодичные звуки поддерживают вовлечённость'
                },
                {
                  icon: '💡',
                  title: 'Объяснения',
                  description: 'Подробные пояснения при неправильных ответах'
                },
                {
                  icon: '📊',
                  title: 'Прогресс',
                  description: 'Отслеживание результатов и статистика'
                }
              ].map((feature, i) => (
                <Card key={i} className="watercolor-card border-green-200 hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="text-5xl mb-3">{feature.icon}</div>
                    <h4 className="text-lg font-bold text-green-800 mb-2">{feature.title}</h4>
                    <p className="text-sm text-green-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Card className="watercolor-card border-2 border-green-300 max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-yellow-50">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">🚀</div>
                <EditableContent
                  initialValue={texts.ctaTitle}
                  onSave={(value) => updateText('ctaTitle', value)}
                  as="h3"
                  className="text-2xl font-bold text-green-800 mb-4"
                />
                <EditableContent
                  initialValue={texts.ctaText}
                  onSave={(value) => updateText('ctaText', value)}
                  as="p"
                  className="text-green-700 mb-6"
                />
                <Link to="/learn">
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-lg px-8 py-6">
                    <Icon name="Sparkles" size={20} />
                    Начать обучение
                    <Icon name="ArrowRight" size={20} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="relative z-10 bg-white/80 backdrop-blur-md border-t border-green-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <h4 className="font-bold text-green-800 mb-3">О платформе</h4>
              <p className="text-sm text-green-600">
                Образовательный проект для изучения окружающего мира в начальной школе
              </p>
            </div>
            <div>
              <h4 className="font-bold text-green-800 mb-3">Ссылки</h4>
              <ul className="space-y-2 text-sm text-green-600">
                <li><a href="#" className="hover:text-green-800 transition-colors">О проекте</a></li>
                <li><a href="#" className="hover:text-green-800 transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-green-800 transition-colors">Помощь</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-green-800 mb-3">Контакты</h4>
              <div className="text-sm text-green-600">
                <EditableContent
                  initialValue={`Email: ${texts.contactEmail}`}
                  onSave={(value) => updateText('contactEmail', value.replace('Email: ', ''))}
                  as="p"
                  className="text-sm text-green-600"
                />
                <EditableContent
                  initialValue={`Телефон: ${texts.contactPhone}`}
                  onSave={(value) => updateText('contactPhone', value.replace('Телефон: ', ''))}
                  as="p"
                  className="text-sm text-green-600"
                />
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-green-600 pt-6 border-t border-green-200">
            © 2024 Окружающий мир • УМК "Школа России" • Все права защищены
          </div>
        </div>
      </footer>
    </div>
  );
}