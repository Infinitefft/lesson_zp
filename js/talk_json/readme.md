# 对象字面量 JSON Object

## JS是最有表现力的脚本语言
- 不需要像JAVA/C++ 那样先定义类，早期js class 关键字都没有
    {} 是对象字面量
    [] 数组
- js 提供了对象(object)字面量(字面意义上就知道这是哪个对象)

## 面向对象
- 对象由属性和方法构成
- 简单的面向对象
- 复杂的人际关系的面向对象

## JS 数据类型
- 字符串 String
- 数字 Number
- 布尔值 Boolean
- 空值 Null
- 未定义 undefined
- 对象 Object

## 设计模式 Proxy
- 面向 **接口(Interface)** 的编程， 代码就灵活且powerful
- ggg -> xm 送花 大概率会被拒
- 添加一个xh对象字面量，xh拥有和xm一样的receiveFlower方法
- ggg -> xm 送花，ggg -> xh 送花
    xh 可以代理 xm 收花
    xm xh 实现了一样的receiveFlower 接口
- 这就是代理模式(proxy)