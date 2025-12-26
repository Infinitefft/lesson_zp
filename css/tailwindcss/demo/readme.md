# 原子 css

- bad
  样式带有太多的业务属性，在一个或少数类名，样式几乎不能复用
- 面向对象css
  - 封装 基类
  - 多态 业务
  - 组合

- 将我们的 css 规则拆分成原子css
  - 会有大量的基类 好复用
  - 可以组合起来
  - tailwindcss 是一个原子css框架
    几乎不用再写 css 了
  - tailwindcss 原子css 类名
    llm 自然语言处理
    - 生成界面？
    prompt 描述布局、风格和语义化好的
    tailwindcss
  - 不用离开html 写 css 了

## tailwindcss 配置
- 安装 tailwindcss 和 vite 插件
- vite.config.js 配置

## Fragment
文档碎片结点
- 解决react 单一根节点问题
  树状结点，好遍历
- 不渲染到页面上 杜绝了额外且不需要的 div 结点。
react 中 <></> Fragment 组件，唯一的根节点，性能优化