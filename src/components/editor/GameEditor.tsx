import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface GameEditorProps {
  gameType: 'quiz' | 'match' | 'sort' | 'memory' | 'puzzle';
  initialData: any;
  onSave: (data: any) => void;
  onClose: () => void;
}

export default function GameEditor({ gameType, initialData, onSave, onClose }: GameEditorProps) {
  const [gameData, setGameData] = useState(initialData);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setGameData({ ...gameData, [key]: url });
      toast({
        title: 'Аудио загружено',
        description: file.name,
      });
    }
  };

  const handleSave = () => {
    onSave(gameData);
    toast({
      title: 'Игра сохранена',
      description: 'Изменения успешно применены',
    });
    onClose();
  };

  const renderQuizEditor = () => (
    <div className="space-y-4">
      <Input
        value={gameData.title || ''}
        onChange={(e) => setGameData({ ...gameData, title: e.target.value })}
        placeholder="Название викторины"
      />
      
      <div>
        <label className="text-sm font-medium mb-2 block">Звук правильного ответа</label>
        <div className="flex gap-2">
          <Input
            value={gameData.correctSound || ''}
            onChange={(e) => setGameData({ ...gameData, correctSound: e.target.value })}
            placeholder="URL или загрузите файл"
          />
          <Button onClick={() => audioInputRef.current?.click()} variant="outline">
            <Icon name="Upload" size={16} />
          </Button>
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            onChange={(e) => handleAudioUpload(e, 'correctSound')}
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-3">
        {gameData.questions?.map((q: any, idx: number) => (
          <Card key={idx} className="p-4 border-2">
            <Textarea
              value={q.question}
              onChange={(e) => {
                const newQuestions = [...gameData.questions];
                newQuestions[idx].question = e.target.value;
                setGameData({ ...gameData, questions: newQuestions });
              }}
              placeholder="Вопрос"
              className="mb-2"
            />
            <div className="space-y-1">
              {q.options?.map((opt: string, optIdx: number) => (
                <Input
                  key={optIdx}
                  value={opt}
                  onChange={(e) => {
                    const newQuestions = [...gameData.questions];
                    newQuestions[idx].options[optIdx] = e.target.value;
                    setGameData({ ...gameData, questions: newQuestions });
                  }}
                  placeholder={`Вариант ${optIdx + 1}`}
                />
              ))}
            </div>
            <Textarea
              value={q.explanation || ''}
              onChange={(e) => {
                const newQuestions = [...gameData.questions];
                newQuestions[idx].explanation = e.target.value;
                setGameData({ ...gameData, questions: newQuestions });
              }}
              placeholder="Объяснение"
              className="mt-2"
              rows={2}
            />
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMatchEditor = () => (
    <div className="space-y-4">
      <Input
        value={gameData.title || ''}
        onChange={(e) => setGameData({ ...gameData, title: e.target.value })}
        placeholder="Название игры"
      />
      
      <div className="space-y-2">
        {gameData.pairs?.map((pair: any, idx: number) => (
          <div key={idx} className="flex gap-2">
            <Input
              value={pair.left}
              onChange={(e) => {
                const newPairs = [...gameData.pairs];
                newPairs[idx].left = e.target.value;
                setGameData({ ...gameData, pairs: newPairs });
              }}
              placeholder="Левая карточка"
            />
            <Input
              value={pair.right}
              onChange={(e) => {
                const newPairs = [...gameData.pairs];
                newPairs[idx].right = e.target.value;
                setGameData({ ...gameData, pairs: newPairs });
              }}
              placeholder="Правая карточка"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderEditor = () => {
    switch (gameType) {
      case 'quiz':
        return renderQuizEditor();
      case 'match':
        return renderMatchEditor();
      default:
        return (
          <Textarea
            value={JSON.stringify(gameData, null, 2)}
            onChange={(e) => {
              try {
                setGameData(JSON.parse(e.target.value));
              } catch {}
            }}
            rows={20}
            placeholder="JSON данные игры"
          />
        );
    }
  };

  return (
    <Card className="fixed inset-4 z-50 overflow-y-auto bg-white shadow-2xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Редактор игры</h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <Icon name="X" size={20} />
          </Button>
        </div>

        {renderEditor()}

        <div className="flex gap-2 mt-6">
          <Button onClick={handleSave} className="flex-1">
            <Icon name="Check" size={16} className="mr-2" />
            Сохранить
          </Button>
          <Button onClick={onClose} variant="outline">
            Отмена
          </Button>
        </div>
      </div>
    </Card>
  );
}
