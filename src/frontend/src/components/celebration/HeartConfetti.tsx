import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export default function HeartConfetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        size: 20 + Math.random() * 20,
      });
    }
    setConfetti(pieces);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: '-50px',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            fontSize: `${piece.size}px`,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}
