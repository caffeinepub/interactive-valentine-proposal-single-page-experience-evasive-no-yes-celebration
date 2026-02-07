import { useEvasiveNo } from '../../hooks/useEvasiveNo';

interface EvasiveNoButtonProps {
  onAttempt: () => void;
}

export default function EvasiveNoButton({ onAttempt }: EvasiveNoButtonProps) {
  const { position, size, label, handleInteraction } = useEvasiveNo();

  const handleMouseEnter = () => {
    onAttempt();
    handleInteraction();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    onAttempt();
    handleInteraction();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      className="fixed z-40 rounded-full bg-gray-400/80 hover:bg-gray-500/80 text-white font-semibold transition-all duration-200 shadow-lg touch-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        fontSize: `${size}px`,
        padding: `${size * 0.5}px ${size * 0.8}px`,
        minWidth: `${size * 4}px`,
      }}
    >
      {label}
    </button>
  );
}
