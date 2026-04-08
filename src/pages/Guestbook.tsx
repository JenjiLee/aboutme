import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import TerminalWindow from "@/components/TerminalWindow";

type GuestbookMessage = {
  id: string;
  nickname: string;
  message: string;
  created_at: string;
  is_public: boolean;
};

const fallbackMessages = [
  {
    id: "placeholder-1",
    nickname: "你可以是第一个留言的人",
    message: "这里还没有公开留言。留下一句话，这个桌面会更有生命力。",
    created_at: new Date().toISOString(),
  },
  {
    id: "placeholder-2",
    nickname: "留言会直接展示",
    message: "可以写一句打招呼、一个印象、或者你看完这个主页最想说的话。",
    created_at: new Date().toISOString(),
  },
];

const Guestbook = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["guestbook-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guestbook_messages")
        .select("id, nickname, message, created_at, is_public")
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(30);

      if (error) {
        throw error;
      }

      return data as GuestbookMessage[];
    },
  });

  const messages = data?.length ? data : fallbackMessages;

  return (
    <div className="relative z-10">
      <TerminalWindow
        title="guestbook — messages"
        onClose={() => navigate("/")}
        onMinimize={() => navigate("/")}
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="section-title">## 留言箱</p>
            <p className="text-sm text-muted-foreground">
              这里收着访客留下的话。新的留言会直接公开展示。
            </p>
          </div>

          {isLoading && (
            <div className="rounded-xl border border-dashed border-border bg-white/70 px-4 py-6 text-sm text-muted-foreground">
              正在整理桌面上的留言纸条...
            </div>
          )}

          {isError && (
            <div className="rounded-xl border border-[#f3b3bf] bg-[#fff3f6] px-4 py-4 text-sm text-[#b4234d]">
              留言箱暂时没有连上，稍后再打开试试看。
            </div>
          )}

          {!isLoading && !isError && (
            <div className="grid gap-4 md:grid-cols-2">
              {messages.map((item, index) => (
                <article
                  key={item.id}
                  className={`rounded-2xl border px-4 py-4 shadow-sm ${
                    data?.length
                      ? "border-[#f1d79b] bg-[#fff7dd]"
                      : index % 2 === 0
                        ? "border-[#d7e7ff] bg-[#eef6ff]"
                        : "border-[#f1d79b] bg-[#fff7dd]"
                  }`}
                  style={{
                    transform: `rotate(${index % 2 === 0 ? "-0.6deg" : "0.8deg"})`,
                  }}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.nickname}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleString("zh-CN", {
                          month: "numeric",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span className="text-base">{data?.length ? "💌" : "📝"}</span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-7 text-[#3d3522]">
                    {item.message}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </TerminalWindow>
    </div>
  );
};

export default Guestbook;
