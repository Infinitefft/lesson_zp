# var_let_const

- js 里面如何声明变量？
    var 声明一个变量
    bad 
        var 声明的变量 var a = 1;
        var a; 在代码一开始就可以访问（**变量提升**）
        执行阶段 
        a = 1;
    let 声明一个变量

## 报错的集合
- ReferenceError: height is not defined
    作用于外调用
- TypeError: Assignment to constant variable.
- ReferenceError: Cannot access 'PI' before initialization
    提前访问暂时性死区（Dead Zone）的变量

- hot 100 6~10 题目 https://leetcode.cn/studyplan/top-100-liked/
- 你不知道的JavaScript 1-2章 写一篇学习笔记文章
- var_let_const 总结