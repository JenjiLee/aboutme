import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface Project {
  name: string;
  role: string;
  period: string;
  desc: string;
  tags: string[];
  thinking: string;
  transition?: string; // 从上一个项目到这个项目的切换思考
  highlights?: string[];
}

const projects: Project[] = [
  {
    name: "AI 写作助手",
    role: "产品负责人",
    period: "2023 — 2024",
    desc: "基于 LLM 的智能写作工具，支持多轮对话式内容生成与润色。DAU 峰值 50K+。",
    tags: ["GPT-4", "Prompt Engineering", "B2C"],
    thinking:
      "当时市场上的 AI 写作工具大多是「一次性生成」的模式——用户输入 prompt，拿到结果，结束。但写作本质上是一个迭代过程。所以我们的核心设计理念是「对话式写作」：把 AI 当作一个协作者而非工具。这个思路后来被验证是对的，用户留存比同类产品高出 2 倍。",
    highlights: [
      "设计了「意图理解 → 草稿生成 → 多轮润色」的三层交互架构",
      "通过 A/B 测试验证了对话式 UX 比一次性生成留存高 40%",
      "主导 Prompt 工程策略，将输出质量评分从 3.2 提升到 4.1（满分 5）",
    ],
  },
  {
    name: "企业知识库 Agent",
    role: "产品经理",
    period: "2024",
    desc: "RAG + Agent 架构的企业内部知识问答系统，将内部信息检索效率提升 3x。",
    tags: ["RAG", "LangChain", "B2B"],
    transition:
      "从 C 端写作工具转向 B 端知识管理，是一个刻意的选择。在做写作助手的过程中我意识到：LLM 真正的杀手级应用不是「生成内容」，而是「理解和组织已有知识」。企业内部沉淀了大量非结构化信息，但员工找不到——这才是最大的痛点。",
    thinking:
      "最大的挑战不是技术，而是信任。企业用户对 AI 生成的回答天然不信任，尤其涉及内部政策、流程时。所以我们做了一个关键设计：每个回答都附带「溯源链接」——你可以点击查看 AI 是从哪份文档的哪一段得出这个结论的。这一个设计让采纳率从 30% 飙升到 78%。",
    highlights: [
      "设计了可溯源的回答展示机制，每个结论标注出处文档和段落",
      "构建了「知识新鲜度」评分系统，自动标记过期信息",
      "推动分阶段上线策略：先 IT 部门验证，再推广至全公司",
    ],
  },
  {
    name: "AI Code Review 工具",
    role: "产品设计",
    period: "2024 — 至今",
    desc: "面向开发者的 AI 辅助代码审查平台，集成 CI/CD 流程，降低 bug 率 40%。",
    tags: ["DevTool", "CI/CD", "Claude API"],
    transition:
      "做完知识库项目后，我对「AI 如何融入已有工作流」这件事产生了很深的兴趣。开发者的代码审查流程是一个完美的切入点——它足够痛（耗时、容易遗漏）、足够标准化（有明确的输入输出）、而且开发者对 AI 的接受度最高。",
    thinking:
      "开发者是最挑剔的用户群体。他们不需要你告诉他「这段代码有问题」，他们需要你解释「为什么有问题」以及「怎么改更好」。所以我们的产品定位不是「自动修 bug」，而是「AI 代码导师」——它会像一个资深工程师一样给出建设性的 review 意见，而不是简单的 lint 规则。",
    highlights: [
      "设计了「严重度分级 + 修改建议」的双层反馈机制",
      "将 AI Review 嵌入 PR 流程，零学习成本集成",
      "通过 Claude API 实现上下文感知的代码理解，准确率 92%",
    ],
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-2">
      {/* Transition thinking - 项目切换思考 */}
      {project.transition && (
        <div className="border-l-2 border-dashed border-muted-foreground/30 pl-4 py-2 mb-3">
          <p className="comment-text text-xs leading-relaxed">
            # 为什么转向这个方向？
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed mt-1">
            {project.transition}
          </p>
        </div>
      )}

      {/* Project header - clickable */}
      <div
        className="border-l-2 border-primary/30 pl-4 cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ChevronRight
              className={`w-3.5 h-3.5 text-primary transition-transform duration-200 ${
                expanded ? "rotate-90" : ""
              }`}
            />
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.name}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{project.period}</span>
        </div>
        <p className="text-xs text-muted-foreground ml-5">{project.role}</p>
        <p className="text-sm mt-1 ml-5">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5 mt-2 ml-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs border border-primary/20 text-primary bg-primary/5"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-2 ml-5 group-hover:text-primary/70 transition-colors">
          {expanded ? "▾ 收起详情" : "▸ 点击展开详细思考 (cat README.md)"}
        </p>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="ml-9 animate-fade-in space-y-3 pb-2">
          <div>
            <span className="prompt-symbol text-xs">❯ </span>
            <span className="text-xs font-medium">cat ./projects/{project.name}/README.md</span>
          </div>

          {/* Thinking */}
          <div className="bg-secondary/50 rounded-md p-4 space-y-2">
            <p className="section-title text-sm">💭 产品思考</p>
            <p className="text-sm leading-relaxed">{project.thinking}</p>
          </div>

          {/* Key highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-1.5">
              <p className="comment-text text-xs"># 关键成果</p>
              {project.highlights.map((h, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="success-text shrink-0">✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}

          <div className="text-xs success-text">
            ✓ README.md — {project.thinking.length + (project.highlights?.join("").length ?? 0)} chars loaded
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <div className="animate-fade-in space-y-4 mt-4">
      <div>
        <span className="prompt-symbol">❯ </span>
        <span className="font-medium">ls -la ./projects/</span>
      </div>

      <div className="ml-4 space-y-1">
        <p className="section-title">## 项目经历</p>
        <p className="comment-text text-xs"># 点击项目名称展开详细思考，项目间的虚线表示转型思考</p>
      </div>

      <div className="ml-4 space-y-6">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>

      <div className="mt-2 success-text text-xs">✓ {projects.length} projects found</div>
    </div>
  );
};

export default ProjectsSection;
