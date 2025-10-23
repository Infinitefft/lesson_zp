# HTML5 敲击乐

## HTML5 web 应用
- 编写页面结构
- 模块化职责分离
    专业、可维护、可扩展
    css 负责样式 link 在head 引入
    js 负责交互 script 在 body 的底部 引入
- 浏览器是执行前端代码的程序
    - 下载并解析HTML 结构
    - link 引入css
    html（结构） + css（样式） 结合 就能看到**静态**页面了
    前端的天职是 快速实现页面
    - script 交互放到后面
        阻塞html的下载和执行

## 静态页面
HTML & CSS  生成静态页面
- CSS Reset 的作用是通过统一或清除不同浏览器对HTML元素的默认样式差异，为样式开发提供一个一致、可预测的基础。
- * 选择器，匹配所有元素，性能不好
- 业界推荐的css reset 
    列出所有的元素，代替*
- html 结构
    通过选择器
        标签选择器
        类选择器
- 背景的使用
    background-size cover|contain
    cover 以盒子为主，背景图片会等比例放大/收缩，覆盖整个盒子，可能会有部分背景图片被裁剪
    contain 以背景图片为主，背景图片会等比例放大/收缩，直到在盒子里面完全显示图片。
    background-position bottom center
    background-repeat no-repeat
- rem, vh 相对单位，解决移动端 设备尺寸不一致的问题
    建议不要使用px 这种绝对单位
    vh 相对于视窗
    rem 相对于html 根元素的字体大小
        html font-size 10px

- flex + 居中 完成 布局
    - display: flex; 弹性布局魔法，手机尺寸不一致，弹性布局
        9个.key 子元素就不会换行了（块级），在一行
    - justify-content: center; 水平居中
    - align-items: center; 垂直居中
- 使用vh, rem 单位代替px 绝对单位，适配移动端