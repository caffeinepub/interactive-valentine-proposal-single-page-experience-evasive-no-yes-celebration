import { useRef, useCallback } from 'react';

export function useSoundEffects() {
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const explosionAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements
  if (!clickAudioRef.current) {
    clickAudioRef.current = new Audio('/assets/audio/ui-chime.mp3');
    clickAudioRef.current.volume = 0.4;
  }

  if (!explosionAudioRef.current) {
    explosionAudioRef.current = new Audio('/assets/audio/heart-explosion.mp3');
    explosionAudioRef.current.volume = 0.5;
  }

  const playClick = useCallback(() => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, []);

  const playExplosion = useCallback(() => {
    if (explosionAudioRef.current) {
      explosionAudioRef.current.currentTime = 0;
      explosionAudioRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, []);

  return { playClick, playExplosion };
}
