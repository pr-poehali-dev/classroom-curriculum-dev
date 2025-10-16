import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { curriculum, Module } from '@/data/curriculum';

export default function LearningHub() {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const navigate = useNavigate();

  const modules = curriculum.filter(m => m.grade === selectedGrade);
  const availableGrades = [...new Set(curriculum.map(m => m.grade))].sort();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-800">Выберите класс:</h2>
          <div className="flex gap-3">
            {availableGrades.map(grade => (
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
          {modules.map((module: Module) => (
            <Card key={module.id} className="watercolor-card border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-2xl text-green-800 flex items-center gap-3">
                  <Icon name="BookOpen" size={28} />
                  {module.title}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {module.grade} класс, часть {module.part} • {module.topics.length} тем
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {module.topics.map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => navigate(`/game/${topic.id}`)}
                      className="p-4 rounded-lg border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all text-left group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 group-hover:text-green-700 mb-1">
                            {topic.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            {topic.gameType === 'quiz' && <><Icon name="HelpCircle" size={14} /> Викторина</>}
                            {topic.gameType === 'match' && <><Icon name="Link" size={14} /> Соответствия</>}
                            {topic.gameType === 'sort' && <><Icon name="ListFilter" size={14} /> Сортировка</>}
                            {topic.gameType === 'memory' && <><Icon name="Brain" size={14} /> Память</>}
                            {topic.gameType === 'puzzle' && <><Icon name="Puzzle" size={14} /> Пазл</>}
                          </div>
                        </div>
                        <Icon name="PlayCircle" size={20} className="text-green-600 group-hover:scale-110 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>

                {(module.projectTasks || module.curiosities) && (
                  <div className="mt-6 pt-6 border-t border-green-200">
                    <div className="grid md:grid-cols-2 gap-4">
                      {module.projectTasks && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name="Lightbulb" size={18} className="text-blue-600" />
                            <h4 className="font-bold text-blue-800">Проекты</h4>
                          </div>
                          <ul className="space-y-1 text-sm text-blue-700">
                            {module.projectTasks.map((task, i) => (
                              <li key={i}>• {task}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {module.curiosities && (
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name="Sparkles" size={18} className="text-purple-600" />
                            <h4 className="font-bold text-purple-800">Любознательным</h4>
                          </div>
                          <ul className="space-y-1 text-sm text-purple-700">
                            {module.curiosities.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
