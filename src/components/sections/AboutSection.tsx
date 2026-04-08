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
          AI 领域产品经理，专注于将前沿 AI 技术转化为用户可感知的产品体验。
        </p>

        <p>
          深度参与 LLM 应用、Agent 工作流、AI 辅助开发工具等方向的产品设计与落地。
          相信最好的 AI 产品不是"炫技"，而是让用户感受不到 AI 的存在。
        </p>

        <div className="mt-4 space-y-1">
          <p className="comment-text"># 核心标签</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {["AI Product", "LLM 应用", "用户体验", "数据驱动", "技术同理心", "0→1"].map(
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
          <p className="comment-text"># 联系方式</p>
          <p>
            📧 <span className="link-text">hello@example.com</span>
          </p>
          <p>
            🔗 <span className="link-text">linkedin.com/in/yourname</span>
          </p>
        </div>
      </div>

      <div className="mt-2 success-text text-xs">✓ about.md loaded successfully</div>
    </div>
  );
};

export default AboutSection;
