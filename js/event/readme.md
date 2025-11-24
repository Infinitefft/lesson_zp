# JS 怎么监听事件

- 事件怎么发生？
    - DOM 树
    - 页面是画出来的(平面)
        - 捕获阶段(capture)
            document 开始，一层一层缩小范围
            parent 节点上添加了click 事件的监听
        - 目标阶段 event.target  child  
        - 冒泡阶段(bubble)
            决定谁先执行
            
## 事件机制
- JS 核心特征事件机制
- JS 时间是异步的
    - 先注册
        DOM0 DOM2 不同阶段的标准
        - 别的注册方案 DOM 0级事件 模块化不好，不推荐
        - dom 节点上 addEventListener('click') DOM 2级事件
    - 触发时才执行，异步
    - addEventListener(event_type, callback, useCapture)
    useCapture 可选参数 默认为 false 在冒泡阶段执行
    true 在捕获阶段执行

- 事件监听不可以在集合上
    一定是的单个 DOM
- 事件监听内存开销很大
- event.target 事件触发的元素