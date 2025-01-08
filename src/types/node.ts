export interface Node {
  id: string;           // UUID
  number: number;       // 编号，如 0, 1, 2
  sequence: string;     // 序号，如 "1", "1.1", "1.1.1"
  level: number;        // 级别，如 0, 1, 2
  title: string;        // 标题
  generateTitle: string;
  content: string;      // 内容
  generateContent: string; 
  createdAt: string;    // 创建时间 ISO 字符串
  updatedAt: string;    // 更新时间 ISO 字符串
  chatHistory: JSON[];
} 