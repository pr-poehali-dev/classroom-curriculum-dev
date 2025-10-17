import { useState } from 'react';
import AnimatedCharacter from '@/components/AnimatedCharacter';
import EditableContent from '@/components/EditableContent';
import { useEditMode } from '@/components/EditModeContext';

interface HeroCharacterProps {
  type: 'ant' | 'turtle';
  message: string;
  onMessageChange: (value: string) => void;
  size?: number;
  mirrored?: boolean;
}

const motivationalPhrases = {
  ant: [
    '💡 Привет! Я Муравьишка Вопросик. Люблю задавать вопросы и узнавать новое!',
    '🌟 Давай вместе откроем тайны природы!',
    '🚀 Готов к новым открытиям? Поехали!',
    '🎯 Каждый вопрос - это шаг к знаниям!',
    '⚡ Любопытство - мой главный компас!',
    '🌈 В природе столько интересного!'
  ],
  turtle: [
    '🎓 Здравствуй! Я Мудрая Черепаха. Помогу тебе учиться терпеливо!',
    '📚 Знания приходят к тем, кто упорен!',
    '🌟 Главное - не спешить и всё понять!',
    '💎 Мудрость накапливается постепенно!',
    '🕰️ Терпение и труд всё перетрут!',
    '🌱 Учись медленно, но верно!'
  ]
};

export default function HeroCharacter({ 
  type, 
  message, 
  onMessageChange, 
  size = 160,
  mirrored = false 
}: HeroCharacterProps) {
  const { isEditMode } = useEditMode();
  const [isHovered, setIsHovered] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(message);
  const [phraseTimeout, setPhraseTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (phraseTimeout) {
      clearTimeout(phraseTimeout);
    }

    const phrases = motivationalPhrases[type];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setCurrentPhrase(randomPhrase);

    const timeout = setTimeout(() => {
      setCurrentPhrase(message);
    }, 5000);
    setPhraseTimeout(timeout);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (phraseTimeout) {
      clearTimeout(phraseTimeout);
      setPhraseTimeout(null);
    }
    setTimeout(() => {
      setCurrentPhrase(message);
    }, 500);
  };

  const textColor = type === 'ant' ? 'text-green-700' : 'text-blue-700';
  const bgColor = type === 'ant' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200';

  return (
    <div 
      className={`hidden md:block group relative ${mirrored ? 'transform scale-x-[-1]' : ''}`}
      title={type === 'ant' ? 'Муравьишка Вопросик' : 'Мудрая Черепаха'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatedCharacter 
        type={type} 
        animation={isHovered ? 'happy' : 'idle'} 
        size={size} 
      />
      
      <div 
        className={`absolute -top-20 left-1/2 -translate-x-1/2 ${bgColor} shadow-xl rounded-xl px-5 py-3 transition-all duration-300 whitespace-nowrap pointer-events-none z-10 border-2 ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } ${mirrored ? 'scale-x-[-1]' : ''}`}
      >
        {isEditMode ? (
          <EditableContent
            initialValue={message}
            onSave={onMessageChange}
            as="p"
            className={`text-sm font-medium ${textColor}`}
          />
        ) : (
          <p className={`text-sm font-medium ${textColor} max-w-xs`}>
            {currentPhrase}
          </p>
        )}
        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 ${bgColor.split(' ')[0]} border-r-2 border-b-2 ${bgColor.split(' ')[1]} rotate-45`} />
      </div>
    </div>
  );
}
