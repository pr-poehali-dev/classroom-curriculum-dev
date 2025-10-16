import { useEffect, useState } from 'react';
import AnimatedCharacter from './AnimatedCharacter';

interface FlowerProgressProps {
  correctAnswers: number;
  totalQuestions: number;
  size?: number;
}

export default function FlowerProgress({ 
  correctAnswers, 
  totalQuestions,
  size = 300 
}: FlowerProgressProps) {
  const [growthStage, setGrowthStage] = useState(0);
  const percentage = (correctAnswers / totalQuestions) * 100;

  useEffect(() => {
    if (percentage <= 20) setGrowthStage(0);
    else if (percentage <= 40) setGrowthStage(1);
    else if (percentage <= 60) setGrowthStage(2);
    else if (percentage <= 80) setGrowthStage(3);
    else setGrowthStage(4);
  }, [percentage]);

  return (
    <div className="relative flex items-end justify-center" style={{ height: size }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <AnimatedCharacter 
          type="ant" 
          animation={percentage >= 80 ? 'celebrating' : percentage >= 60 ? 'happy' : 'idle'}
          size={size * 0.4}
        />
      </div>

      <svg
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0 transition-all duration-1000"
        style={{ width: size * 0.6, height: size }}
      >
        <defs>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7cb342" />
            <stop offset="100%" stopColor="#558b2f" />
          </linearGradient>
          <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b9d" />
            <stop offset="50%" stopColor="#ff8fab" />
            <stop offset="100%" stopColor="#ffa4ba" />
          </linearGradient>
          <radialGradient id="centerGrad">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#ffab00" />
          </radialGradient>
        </defs>

        <g className="transition-all duration-1000" style={{ 
          opacity: growthStage >= 0 ? 1 : 0,
          transform: `scale(${Math.min(growthStage / 4 + 0.5, 1)})`
        }}>
          <path
            d="M 100 280 Q 98 200 100 140"
            stroke="url(#stemGrad)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            className="transition-all duration-1000"
            style={{
              strokeDasharray: 140,
              strokeDashoffset: growthStage >= 1 ? 0 : 140
            }}
          />
          
          <ellipse 
            cx="85" 
            cy="190" 
            rx="12" 
            ry="8" 
            fill="#7cb342"
            className="transition-all duration-500"
            style={{
              opacity: growthStage >= 2 ? 1 : 0,
              transform: `scale(${growthStage >= 2 ? 1 : 0})`
            }}
          />
          <ellipse 
            cx="115" 
            cy="210" 
            rx="12" 
            ry="8" 
            fill="#7cb342"
            className="transition-all duration-500"
            style={{
              opacity: growthStage >= 2 ? 1 : 0,
              transform: `scale(${growthStage >= 2 ? 1 : 0})`
            }}
          />
        </g>

        <g className="transition-all duration-1000" style={{ 
          transformOrigin: '100px 140px',
          opacity: growthStage >= 3 ? 1 : 0,
          transform: `scale(${growthStage >= 3 ? 1 : 0})`
        }}>
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx="25"
              ry="35"
              fill="url(#petalGrad)"
              className="transition-all duration-500"
              style={{
                transformOrigin: '100px 140px',
                transform: `rotate(${angle}deg)`,
                opacity: growthStage >= 4 ? 1 : 0.3,
                transitionDelay: `${i * 100}ms`
              }}
            />
          ))}
          
          <circle 
            cx="100" 
            cy="140" 
            r="20" 
            fill="url(#centerGrad)"
            className="transition-all duration-500"
            style={{
              opacity: growthStage >= 4 ? 1 : 0,
              transform: `scale(${growthStage >= 4 ? 1 : 0})`
            }}
          />
          
          {growthStage >= 4 && (
            <>
              <circle cx="95" cy="135" r="3" fill="#ff6b00" opacity="0.6" />
              <circle cx="105" cy="138" r="3" fill="#ff6b00" opacity="0.6" />
              <circle cx="100" cy="145" r="3" fill="#ff6b00" opacity="0.6" />
            </>
          )}
        </g>
      </svg>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
        <div className="text-4xl font-bold text-green-600">
          {correctAnswers}/{totalQuestions}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {percentage >= 80 ? '🌟 Отлично!' : 
           percentage >= 60 ? '😊 Хорошо!' :
           percentage >= 40 ? '👍 Неплохо' :
           percentage >= 20 ? '💪 Старайся' : '🌱 Начало'}
        </div>
      </div>
    </div>
  );
}
