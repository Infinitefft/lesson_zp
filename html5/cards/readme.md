# css 超级 stylus

- 更快的css
css rules css file
选择器 {} :;
.card {
    width: 45px;
    height: 45px;
}
- stylus css 超级
    npm i -g stylus
- Stylus 是一门富有表现力的 CSS 预处理器，语法简洁优雅，支持变量、函数、混合（mixins）、嵌套等特性，能大幅提升 CSS 的编写效率和可维护性。
    但是浏览器只能解析css，sylus 是一种预处理器，所以需要编译成css

- 编译脚本
    stylus style.styl -o style.css -w
- 弹性布局
    - display: flex;   弹性格式化上下文
    - 移动端布局的主角
    - 父子（们）一起的一种布局方案
    - 子元素块级能力丢失，不会换行，多列布局？
    - justify-content（水平） align-items
        flex 专用
        默认 flex-direction rowj | Column
        justify-content 主轴对齐
        align-items 侧轴对齐
    子元素们设置flex 1 等比例分配空间
    &.active 这个嵌套是和上级是同一级别 .penel一个状态

- transition 过渡动画
    比animation 简单,没有keyframes,属性的改变添加过渡动画效果
    transition all 700ms ease-in
    all 任何属性的改变
    700ms 过渡时间 transition-duration
    ease-in 过渡效果 transition-timing-function
    transition opacity 300ms ease-in 400ms
    transition-delay 延迟时间

- @media (max-width: 480px)
    媒体查询 响应式布局
    iphone 414px
    max-width: 480px 查询条件
    对特定设备适配

- stylus 增强了css的编程性
    - 嵌套
    模块化的能力
    作用域
    自动添加前缀