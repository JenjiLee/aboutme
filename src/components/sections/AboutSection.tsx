const AboutSection = () => {
  return (
    <div className="animate-fade-in space-y-4 mt-4">
      <div>
        <span className="prompt-symbol">❯ </span>
        <span className="font-medium">cat about.md</span>
      </div>

      <div className="ml-4 space-y-3">
        <p className="section-title">## 关于我</p>

        <p>
          2年正式 AI PM 经验，专注垂类 Agent 产品定义、效果优化与商业化。
        </p>

        <p>
          覆盖从对话框架定义、交互设计、评测体系搭建、模型后训练策略到商业化落地的全链路。
          硕士 AI 科班，精通深度学习模型优化与应用，对新技术有极高敏锐度。
        </p>

        <div className="mt-4 space-y-1">
          <p className="comment-text"># 教育背景</p>
          <div className="ml-2 space-y-1 text-sm">
            <p>🎓 <span className="font-semibold text-foreground">清华大学</span> · 数据科学与信息技术（学术型）硕士 <span className="text-muted-foreground">2021 — 2024</span></p>
            <p className="text-muted-foreground ml-5">研究方向：跨模态检索、半监督学习、LLM 应用 · CCF B 一作</p>
            <p>🎓 <span className="font-semibold text-foreground">西安电子科技大学</span> · 电子信息 本科 <span className="text-muted-foreground">2017 — 2021</span></p>
            <p className="text-muted-foreground ml-5">国家奖学金 · 国家励志奖学金 · 互联网+国二 · 计算机设计大赛国二 · 数学建模省一</p>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <p className="comment-text"># 核心标签</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Agent 产品", "LLM 应用", "评测体系", "商业化", "SFT+RL", "RAG→Skills", "数据驱动", "0→1"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs border border-border bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <p className="comment-text"># 技能</p>
          <p className="text-sm">
            熟练使用 Claude Code、Cursor、Codex、Lovable、Trae 等 AI 工具产出 demo / 数据分析结论
          </p>
          <p className="text-sm">
            有 AI 产品使用和体验的高效方法论，擅长框架推演与 debug
          </p>
        </div>

        <div className="mt-4 space-y-1">
          <p className="comment-text"># 联系方式</p>
          <p>
            📧 <a href="mailto:yuqinglee21@163.com" className="link-text">yuqinglee21@163.com</a>
          </p>
          <p>
            📱 <span className="link-text">(+86) 15349260311</span>
          </p>
        </div>
      </div>

      <div className="mt-2 success-text text-xs">✓ about.md loaded successfully</div>
    </div>
  );
};

export default AboutSection;
