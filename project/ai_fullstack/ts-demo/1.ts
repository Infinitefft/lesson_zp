function add(a: number, b: string) {
  // JS 弱类型优势，好学，简单易上手
  // JS 是弱类型的 容易出错
  // 大型项目的时候，因为弱类型带来的代码质量问题  99.99% 不会出问题
  // JS 是动态语言，不是静态语言，运行时候才发生bug
  // Typetcript 是 JS 的超集，强类型（类型限定）静态语言（有 bug 编译时候不通过）
  // 加法，字符串拼接(隐式转换)
  return a + b;   // 二义性
}

const res = add(1, "2");
console.log(res);  // 12