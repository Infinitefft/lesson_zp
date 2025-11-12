# Ajax 数据请求
    Ajax 全程 Asynchronous(异步) JavaScript and XML(JSON)

- 流程
    - 实例化 new XMLHttpRequest();
    - open 打卡一个请求
        method GET POST
        url(接口地址)
        async true false
    - send 发送请求
    - 事件监听
        - onreadystatechange 
            status 200
            readyState 4
            JSON.parse(xhr.responseText);  // 解析JSON 字符串
    - readyState
        - 0 未初始化
        - 1 已打开
        - 2 已发送
        - 3 已接收
        - 4 完成