import { type ReactNode } from 'react';

interface HeartbeatShellProps {
  children: ReactNode;
}

export default function HeartbeatShell({ children }: HeartbeatShellProps) {
  return (
    <div className="animate-heartbeat-pulse">
      {children}
    </div>
  );
}
