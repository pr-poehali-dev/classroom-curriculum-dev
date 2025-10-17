import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import AnimatedCharacter from '@/components/AnimatedCharacter';

interface GameStatsProps {
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  onRestart: () => void;
  onExit: () => void;
}

export default function GameStats({ 
  correctAnswers, 
  incorrectAnswers, 
  totalQuestions, 
  timeSpent,
  onRestart,
  onExit
}: GameStatsProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto border-2 border-blue-200 shadow-xl">
          <CardContent className="pt-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 text-blue-800">
                🎉 Игра завершена!
              </h2>
              <p className="text-lg text-blue-600">
                Молодец! Вот твои результаты:
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <AnimatedCharacter 
                type="turtle" 
                animation="happy" 
                size={200} 
              />
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                    <Icon name="Check" size={24} className="text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Правильных ответов</p>
                    <p className="text-2xl font-bold text-green-700">{correctAnswers}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-700">{percentage}%</p>
                  <p className="text-xs text-gray-600">точность</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                    <Icon name="X" size={24} className="text-red-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Неправильных ответов</p>
                    <p className="text-2xl font-bold text-red-700">{incorrectAnswers}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                    <Icon name="Clock" size={24} className="text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Затраченное время</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {minutes > 0 && `${minutes} мин `}
                      {seconds} сек
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200 mb-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🐢</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-blue-800 mb-2">Мудрая Черепаха говорит:</p>
                  <p className="text-sm text-blue-700 italic">
                    {percentage === 100 
                      ? "Превосходно! Ты ответил правильно на все вопросы! Так держать!" 
                      : percentage >= 80 
                      ? "Отличный результат! Ты очень хорошо усвоил материал!" 
                      : percentage >= 60 
                      ? "Хорошо! Но есть над чем поработать. Попробуй ещё раз!" 
                      : "Не расстраивайся! Повтори тему и попробуй снова. У тебя всё получится!"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={onRestart}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                <Icon name="RotateCcw" size={18} />
                Пройти ещё раз
              </button>
              <button
                onClick={onExit}
                className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg font-medium transition-colors"
              >
                <Icon name="ArrowLeft" size={18} />
                К темам
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
