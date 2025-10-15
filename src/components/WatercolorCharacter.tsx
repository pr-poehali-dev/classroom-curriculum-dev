import { useState } from 'react';

interface WatercolorCharacterProps {
  type: 'ant' | 'turtle';
  size?: number;
}

const motivationalPhrases = {
  ant: [
    'Давай учиться вместе! 🌿',
    'Каждый день — новое открытие!',
    'Ты справишься, я верю в тебя! 🐜',
    'Природа полна чудес — изучай их!',
    'Вперёд к знаниям!'
  ],
  turtle: [
    'Не спеши, главное — понять! 🐢',
    'Мудрость приходит с опытом',
    'Шаг за шагом к успеху!',
    'Терпение и труд всё перетрут',
    'Учиться никогда не поздно! 🌸'
  ]
};

export default function WatercolorCharacter({ type, size = 200 }: WatercolorCharacterProps) {
  const [showPhrase, setShowPhrase] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState('');

  const handleMouseEnter = () => {
    const phrases = motivationalPhrases[type];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setCurrentPhrase(randomPhrase);
    setShowPhrase(true);
  };

  const handleMouseLeave = () => {
    setShowPhrase(false);
  };

  if (type === 'ant') {
    return (
      <div 
        className="relative cursor-pointer transition-transform hover:scale-110"
        style={{ width: size, height: size }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showPhrase && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg border-2 border-orange-300 whitespace-nowrap z-10 animate-in fade-in slide-in-from-bottom-4">
            <p className="text-sm font-medium text-orange-800">{currentPhrase}</p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-orange-300 rotate-45" />
          </div>
        )}
        
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xl"
        >
          <defs>
            <filter id="watercolor">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
              <feGaussianBlur stdDeviation="1" />
            </filter>
          </defs>

          {/* Тело (профиль) */}
          <ellipse cx="100" cy="100" rx="30" ry="35" fill="#ff7043" opacity="0.9" filter="url(#watercolor)" />
          <ellipse cx="105" cy="95" rx="12" ry="15" fill="#ffccbc" opacity="0.6" />
          
          {/* Голова в профиль */}
          <ellipse cx="120" cy="70" rx="22" ry="25" fill="#ff8a65" opacity="0.9" filter="url(#watercolor)" />
          <ellipse cx="125" cy="65" rx="10" ry="12" fill="#ffccbc" opacity="0.5" />
          
          {/* Глаз (один, профиль) */}
          <circle cx="130" cy="68" r="8" fill="white" opacity="0.95" />
          <circle cx="132" cy="70" r="5" fill="#3e2723" />
          <circle cx="133" cy="68" r="2" fill="white" />
          
          {/* Усик */}
          <path
            d="M 125 60 Q 130 45 135 35 Q 137 30 140 25"
            stroke="#d84315"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
            filter="url(#watercolor)"
          />
          <circle cx="140" cy="25" r="4" fill="#ff6f00" opacity="0.8" />
          
          {/* Ноги */}
          <path d="M 95 120 L 85 145" stroke="#ff5722" strokeWidth="4" opacity="0.8" filter="url(#watercolor)" />
          <path d="M 100 125 L 95 150" stroke="#ff5722" strokeWidth="4" opacity="0.8" filter="url(#watercolor)" />
          <path d="M 105 125 L 105 150" stroke="#ff5722" strokeWidth="4" opacity="0.8" filter="url(#watercolor)" />
          
          {/* Рука с цветком */}
          <path d="M 125 90 Q 145 95 155 90" stroke="#ff5722" strokeWidth="5" opacity="0.8" filter="url(#watercolor)" />
          
          {/* Цветок */}
          <g transform="translate(155, 85)">
            <circle cx="0" cy="0" r="3" fill="#ffd54f" opacity="0.9" />
            <circle cx="-4" cy="-3" r="4" fill="#ec407a" opacity="0.8" filter="url(#watercolor)" />
            <circle cx="4" cy="-3" r="4" fill="#ec407a" opacity="0.8" filter="url(#watercolor)" />
            <circle cx="-3" cy="3" r="4" fill="#ab47bc" opacity="0.8" filter="url(#watercolor)" />
            <circle cx="3" cy="3" r="4" fill="#ab47bc" opacity="0.8" filter="url(#watercolor)" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div 
      className="relative cursor-pointer transition-transform hover:scale-110"
      style={{ width: size, height: size }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showPhrase && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg border-2 border-green-400 whitespace-nowrap z-10 animate-in fade-in slide-in-from-bottom-4">
          <p className="text-sm font-medium text-green-800">{currentPhrase}</p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-green-400 rotate-45" />
        </div>
      )}
      
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          <filter id="watercolor2">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>

        {/* Панцирь (профиль) */}
        <ellipse cx="90" cy="105" rx="45" ry="40" fill="#a1887f" opacity="0.9" filter="url(#watercolor2)" />
        
        {/* Узор на панцире */}
        <path
          d="M 70 95 Q 75 100 75 105 Q 75 110 70 115"
          stroke="#6d4c41"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 85 90 Q 90 95 90 105 Q 90 115 85 120"
          stroke="#6d4c41"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
        
        {/* Голова в профиль */}
        <ellipse cx="125" cy="85" rx="20" ry="22" fill="#9ccc65" opacity="0.9" filter="url(#watercolor2)" />
        <ellipse cx="130" cy="82" rx="8" ry="10" fill="#dcedc8" opacity="0.6" />
        
        {/* Шляпка */}
        <ellipse cx="125" cy="70" rx="18" ry="6" fill="#ffeb3b" opacity="0.9" filter="url(#watercolor2)" />
        <path d="M 110 70 L 125 58 L 140 70" fill="#fdd835" opacity="0.9" filter="url(#watercolor2)" />
        
        {/* Платок */}
        <path
          d="M 120 90 Q 125 87 130 90 L 135 95 Q 130 92 125 92 Q 120 92 115 95 Z"
          fill="#42a5f5"
          opacity="0.85"
          filter="url(#watercolor2)"
        />
        
        {/* Глаз */}
        <circle cx="132" cy="83" r="6" fill="white" opacity="0.95" />
        <circle cx="133" cy="85" r="4" fill="#2e7d32" />
        <circle cx="134" cy="83" r="1.5" fill="white" />
        
        {/* Улыбка */}
        <path
          d="M 128 92 Q 132 94 136 92"
          stroke="#2e7d32"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        
        {/* Ноги */}
        <ellipse cx="65" cy="130" rx="10" ry="20" fill="#7cb342" opacity="0.85" filter="url(#watercolor2)" />
        <ellipse cx="85" cy="135" rx="10" ry="18" fill="#7cb342" opacity="0.85" filter="url(#watercolor2)" />
        
        {/* Рука с цветком */}
        <ellipse cx="140" cy="100" rx="8" ry="18" fill="#7cb342" opacity="0.85" filter="url(#watercolor2)" transform="rotate(-30 140 100)" />
        
        {/* Цветок */}
        <g transform="translate(150, 95)">
          <circle cx="0" cy="0" r="3" fill="#ffd54f" opacity="0.9" />
          <circle cx="-4" cy="-3" r="5" fill="#f48fb1" opacity="0.8" filter="url(#watercolor2)" />
          <circle cx="4" cy="-3" r="5" fill="#f48fb1" opacity="0.8" filter="url(#watercolor2)" />
          <circle cx="-3" cy="4" r="5" fill="#ce93d8" opacity="0.8" filter="url(#watercolor2)" />
          <circle cx="3" cy="4" r="5" fill="#ce93d8" opacity="0.8" filter="url(#watercolor2)" />
          <path d="M 0 3 L 0 12" stroke="#558b2f" strokeWidth="2" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
