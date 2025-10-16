import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import FlowerProgress from '@/components/FlowerProgress';
import { useNavigate } from 'react-router-dom';

export interface PuzzlePiece {
  id: string;
  content: string;
  correctPosition: number;
}

interface PuzzleGameProps {
  title: string;
  pieces: PuzzlePiece[];
  description?: string;
}

export default function PuzzleGame({ title, pieces, description }: PuzzleGameProps) {
  const [currentPieces, setCurrentPieces] = useState(() => 
    [...pieces].sort(() => Math.random() - 0.5)
  );
  const [gameFinished, setGameFinished] = useState(false);
  const navigate = useNavigate();

  const checkSolution = () => {
    const isCorrect = currentPieces.every(
      (piece, index) => piece.correctPosition === index
    );
    
    if (isCorrect) {
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentPieces([...pieces].sort(() => Math.random() - 0.5));
    setGameFinished(false);
  };

  const movePiece = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= currentPieces.length) return;

    const newPieces = [...currentPieces];
    [newPieces[index], newPieces[newIndex]] = [newPieces[newIndex], newPieces[index]];
    setCurrentPieces(newPieces);
  };

  const correctCount = currentPieces.filter(
    (piece, index) => piece.correctPosition === index
  ).length;

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <h2 className="text-3xl font-bold text-center mb-6 text-green-800">
                {title} - Результаты
              </h2>
              
              <FlowerProgress 
                correctAnswers={pieces.length} 
                totalQuestions={pieces.length}
                size={400}
              />
              
              <div className="flex gap-4 justify-center mt-8">
                <Button onClick={handleRestart} className="gap-2">
                  <Icon name="RotateCcw" size={18} />
                  Пройти ещё раз
                </Button>
                <Button onClick={() => navigate('/learn')} variant="outline" className="gap-2">
                  <Icon name="ArrowLeft" size={18} />
                  К темам
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <Button onClick={() => navigate('/learn')} variant="outline" className="gap-2">
              <Icon name="ArrowLeft" size={18} />
              Назад
            </Button>
            <div className="text-sm font-medium text-green-700">
              Верно: {correctCount} из {pieces.length}
            </div>
          </div>

          <Card className="watercolor-card border-2 border-green-200">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4 text-green-800 text-center">
                {title}
              </h2>
              {description && (
                <p className="text-center text-gray-600 mb-6">
                  {description}
                </p>
              )}

              <div className="space-y-3 mb-6">
                {currentPieces.map((piece, index) => {
                  const isCorrect = piece.correctPosition === index;
                  
                  return (
                    <div
                      key={piece.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isCorrect
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => movePiece(index, 'up')}
                            disabled={index === 0}
                            className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Icon name="ChevronUp" size={20} />
                          </button>
                          <button
                            onClick={() => movePiece(index, 'down')}
                            disabled={index === currentPieces.length - 1}
                            className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Icon name="ChevronDown" size={20} />
                          </button>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-medium text-gray-700">
                              {index + 1}.
                            </span>
                            <span className="text-gray-800">{piece.content}</span>
                          </div>
                        </div>

                        {isCorrect && (
                          <Icon name="Check" className="text-green-600" size={24} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button onClick={checkSolution} className="w-full gap-2">
                <Icon name="Check" size={18} />
                Проверить порядок
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
