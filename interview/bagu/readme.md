# 春招八股

- 从 URL 输入到页面展示，中间经历了什么，越详细越好。
  - 经典考题 80%
  - 前端渲染
  - 计算机网络
  - 操作系统 进程间的通信
  - 专业 + 专业课
- 回答策略
  不要崩知识点，按知识体系、清晰的组织表达逻辑。

## 架构图

- 操作系统考点
  - 进程：分配资源的最小单元（process）
  - 线程：执行的最下单元 thread
    - 浏览器是多进程架构，整个进程需要各个进程之间的配合。
      - 浏览器主进程
      - 提供用户的操作反馈
        location 输入
      - 浏览历史入栈新的记录
      - 请求状态 loading 的显示
        网络请求开始，显示 loading 图标
        请求完成 loading 图标隐藏
        请求的资源交给渲染进程
      - 管理子进程 进程间通信 ipc（Inter-Process Communication）
      - 当前已经显示或者重新刷新
        beforeunload
    - 浏览器主进程负责用户交互、子进程管理和文件存储（缓存、cookie、localStorage）
    - 网路进程是面向渲染进程和浏览器进程等提供网络下载功能

1.首先，浏览器进程接收到用户输入的 URL 地址，浏览器进程将该 URL 转发给网络进程。
  - URL 补全标准 URL 带上 http(s)://www.
  - 如果是搜索关键词，去向默认搜索引擎 URL 带上关键词
  - 网址 英文、中文 可读性 DNS（Domain Name System）
    OSI 七层协议  IP地址来通信的
    拿着域名（Domain） 去查询 ip地址
    key: value DNS 是一个分布式的数据库
    - 本地 DNS 缓存查找
    - 局域网查找
    - 抚州
    - 中国根服务器（海底光缆）
    - 美国服务器（顶级服务器）

  - 如果本地有缓存
    text/css  image/jpg
    不用请求，直接使用缓存
  - 三次握手  确保双方都具有请求发送的能力
  - 发送请求行和请求头
    - 请求行（GET、URL、http 版本）
    - 请求头（jwt token Authorization、cookie）
  - 先发送响应头，解析响应头数据，并将数据转发给浏览器进程
    Content-Type  浏览器不一样的响应
    text/html -> 渲染进程准备接收
    text/css  image -> 下载
    doc mp3
    状态码
  - 浏览器接收到“提交导航”的消息后，便开始准备接收HTML数据，接收数据的方式是
  直接和网络进程建立数据管道
  - 最后渲染进程会向浏览器进程 “确认提交”，已经准备好接收和解析页面数据
  - 浏览器进程接收到渲染进程“提交文档”消息后，便开始移除之前旧的文档，
  然后更新浏览器进程中的页面状态，进入loading状态

  用户发出 URL 请求 到页面开始解析的整个过程，就叫导航。

- time.geekbang.org
  补全

- http://time.geekbang.org
  手动输入了http的话 只有响应头，没有响应体
  跳转 用户的习惯，服务器会帮转发
  服务器会给 301/302
  Location: https://time.geekbang.org
  https://  浏览器强制

- DNS 深入
  - 浏览器 DNS 缓存
  越快越好
    chrome://net-internals/#dns
  ip 数组
  分布式 **服务器集群**
  返回的IP地址是  ngnix代理服务器IP地址
  背后反向代理 有成百上千台服务器 
  负载均衡
  代理服务器背后轮询 服务器的负载怎么样？

  地域特性的机房
  离你最近的地方安排服务器集群
- 本地操作系统 DNS 缓存
  host 文件
  有用的系统配置文件
  本地 域名 和IP 指向的配置文件
  douyin.com
  抖音的开发者 本地有着抖音官网的website 代码，本地测试带域名是什么效果
  localhost  douyin.com
  cookie，token
  notepad "C:\Windows\System32\drivers\etc\hosts"
  - localhost 等一些特殊域名，不需要解析
  127.0.0.1 www.baidu.com

- 200 + Content-Type text/html
  下载内容
  - 开始传输 transport
    - 建立传输通道 三次握手
  - OSI 七层协议
    http 是应用层协议
    - 物理层  0 和 1 物理介质
    - 数据链路层  mac 地址 + 数据   mac（上网设备的唯一ID）
    - 网络层 IP 地址 + mac 地址 + 数据
    - 传输层 规则
      UDP 数据报协议  视频，音频，直播
      快 
      有效的传输
        - 数据包 大小上限的
        - 一个文件会分成 好多个数据包，分批次，分通道并发传输
        - 数据包会丢失  重传 TCP/IP
        - 数据包会乱序  重排序

        TCP(序号...) + IP 地址 + mac 地址 + 数据
- 三次握手