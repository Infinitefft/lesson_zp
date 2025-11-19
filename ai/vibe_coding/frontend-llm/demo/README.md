# 通用HTML/CSS/JS项目

这是一个基于原生HTML、CSS和JavaScript构建的通用项目模板，提供了响应式设计、基本交互功能和模块化结构，可以作为各种Web项目的起点。

## 项目结构

```
demo/
├── index.html         # 主HTML文件
├── css/               # CSS样式文件夹
│   └── style.css      # 主样式文件
├── js/                # JavaScript文件夹
│   ├── main.js        # 主JavaScript文件
│   └── components/    # 可复用组件
│       └── stats.js   # 统计数据组件
├── assets/            # 静态资源文件夹
│   └── favicon.svg    # 网站图标
└── README.md          # 项目说明文档
```

## 功能特性

### 1. 响应式设计
- 适配桌面、平板和移动设备
- 灵活的网格布局系统
- 媒体查询断点优化

### 2. 交互功能
- 移动端汉堡菜单
- 平滑滚动导航
- 返回顶部按钮
- 表单验证和提交
- 动态统计数据展示

### 3. 设计亮点
- 现代化UI设计
- 渐变色彩方案
- 微动画和过渡效果
- 视觉层次和深度
- 统一的设计语言

### 4. 代码组织
- 模块化JavaScript结构
- 语义化HTML5标签
- 变量化CSS设计系统
- 组件化思想

## 如何使用

### 基本使用

1. 克隆或下载项目到本地
2. 直接在浏览器中打开 `index.html` 文件
3. 开始定制和扩展项目

### 开发环境设置

虽然这是一个纯前端项目，但您可以使用任何静态文件服务器来提供更好的开发体验：

```bash
# 使用Python的内置HTTP服务器
python -m http.server 3000

# 或使用Node.js的http-server
npm install -g http-server
http-server -p 3000
```

然后在浏览器中访问 `http://localhost:3000`。

## 定制指南

### 修改内容

1. **修改HTML内容**：编辑 `index.html` 文件，更新标题、段落和其他内容
2. **更改样式**：修改 `css/style.css` 文件中的CSS变量来自定义颜色、字体和间距
3. **添加功能**：扩展 `js/main.js` 文件或在 `js/components/` 目录下创建新组件

### 自定义CSS变量

在 `style.css` 文件顶部的 `:root` 选择器中，您可以修改以下关键变量：

```css
:root {
    /* 颜色变量 */
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    
    /* 字体变量 */
    --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    /* 间距变量 */
    --spacing-md: 1rem;
    --spacing-lg: 2rem;
    
    /* 更多变量... */
}
```

### 添加新组件

1. 在 `js/components/` 目录下创建新的JavaScript文件
2. 遵循现有的组件模式（如 `stats.js`）
3. 在 `main.js` 中添加加载代码

## 浏览器兼容性

该项目在以下浏览器中测试通过：

- Google Chrome (最新版)
- Mozilla Firefox (最新版)
- Apple Safari (最新版)
- Microsoft Edge (最新版)

## 性能优化

- 内联关键CSS
- 延迟加载非关键JavaScript
- 使用SVG图标减少HTTP请求
- 优化图像（如果添加）
- 减少不必要的DOM操作

## 许可证

本项目采用MIT许可证。您可以自由使用、修改和分发本项目。

## 贡献

欢迎提交问题和功能请求！如果您想为项目做出贡献，请fork仓库并创建pull request。

## 后续开发建议

1. 添加更多交互组件（如轮播图、模态框等）
2. 集成CSS预处理工具（如Sass或Less）
3. 添加自动化构建流程
4. 实现暗色模式切换
5. 添加更多响应式布局组件

---

祝您开发愉快！