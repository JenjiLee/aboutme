import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface StickyNoteProps {
  onClose: () => void;
  onSubmitted: () => void;
}

const StickyNote = ({ onClose, onSubmitted }: StickyNoteProps) => {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!nickname.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await supabase.from("guestbook_messages").insert({
        nickname: nickname.trim(),
        message: message.trim(),
      });
      setSubmitted(true);
      setTimeout(() => {
        onSubmitted();
      }, 1500);
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div
        className="w-[320px] rounded-lg overflow-hidden shadow-2xl"
        style={{
          fontFamily: "'Lucida Grande', 'Helvetica Neue', sans-serif",
          background: "linear-gradient(180deg, #FFFEA8 0%, #FFF574 100%)",
          border: "1px solid rgba(0,0,0,0.12)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* Title bar */}
        <div
          className="h-[24px] flex items-center justify-between px-2"
          style={{
            background: "linear-gradient(180deg, #FFFEA8 0%, #F5EC6A 100%)",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <button
            className="w-[11px] h-[11px] rounded-full bg-[#FF5F57] border border-[#E33E32] hover:brightness-90"
            onClick={onClose}
          />
          <span className="text-[10px] text-[#8B7B00] font-medium">便签</span>
          <div className="w-[11px]" />
        </div>

        {/* Content */}
        <div className="p-4">
          {submitted ? (
            <div className="text-center py-6">
              <div className="text-3xl mb-2">✨</div>
              <p className="text-[13px] text-[#5A4E00] font-medium">
                谢谢你的留言！
              </p>
            </div>
          ) : (
            <>
              <p className="text-[12px] text-[#8B7B00] mb-3">
                走之前留个言吧～ 🖊️
              </p>
              <input
                type="text"
                placeholder="你的昵称"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={50}
                className="w-full mb-2 px-2 py-1.5 text-[13px] rounded border border-[#D4C84A]/50 bg-white/60 text-[#333] placeholder:text-[#B0A040] outline-none focus:border-[#B0A040]"
              />
              <textarea
                placeholder="想说点什么..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                rows={4}
                className="w-full mb-3 px-2 py-1.5 text-[13px] rounded border border-[#D4C84A]/50 bg-white/60 text-[#333] placeholder:text-[#B0A040] outline-none focus:border-[#B0A040] resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-3 py-[4px] text-[11px] rounded text-[#666] font-medium"
                  style={{
                    background: "linear-gradient(180deg, #FAFAFA 0%, #E8E8E8 100%)",
                    border: "1px solid #C0C0C0",
                  }}
                  onClick={onClose}
                >
                  算了
                </button>
                <button
                  className="px-3 py-[4px] text-[11px] rounded text-white font-medium disabled:opacity-50"
                  style={{
                    background: "linear-gradient(180deg, #6CB3FA 0%, #2A7DE1 100%)",
                    border: "1px solid #1B62C0",
                  }}
                  disabled={!nickname.trim() || !message.trim() || submitting}
                  onClick={handleSubmit}
                >
                  {submitting ? "发送中..." : "留言 ✉️"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StickyNote;
