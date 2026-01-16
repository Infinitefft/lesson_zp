// let a: number = 1;
// a = "11";
let b: string = "hello";
let c: boolean = true;
let d: null = null;
let e: undefined = undefined;
let arr: number[] = [1, 2, 3];
let user:[number, string] = [1, 'Tom'];
// 泛型 类型的传参
let arr2: Array<string> = ['a', 'b'];

// ts 借鉴 javs 微软
enum Status {
  Pending,  // 0
  Success,  // 1
  Failed,  // 2
}

// 枚举类型
let s: Status = Status.Pending;
s = Status.Success;
// 类型的推导
// ts 初学， any 救命
let aa: any = 1;  // 任意类型 救命稻草 放弃类型约束
aa = '11';
aa = {};

let bb: unknown = 1;  // 未知类型 更安全一些
bb = 'b';  // 使用前做类型检测
// bb.hello();  // 对象 未知类型，可以接受任何类型，直接调用方法不可以

let user2: {name: string, age: number, hometown: string} = {
  name: 'Alice',
  age: 18,
  hometown: '赣州'
}
// 接口
interface User {
  name: string;
  age: number;
  readonly id: number;
  hobby ?: string;
}

const u:User = {
  name: 'Tom',
  age: 20,
  id: 100,
  hobby: '唱跳'
}
u.name = 'Alice';
// u.id = 1111;

type UserType = {
  name: string,
  age: number,
  hobby?: string,
}
const f: UserType = {
  name: 'Alice',
  age: 20,
}