# RAG

- llm 的知识来源？
  训练时的时候会给它数据
- llm 的幻觉？
  AIGC
  问了llm 不知道的问题，他会认认真真地胡乱回答。
- RAG 可以解决llm 的幻觉
  - llm thinking planing 
  - 检索增强
  - Augument Prompt
  - 如果没有匹配到？ 不知道

## RAG

- Retriver
  - 原始的prompt embedding
  - 知识库 提前embedding 好的
  - consine 相似度计算

- 知识库
  - 专家知识库
  - 企业私有/安全知识库
  - 各种类型的文件，txt pdf mp3 video
  - 大的文件切片，document 文档碎片
  - embedding化了

- Augument 增强
  - 原始的Prompt 增加 检索出来的几段相关文档


- Generation 生成
  - llm 拿到增强的prompt 完美解答


## 向量表达？

- 关键词的文本匹配不能实现语义搜索
  - 查询文中提到的水果，苹果，香蕉，荔枝等？
- 向量 Vector

  用数字表达一个存储的信息

  - 食用性 0(无) ~ 1(高)
  - 硬度 0(软) ~ 1(硬)

  水果 [0.9, 0.3] 食用性极高，中等硬度
  苹果 [0.9, 0.5] 中等硬度
  香蕉 [0.9, 0.1]
  石头 [0.1, 0.9] 

- 语义化搜索的流程
  - 向量每个维度有独特的语义（食用性、硬度）
  - 可视化