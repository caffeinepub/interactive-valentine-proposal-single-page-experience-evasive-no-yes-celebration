import { useEffect, useState } from 'react';
import HeartConfetti from './HeartConfetti';
import EmojiBurst from './EmojiBurst';

export default function CelebrationLayer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Darkened background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-celebration-zoom" />
      
      {/* Heart confetti */}
      <HeartConfetti />
      
      {/* Emoji burst */}
      <EmojiBurst />
    </div>
  );
}
