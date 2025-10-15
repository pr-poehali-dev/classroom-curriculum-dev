import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import AnimatedCharacter from '@/components/AnimatedCharacter';
import EditableContent from '@/components/EditableContent';
import { useSound } from '@/hooks/useSound';

interface Game {
  type: 'quiz' | 'match' | 'practice' | 'crossword' | 'puzzle' | 'timeline';
  difficulty: 'easy' | 'medium' | 'hard' | 'creative';
  estimatedTime: number;
}

interface CrosswordWord {
  word: string;
  definition: string;
  row: number;
  col: number;
  direction: 'across' | 'down';
}

interface Topic {
  title: string;
  description?: string;
  games: Game[];
}

interface Module {
  id: string;
  name: string;
  topics: Topic[];
  theme?: 'nature' | 'sky' | 'earth' | 'water';
}

interface Textbook {
  part: number;
  modules: Module[];
}

interface Grade {
  level: number;
  textbooks: Textbook[];
}

const educationData: Grade[] = [
  {
    level: 1,
    textbooks: [
      {
        part: 1,
        modules: [
          {
            id: 'm1-1',
            name: 'Что и кто?',
            theme: 'nature',
            topics: [
              { 
                title: 'Что такое Родина?', 
                description: 'Знакомство с понятием Родина, Россия',
                games: [
                  { type: 'quiz', difficulty: 'easy', estimatedTime: 5 },
                  { type: 'crossword', difficulty: 'medium', estimatedTime: 8 },
                  { type: 'match', difficulty: 'hard', estimatedTime: 7 },
                  { type: 'practice', difficulty: 'creative', estimatedTime: 20 }
                ]
              },
              { 
                title: 'Что мы знаем о народах России?',
                description: 'Разнообразие народов и культур',
                games: [
                  { type: 'match', difficulty: 'easy', estimatedTime: 7 },
                  { type: 'puzzle', difficulty: 'medium', estimatedTime: 10 },
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 8 },
                  { type: 'practice', difficulty: 'creative', estimatedTime: 25 }
                ]
              },
              { 
                title: 'Что у нас над головой?',
                description: 'Небо, солнце, звёзды',
                games: [
                  { type: 'crossword', difficulty: 'easy', estimatedTime: 10 },
                  { type: 'practice', difficulty: 'medium', estimatedTime: 12 },
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 10 },
                  { type: 'practice', difficulty: 'creative', estimatedTime: 30 }
                ]
              },
              { 
                title: 'Что растёт на подоконнике?',
                description: 'Комнатные растения',
                games: [
                  { type: 'match', difficulty: 'easy', estimatedTime: 8 },
                  { type: 'puzzle', difficulty: 'medium', estimatedTime: 10 },
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 8 },
                  { type: 'practice', difficulty: 'creative', estimatedTime: 35 }
                ]
              }
            ]
          },
          {
            id: 'm1-2',
            name: 'Как, откуда и куда?',
            theme: 'water',
            topics: [
              { 
                title: 'Как живёт семья?',
                description: 'Семейные традиции',
                games: [
                  { type: 'quiz', difficulty: 'easy', estimatedTime: 6 },
                  { type: 'crossword', difficulty: 'easy', estimatedTime: 9 }
                ]
              },
              { 
                title: 'Откуда берётся вода?',
                description: 'Путь воды в дом',
                games: [
                  { type: 'timeline', difficulty: 'medium', estimatedTime: 10 },
                  { type: 'quiz', difficulty: 'easy', estimatedTime: 7 }
                ]
              }
            ]
          }
        ]
      },
      {
        part: 2,
        modules: [
          {
            id: 'm1-3',
            name: 'Где и когда?',
            theme: 'sky',
            topics: [
              { 
                title: 'Когда наступит лето?',
                description: 'Времена года',
                games: [
                  { type: 'timeline', difficulty: 'easy', estimatedTime: 8 },
                  { type: 'match', difficulty: 'easy', estimatedTime: 7 }
                ]
              },
              { 
                title: 'Где живут белые медведи?',
                description: 'Холодные районы Земли',
                games: [
                  { type: 'crossword', difficulty: 'medium', estimatedTime: 12 },
                  { type: 'quiz', difficulty: 'medium', estimatedTime: 8 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    level: 2,
    textbooks: [
      {
        part: 1,
        modules: [
          {
            id: 'm2-1',
            name: 'Природа',
            theme: 'nature',
            topics: [
              { 
                title: 'Живая и неживая природа',
                description: 'Признаки живого',
                games: [
                  { type: 'match', difficulty: 'easy', estimatedTime: 8 },
                  { type: 'crossword', difficulty: 'easy', estimatedTime: 10 }
                ]
              },
              { 
                title: 'Дикие и домашние животные',
                description: 'Различия диких и домашних животных',
                games: [
                  { type: 'puzzle', difficulty: 'medium', estimatedTime: 12 },
                  { type: 'quiz', difficulty: 'medium', estimatedTime: 10 }
                ]
              },
              { 
                title: 'Красная книга',
                description: 'Охрана природы',
                games: [
                  { type: 'crossword', difficulty: 'medium', estimatedTime: 15 },
                  { type: 'match', difficulty: 'medium', estimatedTime: 10 }
                ]
              }
            ]
          },
          {
            id: 'm2-2',
            name: 'Жизнь города и села',
            theme: 'earth',
            topics: [
              { 
                title: 'Что такое экономика?',
                description: 'Промышленность, сельское хозяйство',
                games: [
                  { type: 'quiz', difficulty: 'medium', estimatedTime: 10 },
                  { type: 'crossword', difficulty: 'medium', estimatedTime: 12 }
                ]
              },
              { 
                title: 'Из чего что сделано?',
                description: 'Производство вещей',
                games: [
                  { type: 'timeline', difficulty: 'medium', estimatedTime: 12 },
                  { type: 'match', difficulty: 'medium', estimatedTime: 9 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    level: 3,
    textbooks: [
      {
        part: 1,
        modules: [
          {
            id: 'm3-1',
            name: 'Как устроен мир',
            theme: 'nature',
            topics: [
              { 
                title: 'Природа. Разнообразие природы',
                description: 'Царства природы',
                games: [
                  { type: 'crossword', difficulty: 'medium', estimatedTime: 15 },
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 12 }
                ]
              },
              { 
                title: 'Человек',
                description: 'Ступеньки познания',
                games: [
                  { type: 'practice', difficulty: 'medium', estimatedTime: 10 },
                  { type: 'puzzle', difficulty: 'medium', estimatedTime: 12 }
                ]
              },
              { 
                title: 'Общество',
                description: 'Государство, народ',
                games: [
                  { type: 'match', difficulty: 'hard', estimatedTime: 10 },
                  { type: 'crossword', difficulty: 'hard', estimatedTime: 15 }
                ]
              }
            ]
          },
          {
            id: 'm3-2',
            name: 'Эта удивительная природа',
            theme: 'water',
            topics: [
              { 
                title: 'Тела, вещества, частицы',
                description: 'Строение вещества',
                games: [
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 12 },
                  { type: 'crossword', difficulty: 'hard', estimatedTime: 15 }
                ]
              },
              { 
                title: 'Превращения и круговорот воды',
                description: 'Три состояния воды',
                games: [
                  { type: 'timeline', difficulty: 'hard', estimatedTime: 15 },
                  { type: 'practice', difficulty: 'hard', estimatedTime: 12 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    level: 4,
    textbooks: [
      {
        part: 1,
        modules: [
          {
            id: 'm4-1',
            name: 'Земля и человечество',
            theme: 'sky',
            topics: [
              { 
                title: 'Мир глазами астронома',
                description: 'Вселенная, планеты',
                games: [
                  { type: 'crossword', difficulty: 'hard', estimatedTime: 18 },
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 15 }
                ]
              },
              { 
                title: 'Мир глазами географа',
                description: 'Глобус и карта',
                games: [
                  { type: 'puzzle', difficulty: 'hard', estimatedTime: 20 },
                  { type: 'match', difficulty: 'hard', estimatedTime: 12 }
                ]
              },
              { 
                title: 'Мир глазами историка',
                description: 'История, археология',
                games: [
                  { type: 'timeline', difficulty: 'hard', estimatedTime: 20 },
                  { type: 'crossword', difficulty: 'hard', estimatedTime: 18 }
                ]
              }
            ]
          },
          {
            id: 'm4-2',
            name: 'Природа России',
            theme: 'earth',
            topics: [
              { 
                title: 'Равнины и горы России',
                description: 'Поверхность нашей страны',
                games: [
                  { type: 'match', difficulty: 'hard', estimatedTime: 15 },
                  { type: 'crossword', difficulty: 'hard', estimatedTime: 18 }
                ]
              },
              { 
                title: 'Природные зоны России',
                description: 'Арктика, тундра, тайга',
                games: [
                  { type: 'puzzle', difficulty: 'hard', estimatedTime: 20 },
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 15 }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

const gameTypeLabels: Record<Game['type'], string> = {
  quiz: 'Викторина',
  match: 'Сопоставление',
  practice: 'Тренировка',
  crossword: 'Кроссворд',
  puzzle: 'Пазл',
  timeline: 'Хронология'
};

const difficultyLabels: Record<Game['difficulty'], string> = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
  creative: 'Творческий'
};

const difficultyColors: Record<Game['difficulty'], string> = {
  easy: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  hard: 'bg-red-100 text-red-700 border-red-200',
  creative: 'bg-purple-100 text-purple-700 border-purple-200'
};

const sampleCrosswordData: CrosswordWord[] = [
  { word: 'РОДИНА', definition: 'Страна, где человек родился', row: 0, col: 0, direction: 'across' },
  { word: 'РОССИЯ', definition: 'Наша великая страна', row: 0, col: 0, direction: 'down' },
  { word: 'ФЛАГ', definition: 'Символ государства с тремя цветами', row: 2, col: 1, direction: 'across' },
  { word: 'ГЕРБ', definition: 'Эмблема государства с двуглавым орлом', row: 4, col: 0, direction: 'across' }
];

const explanations: Record<string, string> = {
  'Юпитер': 'Юпитер - самая большая планета в Солнечной системе, газовый гигант с большим красным пятном.',
  'Марс': 'Марс - красная планета, четвёртая по удалённости от Солнца.',
  'Земля': 'Земля - наша родная планета, единственная известная планета с жизнью.',
  'Венера': 'Венера - вторая планета от Солнца, самая горячая планета Солнечной системы.'
};

const getModuleThemeClass = (theme?: string) => {
  switch (theme) {
    case 'nature':
      return 'nature-gradient';
    case 'sky':
      return 'sky-gradient';
    case 'earth':
      return 'earth-gradient';
    case 'water':
      return 'water-gradient';
    default:
      return 'bg-secondary';
  }
};

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLearnPage = location.pathname === '/learn';
  
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Game['difficulty'] | 'all'>('all');
  const [selectedGame, setSelectedGame] = useState<{ game: Game; topic: string } | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(10);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [crosswordAnswers, setCrosswordAnswers] = useState<Record<number, string>>({});
  const [currentCharacter, setCurrentCharacter] = useState<'ant' | 'turtle'>('ant');
  const [editableTexts, setEditableTexts] = useState({
    heroTitle: 'Окружающий мир с Муравьишкой и Черепашкой',
    heroSubtitle: 'Интерактивные игры и задания по окружающему миру для 1-4 классов',
    aboutTitle: 'О проекте',
    aboutText: 'Платформа создана для увлекательного изучения окружающего мира. Вместе с Муравьишкой Вопросиком и Мудрой Черепашкой дети познают природу, историю и культуру через игры и творческие задания.',
    authorTitle: 'Об авторе',
    authorText: 'Проект разработан с любовью к природе и образованию. Наша цель — сделать обучение интересным и доступным для каждого ребёнка.',
    videoPlaceholder: 'https://via.placeholder.com/800x450/4ade80/ffffff?text=Видео+о+проекте'
  });
  const [revealedDefinition, setRevealedDefinition] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [characterAnimation, setCharacterAnimation] = useState<'grow' | 'shrink' | null>(null);
  
  const characters: ('ant' | 'turtle')[] = ['ant', 'turtle'];
  
  useEffect(() => {
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    setCurrentCharacter(randomCharacter);
  }, [selectedGame, currentQuestion]);
  
  const { playCorrectSound, playWrongSound, playClickSound } = useSound();

  useEffect(() => {
    if (gameStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, timeRemaining]);

  const startGame = () => {
    if (selectedGame) {
      setGameStarted(true);
      setTimeRemaining(selectedGame.game.estimatedTime * 60);
      setCurrentQuestion(1);
      setScore(0);
      setGameCompleted(false);
      setCrosswordAnswers({});
      setRevealedDefinition(null);
    }
  };

  const closeGame = () => {
    setSelectedGame(null);
    setGameStarted(false);
    setTimeRemaining(0);
    setCurrentQuestion(1);
    setScore(0);
    setWrongAnswers(0);
    setGameCompleted(false);
    setCrosswordAnswers({});
    setRevealedDefinition(null);
    setShowExplanation(null);
    setLastAnswerCorrect(null);
    setCharacterAnimation(null);
  };

  const handleAnswer = (correct: boolean, answerText?: string) => {
    playClickSound();
    setLastAnswerCorrect(correct);
    
    if (correct) {
      playCorrectSound();
      setScore(score + 1);
      setCharacterAnimation('grow');
      setShowExplanation(null);
      setTimeout(() => setCharacterAnimation(null), 600);
      
      setTimeout(() => {
        if (currentQuestion < totalQuestions) {
          setCurrentQuestion(currentQuestion + 1);
          setLastAnswerCorrect(null);
        } else {
          setGameCompleted(true);
        }
      }, 1500);
    } else {
      playWrongSound();
      setWrongAnswers(wrongAnswers + 1);
      setCharacterAnimation('shrink');
      if (answerText && explanations[answerText]) {
        setShowExplanation(explanations[answerText]);
      }
      setTimeout(() => setCharacterAnimation(null), 600);
      
      setTimeout(() => {
        if (currentQuestion < totalQuestions) {
          setCurrentQuestion(currentQuestion + 1);
          setLastAnswerCorrect(null);
          setShowExplanation(null);
        } else {
          setGameCompleted(true);
        }
      }, 3000);
    }
  };

  const handleCrosswordInput = (index: number, value: string) => {
    setCrosswordAnswers({ ...crosswordAnswers, [index]: value.toUpperCase() });
    if (value.toUpperCase() === sampleCrosswordData[index].word) {
      setScore(score + 1);
    }
  };

  const checkCrossword = () => {
    let correct = 0;
    sampleCrosswordData.forEach((word, index) => {
      if (crosswordAnswers[index] === word.word) {
        correct++;
      }
    });
    setScore(correct);
    setGameCompleted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGameRules = (type: Game['type']) => {
    switch (type) {
      case 'quiz':
        return 'Ответьте на все вопросы за отведённое время. За каждый правильный ответ вы получаете балл.';
      case 'match':
        return 'Найдите правильные пары элементов. Перетаскивайте карточки, чтобы соединить их.';
      case 'practice':
        return 'Решайте задачи последовательно. Вы можете использовать подсказки и повторять попытки.';
      case 'crossword':
        return 'Разгадайте кроссворд, вписывая слова по определениям. Нажмите на номер, чтобы увидеть определение.';
      case 'puzzle':
        return 'Соберите картинку из частей, перемещая фрагменты в правильные позиции.';
      case 'timeline':
        return 'Расположите события в правильном хронологическом порядке от раннего к позднему.';
    }
  };

  const currentGrade = educationData.find(g => g.level === selectedGrade);

  return (
    <div className="min-h-screen nature-gradient">
      <div className="watercolor-leaves" />
      <div className="absolute inset-0 gradient-nature opacity-30 pointer-events-none" />
      
      <header className="relative z-10 bg-white/95 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-50 no-print shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-2xl">🌿</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Окружающий мир</h1>
                <p className="text-sm text-muted-foreground">УМК "Школа России" • 1-4 класс</p>
              </div>
            </div>
            <div className="flex gap-2">
              {isLearnPage && (
                <Button onClick={() => navigate('/')} variant="outline" className="gap-2">
                  <Icon name="Home" size={18} />
                  На главную
                </Button>
              )}
              <Button variant="outline" className="gap-2" onClick={() => window.print()}>
                <Icon name="Printer" size={18} />
                Версия для печати
              </Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="relative z-10 bg-white/90 backdrop-blur-md border-b border-green-200 no-print">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-3">
            <p className="text-sm font-semibold text-green-700 mb-2">🎓 Выберите класс:</p>
            <div className="flex items-center gap-2 flex-wrap">
              {[1, 2, 3, 4].map((grade) => (
                <Button
                  key={grade}
                  variant={selectedGrade === grade ? 'default' : 'outline'}
                  onClick={() => setSelectedGrade(grade)}
                  className="gap-2"
                >
                  <Icon name="GraduationCap" size={16} />
                  {grade} класс
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-green-700 mb-2">🎯 Уровень сложности:</p>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedDifficulty('all')}
                size="sm"
              >
                Все уровни
              </Button>
              <Button
                variant={selectedDifficulty === 'easy' ? 'default' : 'outline'}
                onClick={() => setSelectedDifficulty('easy')}
                size="sm"
                className="gap-1"
              >
                <span>🌱</span>
                Лёгкий
              </Button>
              <Button
                variant={selectedDifficulty === 'medium' ? 'default' : 'outline'}
                onClick={() => setSelectedDifficulty('medium')}
                size="sm"
                className="gap-1"
              >
                <span>🌿</span>
                Средний
              </Button>
              <Button
                variant={selectedDifficulty === 'hard' ? 'default' : 'outline'}
                onClick={() => setSelectedDifficulty('hard')}
                size="sm"
                className="gap-1"
              >
                <span>🌳</span>
                Сложный
              </Button>
              <Button
                variant={selectedDifficulty === 'creative' ? 'default' : 'outline'}
                onClick={() => setSelectedDifficulty('creative')}
                size="sm"
                className="gap-1"
              >
                <span>🎨</span>
                Творческий
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {selectedGrade} класс
          </h2>
          <p className="text-muted-foreground">
            Выберите учебник и модуль для изучения материалов
          </p>
        </div>

        {currentGrade?.textbooks.map((textbook, tbIndex) => (
          <Card key={tbIndex} className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Book" className="text-primary" size={24} />
                </div>
                <div>
                  <CardTitle>Учебник, Часть {textbook.part}</CardTitle>
                  <CardDescription>
                    {textbook.modules.length} {textbook.modules.length === 1 ? 'модуль' : 'модуля'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {textbook.modules.map((module) => (
                  <AccordionItem key={module.id} value={module.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${getModuleThemeClass(module.theme)} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          {module.theme === 'nature' && <span className="text-xl">🌱</span>}
                          {module.theme === 'sky' && <span className="text-xl">☁️</span>}
                          {module.theme === 'earth' && <span className="text-xl">🏞️</span>}
                          {module.theme === 'water' && <span className="text-xl">💧</span>}
                        </div>
                        <span className="font-semibold text-left">Модуль: {module.name}</span>
                        <Badge variant="secondary" className="ml-2">
                          {module.topics.length} {module.topics.length === 1 ? 'тема' : 'темы'}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-11 pt-4 space-y-3">
                        {module.topics.map((topic, tIndex) => (
                          <div
                            key={tIndex}
                            className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                          >
                            <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon name="FileText" className="text-primary" size={16} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground mb-1">
                                Тема: {topic.title}
                              </h4>
                              {topic.description && (
                                <p className="text-sm text-muted-foreground mb-3">
                                  {topic.description}
                                </p>
                              )}
                              
                              <div className="flex flex-wrap gap-2 mt-3">
                                {topic.games
                                  .filter(game => selectedDifficulty === 'all' || game.difficulty === selectedDifficulty)
                                  .map((game, gIndex) => (
                                    <Button
                                      key={gIndex}
                                      variant="outline"
                                      size="sm"
                                      className="gap-2 text-xs h-8"
                                      onClick={() => setSelectedGame({ game, topic: topic.title })}
                                    >
                                      <Icon name="Gamepad2" size={14} />
                                      {gameTypeLabels[game.type]}
                                      <Badge className={`${difficultyColors[game.difficulty]} text-xs px-1.5 py-0 h-5`}>
                                        {difficultyLabels[game.difficulty]}
                                      </Badge>
                                      <span className="text-muted-foreground">~{game.estimatedTime} мин</span>
                                    </Button>
                                  ))}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity no-print self-start"
                            >
                              <Icon name="ExternalLink" size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Info" className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Как работать с материалами
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Выберите класс в верхней навигации</li>
                  <li>• Откройте нужный учебник и модуль</li>
                  <li>• Нажмите на тему для просмотра материалов</li>
                  <li>• Играйте в обучающие игры для закрепления знаний</li>
                  <li>• Используйте кнопку "Версия для печати" для распечатки</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-white border-t border-border mt-12 no-print">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 Окружающий мир • УМК "Школа России"</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Помощь</a>
              <a href="#" className="hover:text-foreground transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={selectedGame !== null} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedGame && !gameStarted && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Gamepad2" className="text-primary" size={28} />
                  {gameTypeLabels[selectedGame.game.type]}
                </DialogTitle>
                <DialogDescription className="text-base">
                  Тема: {selectedGame.topic}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Clock" className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Время на игру</p>
                      <p className="text-lg font-semibold">{selectedGame.game.estimatedTime} минут</p>
                    </div>
                  </div>
                  <Badge className={`${difficultyColors[selectedGame.game.difficulty]} text-sm px-3 py-1`}>
                    {difficultyLabels[selectedGame.game.difficulty]}
                  </Badge>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icon name="Info" size={20} />
                      Правила игры
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {getGameRules(selectedGame.game.type)}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="text-green-600" size={16} />
                        <span>{selectedGame.game.type === 'crossword' ? 'Всего слов: 4' : `Всего вопросов: ${totalQuestions}`}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="text-green-600" size={16} />
                        <span>За правильный ответ: 1 балл</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="text-green-600" size={16} />
                        <span>Можно приостановить игру в любой момент</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Button onClick={startGame} size="lg" className="w-full gap-2">
                  <Icon name="Play" size={20} />
                  Начать игру
                </Button>
              </div>
            </>
          )}

          {selectedGame && gameStarted && !gameCompleted && selectedGame.game.type === 'crossword' && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Icon name="Grid3x3" className="text-primary" size={24} />
                    Кроссворд
                  </span>
                  <div className="flex items-center gap-2 text-lg">
                    <Icon name="Clock" size={20} />
                    <span className={timeRemaining < 60 ? 'text-red-600 font-bold' : ''}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  Разгадайте все слова. Нажмите на номер для подсказки.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="grid gap-4">
                  {sampleCrosswordData.map((word, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-10 h-10 flex-shrink-0"
                            onClick={() => setRevealedDefinition(index)}
                          >
                            {index + 1}
                          </Button>
                          <div className="flex-1">
                            {revealedDefinition === index && (
                              <div className="mb-3 p-3 bg-primary/10 rounded-lg animate-in fade-in slide-in-from-top-2">
                                <p className="text-sm font-medium text-primary flex items-center gap-2">
                                  <Icon name="Lightbulb" size={16} />
                                  {word.definition}
                                </p>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder={`Слово (${word.word.length} букв)`}
                                value={crosswordAnswers[index] || ''}
                                onChange={(e) => handleCrosswordInput(index, e.target.value)}
                                maxLength={word.word.length}
                                className="uppercase font-mono text-lg tracking-widest"
                              />
                              {crosswordAnswers[index] === word.word && (
                                <Icon name="CheckCircle2" className="text-green-600 flex-shrink-0" size={24} />
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button onClick={checkCrossword} className="flex-1 gap-2">
                    <Icon name="Check" size={18} />
                    Проверить ответы
                  </Button>
                  <Button variant="outline" onClick={closeGame}>
                    <Icon name="X" size={18} />
                    Закрыть
                  </Button>
                </div>
              </div>
            </>
          )}

          {selectedGame && gameStarted && !gameCompleted && selectedGame.game.type !== 'crossword' && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Icon name="Gamepad2" className="text-primary" size={24} />
                    {gameTypeLabels[selectedGame.game.type]}
                  </span>
                  <div className="flex items-center gap-2 text-lg">
                    <Icon name="Clock" size={20} />
                    <span className={timeRemaining < 60 ? 'text-red-600 font-bold' : ''}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  Вопрос {currentQuestion} из {totalQuestions}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="flex justify-center">
                    {currentCharacter === 'ant' ? (
                      <AnimatedCharacter 
                        type="ant" 
                        animation={lastAnswerCorrect === true ? 'celebrating' : lastAnswerCorrect === false ? 'thinking' : 'idle'}
                        size={180}
                      />
                    ) : (
                      <div className="w-[180px] h-[180px] opacity-30 flex items-center justify-center">
                        <AnimatedCharacter type="ant" animation="idle" size={120} />
                      </div>
                    )}
                  </div>
                  <div className="col-span-1">
                    <Progress value={(currentQuestion / totalQuestions) * 100} className="h-3 mb-2" />
                    <p className="text-center text-sm text-muted-foreground">
                      Вопрос {currentQuestion}/{totalQuestions}
                    </p>
                    <p className="text-center text-lg font-bold text-primary mt-2">
                      Баллы: {score}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    {currentCharacter === 'turtle' ? (
                      <AnimatedCharacter 
                        type="turtle" 
                        animation={lastAnswerCorrect === true ? 'celebrating' : lastAnswerCorrect === false ? 'thinking' : 'idle'}
                        size={180}
                      />
                    ) : (
                      <div className="w-[180px] h-[180px] opacity-30 flex items-center justify-center">
                        <AnimatedCharacter type="turtle" animation="idle" size={120} />
                      </div>
                    )}
                  </div>
                </div>

                <Card className="nature-gradient border-green-300 shadow-lg">
                  <CardContent className="pt-6">
                    
                    <h3 className="text-xl font-semibold mb-6">
                      {selectedGame.game.type === 'quiz' && 'Какая планета самая большая в Солнечной системе?'}
                      {selectedGame.game.type === 'match' && 'Сопоставьте животное с его местом обитания'}
                      {selectedGame.game.type === 'practice' && 'Расположите времена года в правильном порядке'}
                      {selectedGame.game.type === 'puzzle' && 'Соберите изображение карты России'}
                      {selectedGame.game.type === 'timeline' && 'Расположите события в хронологическом порядке'}
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {selectedGame.game.type === 'match' ? (
                        <>
                          <div className="space-y-2">
                            <p className="text-sm font-medium mb-2">Животные:</p>
                            {['Белый медведь', 'Верблюд', 'Пингвин', 'Слон'].map((animal, i) => (
                              <Button
                                key={i}
                                variant="outline"
                                size="lg"
                                className="w-full justify-start hover:bg-primary hover:text-white"
                              >
                                {animal}
                              </Button>
                            ))}
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium mb-2">Места обитания:</p>
                            {['Арктика', 'Пустыня', 'Антарктида', 'Саванна'].map((place, i) => (
                              <Button
                                key={i}
                                variant="outline"
                                size="lg"
                                className="w-full justify-start hover:bg-primary hover:text-white"
                                onClick={() => handleAnswer(i === 0)}
                              >
                                {place}
                              </Button>
                            ))}
                          </div>
                        </>
                      ) : (
                        ['Юпитер', 'Марс', 'Земля', 'Венера'].map((option, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="lg"
                            disabled={lastAnswerCorrect !== null}
                            className={`h-16 text-lg transition-all ${
                              lastAnswerCorrect === true && i === 0 ? 'bg-green-500 text-white border-green-600' :
                              lastAnswerCorrect === false && i !== 0 ? 'opacity-50' :
                              'hover:bg-primary hover:text-white'
                            }`}
                            onClick={() => handleAnswer(i === 0, option)}
                          >
                            <span className="flex items-center gap-2">
                              {option}
                              {lastAnswerCorrect === true && i === 0 && (
                                <Icon name="CheckCircle2" className="text-white" size={20} />
                              )}
                            </span>
                          </Button>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                {showExplanation && (
                  <Alert className="bg-yellow-50 border-yellow-300">
                    <Icon name="Info" className="text-yellow-600" size={20} />
                    <AlertDescription className="text-yellow-800">
                      <strong>Объяснение:</strong> {showExplanation}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={closeGame} className="flex-1">
                    <Icon name="X" size={18} />
                    Завершить
                  </Button>
                  <Button variant="ghost" className="gap-2">
                    <Icon name="Lightbulb" size={18} />
                    Подсказка
                  </Button>
                </div>
              </div>
            </>
          )}

          {selectedGame && gameCompleted && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Trophy" className="text-yellow-500" size={32} />
                  Игра завершена!
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-6">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">
                      {selectedGame.game.type === 'crossword' 
                        ? Math.round((score / sampleCrosswordData.length) * 100)
                        : Math.round((score / totalQuestions) * 100)}%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {score >= (selectedGame.game.type === 'crossword' ? sampleCrosswordData.length : totalQuestions) * 0.8 
                      ? 'Отлично!' 
                      : score >= (selectedGame.game.type === 'crossword' ? sampleCrosswordData.length : totalQuestions) * 0.6 
                      ? 'Хорошо!' 
                      : 'Попробуйте ещё раз!'}
                  </h3>
                  <p className="text-muted-foreground">
                    Правильных ответов: {score} из {selectedGame.game.type === 'crossword' ? sampleCrosswordData.length : totalQuestions}
                  </p>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Затрачено времени</span>
                        <span className="font-semibold">
                          {formatTime(selectedGame.game.estimatedTime * 60 - timeRemaining)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Точность</span>
                        <span className="font-semibold">
                          {selectedGame.game.type === 'crossword'
                            ? Math.round((score / sampleCrosswordData.length) * 100)
                            : Math.round((score / totalQuestions) * 100)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Сложность</span>
                        <Badge className={difficultyColors[selectedGame.game.difficulty]}>
                          {difficultyLabels[selectedGame.game.difficulty]}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button onClick={() => { setGameStarted(false); setGameCompleted(false); }} className="flex-1 gap-2">
                    <Icon name="RotateCcw" size={18} />
                    Играть снова
                  </Button>
                  <Button variant="outline" onClick={closeGame} className="flex-1">
                    Закрыть
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}