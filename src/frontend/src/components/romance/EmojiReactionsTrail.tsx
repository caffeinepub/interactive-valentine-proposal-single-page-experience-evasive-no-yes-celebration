import { useEffect, useState } from 'react';

interface Emoji {
  id: number;
  x: number;
  y: number;
  emoji: string;
  opacity: number;
}

export default function EmojiReactionsTrail() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const emojiList = ['💖', '💕', '💗', '💓', '💝', '💘'];

  useEffect(() => {
    let lastSpawn = 0;
    const throttleMs = 800;

    const handlePointerMove = (e: PointerEvent) => {
      const now = Date.now();
      if (now - lastSpawn < throttleMs) return;
      lastSpawn = now;

      const newEmoji: Emoji = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
        opacity: 1,
      };

      setEmojis((prev) => [...prev, newEmoji]);

      // Remove after animation
      setTimeout(() => {
        setEmojis((prev) => prev.filter((em) => em.id !== newEmoji.id));
      }, 2000);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute text-xl sm:text-2xl md:text-3xl animate-emoji-float"
          style={{
            left: emoji.x,
            top: emoji.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  );
}
