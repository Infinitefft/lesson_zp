const obj = {
    name: 'qqq',
    age: 20,
    hobby: ['sing', 'dance', 'rap']
}
// 设计来迭代对象的属性的
for (let key in obj) {
    console.log(key, obj[key]);
}
// 数组也是对象，把数组看待成下标为key的可迭代对象
const arr = [1, 2, 3, 4, 5, 6];
// key 是下标
for (let key in arr) {
    console.log(key, arr[key]);
}