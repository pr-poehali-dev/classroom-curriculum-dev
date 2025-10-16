import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import FlowerProgress from '@/components/FlowerProgress';
import MediaEmbed from '@/components/MediaEmbed';
import GameCharacter from '@/components/GameCharacter';
import { useNavigate } from 'react-router-dom';
import { useSound } from '@/hooks/useSound';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  videoUrl?: string;
  gifUrl?: string;
}

interface QuizGameProps {
  title: string;
  questions: QuizQuestion[];
}

export default function QuizGame({ title, questions }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [showAnimation, setShowAnimation] = useState<'grow' | 'shrink' | null>(null);
  const navigate = useNavigate();
  const { playCorrectSound, playWrongSound, preloadSounds } = useSound();

  useEffect(() => {
    preloadSounds();
  }, [preloadSounds]);

  const question = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (index === question.correctAnswer) {
      setCorrectCount(prev => prev + 1);
      playCorrectSound();
      setShowAnimation('grow');
      setTimeout(() => setShowAnimation(null), 600);
    } else {
      playWrongSound();
      setShowAnimation('shrink');
      setTimeout(() => setShowAnimation(null), 600);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setShowExplanation(false);
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
                correctAnswers={correctCount} 
                totalQuestions={questions.length}
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
              Вопрос {currentQuestion + 1} из {questions.length}
            </div>
          </div>

          <Card className="watercolor-card border-2 border-green-200">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">
                {title}
              </h2>

              {question.videoUrl && (
                <div className="mb-6">
                  <MediaEmbed type="video" initialUrl={question.videoUrl} />
                </div>
              )}

              {question.gifUrl && (
                <div className="mb-6">
                  <MediaEmbed type="gif" initialUrl={question.gifUrl} />
                </div>
              )}

              <div className="mb-6">
                <p className="text-xl text-gray-800 font-medium">
                  {question.question}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === question.correctAnswer;
                  const showResult = selectedAnswer !== null;

                  let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all';
                  
                  if (!showResult) {
                    buttonClass += ' border-gray-300 hover:border-green-400 hover:bg-green-50';
                  } else if (isCorrect) {
                    buttonClass += ' border-green-500 bg-green-100';
                  } else if (isSelected && !isCorrect) {
                    buttonClass += ' border-red-500 bg-red-100';
                  } else {
                    buttonClass += ' border-gray-300 opacity-50';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={buttonClass}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showResult && isCorrect && (
                          <Icon name="Check" className="text-green-600" size={24} />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <Icon name="X" className="text-red-600" size={24} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showExplanation && question.explanation && (
                <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Icon name="Info" className="text-blue-600 mt-1" size={20} />
                    <p className="text-blue-900">{question.explanation}</p>
                  </div>
                </div>
              )}

              {selectedAnswer !== null && (
                <Button onClick={handleNext} className="w-full gap-2">
                  {currentQuestion < questions.length - 1 ? (
                    <>Следующий вопрос <Icon name="ArrowRight" size={18} /></>
                  ) : (
                    <>Завершить <Icon name="Check" size={18} /></>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
          
          <div className="fixed bottom-4 right-4">
            <GameCharacter 
              type="ant"
              correctAnswers={correctCount}
              totalAnswers={currentQuestion + 1}
              showAnimation={showAnimation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}