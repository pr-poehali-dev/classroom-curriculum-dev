import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import FlowerProgress from '@/components/FlowerProgress';
import { useNavigate } from 'react-router-dom';

export interface MatchPair {
  left: string;
  right: string;
  explanation?: string;
}

interface MatchGameProps {
  title: string;
  pairs: MatchPair[];
}

export default function MatchGame({ title, pairs }: MatchGameProps) {
  const [leftItems, setLeftItems] = useState<string[]>([]);
  const [rightItems, setRightItems] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matches, setMatches] = useState<Set<number>>(new Set());
  const [correctMatches, setCorrectMatches] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLeftItems(pairs.map(p => p.left));
    setRightItems([...pairs.map(p => p.right)].sort(() => Math.random() - 0.5));
  }, [pairs]);

  const handleLeftClick = (index: number) => {
    if (matches.has(index)) return;
    setSelectedLeft(index);
  };

  const handleRightClick = (index: number) => {
    if (matches.has(index)) return;
    setSelectedRight(index);
    
    if (selectedLeft !== null) {
      checkMatch(selectedLeft, index);
    }
  };

  const checkMatch = (leftIndex: number, rightIndex: number) => {
    const leftValue = leftItems[leftIndex];
    const rightValue = rightItems[rightIndex];
    
    const isCorrect = pairs.some(
      pair => pair.left === leftValue && pair.right === rightValue
    );

    if (isCorrect) {
      const newMatches = new Set(matches);
      newMatches.add(leftIndex);
      newMatches.add(rightIndex);
      setMatches(newMatches);
      setCorrectMatches(prev => prev + 1);
      
      if (newMatches.size === pairs.length * 2) {
        setTimeout(() => setGameFinished(true), 1000);
      }
    }

    setTimeout(() => {
      setSelectedLeft(null);
      setSelectedRight(null);
    }, 500);
  };

  const handleRestart = () => {
    setLeftItems(pairs.map(p => p.left));
    setRightItems([...pairs.map(p => p.right)].sort(() => Math.random() - 0.5));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatches(new Set());
    setCorrectMatches(0);
    setGameFinished(false);
  };

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
                correctAnswers={correctMatches} 
                totalQuestions={pairs.length}
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <Button onClick={() => navigate('/learn')} variant="outline" className="gap-2">
              <Icon name="ArrowLeft" size={18} />
              Назад
            </Button>
            <div className="text-sm font-medium text-green-700">
              Найдено: {correctMatches} из {pairs.length}
            </div>
          </div>

          <Card className="watercolor-card border-2 border-green-200">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">
                {title}
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Соедини пары: нажми на элемент слева, затем на подходящий справа
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  {leftItems.map((item, index) => {
                    const isMatched = matches.has(index);
                    const isSelected = selectedLeft === index;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleLeftClick(index)}
                        disabled={isMatched}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          isMatched
                            ? 'border-green-500 bg-green-100 opacity-50'
                            : isSelected
                            ? 'border-blue-500 bg-blue-100 scale-105'
                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  {rightItems.map((item, index) => {
                    const isMatched = matches.has(index);
                    const isSelected = selectedRight === index;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleRightClick(index)}
                        disabled={isMatched}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          isMatched
                            ? 'border-green-500 bg-green-100 opacity-50'
                            : isSelected
                            ? 'border-blue-500 bg-blue-100 scale-105'
                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
