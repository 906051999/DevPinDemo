export interface Node {
  id: string;           // UUID
  sequence: string;     // 序号，如 "1", "1.1", "1.1.1"
  level: number;        // 级别，如 0, 1, 2
  title: string;        // 标题
  content: string;      // 内容
  createdAt: string;    // 创建时间 ISO 字符串
  updatedAt: string;    // 更新时间 ISO 字符串
} 