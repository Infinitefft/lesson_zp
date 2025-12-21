const add = (x, y) => {
  // fetch 不确定的
  return x + y;
}
// function add(nums) {
//   nums.push(3);
//   return nums.reduce((s, x) => s + x, 0);
// }
const nums = [1, 2];
add(nums);  // 副作用
console.log(nums.length);