import { useState, MouseEvent } from 'react';
import { Card } from '@/components/ui/card';

interface RippleCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export default function RippleCard({ children, onClick, className = '' }: RippleCardProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      x,
      y,
      id: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
    
    onClick?.();
  };

  return (
    <Card 
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50
          }}
        />
      ))}
      {children}
    </Card>
  );
}
