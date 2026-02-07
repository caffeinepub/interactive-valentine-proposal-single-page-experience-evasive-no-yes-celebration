import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ModalAccents from './ModalAccents';

export default function ProposalYesModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="modal-glass max-w-[90vw] sm:max-w-md md:max-w-lg border-0 p-0 overflow-hidden">
        <ModalAccents />
        <div className="relative z-10 p-6 sm:p-8 md:p-10 text-center space-y-4 sm:space-y-5 md:space-y-6">
          <div className="text-4xl sm:text-5xl md:text-6xl animate-bounce">👑💖</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Thank You! My Princess!!
          </h2>
          <div className="space-y-2 sm:space-y-3 text-base sm:text-lg md:text-xl text-white/90">
            <p className="leading-relaxed">
              You just made my world brighter ✨
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-pink-200">
              This Valentine's Day is officially ours 💕
            </p>
          </div>
          <div className="flex justify-center gap-2 sm:gap-3 text-2xl sm:text-3xl md:text-4xl animate-pulse">
            💝 💖 💘
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
