import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
}

const TerminalWindow = ({ title = "terminal — portfolio", children }: TerminalWindowProps) => {
  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="flex gap-2">
          <div className="terminal-dot bg-[#ff5f56]" />
          <div className="terminal-dot bg-[#ffbd2e]" />
          <div className="terminal-dot bg-[#27c93f]" />
        </div>
        <span className="ml-3 text-xs text-muted-foreground font-mono">{title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
