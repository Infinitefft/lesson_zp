# 星物种

- 公司
  方向 机器人AI
  A轮 有价值的公司
  薪资 150 ~ 250 杭州的中等薪资
  前端团队规模（有没有人带）开发流程
  
## 浏览器的渲染机制
- 脑海之中要有一张图

- 首先，浏览器拿到URL 之后会发起网络请求，开始下载HTML。
HTML是流式解析的，也是边下载边解析。HTML解析器会把标签逐步解析成 DOM Tree。
在解析过程中如果遇到link，style 等css请求，浏览器会发起css请求，并交给css解析器，生成CSSOM Tree。

- 接着，如果在解析HTML的过程中遇到了JavaScript，默认情况下JS会阻塞DOM构建（document.title 修改节点）。浏览器会暂停DOM 解析，交给 V8 引擎执行JS，执行完之后再继续解析HTML。

- 然后，当DOM Tree 和 CSSOM Tree 都构建完之后和并生成 Render Tree（渲染树）。
  渲染树只包含需要显示的节点，display：none的节点不会进入渲染树。

- 接着进入Layout（回流/重绘）阶段，浏览器会根据盒模型、位置、尺寸等信息，计算每个元素在页面中的几何位置和大小，生成布局树

- 然后是 Paint（绘制），浏览器会把每个元素的颜色、背景、阴影、边框等绘制出来。

- 最后进入Composite（合成）阶段。浏览器会把页面拆成多个图层，比如 transform、opacity、position：fixed、动画等元素可能单独成为合成层，然后交给GPU做图层合并，最终显示到屏幕上。

总结：HTML 解析 -> DOM 树 -> CSSOM 树 -> Render Tree -> Layout -> Paint -> Layer -> Composite

- html 优化
  - 语义化标签，有利于 SEO，也利于代码维护，而不是通篇优化
  - 合理使用id/class，避免重复的选择器，便于样式与脚本维护
  - 懒加载 非首屏DOM/资源，图片懒加载，降低渲染压力。
  - 避免频繁操作DOM，可先缓存节点或用文档碎片批量更新 
    document.createDocumentFragment();

- css 优化
  - * 通配符，换成标签选择
  - 小图片（icon）转base64 减少http请求，大资源任用外链避免css体积过大。
  - 抽离通用样式，减少代码冗余。（面向对象）
  - 合理使用css 变量，统一主题样式，便于维护
  - 避免使用 !important
  - tailwindcss 原子类，很少需要去手写样式
    - 原子类css，组合样式，无需写css
    - 原子类名语义化，减少命名成本
    - 团队风格统一，降低沟通成本
    - 按需编译，体机可控，适配响应式

- script
  - 放底部，避免阻塞DOM解析
  - <script src="" defer></script>
    <script src="" async></script>
    不会阻塞 DOM 树的生成
    defer DOM 下载完后去下载
    async 异步下载 下载后就执行
  - 变量使用let/const 减少全局变量污染
  - 频繁DOM操作先缓存节点，批量更新
  - 函数拆分复用，避免冗长代码
  - 异步逻辑使用async/await，替代回调地狱

- 性能优化
  - 减少回流，重绘
  回流一定会触发重绘
  回流需要计算几何位置和尺寸，代价非常高
  - 触发方式：
    修改 width/weight/margin/padding
    修改 fontsize
    DOM 插入删除
    读取布局属性 el.offsetHeight 
    el.getBoundingClientRect() 元素相对视窗的关系


## GET 和 POST 的区别，以及一次 HTTP 请求包含哪些信息
- 核心区别
从Restful HTTP 语义上来说，GET 是用来获取资源的，POST 是提交数据创建资源的。

- 数据传输方式上
  GET的参数一般放在URL QueryString 里
  /api/user?id=123&name=张三  长度受限（2kb-8kb）
  POST 数据一般放在Request Body：
  GET 不是不可以发送请求体，只是服务器和浏览器约定不用。

- 安全性
  GET/POST 都是明文传输，POST 相对安全一些，安全性是来自于 HTTPS 加密传输。

- 幂等性
  HTTP 是无状态的
  GET n 次请求都一样
  POST 不一样的

- 缓存
  GET 会缓存
  POST 一般不缓存

- 包含的信息
  - 请求行 请求方法 GET/POST/PUT/DELETE/PATCH/OPTIONS/HEAD 等
  请求路径、HTTP 版本
  - 请求头
    Authorization: Token
    Cookie
    Content-Type
  - 请求体 一般出现在POST/PUT/PATCH 请求中

- 为什么TCP需要三次握手
  确认双方发送接收能力
  SYN + ACK
  开始的接收方在发送应答ACK消息的同时，可以发送 SYN 消息