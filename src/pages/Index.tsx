import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Game {
  type: 'quiz' | 'match' | 'practice';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
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
            name: 'Числа и счёт',
            topics: [
              { 
                title: 'Счёт от 1 до 10', 
                description: 'Знакомство с цифрами',
                games: [
                  { type: 'quiz', difficulty: 'easy', estimatedTime: 5 },
                  { type: 'practice', difficulty: 'easy', estimatedTime: 10 }
                ]
              },
              { 
                title: 'Сравнение чисел', 
                description: 'Больше, меньше, равно',
                games: [
                  { type: 'match', difficulty: 'easy', estimatedTime: 7 },
                  { type: 'quiz', difficulty: 'medium', estimatedTime: 8 }
                ]
              },
              { 
                title: 'Сложение в пределах 10',
                games: [
                  { type: 'practice', difficulty: 'medium', estimatedTime: 12 },
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 10 }
                ]
              }
            ]
          },
          {
            id: 'm1-2',
            name: 'Геометрия',
            topics: [
              { 
                title: 'Фигуры: круг, квадрат, треугольник',
                games: [
                  { type: 'match', difficulty: 'easy', estimatedTime: 8 },
                  { type: 'quiz', difficulty: 'easy', estimatedTime: 6 }
                ]
              },
              { 
                title: 'Цвета и формы',
                games: [
                  { type: 'match', difficulty: 'easy', estimatedTime: 5 }
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
            name: 'Вычитание',
            topics: [
              { 
                title: 'Вычитание в пределах 10',
                games: [
                  { type: 'practice', difficulty: 'medium', estimatedTime: 10 },
                  { type: 'quiz', difficulty: 'medium', estimatedTime: 8 }
                ]
              },
              { 
                title: 'Решение задач',
                games: [
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 15 }
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
            name: 'Числа до 100',
            topics: [
              { 
                title: 'Счёт десятками',
                games: [
                  { type: 'practice', difficulty: 'easy', estimatedTime: 8 }
                ]
              },
              { 
                title: 'Сложение и вычитание двузначных чисел',
                games: [
                  { type: 'practice', difficulty: 'medium', estimatedTime: 12 },
                  { type: 'quiz', difficulty: 'medium', estimatedTime: 10 }
                ]
              },
              { 
                title: 'Таблица умножения на 2',
                games: [
                  { type: 'quiz', difficulty: 'medium', estimatedTime: 10 },
                  { type: 'practice', difficulty: 'hard', estimatedTime: 15 }
                ]
              }
            ]
          },
          {
            id: 'm2-2',
            name: 'Единицы измерения',
            topics: [
              { 
                title: 'Сантиметр и метр',
                games: [
                  { type: 'match', difficulty: 'easy', estimatedTime: 7 },
                  { type: 'practice', difficulty: 'medium', estimatedTime: 10 }
                ]
              },
              { 
                title: 'Час и минута',
                games: [
                  { type: 'match', difficulty: 'medium', estimatedTime: 9 },
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
    level: 3,
    textbooks: [
      {
        part: 1,
        modules: [
          {
            id: 'm3-1',
            name: 'Умножение и деление',
            topics: [
              { 
                title: 'Таблица умножения',
                games: [
                  { type: 'practice', difficulty: 'hard', estimatedTime: 20 },
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 12 }
                ]
              },
              { 
                title: 'Деление с остатком',
                games: [
                  { type: 'practice', difficulty: 'hard', estimatedTime: 15 },
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 10 }
                ]
              },
              { 
                title: 'Порядок действий',
                games: [
                  { type: 'quiz', difficulty: 'medium', estimatedTime: 10 }
                ]
              }
            ]
          },
          {
            id: 'm3-2',
            name: 'Доли и дроби',
            topics: [
              { 
                title: 'Половина, треть, четверть',
                games: [
                  { type: 'match', difficulty: 'medium', estimatedTime: 10 },
                  { type: 'quiz', difficulty: 'medium', estimatedTime: 8 }
                ]
              },
              { 
                title: 'Сравнение долей',
                games: [
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 12 }
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
            name: 'Многозначные числа',
            topics: [
              { 
                title: 'Числа до 1000000',
                games: [
                  { type: 'practice', difficulty: 'medium', estimatedTime: 12 },
                  { type: 'quiz', difficulty: 'medium', estimatedTime: 10 }
                ]
              },
              { 
                title: 'Сложение и вычитание',
                games: [
                  { type: 'practice', difficulty: 'hard', estimatedTime: 15 },
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 12 }
                ]
              },
              { 
                title: 'Умножение на однозначное число',
                games: [
                  { type: 'practice', difficulty: 'hard', estimatedTime: 18 },
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 15 }
                ]
              }
            ]
          },
          {
            id: 'm4-2',
            name: 'Уравнения',
            topics: [
              { 
                title: 'Решение простых уравнений',
                games: [
                  { type: 'practice', difficulty: 'hard', estimatedTime: 20 },
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 15 }
                ]
              },
              { 
                title: 'Буквенные выражения',
                games: [
                  { type: 'quiz', difficulty: 'hard', estimatedTime: 12 },
                  { type: 'practice', difficulty: 'hard', estimatedTime: 18 }
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
  practice: 'Тренировка'
};

const difficultyLabels: Record<Game['difficulty'], string> = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный'
};

const difficultyColors: Record<Game['difficulty'], string> = {
  easy: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  hard: 'bg-red-100 text-red-700 border-red-200'
};

export default function Index() {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedGame, setSelectedGame] = useState<{ game: Game; topic: string } | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(10);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

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
    }
  };

  const closeGame = () => {
    setSelectedGame(null);
    setGameStarted(false);
    setTimeRemaining(0);
    setCurrentQuestion(1);
    setScore(0);
    setGameCompleted(false);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    }
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameCompleted(true);
    }
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
    }
  };

  const currentGrade = educationData.find(g => g.level === selectedGrade);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b border-border sticky top-0 z-50 no-print">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Образовательная платформа</h1>
                <p className="text-sm text-muted-foreground">Начальная школа 1-4 класс</p>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Icon name="Printer" size={18} />
              Версия для печати
            </Button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-border no-print">
        <div className="container mx-auto px-4 py-3">
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
                        <div className="w-8 h-8 bg-secondary rounded-md flex items-center justify-center flex-shrink-0">
                          <Icon name="FolderOpen" className="text-primary" size={18} />
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
                                {topic.games.map((game, gIndex) => (
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
            <p>© 2024 Образовательная платформа</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Помощь</a>
              <a href="#" className="hover:text-foreground transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={selectedGame !== null} onOpenChange={(open) => !open && closeGame()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                        <span>Всего вопросов: {totalQuestions}</span>
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

          {selectedGame && gameStarted && !gameCompleted && (
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
                <Progress value={(currentQuestion / totalQuestions) * 100} className="h-2" />

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-sm">
                        Текущий счёт: {score}/{currentQuestion - 1}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-6">
                      {selectedGame.game.type === 'quiz' && 'Сколько будет 5 + 3?'}
                      {selectedGame.game.type === 'match' && 'Соедините число с правильным количеством предметов'}
                      {selectedGame.game.type === 'practice' && 'Решите пример: 7 + 2 = ?'}
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((option) => (
                        <Button
                          key={option}
                          variant="outline"
                          size="lg"
                          className="h-16 text-lg hover:bg-primary hover:text-white transition-colors"
                          onClick={() => handleAnswer(option === 2)}
                        >
                          Вариант {option}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

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
                      {Math.round((score / totalQuestions) * 100)}%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {score >= totalQuestions * 0.8 ? 'Отлично!' : score >= totalQuestions * 0.6 ? 'Хорошо!' : 'Попробуйте ещё раз!'}
                  </h3>
                  <p className="text-muted-foreground">
                    Правильных ответов: {score} из {totalQuestions}
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
                          {Math.round((score / totalQuestions) * 100)}%
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