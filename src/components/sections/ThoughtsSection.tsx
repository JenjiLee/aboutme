import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface ThoughtThread {
  title: string;
  command: string;
  emoji: string;
  summary: string;
  bullets: string[];
}

const threads: ThoughtThread[] = [
  {
    title: "好奇心的故事",
    command: "curiosity.md",
    emoji: "🔍",
    summary: "从创业到 VC，好奇心驱动的每一次选择",
    bullets: [
      "22 年中旬，Stable Diffusion 在创作者社区火热 → 创立 C 端二次元社区 → 转型 B 端。第一课：先拿到资金/现金流，再说梦想",
      "22 年底，ChatGPT 爆火 → 美元 VC 实习，看完几乎所有基础模型 & 中美华人 AI 应用",
      "提问方式的转型：疑问（不带预设）vs 设问（带预设 → 无形中有偏见与限制）。经验会成就事情，也会限制事情",
      "或许，我是说或许，VC 也没有看人的方法论",
      "AI 面前，职能的边界越来越模糊",
    ],
  },
  {
    title: "战略判断",
    command: "strategy.md",
    emoji: "🎯",
    summary: "模型幻觉很大，且一时难以消除。娱乐向产品利用幻觉，可以巧妙",
    bullets: [
      "当时的判断：模型幻觉比现在还要大，短期内无法消除",
      "娱乐向产品可以巧妙利用幻觉——AI 的「不确定性」在创意场景反而是优势",
      "这个判断影响了后续对 AI 社交 / 陪伴产品的方向选择",
    ],
  },
  {
    title: "AI 社交 (0→1)",
    command: "ai-social.md",
    emoji: "💬",
    summary: "腾讯社交线的三座大山、陪伴产品的复盘与回看",
    bullets: [
      "腾讯社交线阻挡 AI 的三座大山（至今仍在）：安全、法务、合规",
      "需要为成本负责：Character.AI 的成本比我们低 10 倍。商业化手段的探索：皮肤？卖 token？游戏化？",
      "先做成再完美——大部分陪伴产品直接 prompt 调用基模，壁垒低；响应时间和成本决定了产品的交互设计",
      "Memory 的核心问题：选择记住什么？是否给用户透出？选择遗忘什么？遗忘频率？",
      "25 年回看：C.AI 类产品吃的是 IP 红利（人均轮次 100-150，停留 100-120min → 回退到 28min）；UGC 自嗨程度高，内容消费属性弱；陪伴还是海外用户更加买单",
    ],
  },
  {
    title: "落地的故事",
    command: "landing.md",
    emoji: "🚀",
    summary: "save time vs kill time，电商素材，AI 模特的 2B2C 端水",
    bullets: [
      "选择逻辑：如果没办法 kill time（用户 attention 都被抖音拿走了），那就 save time",
      "离钱近：有钱进口袋才能更好落地 AI → 电商，毕竟 OpenAI、Perplexity 都要开始卖货",
      "B 端商家工具：考虑生成时间（交互兜底展示）、可控性（交给商家初级版本可继续编辑）",
      "评测维度：真实性、款式还原、细节还原（纹理/文字/logo）、美观性、面部保持、身材维度",
      "AI 模特的教训：C 端用户差评太多（认为淘宝都是假人），B 端反馈很好 → 做 2B2C 产品就是端水大师",
    ],
  },
  {
    title: "Agent 产品哲学",
    command: "agent-philosophy.md",
    emoji: "🧠",
    summary: "交付结果、可控性与全自动的平衡、商业化如何影响产品框架",
    bullets: [
      "交付结果：对话过程不重要，但得定义清楚到底什么才是结果本身，再考虑好结果",
      "找到可控性与全自动的平衡（参考自动驾驶的思路）",
      "先上线 → 无监督聚类意图 → 找到高频意图 → 市场 & 运营宣发",
      "不预设用户是否需要经历长时间得到好效果，还是短时间得到一般效果",
      "商业化方式会一定程度影响产品框架——定价模型决定了用户使用行为和产品边界",
      "Skills 出现后，垂类产品的价值将被磨平？暴论与否，关键在评测——只有垂直领域的人才能定义好什么是「好结果」，评测本身就是壁垒",
    ],
  },
  {
    title: "未完成的故事",
    command: "unfinished.md",
    emoji: "✨",
    summary: "坚定选择的命题，发散的 idea 与实战",
    bullets: [
      "做开创浪潮的人，而不是追随者",
      "确信自己有坚定的热情在社区和内容创作方向",
      "若分发方式不变，AI 时代下打败 TikTok 一定不是 AI 版 TikTok——那是什么？",
      "秉持「学会构建，学会销售」——如果未来 AI Coding 帮助构建，那自媒体时代下，好的销售一定要做好内容",
      "创意和执行力必须双管齐下，在设计开始的时候就想好 marketing",
      "发散 idea：科研论文图像生成 / Message 监测+AI 投资建议 / AI 版人生教练",
    ],
  },
];

const ThoughtCard = ({ thread }: { thread: ThoughtThread }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="border-l-2 border-primary/30 pl-4 cursor-pointer group"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center gap-2">
        <ChevronRight
          className={`w-3.5 h-3.5 text-primary transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
        />
        <span className="text-base">{thread.emoji}</span>
        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {thread.title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mt-0.5 ml-5">{thread.summary}</p>
      <p className="text-xs text-muted-foreground mt-1 ml-5 group-hover:text-primary/70 transition-colors">
        {expanded ? "▾ 收起" : `▸ cat ${thread.command}`}
      </p>

      {expanded && (
        <div className="ml-5 mt-3 animate-fade-in space-y-3 pb-2">
          <div>
            <span className="prompt-symbol text-xs">❯ </span>
            <span className="text-xs font-medium">cat ./thoughts/{thread.command}</span>
          </div>
          <div className="bg-secondary/50 rounded-md p-4 space-y-2">
            {thread.bullets.map((b, i) => (
              <div key={i} className="flex gap-2 text-sm leading-relaxed">
                <span className="text-primary shrink-0 mt-0.5">›</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ThoughtsSection = () => {
  return (
    <div className="animate-fade-in space-y-4 mt-4">
      <div>
        <span className="prompt-symbol">❯ </span>
        <span className="font-medium">ls ./thoughts/</span>
      </div>

      <div className="ml-4 space-y-1">
        <p className="section-title">## 既见树木，又见森林</p>
        <p className="comment-text text-xs"># 关于 AI 产品的一些思考碎片，点击展开阅读</p>
      </div>

      <div className="ml-4 space-y-5">
        {threads.map((thread, i) => (
          <ThoughtCard key={i} thread={thread} />
        ))}
      </div>

      <div className="mt-2 success-text text-xs">✓ {threads.length} threads found</div>
    </div>
  );
};

export default ThoughtsSection;
