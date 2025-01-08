import { z } from 'zod'

// 基础节点结构
const NodeSchema = z.object({
  title: z.string().max(30),
  description: z.string(),
  type: z.enum(['project', 'feature', 'task', 'bug']),
})

// 根节点解析
const RootNodeSchema = NodeSchema.extend({
  features: z.array(z.string())
})

// 子节点解析
const ChildNodeSchema = NodeSchema.extend({
  priority: z.number().min(1).max(3),
  status: z.enum(['pending', 'in-progress', 'done']),
  dependencies: z.array(z.string()).optional(),
})

// 结构分析解析
const StructureAnalysisSchema = z.object({
  mergeProposals: z.array(z.object({
    nodes: z.array(z.string()),
    reason: z.string(),
    mergedNode: z.object({
      title: z.string(),
      description: z.string(),
    })
  })),
  splitProposals: z.array(z.object({
    node: z.string(),
    reason: z.string(),
    suggestedNodes: z.array(z.object({
      title: z.string(),
      description: z.string(),
    }))
  })),
  removeProposals: z.array(z.object({
    node: z.string(),
    reason: z.string(),
  })),
  structuralIssues: z.array(z.string())
})

// 节点评估解析
const NodeEvaluationSchema = z.object({
  evaluation: z.object({
    complexity: z.enum(['low', 'medium', 'high']),
    estimatedDays: z.union([z.string(), z.number()]).transform(val => 
      typeof val === 'string' ? parseFloat(val) : val
    ),
    priority: z.number().min(1).max(3),
    risks: z.array(z.object({
      description: z.string(),
      impact: z.string(),
      mitigation: z.string()
    }))
  }),
  dependencies: z.array(z.object({
    type: z.enum(['technical', 'business']),
    description: z.string()
  })),
  suggestions: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    acceptanceCriteria: z.array(z.string()),
    implementationTips: z.array(z.string())
  })
})

export class AIResponseParser {
  static parseRoot(response: string) {
    try {
      const json = this.extractJSON(response)
      return RootNodeSchema.parse(json)
    } catch (e) {
      console.error('Failed to parse root node:', e)
      return this.fallbackRoot(response)
    }
  }

  static parseSplitNodes(response: string) {
    try {
      const json = this.extractJSON(response)
      return z.object({
        nodes: z.array(ChildNodeSchema)
      }).parse(json)
    } catch (e) {
      console.error('Failed to parse split nodes:', e)
      return this.fallbackSplit(response)
    }
  }

  static parseStructureAnalysis(response: string) {
    try {
      const json = this.extractJSON(response)
      return StructureAnalysisSchema.parse(json)
    } catch (e) {
      console.error('Failed to parse structure analysis:', e)
      return this.fallbackAnalysis(response)
    }
  }

  static parseNodeEvaluation(response: string) {
    try {
      const json = this.extractJSON(response)
      return NodeEvaluationSchema.parse(json)
    } catch (e) {
      console.error('Failed to parse node evaluation:', e)
      return this.fallbackEvaluation(response)
    }
  }

  private static extractJSON(text: string) {
    try {
      // 找到文本中的第一个 JSON 对象
      const match = text.match(/\{[\s\S]*\}/)
      return match ? JSON.parse(match[0]) : {}
    } catch (e) {
      throw new Error('Invalid JSON format')
    }
  }

  // 降级处理方法
  private static fallbackRoot(response: string) {
    return {
      title: '解析失败的节点',
      description: response.slice(0, 100),
      type: 'project' as const,
      features: ['需要手动处理']
    }
  }

  private static fallbackSplit(response: string) {
    return {
      nodes: [{
        title: '解析失败的节点',
        description: response.slice(0, 100),
        type: 'task' as const,
        priority: 3,
        status: 'pending' as const
      }]
    }
  }

  private static fallbackAnalysis(response: string) {
    return {
      mergeProposals: [],
      splitProposals: [],
      removeProposals: [],
      structuralIssues: ['解析失败，需要手动处理']
    }
  }

  private static fallbackEvaluation(response: string) {
    return {
      evaluation: {
        complexity: 'medium' as const,
        estimatedDays: 1,
        priority: 3,
        risks: [{
          description: '解析失败',
          impact: '需要手动处理',
          mitigation: '请检查原始响应'
        }]
      },
      dependencies: [],
      suggestions: {
        acceptanceCriteria: ['需要手动处理'],
        implementationTips: ['请检查原始响应']
      }
    }
  }
} 