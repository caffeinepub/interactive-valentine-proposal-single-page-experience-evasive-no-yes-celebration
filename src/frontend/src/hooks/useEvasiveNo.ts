import { useState, useCallback, useEffect, useRef } from 'react';

const phrases = [
  'No',
  'Are you sure? 🥺',
  'Think again 😏',
  "Don't break my heart 💔",
  "You can't say no 😜",
  'Please? 🥹',
  'Really? 😢',
  'One more chance? 💝',
  'One More  Chance 🥺💝💕, Please Binnu!! 🙏 🙏 ',
];

export function useEvasiveNo() {
  const [attemptCount, setAttemptCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(18);
  const autoMoveTimerRef = useRef<number | null>(null);

  // Calculate safe bounds based on viewport size
  const getSafeBounds = useCallback(() => {
    const buttonWidth = size * 4;
    const buttonHeight = size * 2;
    const margin = Math.max(buttonWidth, buttonHeight) + 20;
    
    return {
      minX: margin,
      maxX: window.innerWidth - margin,
      minY: margin,
      maxY: window.innerHeight - margin,
    };
  }, [size]);

  // Move button to a random safe position (without changing size or phrase)
  const moveToRandomPosition = useCallback(() => {
    const bounds = getSafeBounds();
    
    // Generate random position within safe bounds
    const newX = bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
    const newY = bounds.minY + Math.random() * (bounds.maxY - bounds.minY);

    setPosition({ x: newX, y: newY });
  }, [getSafeBounds]);

  // Initialize position on mount and handle resize
  useEffect(() => {
    const initializePosition = () => {
      const bounds = getSafeBounds();
      const centerX = window.innerWidth * 0.65;
      const centerY = window.innerHeight * 0.55;
      
      // Clamp to safe bounds
      const safeX = Math.max(bounds.minX, Math.min(bounds.maxX, centerX));
      const safeY = Math.max(bounds.minY, Math.min(bounds.maxY, centerY));
      
      setPosition({ x: safeX, y: safeY });
    };

    initializePosition();

    const handleResize = () => {
      const bounds = getSafeBounds();
      setPosition(prev => ({
        x: Math.max(bounds.minX, Math.min(bounds.maxX, prev.x)),
        y: Math.max(bounds.minY, Math.min(bounds.maxY, prev.y)),
      }));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [getSafeBounds]);

  // Auto-movement effect - starts immediately on mount
  useEffect(() => {
    // Move immediately on mount
    moveToRandomPosition();
    
    // Then set up interval for continuous movement
    autoMoveTimerRef.current = window.setInterval(() => {
      moveToRandomPosition();
    }, 2000); // Move every 2 seconds

    // Cleanup on unmount
    return () => {
      if (autoMoveTimerRef.current !== null) {
        clearInterval(autoMoveTimerRef.current);
        autoMoveTimerRef.current = null;
      }
    };
  }, [moveToRandomPosition]);

  // Handle user interaction (hover/touch) - this changes phrase and size
  const handleInteraction = useCallback(() => {
    setAttemptCount((prev) => prev + 1);

    const bounds = getSafeBounds();
    
    // Generate random position within safe bounds
    const newX = bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
    const newY = bounds.minY + Math.random() * (bounds.maxY - bounds.minY);

    setPosition({ x: newX, y: newY });

    // Decrease size with each attempt (minimum 12px)
    setSize((prev) => Math.max(12, prev - 1));
  }, [getSafeBounds]);

  const label = phrases[Math.min(attemptCount, phrases.length - 1)];

  return {
    position,
    size,
    label,
    handleInteraction,
  };
}
