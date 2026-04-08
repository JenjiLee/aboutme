import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface Project {
  name: string;
  role: string;
  period: string;
  desc: string;
  tags: string[];
  thinking: string;
  transition?: string;
  highlights?: string[];
}

const workProjects: Project[] = [
  {
    name: "字节跳动 · 抖音",
    role: "Agent 产品经理",
    period: "2025.10 — 至今",
    desc: "负责 C 端创作者 AI Agent 产品的回答质量与体验设计，完读率提升 10%+，人均对话数提升 5%+",
    tags: ["C端 Agent", "SFT+RL", "评测体系", "体验设计"],
    thinking:
      "C 端 Agent 的核心挑战不是「能不能回答」，而是「用户愿不愿意读完、读完后会不会继续聊」。所以我定义了「清晰阅读→完整理解→触发追问」的体验漏斗，把完读率和下一轮对话率作为北极星指标。当 prompt 优化触及天花板后，推动了 SFT+RL 后训练路径，用用户真实追问行为作为正向反馈信号回流，让模型自己学会什么样的回答能引发深度对话。",
    highlights: [
      "定义回答容器的信息层级、结构化表达与可执行建议的呈现方式",
      "推动统一所有语义场景下 generator 的 input 架构，收敛为可扩展的通用框架",
      "推动垂类知识引入从 RAG 升级为 Skills，垂直场景输出质量评估提升 20%",
      "建立分场景评测框架，从端到端结果评测升级为 Agent 轨迹评测",
      "自主接入 CLI Skills 于 Codex，大幅提升效果迭代效率",
    ],
  },
  {
    name: "阿里巴巴 · ACCIO",
    role: "AI 产品经理",
    period: "2024.07 — 2025.10",
    desc: "负责 Accio 从 AI 搜索引擎向 Agent 产品转型，Agent 模式上线后采购转化率提升 5%，DAU 增长 30%",
    tags: ["B2B Agent", "商业化", "Stripe", "评测框架"],
    transition:
      "从字节的 C 端 Agent 回看阿里这段经历，B2B 采购场景是我理解 Agent 产品边界的关键一步。C 端追求的是「体验」，B 端追求的是「信任」——用户愿意让 Agent 代替自己做到哪一步？这个信任边界的设计思考贯穿了整个产品。",
    thinking:
      "B2B 采购的核心矛盾是：用户需求复杂（材质、认证、MOQ、交期），但传统搜索只支持短词交互。Agent 的价值在于把复杂需求拆解为多步可执行的 plan。但关键设计决策是 Agent 的介入深度——从辅助选品延伸至主动联系供应商、自动发询盘，每一步都需要在用户信任边界内。商业化上，初期的 SaaS 次数制定价暴露了 Agent 场景的本质问题：单次任务复杂度方差极大，次数制无法反映真实成本与用户价值感知，推动了定价模型的根本性迭代。",
    highlights: [
      "设计 Agent 多步任务框架，包括 plan 的生成与用户编辑机制、各环节 function 的选择性透出策略",
      "与算法团队共建 Agent 全机器评测框架，定义 Plan 与 Result 两层原子评估维度",
      "从 0→1 构建 Agent 付费体系，完成 Stripe 支付链路打通，付费转化率 20%+",
      "设计渐进式付费策略——基础功能免费体验，高级 function 设置付费墙",
    ],
  },
];

const internProject: Project = {
  name: "真格基金",
  role: "AIGC 投资分析师",
  period: "2022.11 — 2023.05",
  desc: "参与 AI 行业研究与 50+ AIGC 项目沟通，深度参与 2 个项目的全流程尽调与融资",
  tags: ["VC", "AIGC", "行业研究", "尽调"],
  thinking:
    "VC 的经历让我建立了从市场和商业角度审视 AI 产品的视角。跟 50+ 创始人聊过之后，我发现大多数 AIGC 创业的失败不是技术问题，而是找不到真正的 PMF。这段经历深刻影响了我后来做产品的方式——永远先验证需求，再考虑技术方案。",
  highlights: [
    "覆盖文本、图片、视频、音频、3D 等多条技术线，社交、电商、游戏等多个场景",
    "某 AIGC+社区项目 Pre-A 轮：发展路径明确，战略定位清晰",
    "某智能场内物流 B 轮：未来生产方式变更，技术稀缺性高",
  ],
};

interface SideProject {
  name: string;
  role: string;
  period: string;
  desc: string;
}

const sideProjects: SideProject[] = [
  { name: "剪辑工具", role: "Creator", period: "2026.03", desc: "一天 Vibe Coding 生产软件，可实现批量剪辑操作+封面等操作" },
  { name: "小微助理", role: "产品", period: "2023.07 — 2023.10", desc: "搭载在微信平台上的 AI 对话系统，面向小 B 商家与 KOL 对接问题" },
  { name: "不绘 AI", role: "算法", period: "2022.11 — 2022.12", desc: "AIGC 文生图社区产品上线 & 拿到政府融资，基于 Stable Diffusion Fine-tune" },
];

interface Paper {
  title: string;
  period: string;
  citation: string;
}

const papers: Paper[] = [
  { title: "自动 Prompt 优化", period: "2022 — 2023", citation: "Y.Li, H.Huang, Auto-Prompt Optimization Through Definition and Error Correction, Preprint" },
  { title: "跨模态检索", period: "2021 — 2022", citation: 'Y. Li et al., "NAC: Mitigating Noisy Correspondence in Cross-Modal Matching via Neighbor Auxiliary Corrector," ICASSP 2024' },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-2">
      {project.transition && (
        <div className="border-l-2 border-dashed border-muted-foreground/30 pl-4 py-2 mb-3">
          <p className="comment-text text-xs leading-relaxed"># 转型思考</p>
          <p className="text-xs text-muted-foreground leading-relaxed mt-1">{project.transition}</p>
        </div>
      )}

      <div
        className="border-l-2 border-primary/30 pl-4 cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ChevronRight
              className={`w-3.5 h-3.5 text-primary transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
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
            <span key={tag} className="px-2 py-0.5 rounded text-xs border border-primary/20 text-primary bg-primary/5">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2 ml-5 group-hover:text-primary/70 transition-colors">
          {expanded ? "▾ 收起详情" : "▸ 点击展开详细思考 (cat README.md)"}
        </p>
      </div>

      {expanded && (
        <div className="ml-9 animate-fade-in space-y-3 pb-2">
          <div>
            <span className="prompt-symbol text-xs">❯ </span>
            <span className="text-xs font-medium">cat ./projects/{project.name}/README.md</span>
          </div>
          <div className="bg-secondary/50 rounded-md p-4 space-y-2">
            <p className="section-title text-sm">💭 产品思考</p>
            <p className="text-sm leading-relaxed">{project.thinking}</p>
          </div>
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
        <span className="font-medium">ls -la ./experience/</span>
      </div>

      <div className="ml-4 space-y-1">
        <p className="section-title">## 工作经历</p>
        <p className="comment-text text-xs"># 点击项目名称展开详细思考</p>
      </div>

      <div className="ml-4 space-y-6">
        {workProjects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>

      {/* Intern */}
      <div className="ml-4 mt-6 space-y-1">
        <p className="section-title">## 实习经历</p>
      </div>
      <div className="ml-4">
        <ProjectCard project={internProject} />
      </div>

      {/* Side projects */}
      <div className="ml-4 mt-6 space-y-1">
        <p className="section-title">## 个人探索</p>
      </div>
      <div className="ml-4 space-y-3">
        {sideProjects.map((p, i) => (
          <div key={i} className="border-l-2 border-muted-foreground/20 pl-4">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <span className="font-semibold text-foreground text-sm">{p.name}</span>
              <span className="text-xs text-muted-foreground">{p.period}</span>
            </div>
            <p className="text-xs text-muted-foreground">{p.role}</p>
            <p className="text-sm mt-0.5">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Papers */}
      <div className="ml-4 mt-6 space-y-1">
        <p className="section-title">## 科研成果</p>
      </div>
      <div className="ml-4 space-y-3">
        {papers.map((p, i) => (
          <div key={i} className="border-l-2 border-muted-foreground/20 pl-4">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <span className="font-semibold text-foreground text-sm">{p.title}</span>
              <span className="text-xs text-muted-foreground">{p.period}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{p.citation}</p>
          </div>
        ))}
      </div>

      <div className="mt-2 success-text text-xs">✓ all records loaded</div>
    </div>
  );
};

export default ProjectsSection;
