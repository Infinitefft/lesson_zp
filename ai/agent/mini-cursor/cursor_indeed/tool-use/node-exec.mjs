// exec 执行命令的tool
import {
  spawn
  // node 内置模块
  // 高级 创建一个子进程
  // 分配资源的最小单位
  // 线程是执行的最小单位
  // 主进程 node node-exec.mjs
  // 执行 npm install, npm run dev, npm init vite...
  // cmd 本身就是进程 不能阻塞主进程
  // node 是多进程的架构
  // 父子进程
} from 'node:child_process';

// bash 命令
const command = 'ls -la';

// 新建一个子进程
const [cmd, ...args] = command.split(' ');
const cwd = process.cwd();
console.log(`当前工作目录：${cwd}`);
// 并发

const child = spawn(cmd, args, {
  cwd,  // 子进程的工作目录
  // stdio：继承父进程的标准输入输出  stdin stdout
  stdio: 'inherit',
  // shell 执行命令
  shell: true,
});

let errorMsg = '';
// 进程间的通信，基于事件
child.on('error', (error) => {
  errorMsg = error.message;
})

child.on('close', (code) => {
  if (code === 0) {
    // 成功退出
    console.log('命令执行成功，子进程退出');
    process.exit(0);
  } else {
    if (errorMsg) {
      console.error(`错误：${errorMsg}`);
    }
    process.exit(code || 1);
  }
})