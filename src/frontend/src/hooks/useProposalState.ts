import { useState, useEffect } from 'react';

type ProposalState = 'idle' | 'celebrating' | 'completed';

const STORAGE_KEY = 'valentine_proposal_state';

export function useProposalState() {
  const [proposalState, setProposalState] = useState<ProposalState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as ProposalState) || 'idle';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, proposalState);
  }, [proposalState]);

  const setCelebrating = () => setProposalState('celebrating');
  const setCompleted = () => setProposalState('completed');
  const reset = () => setProposalState('idle');

  return {
    proposalState,
    setCelebrating,
    setCompleted,
    reset,
  };
}
