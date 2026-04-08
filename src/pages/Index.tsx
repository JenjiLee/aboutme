import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TerminalWindow from "@/components/TerminalWindow";
import TypingAnimation from "@/components/TypingAnimation";
import CommandBar from "@/components/CommandBar";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ThoughtsSection from "@/components/sections/ThoughtsSection";

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
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      style={{
        background: "linear-gradient(180deg, #245EDC 0%, #3A8BF5 30%, #87CEEB 55%, #B0E0F0 70%, #7CBA3F 70.1%, #5DA832 85%, #4A8C2A 100%)",
      }}
    >
      <div className="w-full max-w-2xl">
        {/* XP-style window title bar */}
        <div
          className="h-[30px] flex items-center justify-between px-2 rounded-t-lg"
          style={{
            background: "linear-gradient(180deg, #0A246A 0%, #3A6EA5 40%, #0A246A 100%)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[12px]">💻</span>
            <span
              className="text-white text-[12px] font-bold"
              style={{ fontFamily: "Tahoma, sans-serif" }}
            >
              李郁青.exe — Terminal
            </span>
          </div>
          <div className="flex gap-[2px]">
            <button
              className="w-[20px] h-[20px] flex items-center justify-center text-white text-[10px] rounded-sm"
              style={{
                background: "linear-gradient(180deg, #3A6EA5 0%, #245EDC 100%)",
                border: "1px solid #1B4D8C",
              }}
              title="最小化"
            >
              _
            </button>
            <button
              className="w-[20px] h-[20px] flex items-center justify-center text-white text-[10px] rounded-sm"
              style={{
                background: "linear-gradient(180deg, #3A6EA5 0%, #245EDC 100%)",
                border: "1px solid #1B4D8C",
              }}
              title="最大化"
            >
              □
            </button>
            <button
              className="w-[20px] h-[20px] flex items-center justify-center text-white text-[11px] rounded-sm hover:brightness-125"
              style={{
                background: "linear-gradient(180deg, #C45156 0%, #B33B3F 100%)",
                border: "1px solid #8B2D30",
              }}
              title="关闭"
              onClick={handleClose}
            >
              ✕
            </button>
          </div>
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

      {/* Exit confirmation dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div
            className="w-[360px] rounded shadow-xl overflow-hidden"
            style={{ fontFamily: "Tahoma, sans-serif" }}
          >
            <div
              className="h-[28px] flex items-center justify-between px-2"
              style={{
                background: "linear-gradient(180deg, #0A246A 0%, #3A6EA5 100%)",
              }}
            >
              <span className="text-white text-[12px] font-bold">⚠️ 系统提示</span>
              <button
                className="w-[18px] h-[18px] flex items-center justify-center text-white text-[11px] rounded-sm hover:bg-red-500"
                style={{
                  background: "linear-gradient(180deg, #C45156 0%, #B33B3F 100%)",
                  border: "1px solid #8B2D30",
                }}
                onClick={() => setShowExitConfirm(false)}
              >
                ✕
              </button>
            </div>
            <div className="bg-[#ECE9D8] p-5">
              <div className="flex gap-4 items-start">
                <span className="text-3xl">🤔</span>
                <div>
                  <p className="text-[13px] text-[#000000] leading-relaxed font-medium">
                    确定不想和他聊聊吗？
                  </p>
                  <p className="text-[11px] text-[#555555] mt-1">
                    他人还挺有趣的～
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="px-4 py-1 text-[12px] bg-[#ECE9D8] border border-[#ACA899] rounded-sm hover:bg-[#DDD8C8]"
                  onClick={() => setShowExitConfirm(false)}
                >
                  继续看看 →
                </button>
                <button
                  className="px-4 py-1 text-[12px] bg-[#ECE9D8] border border-[#ACA899] rounded-sm hover:bg-[#DDD8C8]"
                  onClick={() => navigate("/")}
                >
                  回到桌面
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
