import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import FlowerProgress from '@/components/FlowerProgress';
import { useNavigate } from 'react-router-dom';

export interface MemoryCard {
  id: string;
  content: string;
  emoji?: string;
}

interface MemoryGameProps {
  title: string;
  cards: MemoryCard[];
}

interface GameCard extends MemoryCard {
  position: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame({ title, cards }: MemoryGameProps) {
  const [gameCards, setGameCards] = useState<GameCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    initializeGame();
  }, [cards]);

  const initializeGame = () => {
    const duplicatedCards = [...cards, ...cards];
    const shuffled = duplicatedCards
      .map((card, index) => ({
        ...card,
        position: index,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);
    
    setGameCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairs(0);
    setGameFinished(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2) return;
    if (gameCards[index].isFlipped || gameCards[index].isMatched) return;
    if (flippedIndices.includes(index)) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    const newCards = [...gameCards];
    newCards[index].isFlipped = true;
    setGameCards(newCards);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const card1 = gameCards[first];
      const card2 = gameCards[second];

      if (card1.id === card2.id) {
        setTimeout(() => {
          const updatedCards = [...gameCards];
          updatedCards[first].isMatched = true;
          updatedCards[second].isMatched = true;
          setGameCards(updatedCards);
          setFlippedIndices([]);
          
          const newMatchedPairs = matchedPairs + 1;
          setMatchedPairs(newMatchedPairs);
          
          if (newMatchedPairs === cards.length) {
            setTimeout(() => setGameFinished(true), 500);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const updatedCards = [...gameCards];
          updatedCards[first].isFlipped = false;
          updatedCards[second].isFlipped = false;
          setGameCards(updatedCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
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
                correctAnswers={matchedPairs} 
                totalQuestions={cards.length}
                size={400}
              />
              
              <div className="flex gap-4 justify-center mt-8">
                <Button onClick={initializeGame} className="gap-2">
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
              Найдено пар: {matchedPairs} из {cards.length}
            </div>
          </div>

          <Card className="watercolor-card border-2 border-green-200">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4 text-green-800 text-center">
                {title}
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Найди все пары одинаковых карточек
              </p>

              <div className={`grid gap-4 ${gameCards.length <= 12 ? 'grid-cols-4' : 'grid-cols-6'}`}>
                {gameCards.map((card, index) => (
                  <button
                    key={index}
                    onClick={() => handleCardClick(index)}
                    disabled={card.isMatched}
                    className="aspect-square"
                  >
                    <div className={`w-full h-full rounded-lg border-2 transition-all duration-300 transform ${
                      card.isFlipped || card.isMatched
                        ? 'bg-white border-green-500 scale-105'
                        : 'bg-gradient-to-br from-green-400 to-green-600 border-green-700 hover:scale-105'
                    } ${card.isMatched ? 'opacity-50' : ''}`}>
                      <div className="w-full h-full flex items-center justify-center p-2">
                        {card.isFlipped || card.isMatched ? (
                          <div className="text-center">
                            {card.emoji && <div className="text-3xl mb-1">{card.emoji}</div>}
                            <div className="text-xs font-medium break-words">{card.content}</div>
                          </div>
                        ) : (
                          <Icon name="HelpCircle" size={32} className="text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
