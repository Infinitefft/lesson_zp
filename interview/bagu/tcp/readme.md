## TCP/IP

- FP  First Paint 首次渲染时间
从页面加载到首次开始绘制的时长

FP = TTFB（DNS 解析时间（ip查找+负载均衡） + TCP/TLS + server执行时间（慢查询）
+ 响应下载时间 + HTML DOM树构建时间 + CSSOM树构建时间 + 构建渲染树（RenderTree）
+ 布局树 + 首次渲染）

TTFB: Time To First Byte

前端性能标准，页面加载的速度，页面的打开速度是关键指标
用户的留存、付费欲望、PV（Page View）UV（Unique Visitor）

- 网络加载速度
  网络优化，OSI七层架构、IP、TCP/UDP、HTTP、TLS
  - HTTP 是基于TCP/IP
  如何去优化 Web 性能，轻松定位 Web 问题

- 一个数据包的旅程

互联网，实际是一套理念和协议（不同版本）组成的体系架构

互联网中的数据是通过数据包来传输的
如果数据比较大？利用带宽、多路复用
数据拆分成很多小数据包来传输，提升带宽的利用率和并发效率

二进制数据帧

- IP地址 将数据包送到目的主机
Internet Protocol 计算机的地址
丢失数据包，出错

- 传输层
  数据的到达
  UDP 机器上的某个应用（端口号）
  UDP 数据报协议 简单，快速，音视频

- UDP 解决不了结构严格的HTML等 Web 资源

- TCP
  浏览器请求、邮件要求数据传输可靠性的应用，如果使用UDP
  - 数据包在传输过程中容易丢失
    过期时间 重传
  - 数据包在不同的时间到达接收端
    序号，组装
  慢一点，完整到达

确认
- 三次握手
  - 建立连接
  SYN(Synchronize Sequence Number) 同步序列号
  - A 请求 SEQ  j(SYN 随机的)
  - B 响应 ACK(Acknowledgement 确认) j+1

  发送数据以及接收数据的能力
  每一方的发送和接收要2次，握手四次
  第二次的时候可以响应对方的发送能力 同时希望对方确认我们的发送能力
  