import { useState, useCallback } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import TypingAnimation from "@/components/TypingAnimation";
import CommandBar from "@/components/CommandBar";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

const bootLines = [
  { content: <span className="comment-text"># initializing portfolio...</span>, delay: 400 },
  {
    content: <span className="font-bold text-foreground">./load_resume.sh</span>,
    isCommand: true,
    delay: 600,
  },
  { content: <span className="text-muted-foreground">loading modules... </span>, delay: 400 },
  {
    content: (
      <div className="space-y-1 mt-2">
        <p className="text-lg font-bold text-foreground">👋 你好，我是 [你的名字]</p>
        <p className="text-muted-foreground">AI Product Manager · Builder · 技术产品人</p>
      </div>
    ),
    delay: 500,
  },
  {
    content: (
      <p className="text-sm text-muted-foreground mt-2">
        "最好的产品，是让用户感受不到技术的存在。"
      </p>
    ),
    delay: 400,
  },
  {
    content: <span className="success-text text-xs mt-2 block">✓ resume loaded — 点击下方命令探索更多 ↓</span>,
    delay: 300,
  },
];

type Section = "about" | "projects" | null;

const Index = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>(null);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  const commands = [
    { name: "about", description: "关于我", action: () => setActiveSection("about") },
    { name: "projects", description: "项目经历", action: () => setActiveSection("projects") },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <TerminalWindow>
          <TypingAnimation lines={bootLines} onComplete={handleBootComplete} />

          {bootComplete && (
            <div className="animate-fade-in">
              <CommandBar
                commands={commands}
                activeCommand={activeSection ?? undefined}
              />

              {activeSection === "about" && <AboutSection />}
              {activeSection === "projects" && <ProjectsSection />}
            </div>
          )}
        </TerminalWindow>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Built with ♥ and a terminal mindset
        </p>
      </div>
    </div>
  );
};

export default Index;
