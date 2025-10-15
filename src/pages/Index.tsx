import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
    </div>
  );
}