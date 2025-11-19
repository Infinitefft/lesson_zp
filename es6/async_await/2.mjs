import fs from 'fs';


// es6 之前，用回调函数处理异步操作
// fs.readFile('./1.html', 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(data);
//     console.log(111);
// })
const p = new Promise((resolve, reject) => {
    fs.readFile('./1.html', 'utf-8', (err, data) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(data);
    })
})

// p.then(data => {
//     console.log(data);
//     console.log(111);
// })
const main = async() => {
    const html = await p;
    console.log(html);
}
main();