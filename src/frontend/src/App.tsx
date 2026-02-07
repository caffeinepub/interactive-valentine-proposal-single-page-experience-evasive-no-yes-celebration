import { useState, useEffect } from 'react';
import RomanticBackground from './components/romance/RomanticBackground';
import HeartParticlesCanvas from './components/romance/HeartParticlesCanvas';
import HeartbeatShell from './components/romance/HeartbeatShell';
import BeatingHeart from './components/romance/BeatingHeart';
import MusicToggle from './components/romance/MusicToggle';
import YesButton from './components/proposal/YesButton';
import EvasiveNoButton from './components/proposal/EvasiveNoButton';
import CelebrationLayer from './components/celebration/CelebrationLayer';
import ProposalYesModal from './components/celebration/ProposalYesModal';
import EmojiReactionsTrail from './components/romance/EmojiReactionsTrail';
import { useProposalState } from './hooks/useProposalState';
import { useNavigationGuard } from './hooks/useNavigationGuard';
import { useSoundEffects } from './hooks/useSoundEffects';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const { proposalState, setCelebrating, setCompleted } = useProposalState();
  const { playClick, playExplosion } = useSoundEffects();
  
  useNavigationGuard(proposalState !== 'completed');

  useEffect(() => {
    // Fade in animation on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleYesClick = () => {
    playExplosion();
    setCelebrating();
    // Mark as completed after celebration starts
    setTimeout(() => setCompleted(), 1000);
  };

  const handleNoAttempt = () => {
    playClick();
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background layers */}
      <RomanticBackground />
      <HeartParticlesCanvas dense={proposalState === 'celebrating' || proposalState === 'completed'} />
      
      {/* Emoji reactions trail */}
      <EmojiReactionsTrail />
      
      {/* Music toggle */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50">
        <MusicToggle />
      </div>

      {/* Main content with heartbeat pulse */}
      <HeartbeatShell>
        <main 
          className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-8 transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Main question */}
          <div className="mb-8 sm:mb-12 md:mb-16 text-center max-w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <h1 className="romantic-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-romantic-text drop-shadow-romantic break-words max-w-full px-2">
                Will You Be My Valentine?
              </h1>
              <BeatingHeart />
            </div>
            <div className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl">💘</div>
          </div>

          {/* Buttons */}
          {proposalState === 'idle' && (
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full max-w-2xl px-4">
              <YesButton onClick={handleYesClick} />
              <EvasiveNoButton onAttempt={handleNoAttempt} />
            </div>
          )}
        </main>
      </HeartbeatShell>

      {/* Celebration overlay */}
      {(proposalState === 'celebrating' || proposalState === 'completed') && (
        <>
          <CelebrationLayer />
          <ProposalYesModal />
        </>
      )}
    </div>
  );
}

export default App;
