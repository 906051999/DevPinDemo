type ModelType = 'gemini-exp-1206' | 'gemini-2.0-flash-exp'

interface ChatOptions {
  model?: ModelType
  enableTools?: boolean
  streaming?: boolean
}

// prompt预设
export const PROMPT_PRESETS = {
  // 根节点生成 - 专注于项目整体分析
  generateRoot: (text: string) => `
作为项目分析专家，请分析以下内容，生成项目的根节点信息。要求：
1. 项目标题要简洁且具有描述性
2. 项目描述需要完整概括项目的目标、价值和核心功能，要完整包含原始内容的表达含义，不要遗漏
3. 从宏观角度总结关键特性，为后续拆分做准备

请以 JSON 格式输出：
{
  "title": "项目标题(限20字)",
  "description": "项目整体描述(包含项目目标、价值、核心功能)",
  "type": "project",
  "features": [
    "- 核心特性1",
    "- 核心特性2"
  ]
}

原始内容：
${text}`,

  // 节点拆分 - 通用的节点分解逻辑
  splitNode: (text: string) => `
作为需求分析师，请将当前节点拆分为具体可执行的子节点。要求：
1. 每个子节点必须是独立可实现的最小功能单元
2. 子节点之间应该逻辑关联但相互独立
3. 优先级基于实现依赖关系和业务重要性

请以 JSON 格式输出：
{
  "nodes": [
    {
      "title": "子节点标题(限15字)",
      "description": "详细的功能描述，包含实现目标和验收标准",
      "type": "feature | task | bug",
      "priority": 1-3,
      "status": "pending",
      "dependencies": ["依赖的其他节点标题，可选"]
    }
  ]
}

当前节点内容：
${text}`,

  // 节点结构优化建议 - 从整体角度分析和优化
  analyzeStructure: (nodes: string) => `
作为需求分析专家，请对当前节点结构提供优化建议。要求：
1. 识别结构性问题
2. 提供具体的优化方案
3. 确保优化后的结构更合理和高效

请以 JSON 格式输出：
{
  "mergeProposals": [
    {
      "nodes": ["待合并节点1", "待合并节点2"],
      "reason": "合并理由",
      "mergedNode": {
        "title": "合并后的标题",
        "description": "合并后的描述"
      }
    }
  ],
  "splitProposals": [
    {
      "node": "待拆分的节点",
      "reason": "拆分理由",
      "suggestedNodes": [
        {
          "title": "建议的子节点标题",
          "description": "建议的子节点描述"
        }
      ]
    }
  ],
  "removeProposals": [
    {
      "node": "建议删除的节点",
      "reason": "删除理由"
    }
  ],
  "structuralIssues": [
    "结构问题描述"
  ]
}

当前节点列表：
${nodes}`,

  // 单节点评估 - 深入分析单个节点
  evaluateNode: (text: string) => `
请对该节点进行全面评估。要求：
1. 评估实现复杂度和工作量
2. 分析潜在风险和依赖
3. 提供具体的优化建议

请以 JSON 格式输出：
{
  "evaluation": {
    "complexity": "low|medium|high",
    "estimatedDays": "预估工作天数",
    "priority": 1-3,
    "risks": [
      {
        "description": "风险描述",
        "impact": "影响程度",
        "mitigation": "建议的规避措施"
      }
    ]
  },
  "dependencies": [
    {
      "type": "technical|business",
      "description": "依赖描述"
    }
  ],
  "suggestions": {
    "title": "优化后的标题(如需要)",
    "description": "优化后的描述(如需要)",
    "acceptanceCriteria": [
      "验收标准1",
      "验收标准2"
    ],
    "implementationTips": [
      "实现建议1",
      "实现建议2"
    ]
  }
}

节点内容：
${text}`
}

// 配置预设
export const PRESETS = {
  default: {
    model: 'gemini-2.0-flash-exp' as ModelType,
    enableTools: false,
    streaming: false
  },
  search: {
    model: 'gemini-2.0-flash-exp' as ModelType,
    enableTools: true,
    streaming: false
  },
  stream: {
    model: 'gemini-2.0-flash-exp' as ModelType,
    enableTools: false,
    streaming: true
  },
  vision: {
    model: 'gemini-2.0-flash-exp' as ModelType,
    enableTools: false,
    streaming: false
  }
}

export async function chat(prompt: string, options: ChatOptions = PRESETS.default) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      ...options
    })
  })

  if (options.streaming) {
    return response
  }

  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data.text
}

// 直接使用指定预设的方法
export const generateRoot = (text: string) => chat(PROMPT_PRESETS.generateRoot(text), PRESETS.default)
export const splitNode = (text: string) => chat(PROMPT_PRESETS.splitNode(text), PRESETS.default)
export const analyzeStructure = (nodes: string) => chat(PROMPT_PRESETS.analyzeStructure(nodes), PRESETS.default)
export const evaluateNode = (text: string) => chat(PROMPT_PRESETS.evaluateNode(text), PRESETS.default)

// 使用预设的便捷方法
export const chatWithDefault = (prompt: string) => chat(prompt, PRESETS.default)
export const chatWithSearch = (prompt: string) => chat(prompt, PRESETS.search)
export const chatWithStream = (prompt: string) => chat(prompt, PRESETS.stream)

// 未支持
export const chatWithVision = (prompt: string) => chat(prompt, PRESETS.vision) 