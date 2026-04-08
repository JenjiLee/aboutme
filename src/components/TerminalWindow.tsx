import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  onClose?: () => void;
}

const TerminalWindow = ({ title = "terminal — portfolio", children, onClose }: TerminalWindowProps) => {
  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="flex items-center gap-[6px]">
          <button
            className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] border border-[#E33E32] hover:brightness-90"
            title="关闭"
            onClick={onClose}
          />
          <div className="w-[12px] h-[12px] rounded-full bg-[#ffbd2e] border border-[#E5A00D]" />
          <div className="w-[12px] h-[12px] rounded-full bg-[#27c93f] border border-[#1AAB29]" />
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
