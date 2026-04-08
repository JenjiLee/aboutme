import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TerminalWindow from "@/components/TerminalWindow";
import TypingAnimation from "@/components/TypingAnimation";
import CommandBar from "@/components/CommandBar";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ThoughtsSection from "@/components/sections/ThoughtsSection";
import macWallpaper from "@/assets/mac-wallpaper.jpg";

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
        <p className="text-lg font-bold text-foreground">👋 你好，我是李郁青</p>
        <p className="text-muted-foreground">AI Product Manager · Agent 产品 · 清华硕士</p>
      </div>
    ),
    delay: 500,
  },
  {
    content: (
      <p className="text-sm text-muted-foreground mt-2">
        "2年 AI PM，专注垂类 Agent 产品定义、效果优化与商业化全链路。"
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
      {/* Mac wallpaper background */}
      <img
        src={macWallpaper}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="w-full max-w-2xl relative z-10">
        {/* Mac-style window title bar */}
        <div
          className="h-[22px] flex items-center justify-between px-3 rounded-t-lg"
          style={{
            background: "linear-gradient(180deg, rgba(200,200,200,0.95) 0%, rgba(170,170,170,0.9) 100%)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            fontFamily: "'Lucida Grande', 'Helvetica Neue', sans-serif",
          }}
        >
          <div className="flex items-center gap-[6px]">
            <button
              className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] border border-[#E33E32] hover:brightness-90"
              title="关闭"
              onClick={handleClose}
            />
            <button
              className="w-[12px] h-[12px] rounded-full bg-[#FEBC2E] border border-[#E5A00D]"
              title="最小化"
            />
            <button
              className="w-[12px] h-[12px] rounded-full bg-[#28C840] border border-[#1AAB29]"
              title="最大化"
            />
          </div>
          <span className="text-[11px] text-[#333] font-medium absolute left-1/2 -translate-x-1/2">
            terminal — portfolio
          </span>
          <div />
        </div>

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
              {activeSection === "thoughts" && <ThoughtsSection />}
            </div>
          )}
        </TerminalWindow>

        <p className="text-center text-xs text-white/60 mt-6 drop-shadow">
          Built with ♥ and a terminal mindset
        </p>
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
