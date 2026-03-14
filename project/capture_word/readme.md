# 拍照记单词

## AI 时代
- vibe coding
  代码和项目开发变得快速且靠谱

- opc
  one person company
  创意、规划、商业、共情
  AI产品经理

## 单词类App
- 市场调研
- 百词斩
  细分领域 背单词
  单词和形象的图片结合
  awkard 尴尬的
  giraffe 长颈鹿
- 扇贝
  智能间隔重复算法
  精确规划复习时间，确保单词再即将遗忘时被强化，长期记忆。

## 大模型
- 互联网所有的产品值得用AI重新做一遍。
  - AIGC
  - Agent
- 拍照记单词
  - 多邻国
  - 产品点？
  - 需求
    开发需求
  - 场景
    跨国生活、旅游、点餐
  - 痛点
    足够痛 请需求

## 产品原型
- 拍照/上传图片
- 调用kimi接口，解析图片，得到单词和例句
- 点击播放按钮
- 最核心功能的表达，这么交互的，有哪些页面

## 设计稿


## 技术调研



## 大模型
- 多模态模型  kimi-shot
moonshot-v1-8k-vision-preview
- tts  text to speech


### 技术栈
- 前端 vue3+ts
- 后端 nestjs

## 开发


### 产品亮点

- 无障碍访问
  label  for + input#id
  帮助使用读屏器的盲人使用
  input[type="file"] 比较难控制样式
  display: none;  for id 来关联控制样式
  
- Prompt 设计
  - AIGC 产品里 Prompt 设计是比较核心的
  - 清晰的指令
    1个单词，A1 ~ A2 级别
  - outputParser 输出格式JSON，业务的持续执行
  - 产品的设计 对齐
  - 多模态模型的接口标准
  content 数组 图片，
  base64格式：字符编码（html5）Base64 是一种基于 64 个可打印 ASCII 字符，将 8 位（8-bit）字节序列（二进制数据）编码为文本字符串的表示方法。它的设计初衷是为了在那些只允许传输 7 位 ASCII 字符的旧系统中（比如 SMTP 电子邮件系统），能够安全地传输 8 位二进制数据（如图片、可执行文件），防止数据在传输过程中因为特殊控制字符（如换行符、终止符）被误截断或篡改。

- 文件上传体验
  - type="file" input + accept
  - 上传慢慢长夜，即时显示图片
    - FileReader js 读取本地文件、调用摄像头
    - readDataAsURL(file)
    - onload base64