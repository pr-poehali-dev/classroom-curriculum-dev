import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import FlowerProgress from '@/components/FlowerProgress';
import { useNavigate } from 'react-router-dom';

export interface SortCategory {
  name: string;
  items: string[];
  color: string;
}

interface SortGameProps {
  title: string;
  categories: SortCategory[];
}

export default function SortGame({ title, categories }: SortGameProps) {
  const allItems = categories.flatMap(cat => cat.items);
  const [shuffledItems] = useState(() => [...allItems].sort(() => Math.random() - 0.5));
  const [categoryItems, setCategoryItems] = useState<Record<string, string[]>>(
    Object.fromEntries(categories.map(cat => [cat.name, []]))
  );
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const navigate = useNavigate();

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const handleCategoryClick = (categoryName: string) => {
    if (!selectedItem) return;

    const category = categories.find(cat => cat.name === categoryName);
    if (!category) return;

    const isCorrect = category.items.includes(selectedItem);
    
    if (isCorrect) {
      setCategoryItems(prev => ({
        ...prev,
        [categoryName]: [...prev[categoryName], selectedItem]
      }));
      
      setCorrectCount(prev => prev + 1);
      
      if (correctCount + 1 === allItems.length) {
        setTimeout(() => setGameFinished(true), 500);
      }
    }
    
    setSelectedItem(null);
  };

  const handleRestart = () => {
    setCategoryItems(Object.fromEntries(categories.map(cat => [cat.name, []])));
    setSelectedItem(null);
    setCorrectCount(0);
    setGameFinished(false);
  };

  const remainingItems = shuffledItems.filter(
    item => !Object.values(categoryItems).flat().includes(item)
  );

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
                totalQuestions={allItems.length}
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
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <Button onClick={() => navigate('/learn')} variant="outline" className="gap-2">
              <Icon name="ArrowLeft" size={18} />
              Назад
            </Button>
            <div className="text-sm font-medium text-green-700">
              Распределено: {correctCount} из {allItems.length}
            </div>
          </div>

          <Card className="watercolor-card border-2 border-green-200 mb-6">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4 text-green-800 text-center">
                {title}
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Распределите элементы по категориям: нажмите на элемент, затем на нужную категорию
              </p>

              <div className="flex flex-wrap gap-2 justify-center min-h-[80px] p-4 bg-gray-50 rounded-lg">
                {remainingItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedItem === item
                        ? 'border-blue-500 bg-blue-100 scale-105'
                        : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
                {remainingItems.length === 0 && (
                  <p className="text-gray-400 text-center w-full">Все элементы распределены!</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <Card
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedItem ? 'hover:scale-105' : ''
                }`}
                style={{ borderColor: category.color, borderWidth: 2 }}
              >
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-3 text-center" style={{ color: category.color }}>
                    {category.name}
                  </h3>
                  <div className="space-y-2 min-h-[100px]">
                    {categoryItems[category.name].map((item, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 bg-green-100 border border-green-300 rounded text-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
