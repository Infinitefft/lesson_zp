# [cf1838C] [No Prime Differences](https://codeforces.com/problemset/problem/1838/C)

## 题目描述
You are given integers $n$ and $m$. Fill an $n$ by $m$ grid with the integers $1$ through $n\cdot m$, in such a way that for any two adjacent cells in the grid, the absolute difference of the values in those cells is not a prime number. Two cells in the grid are considered adjacent if they share a side.

![](https://espresso.codeforces.com/58a8ad463a03a7b533c80c7cc8f71f56bd745256.png)

It can be shown that under the given constraints, there is always a solution.


---

## 题目大意
给你两个数 $n, m$ ，请你构造一个 `n 行 m 列`的矩阵，其中矩阵必须满足以下条件：
- 矩阵中的每个数都在 $[1, n \cdot m]$ 范围内（不能重复，即将 $1$ 到 $n * m$ 每个数都填入矩阵中）。
- 对于矩阵中的任意两个相邻（上下左右）的数，它们的绝对差值不是一个质数。

---

## 输入




## 输出

> 

---

## 我的思路

**思维**

可以先看个例子：假设 $n = 5, m = 7$ ，我们从1开始直接填数字则构造的矩阵为：

```
1  2  3  4  5  6  7
8  9 10 11 12 13 14
15 16 17 18 19 20 21
22 23 24 25 26 27 28
29 30 31 32 33 34 35
```
> 可以看到我们每个数字左右都是符合要求的，相差为 $1$ （非素数）。但是我们每个数上下都差了一个 7 (即 m )。如果我们的 m 不是一个素数的话我们直接这样排列是可以的，如果是一个素数呢？

> 如果我们上下都相差 m 的倍数我们这样的按顺序排列就是可以的。我们可以将行调换位置。例如：

```
1  2  3  4  5  6  7      （1）
8  9 10 11 12 13 14      （2）
15 16 17 18 19 20 21      （3）
22 23 24 25 26 27 28      （4）
29 30 31 32 33 34 35      （5）
```

> 我们可以让前 n / 2 （下取整）不变，后面的 n - n / 2 （下取整）行穿插到前面行中即可。例如：

```
15 16 17 18 19 20 21      （3）
1  2  3  4  5  6  7      （1）
22 23 24 25 26 27 28      （4）
8  9 10 11 12 13 14      （2）
29 30 31 32 33 34 35      （5）
```

> 可以看到这样每行都可以符合要求，相差为 $m$ 的倍数（无论 $m$ 是素数还是合数）。请注意，因为我们只是重新排列上述解决方案中的行，所以所有水平差异都是 $1$ ，垂直差异是 $m≥4$ 的**倍数**。因此，只要没有任何垂直差异等于 $m$ 本身，它们就一定是符合的。

---

## 时间复杂度

$O()$

---

## 空间复杂度

$O()$

---

## Go 代码

```Go

```
---

## C++ 代码

```C++
```
---
## Python 代码

```Python
```

---

## JavaScript 代码

```JavaScript
```