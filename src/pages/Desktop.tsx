import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pixelAvatar from "@/assets/pixel-avatar.png";
import macWallpaper from "@/assets/mac-wallpaper.jpg";

const Desktop = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [time, setTime] = useState("");
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const weekdays = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
      const m = now.getMonth() + 1;
      const d = now.getDate();
      const w = weekdays[now.getDay()];
      const h = now.getHours().toString().padStart(2, "0");
      const min = now.getMinutes().toString().padStart(2, "0");
      setTime(`${w} ${m}月${d}日 ${h}:${min}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleIconDoubleClick = () => navigate("/terminal");
  const handleIconClick = () => setSelected(true);
  const handleDesktopClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".desktop-icon")) return;
    setSelected(false);
  };

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden select-none"
      onClick={handleDesktopClick}
    >
      {/* Wallpaper */}
      <img
        src={macWallpaper}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Menu Bar */}
      <div
        className="relative z-10 h-[22px] flex items-center justify-between px-3 text-[13px] font-medium"
        style={{
          background: "linear-gradient(180deg, rgba(232,232,232,0.95) 0%, rgba(210,210,210,0.93) 100%)",
          borderBottom: "1px solid rgba(0,0,0,0.15)",
          fontFamily: "'Lucida Grande', 'Helvetica Neue', sans-serif",
        }}
      >
        <div className="flex items-center gap-4">
          <span className="text-[15px] font-bold opacity-80"></span>
          <span className="font-bold text-[13px]">Finder</span>
          <span className="text-[#333] opacity-70">檔案</span>
          <span className="text-[#333] opacity-70">編輯</span>
          <span className="text-[#333] opacity-70">檢視</span>
          <span className="text-[#333] opacity-70">前往</span>
          <span className="text-[#333] opacity-70">輔助說明</span>
        </div>
        <div className="flex items-center gap-3 text-[12px] text-[#333]">
          <span>🔊</span>
          <span>{time}</span>
        </div>
      </div>

      {/* Desktop area */}
      <div className="flex-1 relative">
        {/* Desktop Icon — top right like Mac */}
        <div className="absolute top-4 right-4 flex flex-col items-center gap-8">
          <div
            className="desktop-icon flex flex-col items-center gap-1 cursor-pointer"
            onClick={handleIconClick}
            onDoubleClick={handleIconDoubleClick}
          >
            <div
              className={`p-2 rounded-lg ${selected ? "bg-[#3875D7]/40 ring-2 ring-[#3875D7]/60" : ""}`}
            >
              <img
                src={pixelAvatar}
                alt="李郁青"
                width={52}
                height={52}
                className="pixelated drop-shadow-lg"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
            <span
              className={`text-[11px] text-center leading-tight px-2 py-[1px] rounded ${
                selected
                  ? "bg-[#3875D7] text-white"
                  : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
              }`}
              style={{ fontFamily: "'Lucida Grande', sans-serif" }}
            >
              李郁青.app
            </span>
          </div>
        </div>
      </div>

      {/* Dock */}
      <div className="relative z-10 flex justify-center pb-1">
        <div
          className="flex items-end gap-1 px-3 py-1 rounded-xl"
          style={{
            background: "linear-gradient(180deg, rgba(200,210,220,0.55) 0%, rgba(180,190,200,0.35) 100%)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 2px 20px rgba(0,0,0,0.15)",
          }}
        >
          {["📁", "🌐", "📧", "⚙️", "🗑️"].map((icon, i) => (
            <div
              key={i}
              className="w-10 h-10 flex items-center justify-center text-[24px] cursor-default opacity-80"
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* Mac-style confirm dialog */}
      {showConfirm && (
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
                雙擊桌面上的「李郁青.app」可以打開簡歷終端哦
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
                onClick={() => {
                  setShowConfirm(false);
                  navigate("/terminal");
                }}
              >
                去看看 →
              </button>
              <button
                className="px-5 py-[5px] text-[12px] rounded-md text-[#333] font-medium"
                style={{
                  background: "linear-gradient(180deg, #FAFAFA 0%, #E0E0E0 100%)",
                  border: "1px solid #B0B0B0",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
                onClick={() => setShowConfirm(false)}
              >
                再想想
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
