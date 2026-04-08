import { useState, useEffect, ReactNode } from "react";

interface TypingLine {
  content: ReactNode;
  delay?: number; // ms before this line appears
  isCommand?: boolean;
}

interface TypingAnimationProps {
  lines: TypingLine[];
  onComplete?: () => void;
}

const TypingAnimation = ({ lines, onComplete }: TypingAnimationProps) => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= lines.length) {
      onComplete?.();
      return;
    }

    const delay = lines[visibleLines]?.delay ?? 300;
    const timer = setTimeout(() => {
      setVisibleLines((v) => v + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [visibleLines, lines, onComplete]);

  return (
    <div className="space-y-1">
      {lines.slice(0, visibleLines).map((line, i) => (
        <div
          key={i}
          className="animate-fade-in"
          style={{ animationDelay: "0ms" }}
        >
          {line.isCommand ? (
            <div>
              <span className="prompt-symbol">❯ </span>
              {line.content}
            </div>
          ) : (
            <div>{line.content}</div>
          )}
        </div>
      ))}
      {visibleLines < lines.length && (
        <span className="cursor-blink">▊</span>
      )}
    </div>
  );
};

export default TypingAnimation;
