// document 文档对象 顶级的  dom树
// dom 事件监听
const panels = document.querySelectorAll('.panel');
// JS 中除了String Number Undefined Null Boolean 其他的都是对象
// 对象的一个子类
// console.log(panels, 
//     panels[0],
//     typeof panels[0],   // 瞎的
//     // [object HTMLDivElement]
//     Object.prototype.toString.call(panels[0]),
// );
panels.forEach(function(panel) {
    // console.log(panel);
    // 事件监听需要在具体的元素上 添加 active 类名
    
    panel.addEventListener('click', function() {
        const cur = document.querySelector('.active');
        if (cur) {
            cur.classList.remove('active');
        }
        panel.classList.add('active');
    })
})