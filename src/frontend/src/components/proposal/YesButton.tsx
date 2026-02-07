import { Button } from '@/components/ui/button';

interface YesButtonProps {
  onClick: () => void;
}

export default function YesButton({ onClick }: YesButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="yes-button relative h-16 sm:h-18 md:h-20 lg:h-24 px-8 sm:px-10 md:px-12 lg:px-16 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 hover:from-pink-600 hover:via-red-600 hover:to-pink-700 text-white shadow-romantic-glow transition-all duration-300 hover:scale-110 hover:shadow-romantic-glow-intense border-0"
    >
      YES! 💖
    </Button>
  );
}
