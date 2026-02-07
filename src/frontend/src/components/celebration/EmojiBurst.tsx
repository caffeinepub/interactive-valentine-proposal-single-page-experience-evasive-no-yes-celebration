import { useEffect, useState } from 'react';

interface BurstEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
  delay: number;
}

export default function EmojiBurst() {
  const [emojis, setEmojis] = useState<BurstEmoji[]>([]);
  const emojiList = ['💖', '💘', '💕', '💞', '😍', '💗', '💓', '💝'];

  useEffect(() => {
    const burst: BurstEmoji[] = [];
    const count = 30;
    
    for (let i = 0; i < count; i++) {
      burst.push({
        id: i,
        emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
        x: 50,
        y: 50,
        angle: (360 / count) * i,
        distance: 200 + Math.random() * 300,
        delay: Math.random() * 0.5,
      });
    }
    setEmojis(burst);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute text-2xl sm:text-3xl md:text-4xl animate-emoji-burst"
          style={{
            left: '50%',
            top: '50%',
            animationDelay: `${emoji.delay}s`,
            '--angle': `${emoji.angle}deg`,
            '--distance': `${emoji.distance}px`,
          } as React.CSSProperties}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  );
}
