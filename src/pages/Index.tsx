import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Topic {
  title: string;
  description?: string;
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
              { title: 'Счёт от 1 до 10', description: 'Знакомство с цифрами' },
              { title: 'Сравнение чисел', description: 'Больше, меньше, равно' },
              { title: 'Сложение в пределах 10' }
            ]
          },
          {
            id: 'm1-2',
            name: 'Геометрия',
            topics: [
              { title: 'Фигуры: круг, квадрат, треугольник' },
              { title: 'Цвета и формы' }
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
              { title: 'Вычитание в пределах 10' },
              { title: 'Решение задач' }
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
              { title: 'Счёт десятками' },
              { title: 'Сложение и вычитание двузначных чисел' },
              { title: 'Таблица умножения на 2' }
            ]
          },
          {
            id: 'm2-2',
            name: 'Единицы измерения',
            topics: [
              { title: 'Сантиметр и метр' },
              { title: 'Час и минута' }
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
              { title: 'Таблица умножения' },
              { title: 'Деление с остатком' },
              { title: 'Порядок действий' }
            ]
          },
          {
            id: 'm3-2',
            name: 'Доли и дроби',
            topics: [
              { title: 'Половина, треть, четверть' },
              { title: 'Сравнение долей' }
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
              { title: 'Числа до 1000000' },
              { title: 'Сложение и вычитание' },
              { title: 'Умножение на однозначное число' }
            ]
          },
          {
            id: 'm4-2',
            name: 'Уравнения',
            topics: [
              { title: 'Решение простых уравнений' },
              { title: 'Буквенные выражения' }
            ]
          }
        ]
      }
    ]
  }
];

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
                                <p className="text-sm text-muted-foreground">
                                  {topic.description}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity no-print"
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
