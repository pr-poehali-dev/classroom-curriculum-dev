import { useParams } from 'react-router-dom';
import { curriculum } from '@/data/curriculum';
import QuizGame from './games/QuizGame';
import MatchGame from './games/MatchGame';
import SortGame from './games/SortGame';
import MemoryGame from './games/MemoryGame';
import PuzzleGame from './games/PuzzleGame';

const sampleGames = {
  'topic-1-1': {
    type: 'quiz' as const,
    data: {
      title: 'Что такое Родина?',
      questions: [
        {
          question: 'Что мы называем Родиной?',
          options: [
            'Место, где мы родились и живём',
            'Только город Москва',
            'Любая страна мира',
            'Место, где много денег'
          ],
          correctAnswer: 0,
          explanation: 'Родина - это место, где мы родились, выросли, где живут наши близкие и друзья.'
        },
        {
          question: 'Как называется наша Родина?',
          options: ['Россия', 'Америка', 'Китай', 'Франция'],
          correctAnswer: 0,
          explanation: 'Наша Родина - Россия, самая большая страна в мире!'
        }
      ]
    }
  },
  'topic-1-2': {
    type: 'match' as const,
    data: {
      title: 'Что мы знаем о народах России?',
      pairs: [
        { left: 'Русские', right: 'Самый многочисленный народ России' },
        { left: 'Татары', right: 'Второй по численности народ' },
        { left: 'Башкиры', right: 'Живут в Башкортостане' },
        { left: 'Чеченцы', right: 'Живут в Чеченской Республике' }
      ]
    }
  },
  'topic-1-4': {
    type: 'sort' as const,
    data: {
      title: 'Что относится к природе?',
      categories: [
        {
          name: 'Живая природа',
          items: ['Дерево', 'Птица', 'Рыба', 'Цветок'],
          color: '#22c55e'
        },
        {
          name: 'Неживая природа',
          items: ['Камень', 'Вода', 'Солнце', 'Воздух'],
          color: '#3b82f6'
        },
        {
          name: 'Не природа',
          items: ['Дом', 'Машина', 'Стол', 'Книга'],
          color: '#ef4444'
        }
      ]
    }
  },
  'topic-1-10': {
    type: 'memory' as const,
    data: {
      title: 'Что это за листья?',
      cards: [
        { id: '1', content: 'Берёза', emoji: '🌳' },
        { id: '2', content: 'Дуб', emoji: '🌳' },
        { id: '3', content: 'Клён', emoji: '🍁' },
        { id: '4', content: 'Осина', emoji: '🌿' },
        { id: '5', content: 'Рябина', emoji: '🍂' },
        { id: '6', content: 'Липа', emoji: '🌳' }
      ]
    }
  },
  'topic-1-7': {
    type: 'puzzle' as const,
    data: {
      title: 'Что общего у разных растений?',
      description: 'Расставьте части растения в правильном порядке снизу вверх',
      pieces: [
        { id: '1', content: 'Корень - находится в земле, держит растение', correctPosition: 0 },
        { id: '2', content: 'Стебель - поднимается вверх, несёт листья', correctPosition: 1 },
        { id: '3', content: 'Листья - зелёные, помогают дышать', correctPosition: 2 },
        { id: '4', content: 'Цветок - яркий, из него появится плод', correctPosition: 3 },
        { id: '5', content: 'Плод - содержит семена', correctPosition: 4 }
      ]
    }
  }
};

export default function GameLoader() {
  const { topicId } = useParams<{ topicId: string }>();
  
  if (!topicId) {
    return <div className="min-h-screen flex items-center justify-center">Тема не найдена</div>;
  }

  const topic = curriculum
    .flatMap(m => m.topics)
    .find(t => t.id === topicId);

  if (!topic) {
    return <div className="min-h-screen flex items-center justify-center">Тема не найдена</div>;
  }

  const sampleGame = sampleGames[topicId as keyof typeof sampleGames];

  if (sampleGame) {
    if (sampleGame.type === 'quiz') {
      return <QuizGame {...sampleGame.data} />;
    }
    if (sampleGame.type === 'match') {
      return <MatchGame {...sampleGame.data} />;
    }
    if (sampleGame.type === 'sort') {
      return <SortGame {...sampleGame.data} />;
    }
    if (sampleGame.type === 'memory') {
      return <MemoryGame {...sampleGame.data} />;
    }
    if (sampleGame.type === 'puzzle') {
      return <PuzzleGame {...sampleGame.data} />;
    }
  }

  const defaultQuestions = [
    {
      question: `Изучаем тему: ${topic.title}`,
      options: [
        'Я готов учиться!',
        'Давайте начнём!',
        'Интересно узнать новое!',
        'Буду внимательным!'
      ],
      correctAnswer: 0,
      explanation: 'Отличный настрой! Эта игра скоро будет наполнена интересными вопросами.'
    }
  ];

  return <QuizGame title={topic.title} questions={defaultQuestions} />;
}
