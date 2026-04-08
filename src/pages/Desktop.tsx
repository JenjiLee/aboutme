import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pixelAvatar from "@/assets/pixel-avatar.png";

const Desktop = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [time, setTime] = useState("");
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleIconDoubleClick = () => {
    navigate("/terminal");
  };

  const handleIconClick = () => {
    setSelected(true);
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".desktop-icon")) return;
    setSelected(false);
  };

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden select-none"
      style={{
        background: "linear-gradient(180deg, #245EDC 0%, #3A8BF5 30%, #87CEEB 55%, #B0E0F0 70%, #7CBA3F 70.1%, #5DA832 85%, #4A8C2A 100%)",
      }}
      onClick={handleDesktopClick}
    >
      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute animate-cloud-1"
          style={{
            top: "12%",
            width: "200px",
            height: "60px",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute animate-cloud-2"
          style={{
            top: "22%",
            width: "280px",
            height: "80px",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute animate-cloud-3"
          style={{
            top: "8%",
            width: "160px",
            height: "50px",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Desktop area */}
      <div className="flex-1 relative p-6">
        {/* Desktop Icon */}
        <div
          className="desktop-icon flex flex-col items-center gap-1 w-20 cursor-pointer"
          onClick={handleIconClick}
          onDoubleClick={handleIconDoubleClick}
        >
          <div
            className={`p-1 rounded ${selected ? "bg-[#316AC5]/70 ring-1 ring-dotted ring-white/50" : ""}`}
          >
            <img
              src={pixelAvatar}
              alt="李郁青"
              width={48}
              height={48}
              className="pixelated"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <span
            className={`text-[11px] text-center leading-tight px-1 ${
              selected
                ? "bg-[#316AC5] text-white"
                : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            }`}
            style={{ fontFamily: "Tahoma, sans-serif" }}
          >
            李郁青.exe
          </span>
        </div>
      </div>

      {/* Taskbar */}
      <div
        className="h-[30px] flex items-center justify-between px-1"
        style={{
          background: "linear-gradient(180deg, #245EDC 0%, #1941A5 50%, #245EDC 100%)",
          borderTop: "1px solid #5B9BE8",
        }}
      >
        {/* Start button */}
        <button
          className="h-[24px] flex items-center gap-1 px-3 rounded-r-lg text-white text-[11px] font-bold"
          style={{
            fontFamily: "Tahoma, sans-serif",
            background: "linear-gradient(180deg, #3C8F3C 0%, #2D7B2D 50%, #236B23 100%)",
            border: "1px solid #1A5C1A",
            borderRadius: "0 8px 8px 0",
          }}
          onClick={() => setShowConfirm(true)}
        >
          <span className="text-[13px]">🪟</span>
          start
        </button>

        {/* System tray */}
        <div
          className="h-[24px] flex items-center gap-2 px-3 text-white text-[11px]"
          style={{
            fontFamily: "Tahoma, sans-serif",
            background: "linear-gradient(180deg, #1290E9 0%, #0C68B3 100%)",
            borderLeft: "1px solid #0C5DA5",
            borderRadius: "2px",
          }}
        >
          <span>🔊</span>
          <span>{time}</span>
        </div>
      </div>

      {/* Exit confirmation dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div
            className="w-[360px] rounded shadow-xl overflow-hidden"
            style={{ fontFamily: "Tahoma, sans-serif" }}
          >
            {/* Title bar */}
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
                onClick={() => setShowConfirm(false)}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="bg-[#ECE9D8] p-5">
              <div className="flex gap-4 items-start">
                <span className="text-3xl">🤔</span>
                <div>
                  <p className="text-[13px] text-[#000000] leading-relaxed font-medium">
                    确定不想和他聊聊吗？
                  </p>
                  <p className="text-[11px] text-[#555555] mt-1 leading-relaxed">
                    双击桌面上的「李郁青.exe」可以打开简历终端哦
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  className="px-4 py-1 text-[12px] bg-[#ECE9D8] border border-[#ACA899] rounded-sm hover:bg-[#DDD8C8] active:border-[#888]"
                  onClick={() => {
                    setShowConfirm(false);
                    navigate("/terminal");
                  }}
                >
                  去看看 →
                </button>
                <button
                  className="px-4 py-1 text-[12px] bg-[#ECE9D8] border border-[#ACA899] rounded-sm hover:bg-[#DDD8C8] active:border-[#888]"
                  onClick={() => setShowConfirm(false)}
                >
                  再想想
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
