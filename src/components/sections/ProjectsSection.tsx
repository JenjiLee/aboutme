const projects = [
  {
    name: "AI 写作助手",
    role: "产品负责人",
    period: "2023 — 2024",
    desc: "基于 LLM 的智能写作工具，支持多轮对话式内容生成与润色。DAU 峰值 50K+。",
    tags: ["GPT-4", "Prompt Engineering", "B2C"],
  },
  {
    name: "企业知识库 Agent",
    role: "产品经理",
    period: "2024",
    desc: "RAG + Agent 架构的企业内部知识问答系统，将内部信息检索效率提升 3x。",
    tags: ["RAG", "LangChain", "B2B"],
  },
  {
    name: "AI Code Review 工具",
    role: "产品设计",
    period: "2024 — 至今",
    desc: "面向开发者的 AI 辅助代码审查平台，集成 CI/CD 流程，降低 bug 率 40%。",
    tags: ["DevTool", "CI/CD", "Claude API"],
  },
];

const ProjectsSection = () => {
  return (
    <div className="animate-fade-in space-y-4 mt-4">
      <div>
        <span className="prompt-symbol">❯ </span>
        <span className="font-medium">ls -la ./projects/</span>
      </div>

      <div className="ml-4 space-y-6">
        <p className="section-title">## 项目经历</p>

        {projects.map((project, i) => (
          <div key={i} className="border-l-2 border-primary/30 pl-4 space-y-1">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <span className="font-semibold text-foreground">{project.name}</span>
              <span className="text-xs text-muted-foreground">{project.period}</span>
            </div>
            <p className="text-xs text-muted-foreground">{project.role}</p>
            <p className="text-sm mt-1">{project.desc}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs border border-primary/20 text-primary bg-primary/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 success-text text-xs">✓ 3 projects found</div>
    </div>
  );
};

export default ProjectsSection;
