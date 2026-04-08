import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TerminalWindow from "@/components/TerminalWindow";
import TypingAnimation from "@/components/TypingAnimation";
import CommandBar from "@/components/CommandBar";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ThoughtsSection from "@/components/sections/ThoughtsSection";
import macWallpaper from "@/assets/mac-wallpaper.jpg";
import pixelAvatar from "@/assets/pixel-avatar.png";

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
      <div className="flex items-center gap-3 mt-2">
        <img src={pixelAvatar} alt="李郁青" width={48} height={48} className="pixelated" style={{ imageRendering: "pixelated" }} />
        <div className="space-y-1">
          <p className="text-lg font-bold text-foreground">你好，我是李郁青</p>
          <p className="text-muted-foreground">AI Product Manager · Agent 产品 · 清华硕士</p>
        </div>
      </div>
    ),
    delay: 500,
  },
  {
    content: (
      <p className="text-sm text-muted-foreground mt-2">
        "我们正站在科技与人文的十字路口～"
      </p>
    ),
    delay: 400,
  },
  {
    content: <span className="success-text text-xs mt-2 block">✓ resume loaded — 点击下方命令探索更多 ↓</span>,
    delay: 300,
  },
];

type Section = "about" | "projects" | "thoughts" | null;

const Index = () => {
  const navigate = useNavigate();
  const [bootComplete, setBootComplete] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  const commands = [
    { name: "about", description: "关于我", action: () => setActiveSection("about") },
    { name: "projects", description: "项目经历", action: () => setActiveSection("projects") },
    { name: "thoughts", description: "产品思考", action: () => setActiveSection("thoughts") },
  ];

  const handleClose = () => {
    setShowExitConfirm(true);
  };

  const handleMinimize = () => {
    navigate("/");
  };

  const handleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
      {/* Mac wallpaper background */}
      <img
        src={macWallpaper}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className={`w-full ${isFullscreen ? "" : "max-w-2xl"} relative z-10`}>
        <TerminalWindow onClose={handleClose} onMinimize={handleMinimize} onFullscreen={handleFullscreen} isFullscreen={isFullscreen}>
          <TypingAnimation lines={bootLines} onComplete={handleBootComplete} />

          {bootComplete && (
            <div className="animate-fade-in">
              <CommandBar
                commands={commands}
                activeCommand={activeSection ?? undefined}
              />

              {activeSection === "about" && <AboutSection />}
              {activeSection === "projects" && <ProjectsSection />}
              {activeSection === "thoughts" && <ThoughtsSection />}
            </div>
          )}
        </TerminalWindow>

      </div>

      {/* Mac-style exit confirmation dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div
            className="w-[340px] rounded-xl overflow-hidden shadow-2xl"
            style={{
              fontFamily: "'Lucida Grande', 'Helvetica Neue', sans-serif",
              background: "linear-gradient(180deg, #ECECEC 0%, #D8D8D8 100%)",
              border: "1px solid rgba(0,0,0,0.2)",
            }}
          >
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">🤔</div>
              <p className="text-[13px] font-semibold text-[#333] mb-1">
                確定不想和他聊聊嗎？
              </p>
              <p className="text-[11px] text-[#666] leading-relaxed">
                他人還挺有趣的～
              </p>
            </div>
            <div className="flex justify-center gap-3 px-6 pb-5">
              <button
                className="px-5 py-[5px] text-[12px] rounded-md text-white font-medium"
                style={{
                  background: "linear-gradient(180deg, #6CB3FA 0%, #2A7DE1 100%)",
                  border: "1px solid #1B62C0",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
                }}
                onClick={() => setShowExitConfirm(false)}
              >
                繼續看看 →
              </button>
              <button
                className="px-5 py-[5px] text-[12px] rounded-md text-[#333] font-medium"
                style={{
                  background: "linear-gradient(180deg, #FAFAFA 0%, #E0E0E0 100%)",
                  border: "1px solid #B0B0B0",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
                onClick={() => navigate("/")}
              >
                回到桌面
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
