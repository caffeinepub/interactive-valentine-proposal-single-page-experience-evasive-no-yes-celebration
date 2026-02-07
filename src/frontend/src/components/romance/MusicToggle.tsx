import { Music, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBackgroundMusic } from '../../hooks/useBackgroundMusic';

export default function MusicToggle() {
  const { isPlaying, toggle } = useBackgroundMusic();

  return (
    <Button
      onClick={toggle}
      variant="outline"
      size="icon"
      className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <Music className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
      ) : (
        <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
      )}
    </Button>
  );
}
