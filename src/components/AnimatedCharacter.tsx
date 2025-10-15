import { useEffect, useState } from 'react';

interface AnimatedCharacterProps {
  type: 'ant' | 'turtle';
  animation?: 'idle' | 'happy' | 'thinking' | 'celebrating';
  size?: number;
}

export default function AnimatedCharacter({ 
  type, 
  animation = 'idle',
  size = 200 
}: AnimatedCharacterProps) {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (animation === 'happy' || animation === 'celebrating') {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [animation]);

  if (type === 'ant') {
    return (
      <div 
        className={`relative transition-transform duration-500 ${bounce ? 'animate-bounce' : ''}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 200 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="antBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff6b4a" />
              <stop offset="50%" stopColor="#ff8c42" />
              <stop offset="100%" stopColor="#d4522a" />
            </linearGradient>
            <radialGradient id="antShine">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Тело */}
          <ellipse cx="100" cy="80" rx="35" ry="38" fill="url(#antBodyGrad)" />
          <ellipse cx="105" cy="70" rx="15" ry="18" fill="url(#antShine)" opacity="0.4" />
          
          {/* Голова */}
          <ellipse cx="100" cy="45" rx="28" ry="30" fill="url(#antBodyGrad)" />
          <ellipse cx="108" cy="38" rx="12" ry="14" fill="url(#antShine)" opacity="0.4" />
          
          {/* Глаза */}
          <circle cx="90" cy="42" r="11" fill="white" />
          <circle cx="110" cy="42" r="11" fill="white" />
          <circle cx="92" cy="44" r="7" fill="#2d1b00" className={animation === 'thinking' ? 'animate-pulse' : ''} />
          <circle cx="112" cy="44" r="7" fill="#2d1b00" className={animation === 'thinking' ? 'animate-pulse' : ''} />
          <circle cx="94" cy="42" r="3" fill="white" />
          <circle cx="114" cy="42" r="3" fill="white" />
          
          {/* Усики с анимацией */}
          <g className={animation === 'happy' ? 'animate-wiggle' : ''}>
            <path
              d="M 85 35 Q 75 25 70 15 Q 68 10 65 8"
              stroke="#ff6b4a"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="65" cy="8" r="5" fill="#ff8c42" />
            
            <path
              d="M 115 35 Q 125 25 130 15 Q 132 10 135 8"
              stroke="#ff6b4a"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="135" cy="8" r="5" fill="#ff8c42" />
          </g>
          
          {/* Ноги */}
          <g>
            {/* Левая нога */}
            <path d="M 75 95 L 50 130 L 45 140" stroke="#ff6b4a" strokeWidth="5" fill="none" strokeLinecap="round" />
            <ellipse cx="45" cy="143" rx="8" ry="6" fill="#6b9b3d" />
            
            {/* Средняя левая нога */}
            <path d="M 85 100 L 65 135 L 60 145" stroke="#ff6b4a" strokeWidth="5" fill="none" strokeLinecap="round" />
            <ellipse cx="60" cy="148" rx="8" ry="6" fill="#6b9b3d" />
            
            {/* Правая средняя нога */}
            <path d="M 115 100 L 135 135 L 140 145" stroke="#ff6b4a" strokeWidth="5" fill="none" strokeLinecap="round" />
            <ellipse cx="140" cy="148" rx="8" ry="6" fill="#6b9b3d" />
            
            {/* Правая нога */}
            <path d="M 125 95 L 150 130 L 155 140" stroke="#ff6b4a" strokeWidth="5" fill="none" strokeLinecap="round" />
            <ellipse cx="155" cy="143" rx="8" ry="6" fill="#6b9b3d" />
          </g>
          
          {/* Руки */}
          <g className={animation === 'celebrating' ? 'animate-wave' : ''}>
            {/* Левая рука */}
            <path d="M 70 70 Q 40 80 35 95" stroke="#ff6b4a" strokeWidth="6" fill="none" strokeLinecap="round" />
            <ellipse cx="32" cy="98" rx="7" ry="9" fill="#ff8c42" />
            
            {/* Правая рука с цветком */}
            <path d="M 130 70 Q 160 75 165 85" stroke="#ff6b4a" strokeWidth="6" fill="none" strokeLinecap="round" />
            <ellipse cx="168" cy="88" rx="7" ry="9" fill="#ff8c42" />
            
            {/* Цветок в руке */}
            <g transform="translate(165, 75)">
              <circle cx="0" cy="0" r="3" fill="#ffd700" />
              <circle cx="-4" cy="-2" r="4" fill="#ff69b4" />
              <circle cx="4" cy="-2" r="4" fill="#ff69b4" />
              <circle cx="-3" cy="3" r="4" fill="#ff69b4" />
              <circle cx="3" cy="3" r="4" fill="#ff69b4" />
              <path d="M 0 3 L 0 15" stroke="#6b9b3d" strokeWidth="2" />
              <path d="M -2 8 Q -5 10 -7 8" fill="#6b9b3d" />
            </g>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div 
      className={`relative transition-transform duration-500 ${bounce ? 'animate-bounce' : ''}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="shellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d4a574" />
            <stop offset="50%" stopColor="#b8935f" />
            <stop offset="100%" stopColor="#9d7a4a" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b8d96d" />
            <stop offset="100%" stopColor="#8fb84d" />
          </linearGradient>
          <radialGradient id="shellShine">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Панцирь */}
        <ellipse cx="100" cy="100" rx="55" ry="48" fill="url(#shellGrad)" />
        
        {/* Узоры на панцире (спирали) */}
        <g opacity="0.7">
          <path
            d="M 75 85 Q 78 88 80 92 Q 82 96 82 100 Q 82 104 80 108 Q 78 112 75 115"
            stroke="#8b6f47"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 90 75 Q 95 78 98 83 Q 101 88 101 94 Q 101 100 98 106 Q 95 112 90 117"
            stroke="#8b6f47"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 110 75 Q 105 78 102 83 Q 99 88 99 94 Q 99 100 102 106 Q 105 112 110 117"
            stroke="#8b6f47"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 125 85 Q 122 88 120 92 Q 118 96 118 100 Q 118 104 120 108 Q 122 112 125 115"
            stroke="#8b6f47"
            strokeWidth="3"
            fill="none"
          />
        </g>
        
        {/* Блик на панцире */}
        <ellipse cx="110" cy="85" rx="25" ry="20" fill="url(#shellShine)" />
        
        {/* Голова */}
        <ellipse cx="100" cy="45" rx="24" ry="26" fill="url(#bodyGrad)" />
        
        {/* Шляпа */}
        <g>
          <path d="M 75 38 Q 100 25 125 38" fill="#f4d03f" />
          <ellipse cx="100" cy="38" rx="27" ry="8" fill="#e8b923" />
          <path d="M 80 38 L 100 20 L 120 38" fill="#f4d03f" />
        </g>
        
        {/* Платок */}
        <path
          d="M 85 55 Q 90 50 100 50 Q 110 50 115 55 L 120 65 Q 115 58 100 58 Q 85 58 80 65 Z"
          fill="#4a9eff"
        />
        <path
          d="M 115 55 L 125 50 L 130 60 L 120 65"
          fill="#3a7ed8"
        />
        
        {/* Глаза */}
        <ellipse cx="90" cy="48" rx="8" ry="10" fill="white" />
        <ellipse cx="110" cy="48" rx="8" ry="10" fill="white" />
        <circle cx="91" cy="50" r="5" fill="#2d1b00" className={animation === 'thinking' ? 'animate-pulse' : ''} />
        <circle cx="111" cy="50" r="5" fill="#2d1b00" className={animation === 'thinking' ? 'animate-pulse' : ''} />
        <circle cx="92" cy="48" r="2" fill="white" />
        <circle cx="112" cy="48" r="2" fill="white" />
        
        {/* Улыбка */}
        <path
          d="M 90 60 Q 100 65 110 60"
          stroke="#2d1b00"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Ноги */}
        <g>
          {/* Передняя левая */}
          <ellipse cx="70" cy="135" rx="12" ry="28" fill="url(#bodyGrad)" />
          <ellipse cx="70" cy="155" rx="14" ry="8" fill="#8fb84d" />
          
          {/* Передняя правая */}
          <ellipse cx="130" cy="135" rx="12" ry="28" fill="url(#bodyGrad)" />
          <ellipse cx="130" cy="155" rx="14" ry="8" fill="#8fb84d" />
          
          {/* Задняя левая */}
          <ellipse cx="60" cy="125" rx="10" ry="22" fill="url(#bodyGrad)" opacity="0.8" />
          <ellipse cx="60" cy="142" rx="12" ry="7" fill="#8fb84d" opacity="0.8" />
          
          {/* Задняя правая */}
          <ellipse cx="140" cy="125" rx="10" ry="22" fill="url(#bodyGrad)" opacity="0.8" />
          <ellipse cx="140" cy="142" rx="12" ry="7" fill="#8fb84d" opacity="0.8" />
        </g>
        
        {/* Цветок в лапке */}
        <g transform="translate(145, 110)" className={animation === 'celebrating' ? 'animate-spin-slow' : ''}>
          <path d="M 0 0 L 0 25" stroke="#6b9b3d" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#ffd700" />
          <circle cx="-5" cy="-3" r="5" fill="#ff1493" />
          <circle cx="5" cy="-3" r="5" fill="#ff1493" />
          <circle cx="-4" cy="4" r="5" fill="#ff1493" />
          <circle cx="4" cy="4" r="5" fill="#ff1493" />
          <circle cx="0" cy="-5" r="5" fill="#ff69b4" />
          <path d="M -8 5 Q -12 8 -10 12" fill="#6b9b3d" />
          <path d="M 8 5 Q 12 8 10 12" fill="#6b9b3d" />
        </g>
      </svg>
    </div>
  );
}
