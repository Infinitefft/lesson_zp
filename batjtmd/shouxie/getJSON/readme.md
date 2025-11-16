# getJSON

- ajax 与 fetch 相比
    - fetch 简单易用，基于 Promise 实现
      （then），无需回调函数
    - ajax 基于回调函数实现，代码复杂
- 如何封装一个getJSON 函数，使用ajax
    支持promise
    - get 请求方法
    - 返回时JSON
    - ajax thenable