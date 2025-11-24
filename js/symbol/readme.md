# Symbol 何为？

- 独一无二的值
- 数据类型？
    - 简单数据类型
        - 传统
            - 数值类型 number
            - 布尔值 boolean
            - 字符串 string
            - 空 null
            - 未定义 undefined
        - es6
            - bigint 大数
            - symbol 符号
    - 复杂数据类型
        object 对象

- js 总共有8种数据类型
    “七上八下”
    number 和 bigint （numeric）

## Symbol

- 声明方式
    Symbol() 函数声明，但是是简单数据类型
    参数label 可选，描述符号的字符串

- Symbol 可以作为对象的唯一key 常用于多人协作，避免命名冲突。
    - 对象是动态的
    - Symbol key 不会被覆盖
    - for key in 不可以枚举 Symbol key
    