import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onFullscreen?: () => void;
  isFullscreen?: boolean;
}

const TerminalWindow = ({ title = "terminal — portfolio", children, onClose, onMinimize, onFullscreen, isFullscreen }: TerminalWindowProps) => {
  return (
    <div
      className={`terminal-window flex flex-col ${
        isFullscreen
          ? "fixed inset-0 z-40 !rounded-none !max-w-none"
          : "window-enter h-[min(720px,calc(100vh-4.5rem))] sm:h-[min(760px,calc(100vh-7rem))]"
      }`}
    >
      <div className={`terminal-header ${isFullscreen ? "!rounded-none" : ""}`}>
        <div className="flex items-center gap-[6px]">
          <button
            className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] border border-[#E33E32] hover:brightness-90"
            title="关闭"
            onClick={onClose}
          />
          <button
            className="w-[12px] h-[12px] rounded-full bg-[#ffbd2e] border border-[#E5A00D] hover:brightness-90"
            title="最小化"
            onClick={onMinimize}
          />
          <button
            className="w-[12px] h-[12px] rounded-full bg-[#27c93f] border border-[#1AAB29] hover:brightness-90"
            title={isFullscreen ? "退出全屏" : "全屏"}
            onClick={onFullscreen}
          />
        </div>
        <span className="ml-3 text-xs text-muted-foreground font-mono">{title}</span>
      </div>
      <div
        className={`terminal-body flex-1 overflow-y-auto ${
          isFullscreen ? "h-[calc(100vh-36px)]" : "min-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
