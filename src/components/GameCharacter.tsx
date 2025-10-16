import { useEffect, useState } from 'react';
import Icon from './ui/icon';
import AnimatedCharacter from './AnimatedCharacter';

interface GameCharacterProps {
  type: 'ant' | 'turtle';
  correctAnswers: number;
  totalAnswers: number;
  showAnimation?: 'grow' | 'shrink' | null;
}

export default function GameCharacter({ type, correctAnswers, totalAnswers, showAnimation }: GameCharacterProps) {
  const [animationClass, setAnimationClass] = useState('');
  const [characterAnimation, setCharacterAnimation] = useState<'idle' | 'happy' | 'thinking'>('idle');

  useEffect(() => {
    if (showAnimation === 'grow') {
      setAnimationClass('grow-animation bounce-animation');
      setCharacterAnimation('happy');
      setTimeout(() => {
        setAnimationClass('');
        setCharacterAnimation('thinking');
      }, 600);
    } else if (showAnimation === 'shrink') {
      setAnimationClass('shrink-animation wiggle-animation');
      setTimeout(() => setAnimationClass(''), 600);
    }
  }, [showAnimation]);

  useEffect(() => {
    const progress = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
    if (progress === 100) {
      setCharacterAnimation('happy');
    } else if (progress > 0) {
      setCharacterAnimation('thinking');
    } else {
      setCharacterAnimation('idle');
    }
  }, [correctAnswers, totalAnswers]);

  const flowerHeight = Math.min(100, (correctAnswers / Math.max(totalAnswers, 1)) * 100);
  const stemHeight = Math.max(20, flowerHeight);

  const getFlowerEmoji = () => {
    if (flowerHeight >= 100) return '🌺';
    if (flowerHeight >= 75) return '🌸';
    if (flowerHeight >= 50) return '🌼';
    if (flowerHeight >= 25) return '🌱';
    return '🌰';
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-gradient-to-b from-sky-100 to-green-50 rounded-xl border-2 border-green-200 shadow-lg">
      {type === 'ant' && (
        <div className="flex flex-col items-center">
          <div className="transform -scale-x-100">
            <AnimatedCharacter type="ant" animation={characterAnimation} size={60} />
          </div>
          <p className="text-xs font-semibold text-green-800 mt-1">Муравьишка</p>
        </div>
      )}
      
      {type === 'turtle' && (
        <div className="flex flex-col items-center">
          <AnimatedCharacter type="turtle" animation={characterAnimation} size={60} />
          <p className="text-xs font-semibold text-green-800 mt-1">Черепаха</p>
        </div>
      )}

      <div className="relative w-24 h-32 flex items-end justify-center">
        <div className="absolute bottom-0 w-full">
          <div 
            className="w-1 bg-green-600 mx-auto transition-all duration-500"
            style={{ height: `${stemHeight}px` }}
          />
          
          <div 
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-500 ${animationClass}`}
            style={{ bottom: `${stemHeight - 10}px` }}
          >
            <div className="text-4xl">{getFlowerEmoji()}</div>
          </div>

          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i}
                className="w-2 h-3 bg-green-400 rounded-full"
                style={{ 
                  opacity: i < Math.floor(correctAnswers / 3) ? 1 : 0.2,
                  transition: 'opacity 0.3s'
                }}
              />
            ))}
          </div>
        </div>

        <div className="absolute -bottom-2 w-full h-3 bg-gradient-to-t from-green-600 to-transparent rounded-full" />
      </div>

      <div className="text-center">
        <p className="text-sm font-bold text-green-700">
          {correctAnswers}/{totalAnswers}
        </p>
        <p className="text-xs text-green-600">правильных</p>
      </div>

      {correctAnswers > 0 && correctAnswers === totalAnswers && (
        <div className="flex items-center gap-1 text-yellow-500 animate-bounce">
          <Icon name="Star" size={16} fill="currentColor" />
          <span className="text-xs font-bold">Отлично!</span>
          <Icon name="Star" size={16} fill="currentColor" />
        </div>
      )}
    </div>
  );
}